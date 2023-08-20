//document.addEventListener("touchend", test2);
//document.addEventListener("touchmove", test);
document.addEventListener("touchstart", addCircle);
//document.addEventListener("touchstart", test3);
document.addEventListener("touchend", removeCircle);
document.addEventListener("touchmove", updateMousePosOnMove);
document.addEventListener("touchstart", updateMousePosOnStart);
document.addEventListener("touchstart", calcGroups);
document.addEventListener("touchend", stopTimerCalcGroups);

var circles = [];
var timerCalcGroups = [];
const radiusStart = 60;
const radiusDif = 10;
var touchesOld;
var waitAdd = false;
var waitDel = false;
var timeColorChange = 1000;

var c = document.getElementById("chooser");
var draw = c.getContext("2d");

c.style.height = (window.innerHeight).toString()+"px";

window.onLoad = start();

function start() {
    setInterval(drawCanvas, 1); //1, 10
    setInterval(changeSize,50);
}

function drawCanvas() {
  draw.globalCompositeOperation = "copy";
  if(circles.length==0) {
      draw.beginPath();
      draw.rect(0,0,0,0);
      draw.fill();
  }
  for (var i = 0;i<circles.length;i++) {
    draw.fillStyle = "#"+circles[i].color;
    draw.beginPath();
    draw.ellipse(circles[i].x, circles[i].y, circles[i].radius*(c.width/c.getBoundingClientRect().width),circles[i].radius*(c.height/c.getBoundingClientRect().height), 0, 0, 2*Math.PI);
    draw.fill();
    draw.globalCompositeOperation = "source-over";
      /*draw.lineWidth = 1;
      draw.strokeStyle = "blue";
      draw.stroke();*/
  }
}

function updateMousePosOnMove(event) {
    updateMousePos(event);
}

function updateMousePosOnStart(event) {
    updateMousePos(event);
}

function updateMousePos(event) {
    for(var i =0;i<event.touches.length;i++) {
        circles[i].x = getMousePos(c, event,i).x;
        circles[i].y = getMousePos(c, event,i).y;
    }
}

function changeSize() {
    for(var i = 0;i<circles.length;i++) {
      if(circles[i].smaller) {
        circles[i].radius--;
        if(circles[i].radius==radiusStart-radiusDif) circles[i].smaller = false;
      }
      else {
        circles[i].radius++;
        if(circles[i].radius==radiusStart) circles[i].smaller = true;
      }
    }
}



function test(event) {
    console.log("moved");
    console.log(event.touches);
    for(var i = 0;i<circles.length;i++) {
      //console.log(circles[i]);
    }
    touchesOld = event.touches;
}

function test2(event) {
  console.log("end");
  console.log(event.touches);

  
}

function test3(event) {
  console.log("start");
  console.log(event.touches);
}

function addCircle(event) {
  while(waitAdd) {

  }
  while(waitDel) {

  }
  waitAdd = true;
  touchesOld = event.touches;
  circle = new Cirle(event.touches[event.touches.length-1].identifier, radiusStart,"FFFFFF", true);

  circles.push(circle);
  waitAdd = false;
}

function removeCircle(event) {
    while(waitDel) {

    }
    while(waitAdd) {
      
    }
    waitDel = true;
    var found = false;
    var id;
    //console.log("old");
    //console.log(touchesOld);
    //console.log(event.touches);

    for(var i = 0;i<touchesOld.length;i++) {
        var touch = touchesOld[i];
        //console.log("tIdentifier1: "+touch.identifier);
        for(var j = 0;j<event.touches.length;j++) {
          //console.log("tIdentifier2: "+touch.identifier);
          //console.log("evtIdentifier"+event.touches[j].identifier)
          if(touch.identifier==event.touches[j].identifier) {
            //console.log("test");
            found = true;
          }
        }

        if(!found) {
            id = touch.identifier;
            //console.log("not found");
            break;
        }

        found = false;
    }

    //console.log("id: "+id);


    for(var i = 0;i<circles.length;i++) {
        if(circles[i].id==id) {
            //console.log("i: "+i);
            circles.splice(i,1);
        }
    }



    //console.log(circles);
    touchesOld = event.touches;
    waitDel = false;
}

function choseOnePlayer() {
    var currentCircle = circles[getRandom(0, circles.length-1)];
    timerCalcGroups[timerCalcGroups.length] = setTimeout(setColor, timeColorChange, currentCircle, [getRandomColor()], 0);
}

function calcGroups() {
  //console.log(timerCalcGroups.length);
  //console.log(timerCalcGroups);
  for(var i = 0;i<timerCalcGroups.length;i++) {
    clearTimeout(timerCalcGroups[i]);
    //console.log("timerBegin clear "+i);
  }
  timerCalcGroups.length = 0;

  for(var i = 0;i<circles.length;i++) {
      circles[i].colorChanged = false;
  }

  var colors = [];
  var playersPerGroup = document.getElementById("playersPerGroup").value;
  var numberOfGroups = Math.ceil(circles.length/playersPerGroup);

  if(playersPerGroup==1) {
    choseOnePlayer();
    return;
  }

  for(var i = 0;i<numberOfGroups;i++) {
    do {
        colors[i] = getRandomColor();
    }while(isSameColor(colors,i))
  }


  if(circles.length<playersPerGroup) {
    return;
  }
  
  for(var i = 0;i<numberOfGroups;i++) {
      var currentCircle;
      for(var j = 0;j<playersPerGroup;j++) {
        if(allColorsChanged()) return;
        do {
            currentCircle = circles[getRandom(0,circles.length-1)];
            //console.log("lollel");
        }while(currentCircle.colorChanged);

        currentCircle.colorChanged = true;
        //console.log("j"+j+" i"+i);
        //console.log("timerSet Len:"+timerCalcGroups.length);
        timerCalcGroups[timerCalcGroups.length] = setTimeout(setColor, timeColorChange*(i*playersPerGroup+j+1), currentCircle, colors, i);
      }
  }
}

function allColorsChanged() {
    for(var i = 0;i<circles.length;i++) {
        if(circles[i].colorChanged==false) {
          return false;
        }
    }

    return true;
}

function setColor(circle, colors, i) {
    circle.color = colors[i];
    //console.log("cId"+circle.id);
    //console.log("colorSet"+i)
}

function stopTimerCalcGroups(event) {
    for(var i = 0;i<timerCalcGroups.length;i++) {
        clearTimeout(timerCalcGroups[i]);
        //console.log("timerStop clear "+i)
    }

    timerCalcGroups.length = 0;
}

function isSameColor(colors, i) {
  for ( var j = 0;j<colors.length;j++) {

    if(i!=j&&colors[j]==colors[i]) return true;
  }

  return false;
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

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandom(low,high) {
  return Math.floor(Math.random() * (high-low+1)+low);
}

class Cirle {
    constructor(id, radius, color, smaller) {
        this.id = id;
        this.radius = radius;
        this.color = color;
        this.x;
        this.y;
        this.smaller = smaller;
        this.colorChanged;
    }
}