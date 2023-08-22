var imgs = [];
window.onLoad = onLoad();
/*dice*/

window.addEventListener("devicemotion", handleMotion, true);

document.getElementById("mainDice").style.height = (window.innerHeight-65).toString()+"px";

let shakeThreshold = 22.5;
let lastX, lastY, lastZ;
let lastShakeTime = 0;


function handleMotion(event) {
    const { x, y, z } = event.accelerationIncludingGravity;
    const currentTime = new Date().getTime();

    if (currentTime - lastShakeTime > 1000) {
        const deltaX = Math.abs(lastX - x);
        const deltaY = Math.abs(lastY - y);
        const deltaZ = Math.abs(lastZ - z);

        if (deltaX > shakeThreshold || deltaY > shakeThreshold || deltaZ > shakeThreshold) {
            changeDice();
            lastShakeTime = currentTime;
        }

        lastX = x;
        lastY = y;
        lastZ = z;
    }
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


    for(var i = 0;i<imgs.length;i++) {
        div.appendChild(imgs[i]);
    }

    document.getElementById("mainDice").appendChild(div);
}


function getRandom(low,high) {
    return Math.floor(Math.random()*high) + low;
}