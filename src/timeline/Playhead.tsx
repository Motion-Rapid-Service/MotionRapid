import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;

import { AppContext } from "../AppContext";
import { SetupEditorContext } from "../SetupEditor/SetupEditorContext";
const PlayHeadComponent = () => {
  const SetupEditorContextValue = useContext(SetupEditorContext);
  const playHeadTime = SetupEditorContextValue.playHeadTime;
  const playHeadTimeSetState = SetupEditorContextValue.playHeadTimeSetState;

  useEffect(() => {}, [playHeadTime]);

  return <div className="playhead"></div>;
};
