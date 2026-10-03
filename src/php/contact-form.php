<?php
header('Content-Type: application/json; charset=utf-8');
function respond($code, $status, $message) {
    http_response_code($code);
    echo json_encode(['status' => $status, 'mes' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, 'NO', 'Use POST.');
}
foreach (['name', 'email', 'message'] as $field) {
    if (!isset($_POST[$field]) || !is_string($_POST[$field])) {
        respond(422, 'NO', 'Please complete all fields.');
    }
}
$name = trim($_POST['name']);
$email = trim($_POST['email']);
$message = trim($_POST['message']);
if ($name === '' || strlen($name) > 200 || strlen($email) > 254 ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $email) ||
    $message === '' || strlen($message) > 10000) {
    respond(422, 'NO', 'Please check your name, email and message.');
}
$recipient = getenv('CONTACT_EMAIL');
if (!$recipient || !filter_var($recipient, FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $recipient)) {
    respond(503, 'NO', 'Email delivery is not configured.');
}
$body = "Name: $name\nEmail: $email\n\n$message";
$headers = "From: $recipient\r\nReply-To: $email\r\nMIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8";
if (!function_exists('mail') || !@mail($recipient, 'Portfolio contact', $body, $headers)) {
    respond(503, 'NO', 'Could not send your message. Please try again later.');
}
respond(200, 'OK', 'Your message has been sent.');
