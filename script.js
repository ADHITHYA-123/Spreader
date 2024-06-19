document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const startButton = document.getElementById('startButton');
    const pauseButton = document.getElementById('pauseButton');
    const resetButton = document.getElementById('resetButton');
    const displayText = document.getElementById('displayText');
    const speedRange = document.getElementById('speedRange');
    const speedValue = document.getElementById('speedValue');

    let words = [];
    let currentIndex = 0;
    let isPlaying = false;
    let interval;

    speedRange.addEventListener('input', () => {
        speedValue.textContent = speedRange.value;
    });

    startButton.addEventListener('click', () => {
        if (inputText.value.trim()) {
            words = inputText.value.trim().split(/\s+/);
            if (!isPlaying) {
                play();
            }
        }
    });

    pauseButton.addEventListener('click', () => {
        if (isPlaying) {
            clearInterval(interval);
            isPlaying = false;
        }
    });


    resetButton.addEventListener('click', () => {
        clearInterval(interval);
        isPlaying = false;
        currentIndex = 0;
        displayText.textContent = '';
    });

    function play() {
        // Set isPlaying to true to indicate that the function is currently playing
        isPlaying = true;
        
        // Calculate the interval in milliseconds based on words per minute
        let wpm = parseInt(speedRange.value); // Get the words per minute from speedRange
        let intervalDuration = 60000 / wpm; // Calculate milliseconds per word
        
        // Set up an interval that executes a function every `intervalDuration` milliseconds
        interval = setInterval(() => {
            // Check if currentIndex is less than the length of the words array
            if (currentIndex < words.length) {
                // If currentIndex is within bounds, update the text content of displayText to the current word
                displayText.textContent = words[currentIndex];
                // Increment currentIndex to move to the next word for the next iteration
                currentIndex++;
            } else {
                // If currentIndex is equal to or exceeds the length of words array,
                // clear the interval to stop further execution
                clearInterval(interval);
                // Set isPlaying to false to indicate that the function has finished playing
                isPlaying = false;
            }
        }, intervalDuration); // Use the calculated interval duration
    }
    
});
