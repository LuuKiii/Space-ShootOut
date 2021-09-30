
var canvas = document.getElementById('main');

var c = canvas.getContext('2d'); 


//===================Styl=========================
canvas.width = 900;
canvas.height =700;


const keys = [];

const startGameBtn = document.querySelector('#restartGameBtn')
const GameOverEl = document.querySelector('#gameOverEl')
const ScoreEl = document.querySelector('#scoreEl')


//Obiekty==========================================

const imgMBG = new Image();
let BGloaded = false 
imgMBG.onload = function(){
    BGloaded = true;
}
imgMBG.src = 'img/nebula.jpg';

const imgPlayer = new Image();      
let playerloaded = false;
imgPlayer.onload = function(){  
    playerloaded = true;    
}          
imgPlayer.src = 'img/Player.png';


const imgFollower = new Image();   
let followerloaded = false;     
imgFollower.onload = function(){       
    followerloaded = true;
}          
imgFollower.src = 'img/Follower.png';

const imgCruiser = new Image();   
let Cruiserloaded = false;     
imgCruiser.onload = function(){       
    Cruiserloaded = true;
}          
imgCruiser.src = 'img/SCruiser.png';

const imgHeal = new Image();   
let healloaded = false;     
imgHeal.onload = function(){       
    healloaded = true;
}          
imgHeal.src = 'img/heal.png';

//GRACZ=====================================================================================================================


class Player {

    
    constructor(x,y,dx,dy,radius) {
    this.x = x; //Położenie względem osi x
    this.dx = dx; // Przesunięcie względem osi x
    this.y = y; //Położenie względem osi y
    this.dy = dy; // Przesunięcie względem osi y
    this.radius = radius; // Średnica 
    this.topspeed = 3; // Maksymalna prędkość
    this.acc = 0.05; // Przyśpieszenie
    this.phealth = 100; // Punkty Zdrowia
    this.points = 0; // Punkty 
    this.angle = 0; // Obrót 
    }
    
    //WYGLAD=======================================
    draw = function(){

        var upx = this.x;
        var upy = this.y;
        var upr = this.radius;

       if(playerloaded){
       c.save();         
       c.translate(upx,upy);
       c.rotate(this.angle);
       c.drawImage(imgPlayer,-upr,-upr,upr*2,upr*2);
       c.restore();
       }

    }

    //RUCH=========================================
    update = function(){

        this.bordercheck();
        this.movement();
        

        this.x+=this.dx;
        this.y+=this.dy;
        

        this.angle = Math.atan2( state.mouse.x  - player.x,
                                -(state.mouse.y  - player.y) )

                               

        this.draw();
    }

    movement = function(){


        window.addEventListener("keydown", function(e){
            keys[e.keyCode] = true;
        });

        window.addEventListener("keyup", function(e){
            delete keys[e.keyCode];
        });

        if(keys[87] && this.dy >- this.topspeed){
            this.dy -= this.acc;
        }
        if(keys[83] && this.dy < this.topspeed){
            this.dy += this.acc;
        }
        if(keys[65] && this.dx > -this.topspeed){
            this.dx -= this.acc;
        }
        if(keys[68] && this.dx < this.topspeed){
            this.dx += this.acc;
        }
     
    }

    bordercheck = function(){
        
        var stepAway = 1;

        if( this.x-this.radius  < 0){
            this.dx = 0;
            this.x = this.radius+stepAway;
        }

        if(this.x+this.radius  > canvas.width){
            this.dx = 0;
            this.x = canvas.width - (this.radius+stepAway);
        }
    
        if(this.y+this.radius > canvas.height ){
            this.dy = 0;
            this.y = canvas.height - (this.radius+stepAway);
        }
    
        if(this.y-this.radius < 0){
            this.dy = 0;
            this.y = this.radius+stepAway;
        }
    }
}

class Projectile {

