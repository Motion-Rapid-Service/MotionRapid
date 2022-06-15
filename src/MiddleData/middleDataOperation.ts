const middleDataClass = require("./middleDataClass") as any;
import UUID from "uuidjs";

const getUUID = () => {
  return String(UUID.generate())
}

export class MiddleDataOperation {
  DataCentral: any;
  constructor() {
    this.DataCentral = null;
  }

  existenceInquiryDataCentral = () =>{ //DataCentralが生成されているか参照する
    return this.DataCentral !== null
  }

  createDataCentral = (projectName: string = getUUID()) => {
    this.DataCentral = new middleDataClass(projectName);
  };

  createComposite = () => {
    const newID  = getUUID();
    const newObj = new middleDataClass.Composite(newID,"test_composite");
    this.DataCentral.OwnedClass_Composite.push(newObj);
  };

  createMediaObject = () => {
    const newID  = getUUID();
    const newObj = new middleDataClass.MediaObject(newID);
    this.DataCentral.OwnedClass_MediaObject.push(newObj);
  };

  createKeyframe = () => {
    const newID  = getUUID();
    const newObj = new middleDataClass.Keyframe(newID);
    this.DataCentral.OwnedClass_Keyframe.push(newObj);
  };

  createProperty = () => {
    const newID  = getUUID();
    const newObj = new middleDataClass.Property(newID);
    this.DataCentral.OwnedClass_Property.push(newObj);
  };

  linkMediaObject  = () => {

  }
  linkKeyframe  = () => {
    
  }
  linkProperty  = () => {
    
  }
}
