let array = [
    '#000000',
    '#2B8EAD',
    '#333333',
    '#6F98A8',
    '#FFFFFF',
    '#BFBFBF',
    '#EFEFEF',
    '#2F454E',
    '#72C3DC'].map((val, index) => ({ val: index + 1, colorCode: val }))
const listEle = document.getElementById('list')

function sort() {
    array.sort((next, curr) => next.val - curr.val)
    updateList()
}
function randomNumber(minRange, maxRange) {
    return Math.random() * (maxRange - minRange) + minRange;
}
function shuffle() {
    array.sort(() => randomNumber(-1, 1))
    updateList()
}
function updateList() {
    while (listEle.firstChild) {
        listEle.firstChild.remove()
    }
    array.forEach(val => {
        listEle.appendChild(getCardTemplate(val.val, val.colorCode))
    })
}
function getCardTemplate(val, colorCode) {
    const divEle = document.createElement('div')
    const colorEle = document.createElement('div')
    const valEle = document.createElement('div')
    valEle.innerHTML = val
    divEle.className = 'list-item col-4 col-xs-12'
    valEle.className = 'content center-content'
    colorEle.style.backgroundColor = colorCode
    colorEle.className = 'color'
    divEle.style.color = invertColorValue(colorCode)
    divEle.appendChild(colorEle)
    divEle.appendChild(valEle)
    return divEle
}
function invertColorValue(hexValue) {
    if (hexValue.indexOf('#') === 0) {
        hexValue = hexValue.slice(1);
    }
    if (hexValue.length === 3) {
        hexValue = hexValue[0] + hexValue[0] + hexValue[1] + hexValue[1] + hexValue[2] + hexValue[2];
    }
    var r = (255 - parseInt(hexValue.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hexValue.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hexValue.slice(4, 6), 16)).toString(16);
    return `#${padZero(r)}${padZero(g)}${padZero(b)}`;
}
function padZero(value, length) {
    length = length || 2;
    const zeros = new Array(length).join('0');
    return (zeros + value).slice(-length);
}
document.getElementById('shuffle-btn').addEventListener('click', shuffle)
document.getElementById('sort-btn').addEventListener('click', sort)
updateList()