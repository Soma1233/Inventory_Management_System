<?php
include '../../config/headers.php';
include '../../config/config.php';

try {
    if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        // Read raw input and decode JSON
        $data = json_decode(file_get_contents("php://input"), true);
        parse_str($_SERVER['QUERY_STRING'], $queryParams);

        if (!isset($queryParams['productId']) || !isset($data['stock'])) {
            http_response_code(400);
            echo json_encode(["error" => "Missing productId or stock"]);
            exit;
        }

        $productId = intval($queryParams['productId']);
        $newStock = intval($data['stock']);

        // Update stock in product_supplier table
        $stmt = $pdo->prepare("UPDATE product_supplier SET stock = :stock WHERE product_id = :product_id");
        $stmt->execute([
            ':stock' => $newStock,
            ':product_id' => $productId
        ]);

        echo json_encode(["status" => "success", "message" => "Stock updated"]);
    } else {
        http_response_code(405);
        echo json_encode(["error" => "Method not allowed"]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
}
