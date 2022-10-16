import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "../AppContext";
import { SetupEditorContext } from "./SetupEditorContext";
import { SetupPracticeContext, typePracticeStory } from "./SetupPracticeContext";
import SetupUndo from "./SetupUndo";
const SetupPractice = () => {
  const practiceModeList = ["notExist"];
  const [practiceMode, practiceModeSetState] = useState<string>(practiceModeList[0]);
  const practiceModeHistory: { [name: string]: Array<typePracticeStory> } = {};

  return (
    <SetupPracticeContext.Provider
      value={{
        practiceMode: practiceMode,
        practiceModeSetState: practiceModeSetState,
        practiceModeList: practiceModeList,
        practiceModeHistory: practiceModeHistory[practiceMode],
      }}
    >
      <SetupUndo />
    </SetupPracticeContext.Provider>
  );
};

export default SetupPractice;
