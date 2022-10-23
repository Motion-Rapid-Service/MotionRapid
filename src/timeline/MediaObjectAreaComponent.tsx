import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } = React;

import * as InMediaObjectArea from "./InMediaObjectArea";

import UUID from "uuidjs";

import { AppContext } from "../AppContext";
import { MediaObjectContext, TimelineAreaDivContext } from "./timelineContext";
import * as InMediaObjectLayerPanel from "./InMediaObjectLayerPanel";
import * as MediaObjectAreaSpaceComponent from "./MediaObjectSpace";
// {componentGenerateMediaObjectAreaSpace(index)}
import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
import { SetupUndoContext } from "./../SetupEditor/SetupUndoContext";

import { TimeNavigatorContext } from "./TimeNavigator/TimeNavigatorContext";
import * as timelimeRender from "./timelimeRender";
export const MediaObjectAreaComponent = (props: any) => {
  const mediaObjectAreaElement = useRef<HTMLDivElement>(null);

  const MediaObject_ID = props.DownstreamMiddleDataMediaObject["MediaObject_ID"];

  const AppContextValue = useContext(AppContext);

  const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);

  const TimeNavigatorContextValue = useContext(TimeNavigatorContext);
  const SetupEditorContextValue = useContext(SetupEditorContext);

  // const [animatorOpen, animatorOpenSetState] = useState<boolean>(AppContextValue.getMediaObejctAnimatorOpen(MediaObject_ID));
  // const [staStylePos, StaSetState] = useState<number>(null);
  // const [endStylePos, EndSetState] = useState<number>(null);

  const setMediaObjectRender = (
    state: timelimeRender.TypeMediaObjectRender,
    action:
      | timelimeRender.TypeMediaObjectRenderActionStyle
      | timelimeRender.TypeMediaObjectRenderActionAnimatorOpen
      | timelimeRender.TypeMediaObjectRenderActionUpdate
  ): timelimeRender.TypeMediaObjectRender => {
    const compositeDuration: number = AppContextValue.getCompositeDuration(SetupEditorContextValue.choiceComposite);
    console.log("setMediaObjectRender action.type", action);
    switch (action.type) {
      case "update":
        {
          const mediaObjectTime = AppContextValue.getMediaObjectTime(MediaObject_ID);
          const styleStaStyle = AppContextValue.conversionTimeToStyle(
            mediaObjectTime[0],
            TimeNavigatorContextValue.timelimeRender.staViewTime,
            TimeNavigatorContextValue.timelimeRender.endViewTime,
            TimeNavigatorContextValue.timelimeRender.durationWidth
          );
          const styleEndStyle = AppContextValue.conversionTimeToStyle(
            mediaObjectTime[1],
            TimeNavigatorContextValue.timelimeRender.staViewTime,
            TimeNavigatorContextValue.timelimeRender.endViewTime,
            TimeNavigatorContextValue.timelimeRender.durationWidth
          );
          if (!isFinite(styleStaStyle) || !isFinite(styleEndStyle)) {
            break;
          }
          return {
            staStylePos: styleStaStyle,
            endStylePos: styleEndStyle,
            animatorOpen: state.animatorOpen,
          };
        }
        break;
      case "mediaObjectStyle":
        {
          const thenAction = action as timelimeRender.TypeMediaObjectRenderActionStyle;
          if (!compositeDuration) {
            break;
          }
          const staStylePos = thenAction.staStylePos != null && isFinite(thenAction.staStylePos) ? thenAction.staStylePos : state.staStylePos;
          const endStylePos = thenAction.endStylePos != null && isFinite(thenAction.endStylePos) ? thenAction.endStylePos : state.endStylePos;

          const staTime: number = AppContextValue.conversionStyleToTime(
            staStylePos,
            TimeNavigatorContextValue.timelimeRender.staViewTime,
            TimeNavigatorContextValue.timelimeRender.endViewTime,
            TimeNavigatorContextValue.timelimeRender.durationWidth
          );
          const endTime: number = AppContextValue.conversionStyleToTime(
            endStylePos,
            TimeNavigatorContextValue.timelimeRender.staViewTime,
            TimeNavigatorContextValue.timelimeRender.endViewTime,
            TimeNavigatorContextValue.timelimeRender.durationWidth
          );

          if (isFinite(staStylePos) && isFinite(endStylePos)) {
            AppContextValue.operationMediaObjectTime({
              mediaObjectID: MediaObject_ID,
              sta: staTime,
              end: endTime,
            });
          }

          return {
            staStylePos: staStylePos,
            endStylePos: endStylePos,
            animatorOpen: state.animatorOpen,
          };
        }
        break;

      case "animatorOpen":
        {
          const thenAction = action as timelimeRender.TypeMediaObjectRenderActionAnimatorOpen;
          AppContextValue.rewriteMediaObejctAnimatorOpen(MediaObject_ID, thenAction.animatorOpen);
          return { staStylePos: state.staStylePos, endStylePos: state.endStylePos, animatorOpen: thenAction.animatorOpen };
        }
        break;

      default:
        break;
    }

    return {
      staStylePos: state.staStylePos,
      endStylePos: state.endStylePos,
      animatorOpen: state.animatorOpen,
    };
  };

  const [mediaObjectRender, mediaObjectRenderSetState] = useReducer(setMediaObjectRender, { staStylePos: null, endStylePos: null, animatorOpen: true });

  useEffect(() => {
    mediaObjectRenderSetState({ type: "update" });
    SetupEditorContextValue.previewUpdateDOM();
  }, [TimeNavigatorContextValue.timelimeRender]);

  // useEffect(() => {
  // if (!mediaObjectRender.staStylePos || !mediaObjectRender.endStylePos || TimeNavigatorContextValue.timelimeRender.timeNavigatorFlag) {
  //   return;
  // }
  // const compositeDuration: number = AppContextValue.getCompositeDuration(SetupEditorContextValue.choiceComposite);
  // if (!compositeDuration) {
  //   return;
  // }
  // const staTime: number = AppContextValue.conversionStyleToTime(
  //   mediaObjectRender.staStylePos,
  //   TimeNavigatorContextValue.timelimeRender.staViewTime,
  //   TimeNavigatorContextValue.timelimeRender.endViewTime,
  //   TimeNavigatorContextValue.timelimeRender.durationWidth
  // );
  // const endTime: number = AppContextValue.conversionStyleToTime(
  //   mediaObjectRender.endStylePos,
  //   TimeNavigatorContextValue.timelimeRender.staViewTime,
  //   TimeNavigatorContextValue.timelimeRender.endViewTime,
  //   TimeNavigatorContextValue.timelimeRender.durationWidth
  // );
  // }, [mediaObjectRender]);

  // useEffect(() => {
  //   AppContextValue.rewriteMediaObejctAnimatorOpen(MediaObject_ID, animatorOpen);
  //   TimelineAreaDivContextValue.animationOpenUpdateDOM();
  // }, [animatorOpen]);
  // useEffect(() => {
  //   const openTemp = AppContextValue.getMediaObejctAnimatorOpen(MediaObject_ID);
  //   animatorOpenSetState(openTemp);
  // }, [MediaObject_ID]);

  return (
    <>
      <div className="media_object-area" ref={mediaObjectAreaElement}>
        <MediaObjectContext.Provider
          value={{
            mediaObjectAreaElement: mediaObjectAreaElement,
            mediaObjectRender: mediaObjectRender,
            mediaObjectRenderSetState: mediaObjectRenderSetState,
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

      <MediaObjectAreaSpaceComponent.SwitchMediaObjectAreaSpace spaceIndex={props.indexMediaObejct + 1} />
    </>
  );
};

// export default MediaObjectAreaComponent;
