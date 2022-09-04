import { testJoin } from "./buildAuxiliaryFunction";
import * as buildQue from "../buildQue";

export const sourceSpeciesList = [
  "default", //何もない状態(nullオブジェクトと同等)
  "text", //テキスト
  "composite", //他のコンポジットを呼びだす,
  "image", //画像をCSSに適用する
];

export const writeIndentHTML = (indentHTML: number) => {
  let temp = "";

  for (let i = 0; i < indentHTML; i++) {
    temp += "  ";
  }

  return temp;
};

export const sourceSpeciesFunctionDefault = () => {};

export const sourceSpeciesFunctionText = (jsonDataCentral: Function, downParentID: string, SourceSpeciesTextClass: SourceSpeciesTextClass) => {
  // const reTemp = testJoin([writeIndentHTML(indentHTML), "<p>", SourceSpeciesTextClass.text, "</p>"]);
  // const newParentID = buildQue.pushHtmlElementQue(new buildQue.htmlElementBlockClass("p"), downParentID);
  buildQue.pushHtmlElementQue(new buildQue.htmlElementSubstanceClass(SourceSpeciesTextClass.text), downParentID);
  return;
};

export const sourceSpeciesFunctionComposite = (
  jsonDataCentral: Function,
  downParentID: string,
  sourceSpeciesCompositeClass: SourceSpeciesCompositeClass, //読み込み対象コンポジット
  parseComposite: Function
) => {
  parseComposite(jsonDataCentral, sourceSpeciesCompositeClass.compositeID);
  return;
};

// export const sourceSpeciesFunctionImage = (jsonDataCentral: Function, downParentID: string, SourceSpeciesImageClass: SourceSpeciesImageClass) => {
//   buildQue.pushHtmlElementQue(new buildQue.htmlElementBlockClass(SourceSpeciesImageClass.mediaTableID), downParentID);

//   const newID = buildQue.pushCSSElementQue(new buildQue.cssElementDefault(mediaObjectID, "#"), cssDownParentID);
//   buildQue.pushCSSElementQue(new buildQue.cssElementSubstance(cssText), newID);
// };

export abstract class SourceSpeciesClass {
  constructor() {}
  abstract sourceSpecies: string;
}

export class SourceSpeciesTextClass extends SourceSpeciesClass {
  //メディアオブジェクト固有でしかできないことをかけ、Animaterで設定できることはここでするな
  text: string;

  sourceSpecies = sourceSpeciesList[1];
  fontFamily: string;

  constructor(send_text: string, send_fontFamily: string) {
    super();
    this.text = send_text;
    this.fontFamily = send_fontFamily;
  }
}

export class SourceSpeciesCompositeClass extends SourceSpeciesClass {
  sourceSpecies = sourceSpeciesList[2];
  compositeID: string;

  constructor(send_compositeID: string) {
    super();
    this.compositeID = send_compositeID;
  }
}

export class SourceSpeciesImageClass extends SourceSpeciesClass {
  sourceSpecies = sourceSpeciesList[3];

  //DataCentral_MediaTableに入っているID
  mediaTableID: string;

  constructor(send_mediaTableID: string) {
    super();
    this.mediaTableID = send_mediaTableID;
  }
}
