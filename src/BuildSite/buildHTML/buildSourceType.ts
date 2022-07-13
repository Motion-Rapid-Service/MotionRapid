import { testJoin } from "./buildAuxiliaryFunction";

export const sourceTypeList = [
  "default", //何もない状態(nullオブジェクトと同等)
  "text", //テキスト
  "composite", //他のコンポジットを呼びだす
];

export const sourceTypeFunctionDefault = () => {};

export const sourceTypeFunctionText = (
  jsonDataCentral:Function,
  sourceTypeTextClass: SourceTypeTextClass
) => {
  const reTemp = testJoin(["<p>", sourceTypeTextClass.text, "</p>"]);
  return reTemp;
};

export const sourceTypeFunctionComposite = (
  jsonDataCentral:Function,
  sourceTypeCompositeClass: SourceTypeCompositeClass,
  parseComposite:Function
) => {
  const reTemp = parseComposite(jsonDataCentral,sourceTypeCompositeClass.compositeID)
  return reTemp
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

  constructor(
    send_text: string,
    send_fontSize: number,
    send_fontFamily: string
  ) {
    super();
    this.text = send_text;
    this.fontSize = send_fontSize;
    this.fontFamily = send_fontFamily;
  }
}

export class SourceTypeCompositeClass extends SourceTypeClass {

  sourceType = sourceTypeList[2];
  compositeID:string

  constructor(send_compositeID:string) {
    super();
    this.compositeID = send_compositeID
  }
}
