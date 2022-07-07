
const htmlText = require('./../buildFormat/htmlFormat.html')["default"];

//require('raw-loader!./input.txt');

const htmlBuildMain = (jsonDataCentral:any,compositeID:string) => {
    const OwnedClass_Composite = jsonDataCentral["OwnedClass_Composite"]
    const OwnedClass_MediaObject = jsonDataCentral["OwnedClass_MediaObject"]
    const OwnedClass_Animator = jsonDataCentral["OwnedClass_Animator"]
    const OwnedClass_Keyframe = jsonDataCentral["OwnedClass_Keyframe"]

    console.table(OwnedClass_Composite)
    console.table(OwnedClass_MediaObject)
    console.table(OwnedClass_Animator)
    console.table(OwnedClass_Keyframe)

    return htmlText
}

export default htmlBuildMain