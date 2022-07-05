import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;

import * as InMediaObjectArea from "./InMediaObjectArea";

import UUID from "uuidjs";

import { AppContext } from "../AppContext";
import { MediaObjectContext } from "./timelineContext";
import * as InMediaObjectLayerPanel from "./InMediaObjectLayerPanel";
import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
import { SetupToolbarContext } from "./../SetupEditor/SetupToolbarContext";

const MediaObjectAreaComponent = (props: any) => {
  const mediaObjectAreaElement = useRef<HTMLDivElement>(null);

  // console.log("middleDataMediaObject",DownstreamMiddleDataMediaObject)

  const AppContextValue = useContext(AppContext);
  const [animatorOpen, animatorOpenSetState] = useState<boolean>(true);

  console.log(" MediaObjectAreaComponent - MediaObject_time")

  const MediaObject_ID = props.DownstreamMiddleDataMediaObject["MediaObject_ID"]

  // const [staStylePos, StaSetState] = useState<number>(500);
  // const [endStylePos, EndSetState] = useState<number>(1000);
  // const [mediaObjectUUID] = useState<string>(DownstreamMiddleDataMediaObject["MediaObject_ID"] as string);

  // const mediaObjectUUID: string =
  const SetupToolbarContextValue = useContext(SetupToolbarContext);

  const [updateMediaObject, setMediaObjectUpdata] = useState<number>(0);
  const updateMediaObjectDOM = () => {
    //強制再レンダリング関数
    setMediaObjectUpdata(updateMediaObject + 1);
  };
  useEffect(() => {
    console.log("updateMediaObject 再レンダリング");
  }, [updateMediaObject]);


  const operationStaStylePos = (staStylePos:number) => {
    AppContextValue.operationMediaObjectTime({
      mediaObjectID: MediaObject_ID,
      sta: staStylePos
    });
    updateMediaObjectDOM();
  }
  const operationEndStylePos = (endStylePos:number) => {
    AppContextValue.operationMediaObjectTime({
      mediaObjectID: MediaObject_ID,
      end: endStylePos
    });
    updateMediaObjectDOM();
  }
  // useEffect(() => {
  //   AppContextValue.operationMediaObjectTime({
  //     mediaObjectID: MediaObject_ID,
  //     sta: staStylePos,
  //     end: endStylePos,
  //   });
  // }, [staStylePos, endStylePos]);

  return (
    <>
      <div className="media_object-area" ref={mediaObjectAreaElement}>
        <MediaObjectContext.Provider
          value={{
            mediaObjectAreaElement: mediaObjectAreaElement,
            animatorOpen: animatorOpen,
            animatorOpenSetState: animatorOpenSetState,
            operationStaStylePos: operationStaStylePos,
            operationEndStylePos: operationEndStylePos,
            mediaObjectUUID: MediaObject_ID 
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
