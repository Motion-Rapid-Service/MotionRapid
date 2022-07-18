// const middleDataClass = require("./middleDataClass") as any;
import * as middleDataClass from "./middleDataClass";
import UUID from "uuidjs";

import htmlBuildMain from "../BuildSite/buildHTML/buildHtmlMain";

import * as buildSourceType from "./../BuildSite/buildHTML/buildSourceType";

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

  createComposite = (compositeName: string, compositeMode: string) => {
    const newID = "Composite_" + getUUID();
    const newObj = new middleDataClass.Composite(
      newID,
      compositeName,
      compositeMode
      // middleDataClass.Composite_Mode[1]
    );
    console.log("newObj", newObj);
    this.DataCentral.OwnedClass_Composite[newID] = newObj;
    // this.linkComposite(newID)
    return newID;
  };

  createMediaObject = (sourceType: buildSourceType.SourceTypeClass) => {
    const newID = "MediaObject_" + getUUID();
    const newObj = new middleDataClass.MediaObject(newID, sourceType);
    this.DataCentral.OwnedClass_MediaObject[newID] = newObj;
    return newID;
  };

  createAnimatorGroup = () => {
    const newID = "AnimatorGroup_" + getUUID();
    const newObj = new middleDataClass.AnimatorGroup(newID);
    this.DataCentral.OwnedClass_AnimatorGroup[newID] = newObj;
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
  linkAnimatorGroup = (mediaObjectID: string, animatorGroupID: string) => {
    this.DataCentral.OwnedClass_MediaObject[
      mediaObjectID
    ].OwnedID_AnimatorGroup.push(animatorGroupID);
  };

  linkAnimator = (animatorGroupID: string, animatorID: string) => {
    this.DataCentral.OwnedClass_AnimatorGroup[
      animatorGroupID
    ].OwnedID_Animator.push(animatorID);
  };
  linkKeyframe = (animatorID: string, keyframeID: string) => {
    this.DataCentral.OwnedClass_Animator[animatorID].OwnedID_Keyframe.push(
      keyframeID
    );
  };

  swopMediaObject = (
    compositeID: string,
    swopSubject: number,
    swopInsertion: number
  ) => {
    //compositeID : 対象コンポジットID
    //swopSubject : スワップ対象
    //swopInsertion : 挿入先

    const swopOwnedID_MediaObject = Object.assign(
      this.DataCentral.OwnedClass_Composite[compositeID].OwnedID_MediaObject
    );

    const swopID = swopOwnedID_MediaObject[swopSubject];

    swopOwnedID_MediaObject[swopSubject] = "not";
    swopOwnedID_MediaObject.splice(swopInsertion, 0, swopID);

    for (let i = 0; i < swopOwnedID_MediaObject.length; i++) {
      if (swopOwnedID_MediaObject[i] == "not") {
        const beforeSwopOwnedID_MediaObject = swopOwnedID_MediaObject.splice(
          i,
          1
        );

        continue;
      }
    }

    // const swopID = this.DataCentral.OwnedClass_Composite[compositeID].OwnedID_MediaObject[swopSubject]
    // this.DataCentral.OwnedClass_Composite[compositeID].OwnedID_MediaObject[swopSubject] = null

    // arr.splice(2, 0, 'AAA', 'BBB', 'CCC');
  };

  operationMediaObjectTime = (sendData: any) => {
    const mediaObjectID = sendData["mediaObjectID"];

    if (!hasKeyFound("mediaObjectID", sendData)) {
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

    if (!hasKeyFound("KeyframeID", sendData)) {
      return;
    }
    if (hasKeyFound("time", sendData)) {
      this.DataCentral.OwnedClass_Keyframe[KeyframeID].Keyframe_AbsoluteTime =
        sendData["time"];
    }
  };

  getOwnedID_Composite = () => {
    return Object.assign(Object.keys(this.DataCentral.OwnedClass_Composite));
  };

  getOwnedID_MediaObject = (compositeID: string) => {
    let returnData = [];
    if (hasKeyFound(compositeID, this.DataCentral.OwnedClass_Composite)) {
      returnData = Object.assign(
        this.DataCentral.OwnedClass_Composite[compositeID].OwnedID_MediaObject
      );
    }
    return returnData;
  };

  getOwnedID_AnimatorGroup = (mediaObjectID: string) => {
    return Object.assign(
      this.DataCentral.OwnedClass_MediaObject[mediaObjectID]
        .OwnedID_AnimatorGroup
    );
  };

  getOwnedID_Animator = (animatorGroup: string) => {
    return Object.assign(
      this.DataCentral.OwnedClass_AnimatorGroup[animatorGroup].OwnedID_Animator
    );
  };

  getOwnedID_Keyframe = (animatorID: string) => {
    return Object.assign(
      this.DataCentral.OwnedClass_Animator[animatorID].OwnedID_Keyframe
    );
  };

  getOwnedClassComposite = (compositeID: string) => {
    return Object.assign(this.DataCentral.OwnedClass_Composite[compositeID]);
  };
  getOwnedClassMediaObject = (mediaObjectID: string) => {
    return Object.assign(
      this.DataCentral.OwnedClass_MediaObject[mediaObjectID]
    );
  };
  getOwnedClassAnimatorGroup = (animatorGroupID: string) => {
    return Object.assign(
      this.DataCentral.OwnedClass_AnimatorGroup[animatorGroupID]
    );
  };

  getOwnedClassAnimator = (animatorID: string) => {
    return Object.assign(this.DataCentral.OwnedClass_Animator[animatorID]);
  };
  getOwnedClassKeyframe = (keyframeID: string) => {
    return Object.assign(this.DataCentral.OwnedClass_Keyframe[keyframeID]);
  };

  getMediaObjectTime = (mediaObjectID: string) => {
    return [
      this.DataCentral.OwnedClass_MediaObject[mediaObjectID]
        .MediaObject_StartTime,
      this.DataCentral.OwnedClass_MediaObject[mediaObjectID]
        .MediaObject_EndTime,
    ];
  };

  getMediaObjectSourceType = (mediaObjectID: string) => {
    return this.DataCentral.OwnedClass_MediaObject[mediaObjectID].sourceType;
  };

  getKeyframeTime = (keyframeID: string) => {
    const Keyframe_AbsoluteTime =
      this.DataCentral.OwnedClass_Keyframe[keyframeID].Keyframe_AbsoluteTime;

    return Keyframe_AbsoluteTime;
  };

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

  fileExportCommon = (
    jsonData: any,
    fileName: string,
    typeText: string,
    extension: string
  ) => {
    //typeについてhttps://asahi-net.jp/support/guide/homepage/0017.html
    const blob = new Blob([jsonData], { type: typeText });
    const aTag = document.createElement("a");
    aTag.href = URL.createObjectURL(blob);
    aTag.target = "_blank";
    aTag.download = fileName + "." + extension;
    aTag.click();
    URL.revokeObjectURL(aTag.href);
  };
  fileExportDataCentral = () => {
    const jsonDataCentral = JSON.stringify(this.DataCentral, null, "\t");
    this.fileExportCommon(
      jsonDataCentral,
      "DataCentralFile",
      "application/json",
      "json"
    );
  };
  fileExportComposite = (CompositeID: string) => {
    const Composite = this.DataCentral.OwnedClass_Composite[CompositeID];
    const jsonComposite = JSON.stringify(Composite, null, "\t");
    this.fileExportCommon(
      jsonComposite,
      CompositeID + "File",
      "application/json",
      "json"
    );
  };
  buildMiddleDataHtml = (CompositeID: string) => {
    const jsonData = JSON.parse(JSON.stringify(this.DataCentral, null, "\t"));
    const jsonSyntaxHtml = htmlBuildMain(jsonData, CompositeID);
    this.fileExportCommon(
      jsonSyntaxHtml,
      CompositeID + "html",
      "text/html",
      "html"
    );
  };
  rewriteMediaObejctAnimatorOpen = (
    mediaObjectID: string,
    openBool: boolean
  ) => {
    this.DataCentral.OwnedClass_MediaObject[mediaObjectID].animatorOpen =
      openBool;
  };
  getMediaObejctAnimatorOpen = (mediaObjectID: string) => {
    const retemp: boolean =
      this.DataCentral.OwnedClass_MediaObject[mediaObjectID].animatorOpen;
    return retemp;
  };
}

//ユーザー操作をEdit
//コンピューター操作をoperation
