//require('raw-loader!./input.txt');

import { testJoin, textReplace } from "./buildAuxiliaryFunction";
import * as buildSourceSpecies from "./buildSourceSpecies";
import CSSBuildMain from "./../buildCSS/buildCSSMain";
import * as buildQue from "../buildQue";

import * as middleDataClass from "./../../MiddleData/middleDataClass";

let rootHtmlID: string;
let rootStyleID: string;
let rootScriptID: string;

const htmlBuildMain = (jsonDataCentral: any, compositeID: string) => {
  buildQue.alldeleteHtmlElementQue();
  buildQue.alldeleteCSSElementQue();
  buildQue.alldeleteJavaScriptElementQue();

  const htmlText = String(require("./../buildFormat/htmlFormat.txt")["default"]);

  const OwnedClass_Composite: { [name: string]: middleDataClass.Composite } = jsonDataCentral.OwnedClass_Composite;
  const OwnedClass_MediaObject: { [name: string]: middleDataClass.MediaObject } = jsonDataCentral.OwnedClass_MediaObject;
  const OwnedClass_AnimatorGroup: { [name: string]: middleDataClass.AnimatorGroup } = jsonDataCentral.OwnedClass_AnimatorGroup;
  const OwnedClass_Animator: { [name: string]: middleDataClass.Animator } = jsonDataCentral.OwnedClass_Animator;
  const OwnedClass_Keyframe: { [name: string]: middleDataClass.Keyframe } = jsonDataCentral.OwnedClass_Keyframe;
  const OwnedClass_CSSProperty: { [name: string]: middleDataClass.CSSProperty } = jsonDataCentral.OwnedClass_CSSProperty;

  function getJsonDataCentral() {
    return jsonDataCentral;
  }

  let indentHTML: number = 3; //root等を考慮した値

  // let cssText: string = "";
  // // console.log("cssText", cssText);

  // const writeCSS = (send_AddCssText: string) => {
  //   cssText += "\n";
  //   cssText += send_AddCssText;
  //   cssText += "\n";
  // };

  rootHtmlID = buildQue.pushHtmlElementQue(new buildQue.htmlElementTopClass());
  rootStyleID = buildQue.pushCSSElementQue(new buildQue.cssElementTopClass());
  rootScriptID = buildQue.pushJavaScriptElementQue(new buildQue.javascriptElementTopClass());

  // const cssAttribute: { [name: string]: string } = { type: "text/css" };
  // buildQue.pushHtmlElementQue(new buildQue.htmlElementBlockClass("style", cssAttribute), rootStyleID);
  parseComposite(getJsonDataCentral, rootHtmlID, compositeID);

  const outputHtml = recursiveHtml(rootHtmlID);
  const outputStyle = recursiveCSS(rootStyleID);
  const outputScript = recursiveScript(rootScriptID);

  console.log("outputHtml", outputHtml);
  console.log(buildQue.htmlElementQue);
  console.log(buildQue.cssElementQue);
  console.log(buildQue.javascriptElementQue);

  const replaceData = {
    "%rootEdit%": outputHtml,
    "%rootTitle%": "TestMotionRapid",
    "%rootStyle%": outputStyle,
    "%rootScript%": outputScript,
  };
  const htmlTextReplace = textReplace(htmlText, replaceData);

  return htmlTextReplace;
};

export default htmlBuildMain;

const recursiveScript = (jsID: string) => {
  const jsElement: buildQue.javascriptElement = buildQue.getJavaScriptElementQue(jsID);

  console.log("recursiveScript", jsID, jsElement);

  if (!jsElement) {
    return "";
  }

  const newTextArray: Array<string> = jsElement.getText();
  const childIDArray: Array<string> = jsElement.childID;

  let recursiveText = "";

  if (jsElement.species === buildQue.javascriptElementSpeciesList[1]) {
    recursiveText += newTextArray[0];
  }

  if (jsElement.species === buildQue.javascriptElementSpeciesList[2]) {
    for (let i = 0; i < childIDArray.length; i++) {
      const returnText = "\n" + recursiveScript(childIDArray[i]) + "\n";
      recursiveText += returnText;
    }
  }

  console.log("recursiveScript", recursiveText);

  return recursiveText;
};

const recursiveCSS = (cssID: string) => {
  const cssElement: buildQue.cssElement = buildQue.getCSSElementQue(cssID);

  if (!cssElement) {
    return "";
  }

  const newTextArray: Array<string> = cssElement.getText();
  const childIDArray: Array<string> = cssElement.childID;

  let recursiveText = "";

  if (cssElement.species === buildQue.cssElementSpeciesList[1]) {
    recursiveText += newTextArray[0];
    for (let i = 0; i < childIDArray.length; i++) {
      const returnText = "\n" + recursiveCSS(childIDArray[i]) + "\n";
      recursiveText += returnText;
    }
    recursiveText += newTextArray[1];
  }

  if (cssElement.species === buildQue.cssElementSpeciesList[2]) {
    recursiveText += newTextArray[0];
  }

  if (cssElement.species === buildQue.cssElementSpeciesList[3]) {
    for (let i = 0; i < childIDArray.length; i++) {
      const returnText = "\n" + recursiveCSS(childIDArray[i]) + "\n";
      recursiveText += returnText;
    }
  }

  return recursiveText;
};

