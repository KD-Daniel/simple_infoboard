<?php
include 'db_connect.php';

// Get the year and week number from the request
$year = isset($_GET['year']) ? intval($_GET['year']) : date("Y");
$week_number = isset($_GET['week_number']) ? intval($_GET['week_number']) : date("W");

// Fetch the schedule data for the specified week and year
$schedule_data = [];
$sql = "SELECT * FROM daily_schedules WHERE week_number = $week_number AND year = $year";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $schedule_data[] = $row;
    }
}

$conn->close();

echo json_encode($schedule_data);
?>
