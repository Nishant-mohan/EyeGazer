function startGazeClick() {
    console.log("its starts")
    let gazeTimer = null;
    let currentlyHoveredElement = null;
    const gazeTimeThreshold = 200; // Time in milliseconds to trigger a click

    webgazer.setGazeListener(function(data, elapsedTime) {
        if (data == null) return;

        const xprediction = data.x;
        const yprediction = data.y;

        const element = document.elementFromPoint(xprediction, yprediction);

        if (element && element.classList.contains('clickable')) {
            if (currentlyHoveredElement !== element) {
                resetGaze();
                currentlyHoveredElement = element;
                element.classList.add('gaze-hover');
                gazeTimer = setTimeout(() => {
                    triggerClick(element);
                }, gazeTimeThreshold);
            }
        } else {
            resetGaze();
        }
    }).begin();
    // Function to trigger click
    function triggerClick(element) {
        console.log(`Simulated click on: ${element.id}`);
        element.click();
        resetGaze();
    }

    // Reset gaze
    function resetGaze() {
        if (gazeTimer) clearTimeout(gazeTimer);
        if (currentlyHoveredElement) currentlyHoveredElement.classList.remove('gaze-hover');
        currentlyHoveredElement = null;
    }
}

export {startGazeClick};