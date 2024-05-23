<?php
include 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $updates = json_decode($_POST['updates'], true);

    foreach ($updates as $update) {
        $id = intval($update['id']);
        $field = $update['field'];
        $value = $conn->real_escape_string($update['value']);

        $sql = "UPDATE daily_schedules SET $field = '$value' WHERE id = $id";
        $conn->query($sql);
    }

    $conn->close();
    echo "Updates saved successfully!";
} else {
    echo "Invalid request method.";
}
?>
