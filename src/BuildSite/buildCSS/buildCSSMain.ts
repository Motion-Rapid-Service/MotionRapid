// import { testJoin, textReplace } from "./buildAuxiliaryFunction";
// import * as buildSourceType from "./buildSourceType";

const CSSBuildMain = (jsonDataCentral: any, compositeID: string, mediaObjectID: string) => {
  //   const htmlText = String(require("./../buildFormat/htmlFormat.html")["default"]);

  const OwnedClass_Composite = jsonDataCentral["OwnedClass_Composite"];
  const OwnedClass_MediaObject = jsonDataCentral["OwnedClass_MediaObject"];
  const OwnedClass_AnimatorGroup = jsonDataCentral["OwnedClass_AnimatorGroup"];
  const OwnedClass_Animator = jsonDataCentral["OwnedClass_Animator"];
  const OwnedClass_Keyframe = jsonDataCentral["OwnedClass_Keyframe"];

  const thenCompositeClass = OwnedClass_Composite[compositeID];
  const Composite_Duration = thenCompositeClass["Composite_Duration"];

  function getJsonDataCentral() {
    return jsonDataCentral;
  }

  const thenMediaObjectClass = OwnedClass_MediaObject[mediaObjectID];
  const OwnedID_AnimatorGroup = thenMediaObjectClass["OwnedID_AnimatorGroup"];

  let CSSTextReplace: string = "";

  for (let agi = 0; agi < OwnedID_AnimatorGroup.length; agi++) {
    //アニメーターグループ
    const thenAnimatorGroupID = OwnedID_AnimatorGroup[agi];
    const thenAnimatorGroupClass = OwnedClass_AnimatorGroup[thenAnimatorGroupID];
    const OwnedID_Animator = thenAnimatorGroupClass["OwnedID_Animator"];

    for (let ani = 0; ani < OwnedID_Animator.length; ani++) {
      CSSTextReplace += "\n";
      //アニメーター
      const thenAnimatorID = OwnedID_Animator[agi];
      const thenAnimatorClass = OwnedClass_Animator[thenAnimatorID];
      const OwnedID_Keyframe = thenAnimatorClass["OwnedID_Keyframe"];

      CSSTextReplace += "@keyframe ";
      CSSTextReplace += thenAnimatorID;
      CSSTextReplace += " { \n";

      for (let ki = 0; ki < OwnedID_Keyframe.length; ki++) {
        //キーフレーム
        const thenkeyframeID = OwnedID_Keyframe[ki];
        const thenkeyframeClass = OwnedClass_Keyframe[thenkeyframeID];
        const Keyframe_AbsoluteTime = thenkeyframeClass["Keyframe_AbsoluteTime"];
        console.log("最深部", compositeID, mediaObjectID, thenAnimatorGroupID, thenAnimatorID, thenkeyframeID);
        console.log(OwnedID_AnimatorGroup.length, OwnedID_Animator.length, OwnedID_Keyframe.length);

        console.log("Keyframe_AbsoluteTime", Keyframe_AbsoluteTime);
        const percent = (Keyframe_AbsoluteTime / Composite_Duration) * 100;

        CSSTextReplace += String(percent);
        CSSTextReplace += "% { \n";
        CSSTextReplace += "/* css出力テストです */";
        CSSTextReplace += "} \n";
      }
      CSSTextReplace += "}";
      CSSTextReplace += "\n";
    }
  }

  return CSSTextReplace;
};

export default CSSBuildMain;

// const thenCompositeClass = OwnedClass_Composite[compositeID];
// console.log("thenCompositeClass", thenCompositeClass, compositeID);
// const OwnedID_MediaObject = thenCompositeClass["OwnedID_MediaObject"];

// for (let mi = 0; mi < OwnedID_MediaObject.length; mi++) {
//   //メディアオブジェクト
//   const thenMediaObjectID = OwnedID_MediaObject[mi];
//   const thenMediaObjectClass = OwnedClass_MediaObject[thenMediaObjectID];
//   const OwnedID_AnimatorGroup = thenMediaObjectClass["OwnedID_AnimatorGroup"];

//   for (let agi = 0; agi < OwnedID_AnimatorGroup.length; agi++) {
//     //アニメーターグループ
//     const thenAnimatorGroupID = OwnedID_AnimatorGroup[agi];
//     const thenAnimatorGroupClass = OwnedClass_AnimatorGroup[thenAnimatorGroupID];
//     const OwnedID_Animator = thenAnimatorGroupClass["OwnedID_Animator"];

//     for (let ani = 0; ani < OwnedID_Animator.length; ani++) {
//       //アニメーター
//       const thenAnimatorID = OwnedID_Animator[agi];
//       const thenAnimatorClass = OwnedClass_Animator[thenAnimatorID];
//       const OwnedID_Keyframe = thenAnimatorClass["OwnedID_Keyframe"];

//       for (let ki = 0; ki < OwnedID_Keyframe.length; ki++) {
//         //キーフレーム
//         const thenkeyframeID = OwnedID_Keyframe[ki];
//         const thenkeyframeClass = OwnedClass_Keyframe[thenkeyframeID];
//         console.log("最深部", compositeID, thenMediaObjectID, thenAnimatorGroupID, thenAnimatorID, thenkeyframeID);
//         console.log(OwnedID_MediaObject.length, OwnedID_AnimatorGroup.length, OwnedID_Animator.length, OwnedID_Keyframe.length);
//       }
//     }
//   }
// }
