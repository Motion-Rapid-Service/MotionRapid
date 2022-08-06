//require('raw-loader!./input.txt');

import { testJoin, textReplace } from "./buildAuxiliaryFunction";
import * as buildSourceSpecies from "./buildSourceSpecies";
import CSSBuildMain from "./../buildCSS/buildCSSMain";
import * as buildQue from "../buildQue";

import * as middleDataClass from "./../../MiddleData/middleDataClass";

const htmlBuildMain = (jsonDataCentral: any, compositeID: string) => {
  buildQue.alldeletehtmlElementQue();

  const htmlText = String(require("./../buildFormat/htmlFormat.html")["default"]);

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

  let cssText: string = "";
  // console.log("cssText", cssText);

  const writeCSS = (send_AddCssText: string) => {
    cssText += "\n";
    cssText += send_AddCssText;
    cssText += "\n";
  };

  const downParentID = "rootEdit";

  parseComposite(getJsonDataCentral, downParentID, compositeID, writeCSS);
  const replaceData = {
    // "%rootEdit%": "rootText",
    "%title%": "MotionRapidTest",
    "%style%": testJoin(["<style type='text/css'>", "\n", cssText, "\n", "</style>"]),
  };

  // const jsonSyntaxCSS = CSSBuildMain(jsonData, CompositeID);

  const htmlTextReplace = textReplace(htmlText, replaceData);

  console.log(buildQue.htmlElementQue);

  return htmlTextReplace;
};

export default htmlBuildMain;

const parseComposite = (
  // htmlRoot: string,
  getJsonDataCentral: Function,
  parentID: string,
  compositeID: string,
  writeCSS: Function
) => {
  console.log(getJsonDataCentral);
  const OwnedClass_Composite = getJsonDataCentral().OwnedClass_Composite;
  const thenComposite = OwnedClass_Composite[compositeID];
  //console.table(thenComposite);

  const OwnedID_MediaObject = thenComposite["OwnedID_MediaObject"];

  console.log(compositeID);

  for (let i = 0; i < OwnedID_MediaObject.length; i++) {
    const thenMediaObjectID = OwnedID_MediaObject[i];
    parseMediaObject(getJsonDataCentral, parentID, compositeID, thenMediaObjectID, writeCSS);
  }
  return;
};

const parseMediaObject = (
  // htmlRoot: string,
  getJsonDataCentral: Function,
  parentID: string,
  compositeID: string,
  mediaObjectID: string,
  writeCSS: Function
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

  const htmlAttribute: { [name: string]: string } = { class: mediaObjectID };

  const newHtmlID = buildQue.pushHtmlElementQue(new buildQue.htmlElementBlockClass(tag, parentID, htmlAttribute));

  if (thenSourceSpecies === buildSourceSpecies.sourceSpeciesList[0]) {
    //default
  }
  if (thenSourceSpecies === buildSourceSpecies.sourceSpeciesList[1]) {
    //text
    buildSourceSpecies.sourceSpeciesFunctionText(getJsonDataCentral, newHtmlID, thenSourceSpeciesClass as buildSourceSpecies.SourceSpeciesTextClass, writeCSS);
  }
  if (thenSourceSpecies === buildSourceSpecies.sourceSpeciesList[2]) {
    //Composite
    buildSourceSpecies.sourceSpeciesFunctionComposite(
      getJsonDataCentral,
      newHtmlID,
      thenSourceSpeciesClass as buildSourceSpecies.SourceSpeciesCompositeClass,
      parseComposite,
      writeCSS
    );
  }

  // buildQue.pushHtmlElementQue(new buildQue.htmlElementBlockClass(tag, -1));

  const addCSSText = CSSBuildMain(getJsonDataCentral(), compositeID, mediaObjectID);
  writeCSS(addCSSText);

  //console.log("addText", addText);
  return;
};
