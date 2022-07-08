import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;

import * as InMediaObjectArea from "./InMediaObjectArea";

import UUID from "uuidjs";

import { AppContext } from "../AppContext";
import { MediaObjectContext } from "./timelineContext";
import * as InMediaObjectLayerPanel from "./InMediaObjectLayerPanel";
import * as MediaObjectAreaSpaceComponent from "./MediaObjectSpace";
// {componentGenerateMediaObjectAreaSpace(index)}


export const MediaObjectAreaComponent = (props: any) => {
  const mediaObjectAreaElement = useRef<HTMLDivElement>(null);

  // console.log("middleDataMediaObject",DownstreamMiddleDataMediaObject)

  const AppContextValue = useContext(AppContext);
  const [animatorOpen, animatorOpenSetState] = useState<boolean>(true);
  const [staStylePos, StaSetState] = useState<number>(null);
  const [endStylePos, EndSetState] = useState<number>(null);
  // const [mediaObjectUUID] = useState<string>(DownstreamMiddleDataMediaObject["MediaObject_ID"] as string);

  // const mediaObjectUUID: string =

  const MediaObject_ID = props.DownstreamMiddleDataMediaObject["MediaObject_ID"]
  console.log("props.DownstreamMiddleDataMediaObjectMediaObject_ID",props.DownstreamMiddleDataMediaObject["MediaObject_ID"])
    
  useEffect(() => {

    const ElementBoundingClientRect =
    mediaObjectAreaElement.current.getBoundingClientRect();
  
    const ElementLeft = ElementBoundingClientRect.left;
    const ElementTop = ElementBoundingClientRect.top;
    console.log("MediaObjectAreaComponent",ElementLeft,ElementTop)
  }, []);

  useEffect(() => {

    if (!staStylePos || !endStylePos){
      return
    }

    AppContextValue.operationMediaObjectTime({
      mediaObjectID: MediaObject_ID,
      sta: staStylePos,
      end: endStylePos,
    });
  }, [staStylePos, endStylePos]);

  return (
    <>
    
      <div className="media_object-area" ref={mediaObjectAreaElement}>
        <MediaObjectContext.Provider
          value={{
            mediaObjectAreaElement: mediaObjectAreaElement,
            animatorOpen: animatorOpen,
            animatorOpenSetState: animatorOpenSetState,
            staStylePos: staStylePos,
            StaSetState: StaSetState,
            endStylePos: endStylePos,
            EndSetState: EndSetState,
            mediaObjectUUID: MediaObject_ID 
          }}
        >
          {/* <div className="media_object-area-left"></div> */}
          {/* <div className="media_object-area-right"></div>*/}
          
          <InMediaObjectLayerPanel.TimelineAreaLayerPanelComponent />
          <InMediaObjectArea.TimelineAreaLayerDurationComponent />
          
        </MediaObjectContext.Provider>
      </div>
      {MediaObjectAreaSpaceComponent.componentGenerateMediaObjectAreaSpace(props.indexMediaObejct)}
    </>
  );
};

// export default MediaObjectAreaComponent;
