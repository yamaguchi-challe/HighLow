let card = 1;// 場にあるトランプのカード番号
let Result = "";//勝ち負けの結果

$("#next").css("display", "none"); //nextボタンの非表示

// Highがクリックされたときの処理
$("#high").on("click", function(){
    document.getElementById("Card_img_Before").src="./img/card" + card + ".png";
    let trump_n = Math.ceil( Math.random() * 13);// ランダムで数字を決める

    if (card < trump_n) {//賭けカードが、伏せカードより大きい場合
        // 勝ち
        Result = "<span style='background:red;'>【 勝ち 】</span>";
    }
    else if (card > trump_n) {//賭けカードが、伏せカードより小さい場合
        // 負け
        Result = "<span style='background:blue;'>『 負け 』</span>";
    }
    else {
        // 引き分け
        Result = "引き分け！！";
    }
    showResult(trump_n);
});

// Lowがクリックされたときの処理
$("#low").on("click", function(){
    document.getElementById("Card_img_Before").src="./img/card" + card + ".png";
    let trump_n = Math.ceil( Math.random() * 13);// ランダムで数字を決める

    if (card < trump_n) {//賭けカードが、伏せカードより大きい場合
        // 負け
        Result = "<span style='background:blue;'>『 負け 』</span>";
    }
    else if (card > trump_n) {//賭けカードが、伏せカードより小さい場合
        // 勝ち
        Result = "<span style='background:red;'>【 勝ち 】</span>";
    }
    else {
        // 引き分け
        Result = "引き分け！！";
    }
    showResult(trump_n);
});

function showResult(trump_n) {
    document.getElementById("Card_img_After").src="./img/card" + trump_n + ".png";
    document.getElementById("After").innerHTML = Result;
    document.getElementById("Before").innerHTML ="場にあるカードは" + card ;
    card = trump_n;//場にあるカードを新しく引いたカードに変える

    $("#game").css("display", "none");
    $("#next").css("display", "block");
}

function Next(){
    document.getElementById("Card_img_Before").src="./img/card" + card + ".png";
    document.getElementById("Card_img_After").src="./img/card_back.png";
    document.getElementById("Before").innerHTML ="場にあるカードは" + card ;
    document.getElementById("After").innerHTML ="次のカードは今の数字より高い？低い？"
    $("#game").css("display", "block");
    $("#next").css("display", "none");
}