export const timeInterpolation = (compositePlayheadTimePos: number, timeList: Array<string>, valueDict: { [name: number]: string | number }) => {
  if (compositePlayheadTimePos <= Number(timeList[0])) {
    //最初のキーフレームの場所より手前だった時
    const pointTime = timeList[0];
    const cssValue = Number(valueDict[Number(pointTime)]);
    return cssValue;
  }
  if (Number(timeList[timeList.length - 1]) <= compositePlayheadTimePos) {
    const pointTime = timeList[timeList.length - 1];
    const cssValue = Number(valueDict[Number(pointTime)]);
    return cssValue;
  }

  const pointTime = searchTImeSection(compositePlayheadTimePos, timeList);

  let aPointTime = pointTime[0];
  let bPointTime = pointTime[1];

  const aPointValue: number = Number(valueDict[aPointTime]);
  const bPointValue: number = Number(valueDict[bPointTime]);

  const timeSection: number = bPointTime - aPointTime;
  const nowTimeSection: number = compositePlayheadTimePos - aPointTime;
  const valueSection: number = bPointValue - aPointValue;
  const timeRate: number = nowTimeSection / timeSection; //進行度を計算する
  const valueSectionRate: number = valueSection * timeRate;
  const cssValue = valueSectionRate + aPointValue;
  return cssValue;
};

const searchTImeSection = (nwoTime: number, timeList: Array<string>) => {
  for (let i = 0; i < timeList.length; i++) {
    if (nwoTime > Number(timeList[i])) {
      const aPointTime = Number(timeList[i]);
      const bPointTime = Number(timeList[i + 1]);
      return [aPointTime, bPointTime];
    }
  }

  return [-1, -1];
};
