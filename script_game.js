var players = JSON.parse(localStorage.getItem("players")) || [];
var tasksNoPlayer = [];
var tasks1Player = [];
var cacheTasksNoPlayer = []
var radioButtons = [];
var count = 0;
var drunkCounter = 0;
var current = -1;
var mouseX;
var mouseY;
var data = {
    "tasksNoPlayer":[
      {
          "task":"Jeder der heute Abend schon gekotzt hat, muss trinken",
          "toDrink":1
      },
      {
        "task":"Jeder der schonmal im Zug betrunken eingeschlafen ist muss 3 Schlücke trinken",
        "toDrink":3
      },
      {
        "task":"Jeder der mehr als zwei Sprachen sprechen kann, muss trinken",
        "toDrink":1
      },
      {
        "task":"Jeder der nicht Cedric Emanuel Weiss heißt, muss trinken",
        "toDrink":1
      },
      {
        "task":"Jeder der schonmal seine Schuhe verloren hat muss 3 Schlücke trinken",
        "toDrink":3
      },
      {
        "task":"Jeder der schonmal im Zug betrunken eingeschlafen ist muss 3 Schlücke trinken",
        "toDrink":3
      },
      {
        "task":"Jüngster und Ältester Spieler trinkt",
        "toDrink":1
      },
      {
        "task":"Jeder der nicht an einer Uni ist, muss exen",
        "toDrink":10
      }
    ],
    "tasks1Player": [
      {
        "task":", du darfst eine neue Regel einführen",
        "toDrink":0
      },
      {
        "task":", deine Mitspieler haben 30 Sekunden, um dich zum Lachen zu bringen. Wenn sie es schaffen trinkst du, ansonsten trinken sie",
        "toDrink":1
      },
      {
        "task":"erzähl einen Witz, wenn keiner lacht trink",
        "toDrink":1
      },
      {
        "task":"trinkt ein Shot",
        "toDrink":1
      },
      {
        "task":"muss einen Trinkbuddy bestimmen",
        "toDrink":0
      },
      {
        "task":"muss auf ex trinken",
        "toDrink":10
      },
      {
        "task":"trinkt, einfach so weil er/sie so toll ist",
        "toDrink":1
      },
      {
        "task":"bestimmt eine Person die trinken muss",
        "toDrink":1
      }
    ]
};

window.onLoad = onLoad();
/*Joker, Verweigern*/
/*game*/


document.addEventListener("touchstart", updateMousePos);


function loadJson() {
    fetch("tasks.json")
    .then(response => response.json())
    .then(data => {
        tasksNoPlayer = data.tasksNoPlayer;
        tasks1Player = data.tasks1Player;
    });
}

function onLoad() {
    loadJson();
    tasksNoPlayer = data.tasksNoPlayer;
    tasks1Player = data.tasks1Player;
    generateTask();
    showText();
}

function showText() {
    var div = document.createElement("div");
    var playerText;
    var taskText;



    
    div.style.color = "rgb(209, 179, 42)";
    div.style.margin = "0px";
    div.style.fontSize = "35px";


    if(cacheTasksNoPlayer[current].length==2) {
        var tmp = cacheTasksNoPlayer[current];
        playerText = document.createTextNode(tmp[0]);
        taskText = document.createTextNode(" " +tmp[1]);
        div.appendChild(playerText);
        div.appendChild(taskText); 
    }
    else {
        var tmp = cacheTasksNoPlayer[current];
        taskText = document.createTextNode(tmp[0]);
        div.appendChild(taskText); 
        showRadioButtons();
    }


    document.getElementById("task").appendChild(div);
    updateDrunkCounter();
}

function updateDrunkCounter() {
  document.getElementById("drunk").innerHTML = drunkCounter+ " Schlücke"; 

  console.log("drunkCounter"+drunkCounter);
}

function showRadioButtons() {
    var ul = document.createElement("ul");


    for (var i = 0;i<players.length;i++) {
        var li = document.createElement("li");
        var input = document.createElement("input");
        var label = document.createElement("label");
       
        input.type = "radio";
        input.value = i.toString();
        if(i==cacheTasksNoPlayer[current][2]) {
          label.style.backgroundColor = "rgba(71, 130, 197, 0.774)";
        }

        radioButtons[radioButtons.length] = label;
        
        input.setAttribute("onclick", "changeRadioButton(this)");

        var text = document.createTextNode(i.toString());

        label.appendChild(text);

        li.appendChild(input);
        li.appendChild(label);

        

        ul.appendChild(li);
    }

    document.getElementById("footer").appendChild(ul);
}

function changeRadioButton(radioButton) {
    console.log("befor"+cacheTasksNoPlayer[current][2]);
    drunkCounter -= cacheTasksNoPlayer[current][1]*cacheTasksNoPlayer[current][2];
    cacheTasksNoPlayer[current][2] = radioButton.value;
    drunkCounter += cacheTasksNoPlayer[current][1]*cacheTasksNoPlayer[current][2];
    console.log("after"+cacheTasksNoPlayer[current][2]);

    for(var i = 0;i<radioButtons.length;i++) {
      radioButtons[i].style.backgroundColor = "transparent";
    }

    radioButton.nextSibling.style.backgroundColor ="rgba(71, 130, 197, 0.774)";

    updateDrunkCounter();
}


function removeText(element) {
    element.childNodes[2].childNodes[3].childNodes[5].childNodes[1].remove();
}

function removeRadioButtons(element) {
    if(element.childNodes[2].childNodes[5].childNodes[0]!=undefined) {
      element.childNodes[2].childNodes[5].childNodes[0].remove()
    }
}

function onClick(element) {
    console.log(mouseY);
    if(mouseY>645) return;
    if(mouseX<180) {
        prevTask(element);
    }
    else {
        nextTask(element);
    }
}

function updateMousePos(evt) {
    mouseX = evt.touches[0].clientX;
    mouseY = evt.touches[0].clientY;
}

function nextTask(test) {
    removeText(test);
    removeRadioButtons(test);
    if(current==(cacheTasksNoPlayer.length-1)) {
        generateTask();
    }
    else {
        current++;
    }
    
    showText();
}

function prevTask(test) {
    if(current>0) {
        removeText(test);
        removeRadioButtons(test);
        current--;
        showText();
    }
}

function generateTask() {
    current++;

    if(getRandom(0,9)<5) {
        var tmp = [];
        var element = getRandom(0,tasks1Player.length-1);
        tmp[0] = players[getRandom(0,players.length-1)];
        tmp[1] = tasks1Player[element].task;
        cacheTasksNoPlayer[current] = tmp;
        drunkCounter += tasks1Player[element].toDrink;
    }
    else {
        var tmp = [];
        var element = getRandom(0,tasksNoPlayer.length-1);
        tmp[0] = tasksNoPlayer[element].task;
        tmp[1] = tasksNoPlayer[element].toDrink;
        tmp[2] = 0;
        cacheTasksNoPlayer[current] = tmp;
        //drunkCounter += tasksNoPlayer[element].toDrink;
    }
    console.log("cache");
    console.log(cacheTasksNoPlayer);
}


function getRandom(low,high) {
    return Math.floor(Math.random() * (high-low+1)+low);
}
