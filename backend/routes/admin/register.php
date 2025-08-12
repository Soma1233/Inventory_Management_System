<?php
include '../../config/config.php';
include '../../config/headers.php';

$data = json_decode(file_get_contents("php://input"), true);
$username = $data['username'];
$password = password_hash($data['password'], PASSWORD_DEFAULT);
$role = $data['role'];


$sql = "INSERT INTO users (username, password, role, created_at) VALUES (:username, :password, :role, NOW())";
$stmt = $pdo->prepare($sql);
$stmt->execute([
    'username' => $username,
    'password' => $password,
    'role' => $role
]);

echo json_encode(["status" => "success"]);
?>
