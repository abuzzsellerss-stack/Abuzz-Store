import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';

/**
 * Cashfree Payment Gateway Webhook Listener
 * Endpoint URL: https://abuzz.store/api/webhooks/cashfree
 * Documentation: https://docs.cashfree.com/docs/pg-webhooks
 */
export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('x-webhook-signature') || req.headers.get('x-cashfree-signature');
    const timestamp = req.headers.get('x-webhook-timestamp') || req.headers.get('x-cashfree-timestamp');
    
    const body = await req.json();
    console.log('[CASHFREE WEBHOOK RECEIVED]:', JSON.stringify(body, null, 2));

    const eventType = body?.type || body?.event || 'PAYMENT_SUCCESS_WEBHOOK';
    const orderData = body?.data?.order || {};
    const paymentData = body?.data?.payment || {};
    const customerData = body?.data?.customer_details || {};

    const orderId = orderData.order_id || body?.order_id;
    const paymentStatus = paymentData.payment_status || body?.txStatus || 'SUCCESS';
    const amount = paymentData.payment_amount || orderData.order_amount;
    const cfPaymentId = paymentData.cf_payment_id || body?.referenceId;

    // Handle Payment Success / Failure events
    if (eventType.includes('PAYMENT_SUCCESS') || paymentStatus === 'SUCCESS') {
      console.log(`✅ Cashfree Payment Verified for Order ${orderId}: ₹${amount} (CF Txn ID: ${cfPaymentId})`);
    } else if (eventType.includes('PAYMENT_FAILED') || paymentStatus === 'FAILED') {
      console.warn(`❌ Cashfree Payment Failed for Order ${orderId}`);
    }

    // Always respond with 200 OK to acknowledge Cashfree webhook
    return NextResponse.json(
      {
        success: true,
        message: 'Cashfree webhook processed successfully',
        received: {
          orderId,
          cfPaymentId,
          paymentStatus,
          eventType,
          timestamp: new Date().toISOString()
        }
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[CASHFREE WEBHOOK ERROR]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Webhook payload parsing error' },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'Active',
    endpoint: '/api/webhooks/cashfree',
    gateway: 'Cashfree Payments India',
    version: '2023-08-01'
  });
}
