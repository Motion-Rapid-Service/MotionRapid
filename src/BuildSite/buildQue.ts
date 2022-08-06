import UUID from "uuidjs";

const getUUID = () => {
  return String(UUID.generate());
};

import { testJoin, textReplace } from "./buildHTML/buildAuxiliaryFunction";

const htmlElementSpeciesList = ["not", "BlockClass", "SubstanceClass"];
const cssElementSpeciesList = ["not", "Default", "Keyframe"];

export let htmlElementQue: { [name: string]: htmlElement } = {};
export const pushHtmlElementQue = (pushData: htmlElement) => {
  htmlElementQue[pushData.elementID] = pushData;
  return pushData.elementID;
};

export const alldeletehtmlElementQue = () => {
  htmlElementQue = {};
};

abstract class htmlElement {
  abstract species: string;
  abstract getText: Function;
  abstract elementID: string;
  parentID: string;

  constructor(send_parentID: string) {
    this.parentID = send_parentID;
  }
}

export class htmlElementSubstanceClass extends htmlElement {
  substanc: string;
  species = htmlElementSpeciesList[2];
  elementID = "htmlSubstanceID_" + getUUID();

  constructor(send_substanc: string, send_parentID: string) {
    super(send_parentID);
    this.substanc = send_substanc;
  }
  getText = () => {
    return this.substanc;
  };
}

export class htmlElementBlockClass extends htmlElement {
  indent: number; //1ならindentを下げる -1ならあげる
  htmlTag: string;

  attribute: { [name: string]: string };
  species = htmlElementSpeciesList[1];
  elementID = "htmlBlockID_" + getUUID();

  constructor(send_tag: string, send_parentID: string, send_attribute: { [name: string]: string } = {}) {
    super(send_parentID);

    // this.indent = send_indent;
    this.htmlTag = send_tag;
    this.attribute = send_attribute;
  }

  getText = () => {
    let returnText = "";

    let tempArray: Array<string> = [];
    tempArray.concat(["<", this.htmlTag, " "]);
    for (let attributeKey in this.attribute) {
      tempArray.concat([attributeKey, "=", this.attribute[attributeKey]]);
    }
    tempArray.concat([">", "\n"]);

    returnText += testJoin(tempArray);
    returnText += testJoin([" ", "%", this.elementID, "%", "\n"]);
    returnText += testJoin(["</", this.htmlTag, ">", "\n"]);
    return returnText;
  };
}

abstract class cssElement {
  abstract species: string;
  abstract getText: Function;
}

// export class cssElementDefaultClass extends cssElement {
//   selector: string;
//   property: string;

//   constructor() {
//     super();
//   }
// }
