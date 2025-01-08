let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;
let isWorkTime = true;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const toggleButton = document.getElementById('toggle-mode');
const modeText = document.getElementById('mode-text');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function updateTheme(isWorkMode) {
    if (isWorkMode) {
        document.body.classList.remove('rest-mode');
    } else {
        document.body.classList.add('rest-mode');
    }
}

function toggleMode() {
    clearInterval(timerId);
    timerId = null;
    
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
    modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    toggleButton.textContent = isWorkTime ? 'Switch to Rest Mode' : 'Switch to Work Mode';
    toggleButton.style.backgroundColor = isWorkTime ? '#ff9800' : '#4CAF50';
    toggleButton.style.borderColor = isWorkTime ? '#f57c00' : '#45a049';
    updateTheme(isWorkTime);
    updateDisplay();
}

function startTimer() {
    if (timerId === null) {
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                isWorkTime = !isWorkTime;
                timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
                modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
                toggleButton.textContent = isWorkTime ? 'Switch to Rest Mode' : 'Switch to Work Mode';
                toggleButton.style.backgroundColor = isWorkTime ? '#ff9800' : '#4CAF50';
                toggleButton.style.borderColor = isWorkTime ? '#f57c00' : '#45a049';
                updateTheme(isWorkTime);
                updateDisplay();
                alert(isWorkTime ? 'Work Time!' : 'Break Time!');
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = 25 * 60;
    modeText.textContent = 'Work Time';
    toggleButton.textContent = 'Switch to Rest Mode';
    toggleButton.style.backgroundColor = '#ff9800';
    toggleButton.style.borderColor = '#f57c00';
    updateTheme(true);
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
toggleButton.addEventListener('click', toggleMode);

// Initialize display
updateDisplay();
toggleButton.textContent = 'Switch to Rest Mode';
toggleButton.style.backgroundColor = '#ff9800';
toggleButton.style.borderColor = '#f57c00';
updateTheme(true); 