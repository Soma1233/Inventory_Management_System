<?php
include '../../config/headers.php';
include '../../config/config.php';

// header("Content-Type: application/json");
error_log("Request method: " . $_SERVER['REQUEST_METHOD']);
try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents("php://input"), true);

        if (
            isset($data['product_id']) &&
            isset($data['supplier_id']) &&
            isset($data['stock'])
        ) {
            $stmt = $pdo->prepare("INSERT INTO product_supplier (product_id, supplier_id, stock, assigned_at)
                                   VALUES (:product_id, :supplier_id, :stock, NOW())");
            $stmt->execute([
                ':product_id' => $data['product_id'],
                ':supplier_id' => $data['supplier_id'],
                ':stock' => $data['stock']
            ]);
            echo json_encode(["status" => "success", "message" => "Assignment saved"]);
        } else {
            http_response_code(400);
            echo json_encode(["error" => "Missing required fields"]);
        }
    } else {
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
