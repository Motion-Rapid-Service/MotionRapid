import * as React from "react";
const { createContext } = React;

type AppContextValue = {
  getDataCentral: Function;

  getUUID: Function;
  sortNumber: Function;
  deepCopyDict: Function;
  componentConvertCompositeChoiceArea: Function;
  componentConvertMediaObjectArea: Function;
  componentConvertAnimatorArea: Function;
  componentConvertKeyframeArea: Function;

  conversionStyleToTime: Function;
  conversionTimeToStyle: Function;

  getOwnedID_Composite: Function;

  update: boolean;
  updateDOM: Function;
  readerImage: Function;

  replaceDataCentral: Function;

  copyComposite: Function;
  copyMediaObject: Function;

  setDataCentralMediaTable: Function;
  getDataCentralMediaTable: Function;

  getOwnedClassAnimator: Function;

  operationMediaObjectSourceSpeciesClass: Function;

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

  setCompositePreviewViewPos: Function;
  getCompositePreviewViewPos: Function;

  searchSpecificAnimatorGroupSpecies: Function;
  searchSpecificAnimatorPropertySpecies: Function;

  getCompositeHorizontalMode: Function;
  getCompositeLocationMode: Function;

  getMediaObejctCSSFixed: Function;
  setMediaObejctCSSFixed: Function;

  getOwnedClassComposite: Function;

  getMediaObjectTime: Function;
  getMediaObjectSourceSpecies: Function;
  getKeyframeTime: Function;
  getCompositeName: Function;
  setMediaObjectColor: Function;
  getMediaObjectColor: Function;
  getMediaObjectName: Function;
  setMediaObjectName: Function;

  getCompositeDuration: Function;

  getOwnedID_MediaObject: Function;
  getOwnedID_AnimatorGroup: Function;
  getOwnedID_Animator: Function;

  getOwnedID_Keyframe: Function;

  fileExportDataCentral: Function;
  // fileExportComposite: Function;
  buildMiddleDataHtml: Function;
  previewMiddleDataHtml: Function;
  swopMediaObject: Function;
  rewriteMediaObejctAnimatorOpen: Function;
  getMediaObejctAnimatorOpen: Function;
  // htmlBuildMain:Function

  setCompositeStyleViewPos: Function;
  getCompositeStyleViewPos: Function;

  getCompositePlayheadTimePos: Function;
  setCompositePlayheadTimePos: Function;

  setCompositeName: Function;
  setCompositeHorizontalMode: Function;
  setCompositeLocationMode: Function;
  setCompositeWidth: Function;
  setCompositeWidthUnit: Function;
  setCompositeHeight: Function;
  setCompositeHeightUnit: Function;
  setCompositeDuration: Function;

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

  equalsKeyframeTime: Function;

  deleteComposite: Function;
  deleteMediaObject: Function;
  deleteAnimatorGroup: Function;
  deleteKeyframe: Function;
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
