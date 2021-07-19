const container = document.querySelector('#grid-container');

let divArr = new Array(16);
for (let i = 0; i < 16; i++) {
    divArr[i] = new Array(16);
    for (let j = 0; j < 16; j ++) {
        divArr[i, j] = document.createElement('div');
        divArr[i, j].style.width = '6%';
        divArr[i, j].style.height = '0';
        divArr[i, j].style.paddingBottom = '6%';
        divArr[i, j].style.border = 'solid';
        divArr[i, j].style.borderWidth = '1px';
        container.appendChild(divArr[i, j]);
    }
}
