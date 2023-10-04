var players = JSON.parse(localStorage.getItem("players")) || [];
window.onload = onLoad();

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then((reg) => console.log('service worker registered', reg))
        .catch((err) => console.log('service worker not registered', err))
}

function onLoad() {
    console.log("hehehehadsah");
    showElements(0);
}

function addPlayerOnEnter(element) {
    if(event.key=='Enter') {
        addPlayer();
    }
}

function addPlayer() {
    if(document.getElementById("input").value.length>22) {
        alert("Name zu lang!");
        return;
    }
    if(!document.getElementById("input").value =="") {
        players.push(document.getElementById("input").value);
  
        console.log(players);

        saveData();
        showElements(players.length-1);
        document.getElementById("input").value = "";
    }
}

function removePlayer(txt) {
    players.splice(players.indexOf(txt.innerHTML),1);
    txt.remove();
    console.log(players);
    saveData();

}

function test() {
    console.log(players);
}



function showElements(i) {
    for(;i<players.length;i++) {
        var p = document.createElement("p");

        p.setAttribute("onclick", "removePlayer(this)");

        var text = document.createTextNode(players[i]);
        p.appendChild(text);

        document.getElementById("player").appendChild(p);
    }
}

function saveData() {
    localStorage.setItem("players", JSON.stringify(players));
} 


function getRandom(low,high) {
    return Math.floor(Math.random()*high) + low;
}





