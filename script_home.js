var players = JSON.parse(localStorage.getItem("players")) || [];
window.onload = onLoad();


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
    if(!document.getElementById("input").value =="") {
        players.push(document.getElementById("input").value);
  
        console.log(players);

        saveData();
        showElements(players.length-1);
        document.getElementById("input").value = "";
    }
}

function removePlayer(btn) {
    players.splice(players.indexOf(btn.previousSibling.innerHTML),1);
    btn.parentNode.remove();
    console.log(players);
    saveData();

}

function test() {
    console.log(players);
}



function showElements(i) {
    for(;i<players.length;i++) {
        var div = document.createElement("div");
        var h3 = document.createElement("h3");
        var button = document.createElement("button");

        div.style.display = "flex";
        div.style.margin = "5px"; 
        div.style.width = "max-content";   

        h3.style.color = "#720015";
        h3.style.margin = "0px";
        h3.style.fontSize = "35px";
        
        button.style.marginLeft = "10px";
        button.style.marginTop = "5px";
        button.innerHTML = "X";
        button.style.height = "35px";
        button.style.width = "35px";

        button.style.border = "3px solid rgba(255, 255, 255, 0.774)";
        button.style.borderRadius = "15px";
        button.style.backgroundColor = "rgba(173, 170, 170, 0.644)";
        button.setAttribute("onclick", "removePlayer(this)");

        var text = document.createTextNode(players[i]);
        h3.appendChild(text);

        div.appendChild(h3);
        div.appendChild(button);
        document.getElementById("player").appendChild(div);
    }
}

function saveData() {
    localStorage.setItem("players", JSON.stringify(players));
} 


function getRandom(low,high) {
    return Math.floor(Math.random()*high) + low;
}





