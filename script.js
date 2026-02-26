let game = {
    money: 0,
    income: 1,
    members: 0
};

const moneyEl = document.getElementById("money");
const incomeEl = document.getElementById("income");
const membersEl = document.getElementById("members");

const workBtn = document.getElementById("workBtn");
const recruitBtn = document.getElementById("recruitBtn");
const upgradeBtn = document.getElementById("upgradeBtn");

/* ===== UPDATE UI ===== */
function updateUI(){
    moneyEl.textContent = Math.floor(game.money);
    incomeEl.textContent = game.income;
    membersEl.textContent = game.members;
}

/* ===== TOMBOL ===== */
workBtn.onclick = () => {
    game.money += 10;
    updateUI();
};

recruitBtn.onclick = () => {
    if(game.money >= 50){
        game.money -= 50;
        game.members++;
        game.income += 1;
        updateUI();
    }
};

upgradeBtn.onclick = () => {
    if(game.money >= 100){
        game.money -= 100;
        game.income += 5;
        updateUI();
    }
};

/* ===== IDLE SYSTEM ===== */
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
