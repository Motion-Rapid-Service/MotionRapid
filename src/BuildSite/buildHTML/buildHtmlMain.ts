//require('raw-loader!./input.txt');

import { testJoin, textReplace } from "./buildAuxiliaryFunction";
import * as buildSourceType from "./buildSourceType";
import CSSBuildMain from "../buildCSS/buildCSSMain";

const htmlBuildMain = (jsonDataCentral: any, compositeID: string) => {
  const htmlText = String(require("./../buildFormat/htmlFormat.html")["default"]);

  const OwnedClass_Composite = jsonDataCentral["OwnedClass_Composite"];
  const OwnedClass_MediaObject = jsonDataCentral["OwnedClass_MediaObject"];
  const OwnedClass_Animator = jsonDataCentral["OwnedClass_Animator"];
  const OwnedClass_Keyframe = jsonDataCentral["OwnedClass_Keyframe"];

  function getJsonDataCentral() {
    return jsonDataCentral;
  }

  let indentHTML: number = 3; //root等を考慮した値

  const cssText = CSSBuildMain(jsonDataCentral, compositeID);
  console.log("cssText", cssText);

  const rootText = "\n" + parseComposite(getJsonDataCentral, compositeID, indentHTML) + buildSourceType.writeIndentHTML(indentHTML - 1);
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
  indentHTML: number
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
    const thenText: string = parseMediaObject(getJsonDataCentral, compositeID, thenMediaObjectID, indentHTML);
    rootText += thenText;
  }
  return rootText;
};

const parseMediaObject = (
  // htmlRoot: string,
  getJsonDataCentral: Function,
  compositeID: string,
  mediaObjectID: string,
  indentHTML: number
) => {
  const OwnedClass_Composite = getJsonDataCentral()["OwnedClass_Composite"];
  const OwnedClass_MediaObject = getJsonDataCentral()["OwnedClass_MediaObject"];
  const tag = "div";

  const thenMediaObject = OwnedClass_MediaObject[mediaObjectID];
  const thenSsourceTypeClass = thenMediaObject["sourceType"];
  const thenSourceType = String(thenSsourceTypeClass.sourceType);

  //console.log("sourceTypeClass",thenSsourceTypeClass)
  //console.log("thenSourceType",thenSourceType)

  let rtextC;
  if (thenSourceType === buildSourceType.sourceTypeList[0]) {
    //default
  }
  if (thenSourceType === buildSourceType.sourceTypeList[1]) {
    //text
    rtextC = buildSourceType.sourceTypeFunctionText(getJsonDataCentral, thenSsourceTypeClass, indentHTML + 1);
  }
  if (thenSourceType === buildSourceType.sourceTypeList[2]) {
    //Composite
    rtextC = buildSourceType.sourceTypeFunctionComposite(getJsonDataCentral, thenSsourceTypeClass, parseComposite, indentHTML + 1);
  }

  const thisIndentStr = buildSourceType.writeIndentHTML(indentHTML);

  const rtextS = testJoin([thisIndentStr, "<", tag, " ", "class=", mediaObjectID, ">", "\n"]);
  const rtextE = testJoin([thisIndentStr, "</", tag, ">", "\n"]);

  const addText = rtextS + rtextC + "\n" + rtextE;
  //console.log("addText", addText);
  return addText;
};
