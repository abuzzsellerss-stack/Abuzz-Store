import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';

/**
 * Cashfree PG Order Creation Route
 * POST /api/cashfree/create-order
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, customerName, customerEmail, customerPhone, orderId } = body;

    const appId = process.env.CASHFREE_APP_ID || process.env.NEXT_PUBLIC_CASHFREE_APP_ID;
    const secretKey = process.env.CASHFREE_SECRET_KEY;
    const env = (process.env.CASHFREE_ENV || 'PRODUCTION').toUpperCase();

    if (!appId || !secretKey) {
      return NextResponse.json(
        { success: false, error: 'Cashfree API credentials missing in server environment.' },
        { status: 500 }
      );
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid order amount.' },
        { status: 400 }
      );
    }

    const uniqueOrderId = orderId || `ABUZZ_${Date.now()}`;
    const formattedPhone = (customerPhone || '9999999999').replace(/[^0-9]/g, '').slice(-10) || '9999999999';
    const sanitizedCustomerId = (customerEmail || `cust_${formattedPhone}`).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 45);

    // Determine domain host for return_url redirect
    const host = req.headers.get('host') || 'abuzz.store';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `${protocol}://${host}`;

    const requestPayload = {
      order_id: uniqueOrderId,
      order_amount: numericAmount.toFixed(2),
      order_currency: 'INR',
      customer_details: {
        customer_id: sanitizedCustomerId,
        customer_name: customerName || 'Abuzz Customer',
        customer_email: customerEmail || 'customer@abuzz.store',
        customer_phone: formattedPhone.length === 10 ? formattedPhone : '9999999999',
      },
      order_meta: {
        return_url: `${baseUrl}/checkout/verify?order_id={order_id}`,
        notify_url: `${baseUrl}/api/webhooks/cashfree`,
      },
      order_note: `Abuzz Store Order ${uniqueOrderId}`,
    };

    console.log(`[CASHFREE CREATE ORDER]: Creating session for ${uniqueOrderId} (Amount: ₹${numericAmount})`);

    // First try using cashfree-pg SDK dynamically
    try {
      const { Cashfree, CFEnvironment } = await import('cashfree-pg');
      const cashfree = new Cashfree(
        env === 'PRODUCTION' ? CFEnvironment.PRODUCTION : CFEnvironment.SANDBOX,
        appId,
        secretKey
      );

      const sdkResponse = await cashfree.PGCreateOrder(requestPayload as any);
      const data = sdkResponse.data;

      if (data && data.payment_session_id) {
        console.log(`[CASHFREE SDK SUCCESS]: Session created ${data.payment_session_id}`);
        return NextResponse.json({
          success: true,
          paymentSessionId: data.payment_session_id,
          orderId: data.order_id || uniqueOrderId,
          cfEnvironment: env,
        });
      }
    } catch (sdkError: any) {
      console.warn('[CASHFREE SDK FALLBACK TO REST API]:', sdkError?.message || sdkError);
    }

    // Direct REST API Fallback
    const apiUrl = env === 'PRODUCTION' 
      ? 'https://api.cashfree.com/pg/orders' 
      : 'https://sandbox.cashfree.com/pg/orders';

    const restResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'x-client-id': appId,
        'x-client-secret': secretKey,
        'x-api-version': '2023-08-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestPayload),
    });

    const responseData = await restResponse.json();

    if (!restResponse.ok) {
      console.error('[CASHFREE REST ERROR]:', responseData);
      return NextResponse.json(
        {
          success: false,
          error: responseData.message || responseData.error || 'Failed to create payment session with Cashfree',
        },
        { status: restResponse.status }
      );
    }

    console.log(`[CASHFREE REST SUCCESS]: Session created ${responseData.payment_session_id}`);
    return NextResponse.json({
      success: true,
      paymentSessionId: responseData.payment_session_id,
      orderId: responseData.order_id || uniqueOrderId,
      cfEnvironment: env,
    });

  } catch (error: any) {
    console.error('[CASHFREE CREATE ORDER ROUTE EXCEPTION]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error while creating Cashfree order' },
      { status: 500 }
    );
  }
}
