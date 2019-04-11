let countdownTimer;
//デフォルト値
let defMinute = 0;
let defSeconds = 0;
let defColor = 'black'
let defInnerHTML;
//ユーザー設定時刻
let setMinute = defMinute;
let setSeconds = defSeconds;

//////////各ボタン処理//////////

//スタート
function start() {
  //タイマー開始
  countdownTimer = setInterval(countdown, 1000);
  document.getElementById('btnStart').disabled = true;
  //時刻変更ボタンは非活性に
  document.getElementById('btnPlusMin').disabled = true;
  document.getElementById('btnMinusMin').disabled = true;
  document.getElementById('btnPlusSec').disabled = true;
  document.getElementById('btnMinusSec').disabled = true;
}

//ストップ
function stop() {
  clearInterval(countdownTimer);
  document.getElementById('btnStart').disabled = false;
  document.getElementById('btnPlusMin').disabled = false;
  document.getElementById('btnMinusMin').disabled = false;
  document.getElementById('btnPlusSec').disabled = false;
  document.getElementById('btnMinusSec').disabled = false;
  //現在の表示値をユーザー設定時刻にセット
  setMinute = Number(document.getElementById('minute').textContent);
  setSeconds = Number(document.getElementById('seconds').textContent);
}

//リセット
function reset() {
  clearInterval(countdownTimer);
  setMinute = defMinute;
  setSeconds = defSeconds;
  if(defInnerHTML !== undefined) {
    document.getElementById('time').innerHTML = defInnerHTML;
    document.getElementById('time').style.color = defColor;
  }
  display(defMinute,defSeconds);
  //全てのボタンを活性
  document.getElementById('btnStart').disabled = false;
  document.getElementById('btnStop').disabled = false;
  document.getElementById('btnPlusMin').disabled = false;
  document.getElementById('btnMinusMin').disabled = false;
  document.getElementById('btnPlusSec').disabled = false;
  document.getElementById('btnMinusSec').disabled = false;
}

//+1Min
function plusMin() {
  if(setMinute === 99) {
    setMinute = 0;
  } else {
    setMinute++;
  }
  display(setMinute, setSeconds);
}

//-1Min
function minusMin() {
  if(setMinute > 0) {
    setMinute--;
    display(setMinute, setSeconds);
  }
}

//+1Sec
function plusSec() {
  if(setSeconds === 99) {
    setSeconds = 0;
  } else {
    setSeconds++;
  }
  display(setMinute, setSeconds);
}

//-1Sec
function minusSec() {
  if(setSeconds === 0 && setMinute > 0) {
    setMinute--;
    setSeconds = 59;
  } else if(setSeconds > 0) {
    setSeconds--;
  }
  display(setMinute, setSeconds);
}


//////////画面制御//////////

//カウントダウン処理
function countdown() {
  //画面の値を数値で取得
  let numMinute = Number(document.getElementById('minute').textContent);
  let numSeconds = Number(document.getElementById('seconds').textContent);
  //Time Up
  if(numMinute === 0 && numSeconds <= 1) {
    clearInterval(countdownTimer);
    timeUp();
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

//TimeUp処理
function timeUp() {
  //デフォルトのHTMLを取得
  defInnerHTML = document.getElementById('time').innerHTML;
  document.getElementById('time').textContent = 'Time Up';
  document.getElementById('time').style.color = 'red';

  //リセット以外のボタンをdisableに
  document.getElementById('btnStop').disabled = true;
  document.getElementById('btnPlusMin').disabled = true;
  document.getElementById('btnMinusMin').disabled = true;
  document.getElementById('btnPlusSec').disabled = true;
  document.getElementById('btnMinusSec').disabled = true;
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


//////////画面読み込み時//////////

window.onload = function() {
  //デフォルト値をセット
  display(defMinute,defSeconds);
  //各ボタンに関数を設定
  document.getElementById('btnStart').addEventListener("click", start, false);
  document.getElementById('btnStop').addEventListener("click", stop, false);
  document.getElementById('btnReset').addEventListener("click", reset, false);
  document.getElementById('btnPlusMin').addEventListener("click", plusMin, false);
  document.getElementById('btnMinusMin').addEventListener("click", minusMin, false);
  document.getElementById('btnPlusSec').addEventListener("click", plusSec, false);
  document.getElementById('btnMinusSec').addEventListener("click", minusSec, false);
  }