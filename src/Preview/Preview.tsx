import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } =
  React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "./../AppContext";
import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
import { SetupToolbarContext } from "./../SetupEditor/SetupToolbarContext";


const PreviewComponent = () => {

    const previewReplaceElement = useRef(null)
    const AppContextValue = useContext(AppContext)
    const SetupEditorContextValue = useContext(SetupEditorContext)
    useEffect(() => {
        const htmlStr = AppContextValue.previewMiddleDataHtml(SetupEditorContextValue.choiceComposite);
        console.log("htmlStr",htmlStr)
        const iframe = document.createElement("iframe");
        iframe.srcdoc = htmlStr;
        previewReplaceElement.current.replaceWith(iframe);

      return () => {
      }
    }, [SetupEditorContextValue.previewUpdate])
    

    return(<div className="preview-main">
        <div className="preview-replace" ref={previewReplaceElement}></div>
    </div>)
}

export default PreviewComponent;