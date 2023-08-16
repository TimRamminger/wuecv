var imgs = [];
window.onLoad = onLoad();
/*dice*/

window.addEventListener("devicemotion", handleMotionEvent, true);

document.addEventListener("devicemotion", test, true);

var x,y,z;


function handleMotionEvent(event) {
    x = event.acceleration.x;
    y = event.acceleration.y;
    z = event.acceleration.z;
}

setInterval(sout, 50);
function sout() {
    console.log("x"+x);
    console.log("y"+y);
    console.log("z"+z);
}
  
function test(event) {
    console.log("test"+event.acceleration.x);
}

function onLoad() {
    console.log("hehehehadsah");
    changeAmtDice();
}

function changeDice() {
    for(var i = 0;i<=8;i++) {
        setTimeout("change()", 150*i);
    }

}

function change() {
    for(var i = 0;i<imgs.length;i++) {
        imgs[i].src = "img/wuerfel/"+getRandom(1,6).toString()+".png";
    }
}

function changeAmtDice() {
    if(imgs.length>0) {
        imgs[0].parentNode.remove();
        imgs = [];
    }

    for(var i = 0;i<document.getElementById("amtDice").value;i++) {
        var img = document.createElement("img");
        img.id = "i+1";
        img.src = "img/wuerfel/"+getRandom(1,6).toString() +".png";
        imgs.push(img);
        
    }

        var div = document.createElement("div");

        div.setAttribute("onclick", "changeDice()");

        for(var i = 0;i<imgs.length;i++) {
            div.appendChild(imgs[i]);
        }

        document.getElementById("mainDice").appendChild(div);
}


function test() {
    console.log(players);
}

function getRandom(low,high) {
    return Math.floor(Math.random()*high) + low;
}