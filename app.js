const timeDisplay = document.getElementById('time')
let taskInput = document.querySelector('#taskInput')
const pomodoroBtn = document.querySelector('.pomodoro')
const breakBtn = document.querySelector('.break')
const startBtn = document.querySelector('.start')
const pauseBtn = document.querySelector('.pause')
const addBtn = document.querySelector('.add')
const deleteBtn = document.querySelector('.delete')
let tasksOutput = document.querySelector('#tasksOutput')

const pomodoroMins = 25;
let pomTime = pomodoroMins * 60;
const breakMins = 5;
let breakTime = breakMins * 60;

let interval = null

let pomodoroCounter = 0;
let breakCounter = 0;

var tasks= [""];

pomodoroBtn.addEventListener('click', startPomodoro)
breakBtn.addEventListener('click', startBreak)
startBtn.addEventListener('click', startTimer)
pauseBtn.addEventListener('click', pauseTimer)
addBtn.addEventListener('click', addTask)
deleteBtn.addEventListener('click', deleteTask)

function formatTime(minutes, seconds) {
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function pomodoroTimer(){
    let minutes = Math.floor(pomTime/60);
    let seconds = pomTime % 60;
    timeDisplay.innerHTML = formatTime(minutes, seconds)
    if (pomTime <= 0) {
        clearInterval(interval)
        pomTime = pomodoroMins * 60;
        pomodoroCounter = 0;
        breakCounter = 1;
        breakTimer()
        alert('Time is up.')
    } else {
        pomTime--;
    }
}

function breakTimer(){
    let minutes = Math.floor(breakTime/60);
    let seconds = breakTime % 60;
    timeDisplay.innerHTML = formatTime(minutes, seconds)
    if (breakTime <= 0) {
        clearInterval(interval)
        breakTime = breakMins * 60;
        pomodoroCounter = 1;
        breakCounter = 0;
        pomodoroTimer()
        alert('Time is up.')
    } else {
        breakTime--;
    }
}

function startPomodoro(){
    clearInterval(interval)
    let minutes = Math.floor(pomTime/60);
    let seconds = pomTime % 60;
    timeDisplay.innerHTML = formatTime(minutes, seconds)
    pomodoroCounter = 1;
    breakCounter = 0;
}

function startBreak(){
    clearInterval(interval)
    let minutes = Math.floor(breakTime/60);
    let seconds = breakTime % 60;
    timeDisplay.innerHTML = formatTime(minutes, seconds)
    pomodoroCounter = 0;
    breakCounter = 1;
}

function startTimer(){
    if(pomodoroCounter == 1 && breakCounter == 0){
        interval = setInterval(pomodoroTimer, 1000) 
    } 
    else if(pomodoroCounter == 0 && breakCounter == 1){
        interval = setInterval(breakTimer, 1000)
    }  
}

function pauseTimer(){
    clearInterval(interval);
    interval = null;
}

function addTask(){
    const newTask = taskInput.value.trim()
    tasks.push(newTask)
    taskInput.value = ''
    tasksOutput.innerHTML = tasks.slice(1).map((task, index) => `<div>${index + 1}. ${task}</div>`).join('')
}

function deleteTask(){
    if(tasks.length > 0){
        tasks.shift();
        tasksOutput.innerHTML = tasks.slice(1).map((task, index) => `<div>${index + 1}. ${task}</div>`).join('')
    }
}