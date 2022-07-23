import * as React from "react";
const { createContext } = React;

type AppContextValue = {
  getUUID: Function;
  sortNumber: Function;
  deepCopyDict: Function;
  componentConvertCompositeChoiceArea: Function;
  componentConvertMediaObjectArea: Function;
  componentConvertAnimatorArea: Function;
  componentConvertKeyframeArea: Function;

  updateDOM: Function;
  operationMediaObjectTime: Function;
  operationKeyframeTime: Function;
  operationAnimatorGroup: Function;

  getMediaObjectTime: Function;
  getMediaObjectSourceSpecies: Function;
  getKeyframeTime: Function;
  getCompositeName: Function;
  setMediaObjectColor: Function;
  getMediaObjectColor: Function;

  fileExportDataCentral: Function;
  fileExportComposite: Function;
  buildMiddleDataHtml: Function;
  swopMediaObject: Function;
  rewriteMediaObejctAnimatorOpen: Function;
  getMediaObejctAnimatorOpen: Function;
  // htmlBuildMain:Function

  createComposite: Function;
  createMediaObject: Function;
  createAnimatorGroup: Function;
  createAnimator: Function;
  createKeyframe: Function;

  linkMediaObject: Function;
  linkAnimatorGroup: Function;
  linkAnimator: Function;
  linkKeyframe: Function;
};

export const AppContext = createContext<AppContextValue>({} as AppContextValue);
