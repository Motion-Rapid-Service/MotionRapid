function scrollFunctionName() {
  let POINTTIME = [];
  let POINTVALUE = [];

  let UNIT = "";
  let SETPROPERTYNAME = "";

  let scroll_y = window.scrollY;
  let aPoint = 0;
  let bPoint = 0;

  if (NOWTIME >= POINTTIME[0]) {
    //最初のキーフレームの場所より手前だった時
    aPoint = 0;
    bPoint = 0;
  } else if (POINTTIME[POINTTIME.length - 1] <= NOWTIME) {
    aPoint = POINTTIME.length - 1;
    bPoint = POINTTIME.length - 1;
  } else {
    for (let i = 0; i < POINTTIME.length; i++) {
      if (NOWTIME > POINTTIME[i]) {
        aPoint = i;
        bPoint = i + 1;
        continue;
      }
    }
  }

  let aPointTime = POINTTIME[aPoint];
  let bPointTime = POINTTIME[bPoint];
  let aPointValue = POINTVALUE[aPoint];
  let bPointValue = POINTVALUE[bPoint];

  let timeSection = bPointTime - aPointTime;
  let nowTimeSection = scroll_y - aPointTime;
  let valueSection = bPointValue - aPointValue;

  let timeRate = nowTimeSection / timeSection; //進行度を計算する
  let valueSectionRate = valueSection * timeRate;

  let cssValue = valueSectionRate + aPointValue;

  document.getElementById("root").style.setProperty(SETPROPERTYNAME, String(cssValue) + unit);
}

window.addEventListener("scrollFunctionName", function (event) {
  console.log("スクロールされました");
  scrollFunctionName();
});
scrollFunctionName();
