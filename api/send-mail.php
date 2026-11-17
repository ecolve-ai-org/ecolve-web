<?php
/**
 * send-mail.php — receives the contact form and the newsletter form
 * and emails them to you. Works on any shared host with PHP (cPanel etc.).
 * No database, no libraries, no Composer.
 *
 * SETUP: change the three values below, then upload the whole site.
 */

// ===== EDIT THESE ==========================================================
const TO_EMAIL   = 'hello@ecolve.ai';  // where messages are delivered
const FROM_EMAIL = '';                   // e.g. 'no-reply@yourdomain.com'. Leave '' to auto-use no-reply@<your domain>
const SITE_NAME  = 'ecolve.ai';
// ===========================================================================

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond(int $code, bool $ok, string $message): void
{
    http_response_code($code);
    echo json_encode(['ok' => $ok, 'message' => $message]);
    exit;
}

/** Trim, drop control characters, cap length. Newlines kept (message body only). */
function clean($value, int $max): string
{
    $value = is_string($value) ? trim($value) : '';
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', '', $value);
    return function_exists('mb_substr') ? mb_substr($value, 0, $max) : substr($value, 0, $max);
}

/** Single line only — used for anything that ends up in a mail header. */
function one_line(string $value): string
{
    return trim(preg_replace('/[\r\n]+/', ' ', $value));
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, false, 'Method not allowed.');
}

// Only accept submissions that come from this same site.
$host = strtolower(preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? ''));
$host = preg_replace('/^www\./', '', $host);
foreach (['HTTP_ORIGIN', 'HTTP_REFERER'] as $key) {
    if (!empty($_SERVER[$key])) {
        $src = strtolower((string) parse_url($_SERVER[$key], PHP_URL_HOST));
        if ($src !== '' && preg_replace('/^www\./', '', $src) !== $host) {
            respond(403, false, 'Request not allowed.');
        }
        break;
    }
}

// Honeypot: real visitors never fill this hidden field. Pretend success to bots.
if (!empty($_POST['website'])) {
    respond(200, true, 'Thank you!');
}

$form    = (($_POST['form'] ?? '') === 'newsletter') ? 'newsletter' : 'contact';
$email   = clean($_POST['email'] ?? '', 254);
$name    = one_line(clean($_POST['name'] ?? '', 100));
$topic   = one_line(clean($_POST['topic'] ?? '', 100));
$message = clean($_POST['message'] ?? '', 5000);
$page    = one_line(clean($_POST['page'] ?? '', 200));

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, false, 'Please enter a valid email address.');
}
if ($form === 'contact' && ($name === '' || $message === '')) {
    respond(422, false, 'Please fill in your name and message.');
}

// Basic rate limit: one submission per visitor every 20 seconds.
$ip   = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$lock = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'sm_' . md5($ip);
if (is_file($lock) && (time() - (int) filemtime($lock)) < 20) {
    respond(429, false, 'Please wait a few seconds before sending again.');
}
@touch($lock);

// Build the email.
$safeHost = preg_match('/^[a-z0-9.-]+$/', $host) ? $host : 'localhost';
$from     = FROM_EMAIL !== '' ? FROM_EMAIL : 'no-reply@' . $safeHost;

if ($form === 'newsletter') {
    $subject = '[' . SITE_NAME . '] New newsletter subscriber';
    $body    = "New newsletter subscriber\n\nEmail: {$email}\n";
} else {
    $subject = '[' . SITE_NAME . '] New message from ' . $name;
    $body    = "New contact form message\n\n"
             . "Name:  {$name}\n"
             . "Email: {$email}\n"
             . ($topic !== '' ? "Topic: {$topic}\n" : '')
             . "\nMessage:\n{$message}\n";
}
$body .= "\n---\nPage: {$page}\nIP: {$ip}\nSent: " . date('Y-m-d H:i:s T') . "\n";

$headers = [
    'From: ' . SITE_NAME . ' <' . $from . '>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];
$encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';

$sent = @mail(TO_EMAIL, $encodedSubject, $body, implode("\r\n", $headers));

if (!$sent) {
    @unlink($lock);
    respond(500, false, 'Sorry, we could not send your message right now. Please email us directly.');
}

respond(200, true, 'Thank you! We have received your submission.');