const recursiveHtml = (htmlID: string) => {
  const htmlElement: buildQue.htmlElement = buildQue.getHtmlElementQue(htmlID);
  const newTextArray: Array<string> = htmlElement.getText();
  const childIDArray: Array<string> = htmlElement.childID;

  let recursiveText = "";

  if (htmlElement.species === buildQue.htmlElementSpeciesList[1]) {
    recursiveText += "\n";
    recursiveText += newTextArray[0];

    for (let i = 0; i < childIDArray.length; i++) {
      const returnText = "\n" + recursiveHtml(childIDArray[i]) + "\n";
      recursiveText += returnText;
    }
    recursiveText += newTextArray[1];
    recursiveText += "\n";
  }
  if (htmlElement.species === buildQue.htmlElementSpeciesList[2]) {
    recursiveText += newTextArray[0];
  }
  if (htmlElement.species === buildQue.htmlElementSpeciesList[3]) {
    for (let i = 0; i < childIDArray.length; i++) {
      const returnText = "\n" + recursiveHtml(childIDArray[i]) + "\n";
      recursiveText += returnText;
    }
  }
  return recursiveText;
};

const parseComposite = (
  // htmlRoot: string,
  getJsonDataCentral: Function,
  parentID: string,
  compositeID: string
) => {
  console.log(getJsonDataCentral);
  const OwnedClass_Composite = getJsonDataCentral().OwnedClass_Composite;
  const thenComposite = OwnedClass_Composite[compositeID];
  //console.table(thenComposite);

  const OwnedID_MediaObject = thenComposite["OwnedID_MediaObject"];

  console.log(compositeID);

  for (let i = 0; i < OwnedID_MediaObject.length; i++) {
    const thenMediaObjectID = OwnedID_MediaObject[i];
    parseMediaObject(getJsonDataCentral, parentID, compositeID, thenMediaObjectID);
  }
  return;
};

const parseMediaObject = (
  // htmlRoot: string,
  getJsonDataCentral: Function,
  parentID: string,
  compositeID: string,
  mediaObjectID: string
) => {
  const jsonDataCentral = getJsonDataCentral();
  const OwnedClass_Composite: { [name: string]: middleDataClass.Composite } = jsonDataCentral.OwnedClass_Composite;
  const OwnedClass_MediaObject: { [name: string]: middleDataClass.MediaObject } = jsonDataCentral.OwnedClass_MediaObject;
  const OwnedClass_AnimatorGroup: { [name: string]: middleDataClass.AnimatorGroup } = jsonDataCentral.OwnedClass_AnimatorGroup;
  const OwnedClass_Animator: { [name: string]: middleDataClass.Animator } = jsonDataCentral.OwnedClass_Animator;
  const OwnedClass_Keyframe: { [name: string]: middleDataClass.Keyframe } = jsonDataCentral.OwnedClass_Keyframe;
  const OwnedClass_CSSProperty: { [name: string]: middleDataClass.CSSProperty } = jsonDataCentral.OwnedClass_CSSProperty;

  const tag = "div";

  const thenMediaObject: middleDataClass.MediaObject = OwnedClass_MediaObject[mediaObjectID];
  const thenSourceSpeciesClass: buildSourceSpecies.SourceSpeciesClass = thenMediaObject.sourceSpecies;
  const thenSourceSpecies = String(thenSourceSpeciesClass.sourceSpecies);

  const htmlAttribute: { [name: string]: string } = { id: mediaObjectID };

  const newHtmlID = buildQue.pushHtmlElementQue(new buildQue.htmlElementBlockClass(tag, htmlAttribute), parentID);

  if (thenSourceSpecies === buildSourceSpecies.sourceSpeciesList[0]) {
    //default
  }
  if (thenSourceSpecies === buildSourceSpecies.sourceSpeciesList[1]) {
    //text
    buildSourceSpecies.sourceSpeciesFunctionText(getJsonDataCentral, newHtmlID, thenSourceSpeciesClass as buildSourceSpecies.SourceSpeciesTextClass);
  }
  if (thenSourceSpecies === buildSourceSpecies.sourceSpeciesList[2]) {
    //Composite
    buildSourceSpecies.sourceSpeciesFunctionComposite(
      getJsonDataCentral,
      newHtmlID,
      thenSourceSpeciesClass as buildSourceSpecies.SourceSpeciesCompositeClass,
      parseComposite
    );
  }

  CSSBuildMain(getJsonDataCentral(), rootStyleID, rootScriptID, compositeID, mediaObjectID);

  // buildQue.pushHtmlElementQue(new buildQue.htmlElementBlockClass(tag, -1));

  // const addCSSText = CSSBuildMain(getJsonDataCentral(), compositeID, mediaObjectID);
  // writeCSS(addCSSText);

  //console.log("addText", addText);
  return;
};
