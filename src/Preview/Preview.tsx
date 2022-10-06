import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "./../AppContext";
import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
import { SetupToolbarContext } from "./../SetupEditor/SetupToolbarContext";
import * as middleDataClass from "./../MiddleData/middleDataClass";
import * as timelineMousePosition from "./../timeline/timeLineMousePosition";

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
  const previewIframeElement = useRef(null);
  const previeOverlayShapeElement = useRef(null);
  const previeOverlayScrollElement = useRef(null);
  const previeOverlayElement = useRef(null);
  const AppContextValue = useContext(AppContext);
  const SetupEditorContextValue = useContext(SetupEditorContext);
  const TimeNavigatorContextValue = useContext(TimeNavigatorContext);

  const createPreviewOverlayDict = () => {
    const iframeDocument = previewIframeElement.current.contentDocument || previewIframeElement.current.contentWindow.document;
    const iframeWindow = previewIframeElement.current.contentWindow;
    const rootElement: HTMLInputElement = iframeDocument.getElementById("root");

    if (!rootElement) {
      return {};
    }

    let previewOverlayDict: { [name: string]: PreviewContext.PreviewOverlay } = {};

    const compositeElements: Element = rootElement.firstElementChild;
    const inElements: HTMLCollection = compositeElements.children;

    for (let ce = 0; ce < inElements.length; ce++) {
      const thenElements: Element = inElements[ce]; //これでcomposite要素直下を取得できる
      const thenID = thenElements.getAttribute("id");
      let thenStyle = iframeWindow.getComputedStyle(thenElements);

      const thenZindex = thenStyle.getPropertyValue("z-index");

      console.log("thenElements", thenElements, thenID, thenZindex);

      const maxSize = searchMaxSizeElement(thenElements);

      const inRect = thenElements.getBoundingClientRect();
      const inLeft = inRect.left;
      const inTop = inRect.top;
      const newPreviewOverlay = new PreviewContext.PreviewOverlay(inLeft, inTop, maxSize[0], maxSize[1], thenID, thenZindex);
      previewOverlayDict[newPreviewOverlay.previewOverlayID] = newPreviewOverlay;
    }

    return previewOverlayDict;
  };

  const setPreviewNavigator = (state: PreviewContext.TypePreviewNavigator, action: any): PreviewContext.TypePreviewNavigator => {
    if (action.type === "iframeOnLoad") {
      return {
        scrollX: action.scrollX,
        scrollY: action.scrollY,
        iframeWidth: action.iframeWidth,
        iframeHeight: action.iframeHeight,
        iframeScrollWidth: action.iframeScrollWidth,
        iframeScrollHeight: action.iframeScrollHeight,
        previewOverlayDict: createPreviewOverlayDict(),
      };
    }
    if (action.type === "overlayScroll") {
      const iframeWindow = previewIframeElement.current.contentWindow;
      iframeWindow.scrollTo(state.scrollX, state.scrollY);
      createPreviewOverlayDict();
      return {
        scrollX: action.scrollX,
        scrollY: action.scrollY,
        iframeWidth: state.iframeWidth,
        iframeHeight: state.iframeHeight,
        iframeScrollWidth: state.iframeScrollWidth,
        iframeScrollHeight: state.iframeScrollHeight,
        previewOverlayDict: createPreviewOverlayDict(),
      };
    }
  };

  const [previewNavigator, previewNavigatorSetState] = useReducer(setPreviewNavigator, {
    scrollX: 0,
    scrollY: 0,
    iframeWidth: 0,
    iframeHeight: 0,
    iframeScrollWidth: 0,
    iframeScrollHeight: 0,
    previewOverlayDict: {},
  });
  //これは

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
      // previewOverlayUpdate({ type: "searchIframe", thenPreviewOverlay: {}, rootElement: rootElement });

      const scrollX = Number(iframeWindow.scrollX);
      const scrollY = Number(iframeWindow.scrollY);
      const iframeWidth = Number(iframeWindow.innerWidth);
      const iframeHeight = Number(iframeWindow.innerHeight);

      const iframeScrollWidth = iframeDocument.body.scrollWidth;
      const iframeScrollHeight = iframeDocument.body.scrollHeight;
      console.log(
        "iframeDocumentScroll",
        iframeScrollWidth,
        iframeScrollHeight,
        scrollY,
        previewIframeElement.current.contentWindow.scrollY,
        SetupEditorContextValue.choiceComposite,
        iframeHeight
      );

      previewNavigatorSetState({
        type: "iframeOnLoad",
        scrollX: scrollX,
        scrollY: scrollY,
        iframeWidth: iframeWidth,
        iframeHeight: iframeHeight,
        iframeScrollWidth: iframeScrollWidth,
        iframeScrollHeight: iframeScrollHeight,
      });

      iframeWindow.scrollTo(previewNavigator.scrollX, previewNavigator.scrollY);
    };

    // scrollbarWidthSetState();

    return () => {};
  }, [SetupEditorContextValue.previewUpdate]);

  useEffect(() => {
    // return () => {
    //   previewOverlayUpdate({ type: "delete", thenPreviewOverlay: {}, previewIframeElement: null });
    // };
  }, [SetupEditorContextValue.choiceComposite]);

  // const [previewOverlay, previewOverlayUpdate] = useReducer(setPreviewOverlay, {});

  const componentConvertPreviewOverlay = () => {
    // const eventX = event.clientX;
    // const eventY = event.clientY;
    const previewOverlayDictValue = Object.values(previewNavigator.previewOverlayDict);

    return previewOverlayDictValue;
  };

  const onMouseMove = () => {};

  const onScroll = (event: any) => {
    const xP = previeOverlayScrollElement.current.scrollLeft;
    const yP = previeOverlayScrollElement.current.scrollTop;
    console.log("onSS", xP, yP);
    previewNavigatorSetState({ type: "overlayScroll", scrollX: xP, scrollY: yP });
  };

  return (
    <div className="preview-main">
      {" "}
      <div className="preview-overlay-update">
        <iframe className="preview-replace" ref={previewIframeElement}>
          <p>html p</p>
        </iframe>
      </div>
      <PreviewOverlayNavigator previewNavigator={previewNavigator} />
      <div className="preview-overlay" ref={previeOverlayElement}>
        <div className="preview-overlay-shape" ref={previeOverlayShapeElement}>
          {componentConvertPreviewOverlay().map((output: any, index: number) => (
            // <>{fruit}</> //SurfaceControlIndividualを追加するmap (list_surface_controlに入っている)
            <PreviewOverlayShape
              DownstreamShapePreviewOverlay={output}
              key={index}
              previeOverlayElement={previeOverlayElement}
              previeOverlayShapeElement={previeOverlayShapeElement}
            />
          ))}
        </div>

        <div className="preview-overlay-scroll-out" onScroll={onScroll} ref={previeOverlayScrollElement}>
          <div
            className="preview-overlay-scroll-in"
            onMouseMove={onMouseMove}
            style={{ width: previewNavigator.iframeScrollWidth, height: previewNavigator.iframeScrollHeight }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default PreviewComponent;
