import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState, useRef } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TimelineComponent from "./../timeline/timeline";
import ToolBarComponent from "./../ToolBar/ToolBar";
import ToolConfigComponent from "./../ToolConfig/ToolConfig";
import ToolHelpScreen from "./../ToolHelpScreen/ToolHelpScreen";
import Practice from "./../Practice/Practice";
import CompositeEditorComponent from "./../CompositeChoice/CompositeChoice";
import PreviewComponent from "./../Preview/Preview";

import { SetupConfigContext } from "./SetupConfigContext";

import { SetupHelpSceneContext } from "./SetupHelpSceneContext";
import { SetupPracticeContext, TypePracticeHistory, layoutGlowClass } from "./SetupPracticeContext";
//ここを画面結合専用層にする予定
//ここから ツールバー処理用のクラス

type TypeLayoutState = {
  layoutSize: number;
  expandFlag: boolean; //展開しているとtrue
  mouseMoveLayout: TypeMouseMoveLayout;
};

type TypeMouseMoveLayout = {
  mouseFlag: boolean;
  mousePushPos: number;
  mousePushLayoutStyle: number;
};

const SetupCompletion = () => {
  const SetupConfigContextValue = useContext(SetupConfigContext);
  const SetupHelpSceneContextValue = useContext(SetupHelpSceneContext);

  const configMode = SetupConfigContextValue.configMode;
  const configModeList = SetupConfigContextValue.configModeList;

  const configSwitchGUI = SetupConfigContextValue.configSwitchGUI;
  const configSwitchGUIList = SetupConfigContextValue.configSwitchGUIList;

  const helpSwitchGUI = SetupHelpSceneContextValue.helpSwitchGUI;
  const helpSwitchGUIList = SetupHelpSceneContextValue.helpSwitchGUIList;

  const [configStyle, configStyleSetState] = useState<React.CSSProperties>({});

  const editorLayoutElement = useRef(null);

  const SetupPracticeContextValue = useContext(SetupPracticeContext);

  const getMousePostion = (
    //タイムラインに対してのマウスを取得
    event: any
  ) => {
    const clientX = event.clientX;
    const clientY = event.clientY;
    const elementBoundingClientRect = editorLayoutElement.current.getBoundingClientRect();
    const elementLeft = elementBoundingClientRect.left;
    const elementTop = elementBoundingClientRect.top;

    //console.log("timelineMousePostion",timelineElementLeft,timelineElementTop)
    const x = clientX - elementLeft;
    const y = clientY - elementTop;
    return [x, y];
  };

  useEffect(() => {
    //configSwitchGUIによる、ほかのdiv要素内への影響について設定をする
    if (configMode === configSwitchGUIList[0] || helpSwitchGUI === helpSwitchGUIList[0]) {
      const styleTemp: React.CSSProperties = {};
      configStyleSetState(styleTemp);
    } else if (configSwitchGUI === configSwitchGUIList[1] || helpSwitchGUI === helpSwitchGUIList[1]) {
      const styleTemp: React.CSSProperties = {
        position: "fixed",
      };
      configStyleSetState(styleTemp);
    }
  }, [configMode]);

  const setLayoutState = (state: TypeLayoutState, action: any): TypeLayoutState => {
    console.log("setLayoutState");
    if (action.type === "move") {
      return { layoutSize: action.layoutSize, expandFlag: true, mouseMoveLayout: state.mouseMoveLayout };
    }
    if (action.type === "collapse") {
      return { layoutSize: state.layoutSize, expandFlag: true, mouseMoveLayout: state.mouseMoveLayout };
    }
    if (action.type === "expand") {
      return { layoutSize: state.layoutSize, expandFlag: true, mouseMoveLayout: state.mouseMoveLayout };
    }
    if (action.type === "toggle") {
      return { layoutSize: state.layoutSize, expandFlag: !state.expandFlag, mouseMoveLayout: state.mouseMoveLayout };
    }

    if (action.type === "mouseDown") {
      const newMouseMoveLayout = state.mouseMoveLayout;
      newMouseMoveLayout.mouseFlag = true;

      newMouseMoveLayout.mousePushPos = action.nowMousePos;

      if (state.expandFlag) {
        newMouseMoveLayout.mousePushLayoutStyle = state.layoutSize;
      } else {
        newMouseMoveLayout.mousePushLayoutStyle = 0;
        return { layoutSize: 0, expandFlag: true, mouseMoveLayout: newMouseMoveLayout };
      }

      console.log("MouseMoveLayout A", newMouseMoveLayout, action.nowMousePos);
      return { layoutSize: state.layoutSize, expandFlag: true, mouseMoveLayout: newMouseMoveLayout };
    }

    if (action.type === "mouseMove") {
      if (!state.mouseMoveLayout.mouseFlag) {
        return { layoutSize: state.layoutSize, expandFlag: state.expandFlag, mouseMoveLayout: state.mouseMoveLayout };
      }

      const move = action.nowMousePos - state.mouseMoveLayout.mousePushPos;
      const layoutSizeMove = Math.max(state.mouseMoveLayout.mousePushLayoutStyle + move, 0);
      console.log("MouseMoveLayout B", layoutSizeMove, state.mouseMoveLayout.mousePushLayoutStyle, move);

      return { layoutSize: layoutSizeMove, expandFlag: state.expandFlag, mouseMoveLayout: state.mouseMoveLayout };
    }

    if (action.type === "mouseUp") {
      const newMouseMoveLayout = state.mouseMoveLayout;
      newMouseMoveLayout.mouseFlag = false;
      newMouseMoveLayout.mousePushLayoutStyle = null;
      newMouseMoveLayout.mousePushPos = null;
      return { layoutSize: state.layoutSize, expandFlag: state.expandFlag, mouseMoveLayout: newMouseMoveLayout };
    }
  };

  const [compositeEditorLayoutState, compositeEditorLayoutSetState] = useReducer(setLayoutState, {
    layoutSize: 30,
    expandFlag: true,
    mouseMoveLayout: { mouseFlag: false, mousePushPos: null, mousePushLayoutStyle: null },
  });
  const [timelineLayoutState, timelineLayoutSetState] = useReducer(setLayoutState, {
    layoutSize: 60,
    expandFlag: true,
    mouseMoveLayout: { mouseFlag: false, mousePushPos: null, mousePushLayoutStyle: null },
  });

  const getCompositeEditorLayoutSize = () => {
    if (!compositeEditorLayoutState.expandFlag) {
      return 0;
    }

    return compositeEditorLayoutState.layoutSize + "px";
  };
  const getTimelineLayoutState = () => {
    if (!timelineLayoutState.expandFlag) {
      return "40px";
    }

    return Math.max(timelineLayoutState.layoutSize, 40) + "px";
  };

  const mouseDoubleClickCompositeEditor = (event: any) => {
    compositeEditorLayoutSetState({ type: "toggle" });
  };

  const mouseDoubleClickTimelineEditor = (event: any) => {
    timelineLayoutSetState({ type: "toggle" });
  };
  const mouseDownCompositeEditor = (event: any) => {
    compositeEditorLayoutSetState({ type: "mouseDown", nowMousePos: getMousePostion(event)[0] });
  };
  const mouseMoveCompositeEditor = (event: any) => {
    compositeEditorLayoutSetState({ type: "mouseMove", nowMousePos: getMousePostion(event)[0] });
  };
  const mouseUpCompositeEditor = (event: any) => {
    compositeEditorLayoutSetState({ type: "mouseUp", nowMousePos: getMousePostion(event)[0] });
  };

  const timelimeSizeY = (event: any) => {
    const elementBoundingClientRect = editorLayoutElement.current.getBoundingClientRect();
    const elementLeft = elementBoundingClientRect.left;
    const elementTop = elementBoundingClientRect.top;

    const size = elementTop - getMousePostion(event)[1];
    return size;
  };

  const mouseDownTimelineEditor = (event: any) => {
    timelineLayoutSetState({ type: "mouseDown", nowMousePos: timelimeSizeY(event) });
  };
  const mouseMoveTimelineEditor = (event: any) => {
    timelineLayoutSetState({ type: "mouseMove", nowMousePos: timelimeSizeY(event) });
  };
  const mouseUpTimelineEditor = (event: any) => {
    timelineLayoutSetState({ type: "mouseUp", nowMousePos: timelimeSizeY(event) });
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseMoveCompositeEditor);
    window.addEventListener("mouseup", mouseUpCompositeEditor);

    window.addEventListener("mousemove", mouseMoveTimelineEditor);
    window.addEventListener("mouseup", mouseUpTimelineEditor);

    return () => {
      window.removeEventListener("mousemove", mouseMoveCompositeEditor);
      window.removeEventListener("mouseup", mouseUpCompositeEditor);

      window.removeEventListener("mousemove", mouseMoveTimelineEditor);
      window.removeEventListener("mouseup", mouseUpTimelineEditor);
    };
  }, []);

  return (
    <>
      <div style={configStyle}>
        <div className="motion_rapid-layout">
          <div className="toolBar-layout">
            {SetupPracticeContextValue.LayerGlow(SetupPracticeContextValue.getLayoutGlow().layoutToulBar)}
            <div className="toolBar-layout-expand"></div>

            <ToolBarComponent />
          </div>
          <div className="editor-layout" ref={editorLayoutElement}>
            <div className="composite_editor-layout">
              {SetupPracticeContextValue.LayerGlow(SetupPracticeContextValue.getLayoutGlow().layoutComposite)}
              <div style={{ width: getCompositeEditorLayoutSize() }}>
                <CompositeEditorComponent />
              </div>
              <div className="composite_editor-layout-expand" onMouseDown={mouseDownCompositeEditor} onDoubleClick={mouseDoubleClickCompositeEditor}></div>
            </div>
            <div className="preview-layout">
              {SetupPracticeContextValue.LayerGlow(SetupPracticeContextValue.getLayoutGlow().layoutPreview)}
              <div className="preview-layout-expand"></div>
              <PreviewComponent />
            </div>
            <div className="timeline-layout">
              {SetupPracticeContextValue.LayerGlow(SetupPracticeContextValue.getLayoutGlow().layoutTimelime)}
              <div className="timeline-layout-expand" onMouseDown={mouseDownTimelineEditor} onDoubleClick={mouseDoubleClickTimelineEditor}></div>

              <div style={{ height: getTimelineLayoutState() }}>
                <TimelineComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ToolConfigComponent />
        <Practice />
        {/* <ToolHelpScreen /> */}
      </div>
    </>
  );
};
export default SetupCompletion;
