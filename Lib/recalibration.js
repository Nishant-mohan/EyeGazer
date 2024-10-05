//Calibration
const startCalibration=(maxClicksPerPoint,PointsOfCalibration)=>{
    // Dynamically generate calibration points based on the number of points requested
    const calibrationPoints = [];
    let totalClicks=0;
    let totalPoints=maxClicksPerPoint*(PointsOfCalibration);

    const rows = Math.ceil(Math.sqrt(PointsOfCalibration)); // Approximate a grid layout based on the number of points
    const cols = rows;

    // Calculate spacing between points
    const xSpacing = window.innerWidth / (cols);
    const ySpacing = window.innerHeight / (rows);

    // Create points in a grid-like pattern
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (calibrationPoints.length < PointsOfCalibration) {
                calibrationPoints.push({
                    x: i * xSpacing+100, // Distribute points across the width
                    y: j * ySpacing+100  // Distribute points across the height
                });
            }
        }
    }
    const calibrationContainer = document.getElementById('calibration-container');
    calibrationContainer.innerHTML = ''; // Clear previous points

    // Create a click counter for each point
    const clickCounts = {};

    // Create calibration points for each coordinate
    calibrationPoints.forEach((point, index) => {
        const calibrationPoint = document.createElement('div');
        calibrationPoint.className = 'calibration-point';
        calibrationPoint.style.left = `${point.x}px`;
        calibrationPoint.style.top = `${point.y}px`;

        clickCounts[`point${index}`] = 0; // Initialize click count for each point

        // When user clicks a point, WebGazer records calibration data
        calibrationPoint.addEventListener('click', () => {
            const pointId = `point${index}`;
            if (clickCounts[pointId] < maxClicksPerPoint) {
                clickCounts[pointId]++;
                totalClicks++;
                
                // Record the screen position for WebGazer on each click
                webgazer.recordScreenPosition(point.x, point.y);

                // Gradually change color from red to green as clicks increase
                const progress = clickCounts[pointId] / maxClicksPerPoint;
                calibrationPoint.style.backgroundColor = `rgb(${255 - progress * 255}, ${progress * 255}, 0)`; // Transition from red to green

                // If this point is fully calibrated (clicked 5 times), disable further clicks
                if (clickCounts[pointId] === maxClicksPerPoint) {
                    calibrationPoint.style.opacity = 0.5; // Indicate it's done
                }
            }

            // When all points are clicked 5 times, complete calibration
            if (totalClicks === totalPoints) {
                alert('Calibration complete!');
            }
        });

        calibrationContainer.appendChild(calibrationPoint);
    });
}
// Recalibration function
const recalibrate = () => {
    return new Promise((resolve) => {
        webgazer.clearData(); // Clears any existing calibration data

        // Initialize the gaze listener
        webgazer.setGazeListener(function(data, elapsedTime) {
            if (data == null) return;
            var x = data.x;
            var y = data.y;
            // You can uncomment the console.log if you want to see gaze points
            // console.log("Gaze detected at: ", x, y);
        }).begin();

        // Start the calibration process
        startCalibration(5, 9); // Begin calibration again

        // Add a way to resolve the promise when calibration is done
        // You can change this logic according to your calibration completion criteria
        // For instance, if you have a calibration complete alert, you could resolve the promise there

        // Example: using a timeout to simulate calibration completion (replace with your logic)
        setTimeout(() => {
            alert('Calibration complete!');
            resolve(); // Resolve the promise when calibration is complete
        }, 5000); // Simulate 5 seconds for calibration
    });
}

export {recalibrate,startCalibration};