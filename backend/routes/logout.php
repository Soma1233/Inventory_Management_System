<?php
include '../config/headers.php';
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();
session_destroy();
echo json_encode(["status" => "logged out"]);
?>
