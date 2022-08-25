import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } = React;

import { AppContext } from "../../AppContext";
import { SetupEditorContext } from "../../SetupEditor/SetupEditorContext";
const ScrollBarComponent = () => {
  const SetupEditorContextValue = useContext(SetupEditorContext);

  return <div className="timeNavigator-scrollbar"></div>;
};
export default ScrollBarComponent;
