export const testJoin = (textArray: Array<string>) => {
  let text = "";

  for (let i = 0; i < textArray.length; i++) {
    text += textArray[i];
  }

  return text;
};

export const textReplace = (htmlText: string, replaceData: { [name: string]: string }) => {
  let htmlTextTemp = htmlText;

  const replaceDataKeys = Object.keys(replaceData);
  const replaceDataValue = Object.values(replaceData);

  for (let i = 0; i < replaceDataKeys.length; i++) {
    const tempkey = new RegExp(replaceDataKeys[i], "g");
    htmlTextTemp = htmlTextTemp.replace(tempkey, replaceDataValue[i]);
  }

  return htmlTextTemp;
};

export const sortNumber = (arrayData: Array<string>, sortMode: boolean) => {
  //sortMode
  //  falseになると昇順ソート
  //  trueにすると降順ソート

  let A: number;
  let B: number;

  if (sortMode) {
    //降順ソート
    A = -1;
    B = 1;
  } else {
    //昇順ソート
    A = 1;
    B = -1;
  }

  arrayData.sort(function (first, second) {
    const Fn = Number(first);
    const Sn = Number(second);
    if (Fn > Sn) {
      return A;
    } else if (Fn < Sn) {
      return B;
    } else {
      return 0;
    }
  });
  return arrayData;
};

export const hasKeyFound = (key: string, dict: any) => {
  //keyが存在していたらtrue それ以外ならfalse
  return dict[key] !== undefined;
};
