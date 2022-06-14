
const jsonFormat_DataCentral = require("/src/json_format/DataCentral.json") as any;
const jsonFormat_Composite = require("/src/json_format/Composite.json") as any;
const jsonFormat_Keyframe = require("/src/json_format/Keyframe.json") as any;
const jsonFormat_MediaObject = require("/src/json_format/MediaObject.json") as any;
const jsonFormat_Property = require("/src/json_format/MediaObject.json") as any;

import UUID from "uuidjs";

let DataCentral = null;

const CreateDataCentral = (projectName:string) => {
    DataCentral = Object.assign(jsonFormat_DataCentral)
}

const CreateComposite = () => {
    
}

const CreateKeyframe = () => {
    
}

const CreateMediaObject = () => {
    
}

const CreateProperty = () => {
    
}

export const TestSetup = () => {
    console.table(jsonFormat_DataCentral)
    console.table(jsonFormat_Composite)
    console.table(jsonFormat_Keyframe)
    console.table(jsonFormat_MediaObject)
    console.table(jsonFormat_Property)
}