import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "../AppContext";
import { SetupEditorContext } from "./SetupEditorContext";
import { SetupHelpSceneContext } from "./SetupHelpSceneContext";
import SetupUndo from "./SetupUndo";
const SetupHelpScene = () => {
  return (
    <SetupHelpSceneContext.Provider value={{}}>
      <SetupUndo />
    </SetupHelpSceneContext.Provider>
  );
};

export default SetupHelpScene;
