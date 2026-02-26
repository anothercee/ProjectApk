const storyEl = document.getElementById("story");
const choicesEl = document.getElementById("choices");
const inventoryEl = document.getElementById("inventory");

let inventory = [];

const scenes = {

start:{
text:"Kamu menemukan tas misterius di kelas kosong setelah pulang sekolah.",
choices:[
{ text:"Periksa tas", next:"bag" },
{ text:"Cari petunjuk di lorong", next:"hall" }
]
},

bag:{
text:"Di dalam tas ada buku catatan dan sebuah kunci kecil.",
action:()=>addItem("Kunci Loker"),
choices:[
{ text:"Pergi ke lorong", next:"hall" }
]
},

hall:{
text:"Di lorong sekolah kamu melihat sebuah loker terkunci.",
choices:[
{ text:"Buka loker", next:"locker" },
{ text:"Kembali ke kelas", next:"start" }
]
},

locker:{
text:"Lokernya terkunci rapat.",
choices:[
{ text:"Gunakan kunci", next:"openLocker", require:"Kunci Loker"},
{ text:"Tinggalkan", next:"hall"}
]
},

openLocker:{
text:"Loker terbuka! Kamu menemukan catatan bertuliskan: 'Temui aku di ruang musik.'",
choices:[
{ text:"Pergi ke ruang musik", next:"music"}
]
},

music:{
text:"Di ruang musik kamu menemukan pemilik tas. Ternyata dia lupa membawa pulang tasnya. Kasus selesai!",
choices:[
{ text:"Main lagi", next:"start", reset:true }
]
}

};

function addItem(item){
if(!inventory.includes(item)){
inventory.push(item);
updateInventory();
}
}

function updateInventory(){
inventoryEl.textContent =
"Inventori: " + (inventory.length ? inventory.join(", ") : "-");
}

function showScene(name){

const scene = scenes[name];
storyEl.textContent = scene.text;
choicesEl.innerHTML = "";

if(scene.reset){
inventory=[];
updateInventory();
}

if(scene.action) scene.action();

scene.choices.forEach(choice=>{

if(choice.require && !inventory.includes(choice.require))
return;

const btn = document.createElement("button");
btn.textContent = choice.text;

btn.onclick = () => showScene(choice.next);

choicesEl.appendChild(btn);
});
}

updateInventory();
showScene("start");
