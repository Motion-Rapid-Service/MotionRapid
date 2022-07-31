import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext, ComponentConvertAnimatorAreaType, ComponentConvertAnimatorGroupType, ComponentConvertAnimatorType } from "../AppContext";
import { MediaObjectContext, TimelineAreaDivContext, LayerPanelContext, LayerDurationContext } from "./timelineContext";
import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";

// import { timelineMousePosition ,timelineLayerPanelPostion} from "./timeLineMousePosition";
import * as timelineMousePosition from "./timeLineMousePosition";

import * as MiddleDataOperationType from "./../MiddleData/middleDataOperationType";

class UserHandLayerPanelOperation {
  mousePushPos: number; //マウスが押された時のマウス座標
  //mouseDownKeyframeStyle: number; //マウスが押された時のメディアオブジェクト開始地点
  constructor(send_mousePushPos: number) {
    this.mousePushPos = send_mousePushPos;
  }
}
const UserHandLayerPanelList: {
  [name: string]: UserHandLayerPanelOperation;
} = {};

const SwitchTimelineAreaLayerPanelComponent = (props: any) => {
  const AppContextValue = useContext(AppContext);
  const MediaObjectContextValue = useContext(MediaObjectContext);
  const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);
  const LayerPanelContextValue = useContext(LayerPanelContext);
  const animatorOpen = MediaObjectContextValue.animatorOpen as boolean;

  useEffect(() => {
    const positon = timelineMousePosition.mediaObjectTimelinePostion(
      TimelineAreaDivContextValue.timelineScrollElement,
      LayerPanelContextValue.timelineAreaLayerPanelElement
    );

    const size = timelineMousePosition.elementSize(LayerPanelContextValue.timelineAreaLayerPanelElement);

    const yPosHeight = [positon[1], positon[1] + size[1]];

    TimelineAreaDivContextValue.mediaObejctDivHeightSetStateValue(MediaObjectContextValue.mediaObejctIndex, yPosHeight);
  }, [AppContextValue.update, MediaObjectContextValue.mediaObjectUUID, animatorOpen, TimelineAreaDivContextValue.animationOpenUpdate]);

  if (animatorOpen) {
    return (
      <div className="layer_panel-animator">
        {AppContextValue.componentConvertAnimatorArea(MediaObjectContextValue.mediaObjectUUID).map(
          (output: ComponentConvertAnimatorAreaType, index: number) => (
            // <>{fruit}</> //SurfaceControlIndividualを追加するmap (list_surface_controlに入っている)
            <SwitchLayerPanelAnimaterGroupComponent DownstreamMiddleDataAnimator={output} key={index} />
          )
        )}
      </div>
    );
  } else {
    return <></>;
  }
};

export const TimelineAreaLayerPanelComponent = (props: any) => {
  const AppContextValue = useContext(AppContext);
  const MediaObjectContextValue = useContext(MediaObjectContext);
  const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);
  const timelineAreaLayerPanelElement = useRef(null);
  const SetupEditorContextValue = useContext(SetupEditorContext);
  const animatorOpen = MediaObjectContextValue.animatorOpen as boolean;

  const mouseUp = (event: any) => {
    if (!(MediaObjectContextValue.mediaObjectUUID in UserHandLayerPanelList)) {
      return;
    }

    const thenY = timelineMousePosition.timelineMousePostion(event, TimelineAreaDivContextValue.timelineScrollElement)[1];

    const staY = Object.values(UserHandLayerPanelList)[0].mousePushPos;

    const spaceNumber = TimelineAreaDivContextValue.mediaObjectSwopInsertionDestination(staY, thenY);

    if (spaceNumber < 0) {
      return;
    }

    AppContextValue.swopMediaObject(SetupEditorContextValue.choiceComposite, MediaObjectContextValue.mediaObejctIndex, spaceNumber);

    delete UserHandLayerPanelList[MediaObjectContextValue.mediaObjectUUID];

    TimelineAreaDivContextValue.focusMediaObjectSpaceSetState(-1);
    AppContextValue.updateDOM();
  };
  const mouseMove = (event: any) => {
    if (!(MediaObjectContextValue.mediaObjectUUID in UserHandLayerPanelList)) {
      return;
    }

    const thenY = timelineMousePosition.timelineMousePostion(event, TimelineAreaDivContextValue.timelineScrollElement)[1];

    const staY = Object.values(UserHandLayerPanelList)[0].mousePushPos;

    const spaceNumber = TimelineAreaDivContextValue.mediaObjectSwopInsertionDestination(staY, thenY);

    TimelineAreaDivContextValue.focusMediaObjectSpaceSetState(spaceNumber);
  };
  const mouseDown = (event: any) => {
    const mousePushPosY = timelineMousePosition.timelineMousePostion(event, TimelineAreaDivContextValue.timelineScrollElement)[1];

    UserHandLayerPanelList[MediaObjectContextValue.mediaObjectUUID] = new UserHandLayerPanelOperation(mousePushPosY);
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
    };
  }, [MediaObjectContextValue.mediaObjectUUID, animatorOpen]);

  return (
    <div
      className="media_object-area-layer_panel"
      ref={timelineAreaLayerPanelElement}
      onMouseDown={mouseDown}
      style={{ width: TimelineAreaDivContextValue.elementLayerPanelWidth + "px" }}
    >
      <LayerPanelContext.Provider value={{ timelineAreaLayerPanelElement: timelineAreaLayerPanelElement }}>
        <LayerPanelMediaObjectComponent />
        <SwitchTimelineAreaLayerPanelComponent />
      </LayerPanelContext.Provider>
    </div>
  );
};

