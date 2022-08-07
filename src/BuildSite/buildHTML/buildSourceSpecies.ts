import { testJoin } from "./buildAuxiliaryFunction";
import * as buildQue from "../buildQue";

export const sourceSpeciesList = [
  "default", //何もない状態(nullオブジェクトと同等)
  "text", //テキスト
  "composite", //他のコンポジットを呼びだす
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
  const newParentID = buildQue.pushHtmlElementQue(new buildQue.htmlElementBlockClass("p"), downParentID);
  buildQue.pushHtmlElementQue(new buildQue.htmlElementSubstanceClass(SourceSpeciesTextClass.text), newParentID);
  return;
};

export const sourceSpeciesFunctionComposite = (
  jsonDataCentral: Function,
  downParentID: string,
  sourceSpeciesCompositeClass: SourceSpeciesCompositeClass,
  parseComposite: Function
) => {
  parseComposite(jsonDataCentral, sourceSpeciesCompositeClass.compositeID);
  return;
};

export abstract class SourceSpeciesClass {
  constructor() {}
  abstract sourceSpecies: string;
}

export class SourceSpeciesTextClass extends SourceSpeciesClass {
  text: string;
  fontSize: number;
  fontFamily: string;

  sourceSpecies = sourceSpeciesList[1];

  constructor(send_text: string, send_fontSize: number, send_fontFamily: string) {
    super();
    this.text = send_text;
    this.fontSize = send_fontSize;
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
