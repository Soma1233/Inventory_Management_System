<?php
include "../config/config.php"; // Make sure this sets up $pdo correctly

echo "hii";

// Correct way to run SELECT query
$sql = "SELECT * FROM users";
$stmt = $pdo->query($sql); // Use query() for simple SELECT

// Fetch results
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Display results
var_dump($results);
?>
