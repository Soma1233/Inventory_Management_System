<?php
include '../../config/config.php';
include '../../config/headers.php';

session_start(); // Required for using $_SESSION

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Read and decode JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['username']) || !isset($data['password'])) {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
    exit;
}

$username = $data['username'];
$password = $data['password'];

// Fetch user from database
$sql = "SELECT * FROM users WHERE username = :username";
$stmt = $pdo->prepare($sql);
$stmt->execute(['username' => $username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
$res= password_verify($password, $user['password']);
// var_dump ($res);
// Validate user and password
if ($user && $password==$user['password']) {
    
    $_SESSION['user_id'] = $user['id'];
    echo json_encode([
        "status" => "success",
        "user" => [
            "id" => $user['id'],
            "username" => $user['username'],
            "role" => $user['role']
        ]
    ]);
} else {
    echo "Ss";
    echo json_encode(["status" => "error", "message" => "Invalid credentials"]);
}
?>
