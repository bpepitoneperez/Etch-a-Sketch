//Initialize some global variables
let defaultPixelColor = '#656565';
let pixelColor = defaultPixelColor;
let lastColor = defaultPixelColor;
let defaultBG = 'Gainsboro';
let random = false;
let rainbow = false;
let eraser = false;
let mouseDown = false;
let mouseUp = false;
let outlines = false;

//Event Listener for mousedown
document.addEventListener('mousedown', function() {
    mouseDown = true;
    mouseUp = false;
});

//Event Listener for mouseup
document.addEventListener('mouseup', function() {
    mouseUp = true;
    mouseDown = false;
});

//Clear button with clear event listener
const clearButton = document.querySelector('#clear');
clearButton.addEventListener('click', clearGrid);

//Random button with event listener
const randomButton = document.querySelector('#random');
randomButton.addEventListener('click', randomChanger);

//Rainbow button with event listener
const rainbowButton = document.querySelector('#rainbow');
rainbowButton.addEventListener('click', rainbowChanger);

//Eraser button with event listener
const eraserButton = document.querySelector('#eraser');
eraserButton.addEventListener('click', eraserChanger);

//Outline button with event listener
const outlineButton = document.querySelector('#outlines');
outlineButton.addEventListener('click', outlineChanger);

//Color picker with event listener
const colorPicker = document.querySelector('#colorPicker');
colorPicker.addEventListener('input', function(e) {
    colorPicked(this.value);
    random = false;
    rainbow = false;
    eraser = false;
});

//Slider with event listener
const slider = document.querySelector('#myRange');
slider.step = 2;
slider.addEventListener('change', function(e) {
    if (this.value * 4 != currentSize) {
        resizeGrid(this.value * 4);
    }
});

//Function that changes the color to the selected color
function colorPicked (color) {
    pixelColor = color;
    lastColor = pixelColor;
}

//Draw function that changes the background color of the current div to the color
function draw (color, square) {
    square.style.backgroundColor = color;
}

//Create the grid with columns and rows as the size parameter
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
        currDiv.style.padding = '0';
        currDiv.style.backgroundColor = defaultBG;
        currDiv.style.transition = 'background-color 0.2s';
        currDiv.setAttribute("name", i);
        currDiv.setAttribute("class", "pixels")
        if (outlines) {
            currDiv.style.outline = '1px solid black';
        }
        currDiv.addEventListener('mouseover', function(e) {
            if (random) {
                pixelColor = randomColor();
                lastColor = pixelColor;
            }
            else if (rainbow) {
                pixelColor = rainbowColor();
                lastColor = pixelColor;
            }
            else if (eraser) {
                pixelColor = defaultBG;
            }
            if (mouseDown) {
                draw(pixelColor, currDiv);
                e.stopPropagation();
            }
        });
        container.appendChild(currDiv);
    }
}

//Clear grid function
function clearGrid() {
    const pixels = document.querySelectorAll('.pixels');
    pixels.forEach(function(pixel) {
        pixel.style.backgroundColor = defaultBG;
    });
    eraser = false;
    pixelColor = lastColor;
}

function outlineChanger() {
    outlines = !outlines;
    if (outlines) {
        const pixels = document.querySelectorAll('.pixels');
        pixels.forEach(function(pixel) {
            pixel.style.outline = '1px solid black';
        });
    }
    else {
        const pixels = document.querySelectorAll('.pixels');
        pixels.forEach(function(pixel) {
            pixel.style.outline = '0px solid black';
        });
    }
}

//Resize grid function
function resizeGrid(newSize) {
    const pixels = document.querySelectorAll('.pixels');
    pixels.forEach(e => e.parentNode.removeChild(e));
    createGrid(newSize);
    currentSize = newSize;
}

//Function that toggles random
function randomChanger() {
    random = !random;
    rainbow = false;
    eraser = false;
}

//Function that toggles rainbow
function rainbowChanger() {
    rainbow = !rainbow;
    random = false;
    eraser = false;
}

function eraserChanger() {
    eraser = !eraser;
    random = false;
    rainbow = false;
}

//Sets color to a completely random color
function randomColor() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 & 255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

function rainbowColor() {
    let num = Math.floor(Math.random() * 7);
    if (num == 0) {
        return 'red';
    }
    else if (num == 1) {
        return 'orange';
    }
    else if (num == 2) {
        return 'yellow';
    }
    else if (num == 3) {
        return 'green';
    }
    else if (num == 4) {
        return 'blue';
    }
    else if (num == 5) {
        return 'indigo';
    }
    else if (num == 6) {
        return 'violet';
    }

}


//Create default grid
createGrid(50);
let currentSize = 50;