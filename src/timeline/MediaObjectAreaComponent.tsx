import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;

import * as InMediaObjectArea from "./InMediaObjectArea";

import UUID from "uuidjs";

import { AppContext } from "../AppContext";
import { MediaObjectContext ,TimelineAreaDivContext} from "./timelineContext";
import * as InMediaObjectLayerPanel from "./InMediaObjectLayerPanel";
import * as MediaObjectAreaSpaceComponent from "./MediaObjectSpace";
// {componentGenerateMediaObjectAreaSpace(index)}

export const MediaObjectAreaComponent = (props: any) => {
  const mediaObjectAreaElement = useRef<HTMLDivElement>(null);

  const MediaObject_ID =
    props.DownstreamMiddleDataMediaObject["MediaObject_ID"];

  const AppContextValue = useContext(AppContext);
  const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);
  
  const [animatorOpen, animatorOpenSetState] = useState<boolean>(
    AppContextValue.getMediaObejctAnimatorOpen(MediaObject_ID)
  );
  const [staStylePos, StaSetState] = useState<number>(null);
  const [endStylePos, EndSetState] = useState<number>(null);


  useEffect(() => {
    // const ElementBoundingClientRect =
    // mediaObjectAreaElement.current.getBoundingClientRect();
    // const ElementLeft = ElementBoundingClientRect.left;
    // const ElementTop = ElementBoundingClientRect.top;

  }, []);

  useEffect(() => {
    if (!staStylePos || !endStylePos) {
      return;
    }

    AppContextValue.operationMediaObjectTime({
      mediaObjectID: MediaObject_ID,
      sta: staStylePos,
      end: endStylePos,
    });
  }, [staStylePos, endStylePos]);

  useEffect(() => {
    AppContextValue.rewriteMediaObejctAnimatorOpen(MediaObject_ID,animatorOpen)
    console.log("set animatorOpen",animatorOpen,MediaObject_ID)

    TimelineAreaDivContextValue.animationOpenUpdateDOM()
  }, [animatorOpen]);
  useEffect(() => {
    const openTemp = AppContextValue.getMediaObejctAnimatorOpen(MediaObject_ID)
    console.log("get animatorOpen MediaObject_ID",animatorOpen,MediaObject_ID)
    animatorOpenSetState(openTemp)
  }, [MediaObject_ID]);


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
            mediaObjectUUID: MediaObject_ID,
            mediaObejctIndex: props.indexMediaObejct,
          }}
        >
          {/* <div className="media_object-area-left"></div> */}
          {/* <div className="media_object-area-right"></div>*/}

          <InMediaObjectLayerPanel.TimelineAreaLayerPanelComponent />
          <InMediaObjectArea.TimelineAreaLayerDurationComponent />
        </MediaObjectContext.Provider>
      </div>

      <MediaObjectAreaSpaceComponent.switchMediaObjectAreaSpace
        spaceIndex={props.indexMediaObejct + 1}
      />
    </>
  );
};

// export default MediaObjectAreaComponent;
