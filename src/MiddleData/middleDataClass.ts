export class DataCentral {
  OwnedClass_Composite: { [name: string]: Composite };
  OwnedClass_MediaObject: { [name: string]: MediaObject };
  OwnedClass_Animator: { [name: string]: Animator };
  OwnedClass_Keyframe: { [name: string]: Keyframe };
  projectName: string;

  constructor(send_projectName: string) {
    // this.Composite = null;
    // this.MediaObject = null;
    this.projectName = send_projectName;
    this.OwnedClass_Composite = {};
    this.OwnedClass_MediaObject = {};
    this.OwnedClass_Animator = {};
    this.OwnedClass_Keyframe = {};
  }
}

export class Composite {
  Composite_ID: string;
  Composite_Name: string;
  OwnedID_MediaObject: Array<string>;
  constructor(send_Composite_ID: string, send_Composite_Name: string) {
    this.Composite_ID = send_Composite_ID;
    this.Composite_Name = send_Composite_Name;
    this.OwnedID_MediaObject = [];
  }
}

export class MediaObject {
  MediaObject_ID: string;
  MediaObject_StartTime: number;
  MediaObject_EndTime: number;
  MediaObject_LayerNumber: number;
  OwnedID_Animator: Array<string>;
  constructor(send_MediaObject_ID: string) {
    this.MediaObject_ID = send_MediaObject_ID;
    this.MediaObject_StartTime = 0;
    this.MediaObject_EndTime = 0;
    this.MediaObject_LayerNumber = 0;
    this.OwnedID_Animator = [];
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
    this.Keyframe_AbsoluteTime = 0;
  }
}
