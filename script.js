let game = {
    money: 0,
    income: 1,
    members: 0,
    level: 1,
    exp: 0
};

/* ===== SOUND ===== */
const clickSound = new Audio(
"https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3"
);

function playSound(){
    clickSound.currentTime = 0;
    clickSound.play();
}

/* ===== ELEMENT ===== */
const moneyEl = document.getElementById("money");
const incomeEl = document.getElementById("income");
const membersEl = document.getElementById("members");

/* TAMBAHAN UI LEVEL */
const levelUI = document.createElement("p");
document.querySelector(".game").prepend(levelUI);

/* ===== UPDATE UI ===== */
function updateUI(){
    moneyEl.textContent = Math.floor(game.money);
    incomeEl.textContent = game.income;
    membersEl.textContent = game.members;
    levelUI.textContent =
        `⭐ Level Ekskul: ${game.level} | EXP: ${game.exp}/100`;
}

/* ===== LEVEL SYSTEM ===== */
function addExp(amount){
    game.exp += amount;

    if(game.exp >= 100){
        game.exp = 0;
        game.level++;
        game.income += 2;
        alert("Ekskul Naik Level! Income meningkat 🔥");
    }
}

/* ===== BUTTON ===== */
document.getElementById("workBtn").onclick = () => {
    playSound();
    game.money += 10;
    addExp(5);
    updateUI();
};

document.getElementById("recruitBtn").onclick = () => {
    playSound();

    if(game.money >= 50){
        game.money -= 50;
        game.members++;
        game.income += 1;
        addExp(10);
        updateUI();
    }
};

document.getElementById("upgradeBtn").onclick = () => {
    playSound();

    if(game.money >= 100){
        game.money -= 100;
        game.income += 5;
        addExp(20);
        updateUI();
    }
};

/* ===== TURNAMEN SYSTEM ===== */
const tournamentBtn = document.createElement("button");
tournamentBtn.textContent = "🏆 Ikut Turnamen (200)";
document.querySelector(".game").appendChild(tournamentBtn);

tournamentBtn.onclick = () => {
    playSound();

    if(game.money >= 200){

        game.money -= 200;

        const winChance = Math.random();

        if(winChance > 0.4){
            const reward = 300 + game.level * 50;
            alert("MENANG TURNAMEN! Dapat " + reward);
            game.money += reward;
            addExp(40);
        }else{
            alert("Kalah turnamen 😭 latihan lagi!");
            addExp(10);
        }

        updateUI();
    }
};

/* ===== IDLE INCOME ===== */
setInterval(()=>{
    game.money += game.income;
    updateUI();
    saveGame();
},1000);

/* ===== SAVE SYSTEM ===== */
function saveGame(){
    localStorage.setItem("ekskulSave", JSON.stringify(game));
}

function loadGame(){
    const save = localStorage.getItem("ekskulSave");
    if(save){
        game = JSON.parse(save);
    }
}

loadGame();
updateUI();
