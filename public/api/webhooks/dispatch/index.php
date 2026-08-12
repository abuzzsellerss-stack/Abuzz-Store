<?php
/**
 * Shiprocket Tracking Webhook Handler for Abuzz Store
 * Endpoint: https://abuzz.store/api/webhooks/dispatch/index.php
 * Accepts Shiprocket live shipment tracking events (Delhivery, Blue Dart, etc.)
 */
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

// Always respond 200 OK for OPTIONS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(['success' => true]);
    exit;
}

// Read raw body payload
$rawPayload = file_get_contents('php://input');
$data = json_decode($rawPayload, true);

// Extract key fields
$awb = isset($data['awb']) ? (string)$data['awb'] : null;
$courier = isset($data['courier_name']) ? $data['courier_name'] : 'Courier Express';
$status = isset($data['current_status']) ? $data['current_status'] : (isset($data['shipment_status']) ? $data['shipment_status'] : 'IN TRANSIT');
$orderId = isset($data['channel_order_id']) ? $data['channel_order_id'] : (isset($data['order_id']) ? (string)$data['order_id'] : null);
$etd = isset($data['etd']) ? $data['etd'] : null;
$podStatus = isset($data['pod_status']) ? $data['pod_status'] : null;
$scans = isset($data['scans']) && is_array($data['scans']) ? $data['scans'] : [];
$latestScan = !empty($scans) ? end($scans) : null;

// Write to audit log
$logDir = __DIR__ . '/logs';
if (!file_exists($logDir)) {
    @mkdir($logDir, 0755, true);
}
$logEntry = [
    'timestamp' => date('Y-m-d H:i:s'),
    'awb' => $awb,
    'courier' => $courier,
    'status' => $status,
    'order_id' => $orderId,
    'etd' => $etd,
    'scans_count' => count($scans),
    'latest_activity' => isset($latestScan['activity']) ? $latestScan['activity'] : null,
    'latest_location' => isset($latestScan['location']) ? $latestScan['location'] : null,
    'payload' => $data ? $data : $rawPayload
];
@file_put_contents($logDir . '/dispatch_events.log', json_encode($logEntry) . PHP_EOL, FILE_APPEND);

// Always respond 200 OK JSON to satisfy Shiprocket
http_response_code(200);
echo json_encode([
    'success' => true,
    'status' => 'acknowledged',
    'awb' => $awb,
    'courier_name' => $courier,
    'current_status' => $status,
    'order_id' => $orderId,
    'etd' => $etd,
    'scans_count' => count($scans),
    'message' => 'Shiprocket live tracking webhook processed successfully',
    'timestamp' => date('c')
]);
exit;
?>
