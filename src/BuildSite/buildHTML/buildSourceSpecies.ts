import { testJoin } from "./buildAuxiliaryFunction";
import * as buildQue from "../buildQue";
import * as buildHtmlMain from "./buildHtmlMain";
import * as middleDataClass from "./../../MiddleData/middleDataClass";

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
  sourceSpeciesCompositeClass: SourceSpeciesCompositeClass //読み込み対象コンポジット
) => {
  const htmlAttribute: { [name: string]: string } = { id: sourceSpeciesCompositeClass.compositeID };
  const newHtmlID = buildQue.pushHtmlElementQue(new buildQue.htmlElementBlockClass("div", htmlAttribute), downParentID);

  buildHtmlMain.parseComposite(jsonDataCentral, newHtmlID, sourceSpeciesCompositeClass.compositeID);
  return;
};

export const sourceSpeciesFunctionImage = (
  jsonDataCentral: Function,
  downParentID: string,
  SourceSpeciesImageClass: SourceSpeciesImageClass,
  cssDownParentID: string,
  mediaObjectID: string
) => {
  const dataCentral: middleDataClass.DataCentral = jsonDataCentral();
  // const OwnedClass_Composite: { [name: string]: middleDataClass.Composite } = jsonDataCentral().OwnedClass_Composite;
  // const OwnedClass_MediaObject: { [name: string]: middleDataClass.MediaObject } = jsonDataCentral().OwnedClass_MediaObject;

  console.log("DataCentral_MediaTable", SourceSpeciesImageClass.mediaTableID, downParentID);

  const imageURL = dataCentral.DataCentral_MediaTable[SourceSpeciesImageClass.mediaTableID];
  if (!imageURL) {
    console.log("image URL notExist");
    return;
  }

  console.log("DataCentral_MediaTable imageURL", imageURL);

  const cssText = "background : url(" + imageURL + ");";

  const htmlAttribute: { [name: string]: string } = { id: SourceSpeciesImageClass.mediaTableID };

  buildQue.pushHtmlElementQue(new buildQue.htmlElementBlockClass("div", htmlAttribute), downParentID);
  const newCssID = buildQue.pushCSSElementQue(new buildQue.cssElementDefault(SourceSpeciesImageClass.mediaTableID, "#"), cssDownParentID);
  buildQue.pushCSSElementQue(new buildQue.cssElementSubstance(cssText), newCssID);
  buildQue.pushCSSElementQue(new buildQue.cssElementSubstance("width : 100%;"), newCssID);
  buildQue.pushCSSElementQue(new buildQue.cssElementSubstance("height : 100%;"), newCssID);
  buildQue.pushCSSElementQue(new buildQue.cssElementSubstance("background-color : #00000000;"), newCssID);
  buildQue.pushCSSElementQue(new buildQue.cssElementSubstance("background-size:cover;"), newCssID);
  buildQue.pushCSSElementQue(new buildQue.cssElementSubstance("background-repeat: no-repeat;"), newCssID);
};

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
