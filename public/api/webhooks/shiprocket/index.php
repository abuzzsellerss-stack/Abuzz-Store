<?php
/**
 * Shiprocket Webhook Handler for Abuzz Store
 * Responds 200 OK to Shiprocket tracking milestone webhooks
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Log incoming payload
$rawPayload = file_get_contents('php://input');
$data = json_decode($rawPayload, true);

// Save payload to a local JSON log file for audit
$logDir = __DIR__ . '/logs';
if (!file_exists($logDir)) {
    @mkdir($logDir, 0755, true);
}
@file_put_contents($logDir . '/shiprocket_events.log', date('[Y-m-d H:i:s] ') . $rawPayload . PHP_EOL, FILE_APPEND);

// Always respond HTTP 200 OK to Shiprocket
http_response_code(200);
echo json_encode([
    'success' => true,
    'status' => 'acknowledged',
    'message' => 'Shiprocket webhook processed successfully',
    'timestamp' => date('c')
]);
exit;
?>
