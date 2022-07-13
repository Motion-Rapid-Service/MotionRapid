import * as React from "react";
const { useState, useContext, useReducer, createContext, useEffect } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./unify.css";
import "./timeline/CSS/timeline.css";
import "./timeline/CSS/animator.css";
import "./timeline/CSS/keyframe.css";
import "./timeline/CSS/layerPanel.css";
import "./ToolBar/CSS/ToolBar.css";
import "./ToolBar/CSS/ToolBarDetail.css";
import "./CompositeChoice/CSS/CompositeChoice.css";

import * as buildSourceType from "./BuildSite/buildHTML/buildSourceType"

import SetupEditor from "./SetupEditor/SetupEditor";

import { AppContext } from "./AppContext";

import MiddleDataOperationClass from "./MiddleData/middleDataOperation";
import UUID from "uuidjs";

const getUUID = () => {
  return String(UUID.generate());
};

const sortNumber  = (arrayData:Array<number>,sortMode:boolean   ) => {
  //sortMode
  //  falseになると昇順ソート
  //  trueにすると降順ソート
  
  let A:number;
  let B:number;
  
  if (sortMode){ //降順ソート
    A = -1
    B = 1
  }
  else{ //昇順ソート
    A = 1
    B = -1
  }

  arrayData.sort(function(first, second){
    const Fn = Number(first)
    const Sn = Number(second)
    if (Fn > Sn){
      return A;
    }else if (Fn < Sn){
      return B;
    }else{
      return 0;
    }
  });
  return arrayData
}

const middleDataOperation = new MiddleDataOperationClass(); //
middleDataOperation.createDataCentral();

//ここからテスト用 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
for (let i = 1; i <= 20; i++) {
  const t_CompositeID = middleDataOperation.createComposite();

  for (let j = 1; j <= i; j++) {
    const t_MediaObjectID = middleDataOperation.createMediaObject(new buildSourceType.SourceTypeTextClass("g( 'ω')hxtjんりうh",10,"font"));
    middleDataOperation.linkMediaObject(t_CompositeID, t_MediaObjectID);

    for (let k = 1; k <= j; k++) {
      const t_AnimatorID = middleDataOperation.createAnimator();
      middleDataOperation.linkAnimator(t_MediaObjectID, t_AnimatorID);

      const t_KeyframeID = middleDataOperation.createKeyframe();
      middleDataOperation.linkKeyframe(t_AnimatorID, t_KeyframeID);
    }
  }
}
console.log (middleDataOperation.DataCentral)

//ここまでテスト用 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *

const componentConvertCompositeChoiceArea = () => {
  const compositeIDArray = middleDataOperation.getOwnedID_Composite();
  // console.log("componentConvertMediaObjectArea", mediaObjIDArray);

  const middleDataCompositeTemp = [];

  for (let i = 0; i < compositeIDArray.length; i++) {
    middleDataCompositeTemp.push({
      Composite_ID: compositeIDArray[i],
    });
  }

  return middleDataCompositeTemp;
};

const componentConvertMediaObjectArea = (send_CompositeID: string) => {
  // const send_CompositeID =  CompositeID_0
  const mediaObjIDArray =
    middleDataOperation.getOwnedID_MediaObject(send_CompositeID);

  const middleDataMediaObjectTemp = [];

  for (let i = 0; i < mediaObjIDArray.length; i++) {
    middleDataMediaObjectTemp.push({
      MediaObject_ID: mediaObjIDArray[i],
    });
  }
  return middleDataMediaObjectTemp;
};

const componentConvertAnimatorArea = (send_MediaObjectID: string) => {
  const AnimatorIDArray =
    middleDataOperation.getOwnedID_Animator(send_MediaObjectID);

  const middleDataAnimatorTemp = [];

  for (let i = 0; i < AnimatorIDArray.length; i++) {
    middleDataAnimatorTemp.push({
      Animator_ID: AnimatorIDArray[i],
    });
  }

  return middleDataAnimatorTemp;
};

const componentConvertKeyframeArea = (send_AnimatorID: string) => {
  const KeyframeIDArray =
    middleDataOperation.getOwnedID_Keyframe(send_AnimatorID);

  const middleDataKeyframeTemp = [];

  for (let i = 0; i < KeyframeIDArray.length; i++) {
    middleDataKeyframeTemp.push({
      Keyframe_ID: KeyframeIDArray[i],
    });
  }
  return middleDataKeyframeTemp;
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
          sortNumber:sortNumber,
          componentConvertCompositeChoiceArea:
            componentConvertCompositeChoiceArea,
          componentConvertMediaObjectArea: componentConvertMediaObjectArea,
          componentConvertAnimatorArea: componentConvertAnimatorArea,
          componentConvertKeyframeArea: componentConvertKeyframeArea,

          updateDOM: updateDOM,
          operationMediaObjectTime:
            middleDataOperation.operationMediaObjectTime,
          operationKeyframeTime: middleDataOperation.operationKeyframeTime,
          getMediaObjectTime:middleDataOperation.getMediaObjectTime,
          getKeyframeTime:middleDataOperation.getKeyframeTime,
          fileExportDataCentral:middleDataOperation.fileExportDataCentral,
          fileExportComposite:middleDataOperation.fileExportComposite,
          // htmlBuildMain:htmlBuildMain
          buildMiddleDataHtml:middleDataOperation.buildMiddleDataHtml,
          swopMediaObject:middleDataOperation.swopMediaObject,
          rewriteMediaObejctAnimatorOpen:middleDataOperation.rewriteMediaObejctAnimatorOpen,
          getMediaObejctAnimatorOpen:middleDataOperation.getMediaObejctAnimatorOpen,
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