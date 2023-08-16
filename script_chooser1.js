var c = document.getElementById("chooser");
var draw = c.getContext("2d");
var players = [];
var players_per_team = 2;
var number_of_groups;
var groups = [];
var grouped = false;
var group_colors = [];
var timer = [];
var intervals = [];
var timer_idx = 0;
var time = 0;
var r = 50;
var v = 7;
var r_smaller = [[]];
var touching = [];




window.onLoad = changePlayers();

document.addEventListener('touchmove', run);
document.addEventListener("touchstart", startTimer);
document.addEventListener("touchend", endTimer);



function setR_Smaller(i) {
  
  if(!touching[i]) {
    r_smaller[i] = [];
      r_smaller[i][0] = r;
      r_smaller[i][1] = true;
      r_smaller[i][2] = 0;
      
    touching[i] = true;
  }
    
}

function changeSize(i) {
  if(r_smaller[i][1]) {
    for(var k = 1;k<=15;k++) {
      if(r_smaller[i][2]==k*v) {
        r_smaller[i][0] -= 1;
        if(r_smaller[i][2]==15*v) {
          r_smaller[i][2] = 0;
          r_smaller[i][1] = false;
        }
      }
      }
  }
  else if(!r_smaller[i][1]) {
    for(var k = 1;k<=15;k++) {
      if(r_smaller[i][2]==k*v) {
        r_smaller[i][0] += 1;
        if(r_smaller[i][2]==15*v) {
          r_smaller[i][2] = 0;
          r_smaller[i][1] = true;
        }
      }
      }
  }
}

function setMousePos(event) {
  
}

function run(event) {
    players.length = event.touches.length;
    setPlayers();
    number_of_groups = Math.ceil(players.length/players_per_team);
    draw.globalCompositeOperation = "copy";
    

    for (var i = 0;i<event.touches.length;i++) {
      setR_Smaller(i);
      var x = getMousePos(c, event, i).x;
      var y = getMousePos(c, event, i).y;
      changeColor(i);
      changeSize(i);
      draw.beginPath();
      draw.ellipse(x, y, r_smaller[i][0]*(c.width/c.getBoundingClientRect().width),r_smaller[i][0]*(c.height/c.getBoundingClientRect().height), 0, 0, 2*Math.PI);
      draw.fill();
      draw.globalCompositeOperation = "source-over";
      /*draw.lineWidth = 1;
      draw.strokeStyle = "blue";
      draw.stroke();*/
      r_smaller[i][2]++;
    }
    
}

function  getMousePos(canvas, evt, i) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
      scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y
    return {
      x: (evt.touches[i].clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
      y: (evt.touches[i].clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
}


function startTimer(event) {
    for(var i = 0;i<event.touches.length;i++) {
      touching[i] = false;
    }

    for(var i = 0;i<timer.length;i++) {
      clearTimeout(timer[i]);
    }
    timer[timer.length] = setTimeout(calcGroups, 2000);
}

function endTimer() {
    for(var i = 0;i<timer.length;i++) {
      clearTimeout(timer[i]);
    }
}

function calcGroups() {
    var current_group = 0;
    group_colors.length = 0;
    groups.length = 0;

    for(var i = 0;i<number_of_groups;i++) {
        group_colors[i] = [];
        group_colors[i][0] = i;

        
        do {
          group_colors[i][1] = getRandomColor();
        }while(isSameColor(i));
        groups[i] = [];
    }


    while(!checkPlayersEmpty()) {
      if(current_group==group_colors.length) {
        current_group = 0;      
      }

      do {
        var player = getRandom(0,players.length-1);
      } while(players[player]==false);
    
      groups[current_group][groups[current_group].length] = player;
      players[player] = false;

      current_group++;
    }

    grouped = true;
}


function changeColor(i) {
    if(!grouped) {
      draw.fillStyle ="white";
    }
    else {
        for(var j = 0;j<groups.length;j++) {
            for(var k = 0;k<groups[j].length;k++) {
              if(i==groups[j][k]) {
                draw.fillStyle = "#"+group_colors[j][1];
              }
            }
            
        }
    }
}

function changePlayers() {
    players_per_team = document.getElementById("players_per_group").value;
}


function getRandom(low,high) {
  return Math.floor(Math.random() * (high-low+1)+low);
}

function isSameColor(i) {
    for ( var j = 0;j<group_colors.length;j++) {

      if(i!=j&&group_colors[j][1]==group_colors[i][1]) return true;
    }

    return false;
}


function checkPlayersEmpty() {
  for(var j = 0;j<players.length;j++) {
    if(players[j]==true) {
      return false;
    }
  }

  return true;
}

function setPlayers() {
    for(var j = 0;j<players.length;j++) {
      players[j] = true;
    }
}


function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}