    constructor(x,y,radius,velocity,type) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = velocity;
        this.type = type;       //0- friendly 1- enemy
        }

    draw(){
        c.beginPath()
        c.arc(this.x,this.y,this.radius, 0, Math.PI * 2, false)
        if(this.type == 0){
            c.fillStyle = "white";
        }else{
            c.fillStyle = "red";
        }
        c.fill();

    }

    update() {
        this.draw();
        this.x = this.x +this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

//WRÓG==============================================================================================================================
//=====================================================================================================================
class SmallC {

    constructor(x,y,radius,velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = velocity;
        this.rotation = Math.atan2(  (  velocity.x ) ,
                                    -( velocity.y  ));
        }
        
    draw(){
        var upx = this.x;
        var upy = this.y;
        var upr = this.radius;

        if(Cruiserloaded){
            c.save();         
            c.translate(upx,upy);
            c.rotate(this.rotation);
            c.drawImage(imgCruiser,-upr,-upr,upr*2,upr*2);
            c.restore();
            }

    }

    update() {
        this.draw();
        this.x = this.x +this.velocity.x;
        this.y = this.y + this.velocity.y;

        let bet = Math.random();

        if(bet>0.999){
            const angle = Math.atan2(player.y - this.y , player.x - this.x)
            const velocity = {x: Math.cos(angle)*2, y:Math.sin(angle)*2}
            projectiles.push(new Projectile(this.x, this.y,5, velocity, 1))
        }

        
    }
}

class Follower {

    constructor(x,y,radius,velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.velocity = velocity;
        this.angle = 0;
        this.rotation = 0;
        }

    draw(){

        var upx = this.x;
        var upy = this.y;
        var upr = this.radius;

        if(followerloaded){
            c.save();         
            c.translate(upx,upy);
            c.rotate(this.rotation);
            c.drawImage(imgFollower,-upr,-upr,upr*2,upr*2);
            c.restore();
            }


    }

    update() {
        this.draw();
        this.angle = Math.atan2(player.y - this.y, player.x - this.x);
        this.velocity ={
            xx: Math.cos(this.angle)*2,
            yy: Math.sin(this.angle)*2
        }

        this.x = this.x +this.velocity.xx;
        this.y = this.y + this.velocity.yy;

        this.rotation = Math.atan2( player.x - this.x,
                                 -(player.y  - this.y) )
    }
}

//===========================================pickups=======================================
class RepairPick{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.radius = 10;        
    }

    draw(){
        var upr = this.radius*2;

        if(healloaded)
        {
        c.drawImage(imgHeal,this.x,this.y,upr,upr);
        }
    }

    update(){
        this.draw();
    }
}

