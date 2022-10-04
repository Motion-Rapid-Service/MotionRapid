import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TimelineComponent from "./../timeline/timeline";
import ToolBarComponent from "./../ToolBar/ToolBar";
import ToolConfigComponent from "./../ToolConfig/ToolConfig";
import CompositeEditorComponent from "./../CompositeChoice/CompositeChoice";
import PreviewComponent from "./../Preview/Preview";

import { SetupConfigContext } from "./SetupConfigContext";
//ここを画面結合専用層にする予定
//ここから ツールバー処理用のクラス

type TypeLayoutState = {
  layoutSize: number;
  expandFlag: boolean; //展開しているとtrue
};

const SetupCompletion = () => {
  const SetupConfigContextValue = useContext(SetupConfigContext);

  const configMode = SetupConfigContextValue.configMode;
  const configModeList = SetupConfigContextValue.configModeList;

  const configSwitchGUI = SetupConfigContextValue.configSwitchGUI;
  const configSwitchGUIList = SetupConfigContextValue.configSwitchGUIList;

  const [configStyle, configStyleSetState] = useState<React.CSSProperties>({});

  useEffect(() => {
    //configSwitchGUIによる、ほかのdiv要素内への影響について設定をする
    if (configMode === configSwitchGUIList[0]) {
      const styleTemp: React.CSSProperties = {};
      configStyleSetState(styleTemp);
    } else if (configSwitchGUI === configSwitchGUIList[1]) {
      const styleTemp: React.CSSProperties = {
        position: "fixed",
      };
      configStyleSetState(styleTemp);
    }
  }, [configMode]);

  const setLayoutState = (state: TypeLayoutState, action: any): TypeLayoutState => {
    console.log("setLayoutState");
    if (action.type === "move") {
      return { layoutSize: action.layoutSize, expandFlag: true };
    }
    if (action.type === "collapse") {
      return { layoutSize: state.layoutSize, expandFlag: false };
    }
    if (action.type === "expand") {
      return { layoutSize: state.layoutSize, expandFlag: true };
    }
    if (action.type === "toggle") {
      return { layoutSize: state.layoutSize, expandFlag: !state.expandFlag };
    }
  };

  const [compositeEditorLayoutState, compositeEditorLayoutSetState] = useReducer(setLayoutState, { layoutSize: 30, expandFlag: false });
  const [timelineLayoutState, timelineLayoutSetState] = useReducer(setLayoutState, { layoutSize: 60, expandFlag: false });

  const getCompositeEditorLayoutSize = () => {
    if (!compositeEditorLayoutState.expandFlag) {
      return 0;
    }
    return compositeEditorLayoutState.layoutSize + "vw";
  };
  const getTimelineLayoutState = () => {
    if (!timelineLayoutState.expandFlag) {
      return 0;
    }
    return timelineLayoutState.layoutSize + "vh";
  };

  const compositeEditorLayoutExpand = () => {
    compositeEditorLayoutSetState({ type: "toggle" });
  };

  const timelineLayoutExpandClick = () => {
    timelineLayoutSetState({ type: "toggle" });
  };
  return (
    <>
      <div style={configStyle}>
        <div className="motion_rapid-layout">
          <div className="toolBar-layout">
            <div className="toolBar-layout-expand"></div>

            <ToolBarComponent />
          </div>
          <div className="editor-layout">
            <div className="composite_editor-layout">
              <div style={{ width: getCompositeEditorLayoutSize() }}>
                <CompositeEditorComponent />
              </div>
              <div className="composite_editor-layout-expand" onClick={compositeEditorLayoutExpand}></div>
            </div>
            <div className="preview-layout">
              <div className="preview-layout-expand"></div>
              <PreviewComponent />
            </div>
            <div className="timeline-layout">
              <div className="timeline-layout-expand" onClick={timelineLayoutExpandClick}></div>

              <div style={{ height: getTimelineLayoutState() }}>
                <TimelineComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ToolConfigComponent />
      </div>
    </>
  );
};
export default SetupCompletion;
