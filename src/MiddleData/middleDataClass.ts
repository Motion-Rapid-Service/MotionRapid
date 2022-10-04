import * as buildSourceSpecies from "../BuildSite/buildHTML/buildSourceSpecies";

export const Composite_HorizontalMode: Array<string> = ["time", "parallax"];
export const Composite_LocationMode: Array<string> = ["文書配置", "座標設定(左)", "予備枠", "背景固定"];

export class DataCentral {
  OwnedClass_Composite: { [name: string]: Composite };
  OwnedClass_MediaObject: { [name: string]: MediaObject };
  OwnedClass_AnimatorGroup: { [name: string]: AnimatorGroup };
  OwnedClass_Animator: { [name: string]: Animator };
  OwnedClass_Keyframe: { [name: string]: Keyframe };
  OwnedClass_CSSProperty: { [name: string]: CSSProperty };
  projectName: string;

  DataCentral_MediaTable: { [name: string]: string };

  constructor(send_projectName: string) {
    // this.Composite = null;
    // this.MediaObject = null;
    this.projectName = send_projectName;
    this.OwnedClass_Composite = {};
    this.OwnedClass_MediaObject = {};
    this.OwnedClass_AnimatorGroup = {};
    this.OwnedClass_Animator = {};
    this.OwnedClass_Keyframe = {};
    this.OwnedClass_CSSProperty = {};
    this.DataCentral_MediaTable = {}; //uuidと、DOM上で表示するためのurlがセットになっている
  }
}

export class Composite {
  Composite_ID: string;
  Composite_Name: string;
  OwnedID_MediaObject: Array<string>;
  Composite_HorizontalMode: string;
  Composite_LocationMode: string;
  Composite_Duration: number; //コンポジットの長さ
  Composite_Width: number;
  Composite_Height: number;
  Composite_WidthUnit: string;
  Composite_HeightUnit: string;

  staStyleViewPos: number;
  endStyleViewPos: number;
  playheadTimePos: number;
  previewViewPosX: number;
  previewViewPosY: number;
  constructor(
    send_Composite_ID: string,
    send_Composite_Name: string,
    send_Composite_HorizontalMode: string,
    send_Composite_LocationMode: string,
    send_Composite_Width: number,
    send_Composite_WidthUnit: string,
    send_Composite_Height: number,
    send_Composite_HeightUnit: string
  ) {
    this.Composite_ID = send_Composite_ID;
    this.Composite_Name = send_Composite_Name;
    this.OwnedID_MediaObject = [];
    this.Composite_HorizontalMode = send_Composite_HorizontalMode;
    this.Composite_LocationMode = send_Composite_LocationMode;
    this.Composite_Duration = 3000;

    this.Composite_Width = send_Composite_Width;
    this.Composite_WidthUnit = send_Composite_WidthUnit;
    this.Composite_Height = send_Composite_Height;
    this.Composite_HeightUnit = send_Composite_HeightUnit;

    this.staStyleViewPos = 0;
    this.endStyleViewPos = this.Composite_Duration;
    this.playheadTimePos = 0;

    this.previewViewPosX = 0;
    this.previewViewPosY = 0;
  }
}

export class MediaObject {
  MediaObject_ID: string;
  MediaObject_StartTime: number;
  MediaObject_EndTime: number;
  MediaObject_LayerNumber: number;
  MediaObject_Color: Array<number>;
  MediaObject_Name: string;
  MediaObject_Fixed: boolean;

  OwnedID_AnimatorGroup: Array<string>;
  animatorOpen: boolean;
  MediaObject_SourceSpecies: buildSourceSpecies.SourceSpeciesClass;

  constructor(send_MediaObject_ID: string, send_MediaObject_Name: string, send_sourceSpecies: buildSourceSpecies.SourceSpeciesClass) {
    this.MediaObject_ID = send_MediaObject_ID;
    this.MediaObject_StartTime = 500;
    this.MediaObject_EndTime = 750;
    this.MediaObject_LayerNumber = 0;
    this.MediaObject_Color = [50, 150, 50];
    this.MediaObject_Name = send_MediaObject_Name;

    this.OwnedID_AnimatorGroup = [];
    this.animatorOpen = true;
    this.MediaObject_SourceSpecies = send_sourceSpecies;
  }
}

export class AnimatorGroup {
  AnimatorGroup_ID: string;
  OwnedID_Animator: Array<string>;
  AnimatorGroup_Species: string;
  constructor(send_Animator_ID: string, send_AnimatorGroup_Species: string) {
    this.AnimatorGroup_ID = send_Animator_ID;
    this.OwnedID_Animator = [];
    this.AnimatorGroup_Species = send_AnimatorGroup_Species; //marginとかそういうのが入る
  }
}

export class Animator {
  Animator_ID: string;
  Animator_propertySpecies: string;
  OwnedID_Keyframe: Array<string>;
  OwnedID_cssPropertyValue: string;
  constructor(send_Animator_ID: string, send_propertySpecies: string) {
    this.Animator_propertySpecies = send_propertySpecies; //left とか backgroundとかcssのpropertyが入る
    this.Animator_ID = send_Animator_ID;
    this.OwnedID_Keyframe = [];
  }
}

export class Keyframe {
  Keyframe_ID: string;
  Keyframe_AbsoluteTime: number;
  OwnedID_cssPropertyValue: string;
  constructor(send_Keyframe_ID: string) {
    this.Keyframe_ID = send_Keyframe_ID;
    this.Keyframe_AbsoluteTime = null;
  }
}

export class CSSProperty {
  CSSProperty_ID: string;
  CSSProperty_Value: string | number;
  CSSProperty_Unit: string;
  constructor(send_CSSProperty_ID: string) {
    this.CSSProperty_ID = send_CSSProperty_ID;
    this.CSSProperty_Value = 0;
    this.CSSProperty_Unit = "";
  }
}
