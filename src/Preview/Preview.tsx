import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "./../AppContext";
import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
import { SetupToolbarContext } from "./../SetupEditor/SetupToolbarContext";

import * as timelineMousePosition from "./../timeline/timeLineMousePosition";
import UUID from "uuidjs";
import * as UserHand from "./../UserHand";

let moveFlag = false;

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

  useEffect(() => {
    console.log("PreviewOverlayShapeComponent", left);
  }, [left]);

  const mouseDown = (event: any) => {
    UserHand.alldeleteUserHandPreviewShape();
    const mousePushPos = Object.assign(timelineMousePosition.mediaObjectMousePosition(event, previewOverlayShapeRef));
    UserHand.insertUserHandPreviewShape(previewOverlayID, 1, mousePushPos, [left, top]);
    console.log("userhand - insertUserHandPreviewShape", previewOverlayID, 1, mousePushPos, [left, top]);
    moveFlag = true;
  };
  const mouseMove = (event: any) => {
    if (!UserHand.hasUserHandPreviewShape(previewOverlayID)) {
      return;
    }

    const userrHandPreview = UserHand.getUserHandPreviewShape(previewOverlayID);
    // console.log("userhand - ban", previewOverlayID, userHandKeyframe.mouseDownFlag);
    switch (userrHandPreview.mouseDownFlag) {
      case 1:
        const mouseXY = timelineMousePosition.mediaObjectMousePosition(event, previewOverlayShapeRef);
        props.previewOverlayUpdate({
          type: "drag",
          left: mouseXY[0] - userrHandPreview.mousePushPos[0],
          top: mouseXY[1] - userrHandPreview.mousePushPos[1],
          thenPreviewOverlayID: previewOverlayID,
          thenPreviewOverlay: JSON.parse(JSON.stringify(props.previewOverlayRef.current)),
        });
        // console.log("userhand - getUserHandPreviewShape", mouseXY, previewOverlayID);
        // UserHand.nowPosUserHandPreviewShape(previewOverlayID, mouseXY);
        break;
    }
  };
  const mouseUp = (event: any) => {
    console.log("userhand - mouseUp");
    UserHand.alldeleteUserHandPreviewShape();
    moveFlag = false;
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

  useEffect(() => {
    const htmlStr = AppContextValue.previewMiddleDataHtml(SetupEditorContextValue.choiceComposite);
    console.log(previewIframeElement);
    previewIframeElement.current.srcdoc = htmlStr;
    console.log("htmlStr", htmlStr);
    previewIframeElement.current.scrolling = "yes";

    // scrollbarWidthSetState();

    return () => {};
  }, [SetupEditorContextValue.previewUpdate]);

  useEffect(() => {
    // previewOverlayUpdate({ type: "new", thenPreviewOverlay: {} });
    return () => {
      previewOverlayUpdate({ type: "delete", thenPreviewOverlay: {} });
    };
  }, [SetupEditorContextValue.choiceComposite]);

  const setPreviewOverlay = (state: any, action: any): { [name: string]: PreviewOverlay } => {
    console.log("setPreviewOverlay");
    if (!previewIframeElement.current) {
      return {};
    }

    console.log("action.type", action.type);
    if (action.type === "delete") {
      return {};
    }

    if (action.type === "drag") {
      const newPVO = JSON.parse(JSON.stringify(action.thenPreviewOverlay));
      const newL = action.left + newPVO[action.thenPreviewOverlayID].left;
      const newT = action.top + newPVO[action.thenPreviewOverlayID].top;
      newPVO[action.thenPreviewOverlayID].left = newL + 0;
      newPVO[action.thenPreviewOverlayID].top = newT + 0;

      console.log("userhand - newLT", action.thenPreviewOverlayID, newL, newT);

      return newPVO;
    }

    if (action.type === "mouseMove") {
      console.log("userhand - mouseMove");
      const iframeDocument = previewIframeElement.current.contentDocument || previewIframeElement.current.contentWindow.document;

      const rootElement: HTMLInputElement = iframeDocument.getElementById("root");
      if (!rootElement) {
        return {};
      }

      const compositeElements: Element = rootElement.firstElementChild;
      const inElements: HTMLCollection = compositeElements.children;

      for (let ce = 0; ce < inElements.length; ce++) {
        const thenElements: Element = inElements[ce]; //これでcomposite要素直下を取得できる
        console.log("thenElements", thenElements);

        const maxSize = searchMaxSizeElement(thenElements);

        const inRect = thenElements.getBoundingClientRect();
        const inLeft = inRect.left;
        const inTop = inRect.top;
        const newPreviewOverlay = new PreviewOverlay(inLeft, inTop, maxSize[0], maxSize[1]);
        action.thenPreviewOverlay[newPreviewOverlay.previewOverlayID] = newPreviewOverlay;
        // }
        console.log("searchMaxSizeElement", maxSize, inLeft, inTop);
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

  useEffect(() => {
    console.log("previewOverlayUpdate", previewOverlay);
  }, [previewOverlay]);

  const widthHeightText = () => {
    const scrollbarSizeWidth = String(window.innerWidth - document.body.clientWidth);
    const text = "calc(100% - " + scrollbarSizeWidth + "px)";
    return text;
  };

  const onMouseMove = () => {
    if (moveFlag) {
      return;
    }

    previewOverlayUpdate({ type: "mouseMove", thenPreviewOverlay: {} });
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
        {componentConvertPreviewOverlay().map((output: any, index: number) => (
          // <>{fruit}</> //SurfaceControlIndividualを追加するmap (list_surface_controlに入っている)

          <PreviewOverlayShapeComponent
            DownstreamShapePreviewOverlay={output}
            previewOverlay={previewOverlay}
            previewOverlayUpdate={previewOverlayUpdate}
            key={index}
            previewOverlayRef={previewOverlayRef}
          />
        ))}
      </div>
    </div>
  );
};

export default PreviewComponent;
