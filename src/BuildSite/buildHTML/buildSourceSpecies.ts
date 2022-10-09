import { testJoin } from "./buildAuxiliaryFunction";
import * as buildQue from "../buildQue";
import * as buildHtmlMain from "./buildHtmlMain";
import * as middleDataClass from "./../../MiddleData/middleDataClass";

export const sourceSpeciesList = [
  "default", //何もない状態(nullオブジェクトと同等)
  "text", //テキスト
  "composite", //他のコンポジットを呼びだす,
  "image", //画像をCSSに適用する
  "shape",
];

export const writeIndentHTML = (indentHTML: number) => {
  let temp = "";

  for (let i = 0; i < indentHTML; i++) {
    temp += "  ";
  }

  return temp;
};

export const sourceSpeciesFunctionDefault = () => {};

export const sourceSpeciesFunctionShape = () => {};

export const sourceSpeciesFunctionText = (
  jsonDataCentral: Function,
  downParentID: string,
  cssDownParentID: string,
  mediaObjectID: string,
  SourceSpeciesTextClass: SourceSpeciesTextClass
) => {
  const textID = mediaObjectID + "_text_build";

  const htmlAttribute: { [name: string]: string } = { id: textID };
  const newHtmlID = buildQue.pushHtmlElementQue(new buildQue.htmlElementBlockClass("span", htmlAttribute), downParentID);

  buildQue.pushHtmlElementQue(new buildQue.htmlElementSubstanceClass(SourceSpeciesTextClass.text), newHtmlID);

  const newCssID = buildQue.pushCSSElementQue(new buildQue.cssElementDefault(textID, "#"), cssDownParentID);

  const cssText = "font-family: " + SourceSpeciesTextClass.fontFamily + ";";
  buildQue.pushCSSElementQue(new buildQue.cssElementSubstance(cssText), newCssID);

  return;
};

export const sourceSpeciesFunctionComposite = (
  jsonDataCentral: Function,
  downParentID: string,
  targetCompositeID: string,
  rootHtmlID: string,
  cssDownParentID: string,
  compositePreviewTime: number,
  compositeTimeFlag: boolean
) => {
  const dataCentral: middleDataClass.DataCentral = jsonDataCentral();
  const thenCompositeClass = dataCentral.OwnedClass_Composite[targetCompositeID];

  //コンポジットによるdivのサイズを設定する 範囲外に出た時のどうするかは未決定
  const newCssID = buildQue.pushCSSElementQue(new buildQue.cssElementDefault(targetCompositeID, "#"), cssDownParentID);
  const cssTextWidth = "width : " + thenCompositeClass.Composite_Width + thenCompositeClass.Composite_WidthUnit + ";";
  buildQue.pushCSSElementQue(new buildQue.cssElementSubstance(cssTextWidth), newCssID);
  const cssTextHeight = "height : " + thenCompositeClass.Composite_Height + thenCompositeClass.Composite_HeightUnit + ";";
  buildQue.pushCSSElementQue(new buildQue.cssElementSubstance(cssTextHeight), newCssID);

  //position : fixedかつプレビューだった時の処理
  console.log(
    "posFixed ",
    thenCompositeClass.Composite_LocationMode === middleDataClass.Composite_LocationMode[3],
    thenCompositeClass.Composite_ID,
    compositeTimeFlag,
    downParentID
  );
  if (thenCompositeClass.Composite_LocationMode === middleDataClass.Composite_LocationMode[3] && compositeTimeFlag) {
    const htmlAttributePreviewFixed: { [name: string]: string } = { id: "previewFixed" };
    const newHtmlIDPreviewFixed = buildQue.pushHtmlElementQue(new buildQue.htmlElementBlockClass("div", htmlAttributePreviewFixed), downParentID);

    const htmlAttributeComposite: { [name: string]: string } = { id: targetCompositeID };
    const newHtmlIDComposite = buildQue.pushHtmlElementQue(new buildQue.htmlElementBlockClass("div", htmlAttributeComposite), newHtmlIDPreviewFixed);
    buildHtmlMain.parseComposite(jsonDataCentral, newHtmlIDComposite, targetCompositeID, compositePreviewTime); //ほかのコンポジットを呼び出す。向こうの関数でビルドキューに登録するので戻り値がない
    return;
  }

  const htmlAttribute: { [name: string]: string } = { id: targetCompositeID };
  const newHtmlID = buildQue.pushHtmlElementQue(new buildQue.htmlElementBlockClass("div", htmlAttribute), downParentID);
  buildHtmlMain.parseComposite(jsonDataCentral, newHtmlID, targetCompositeID, compositePreviewTime); //ほかのコンポジットを呼び出す。向こうの関数でビルドキューに登録するので戻り値がない

  if (thenCompositeClass.Composite_LocationMode === middleDataClass.Composite_LocationMode[0]) {
    //文書配置
    const cssText = "position : static;";
    buildQue.pushCSSElementQue(new buildQue.cssElementSubstance(cssText), newCssID);
  }
  if (thenCompositeClass.Composite_LocationMode === middleDataClass.Composite_LocationMode[1]) {
    //座標設定(左)
    const cssText = "position : relative;";
    buildQue.pushCSSElementQue(new buildQue.cssElementSubstance(cssText), newCssID);
  }
  if (thenCompositeClass.Composite_LocationMode === middleDataClass.Composite_LocationMode[3]) {
    //座標固定

    const cssText = "position : fixed;";
    buildQue.pushCSSElementQue(new buildQue.cssElementSubstance(cssText), newCssID);
  }

  // const cssTextWidth = "width : 100%;";
  // buildQue.pushCSSElementQue(new buildQue.cssElementSubstance(cssText), newCssID);
  return;
};

