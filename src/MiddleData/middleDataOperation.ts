// const middleDataClass = require("./middleDataClass") as any;
import * as middleDataClass from "./middleDataClass";
import UUID from "uuidjs";

const getUUID = () => {
  return String(UUID.generate());
};

const hasKeyFound = (key: string, dict: any) => {
  //keyが存在していたらtrue それ以外ならfalse
  return dict[key] !== undefined;
};

export default class MiddleDataOperation {
  DataCentral: middleDataClass.DataCentral;
  toolBars: Array<Array<Function>>;
  constructor() {
    this.DataCentral = null;
  }

  existenceInquiryDataCentral = () => {
    //DataCentralが生成されているか参照する
    return this.DataCentral !== null;
  };

  createDataCentral = (projectName: string = getUUID()) => {
    this.DataCentral = new middleDataClass.DataCentral(projectName);
  };

  createComposite = () => {
    const newID = "Composite_" + getUUID();
    const newObj = new middleDataClass.Composite(newID, "test_composite");
    this.DataCentral.OwnedClass_Composite[newID] = newObj;
    // this.linkComposite(newID)
    return newID;
  };

  createMediaObject = () => {
    const newID = "MediaObject_" + getUUID();
    const newObj = new middleDataClass.MediaObject(newID);
    this.DataCentral.OwnedClass_MediaObject[newID] = newObj;
    return newID;
  };

  createAnimator = () => {
    const newID = "Animator_" + getUUID();
    const newObj = new middleDataClass.Animator(newID);
    this.DataCentral.OwnedClass_Animator[newID] = newObj;
    return newID;
  };

  createKeyframe = () => {
    const newID = "Keyframe_" + getUUID();
    const newObj = new middleDataClass.Keyframe(newID);
    this.DataCentral.OwnedClass_Keyframe[newID] = newObj;
    return newID;
  };

  // linkComposite = (compositeID: string) => {
  //   this.DataCentral.OwnedClass_Composite.push(
  //     compositeID
  //   );
  // };
  linkMediaObject = (compositeID: string, mediaObjectID: string) => {
    this.DataCentral.OwnedClass_Composite[compositeID].OwnedID_MediaObject.push(
      mediaObjectID
    );
  };
  linkAnimator = (mediaObjectID: string, animatorID: string) => {
    this.DataCentral.OwnedClass_MediaObject[
      mediaObjectID
    ].OwnedID_Animator.push(animatorID);
  };
  linkKeyframe = (animatorID: string, keyframeID: string) => {
    this.DataCentral.OwnedClass_Animator[animatorID].OwnedID_Keyframe.push(
      keyframeID
    );
  };

  operationMediaObjectTime = (sendData: any) => {
    const mediaObjectID = sendData["mediaObjectID"];

    if (!hasKeyFound("mediaObjectID", sendData)) {
      // console.log("notFound mediaObjectID");
      return;
    }
    if (hasKeyFound("sta", sendData)) {
      this.DataCentral.OwnedClass_MediaObject[
        mediaObjectID
      ].MediaObject_StartTime = sendData["sta"];
    }
    if (hasKeyFound("end", sendData)) {
      this.DataCentral.OwnedClass_MediaObject[
        mediaObjectID
      ].MediaObject_EndTime = sendData["end"];
    }
  };
  operationKeyframeTime = (sendData: any) => {

    const KeyframeID = sendData["KeyframeID"];

    // console.log("operationKeyframeTime - 1",  this.DataCentral.OwnedClass_Keyframe,this.DataCentral.OwnedClass_Keyframe[KeyframeID],KeyframeID);

    if (!hasKeyFound("KeyframeID", sendData)) {
      // console.log("notFound KeyframeID");
      return;
    }
    if (hasKeyFound("time", sendData)) {
      this.DataCentral.OwnedClass_Keyframe[KeyframeID].Keyframe_AbsoluteTime =
        sendData["time"];
    }

    // console.log("operationKeyframeTime - 2", this.DataCentral.OwnedClass_Keyframe[KeyframeID]);
  };

  getOwnedID_Composite = () => {
    // console.log("md",this.DataCentral.OwnedClass_Composite[compositeID].OwnedID_MediaObject)
    return Object.assign(Object.keys(this.DataCentral.OwnedClass_Composite));
  };

  getOwnedID_MediaObject = (compositeID: string) => {
    // console.log("md",this.DataCentral.OwnedClass_Composite[compositeID].OwnedID_MediaObject)

    let returnData = [];
    if (hasKeyFound(compositeID, this.DataCentral.OwnedClass_Composite)) {
      returnData = Object.assign(
        this.DataCentral.OwnedClass_Composite[compositeID].OwnedID_MediaObject
      );
    }
    return returnData;
  };

  getOwnedID_Animator = (mediaObjectID: string) => {
    return Object.assign(
      this.DataCentral.OwnedClass_MediaObject[mediaObjectID].OwnedID_Animator
    );
  };

  getOwnedID_Keyframe = (animatorID: string) => {
    return Object.assign(
      this.DataCentral.OwnedClass_Animator[animatorID].OwnedID_Keyframe
    );
  };

  getMediaObject_time = (mediaObjectID: string) =>{

    return [
      this.DataCentral.OwnedClass_MediaObject[mediaObjectID].MediaObject_StartTime,
      this.DataCentral.OwnedClass_MediaObject[mediaObjectID].MediaObject_EndTime
    ]
  }

  getKeyframe_time = (keyframeID: string) =>{
    return this.DataCentral.OwnedClass_Keyframe[keyframeID].Keyframe_AbsoluteTime
  }

  copyMediaObject = () => {};
  copyAnimator = () => {};
  copyKeyframe = () => {};

  deleteMediaObject = () => {};
  deleteAnimator = () => {};
  deleteKeyframe = () => {};

  layerMaximum = (compositeID: string) => {
    const targetMediaObjectLengh =
      this.DataCentral.OwnedClass_Composite[compositeID].OwnedID_MediaObject
        .length;

    // const nowMax = 0;

    // for (let i = 0; i < targetMediaObjectLengh ;i++ )
    // {
    //   MediaObjectValue[i]
    // }
  };
  layerNormalization = (compositeID: string) => {
    //たぶん計算量がn^2ぐらいになりそう
  };
}

//ユーザー操作をEdit
//コンピューター操作をoperation
