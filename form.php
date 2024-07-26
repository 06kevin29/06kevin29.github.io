<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form fields
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];
    $recaptcha_response = $_POST['g-recaptcha-response'];

    // Verify reCAPTCHA
    $recaptcha_secret = '6LcmFhkqAAAAAI4PP09U_VYEBXQXC_srxRdPpDXz';
    $recaptcha_verify_url = 'https://www.google.com/recaptcha/api/siteverify';
    $response = file_get_contents($recaptcha_verify_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);
    $response_keys = json_decode($response, true);

    if ($response_keys["success"]) {
        // Set email parameters
        $to = '06kevin29@gmail.com';
        $headers = "From: $name <$email>" . "\r\n";
        $body = "Name: $name\nEmail: $email\nSubject: $subject\nMessage:\n$message";

        // Send email
        if (mail($to, $subject, $body, $headers)) {
            echo 'Message sent successfully.';
        } else {
            echo 'Failed to send message.';
        }
    } else {
        echo 'reCAPTCHA verification failed. Please try again.';
    }
} else {
    echo 'Invalid request.';
}
?>