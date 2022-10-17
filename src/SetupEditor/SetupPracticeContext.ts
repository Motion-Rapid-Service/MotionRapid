import * as React from "react";
const { createContext } = React;

type SetupPracticeContextValue = {
  practiceMode: string;
  practiceModeSetState: Function;
  practiceModeList: Array<string>;
  practiceModeHistory: { [name: string]: Array<TypePracticeHistory> };
  practiceView: boolean;
  practiceViewSetState: Function;
  practiceHistoryNumber: number;
  practiceHistoryNumberSetState: Function;
  getLayoutGlow: Function;
  LayerGlow: Function;
};

export const SetupPracticeContext = createContext<SetupPracticeContextValue>({} as SetupPracticeContextValue);
export type TypePracticeHistory = { title: string; main: string; layoutGlow: layoutGlowClass };

export class layoutGlowClass {
  toulBar: Array<string>;
  toolBarDetail: Array<string>;
  layoutComposite: boolean;
  layoutPreview: boolean;
  layoutToulBar: boolean;
  layoutTimelime: boolean;
  layoutTimelineNavigator: boolean;
  layoutPreviewNavigator: boolean;
  mediaObejct: boolean;
  layerPanel: boolean;
  keyframe: boolean;
  keyframeMakeButton: boolean;

  constructor(
    toulBar: Array<string> = [],
    toolBarDetail: Array<string> = [],
    layoutComposite: boolean = false,
    layoutToulBar: boolean = false,
    layoutPreview: boolean = false,
    layoutTimelime: boolean = false,
    layoutTimelineNavigator: boolean = false,
    layoutPreviewNavigator: boolean = false,
    mediaObejct: boolean = false,
    layerPanel: boolean = false,
    keyframe: boolean = false,
    keyframeMakeButton: boolean = false
  ) {
    this.toulBar = toulBar;
    this.toolBarDetail = toolBarDetail;
    this.layoutComposite = layoutComposite;
    this.layoutPreview = layoutPreview;
    this.layoutToulBar = layoutToulBar;
    this.layoutTimelime = layoutTimelime;
    this.layoutTimelineNavigator = layoutTimelineNavigator;
    this.layoutPreviewNavigator = layoutPreviewNavigator;
    this.layerPanel = layerPanel;
    this.mediaObejct = mediaObejct;
    this.keyframe = keyframe;
    this.keyframeMakeButton = keyframeMakeButton;
  }

  containsToulBar = (name: string) => {
    console.log("containsToulBar", name, this.toulBar.indexOf(name));
    return this.toulBar.indexOf(name) > -1;
  };
  containstoolBarDetail = (name: string) => {
    console.log("containstoolBarDetail", name, this.toolBarDetail.indexOf(name));
    return this.toolBarDetail.indexOf(name) > -1;
  };
}
