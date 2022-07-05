import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { TimelineAreaDivContext } from "./timelineContext";
import MediaObjectAreaComponent from "./mediaObjectAreaComponent";
import { AppContext } from "./../AppContext";
import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
import { SetupToolbarContext } from "./../SetupEditor/SetupToolbarContext";

const TimelineComponent = () => {
  // ここでhooksを使える
  const timelineAreaElement = useRef(null);
  const timelineScrollElement = useRef(null);

  const AppContextValue = useContext(AppContext);
  const SetupEditorContextValue = useContext(SetupEditorContext);
  const SetupToolbarContextValue = useContext(SetupToolbarContext);

  console.log()

  useEffect(() => {
    AppContextValue.updateDOM();
  }, []);

  return (
    <>
      <p>選択中のコンポジット：{SetupToolbarContextValue.choiceComposite}</p>

      <div
        className="timeline-area"
        draggable="false"
        ref={timelineAreaElement}
      >
        <div
          className="timeline-area-scroll"
          ref={timelineScrollElement}
          draggable="false"

          // onScroll={TimeLineAreaMove}
        >
          <TimelineAreaDivContext.Provider
            value={
              {
                // middleDataOperation: middleDataOperation,
                // MouseSelectedSetValue: MouseSelectedSetValue,
                // MouseUnselectedSetValue: MouseUnselectedSetValue,
              }
            }
          >
            <>
              {AppContextValue.componentConvertMediaObjectArea(
                SetupToolbarContextValue.choiceComposite
              ).map((output: any, index: number) => (
                // <>{fruit}</> //SurfaceControlIndividualを追加するmap (list_surface_controlに入っている)
                <MediaObjectAreaComponent
                  DownstreamMiddleDataMediaObject={output}
                  key={index}
                />
              ))}
            </>
          </TimelineAreaDivContext.Provider>
        </div>
      </div>
    </>
  );
};
export default TimelineComponent;
