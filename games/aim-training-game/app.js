const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');

const boardEl = document.querySelector('#board');
const timeList = document.querySelector('#time-list');

const restartGameBtn = createRestartBtn();

const colors = ['#ec220b', '#b202ff', '#3da5ef', '#ff973a',
    '#0224ec', '#058c3f', '#f8de48', '#f553dd'];

let time = 0;
let score = 0;
let interval;

function createRestartBtn() {
    let btn = document.createElement('button');
    btn.id = 'restart';
    btn.innerHTML = 'Начать заново';
    btn.classList.add('restart-btn');
    return btn;
};

restartGameBtn.addEventListener('click', (event) => {
    event.preventDefault(); // отмена действия по умолчанию

    screens[0].classList.remove('up');
    screens[1].classList.remove('up');

    boardEl.classList.add('hide')
    score = 0;
    time = 0;
});

startBtn.addEventListener('click', (event) => {
    event.preventDefault(); // отмена действия по умолчанию
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = Number.parseInt(event.target.getAttribute('data-time'));
        startGame();
    }
});

boardEl.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
});

const timeEl = document.querySelector('#time');

function startGame() {
    interval = setInterval(decreaseTime, 1000);
    screens[1].classList.add('up');
    timeEl.parentNode.classList.remove('hide');
    boardEl.classList.remove('hide')
    boardEl.innerHTML = ``;
    createRandomCircle();
    setTime(time);
};

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    let childNode = boardEl.childNodes.item(0);
    boardEl.removeChild(childNode)

    const finishEl = document.createElement('div');
    finishEl.style.display = 'flex';
    finishEl.style.flexDirection = 'column';
    finishEl.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`;

    finishEl.append(restartGameBtn);

    boardEl.append(finishEl);
};


function decreaseTime() {
    if (time === 0) {
        clearInterval(interval);
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
};

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 60);
    const {width, height} = boardEl.getBoundingClientRect(); //деструктуризация
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${x}px`;
    circle.style.left = `${y}px`;
    circle.style.backgroundColor = `${colors[getRandomNumber(0, colors.length - 1)]}`;

    boardEl.append(circle);
};

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
};
