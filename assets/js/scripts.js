function fetchScheduleData(year, weekNumber) {
    $.ajax({
        url: 'php/fetch_data.php',
        method: 'GET',
        data: {
            year: year,
            week_number: weekNumber
        },
        success: function(data) {
            var scheduleData = JSON.parse(data);
            var tableBody = $('#scheduleTable tbody');
            tableBody.empty(); // Clear any existing data

            var weekNumberDisplay = weekNumber;

            $('#weekNumberHeader').text('Uge ' + weekNumberDisplay); // Set the week number in the header

            var days = ['subject', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

            for (var i = 0; i < scheduleData.length; i++) {
                var row = scheduleData[i];
                var tableRow = '<tr>';

                tableRow += '<td>' + escapeHtml(row.subject).replace(/\n/g, '<br>') + '</td>';
                tableRow += '<td>' + escapeHtml(row.monday).replace(/\n/g, '<br>') + '</td>';
                tableRow += '<td>' + escapeHtml(row.tuesday).replace(/\n/g, '<br>') + '</td>';
                tableRow += '<td>' + escapeHtml(row.wednesday).replace(/\n/g, '<br>') + '</td>';
                tableRow += '<td>' + escapeHtml(row.thursday).replace(/\n/g, '<br>') + '</td>';
                tableRow += '<td>' + escapeHtml(row.friday).replace(/\n/g, '<br>') + '</td>';
                tableRow += '<td>' + escapeHtml(row.saturday).replace(/\n/g, '<br>') + '</td>';
                tableRow += '<td>' + escapeHtml(row.sunday).replace(/\n/g, '<br>') + '</td>';

                tableRow += '</tr>';
                tableBody.append(tableRow);
            }
        }
    });
}

function escapeHtml(text) {
    var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

$(document).ready(function() {
    var currentYear = new Date().getFullYear();
    var currentWeekNumber = getWeekNumber(new Date());
    fetchScheduleData(currentYear, currentWeekNumber);

    setInterval(function() {
        var currentYear = new Date().getFullYear();
        var currentWeekNumber = getWeekNumber(new Date());
        fetchScheduleData(currentYear, currentWeekNumber);
    }, 10000);
});

// Function to get the current week number
function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    return weekNo;
}
