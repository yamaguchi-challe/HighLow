let card = 1;// 場にあるトランプのカード番号
let Result = "";//勝ち負けの結果
let changed = false; //カードが反転しているフラグ
let win = 0;
let lose = 0;

$("#next").css("display", "none"); //nextボタンの非表示
if(localStorage.hasOwnProperty("win")) {
    // localstorageにwinの値が存在するとき
    win = parseInt(localStorage.getItem("win"));
    $("#win").html(win);
}
if(localStorage.hasOwnProperty("lose")) {
    // localstorageにloseの値が存在するとき
    lose = parseInt(localStorage.getItem("lose"));
    $("#lose").html(lose);
}

// Highがクリックされたときの処理
$("#high").on("click", function(){
    let trump_n = Math.ceil( Math.random() * 13);// ランダムで数字を決める
    changed = false; //カード反転フラグをリセット

    if (card < trump_n) {//賭けカードが、伏せカードより大きい場合
        // 勝ち
        Result = "<span style='background:red;'>WIN!!</span>";
        win += 1;
        localStorage.setItem("win", win);
    }
    else if (card > trump_n) {//賭けカードが、伏せカードより小さい場合
        // 負け
        Result = "<span style='background:blue;'>LO$E...</span>";
        lose += 1;
        localStorage.setItem("lose", lose);
    }
    else {
        // 引き分け
        Result = "引き分け！！";
    }
    showResult(trump_n);
});

// Lowがクリックされたときの処理
$("#low").on("click", function(){
    let trump_n = Math.ceil( Math.random() * 13);// ランダムで数字を決める
    changed = false; //カード反転フラグをリセット

    if (card < trump_n) {//賭けカードが、伏せカードより大きい場合
        // 負け
        Result = "<span style='background:blue;'>LO$E...</span>";
        lose += 1;
        localStorage.setItem("lose", lose);
    }
    else if (card > trump_n) {//賭けカードが、伏せカードより小さい場合
        // 勝ち
        Result = "<span style='background:red;'>WIN!!</span>";
        win += 1;
        localStorage.setItem("win", win);
    }
    else {
        // 引き分け
        Result = "引き分け！！";
    }
    showResult(trump_n);
});

function showResult(trump_n) {
    console.log(win)
    rotationAnimationLoop(document.getElementById("afterCard"), "./img/card" + trump_n + ".png", 0);
    setTimeout(function(){
        $("#after").fadeOut(0).fadeIn(500).html(Result);
      },700);  
    
    card = trump_n;//場にあるカードを新しく引いたカードに変える
    $("#game").css("display", "none");
    setTimeout(function(){
        $("#next").css("display", "block");
        $("#win").html(win);
        $("#lose").html(lose);
      },1000);   
}

// 次へがクリックされたときの処理
$("#next").on("click", function(){
    $("#beforeCard").attr("src", "./img/card" + card + ".png");
    $("#afterCard").attr("src", "./img/card_back.png");
    $("#after").html("次のカードは今の数字より高い？低い？");
    $("#game").css("display", "block");
    $("#next").css("display", "none");
});

const rotationAnimationLoop = (element, imagePath, deg) =>{
    if(deg>=90){
        changed = true;
    }
    if(!changed){
        if( deg < 90 ){
            rotationAnimation(element, imagePath, deg);
            setTimeout( 
                () => {
                    rotationAnimationLoop(element, imagePath, deg+= 5 )
                }, 
            25);
        } 
    } else{
        if(deg>0){
            rotationAnimation(element, imagePath, deg);
            setTimeout( 
                () => {
                    rotationAnimationLoop(element, imagePath, deg-= 5 )
                }, 
            25);
        }
    }
}

const rotationAnimation = (element, imagePath, deg) =>{
    if ( 90 == deg ){
        element.src =  imagePath;
    }else {
        element.style.webkitTransform = 'rotateY(' + deg + 'deg)';
    }
}

// Resetボタンが押されたとき
$("#reset").on("click", function(){
    // 初期化
    win = 0;
    lose = 0;
    localStorage.clear();
    $("#win").html(win);
    $("#lose").html(lose);
});