export const LayerPanelMediaObjectComponent = (props: any) => {
  const AppContextValue = useContext(AppContext);
  const MediaObjectContextValue = useContext(MediaObjectContext);

  // const MediaObjectContextValue = useContext(MediaObjectContext);
  return (
    <div className="layer_panel-entity">
      <p>{MediaObjectContextValue.mediaObjectUUID}</p>
    </div>
  );
};

export const SwitchLayerPanelAnimaterGroupComponent = (props: any) => {
  const entitySpecies = props.DownstreamMiddleDataAnimator["entitySpecies"];

  if (entitySpecies === "AnimatorGroup") {
    return <LayerPanelAnimaterGroupComponent DownstreamMiddleDataAnimator={props.DownstreamMiddleDataAnimator} />;
  } else if (entitySpecies === "Animator") {
    return <LayerPanelAnimaterComponent DownstreamMiddleDataAnimator={props.DownstreamMiddleDataAnimator} />;
  }
};

export const LayerPanelAnimaterGroupComponent = (props: any) => {
  // const AppContextValue = useContext(AppContext);

  const DownstreamMiddleDataAnimator: ComponentConvertAnimatorGroupType = props.DownstreamMiddleDataAnimator;
  const AnimatorGroup_ID: string = DownstreamMiddleDataAnimator.AnimatorGroup_ID;
  const AnimatorGroup_Species: string = DownstreamMiddleDataAnimator.AnimatorGroup_Species;

  return (
    <div className="layer_panel-animator_group-entity">
      <p>{AnimatorGroup_Species}</p>
    </div>
  );
};

export const LayerPanelAnimaterComponent = (props: any) => {
  const DownstreamMiddleDataAnimator: ComponentConvertAnimatorType = props.DownstreamMiddleDataAnimator;
  const Animator_ID: string = DownstreamMiddleDataAnimator.Animator_ID;
  const Animator_propertySpecies: string = DownstreamMiddleDataAnimator.Animator_propertySpecies;
  return (
    <div className="layer_panel-animator-entity">
      <AnimaterInsertKeyframeButton Animator_ID={Animator_ID} />
      <p>{Animator_propertySpecies}</p>
    </div>
  );
};

export const AnimaterInsertKeyframeButton = (props: any) => {
  const AppContextValue = useContext(AppContext);

  const mouseDown = () => {
    const Animator_ID = props.Animator_ID;
    const keyframeID: string = AppContextValue.operationCreateKeyframe();
    AppContextValue.linkKeyframe(Animator_ID, keyframeID);

    const temp: MiddleDataOperationType.OperationKeyframeTimeType = { KeyframeID: keyframeID, time: 100 };

    AppContextValue.operationKeyframeTime(temp);
    AppContextValue.updateDOM();
  };
  return <div className="layer_panel-animator-entity-insert_keyframe_button" onMouseDown={mouseDown}></div>;
};
