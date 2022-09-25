import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "./../AppContext";
import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
import { SetupToolbarContext } from "./../SetupEditor/SetupToolbarContext";

import * as timelineMousePosition from "./../timeline/timeLineMousePosition";
import UUID from "uuidjs";
import * as UserHand from "./../UserHand";

class PreviewOverlay {
  left: number;
  top: number;
  width: number;
  height: number;
  previewOverlayID: string;

  constructor(send_left: number, send_top: number, send_width: number, send_height: number) {
    this.left = send_left;
    this.top = send_top;
    this.width = send_width;
    this.height = send_height;
    this.previewOverlayID = "previewOverlay_" + String(UUID.generate());
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

const PreviewOverlayShapeComponent = (props: any) => {
  const left = props.DownstreamShapePreviewOverlay.left;
  const top = props.DownstreamShapePreviewOverlay.top;
  const width = props.DownstreamShapePreviewOverlay.width;
  const height = props.DownstreamShapePreviewOverlay.height;
  const previewOverlayID = props.DownstreamShapePreviewOverlay.previewOverlayID;
  const previewOverlayShapeRef = useRef(null);

  const mouseDown = (event: any) => {
    UserHand.alldeleteUserHandPreviewShape();
    const mousePushPos = timelineMousePosition.mediaObjectMousePosition(event, previewOverlayShapeRef);
    UserHand.insertUserHandPreviewShape(previewOverlayID, 1, mousePushPos, [left, top]);
  };
  const mouseMove = (event: any) => {
    if (!UserHand.hasUserHandPreviewShape(previewOverlayID)) {
      return;
    }

    const userHandKeyframe = UserHand.getUserHandKeyframe(previewOverlayID);

    switch (userHandKeyframe.mouseDownFlag) {
      case 1:
        const mouseXY = timelineMousePosition.mediaObjectMousePosition(event, previewOverlayShapeRef);
        UserHand.nowPosUserHandPreviewShape(previewOverlayID, mouseXY);
        break;
    }
  };
  const mouseUp = (event: any) => {
    UserHand.deleteUserHandPreviewShape(props.DownstreamShapePreviewOverlay.previewOverlayID);
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
    };
  }, [props.DownstreamShapePreviewOverlay.previewOverlayID]);

  return (
    <div
      className="preview-overlay-shape"
      onMouseDown={mouseDown}
      ref={previewOverlayShapeRef}
      style={{ left: left, top: top, width: width, height: height }}
    ></div>
  );
};

const PreviewComponent = () => {
  const previewOverlayUpdateElement = useRef(null);
  const previewIframeElement = useRef(null);
  const previeOverlayElement = useRef(null);
  const AppContextValue = useContext(AppContext);
  const SetupEditorContextValue = useContext(SetupEditorContext);

  const [scrollbarWidth, scrollbarWidthSetState] = useState<number>(0);

  useEffect(() => {
    const htmlStr = AppContextValue.previewMiddleDataHtml(SetupEditorContextValue.choiceComposite);
    console.log(previewIframeElement);
    previewIframeElement.current.srcdoc = htmlStr;
    console.log("htmlStr", htmlStr);
    previewIframeElement.current.scrolling = "yes";

    // scrollbarWidthSetState();

    return () => {};
  }, [SetupEditorContextValue.previewUpdate]);

  const setPreviewOverlay = (): Array<PreviewOverlay> => {
    console.log("setPreviewOverlay");
    if (!previewIframeElement.current) {
      return [];
    }
    const iframeDocument = previewIframeElement.current.contentDocument || previewIframeElement.current.contentWindow.document;

    const rootElement: HTMLInputElement = iframeDocument.getElementById("root");
    if (!rootElement) {
      return [];
    }

    const returnArray: Array<PreviewOverlay> = [];

    const compositeElements: Element = rootElement.firstElementChild;
    const inElements: HTMLCollection = compositeElements.children;

    for (let ce = 0; ce < inElements.length; ce++) {
      const thenElements: Element = inElements[ce]; //これでcomposite要素直下を取得できる
      console.log("thenElements", thenElements);

      const maxSize = searchMaxSizeElement(thenElements);

      const inRect = thenElements.getBoundingClientRect();
      const inLeft = inRect.left;
      const inTop = inRect.top;

      returnArray.push(new PreviewOverlay(inLeft, inTop, maxSize[0], maxSize[1]));

      console.log("searchMaxSizeElement", maxSize, inLeft, inTop);
    }
    return returnArray;
  };

  const [previewOverlay, previewOverlayUpdate] = useReducer(setPreviewOverlay, []);

  useEffect(() => {
    console.log(previewOverlay);
  }, [previewOverlay]);

  const widthHeightText = () => {
    const scrollbarSizeWidth = String(window.innerWidth - document.body.clientWidth);
    const text = "calc(100% - " + scrollbarSizeWidth + "px)";
    return text;
  };

  const onMouseMove = () => {
    previewOverlayUpdate();
  };

  return (
    <div className="preview-main">
      {" "}
      <div className="preview-overlay-update" ref={previewOverlayUpdateElement}>
        <iframe className="preview-replace" ref={previewIframeElement}>
          <p>html p</p>
        </iframe>
      </div>
      <div className="preview-overlay" ref={previeOverlayElement} onMouseMove={onMouseMove} style={{ width: widthHeightText(), height: widthHeightText() }}>
        {" "}
        {previewOverlay.map((output: any, index: number) => (
          // <>{fruit}</> //SurfaceControlIndividualを追加するmap (list_surface_controlに入っている)

          <PreviewOverlayShapeComponent DownstreamShapePreviewOverlay={output} key={index} />
        ))}
      </div>
    </div>
  );
};

export default PreviewComponent;
