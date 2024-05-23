function loadScheduleData(year, weekNumber) {
    $.ajax({
        url: 'php/fetch_data.php',
        method: 'GET',
        data: {
            year: year,
            week_number: weekNumber
        },
        success: function(data) {
            var scheduleData = JSON.parse(data);
            var tableBody = $('#editScheduleTable tbody');
            var weekNumberHeader = $('#weekNumberHeader');
            tableBody.empty(); // Clear any existing data

            weekNumberHeader.text('Uge ' + weekNumber); // Set the week number in the header

            if (scheduleData.length === 0) {
                // Insert 9 empty rows into the database
                $.ajax({
                    url: 'php/insert_empty_rows.php',
                    method: 'POST',
                    data: {
                        year: year,
                        week_number: weekNumber
                    },
                    success: function(response) {
                        loadScheduleData(year, weekNumber); // Reload the data after insertion
                    },
                    error: function() {
                        alert('An error occurred while inserting empty rows.');
                    }
                });
            } else {
                // Populate table with fetched data
                for (var i = 0; i < scheduleData.length; i++) {
                    var row = scheduleData[i];
                    var tableRow = '<tr>';

                    tableRow += '<td><textarea data-id="' + row.id + '" data-field="subject">' + row.subject + '</textarea></td>';
                    tableRow += '<td><textarea data-id="' + row.id + '" data-day="monday">' + row.monday + '</textarea></td>';
                    tableRow += '<td><textarea data-id="' + row.id + '" data-day="tuesday">' + row.tuesday + '</textarea></td>';
                    tableRow += '<td><textarea data-id="' + row.id + '" data-day="wednesday">' + row.wednesday + '</textarea></td>';
                    tableRow += '<td><textarea data-id="' + row.id + '" data-day="thursday">' + row.thursday + '</textarea></td>';
                    tableRow += '<td><textarea data-id="' + row.id + '" data-day="friday">' + row.friday + '</textarea></td>';
                    tableRow += '<td><textarea data-id="' + row.id + '" data-day="saturday">' + row.saturday + '</textarea></td>';
                    tableRow += '<td><textarea data-id="' + row.id + '" data-day="sunday">' + row.sunday + '</textarea></td>';

                    tableRow += '</tr>';
                    tableBody.append(tableRow);
                }
            }
        }
    });
}

function saveScheduleData() {
    var updatedData = [];
    var weekValue = $('#weekPicker').val();
    var [year, weekNumber] = weekValue.split('-W');

    $('#editScheduleTable textarea').each(function() {
        var id = $(this).data('id');
        var field = $(this).data('day') || $(this).data('field');
        var value = $(this).val();

        updatedData.push({
            id: id,
            field: field,
            value: value,
            week_number: weekNumber,
            year: year
        });
    });

    $.ajax({
        url: 'php/update_data.php',
        method: 'POST',
        data: {
            updates: JSON.stringify(updatedData)
        },
        success: function(response) {
            alert('Ændringerne er nu gemt!');
        },
        error: function() {
            alert('An error occurred while saving the data.');
        }
    });
}

$(document).ready(function() {
    $('#loadDataButton').click(function() {
        var weekValue = $('#weekPicker').val();
        if (weekValue) {
            var [year, weekNumber] = weekValue.split('-W');
            loadScheduleData(year, weekNumber);
        } else {
            alert('Vælg en uge først!');
        }
    });

    $('#saveDataButton').click(function() {
        saveScheduleData();
    });
});
