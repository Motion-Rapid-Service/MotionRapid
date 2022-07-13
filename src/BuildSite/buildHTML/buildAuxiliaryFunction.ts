
export const testJoin = (textArray: Array<string>) => {
    let text = "";
  
    for (let i = 0; i < textArray.length; i++) {
      text += textArray[i];
    }
  
    return text;
  };
  