<?php
// Database connection settings
$host = "localhost"; // Replace with your database host
$username = "root"; // Replace with your database username
$password = ""; // Replace with your database password
$database = "form_data"; // Replace with your database name

// Create a database connection
$conn = new mysqli($host, $username, $password, $database);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $full_name = trim($_POST['full_name']);
    $email = trim($_POST['email']);
    $country_code = $_POST['country_code'];
    $mobile_number = trim($_POST['mobile_number']);
    $work_experience = $_POST['work_experience'];
    $consent = isset($_POST['consent']) ? 1 : 0; // Convert to 1 (true) or 0 (false)

    // Validation
    $errors = [];

    // Validate full name
    if (empty($full_name)) {
        $errors[] = "Full Name is required.";
    } elseif (!preg_match("/^[a-zA-Z\s]+$/", $full_name)) {
        $errors[] = "Full Name should contain only letters and spaces.";
    }

    // Validate email
    if (empty($email)) {
        $errors[] = "Email is required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }

    // Validate mobile number
    if (empty($mobile_number)) {
        $errors[] = "Mobile Number is required.";
    } elseif (!preg_match("/^[0-9]{10,15}$/", $mobile_number)) {
        $errors[] = "Mobile Number must contain 10-15 digits.";
    }

    // Validate work experience
    if (empty($work_experience)) {
        $errors[] = "Work Experience is required.";
    }

    // Check for errors
    if (!empty($errors)) {
        // Display errors
        echo "<h2>Form submission failed!</h2>";
        echo "<ul>";
        foreach ($errors as $error) {
            echo "<li>" . htmlspecialchars($error) . "</li>";
        }
        echo "</ul>";
    } else {
        // Insert data into the database
        $sql = "INSERT INTO submissions (full_name, email, country_code, mobile_number, work_experience, consent)
                VALUES (?, ?, ?, ?, ?, ?)";

        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssi", $full_name, $email, $country_code, $mobile_number, $work_experience, $consent);

        if ($stmt->execute()) {
            echo "<h2>Form submitted successfully!</h2>";
        } else {
            echo "Error: " . $stmt->error;
        }

        // Close the statement
        $stmt->close();
    }
}

$conn->close();
?>
