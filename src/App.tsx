import * as React from "react";
const { useState, useContext, useReducer, createContext, useEffect } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./unify.css";
import "./timeline/CSS/timeline.css";
import "./timeline/CSS/animator.css";
import "./timeline/CSS/keyframe.css";
import "./timeline/CSS/layerPanel.css";
import "./timeline/CSS/playhead.css";
import "./ToolBar/CSS/ToolBar.css";
import "./ToolBar/CSS/ToolBarDetail.css";
import "./CompositeChoice/CSS/CompositeChoice.css";

import "./ToolConfig/CSS/ToolConfig.css";
import "./ToolConfig/CSS/ToolConfigParts.css";

import * as buildSourceType from "./BuildSite/buildHTML/buildSourceSpecies";

import SetupEditor from "./SetupEditor/SetupEditor";

import { AppContext } from "./AppContext";

import MiddleDataOperationClass from "./MiddleData/middleDataOperation";
import UUID from "uuidjs";

const getUUID = () => {
  return String(UUID.generate());
};

const sortNumber = (arrayData: Array<number>, sortMode: boolean) => {
  //sortMode
  //  falseになると昇順ソート
  //  trueにすると降順ソート

  let A: number;
  let B: number;

  if (sortMode) {
    //降順ソート
    A = -1;
    B = 1;
  } else {
    //昇順ソート
    A = 1;
    B = -1;
  }

  arrayData.sort(function (first, second) {
    const Fn = Number(first);
    const Sn = Number(second);
    if (Fn > Sn) {
      return A;
    } else if (Fn < Sn) {
      return B;
    } else {
      return 0;
    }
  });
  return arrayData;
};

const middleDataOperation = new MiddleDataOperationClass(); //
middleDataOperation.createDataCentral();

//ここからテスト用 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

// let old_CompositeID;

// for (let i = 1; i <= 5; i++) {
//   const t_CompositeID = middleDataOperation.createComposite();

//   for (let j = 1; j <= i; j++) {
//     let addClass;
//     if (i !== 1 && j === 1) {
//       addClass = new buildSourceType.SourceTypeCompositeClass(old_CompositeID);
//       console.log(i, j, old_CompositeID);
//     } else {
//       addClass = new buildSourceType.SourceTypeTextClass("( 'ω')" + i + " " + j, 10, "font");
//     }
//     const t_MediaObjectID = middleDataOperation.createMediaObject(addClass);
//     middleDataOperation.linkMediaObject(t_CompositeID, t_MediaObjectID);
//     for (let k = 1; k <= j; k++) {
//       const t_animatorGroupID = middleDataOperation.createAnimatorGroup();
//       middleDataOperation.linkAnimatorGroup(t_MediaObjectID, t_animatorGroupID);
//       for (let n = 1; n <= k; n++) {
//         const t_AnimatorID = middleDataOperation.createAnimator();
//         middleDataOperation.linkAnimator(t_animatorGroupID, t_AnimatorID);

//         const t_KeyframeID = middleDataOperation.createKeyframe();
//         middleDataOperation.linkKeyframe(t_AnimatorID, t_KeyframeID);
//       }
//     }
//   }

//   old_CompositeID = t_CompositeID;
// }
// console.log(middleDataOperation.DataCentral);

//ここまでテスト用 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

const componentConvertCompositeChoiceArea = () => {
  const compositeIDArray = middleDataOperation.getOwnedID_Composite();
  const AppContextValue = useContext(AppContext);
  // console.log("componentConvertMediaObjectArea", mediaObjIDArray);

  const middleDataCompositeTemp = [];

  for (let i = 0; i < compositeIDArray.length; i++) {
    const thisCompositeClass = middleDataOperation.getOwnedClassComposite(compositeIDArray[i]);
    middleDataCompositeTemp.push({
      Composite_ID: compositeIDArray[i],
      Composite_Name: thisCompositeClass.Composite_Name,
    });
  }

  return middleDataCompositeTemp;
};

const componentConvertMediaObjectArea = (send_CompositeID: string) => {
  // const send_CompositeID =  CompositeID_0
  const mediaObjIDArray = middleDataOperation.getOwnedID_MediaObject(send_CompositeID);

  const middleDataMediaObjectTemp = [];

  for (let i = 0; i < mediaObjIDArray.length; i++) {
    middleDataMediaObjectTemp.push({
      MediaObject_ID: mediaObjIDArray[i],
    });
  }
  return middleDataMediaObjectTemp;
};

