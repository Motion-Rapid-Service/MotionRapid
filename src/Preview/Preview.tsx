import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "./../AppContext";
import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
import { SetupToolbarContext } from "./../SetupEditor/SetupToolbarContext";
import * as middleDataClass from "./../MiddleData/middleDataClass";
import * as timelineMousePosition from "./../timeline/timeLineMousePosition";
import UUID from "uuidjs";
import * as UserHand from "./../UserHand";
import * as AnimatorGroupFormat from "./../AnimatorGroupFormat/AnimatorGroupFormat";
import * as AnimatorGroupPropertyFormat from "./../AnimatorGroupFormat/AnimatorGroupPropertyFormat";
import * as AnimatorGroupAuxiliaryFunction from "./../AnimatorGroupFormat/AnimatorGroupAuxiliaryFunction";

import { TimeNavigatorContext } from "./../timeline/TimeNavigator/TimeNavigatorContext";
import * as MiddleDataOperationType from "./../MiddleData/middleDataOperationType";

import PreviewOverlayShape from "./PreviewOverlayShape";
import PreviewOverlayNavigator from "./PreviewOverlayNavigator";
import * as PreviewContext from "./PreviewContext";

//src/timeline/TimeNavigator/TimeNavigatorTimeline.tsx

class PreviewOverlay {
  left: number;
  top: number;
  width: number;
  height: number;
  previewOverlayID: string;
  mediaObjectID: string;

