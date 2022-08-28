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

  conversionStyleToTime: Function;
  conversionTimeToStyle: Function;

  update: boolean;
  updateDOM: Function;
  operationMediaObjectTime: Function;
  operationKeyframeTime: Function;
  operationLinkAnimatorGroup: Function;

  operationCreateAnimator: Function;
  operationCreateKeyframe: Function;

  operationCSSPropertyValue: Function;
  operationCSSPropertyUnit: Function;

  getCSSPropertyValue: Function;
  getCSSPropertyUnit: Function;

  getOwnedID_CSSPropertySpeciesHasAnimator: Function;
  getOwnedID_CSSPropertySpeciesHasKeyframe: Function;

  getMediaObjectTime: Function;
  getMediaObjectSourceSpecies: Function;
  getKeyframeTime: Function;
  getCompositeName: Function;
  setMediaObjectColor: Function;
  getMediaObjectColor: Function;

  getCompositeDuration: Function;

  fileExportDataCentral: Function;
  fileExportComposite: Function;
  buildMiddleDataHtml: Function;
  swopMediaObject: Function;
  rewriteMediaObejctAnimatorOpen: Function;
  getMediaObejctAnimatorOpen: Function;
  // htmlBuildMain:Function

  setCompositeStyleViewPos: Function;
  getCompositeStyleViewPos: Function;

  getCompositePlayheadTimePos: Function;
  setCompositePlayheadTimePos: Function;

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

  linkCSSPropertyHasAnimator: Function;
  linkCSSPropertyHasKeyframe: Function;
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
