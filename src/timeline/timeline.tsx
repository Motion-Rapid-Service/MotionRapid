import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./CSS/timeline.css";
import "./CSS/parameter.css";
import "./CSS/keyframe.css";

import { TimelineAreaDivContext } from "./timelineContext";
import MediaObjectAreaComponent from "./MediaObjectAreaComponent";

import MiddleDataOperationClass from "./../MiddleData/middleDataOperation";

const middleDataOperation = new MiddleDataOperationClass(); //

middleDataOperation.createDataCentral();

//ここからテスト用 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
middleDataOperation.createComposite();
const CompositeID_0 = Object.keys(
  middleDataOperation.DataCentral.OwnedClass_Composite
)[0];

for (let i = 0; i < 20 ; i++){ //mediaobjectのテスト用
  middleDataOperation.createMediaObject();
  const MediaObjectID_0 = Object.keys(
    middleDataOperation.DataCentral.OwnedClass_MediaObject
  )[i];
  middleDataOperation.linkMediaObject(CompositeID_0,MediaObjectID_0)
}
console.log("CompositeID_0",CompositeID_0)

//ここまでテスト用 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 



const TimelineComponent = () => {
  // ここでhooksを使える
  const timelineAreaElement = useRef(null);
  const timelineScrollElement = useRef(null);

  useEffect(() => {

  }, []);

  const componentConvertMediaObjectArea = () => {
    const mediaObjIDArray =  middleDataOperation.getOwnedID_MediaObject(CompositeID_0)
    console.log("componentConvertMediaObjectArea",mediaObjIDArray)

    const middleDataMediaObjectTemp = []

    for (let i = 0; i < mediaObjIDArray.length ; i++){
      middleDataMediaObjectTemp.push(
        {"MediaObject_ID":mediaObjIDArray[i],
        "operationMediaObjectTime":middleDataOperation.operationMediaObjectTime}
      )
    }

    return middleDataMediaObjectTemp;
  };

  return (
    <div className="timeline-area" draggable="false" ref={timelineAreaElement}>
      <div
        className="timeline-area-scroll"
        ref={timelineScrollElement}
        draggable="false"

        // onScroll={TimeLineAreaMove}
      >
        <TimelineAreaDivContext.Provider
          value={{
            middleDataOperation: middleDataOperation,
            // MouseSelectedSetValue: MouseSelectedSetValue,
            // MouseUnselectedSetValue: MouseUnselectedSetValue,
          }}
        >
          <>
            {componentConvertMediaObjectArea().map((fruit:any, i:number) => (
              // <>{fruit}</> //SurfaceControlIndividualを追加するmap (list_surface_controlに入っている)
              <MediaObjectAreaComponent middleDataMediaObject={fruit} key={i}/>
            ))}
          </>
        </TimelineAreaDivContext.Provider>
      </div>
    </div>
  );
};
export default TimelineComponent;
