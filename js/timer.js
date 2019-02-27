let countdownTimer;
let defMinute = 0;
let defSeconds = 5;
let defInnerHTML;

//スタート
function start() {
  countdownTimer = setInterval(countdown, 1000);
}

//ストップ
function stop() {
  clearInterval(countdownTimer);
}

//リセット
function reset() {
  clearInterval(countdownTimer);
  if(defInnerHTML !== undefined) {
    document.getElementById('time').innerHTML = defInnerHTML;
  }
  display(defMinute,defSeconds);
}

//カウントダウン処理
function countdown() {
  //画面の値を数値で取得
  let numMinute = Number(document.getElementById('minute').textContent);
  let numSeconds = Number(document.getElementById('seconds').textContent);
  //Time Up
  if(numMinute === 0 && numSeconds === 1) {
    clearInterval(countdownTimer);
    //デフォルトのHTMLを取得
    defInnerHTML = document.getElementById('time').innerHTML;
    document.getElementById('time').textContent = 'Time Up';
    document.getElementById('time').style.color = 'red';
  //minute減少
  } else if (numMinute > 0 && numSeconds === 0) {
    numMinute--;
    numSeconds = 59;
    display(numMinute,numSeconds);
  //secondsのみ減少
  } else {
    numSeconds--;
    display(numMinute,numSeconds);
  }
}

//画面描画
function display(numMinute,numSeconds) {
  let dispMinute = document.getElementById('minute');
  let dispSeconds = document.getElementById('seconds');
  if (numMinute < 10) {
    dispMinute.textContent = '0' + numMinute;
  } else {
    dispMinute.textContent = numMinute;
  }
  if(numSeconds < 10) {
    dispSeconds.textContent = '0' + numSeconds;
  } else {
    dispSeconds.textContent = numSeconds;
  }
}

window.onload = function() {
  //デフォルト値をセット
  display(defMinute,defSeconds);
  //各ボタンに関数を設定
  document.getElementById('btnStart').addEventListener("click", start, false);
  document.getElementById('btnStop').addEventListener("click", stop, false);
  document.getElementById('btnReset').addEventListener("click", reset, false);
  }