import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "../AppContext";
import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
import { SetupToolbarContext } from "./../SetupEditor/SetupToolbarContext";


const PreviewComponent = () => {
    const AppContextValue = useContext(AppContext)
    const SetupEditorContextValue = useContext(SetupEditorContext)
    useEffect(() => {
        AppContextValue.buildMiddleDataHtml(SetupEditorContextValue.choiceComposite);
      return () => {
      }
    }, [SetupEditorContextValue.previewUpdate])
    

    return(<div className="preview-main">
        
    </div>)
}

export default PreviewComponent;