export const sourceSpeciesFunctionImage = (
  jsonDataCentral: Function,
  downParentID: string,
  SourceSpeciesImageClass: SourceSpeciesImageClass,
  cssDownParentID: string
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
  abstract mediaObejctDefaultColor: Array<number>;
  abstract mediaObejctSelectColor: Array<number>;
}

export class SourceSpeciesTextClass extends SourceSpeciesClass {
  //メディアオブジェクト固有でしかできないことをかけ、Animaterで設定できることはここでするな
  text: string;

  sourceSpecies = sourceSpeciesList[1];
  fontFamily: string;

  mediaObejctDefaultColor = [50, 150, 50];
  mediaObejctSelectColor = [100, 200, 100];

  constructor(send_text: string, send_fontFamily: string) {
    super();
    this.text = send_text;
    this.fontFamily = send_fontFamily;
  }
}

export class SourceSpeciesCompositeClass extends SourceSpeciesClass {
  sourceSpecies = sourceSpeciesList[2];
  compositeID: string;

  mediaObejctDefaultColor = [150, 50, 50];
  mediaObejctSelectColor = [200, 100, 100];

  constructor(send_compositeID: string) {
    super();
    this.compositeID = send_compositeID;
  }
}

export class SourceSpeciesImageClass extends SourceSpeciesClass {
  sourceSpecies = sourceSpeciesList[3];
  mediaObejctDefaultColor = [50, 50, 150];
  mediaObejctSelectColor = [100, 100, 200];

  //DataCentral_MediaTableに入っているID
  mediaTableID: string;

  constructor(send_mediaTableID: string) {
    super();
    this.mediaTableID = send_mediaTableID;
  }
}

export class SourceSpeciesChapeClass extends SourceSpeciesClass {
  sourceSpecies = sourceSpeciesList[4];
  mediaObejctDefaultColor = [150, 50, 150];
  mediaObejctSelectColor = [200, 100, 200];

  //DataCentral_MediaTableに入っているID

  constructor() {
    super();
  }
}
