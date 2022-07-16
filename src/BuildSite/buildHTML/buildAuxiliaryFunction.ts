
export const testJoin = (textArray: Array<string>) => {
    let text = "";
  
    for (let i = 0; i < textArray.length; i++) {
      text += textArray[i];
    }
  
    return text;
  };
  
export const textReplace = (htmlText:string,replaceData:{[name:string]:string}) => {

  let htmlTextTemp = htmlText

  const replaceDataKeys = Object.keys(replaceData)
  const replaceDataValue = Object.values(replaceData)

  for (let i = 0; i < replaceDataKeys.length;i ++ ){
    htmlTextTemp = htmlTextTemp.replace(replaceDataKeys[i], replaceDataValue[i]);  
  }

  return htmlTextTemp
}