const componentConvertAnimatorArea = (send_MediaObjectID: string) => {
  const AnimatorGroupIDArray = middleDataOperation.getOwnedID_AnimatorGroup(send_MediaObjectID);

  const middleDataAnimatorTemp = [];

  for (let gi = 0; gi < AnimatorGroupIDArray.length; gi++) {
    const AnimatorGroupID = AnimatorGroupIDArray[gi];
    const AnimatorGroupClass = middleDataOperation.getOwnedClassAnimatorGroup(AnimatorGroupID);

    const AnimatorIDArray = middleDataOperation.getOwnedID_Animator(AnimatorGroupID);
    middleDataAnimatorTemp.push({
      entity_species: "AnimatorGroup",
      Animator_ID: AnimatorGroupID,
    });

    for (let i = 0; i < AnimatorIDArray.length; i++) {
      middleDataAnimatorTemp.push({
        entity_species: "Animator",
        Animator_ID: AnimatorIDArray[i],
      });
    }
  }

  return middleDataAnimatorTemp;
};

const componentConvertKeyframeArea = (send_AnimatorID: string) => {
  const KeyframeIDArray = middleDataOperation.getOwnedID_Keyframe(send_AnimatorID);

  const middleDataKeyframeTemp = [];

  for (let i = 0; i < KeyframeIDArray.length; i++) {
    middleDataKeyframeTemp.push({
      Keyframe_ID: KeyframeIDArray[i],
    });
  }
  return middleDataKeyframeTemp;
};

const deepCopyDict = (ary: { [name: string | number]: any }) => {
  const aryKeys = Object.keys(ary);
  const aryValues = Object.values(ary);
  let temp: { [name: string | number]: any } = {};
  for (let i = 0; i < aryKeys.length; i++) {
    const thisKey: string | number = aryKeys[i];
    const thisValue = aryValues[i];
    temp[thisKey] = thisValue;
  }
  return temp;
};

//{ [name: string]: ToolBarClassificationData }
const App = () => {
  const [update, setUpdata] = useState<boolean>(false);

  const updateDOM = () => {
    //強制再レンダリング関数
    setUpdata(update ? false : true);
  };

  useEffect(() => {
    console.log("update 再レンダリング");
  }, [update]);

  return (
    <div>
      <AppContext.Provider
        value={{
          getUUID: getUUID,
          sortNumber: sortNumber,
          deepCopyDict: deepCopyDict,
          componentConvertCompositeChoiceArea: componentConvertCompositeChoiceArea,
          componentConvertMediaObjectArea: componentConvertMediaObjectArea,
          componentConvertAnimatorArea: componentConvertAnimatorArea,
          componentConvertKeyframeArea: componentConvertKeyframeArea,

          updateDOM: updateDOM,
          operationMediaObjectTime: middleDataOperation.operationMediaObjectTime,
          operationKeyframeTime: middleDataOperation.operationKeyframeTime,
          getMediaObjectTime: middleDataOperation.getMediaObjectTime,
          getMediaObjectSourceSpecies: middleDataOperation.getMediaObjectSourceSpecies,
          getKeyframeTime: middleDataOperation.getKeyframeTime,
          fileExportDataCentral: middleDataOperation.fileExportDataCentral,
          fileExportComposite: middleDataOperation.fileExportComposite,
          // htmlBuildMain:htmlBuildMain
          buildMiddleDataHtml: middleDataOperation.buildMiddleDataHtml,
          swopMediaObject: middleDataOperation.swopMediaObject,
          rewriteMediaObejctAnimatorOpen: middleDataOperation.rewriteMediaObejctAnimatorOpen,
          getMediaObejctAnimatorOpen: middleDataOperation.getMediaObejctAnimatorOpen,
          getCompositeName: middleDataOperation.getCompositeName,

          setMediaObjectColor: middleDataOperation.setMediaObjectColor,
          getMediaObjectColor: middleDataOperation.getMediaObjectColor,

          createComposite: middleDataOperation.createComposite,
          createMediaObject: middleDataOperation.createMediaObject,
          createAnimatorGroup: middleDataOperation.createAnimatorGroup,
          createAnimator: middleDataOperation.createAnimator,
          createKeyframe: middleDataOperation.createKeyframe,

          linkMediaObject: middleDataOperation.linkMediaObject,
          linkAnimatorGroup: middleDataOperation.linkAnimatorGroup,
          linkAnimator: middleDataOperation.linkAnimator,
          linkKeyframe: middleDataOperation.linkKeyframe,
        }}
      >
        <SetupEditor />
      </AppContext.Provider>
    </div>
  );
};
export default App;

//git branch変更テスト
//windows 変更テスト
//変更テスト 2
