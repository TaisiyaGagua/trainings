const button = document.querySelector('button');

function showSec() {
    document.getElementById('button_icon').style.visibility = "hidden";
    document.getElementById('button_icon2').hidden = false;
    button.removeEventListener('click', showSec);
    button.addEventListener('click', showFirst);
}

function showFirst() {
    document.getElementById('button_icon').style.visibility = "visible";
    document.getElementById('button_icon2').hidden = true;
    button.removeEventListener('click', showFirst);
    button.addEventListener('click', showSec);
}

button.addEventListener('click', showSec);