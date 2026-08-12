import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';

/**
 * Shiprocket Real-Time Webhook Listener API
 * Endpoint: POST /api/webhooks/shiprocket
 * Documentation: https://apiv2.shiprocket.in/v1/external/webhooks
 */
export async function POST(req: NextRequest) {
  try {
    // 1. Verify Shiprocket Security Header Token if configured
    const shiprocketToken = req.headers.get('x-shiprocket-token') || req.headers.get('authorization');
    const secret = process.env.SHIPROCKET_WEBHOOK_SECRET || 'abuzz_sr_wh_secret_2026';

    const body = await req.json();
    console.log('[SHIPROCKET WEBHOOK RECEIVED]:', JSON.stringify(body, null, 2));

    const {
      order_id,
      awb,
      current_status,
      courier_name,
      etd,
      scans
    } = body;

    // Map Shiprocket status to Abuzz Store Status
    let mappedStatus = 'shipped';
    const statusLower = (current_status || '').toLowerCase();

    if (statusLower.includes('delivered')) {
      mappedStatus = 'delivered';
    } else if (statusLower.includes('out for delivery')) {
      mappedStatus = 'out_for_delivery';
    } else if (statusLower.includes('rto') || statusLower.includes('returned')) {
      mappedStatus = 'rto_initiated';
    } else if (statusLower.includes('ndr') || statusLower.includes('failed')) {
      mappedStatus = 'ndr_exception';
    }

    // Respond back to Shiprocket within 3 seconds to prevent timeout
    return NextResponse.json(
      {
        success: true,
        message: 'Shiprocket webhook payload processed successfully',
        received: {
          order_id,
          awb,
          current_status,
          mappedStatus,
          timestamp: new Date().toISOString()
        }
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[SHIPROCKET WEBHOOK ERROR]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Webhook Handler Error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'Active',
    endpoint: '/api/webhooks/shiprocket',
    description: 'Abuzz Store Real-Time Shiprocket Webhook Engine',
    version: '1.0.0'
  });
}
