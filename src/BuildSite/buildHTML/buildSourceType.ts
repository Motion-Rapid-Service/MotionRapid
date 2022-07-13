import { testJoin } from "./buildAuxiliaryFunction";

export const sourceTypeList = [
  "default", //何もない状態(nullオブジェクトと同等)
  "text", //テキスト
  "composite", //他のコンポジットを呼びだす
];

export const sourceTypeFunctionDefault = () => {};

export const sourceTypeFunctionText = (
  sourceTypeTextClass: SourceTypeTextClass
) => {
  const reTemp = testJoin(["<p>", sourceTypeTextClass.text, "</p>"]);
  return reTemp;
};

export const sourceTypeFunctionComposite = (
  sourceTypeCompositeClass: SourceTypeCompositeClass
) => {};

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

  constructor() {
    super();
  }
}
