<?php
// Simple test script to check challenge creation
require_once 'vendor/autoload.php';

use App\Models\Challenge;

// Test data
$testData = [
    'title' => 'Test Challenge',
    'description' => 'This is a test challenge',
    'type' => 'Daily',
    'days_left' => 7,
    'theme' => 'blue',
    'user_id' => 1, // Assuming user ID 1 exists
    'status' => 'Not Started'
];

try {
    $challenge = Challenge::create($testData);
    echo "Challenge created successfully with ID: " . $challenge->id . "\n";
} catch (Exception $e) {
    echo "Error creating challenge: " . $e->getMessage() . "\n";
    echo "Stack trace: " . $e->getTraceAsString() . "\n";
}
?>
