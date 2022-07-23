import * as buildSourceSpecies from "../BuildSite/buildHTML/buildSourceSpecies";

export const Composite_Mode: Array<string> = ["time", "parallax"];

export class DataCentral {
  OwnedClass_Composite: { [name: string]: Composite };
  OwnedClass_MediaObject: { [name: string]: MediaObject };
  OwnedClass_AnimatorGroup: { [name: string]: AnimatorGroup };
  OwnedClass_Animator: { [name: string]: Animator };
  OwnedClass_Keyframe: { [name: string]: Keyframe };
  projectName: string;

  constructor(send_projectName: string) {
    // this.Composite = null;
    // this.MediaObject = null;
    this.projectName = send_projectName;
    this.OwnedClass_Composite = {};
    this.OwnedClass_MediaObject = {};
    this.OwnedClass_AnimatorGroup = {};
    this.OwnedClass_Animator = {};
    this.OwnedClass_Keyframe = {};
  }
}

export class Composite {
  Composite_ID: string;
  Composite_Name: string;
  OwnedID_MediaObject: Array<string>;
  Composite_Mode: string;
  Composite_Duration: number; //コンポジットの長さ
  constructor(send_Composite_ID: string, send_Composite_Name: string, send_Composite_Mode: string) {
    this.Composite_ID = send_Composite_ID;
    this.Composite_Name = send_Composite_Name;
    this.OwnedID_MediaObject = [];
    this.Composite_Mode = send_Composite_Mode;
    this.Composite_Duration = 3000;
  }
}

export class MediaObject {
  MediaObject_ID: string;
  MediaObject_StartTime: number;
  MediaObject_EndTime: number;
  MediaObject_LayerNumber: number;
  MediaObject_Color: Array<number>;
  OwnedID_AnimatorGroup: Array<string>;
  animatorOpen: boolean;
  sourceSpecies: buildSourceSpecies.SourceSpeciesClass;

  constructor(send_MediaObject_ID: string, send_sourceSpecies: buildSourceSpecies.SourceSpeciesClass) {
    this.MediaObject_ID = send_MediaObject_ID;
    this.MediaObject_StartTime = 500;
    this.MediaObject_EndTime = 750;
    this.MediaObject_LayerNumber = 0;
    this.OwnedID_AnimatorGroup = [];
    this.animatorOpen = true;
    this.sourceSpecies = send_sourceSpecies;
    this.MediaObject_Color = [50, 150, 50];
  }
}

export class AnimatorGroup {
  AnimatorGroup_ID: string;
  OwnedID_Animator: Array<string>;
  AnimatorGroup_Type: string;
  constructor(send_Animator_ID: string, send_AnimatorGroup_Type: string) {
    this.AnimatorGroup_ID = send_Animator_ID;
    this.OwnedID_Animator = [];
    this.AnimatorGroup_Type = send_AnimatorGroup_Type;
  }
}

export class Animator {
  Animator_ID: string;
  OwnedID_Keyframe: Array<string>;
  constructor(send_Animator_ID: string) {
    this.Animator_ID = send_Animator_ID;
    this.OwnedID_Keyframe = [];
  }
}

export class Keyframe {
  Keyframe_ID: string;
  Keyframe_AbsoluteTime: number;
  constructor(send_Keyframe_ID: string) {
    this.Keyframe_ID = send_Keyframe_ID;
    this.Keyframe_AbsoluteTime = 500;
  }
}
