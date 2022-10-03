import * as React from "react";
const { createContext } = React;

export type TypePreviewNavigator = { scrollX: number; scrollY: number; iframeWidth: number; iframeHeight: number };

type PreviewOverlayNavigatorContextValue = {
  playheadTime: number;
  scrollY: number;
  thenTimeStylePos: number;
};
export const PreviewOverlayNavigatorContext = createContext<PreviewOverlayNavigatorContextValue>({} as PreviewOverlayNavigatorContextValue);
