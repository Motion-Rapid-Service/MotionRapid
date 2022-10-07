import * as React from "react";
const { createContext } = React;
import UUID from "uuidjs";
export class PreviewOverlay {
  className: string;
  left: number;
  top: number;
  width: number;
  height: number;
  previewOverlayID: string;
  mediaObjectID: string;
  zIndex: number;

  constructor(
    className: string,
    send_left: number,
    send_top: number,
    send_width: number,
    send_height: number,
    send_mediaObjectID: string,
    send_zIndex: number
  ) {
    this.className = className;
    this.left = send_left;
    this.top = send_top;
    this.width = send_width;
    this.height = send_height;
    this.previewOverlayID = "previewOverlay_" + String(UUID.generate());
    this.mediaObjectID = send_mediaObjectID;
    this.zIndex = send_zIndex;
  }
}

export type TypePreviewNavigator = {
  scrollX: number;
  scrollY: number;
  iframeWidth: number;
  iframeHeight: number;
  iframeScrollWidth: number;
  iframeScrollHeight: number;

  previewOverlayDict: { [name: string]: PreviewOverlay };
};

type PreviewOverlayNavigatorContextValue = {
  playheadTime: number;
  scrollY: number;
  thenTimeStylePos: number;
};
export const PreviewOverlayNavigatorContext = createContext<PreviewOverlayNavigatorContextValue>({} as PreviewOverlayNavigatorContextValue);
