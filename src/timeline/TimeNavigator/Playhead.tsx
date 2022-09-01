import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } = React;

import { AppContext } from "../../AppContext";

import { TimeNavigatorContext, TimeNavigatorLayerDurationContext, TimeNavigatorTimelineLayerDurationContext } from "./TimeNavigatorContext";
import { SetupEditorContext } from "./../../SetupEditor/SetupEditorContext";
import * as timelineMousePosition from "./../timeLineMousePosition";
import * as UserHand from "./../../UserHand";
export const TimeNavigatorPlayheadComponent = () => {
  const TimeNavigatorContextValue = useContext(TimeNavigatorContext);
  const TimeNavigatorLayerDurationContextValue = useContext(TimeNavigatorLayerDurationContext);
  const playheadTime = TimeNavigatorContextValue.playheadTime;
  const timeNavigatorPlayheadAreaElement = useRef(null);
  const AppContextValue = useContext(AppContext);
  const SetupEditorContextValue = useContext(SetupEditorContext);
  const MouseDown = (event: any) => {
    const mousePushPos = timelineMousePosition.timelineMousePostion(event, TimeNavigatorLayerDurationContextValue.TimeNavigatorLayerDurationElement)[0];
    UserHand.insertUserHandPlayhead(mousePushPos, playheadTime);
    TimeNavigatorContextValue.playheadTimeSetState(mousePushPos);
  };
  const MouseMove = (event: any) => {
    const userHandPlayhead = UserHand.getUserHandPlayhead();

    if (userHandPlayhead.mouseDownFlag === 1) {
      const mouseX = timelineMousePosition.timelineMousePostion(event, TimeNavigatorLayerDurationContextValue.TimeNavigatorLayerDurationElement)[0];
      TimeNavigatorContextValue.playheadTimeSetState(mouseX);
    }
  };
  const MouseRelease = () => {
    UserHand.deleteUserHandPlayhead();
  };

  useEffect(() => {
    timeNavigatorPlayheadAreaElement.current.addEventListener("mousedown", MouseDown);
    window.addEventListener("mousemove", MouseMove);
    window.addEventListener("mouseup", MouseRelease);

    return () => {
      //removeEventListener
      timeNavigatorPlayheadAreaElement.current.removeEventListener("mousedown", MouseDown);
      window.removeEventListener("mousemove", MouseMove);
      window.removeEventListener("mouseup", MouseRelease);
    };
  }, []);

  return (
    <div className="timeNavigator-playhead-area" ref={timeNavigatorPlayheadAreaElement}>
      <div className="timeNavigator-playhead" style={{ left: playheadTime - 15 }}>
        <p>{Math.round(AppContextValue.getCompositePlayheadTimePos(SetupEditorContextValue.choiceComposite))}</p>
      </div>
    </div>
  );
};

export const TimelinePlayheadComponent = () => {
  const TimeNavigatorTimelineLayerDurationContextValue = useContext(TimeNavigatorTimelineLayerDurationContext);
  const TimeNavigatorContextValue = useContext(TimeNavigatorContext);
  const playheadTime = TimeNavigatorContextValue.playheadTime;
  return <div className="timeline-playhead" style={{ left: playheadTime }}></div>;
};
