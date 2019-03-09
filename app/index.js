const moment = require('moment');
const ipcRenderer = require('electron').ipcRenderer;

// NOTE: Helper function, to format the time
const secondsToTime = (s) => {
    let momentTime = moment.duration(s, 'seconds');
    let sec = momentTime.seconds() < 10 ? ('0' + momentTime.seconds()) : momentTime.seconds();
    let min = momentTime.minutes() < 10 ? ('&nbsp;&nbsp;' + momentTime.minutes()) : momentTime.minutes();
    return `${min}:${sec}`;
};

var TIMER_STATUS = {
    START: 1,
    STOP: 2,
};
let maxTime;
let currentTime;
let timerStatus = TIMER_STATUS.STOP;

function addTimer(duration) {
    maxTime = Math.max(60, maxTime + duration);
    stopTimer();
    resetTimer();
}

function updateTimer() {
    timerMax.innerHTML = secondsToTime(maxTime);
    timerDiv.innerHTML = secondsToTime(currentTime);
}

function resetTimer() {
    timerMax.innerHTML = secondsToTime(maxTime);
    timerDiv.innerHTML = secondsToTime(maxTime);
    currentTime = maxTime;
    $('body').css('background-color', '#000000');
}

function stopTimer() {
    timerStatus = TIMER_STATUS.STOP;
    $('body').css('background-color', '#FF6600');
}

function finishTimer() {
    timerStatus = TIMER_STATUS.STOP;
    $('body').css('background-color', '#AF1E2D');
}

function startTimer() {
    if (timerStatus == TIMER_STATUS.START) {
        return;
    }
    $('body').css('background-color', '#113A47');
    timerStatus = TIMER_STATUS.START;
    let interval_ms = 1000;
    let timer = setInterval(() => {
        if (timerStatus != TIMER_STATUS.START) {
            clearInterval(timer);
            stopTimer();
            return;
        }
        currentTime = currentTime - 1;
        updateTimer();
        // When reaching 0. Stop.
        if (currentTime <= 0) {
            clearInterval(timer);
            finishTimer();
        }
    }, interval_ms);
}

// ---- event ----
ipcRenderer.on('timer-init', (event, t) => {
    maxTime = t;
    resetTimer();
});

ipcRenderer.on('timer-change', (event, t) => {
    currentTime = t;
    updateTimer();
});

$('#startButton').on('click', function(event) {
    event.preventDefault();
    startTimer();
});
$('#stopButton').on('click', function(event) {
    event.preventDefault();
    stopTimer();
});
$('#resetButton').on('click', function(event) {
    event.preventDefault();
    resetTimer();
});
$('#addTimeButton').on('click', function(event) {
    event.preventDefault();
    addTimer(60);
});
$('#subTimeButton').on('click', function(event) {
    event.preventDefault();
    addTimer(-60);
});
