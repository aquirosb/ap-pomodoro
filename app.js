const timeDisplay = document.getElementById('time')
const pomodoroBtn = document.querySelector('.pomodoro')
const breakBtn = document.querySelector('.break')
const startBtn = document.querySelector('.start')
const pauseBtn = document.querySelector('.pause')

const pomodoroMins = 25;
let pomTime = pomodoroMins * 60;
const breakMins = 5;
let breakTime = breakMins * 60;

let interval = null

let pomodoroCounter = 0;
let breakCounter = 0;

pomodoroBtn.addEventListener('click', pomodoroTimer)
breakBtn.addEventListener('click', breakTimer)
startBtn.addEventListener('click', startTimer)
pauseBtn.addEventListener('click', pauseTimer)

function formatTime(minutes, seconds) {
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function pomodoroTimer(){
    let minutes = Math.floor(pomTime/60);
    let seconds = pomTime % 60;
    timeDisplay.innerHTML = formatTime(minutes, seconds)
    if (pomTime <= 0) {
        clearInterval(interval);
        pomTime = pomodoroMins * 60;
    } else {
        pomTime--;
        pomodoroCounter = 1;
        breakCounter = 0;
    }
}

function breakTimer(){
    let minutes = Math.floor(breakTime/60);
    let seconds = breakTime % 60;
    timeDisplay.innerHTML = formatTime(minutes, seconds)
    if (breakTime <= 0) {
        clearInterval(interval);
        breakTime = breakMins * 60;
    } else {
        breakTime--;
        pomodoroCounter = 0;
        breakCounter = 1;
    }
}

function startTimer(){
    if(pomodoroCounter == 1 && breakCounter == 0) 
        interval = setInterval(pomodoroTimer, 1000)
    else if(pomodoroCounter == 0 && breakCounter == 1)
        interval = setInterval(breakTimer, 1000)
}

function pauseTimer(){
    clearInterval(interval);
    interval = null;
}