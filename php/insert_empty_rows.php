<?php
include 'db_connect.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $week_number = intval($_POST['week_number']);
    $year = intval($_POST['year']);
    
    for ($i = 0; $i < 9; $i++) {
        $sql = "INSERT INTO daily_schedules (week_number, year, subject, monday, tuesday, wednesday, thursday, friday, saturday, sunday) VALUES ($week_number, $year, '', '', '', '', '', '', '', '')";
        $conn->query($sql);
    }

    $conn->close();
    echo "Empty rows inserted successfully!";
} else {
    echo "Invalid request method.";
}
?>
