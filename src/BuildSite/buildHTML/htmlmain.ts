//require('raw-loader!./input.txt');

const testJoin = (textArray: Array<string>) => {
  let text = "";

  for (let i = 0; i < textArray.length; i++) {
    text += textArray[i];
  }

  return text;
};

const htmlBuildMain = (jsonDataCentral: any, compositeID: string) => {
  const htmlText = String(
    require("./../buildFormat/htmlFormat.html")["default"]
  );

  console.log("htmlText",htmlText)

  console.log("compositeID", compositeID);
  console.table(jsonDataCentral);

  const OwnedClass_Composite = jsonDataCentral["OwnedClass_Composite"];
  const OwnedClass_MediaObject = jsonDataCentral["OwnedClass_MediaObject"];
  const OwnedClass_Animator = jsonDataCentral["OwnedClass_Animator"];
  const OwnedClass_Keyframe = jsonDataCentral["OwnedClass_Keyframe"];

  console.table("OwnedClass_Composite", OwnedClass_Composite);
  console.table("OwnedClass_MediaObject", OwnedClass_MediaObject);
  console.table("OwnedClass_Animator", OwnedClass_Animator);
  console.table("OwnedClass_Keyframe", OwnedClass_Keyframe);

  const rootComposite = OwnedClass_Composite[compositeID];

  console.table(rootComposite);

  let rootText: string = "";

  const OwnedID_MediaObject = rootComposite["OwnedID_MediaObject"]

  for (let i = 0;i < OwnedID_MediaObject.length;i++){
    const firstMediaObjectID = OwnedID_MediaObject[i];
    rootText = parseMediaObject(
      rootText,
      jsonDataCentral,
      compositeID,
      firstMediaObjectID
    );
  }
  const htmlTextReplace = htmlText.replace('rootEdit', rootText);
  return htmlTextReplace;
};

export default htmlBuildMain;

const parseMediaObject = (
  htmlRoot: string,
  jsonDataCentral: any,
  compositeID: string,
  mediaObjectID: string
) => {
  const OwnedClass_Composite = jsonDataCentral["OwnedClass_Composite"];
  const OwnedClass_MediaObject = jsonDataCentral["OwnedClass_MediaObject"];
  const tag = "div";

  const rtextS = testJoin(["<", tag, " ", "class=", mediaObjectID, ">","\n"]);

  const rtextE = testJoin(["</", tag, ">","\n"]);

  const addText = rtextS + rtextE;
  console.log("addText", addText);

  htmlRoot += addText;
  return htmlRoot;
};
