// const middleDataClass = require("./middleDataClass") as any;
import * as middleDataClass from "./middleDataClass"
import UUID from "uuidjs";

const getUUID = () => {
  return String(UUID.generate());
};

export class MiddleDataOperation {
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

  linkMediaObject = (compositeID:string,mediaObjectID:string) => {
    this.DataCentral.OwnedClass_Composite[compositeID].OwnedID_MediaObject.push(mediaObjectID)
  };
  linkProperty = (mediaObjectID:string,propertyID:string) => {
    this.DataCentral.OwnedClass_MediaObject[mediaObjectID].OwnedID_Property.push(propertyID)
  };
  linkKeyframe = (propertyID:string,keyframeID:string) => {
    this.DataCentral.OwnedClass_Property[propertyID].OwnedID_Keyframe.push(keyframeID)
  };

  copyMediaObject = () => {};
  copyKeyframe = () => {};
  copyProperty = () => {};

  deleteMediaObject = () => {};
  deleteKeyframe = () => {};
  deleteProperty = () => {};

  layerMaximum = (compositeID:string) => {
    const targetMediaObjectLengh = this.DataCentral.OwnedClass_Composite[compositeID].OwnedID_MediaObject.lengh

    // const nowMax = 0;

    // for (let i = 0; i < targetMediaObjectLengh ;i++ )
    // {
    //   MediaObjectValue[i]
    // }
  }
  layerNormalization = (compositeID:string) => { //たぶん計算量がn^2ぐらいになりそう
    
  }
}
