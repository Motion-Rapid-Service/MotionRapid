import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "./../AppContext";
import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
import { SetupToolbarContext } from "./../SetupEditor/SetupToolbarContext";

class PreviewOverlay {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(send_x: number, send_y: number, send_width: number, send_height: number) {
    this.x = send_x;
    this.y = send_y;
    this.width = send_width;
    this.height = send_height;
  }
}

const searchMaxSizeElement = (targetElement: Element) => {
  let thenWidth = targetElement.scrollWidth;
  let thenHeight = targetElement.scrollHeight;

  const childrenElement: HTMLCollection = targetElement.children;

  for (let ce = 0; ce < childrenElement.length; ce++) {
    const childElement: Element = childrenElement[ce]; //これでcomposite要素直下を取得できる
    const childMaxWidthHeight = searchMaxSizeElement(childElement);

    thenWidth = Math.max(thenWidth, childMaxWidthHeight[0]);
    thenHeight = Math.max(thenHeight, childMaxWidthHeight[1]);
  }

  return [thenWidth, thenHeight];
};

const PreviewComponent = () => {
  const previewOverlayUpdateElement = useRef(null);
  const previewIframeElement = useRef(null);
  const previeOverlayElement = useRef(null);
  const AppContextValue = useContext(AppContext);
  const SetupEditorContextValue = useContext(SetupEditorContext);
  useEffect(() => {
    const htmlStr = AppContextValue.previewMiddleDataHtml(SetupEditorContextValue.choiceComposite);
    console.log(previewIframeElement);
    previewIframeElement.current.srcdoc = htmlStr;
    console.log("htmlStr", htmlStr);

    // const iframe = document.createElement("iframe");
    // iframe.srcdoc = htmlStr;
    // iframe.className = "preview-replace-iframe";
    // previewReplaceElement.current.replaceChild(iframe, previewReplaceElement.current.firstElementChild);
    return () => {};
  }, [SetupEditorContextValue.previewUpdate]);

  // const [previewUpdate, previewSetUpdata] = useState<boolean>(false);

  const setPreviewOverlay = (): Array<PreviewOverlay> => {
    console.log("setPreviewOverlay");
    if (!previewIframeElement.current) {
      return [];
    }
    const iframeDocument = previewIframeElement.current.contentDocument || previewIframeElement.current.contentWindow.document;

    const rootElement = iframeDocument.getElementById("root");
    if (!rootElement) {
      return [];
    }
    const returnArray: Array<PreviewOverlay> = [];

    const compositeElements: HTMLInputElement = rootElement.firstElementChild;
    const inElements: HTMLCollection = compositeElements.children;

    for (let ce = 0; ce < inElements.length; ce++) {
      const thenElements: Element = inElements[ce]; //これでcomposite要素直下を取得できる
      console.log("thenElements", thenElements);

      const maxSize = searchMaxSizeElement(thenElements);
      console.log("searchMaxSizeElement", maxSize);

      returnArray.push(new PreviewOverlay(0, 0, maxSize[0], maxSize[1]));
    }
    return returnArray;
  };

  const [previewOverlay, previewOverlayUpdate] = useReducer(setPreviewOverlay, []);

  useEffect(() => {
    console.log(previewOverlay);
  }, [previewOverlay]);

  return (
    <div className="preview-main">
      <div className="preview-overlay-update" ref={previewOverlayUpdateElement}>
        <iframe className="preview-replace" ref={previewIframeElement}>
          <p>html p</p>
        </iframe>
        <div className="preview-overlay" ref={previeOverlayElement} onMouseDown={previewOverlayUpdate}></div>
      </div>
    </div>
  );
};

export default PreviewComponent;
