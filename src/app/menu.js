var canvas = document.getElementById('menu');
var cc = canvas.getContext('2d'); 


//===================Styl=========================
canvas.width = 900;
canvas.height =150;


function loadBG(){

    var imgMenuBG = new Image();


    imgMenuBG.onload = function(){
        cc.drawImage(imgMenuBG,0,0);
    }
    
    imgMenuBG.src = 'img/menu.jpg';


}

function healthdis(){
    cc.font = "40px Algerian Extra-Condensed";
    cc.fillStyle = "#a90000";
    cc.fillText("Hull Integrity", 10, 30);

    cc.font = "40px Algerian Extra-Condensed";
    cc.fillStyle = "#f00000";
    cc.fillText(player.phealth, 10, 70);
}

function pointsdis(){
    cc.font = "40px Algerian Extra-Condensed";
    cc.fillStyle = "#a90000";
    cc.fillText("Points", 10, 105);

    cc.font = "40px Algerian Extra-Condensed";
    cc.fillStyle = "#f00000";
    cc.fillText(player.points, 10, 140);
}
let animationmenuid;

function menuanimate(){
    animationmenuid=requestAnimationFrame(menuanimate);
    loadBG();
    healthdis();
    pointsdis();

}


menuanimate();
