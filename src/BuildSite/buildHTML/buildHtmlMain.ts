//require('raw-loader!./input.txt');

import { testJoin } from "./buildAuxiliaryFunction";
import * as buildSourceType from "./buildSourceType";

const htmlBuildMain = (jsonDataCentral: any, compositeID: string) => {
  const htmlText = String(
    require("./../buildFormat/htmlFormat.html")["default"]
  );

  const OwnedClass_Composite = jsonDataCentral["OwnedClass_Composite"];
  const OwnedClass_MediaObject = jsonDataCentral["OwnedClass_MediaObject"];
  const OwnedClass_Animator = jsonDataCentral["OwnedClass_Animator"];
  const OwnedClass_Keyframe = jsonDataCentral["OwnedClass_Keyframe"];
  
  function getJsonDataCentral() {
    return jsonDataCentral;
  }

  const rootText = parseComposite(getJsonDataCentral, compositeID);
  const htmlTextReplace = htmlText.replace("rootEdit", rootText);
  return htmlTextReplace;
};

export default htmlBuildMain;

const parseComposite = (
  // htmlRoot: string,
  getJsonDataCentral: Function,
  compositeID: string
) => {
  console.log(getJsonDataCentral);
  const OwnedClass_Composite = getJsonDataCentral()["OwnedClass_Composite"];
  const thenComposite = OwnedClass_Composite[compositeID];
  //console.table(thenComposite);
  let rootText: string = "";
  const OwnedID_MediaObject = thenComposite["OwnedID_MediaObject"];

  console.log(compositeID)

  for (let i = 0; i < OwnedID_MediaObject.length; i++) {
    const thenMediaObjectID = OwnedID_MediaObject[i];
    const thenText: string = parseMediaObject(
      getJsonDataCentral,
      compositeID,
      thenMediaObjectID
    );
    rootText += thenText;
  }
  return rootText;
};

const parseMediaObject = (
  // htmlRoot: string,
  getJsonDataCentral: Function,
  compositeID: string,
  mediaObjectID: string
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
    rtextC = buildSourceType.sourceTypeFunctionText(
      getJsonDataCentral,
      thenSsourceTypeClass
    );
  }
  if (thenSourceType === buildSourceType.sourceTypeList[2]) {
    //text
    rtextC = buildSourceType.sourceTypeFunctionComposite(
      getJsonDataCentral,
      thenSsourceTypeClass,
      parseComposite
    );
  }

  const rtextS = testJoin(["<", tag, " ", "class=", mediaObjectID, ">", "\n"]);
  const rtextE = testJoin(["</", tag, ">", "\n"]);

  const addText = rtextS + rtextC + rtextE;
  //console.log("addText", addText);
  return addText;
};
