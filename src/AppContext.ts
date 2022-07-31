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

  update: boolean;
  updateDOM: Function;
  operationMediaObjectTime: Function;
  operationKeyframeTime: Function;
  operationCreateAnimatorGroup: Function;

  operationCreateAnimator: Function;
  operationCreateKeyframe: Function;

  operationCSSPropertyValue: Function;
  operationCSSPropertyUnit: Function;

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
  createCSSProperty: Function;
  linkMediaObject: Function;
  linkAnimatorGroup: Function;
  linkAnimator: Function;
  linkKeyframe: Function;

  linkCSSPropertyAnimator: Function;
  linkCSSPropertyKeyframe: Function;
};

export const AppContext = createContext<AppContextValue>({} as AppContextValue);

export type ComponentConvertAnimatorGroupType = {
  entitySpecies: string;
  AnimatorGroup_ID: string;
  AnimatorGroup_Species: string;
};

export type ComponentConvertAnimatorType = {
  entitySpecies: string;
  Animator_ID: string;
  AnimatorGroup_Species: string;
  Animator_propertySpecies: string;
};
export type ComponentConvertAnimatorAreaType = ComponentConvertAnimatorType | ComponentConvertAnimatorGroupType;
