const game = document.getElementById("game");
const player = document.getElementById("player");
const teacher = document.getElementById("teacher");

const scoreEl = document.getElementById("score");
const lifeEl = document.getElementById("life");

let playerX = 160;
let score = 0;
let life = 3;
let papers = [];
let gameOver = false;

/* ===== GERAK PLAYER ===== */
document.addEventListener("keydown", e=>{
    if(e.key==="ArrowLeft") playerX -= 25;
    if(e.key==="ArrowRight") playerX += 25;
});

/* TOUCH CONTROL */
game.addEventListener("touchstart", e=>{
    const x = e.touches[0].clientX;
    if(x < window.innerWidth/2) playerX -= 30;
    else playerX += 30;
});

/* ===== SPAWN DARI GURU ===== */
function spawnPaper(){

    const teacherRect = teacher.getBoundingClientRect();
    const gameRect = game.getBoundingClientRect();

    const paper = document.createElement("div");
    paper.className="paper";

    const startX = teacherRect.left - gameRect.left + 10;

    paper.style.left = startX+"px";
    game.appendChild(paper);

    papers.push({
        el:paper,
        y:60,
        speed:4+Math.random()*2
    });
}

setInterval(()=>{
    if(!gameOver) spawnPaper();
},900);

/* ===== COLLISION ===== */
function collide(a,b){
return !(
a.right<b.left||
a.left>b.right||
a.bottom<b.top||
a.top>b.bottom
);
}

/* ===== HIT EFFECT ===== */
function hitPlayer(){
    life--;
    lifeEl.textContent = life;

    game.classList.add("shake");
    setTimeout(()=>game.classList.remove("shake"),300);

    if(life<=0){
        gameOver=true;
        alert("GAME OVER 😭 Score: "+score);
        location.reload();
    }
}

/* ===== GAME LOOP ===== */
function update(){

if(gameOver) return;

playerX=Math.max(0,Math.min(320,playerX));
player.style.left=playerX+"px";

const playerRect=player.getBoundingClientRect();

papers.forEach((p,i)=>{

    p.y+=p.speed;
    p.el.style.top=p.y+"px";

    const paperRect=p.el.getBoundingClientRect();

    if(collide(playerRect,paperRect)){
        p.el.remove();
        papers.splice(i,1);
        hitPlayer();
        return;
    }

    if(p.y>540){
        p.el.remove();
        papers.splice(i,1);
        score++;
        scoreEl.textContent=score;
    }
});

requestAnimationFrame(update);
}

update();
