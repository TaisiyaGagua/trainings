const wsUrl = "wss://echo-ws-service.herokuapp.com";

const input = document.querySelector('.input');
const buttonSend = document.getElementById("button_send");
const buttonGeo = document.getElementById("button_geo");
const output = document.getElementById("output");

function writeToScreen(message) {
    let user = document.createElement("p");
    user.className = "user_message"
    user.innerHTML = message;
    output.appendChild(user);
}

let websocket = new WebSocket(wsUrl);
websocket.onopen = function (evt) {
    console.log("CONNECTED");
}

websocket.onmessage = function (evt) {
    let pre = document.createElement("p");
    pre.className = "server_message";
    pre.innerHTML = `${evt.data}`;
    output.appendChild(pre);
}

websocket.onerror = function (evt) {
    console.log("CONNECTION ERROR");
}

function result() {
    let message = input.value;
    websocket.send(message);
    writeToScreen(`${message}`);
    input.value = "";
}

buttonSend.addEventListener('click', result);

function handleKeyPress(e) {
    var key = e.keyCode || e.which;
    if (key === 13) {
        result();
    }
}

const error = () => {
    alert('Невозможно получить местоположение');
}

const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    let mapLink = document.createElement("a");
    mapLink.setAttribute('target', '_blank');
    mapLink.innerHTML = 'карта';
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    output.appendChild(mapLink);
}

buttonGeo.addEventListener('click', () => {
    if (!navigator.geolocation) {
        alert('Geolocation не поддерживается вашим браузером');
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
});




