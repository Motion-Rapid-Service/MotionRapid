import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;

import * as InMediaObjectArea from "./InMediaObjectArea";

import UUID from "uuidjs";

import { AppContext } from "../AppContext";
import { MediaObjectContext } from "./timelineContext";
import * as InMediaObjectLayerPanel from "./InMediaObjectLayerPanel";


const MediaObjectAreaComponent = (props:any) => {
  const mediaObjectAreaElement = useRef<HTMLDivElement>(null);
  const DownstreamMiddleDataMediaObject = props.DownstreamMiddleDataMediaObject
  // console.log("middleDataMediaObject",DownstreamMiddleDataMediaObject)

  const AppContextValue = useContext(AppContext);
  const [animatorOpen, animatorOpenSetState] = useState<boolean>(true);
  const [staStylePos, StaSetState] = useState<number>(500);
  const [endStylePos, EndSetState] = useState<number>(1000);
  const [mediaObjectUUID] = useState<string>(DownstreamMiddleDataMediaObject["MediaObject_ID"] as string);
  const operationMediaObjectTime = AppContextValue.operationMediaObjectTime as Function;


  useEffect(() => {
    operationMediaObjectTime({"mediaObjectID":mediaObjectUUID,"sta":staStylePos,"end":endStylePos})
  }, [staStylePos, endStylePos]);

  return (
    <>
      <div className="media_object-area" ref={mediaObjectAreaElement}>

        <MediaObjectContext.Provider 
          value={{
            mediaObjectAreaElement: mediaObjectAreaElement,
            animatorOpen: animatorOpen,
            animatorOpenSetState: animatorOpenSetState,
            staStylePos:staStylePos,
            StaSetState:StaSetState,
            endStylePos:endStylePos,
            EndSetState:EndSetState,
            mediaObjectUUID:mediaObjectUUID
          }}
        >

          {/* <div className="media_object-area-left"></div> */}
          {/* <div className="media_object-area-right"></div>*/}
          <InMediaObjectLayerPanel.TimelineAreaLayerPanelComponent />
          <InMediaObjectArea.TimelineAreaLayerDurationComponent />
        </MediaObjectContext.Provider>
      </div>
    </>
  );
};

export default MediaObjectAreaComponent;
