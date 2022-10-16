import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "../AppContext";
import { SetupEditorContext } from "./SetupEditorContext";
import { SetupHelpSceneContext } from "./SetupHelpSceneContext";
import SetupPractice from "./SetupPractice";
const SetupHelpScene = () => {
  const helpSwitchGUIList = ["notExist"];
  const [helpSwitchGUI, helpSwitchGUISetState] = useState<string>(helpSwitchGUIList[0]);
  return (
    <SetupHelpSceneContext.Provider
      value={{ helpSwitchGUI: helpSwitchGUI, helpSwitchGUISetState: helpSwitchGUISetState, helpSwitchGUIList: helpSwitchGUIList }}
    >
      <SetupPractice />
    </SetupHelpSceneContext.Provider>
  );
};

export default SetupHelpScene;

//来週以降、MotionRapidのフィールドバックでお時間いただけることってできますかね・・・？
