<?php
/**
 * Razorpay Webhook Handler for Abuzz Store
 * Responds 200 OK to Razorpay payment notification webhooks
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Razorpay-Signature');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$rawPayload = file_get_contents('php://input');

$logDir = __DIR__ . '/logs';
if (!file_exists($logDir)) {
    @mkdir($logDir, 0755, true);
}
@file_put_contents($logDir . '/razorpay_events.log', date('[Y-m-d H:i:s] ') . $rawPayload . PHP_EOL, FILE_APPEND);

http_response_code(200);
echo json_encode([
    'success' => true,
    'status' => 'acknowledged',
    'message' => 'Razorpay webhook processed successfully',
    'timestamp' => date('c')
]);
exit;
?>
