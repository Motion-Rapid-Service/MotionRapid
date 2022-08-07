export const testJoin = (textArray: Array<string>) => {
  let text = "";

  for (let i = 0; i < textArray.length; i++) {
    text += textArray[i];
  }

  return text;
};

export const textReplace = (htmlText: string, replaceData: Array<Array<string>>) => {
  let htmlTextTemp = htmlText;

  // const replaceDataKeys = Object.keys(replaceData);
  // const replaceDataValue = Object.values(replaceData);

  for (let i = 0; i < replaceData.length; i++) {
    htmlTextTemp = htmlTextTemp.replace(replaceData[i][0], replaceData[i][1]);
  }

  return htmlTextTemp;
};
