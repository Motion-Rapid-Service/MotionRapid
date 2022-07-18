import { testJoin } from "./buildAuxiliaryFunction";

export const sourceTypeList = [
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

export const sourceTypeFunctionDefault = () => {};

export const sourceTypeFunctionText = (jsonDataCentral: Function, sourceTypeTextClass: SourceTypeTextClass, indentHTML: number) => {
  const reTemp = testJoin([writeIndentHTML(indentHTML), "<p>", sourceTypeTextClass.text, "</p>"]);
  return reTemp;
};

export const sourceTypeFunctionComposite = (
  jsonDataCentral: Function,
  sourceTypeCompositeClass: SourceTypeCompositeClass,
  parseComposite: Function,
  indentHTML: number
) => {
  const reTemp = parseComposite(jsonDataCentral, sourceTypeCompositeClass.compositeID, indentHTML + 1);
  return writeIndentHTML(indentHTML) + reTemp;
};

export abstract class SourceTypeClass {
  constructor() {}
  abstract sourceType: string;
}

export class SourceTypeTextClass extends SourceTypeClass {
  text: string;
  fontSize: number;
  fontFamily: string;

  sourceType = sourceTypeList[1];

  constructor(send_text: string, send_fontSize: number, send_fontFamily: string) {
    super();
    this.text = send_text;
    this.fontSize = send_fontSize;
    this.fontFamily = send_fontFamily;
  }
}

export class SourceTypeCompositeClass extends SourceTypeClass {
  sourceType = sourceTypeList[2];
  compositeID: string;

  constructor(send_compositeID: string) {
    super();
    this.compositeID = send_compositeID;
  }
}
