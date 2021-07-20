let pixelColor = '#656565';
let random = false;
let defaultBG = 'Gainsboro';

const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clearGrid);

const blueButton = document.querySelector('#blue');
blueButton.addEventListener('click', blueFunc);

const randomButton = document.querySelector('#random');
randomButton.addEventListener('click', randomChanger);



//Create default grid
createGrid(50);
let currentSize = 50;

function draw (color, square) {
    square.style.backgroundColor = color;
}

const slider = document.querySelector('#myRange');
slider.step = 2;
slider.addEventListener('change', function(e) {
    if (this.value * 4 != currentSize) {
        resizeGrid(this.value * 4);
    }
});

function createGrid(size) {
    const container = document.querySelector('#grid-container');
    let maxWidth = container.clientWidth;
    console.log(maxWidth);
    let pixelSize = (100 / size + "%");
    console.log(pixelSize);
    for (let i = 0; i < size*size; i++) {
        const currDiv = document.createElement('div');
        currDiv.style.width = pixelSize;
        currDiv.style.height = pixelSize;
        //currDiv.style.borderInline = 'solid';
        //currDiv.style.borderWidth = '1px';
        currDiv.style.padding = '0';
        currDiv.style.backgroundColor = defaultBG;
        currDiv.setAttribute("name", i);
        currDiv.setAttribute("class", "pixels")
        currDiv.addEventListener('mouseover', function(e) {
            if (random) {
                pixelColor = randomColor();
            }
            draw(pixelColor, currDiv);
            e.stopPropagation();
        });
        container.appendChild(currDiv);
    }
}

function clearGrid() {
    const pixels = document.querySelectorAll('.pixels');
    pixels.forEach(pixel => pixel.style.backgroundColor = defaultBG);
}

function resizeGrid(newSize) {
    const pixels = document.querySelectorAll('.pixels');
    pixels.forEach(e => e.parentNode.removeChild(e));
    createGrid(newSize);
    currentSize = newSize;
}

function blueFunc() {
    pixelColor = 'blue';
}

function randomChanger() {
    random = !random;
    console.log(random);
}

function randomColor() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}