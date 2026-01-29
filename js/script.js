window.onload = function(){
    displayPresets();
}
function displayPresets()
{
    let presetList = document.getElementById("presetList");
    presetList.innerHTML = "";

    for(let i=0;i<localStorage.length;i++)
    {
        let key = localStorage.key(i);
        if(key === "owPlayers") continue; //特定のキーを除外
        createPresetUI(key);
    }
}
function createPresetUI(key)
{
    let presetList = document.getElementById("presetList");
    let pTag = document.createElement("p");
    let btn = document.createElement("button");

    pTag.textContent = key;
    pTag.className = "saveP"
    btn.textContent = "呼び出し";
    btn.className = "saveBtn";
    btn.onclick = function() {
        loadPreset(key);
    };

    presetList.appendChild(pTag);
    presetList.appendChild(btn);
}

let container = document.getElementById("container");
let addBtn = document.getElementById("addBtb");
let removeBtn = document.getElementById("removeBtn");
for (let i=0;i<12;i++)
{
    addInput();
}
function addInput()
{
    let userInput = document.querySelectorAll(".userName").length;
    if(userInput >= 12)
    {
        console.log("追加");
        alert("最大です");
        return;
    }
    let input = document.createElement("input");
    input.type = "text";
    input.className = "userName";
    input.placeholder = `プレイヤー${userInput + 1}`;
    input.value = "";
    container.appendChild(input);
    let newInput = document.querySelectorAll(".userName").length;
    if(newInput >= 12)
    {
        addBtn.disabled = true;
    }
    removeBtn.disabled = false;
}
function removeInput()
{
    let inputs = document.querySelectorAll(".userName")
    let userInput = inputs.length;
    if(userInput <= 1)
    {
        console.log("削除");
        alert("最小1人は必要です");
        return;
    }
    let lastInput = inputs[userInput - 1];
    lastInput.remove();
    if(inputs.length < 12)
    {
        addBtn.disabled = false;
    }
    if(inputs.length <= 1)
    {
        removeBtn.disabled = true;
    }
}
//押すボタンを押したときの実行コード
let userBtn = document.getElementById("userBtn");

function savePlayers()
{
    let inputs = document.querySelectorAll(".userName");
    let playerList = [];

    inputs.forEach(input =>{
        if(input.value.trim() !== "")
        {
            playerList.push(input.value);
        }
    });
    if(playerList.length === 0)
    {
        alert("プレイヤー名を入力してください")
        return;
    }
    localStorage.setItem("owPlayers",JSON.stringify(playerList));
    console.log("保存された配列:",playerList)
    window.location.href = "index2.html";
}

function saveBtn()
{
    let storageName = document.getElementById("saveText");
    let inputs = document.querySelectorAll(".userName");
    let playerList = [];
    inputs.forEach(input =>{
        if(input.value.trim() !== "")
        {
            playerList.push(input.value);
        }
    });
    let key = storageName.value.trim();
    if(key ==="")
    {
        alert("プリセット名を入力してください");
        return;
    }
    if(playerList.length === 0)
    {
        alert("プレイヤー名を最低一人は入力してください");
        return;
    }
    localStorage.setItem(key,JSON.stringify(playerList));
    alert(`プリセット[${key}]を保存しました。`);

    createPresetUI(key);
    storageName.value = "";
}
function loadPreset(key)
{
    if(!key)
    {
        let storageName = document.getElementById("saveText");
        let key = storageName.value.trim();
    }

    let savedData = localStorage.getItem(key);
    if(savedData)
    {
        let playerList = JSON.parse(savedData);
        let inputs = document.querySelectorAll(".userName");
        playerList.forEach((name, index) => {
            if (inputs[index]) {
                inputs[index].value = name;
            }
        });
        alert(`プリセット[${key}]を読み込みました`);
    }
}

