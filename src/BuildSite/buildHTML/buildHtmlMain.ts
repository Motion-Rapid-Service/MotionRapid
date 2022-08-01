//require('raw-loader!./input.txt');

import { testJoin, textReplace } from "./buildAuxiliaryFunction";
import * as buildSourceSpecies from "./buildSourceSpecies";
import CSSBuildMain from "../buildCSS/buildCSSMain";

const buildCodes: { [name: string]: string } = {};
const getBuildCodes = (codeName: string) => {
  return buildCodes[codeName];
};
const insertBuildCodes = (codeName: string, sourceCode: string) => {
  buildCodes[codeName] = sourceCode;
};
const initBuildCodes = () => {
  for (let key in buildCodes) {
    delete buildCodes[key];
  }
};

const htmlBuildMain = (jsonDataCentral: any, compositeID: string) => {
  const htmlText = String(require("./../buildFormat/htmlFormat.html")["default"]);

  const OwnedClass_Composite = jsonDataCentral["OwnedClass_Composite"];
  const OwnedClass_MediaObject = jsonDataCentral["OwnedClass_MediaObject"];
  const OwnedClass_Animator = jsonDataCentral["OwnedClass_Animator"];
  const OwnedClass_Keyframe = jsonDataCentral["OwnedClass_Keyframe"];

  function getJsonDataCentral() {
    return jsonDataCentral;
  }
  insertBuildCodes("main", htmlText);
  insertBuildCodes("rootEdit");

  initBuildCodes();

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
  let rtextC;
  if (thenSourceSpecies === buildSourceSpecies.sourceSpeciesList[0]) {
    //default
  }
  if (thenSourceSpecies === buildSourceSpecies.sourceSpeciesList[1]) {
    //text
    rtextC = buildSourceSpecies.sourceSpeciesFunctionText(getJsonDataCentral, thenSourceSpeciesClass, indentHTML + 1, writeCSS);
  }
  if (thenSourceSpecies === buildSourceSpecies.sourceSpeciesList[2]) {
    //Composite
    rtextC = buildSourceSpecies.sourceSpeciesFunctionComposite(getJsonDataCentral, thenSourceSpeciesClass, parseComposite, indentHTML + 1, writeCSS);
  }

  return addText;
};
