//require('raw-loader!./input.txt');

import { testJoin, textReplace } from "./buildAuxiliaryFunction";
import * as buildSourceSpecies from "./buildSourceSpecies";
import CSSBuildMain from "../buildCSS/buildCSSMain";

const htmlElementTypeList = ["not", "BlockClass"];

class htmlElement {
  species: string;
  getText: Function;
}

class htmlElementBlockClass extends htmlElement {
  indent: boolean; //trueならindentを下げる falseならあげる
  htmlTag: string;
  mediaObjectID: string;
  constructor(send_mediaObjectID: string, send_indent: boolean = true, send_tag: string = "") {
    super();
    this.species = htmlElementTypeList[1];
    this.indent = send_indent;
    this.htmlTag = send_tag;
    this.mediaObjectID = send_mediaObjectID;
  }

  getText = () => {
    if (this.indent) {
      return testJoin(["<", this.htmlTag, " ", "class=", this.mediaObjectID, ">", "\n"]);
    } else {
      return testJoin(["</", this.htmlTag, ">", "\n"]);
    }
  };
}

let htmlElementQue: Array<htmlElement> = [];

const htmlBuildMain = (jsonDataCentral: any, compositeID: string) => {
  const htmlText = String(require("./../buildFormat/htmlFormat.html")["default"]);

  const OwnedClass_Composite = jsonDataCentral["OwnedClass_Composite"];
  const OwnedClass_MediaObject = jsonDataCentral["OwnedClass_MediaObject"];
  const OwnedClass_AnimatorGroup = jsonDataCentral["OwnedClass_AnimatorGroup"];
  const OwnedClass_Animator = jsonDataCentral["OwnedClass_Animator"];
  const OwnedClass_Keyframe = jsonDataCentral["OwnedClass_Keyframe"];
  const OwnedClass_CSSProperty = jsonDataCentral["OwnedClass_CSSProperty"];

  function getJsonDataCentral() {
    return jsonDataCentral;
  }

  let indentHTML: number = 3; //root等を考慮した値

  let cssText: string = "";
  // console.log("cssText", cssText);

  const writeCSS = (send_AddCssText: string) => {
    cssText += "\n";
    cssText += send_AddCssText;
    cssText += "\n";
  };

  const rootText = "\n" + parseComposite(getJsonDataCentral, compositeID, indentHTML, writeCSS) + buildSourceSpecies.writeIndentHTML(indentHTML - 1);
  const replaceData = {
    "%rootEdit%": rootText,
    "%title%": "MotionRapidTest",
    "%style%": testJoin(["<style type='text/css'>", "\n", cssText, "\n", "</style>"]),
  };

  // const jsonSyntaxCSS = CSSBuildMain(jsonData, CompositeID);

  const htmlTextReplace = textReplace(htmlText, replaceData);

  return htmlTextReplace;
};

export default htmlBuildMain;

const parseComposite = (
  // htmlRoot: string,
  getJsonDataCentral: Function,
  compositeID: string,
  indentHTML: number,
  writeCSS: Function
) => {
  console.log(getJsonDataCentral);
  const OwnedClass_Composite = getJsonDataCentral()["OwnedClass_Composite"];
  const thenComposite = OwnedClass_Composite[compositeID];
  //console.table(thenComposite);
  let rootText: string = "";
  const OwnedID_MediaObject = thenComposite["OwnedID_MediaObject"];

  console.log(compositeID);

  for (let i = 0; i < OwnedID_MediaObject.length; i++) {
    const thenMediaObjectID = OwnedID_MediaObject[i];
    const thenText: string = parseMediaObject(getJsonDataCentral, compositeID, thenMediaObjectID, indentHTML, writeCSS);
    rootText += thenText;
  }
  return rootText;
};

const parseMediaObject = (
  // htmlRoot: string,
  getJsonDataCentral: Function,
  compositeID: string,
  mediaObjectID: string,
  indentHTML: number,
  writeCSS: Function
) => {
  const OwnedClass_Composite = getJsonDataCentral()["OwnedClass_Composite"];
  const OwnedClass_MediaObject = getJsonDataCentral()["OwnedClass_MediaObject"];
  const OwnedClass_AnimatorGroup = getJsonDataCentral()["OwnedClass_AnimatorGroup"];
  const OwnedClass_Animator = getJsonDataCentral()["OwnedClass_Animator"];
  const OwnedClass_Keyframe = getJsonDataCentral()["OwnedClass_Keyframe"];
  const OwnedClass_CSSProperty = getJsonDataCentral()["OwnedClass_CSSProperty"];

  const tag = "div";

  const thenMediaObject = OwnedClass_MediaObject[mediaObjectID];
  const thenSourceSpeciesClass = thenMediaObject["sourceSpecies"];
  const thenSourceSpecies = String(thenSourceSpeciesClass.sourceSpecies);

  htmlElementQue.push();

  if (thenSourceSpecies === buildSourceSpecies.sourceSpeciesList[0]) {
    //default
  }
  if (thenSourceSpecies === buildSourceSpecies.sourceSpeciesList[1]) {
    //text
    const rtextC = buildSourceSpecies.sourceSpeciesFunctionText(getJsonDataCentral, thenSourceSpeciesClass, indentHTML + 1, writeCSS);
  }
  if (thenSourceSpecies === buildSourceSpecies.sourceSpeciesList[2]) {
    //Composite
    const rtextC = buildSourceSpecies.sourceSpeciesFunctionComposite(getJsonDataCentral, thenSourceSpeciesClass, parseComposite, indentHTML + 1, writeCSS);
  }

  // const thisIndentStr = buildSourceSpecies.writeIndentHTML(indentHTML);

  // const rtextS = testJoin([thisIndentStr, "<", tag, " ", "class=", mediaObjectID, ">", "\n"]);
  // const rtextE = testJoin([thisIndentStr, "</", tag, ">", "\n"]);

  const addCSSText = CSSBuildMain(getJsonDataCentral(), compositeID, mediaObjectID);
  writeCSS(addCSSText);

  //console.log("addText", addText);
  return;
};