//======================FUNKCJE POMOCNICZE===========================================
function SpawnEnemies(){

    let bet;
        const radius = 10 + Math.random()*25;
        let x 
        let y

        if(Math.random() < 0.5 ){
         x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
         y = Math.random()*canvas.height
        } else {
             y= Math.random() < 0.5 ? 0 - radius : canvas.height + radius
             x= Math.random()*canvas.width
        }

        const angle = Math.atan2(Math.random()*(canvas.height) - y,  Math.random()*canvas.width - x)
        
        var velocity ={
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

    bet = Math.random();

    if(bet>0.1){
    enemyArray.push(new SmallC(x,y,radius,velocity));
    }else{
    enemyArray.push(new Follower(x,y,radius,velocity)); 
    }
    
}


function pickupdraw(){
    pickups.forEach((pickup, puindex)=>{
        const distpick = Math.hypot(player.x-pickup.x, player.y-pickup.y)
        if(distpick - pickup.radius - player.radius < 1)
        {
            player.phealth = 100;
            pickups.splice(puindex, 1)
        }
        pickup.update();
    })
}


function projectileremover(){
    projectiles.forEach((projectile,pindex)=>{
        projectile.update();
        //removing projectiles
        if (projectile.x - projectile.radius < 0 || projectile.x + projectile.radius > canvas.width ||
              projectile.y - projectile.radius < 0 || projectile.y  + projectile.radius > canvas.height ){
            setTimeout(()=>{
               
                projectiles.splice(pindex, 1)
                },0)
        }
    })
}

function gamelooper(){
    enemyArray.forEach((SmallC, index)=>{
        SmallC.update();

        isOutf(SmallC);
        if(isOut){
            enemyArray.splice(index, 1)
            isOut = false;
        }

        const dist = Math.hypot(player.x-SmallC.x, player.y-SmallC.y)//Player Enemy Collsion
        if (dist -SmallC.radius- player.radius< 1) {

            enemyArray.splice(index, 1)
            player.phealth -= 30;

            if(player.phealth <= 0)
                {
                    player.phealth = 0;
                    scoreEl.innerHTML  = player.points;
                    GameOverEl.style.display = 'block'
                    cancelAnimationFrame(animationId);
                }


        }
        projectiles.forEach((projectile, pindex) => {
            const dist = Math.hypot(projectile.x-SmallC.x, projectile.y-SmallC.y)
            const distproj = Math.hypot(projectile.x-player.x, projectile.y-player.y)
            let bet;

            if(projectile.type == 0 ){
                if (dist -SmallC.radius- projectile.radius< 1) // Player projectile hit enemy detection
                {
                setTimeout(()=>{
                bet = Math.random();

                if(bet>0.95)
                {
                    pickups.push(new RepairPick(SmallC.x,SmallC.y)); 
                }
                
                enemyArray.splice(index, 1)
                projectiles.splice(pindex, 1)
                player.points+=10
                },0)}

            }else if(distproj - player.radius - projectile.radius< 1){ //Enemy projectile hit player detection



                projectiles.splice(pindex,1);
                player.phealth -= 10;



                if(player.phealth <= 0)
                {
                    player.phealth = 0;
                    scoreEl.innerHTML = player.points;
                    GameOverEl.style.display = 'block'
                    cancelAnimationFrame(animationId);
                }
            }
        });
    })
}





//======================CODE=========================

let player = new Player(canvas.width/2,canvas.height/2, 0, 0, 30);

let enemyArray = [];
let projectiles = [];
let pickups = [];

function init(){
    delete Player;
    player = new Player(canvas.width/2,canvas.height/2, 0, 0, 30);
    
    enemyArray = [];
    projectiles = [];
    pickups = [];
}

//===============mouse canvas relative position===================

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}



//Mouse Rotation==========================================

const state = {
    mouse: {
        x:0,
        y:0,
    }
};

window.addEventListener('mousemove', (event) =>{
    
    let rect = canvas.getBoundingClientRect();
    
        state.mouse.x =  event.clientX - rect.left;
        state.mouse.y = event.clientY - rect.top;   
});
//==============player projectile =================

window.addEventListener('mousedown', (event) =>{
    
    Mousepos = getMousePos(canvas,event);
    const angle = Math.atan2(Mousepos.y  - player.y ,
                             Mousepos.x  - player.x )
    const velocity = {x: Math.cos(angle)*5, y:Math.sin(angle)*5}
    projectiles.push(new Projectile(player.x, player.y,5, velocity, 0))
    
   
})
//Out detection=======================================

var isOut = false;
function isOutf(obj){
    if (obj.x  < -200 || obj.x  > canvas.width + 200 ||
        obj.y  < -200 || obj.y  > canvas.height + 200 ){
            isOut = true;
        }

}

//==================================================

var difficulty = 400;

let animationId;
function animate() {

    animationId=requestAnimationFrame(animate);
    console.log(enemyArray);

    if(BGloaded)
    {c.drawImage(imgMBG,0,0);}
    
    player.update();

    if(animationId%difficulty <= 1)
    {
    SpawnEnemies();
    difficulty = 300 + Math.ceil(difficulty * Math.random()) ;   
    }
    
    pickupdraw();


    projectileremover();

    gamelooper();

    
}


//------------------Restart-------------------


startGameBtn.addEventListener('click',() => {
    init();
    animate();
    GameOverEl.style.display = 'none'
})