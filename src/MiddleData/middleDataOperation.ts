// const middleDataClass = require("./middleDataClass") as any;
import * as middleDataClass from "./middleDataClass";
import UUID from "uuidjs";

const getUUID = () => {
  return String(UUID.generate());
};

const judgeKeyFound = (key: string, dict: any) => {
  //keyが存在していたらtrue それ以外ならfalse
  return dict[key] !== undefined;
};

export default class MiddleDataOperation {
  DataCentral: any;
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
    const newID = getUUID();
    const newObj = new middleDataClass.Composite(newID, "test_composite");
    this.DataCentral.OwnedClass_Composite[newID] = newObj;
  };

  createMediaObject = () => {
    const newID = getUUID();
    const newObj = new middleDataClass.MediaObject(newID);
    this.DataCentral.OwnedClass_MediaObject[newID] = newObj;
  };

  createKeyframe = () => {
    const newID = getUUID();
    const newObj = new middleDataClass.Keyframe(newID);
    this.DataCentral.OwnedClass_Keyframe[newID] = newObj;
  };

  createProperty = () => {
    const newID = getUUID();
    const newObj = new middleDataClass.Property(newID);
    this.DataCentral.OwnedClass_Property[newID] = newObj;
  };

  linkMediaObject = (compositeID: string, mediaObjectID: string) => {
    this.DataCentral.OwnedClass_Composite[compositeID].OwnedID_MediaObject.push(
      mediaObjectID
    );
  };
  linkProperty = (mediaObjectID: string, propertyID: string) => {
    this.DataCentral.OwnedClass_MediaObject[
      mediaObjectID
    ].OwnedID_Property.push(propertyID);
  };
  linkKeyframe = (propertyID: string, keyframeID: string) => {
    this.DataCentral.OwnedClass_Property[propertyID].OwnedID_Keyframe.push(
      keyframeID
    );
  };

  operationMediaObjectTime = (sendData: any) => {
    const mediaObjectID = sendData["mediaObjectID"];
    console.log(sendData);

    if (!judgeKeyFound("mediaObjectID", sendData)){
      console.log("notFound mediaObjectID")
      return
    }

    if (judgeKeyFound("sta", sendData)) {
      this.DataCentral.OwnedClass_MediaObject[
        mediaObjectID
      ].MediaObject_StartTime = sendData["sta"];
      console.log("sta");
    }
    if (judgeKeyFound("end", sendData)) {
      this.DataCentral.OwnedClass_MediaObject[
        mediaObjectID
      ].MediaObject_EndTime = sendData["end"];
      console.log("end");
    }

    console.log(this.DataCentral);
  };

  getOwnedID_MediaObject = (compositeID: string) => {
    // console.log("md",this.DataCentral.OwnedClass_Composite[compositeID].OwnedID_MediaObject)
    return Object.assign(
      this.DataCentral.OwnedClass_Composite[compositeID].OwnedID_MediaObject
    );
  };

  getOwnedID_Property = (mediaObjectID: string) => {
    return Object.assign(
      this.DataCentral.OwnedClass_MediaObject[mediaObjectID].OwnedID_Property
    );
  };

  getOwnedID_Keyframe = (propertyID: string) => {
    return Object.assign(
      this.DataCentral.OwnedClass_Property[propertyID].OwnedID_Keyframe
    );
  };

  copyMediaObject = () => {};
  copyKeyframe = () => {};
  copyProperty = () => {};

  deleteMediaObject = () => {};
  deleteKeyframe = () => {};
  deleteProperty = () => {};

  layerMaximum = (compositeID: string) => {
    const targetMediaObjectLengh =
      this.DataCentral.OwnedClass_Composite[compositeID].OwnedID_MediaObject
        .lengh;

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
