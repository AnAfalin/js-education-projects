const mainSlide = document.querySelector('.main-slide');
const slidesCount = mainSlide.querySelectorAll('div').length;

const upBtn = document.querySelector('.up-button');
const downBtn = document.querySelector('.down-button');

const sidebar = document.querySelector('.sidebar');
const container = document.querySelector('.container');

let activeSlideIndex;

let activeSlide = mainSlide.querySelector('.active');
let mainSlides = mainSlide.querySelectorAll('div');

for (let i = 0; i < mainSlides.length; i++) {
    mainSlides[i].classList.contains('active') === true ? activeSlideIndex = i : activeSlideIndex = 0;
}

sidebar.style.top = `-${(slidesCount - 1) * 100}vh`;

upBtn.addEventListener('click', () => {
    changesSlides('up');
});

downBtn.addEventListener('click', () => {
    changesSlides('down');
});

document.addEventListener('keydown',
    event => {
        if (event.key === 'ArrowUp') {
            changesSlides('up');
        } else if (event.key === 'ArrowDown') {
            changesSlides('down');
        }
    });

function changesSlides(direction) {
    if (direction === 'up') {
        activeSlideIndex++;
        if (activeSlideIndex === slidesCount) {
            activeSlideIndex = 0;
        }
    } else {
        activeSlideIndex--;
        activeSlideIndex < 0 ? activeSlideIndex = slidesCount - 1 : activeSlideIndex;
    }

    const height = container.clientHeight;

    mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`;
    sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`;
}