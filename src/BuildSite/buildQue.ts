import UUID from "uuidjs";

const getUUID = () => {
  return String(UUID.generate());
};

import { testJoin, textReplace } from "./buildHTML/buildAuxiliaryFunction";

export const htmlElementSpeciesList = ["notExist", "BlockClass", "SubstanceClass", "TopClass"];
export const cssElementSpeciesList = ["notExist", "Default", "SubstanceCSS", "TopClass", "Keyframe"];
export const javascriptElementSpeciesList = ["notExist", "SourceCode", "SubstanceClass"];

export let htmlElementQue: { [name: string]: htmlElement } = {};
export const pushHtmlElementQue = (pushData: htmlElement, parentID: string = null) => {
  htmlElementQue[pushData.elementID] = pushData;

  console.log("parentID", htmlElementQue, parentID);
  if (parentID) {
    htmlElementQue[parentID].childID.push(pushData.elementID);
  }

  return pushData.elementID;
};

export const alldeleteHtmlElementQue = () => {
  htmlElementQue = {};
};

export const getHtmlElementQue = (htmlID: string) => {
  return htmlElementQue[htmlID];
};

export abstract class htmlElement {
  abstract species: string;
  abstract getText: Function;
  abstract elementID: string;
  childID: Array<string> = [];

  constructor() {}
}

export class htmlElementTopClass extends htmlElement {
  species = htmlElementSpeciesList[3];
  elementID = "htmlTopID_" + getUUID();
  getText = () => {};

  constructor() {
    super();
  }
}

export class htmlElementSubstanceClass extends htmlElement {
  substanc: string;
  species = htmlElementSpeciesList[2];
  elementID = "htmlSubstanceID_" + getUUID();

  constructor(send_substanc: string) {
    super();
    this.substanc = send_substanc;
  }
  getText = () => {
    return [this.substanc];
  };
}

export class htmlElementBlockClass extends htmlElement {
  indent: number; //1ならindentを下げる -1ならあげる
  htmlTag: string;

  attribute: { [name: string]: string };
  species = htmlElementSpeciesList[1];
  elementID = "htmlBlockID_" + getUUID();

  constructor(send_tag: string, send_attribute: { [name: string]: string } = {}) {
    super();

    // this.indent = send_indent;
    this.htmlTag = send_tag;
    this.attribute = send_attribute;
  }

  getText = () => {
    let staText = "";

    // let tempArray: Array<string> = [];
    staText += testJoin(["<", this.htmlTag, " "]);
    for (let attributeKey in this.attribute) {
      staText += testJoin([attributeKey, "=", this.attribute[attributeKey]]);
    }
    staText += testJoin([">", "\n"]);

    const endText = testJoin(["</", this.htmlTag, ">", "\n"]);
    return [staText, endText];
  };
}

//ここまでhtml
// *********************************************************************************
//ここからCSS

export abstract class cssElement {
  abstract species: string;
  abstract elementID: string;
  abstract getText: Function;
  childID: Array<string> = [];

  // constructor(send_parentID: string) {
  //   this.parentID = send_parentID;
  // }
}

export let cssElementQue: { [name: string]: cssElement } = {};
export const pushCSSElementQue = (pushData: cssElement, parentID: string = null) => {
  cssElementQue[pushData.elementID] = pushData;

  console.log("parentID", cssElementQue, parentID);
  if (parentID) {
    cssElementQue[parentID].childID.push(pushData.elementID);
  }

  return pushData.elementID;
};

export const alldeleteCSSElementQue = () => {
  cssElementQue = {};
};

export const getCSSElementQue = (CSSID: string) => {
  return cssElementQue[CSSID];
};

export class cssElementTopClass extends cssElement {
  species = htmlElementSpeciesList[3];
  elementID = "cssID_" + getUUID();
  getText = () => {};

  constructor() {
    super();
  }
}

export class cssElementDefault extends cssElement {
  // 上下ではさみこむタイプ
  species = cssElementSpeciesList[1];

  elementID = "cssID_" + getUUID();
  selectorName: string;
  selectorSymbol: string;
  // substanc: string;

  constructor(send_selectorName: string, send_selectorSymbol: string = "") {
    super();
    this.selectorName = send_selectorName;
    this.selectorSymbol = send_selectorSymbol;
    // this.substanc = send_substanc;
  }

  getText = () => {
    const rsta = testJoin([this.selectorSymbol, this.selectorName, "{", "\n"]);
    const rend = testJoin(["}"]);
    return [rsta, rend];
  };
}

export class cssElementSubstance extends cssElement {
  species: string = cssElementSpeciesList[2];
  elementID = "cssID_" + getUUID();
  substance: string;

  constructor(send_substance: string) {
    super();
    this.substance = send_substance;
  }

  getText = () => {
    return [this.substance];
  };
}

//ここまでCSS
// *********************************************************************************
//ここからJavaScript

export abstract class javascriptElement {
  abstract species: string;
  abstract elementID: string;
  abstract getText: Function;
  childID: Array<string> = [];
}

export let javascriptElementQue: { [name: string]: javascriptElement } = {};
export const pushJavaScriptElementQue = (pushData: javascriptElement, parentID: string = null) => {
  javascriptElementQue[pushData.elementID] = pushData;

  console.log("parentID", javascriptElementQue, parentID);
  if (parentID) {
    javascriptElementQue[parentID].childID.push(pushData.elementID);
  }

  return pushData.elementID;
};

export const alldeleteJavaScriptElementQue = () => {
  javascriptElementQue = {};
};

export const getJavaScriptElementQue = (JavaScriptID: string) => {
  return javascriptElementQue[JavaScriptID];
};

export class javascriptElementTopClass extends javascriptElement {
  species = javascriptElementSpeciesList[2];
  elementID = "jsID_" + getUUID();
  getText = () => {};

  constructor() {
    super();
  }
}

export class javascriptElementSourceCodeClass extends javascriptElement {
  species = javascriptElementSpeciesList[1];
  elementID = "jsID_" + getUUID();
  substance: string;

  replaceFormat: { [name: string]: string };

  constructor(send_substance: string, send_replaceFormat: { [name: string]: string } = null) {
    super();
    this.substance = send_substance;
    this.replaceFormat = send_replaceFormat;
  }

  getText = () => {
    const substanceReplace = textReplace(this.substance, this.replaceFormat);
    return [substanceReplace];
  };
}

//必要と思われるモード

//特定コンポジット系列
//固定コンポジットモード(position:fixed)

//柔軟コンポジット系列
//文書系コンポーネント(position:static)
//
