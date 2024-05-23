CREATE DATABASE schedule;

USE schedule;

CREATE TABLE daily_schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    week_number INT NOT NULL,
    year INT NOT NULL,
    subject VARCHAR(255),
    monday VARCHAR(255),
    tuesday VARCHAR(255),
    wednesday VARCHAR(255),
    thursday VARCHAR(255),
    friday VARCHAR(255),
    saturday VARCHAR(255),
    sunday VARCHAR(255),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

