import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "./../AppContext";
import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
import { SetupToolbarContext } from "./../SetupEditor/SetupToolbarContext";
import { SetupHelpSceneContext } from "./../SetupEditor/SetupHelpSceneContext";

// const ComponentOptionConvertConfigMode

const ToolHelpScreenArea = (props: any) => {
  return <div className="tool_help-area-view"></div>;
};

const ToolHelpScreen = () => {
  const SetupHelpSceneContextValue = useContext(SetupHelpSceneContext);

  return (
    <div className="tool_help-large-background">
      <div className="tool_help-large">
        <div className="tool_help-area-title">
          <div className="text">
            <p>config mode {SetupHelpSceneContextValue.helpSwitchGUI}</p>
          </div>
        </div>

        <ToolHelpScreenArea cssAreaViewHeight="70vh" />
      </div>
    </div>
  );
};

export default ToolHelpScreen;
