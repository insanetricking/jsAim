'use strict'

const startBtn = document.querySelector('.start'),
    screens = document.querySelectorAll('.screen'),
    timeList = document.querySelector('.time-list'),
    elTime = document.querySelector('#time'),
    board = document.querySelector('#board');

let time = 0;
let score = 0;

startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    screens[0].classList.add('up');
})

timeList.addEventListener('click', (e) => {
    if (e.target.classList.contains('time-btn')) {
        screens[1].classList.add('up');
       let elAttr = e.target.getAttribute('data-time');
        time = parseInt(elAttr);
        startGame();
    }
})

function startGame() {
    setInterval(decreaseTime, 1000);
    createCircle();
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let currentTime = --time;
        if (currentTime < 10) {
            currentTime = `0${currentTime}`
        }
        setTime(currentTime);
    }
}

function setTime(value) {
    elTime.innerHTML = `00:${value}`
}

function finishGame() {
    elTime.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Ваш счет: ${score}</h1>`;
}

function createCircle() {
    const circle = document.createElement('div');

    circle.classList.add('circle');
    
    let size = setSize(20,60),
        top = setPosition(size,500 - size),
        left = setPosition(size,500 - size);
    
    
    circle.style = `
    width: ${size}px;
    height: ${size}px;
    top: ${top}px;
    left: ${left}px ;
    `;

    board.appendChild(circle);
}


function setSize(min, max) {
    return Math.floor(Math.random() * (max-min) + min);
    
}

function setPosition(min,max){
    return Math.floor(Math.random() * (max-min) + min);
}


board.addEventListener('click', (e) => {
    if (e.target.classList.contains('circle')) {
        score++;
        e.target.remove();
        createCircle();
    }
})