  constructor(send_left: number, send_top: number, send_width: number, send_height: number, send_mediaObjectID: string) {
    this.left = send_left;
    this.top = send_top;
    this.width = send_width;
    this.height = send_height;
    this.previewOverlayID = "previewOverlay_" + String(UUID.generate());
    this.mediaObjectID = send_mediaObjectID;
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
  const TimeNavigatorContextValue = useContext(TimeNavigatorContext);

  const setPreviewNavigator = (state: PreviewContext.TypePreviewNavigator, action: any): PreviewContext.TypePreviewNavigator => {
    if (action.type === "scroll") {
      return { scrollX: action.scrollX, scrollY: action.scrollY, iframeWidth: action.iframeWidth, iframeHeight: action.iframeHeight };
    }
  };

  const [previewNavigator, previewNavigatorSetState] = useReducer(setPreviewNavigator, { scrollX: 0, scrollY: 0, iframeWidth: 0, iframeHeight: 0 });

  useEffect(() => {
    const htmlStr = AppContextValue.previewMiddleDataHtml(SetupEditorContextValue.choiceComposite);
    console.log(previewIframeElement);
    previewIframeElement.current.srcdoc = htmlStr;
    console.log("htmlStr", htmlStr);
    previewIframeElement.current.scrolling = "no";
    previewIframeElement.current.onload = function () {
      console.log("iframeDocument");
      const iframeDocument = previewIframeElement.current.contentDocument || previewIframeElement.current.contentWindow.document;
      const iframeWindow = previewIframeElement.current.contentWindow;
      const rootElement: HTMLInputElement = iframeDocument.getElementById("root");
      previewOverlayUpdate({ type: "mouseMove", thenPreviewOverlay: {}, rootElement: rootElement });

      const iframeScroll = () => {
        const scrollX = Number(iframeWindow.scrollX);
        const scrollY = Number(iframeWindow.scrollY);
        const iframeWidth = Number(iframeWindow.innerWidth);
        const iframeHeight = Number(iframeWindow.innerHeight);
        console.log("iframeDocumentScroll", scrollY, previewIframeElement.current.contentWindow.scrollY, SetupEditorContextValue.choiceComposite, iframeHeight);
        iframeWindow.scrollTo(100, 100);
        previewNavigatorSetState({ type: "scroll", scrollX: scrollX, scrollY: scrollY, iframeWidth: iframeWidth, iframeHeight: iframeHeight });
      };

      iframeDocument.onscroll = iframeScroll;
      iframeScroll();
    };

    // scrollbarWidthSetState();

    return () => {};
  }, [SetupEditorContextValue.previewUpdate]);

  useEffect(() => {
    // return () => {
    //   previewOverlayUpdate({ type: "delete", thenPreviewOverlay: {}, previewIframeElement: null });
    // };
  }, [SetupEditorContextValue.choiceComposite]);

  const setPreviewOverlay = (state: any, action: any): { [name: string]: PreviewOverlay } => {
    // console.log("setPreviewOverlay");
    // if (!action.previewIframeElement) {
    //   return {};
    // }

    console.log("action.type", action.type);
    if (action.type === "delete") {
      return {};
    }

    // if (action.type === "drag") {
    //   const newPVO = JSON.parse(JSON.stringify(action.thenPreviewOverlay));
    //   const newL = action.left + newPVO[action.thenPreviewOverlayID].left;
    //   const newT = action.top + newPVO[action.thenPreviewOverlayID].top;
    //   newPVO[action.thenPreviewOverlayID].left = newL;
    //   newPVO[action.thenPreviewOverlayID].top = newT;

    //   console.log("userhand - newLT", action.thenPreviewOverlayID, newL, newT, action.left, action.top);

    //   return newPVO;
    // }

    if (action.type === "mouseMove") {
      console.log("userhand - mouseMove", action.rootElement);

      if (!action.rootElement) {
        return {};
      }
      action.thenPreviewOverlay = {};

      const compositeElements: Element = action.rootElement.firstElementChild;
      const inElements: HTMLCollection = compositeElements.children;

      for (let ce = 0; ce < inElements.length; ce++) {
        const thenElements: Element = inElements[ce]; //これでcomposite要素直下を取得できる
        const thenID = thenElements.getAttribute("id");
        console.log("thenElements", thenElements, thenID);

        const maxSize = searchMaxSizeElement(thenElements);

        const inRect = thenElements.getBoundingClientRect();
        const inLeft = inRect.left;
        const inTop = inRect.top;
        const newPreviewOverlay = new PreviewOverlay(inLeft, inTop, maxSize[0], maxSize[1], thenID);
        action.thenPreviewOverlay[newPreviewOverlay.previewOverlayID] = newPreviewOverlay;
        // }
        console.log("searchMaxSizeElement", maxSize, inLeft, inTop, action.thenPreviewOverlay);
      }
    }

    // const returnDict: { [name: string]: PreviewOverlay } = {};

    return action.thenPreviewOverlay;
  };

  const [previewOverlay, previewOverlayUpdate] = useReducer(setPreviewOverlay, {});

  const previewOverlayRef = useRef(null);
  previewOverlayRef.current = previewOverlay;

  const componentConvertPreviewOverlay = () => {
    return Object.values(previewOverlay);
  };

  const widthHeightText = () => {
    const scrollbarSizeWidth = String(window.innerWidth - document.body.clientWidth);
    const text = "calc(100% - " + scrollbarSizeWidth + "px)";
    return text;
  };

  const onMouseMove = () => {};

  return (
    <div className="preview-main">
      {" "}
      <div className="preview-overlay-update" ref={previewOverlayUpdateElement}>
        <iframe className="preview-replace" ref={previewIframeElement}>
          <p>html p</p>
        </iframe>
      </div>
      <div className="preview-overlay" ref={previeOverlayElement} onMouseMove={onMouseMove} style={{ width: widthHeightText(), height: widthHeightText() }}>
        {componentConvertPreviewOverlay().map((output: any, index: number) => (
          // <>{fruit}</> //SurfaceControlIndividualを追加するmap (list_surface_controlに入っている)

          <PreviewOverlayShape
            DownstreamShapePreviewOverlay={output}
            previewOverlay={previewOverlay}
            previewOverlayUpdate={previewOverlayUpdate}
            key={index}
            previeOverlayElement={previeOverlayElement}
            previewOverlayRef={previewOverlayRef}
          />
        ))}
        <PreviewOverlayNavigator previewNavigator={previewNavigator} />
      </div>
    </div>
  );
};

export default PreviewComponent;
