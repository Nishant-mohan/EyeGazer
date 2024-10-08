document.getElementById('toggle').addEventListener('change', function() {
    if (this.checked) {
        console.log('Switched On');
        // Perform the "on" action
    } else {
        console.log('Switched Off');
        // Perform the "off" action
    }
});

const recalibrateOption = document.getElementById('recalibrateOption');
const stopIcon = recalibrateOption.querySelector('.stop-icon');

recalibrateOption.addEventListener('click', function() {
    this.classList.toggle('selected'); // Toggle the 'selected' class

    // Toggle the display of the stop icon
    if (this.classList.contains('selected')) {
        stopIcon.style.display = 'inline'; // Show the stop icon
    } else {
        stopIcon.style.display = 'none'; // Hide the stop icon
    }
});
