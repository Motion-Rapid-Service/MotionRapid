import * as React from "react";
const { useState, useContext, useReducer, createContext, useEffect } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./timeline/CSS/timeline.css";
import "./timeline/CSS/parameter.css";
import "./timeline/CSS/keyframe.css";
import "./ToolBar/CSS/ToolBar.css";
import "./ToolBar/CSS/ToolBarDetail.css";
import "./CompositeChoice/CSS/CompositeChoice.css";
import Editor from "./Editor";

import { AppContext } from "./AppContext";

import MiddleDataOperationClass from "./MiddleData/middleDataOperation";
import UUID from "uuidjs";

const getUUID = () => {
  return String(UUID.generate());
};

const middleDataOperation = new MiddleDataOperationClass(); //
middleDataOperation.createDataCentral();

//ここからテスト用 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
for (let i = 0;i < 100;i++){
  middleDataOperation.createComposite();
}
const CompositeID_0 = Object.keys(
  middleDataOperation.DataCentral.OwnedClass_Composite
)[0];

for (let i = 0; i < 20; i++) {
  //mediaobjectのテスト用
  middleDataOperation.createMediaObject();
  const MediaObjectID_0 = Object.keys(
    middleDataOperation.DataCentral.OwnedClass_MediaObject
  )[i];
  middleDataOperation.linkMediaObject(CompositeID_0, MediaObjectID_0);
}
// console.log("CompositeID_0", CompositeID_0);
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
  // console.log("compositeIDArray",compositeIDArray)
  // console.log("middleDataCompositeTemp",middleDataCompositeTemp)
  return middleDataCompositeTemp;
};

const componentConvertMediaObjectArea = () => {
  const send_CompositeID =  CompositeID_0
  const mediaObjIDArray =
    middleDataOperation.getOwnedID_MediaObject(send_CompositeID);
  // console.log("componentConvertMediaObjectArea", mediaObjIDArray);

  const middleDataMediaObjectTemp = [];

  for (let i = 0; i < mediaObjIDArray.length; i++) {
    middleDataMediaObjectTemp.push({
      MediaObject_ID: mediaObjIDArray[i],
    });
  }
  return middleDataMediaObjectTemp;
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
          componentConvertCompositeChoiceArea:
          componentConvertCompositeChoiceArea,
          componentConvertMediaObjectArea: componentConvertMediaObjectArea,

          updateDOM: updateDOM,
          operationMediaObjectTime:
            middleDataOperation.operationMediaObjectTime,

        }}
      >
        <Editor />
      </AppContext.Provider>
    </div>
  );
};
export default App;
