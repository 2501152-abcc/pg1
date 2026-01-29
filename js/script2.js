//決定ボタンを押したあとindex2に移動そのあとの処理
let displayArea = document.getElementById("content");
let characters = [
    // タンク (13名)
    "D.VA", "ドゥームフィスト", "ジャンカー・クイーン", "オリーサ", "ラマットラ", 
    "ラインハルト", "ロードホッグ", "シグマ", "ウィンストン", "レッキング・ボール", 
    "ザリア", "マウガ", "ハザード",

    // ダメージ (18名)
    "アッシュ", "バスティオン", "キャスディ", "エコー", "ゲンジ", 
    "ハンゾー", "ジャンクラット", "メイ", "ファラ", "リーパー", 
    "ソジョーン", "ソルジャー76", "ソンブラ", "シンメトラ", "トールビョーン", 
    "トレーサー", "ウィドウメイカー", "ベンチャー","フレイヤ","ヴェンデッタ",

    // サポート (11名)
    "アナ", "バティスト", "ブリギッテ", "イラリー", "キリコ", 
    "ライフウィーバー", "ルシオ", "マーシー", "モイラ", "ゼニヤッタ", 
    "ジュノ","ウーヤン"
];
let trollChallenges = [
    "アビリティ1禁止","アルティメット禁止","キルをするたびに武器を眺める","デスするたびに味方に暴言チャット","キルをしたら全体チャットでGG","フレームレートを30固定","アビリティ2禁止","20秒に一回しゃがみ"
]

function showResult()
{
    let savedData = localStorage.getItem("owPlayers");
    if(!savedData)
    {
        alert("プレイヤーデータがありません。前のページに戻ります。");
        location.href = "index.html";
        return;
    }
    let players = JSON.parse(savedData);

    players.sort(() => Math.random() - 0.5);
    let half = Math.floor(players.length / 2);
    let team1 = players.slice(0, half);
    let team2 = players.slice(half);

    displayArea.innerHTML = "";
    function randomTeam(teamArray,teamName,color)
    {
        let template = document.getElementById("playerTemplate");
        let teamSection = document.createElement("div");
        teamSection.className = "teamContainer";
        teamSection.innerHTML = `<h2 style="color:${color}">${teamName}</h2>`;

        let availableChars = [...characters];

        teamArray.forEach(player => {
            let clone = template.content.cloneNode(true); //クローンを作ってテンプレートを作成するらしいここの作りはAIくんに頼りました。

            let charIndex = Math.floor(Math.random() * availableChars.length);
            let char = availableChars.splice(charIndex, 1)[0];
            let troll = trollChallenges[Math.floor(Math.random() * trollChallenges.length)];

            let card = clone.querySelector(".playerCard");
            card.style.borderLeft = `5px solid ${color}`;

            clone.querySelector(".pName").textContent = player;
            clone.querySelector(".pChar").textContent = char;
            clone.querySelector(".pTroll").textContent = `【縛り】${troll}`;

            teamSection.appendChild(clone);
        });
        displayArea.appendChild(teamSection);
    }
    randomTeam(team1, "TEAM 1", "#00a8ff");
    randomTeam(team2, "TEAM 2", "#e84118");
}
window.onload = showResult;