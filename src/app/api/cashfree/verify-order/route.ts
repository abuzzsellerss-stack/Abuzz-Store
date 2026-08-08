import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';

/**
 * Cashfree PG Order Verification Route
 * POST /api/cashfree/verify-order
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'orderId parameter is required' },
        { status: 400 }
      );
    }

    const appId = process.env.CASHFREE_APP_ID || process.env.NEXT_PUBLIC_CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;
    const env = (process.env.CASHFREE_ENV || 'PRODUCTION').toUpperCase();

    if (!appId || !secretKey) {
      return NextResponse.json(
        { success: false, error: 'Cashfree API credentials missing in server environment.' },
        { status: 500 }
      );
    }

    console.log(`[CASHFREE VERIFY ORDER]: Checking payment status for order ${orderId}`);

    // Try SDK first
    try {
      const { Cashfree, CFEnvironment } = await import('cashfree-pg');
      const cashfree = new Cashfree(
        env === 'PRODUCTION' ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX,
        appId,
        secretKey
      );

      const sdkRes = await cashfree.PGOrderFetchPayments('2023-08-01', orderId);
      const payments = sdkRes.data || [];

      const successfulPayment = Array.isArray(payments)
        ? payments.find((p: any) => p.payment_status === 'SUCCESS')
        : null;

      if (successfulPayment) {
        console.log(`[CASHFREE SDK VERIFIED SUCCESS]: Order ${orderId}`);
        return NextResponse.json({
          success: true,
          status: 'SUCCESS',
          payment: successfulPayment,
        });
      }
    } catch (sdkErr: any) {
      console.warn('[CASHFREE SDK VERIFY FALLBACK TO REST API]:', sdkErr?.message || sdkErr);
    }

    // Direct REST API Fallback
    const apiUrl = env === 'PRODUCTION'
      ? `https://api.cashfree.com/pg/orders/${encodeURIComponent(orderId)}/payments`
      : `https://sandbox.cashfree.com/pg/orders/${encodeURIComponent(orderId)}/payments`;

    const restRes = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'x-client-id': appId,
        'x-client-secret': secretKey,
        'x-api-version': '2023-08-01',
      },
    });

    const payments = await restRes.json();

    if (!restRes.ok) {
      console.error('[CASHFREE VERIFY REST ERROR]:', payments);
      return NextResponse.json(
        { success: false, error: payments.message || 'Failed to verify payment status with Cashfree' },
        { status: restRes.status }
      );
    }

    const successfulPayment = Array.isArray(payments)
      ? payments.find((p: any) => p.payment_status === 'SUCCESS')
      : null;

    if (successfulPayment) {
      console.log(`[CASHFREE REST VERIFIED SUCCESS]: Order ${orderId}`);
      return NextResponse.json({
        success: true,
        status: 'SUCCESS',
        payment: successfulPayment,
      });
    }

    const pendingPayment = Array.isArray(payments)
      ? payments.find((p: any) => p.payment_status === 'PENDING')
      : null;

    return NextResponse.json({
      success: true,
      status: pendingPayment ? 'PENDING' : 'FAILED',
      payments: payments,
    });

  } catch (error: any) {
    console.error('[CASHFREE VERIFY ORDER EXCEPTION]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error verifying Cashfree order' },
      { status: 500 }
    );
  }
}
