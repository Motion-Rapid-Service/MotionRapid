// const middleDataClass = require("./middleDataClass") as any;
import * as middleDataClass from "./middleDataClass";
import UUID from "uuidjs";

import htmlBuildMain from "../BuildSite/buildHTML/buildHtmlMain";
import CSSBuildMain from "../BuildSite/buildCSS/buildCSSMain";

import * as BuildSourceSpecies from "../BuildSite/buildHTML/buildSourceSpecies";
import * as AnimatorGroupFormat from "./../AnimatorGroupFormat/AnimatorGroupFormat";
import * as AnimatorGroupPropertyFormat from "./../AnimatorGroupFormat/AnimatorGroupPropertyFormat";

import * as MiddleDataOperationType from "./middleDataOperationType";

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

  getDataCentral = () => {
    const jsonData = JSON.parse(JSON.stringify(this.DataCentral, null, "\t"));
    return jsonData;
  };

  replaceDataCentral = (jsonDataCentral: any) => {
    this.DataCentral = JSON.parse(JSON.stringify(jsonDataCentral));
  };

  createComposite = (
    compositeName: string = "CompositeName_" + getUUID(),
    compositeHorizontalMode: string = middleDataClass.Composite_HorizontalMode[0],
    compositeLocationMode: string = middleDataClass.Composite_LocationMode[0],
    composite_Width: number = 0,
    composite_WidthUnit: string = "px",
    composite_Height: number = 0,
    composite_HeightUnit: string = "px"
  ) => {
    const newID = "Composite_" + getUUID();
    const newObj = new middleDataClass.Composite(
      newID,
      compositeName,
      compositeHorizontalMode,
      compositeLocationMode,

      composite_Width,
      composite_WidthUnit,
      composite_Height,
      composite_HeightUnit

      // middleDataClass.Composite_HorizontalMode[1]
    );
    console.log("newObj", newObj);
    this.DataCentral.OwnedClass_Composite[newID] = newObj;
    // this.linkComposite(newID)
    return newID;
  };

  createMediaObject = (sourceSpeciesClass: BuildSourceSpecies.SourceSpeciesClass) => {
    const newID = "MediaObject_" + getUUID();
    const newName = "メディアオブジェクト" + Object.keys(this.DataCentral.OwnedClass_MediaObject).length;
    const newObj = new middleDataClass.MediaObject(newID, newName, sourceSpeciesClass);
    this.DataCentral.OwnedClass_MediaObject[newID] = newObj;
    return newID;
  };

  createAnimatorGroup = (animatorGroupSpecies: string) => {
    const newID = "AnimatorGroup_" + getUUID();
    const newObj = new middleDataClass.AnimatorGroup(newID, animatorGroupSpecies);
    this.DataCentral.OwnedClass_AnimatorGroup[newID] = newObj;
    return newID;
  };

  createAnimator = (propertySpecies: string) => {
    const newID = "Animator_" + getUUID();
    const newObj = new middleDataClass.Animator(newID, propertySpecies);
    this.DataCentral.OwnedClass_Animator[newID] = newObj;
    return newID;
  };

  createKeyframe = () => {
    const newID = "Keyframe_" + getUUID();
    const newObj = new middleDataClass.Keyframe(newID);
    this.DataCentral.OwnedClass_Keyframe[newID] = newObj;
    return newID;
  };

  createCSSProperty = () => {
    const newID = "CSSProperty_" + getUUID();
    const newObj = new middleDataClass.CSSProperty(newID);
    this.DataCentral.OwnedClass_CSSProperty[newID] = newObj;
    return newID;
  };

  copyMediaObject = (mediaObjectID: string, AfterCompositeID: string) => {
    const oldMediaObjectClass = this.DataCentral.OwnedClass_MediaObject[mediaObjectID];
    const newMediaObjectClass: middleDataClass.MediaObject = JSON.parse(JSON.stringify(oldMediaObjectClass, null, "\t"));

    const newIDmediaObjectID = "md_MediaObject_" + getUUID();
    newMediaObjectClass.MediaObject_ID = newIDmediaObjectID;
    this.DataCentral.OwnedClass_MediaObject[newIDmediaObjectID] = newMediaObjectClass;

    console.log(newIDmediaObjectID);

    for (let an = 0; an < newMediaObjectClass.OwnedID_AnimatorGroup.length; an++) {
      const oldAnimatorGroupClass = this.DataCentral.OwnedClass_AnimatorGroup[newMediaObjectClass.OwnedID_AnimatorGroup[an]];
      const newAnimatorGroupClass: middleDataClass.AnimatorGroup = JSON.parse(JSON.stringify(oldAnimatorGroupClass, null, "\t"));
      const newIDAnimatorGroup = "an_AnimatorGroup_" + getUUID();

      newMediaObjectClass.OwnedID_AnimatorGroup[an] = newIDAnimatorGroup;
      newAnimatorGroupClass.AnimatorGroup_ID = newIDAnimatorGroup;
      this.DataCentral.OwnedClass_AnimatorGroup[newIDAnimatorGroup] = newAnimatorGroupClass;

      for (let ai = 0; ai < newAnimatorGroupClass.OwnedID_Animator.length; ai++) {
        const oldAnimatorClass = this.DataCentral.OwnedClass_Animator[newAnimatorGroupClass.OwnedID_Animator[ai]];
        const newAnimatorClass: middleDataClass.Animator = JSON.parse(JSON.stringify(oldAnimatorClass, null, "\t"));
        const newIDAnimator = "ai_Animator_" + getUUID();

        this.DataCentral.OwnedClass_AnimatorGroup[newIDAnimatorGroup].OwnedID_Animator[ai] = newIDAnimator;
        newAnimatorClass.Animator_ID = newIDAnimator;
        this.DataCentral.OwnedClass_Animator[newIDAnimator] = newAnimatorClass;

        // for (let cpA = 0; cpA < newAnimatorClass.OwnedID_cssPropertyValue.length; cpA++) {
        //   console.log("OwnedID_cssPropertyValue", newAnimatorClass.OwnedID_cssPropertyValue, cpA);
        const oldCSSpropertyClass = this.DataCentral.OwnedClass_CSSProperty[newAnimatorClass.OwnedID_cssPropertyValue];
        const newCSSpropertyClass: middleDataClass.CSSProperty = JSON.parse(JSON.stringify(oldCSSpropertyClass, null, "\t"));
        const newIDCSSpropertyClass = "cpA_CSSProperty_" + getUUID();

        this.DataCentral.OwnedClass_Animator[newIDAnimator].OwnedID_cssPropertyValue = newIDCSSpropertyClass;
        newCSSpropertyClass.CSSProperty_ID = newIDCSSpropertyClass;
        this.DataCentral.OwnedClass_CSSProperty[newIDCSSpropertyClass] = newCSSpropertyClass;

        for (let kf = 0; kf < newAnimatorClass.OwnedID_Keyframe.length; kf++) {
          const oldKeyframeClass = this.DataCentral.OwnedClass_Keyframe[newAnimatorClass.OwnedID_Keyframe[kf]];
          const newKeyframeClass: middleDataClass.Keyframe = JSON.parse(JSON.stringify(oldKeyframeClass, null, "\t"));
          const newIDKeyframeClass = "kf_Keyframe_" + getUUID();

          this.DataCentral.OwnedClass_Animator[newIDAnimator].OwnedID_Keyframe[kf] = newIDKeyframeClass;
          newKeyframeClass.Keyframe_ID = newIDKeyframeClass;
          this.DataCentral.OwnedClass_Keyframe[newIDKeyframeClass] = JSON.parse(JSON.stringify(newKeyframeClass));

          //ここからcss-property
          console.log("Keyframe_AbsoluteTime A", this.DataCentral.OwnedClass_Keyframe[newIDKeyframeClass].Keyframe_AbsoluteTime);
          const oldCSSpropertyClass =
            this.DataCentral.OwnedClass_CSSProperty[this.DataCentral.OwnedClass_Keyframe[newIDKeyframeClass].OwnedID_cssPropertyValue];
          const newCSSpropertyClass: middleDataClass.CSSProperty = JSON.parse(JSON.stringify(oldCSSpropertyClass, null, "\t"));
          const newIDCSSpropertyClass = "cpB_CSSProperty_" + getUUID();

          this.DataCentral.OwnedClass_Keyframe[newIDKeyframeClass].OwnedID_cssPropertyValue = newIDCSSpropertyClass;
          newCSSpropertyClass.CSSProperty_ID = newIDCSSpropertyClass;

          this.DataCentral.OwnedClass_CSSProperty[newIDCSSpropertyClass] = newCSSpropertyClass;
          console.log("Keyframe_AbsoluteTime B", this.DataCentral.OwnedClass_Keyframe[newIDKeyframeClass].Keyframe_AbsoluteTime);
        }
      }
    }

    this.linkMediaObject(AfterCompositeID, newIDmediaObjectID);
  };

  setDataCentralMediaTable = (mediaID: string, mediaURL: string) => {
    this.DataCentral.DataCentral_MediaTable[mediaID] = mediaURL;
  };

  getDataCentralMediaTable = (mediaID: string) => {
    const mediaURL: string = this.DataCentral.DataCentral_MediaTable[mediaID];
    return mediaURL;
  };

  operationLinkAnimatorGroup = (animatorGroupID: string, newAnimatorGroupSpeciesPropertySpecies: string) => {
    //animatorgroupに新しい要素を適用したときに、アニメーターの追加も同時にする関数
    // const animatorGroupID = this.createAnimatorGroup(newAnimatorGroupSpecies); これはいらない

    const newAnimatorGroupSpeciesPropertyFormat: AnimatorGroupPropertyFormat.PropertyFormatSpecies =
      AnimatorGroupFormat.getAnimatorGroupFormatList(newAnimatorGroupSpeciesPropertySpecies);

    for (let clk in newAnimatorGroupSpeciesPropertyFormat.cssPropertySpeciesList) {
      //clk : cssPropertySpeciesListKey ( 混同しないようにあえてやくしてます )
      const cssPropertySpecies = newAnimatorGroupSpeciesPropertyFormat.cssPropertySpeciesList[clk]; //そのpropertyがどのようなものを求めているか
      const units: Array<string> = AnimatorGroupPropertyFormat.cssValueUnit[cssPropertySpecies];

      const newAnimatorID = this.operationCreateAnimator(clk);
      this.linkAnimator(animatorGroupID, newAnimatorID);

      const CSSProperty_ID = this.getOwnedID_CSSPropertySpeciesHasAnimator(newAnimatorID);

      const unitSendData: MiddleDataOperationType.OoperationCSSPropertyUnitType = {
        CSSPropertyID: CSSProperty_ID,
        CSSPropertyUnit: units[0],
      };

      this.operationCSSPropertyUnit(unitSendData);
    }
  };

  operationCreateAnimator = (propertySpecies: string) => {
    const aniID = this.createAnimator(propertySpecies);
    const cssID = this.createCSSProperty();
    this.linkCSSPropertyHasAnimator(aniID, cssID);

    return aniID;
  };

  operationCreateKeyframe = () => {
    const keyID = this.createKeyframe();
    const cssID = this.createCSSProperty();
    this.linkCSSPropertyHasKeyframe(keyID, cssID);

    return keyID;
  };

  operationMediaObjectSourceSpeciesClass = (mediaObjectID: string, sourceSpeciesClass: BuildSourceSpecies.SourceSpeciesClass) => {
    this.DataCentral.OwnedClass_MediaObject[mediaObjectID].MediaObject_SourceSpecies = sourceSpeciesClass;
  };

  linkMediaObject = (compositeID: string, mediaObjectID: string) => {
    this.DataCentral.OwnedClass_Composite[compositeID].OwnedID_MediaObject.push(mediaObjectID);
  };
  linkAnimatorGroup = (mediaObjectID: string, animatorGroupID: string) => {
    this.DataCentral.OwnedClass_MediaObject[mediaObjectID].OwnedID_AnimatorGroup.push(animatorGroupID);
  };

  linkAnimator = (animatorGroupID: string, animatorID: string) => {
    this.DataCentral.OwnedClass_AnimatorGroup[animatorGroupID].OwnedID_Animator.push(animatorID);
  };
  linkKeyframe = (animatorID: string, keyframeID: string) => {
    this.DataCentral.OwnedClass_Animator[animatorID].OwnedID_Keyframe.push(keyframeID);
  };
  linkCSSPropertyHasAnimator = (animatorID: string, CSSPropertySpeciesValueID: string) => {
    this.DataCentral.OwnedClass_Animator[animatorID].OwnedID_cssPropertyValue = CSSPropertySpeciesValueID;
  };
  linkCSSPropertyHasKeyframe = (keyframeID: string, CSSPropertySpeciesValueID: string) => {
    this.DataCentral.OwnedClass_Keyframe[keyframeID].OwnedID_cssPropertyValue = CSSPropertySpeciesValueID;
  };
  swopMediaObject = (compositeID: string, swopSubject: number, swopInsertion: number) => {
    //compositeID : 対象コンポジットID
    //swopSubject : スワップ対象
    //swopInsertion : 挿入先

    const swopOwnedID_MediaObject = Object.assign(this.DataCentral.OwnedClass_Composite[compositeID].OwnedID_MediaObject);

    const swopID = swopOwnedID_MediaObject[swopSubject];

    swopOwnedID_MediaObject[swopSubject] = "notExist";
    swopOwnedID_MediaObject.splice(swopInsertion, 0, swopID);

    for (let i = 0; i < swopOwnedID_MediaObject.length; i++) {
      if (swopOwnedID_MediaObject[i] == "notExist") {
        const beforeSwopOwnedID_MediaObject = swopOwnedID_MediaObject.splice(i, 1);
        continue;
      }
    }
  };

  operationMediaObjectTime = (sendData: any) => {
    const mediaObjectID = sendData["mediaObjectID"];

    if (!hasKeyFound("mediaObjectID", sendData)) {
      return;
    }
    if (hasKeyFound("sta", sendData)) {
      this.DataCentral.OwnedClass_MediaObject[mediaObjectID].MediaObject_StartTime = sendData["sta"];
    }
    if (hasKeyFound("end", sendData)) {
      this.DataCentral.OwnedClass_MediaObject[mediaObjectID].MediaObject_EndTime = sendData["end"];
    }
  };
  operationKeyframeTime = (sendData: MiddleDataOperationType.OperationKeyframeTimeType) => {
    const KeyframeID = sendData["KeyframeID"];

    this.DataCentral.OwnedClass_Keyframe[KeyframeID].Keyframe_AbsoluteTime = sendData["time"];
  };

  operationCSSPropertyValue = (sendData: MiddleDataOperationType.OoperationCSSPropertyValueType) => {
    this.DataCentral.OwnedClass_CSSProperty[sendData.CSSPropertyID].CSSProperty_Value = sendData.CSSPropertyValue;
  };
  operationCSSPropertyUnit = (sendData: MiddleDataOperationType.OoperationCSSPropertyUnitType) => {
    this.DataCentral.OwnedClass_CSSProperty[sendData.CSSPropertyID].CSSProperty_Unit = sendData.CSSPropertyUnit;
  };

  getCSSPropertyValue = (CSSPropertyID: string) => {
    console.log("getCSSPropertyValue", this.DataCentral.OwnedClass_CSSProperty, CSSPropertyID);
    return this.DataCentral.OwnedClass_CSSProperty[CSSPropertyID].CSSProperty_Value;
  };
  getCSSPropertyUnit = (CSSPropertyID: string) => {
    console.log("getCSSPropertyUnit", this.DataCentral.OwnedClass_CSSProperty, CSSPropertyID);
    return this.DataCentral.OwnedClass_CSSProperty[CSSPropertyID].CSSProperty_Unit;
  };

  getMediaObejctCSSFixed = (MediaObejctID: string) => {
    console.log("getMediaObejctCSSFixed", this.DataCentral.OwnedClass_MediaObject, MediaObejctID);
    return this.DataCentral.OwnedClass_MediaObject[MediaObejctID].MediaObject_Fixed;
  };

  setMediaObejctCSSFixed = (MediaObejctID: string, flag = false) => {
    console.log("setMediaObejctCSSFixed", this.DataCentral.OwnedClass_MediaObject, MediaObejctID);
    return (this.DataCentral.OwnedClass_MediaObject[MediaObejctID].MediaObject_Fixed = flag);
  };

  getOwnedID_Composite = () => {
    return Object.assign(Object.keys(this.DataCentral.OwnedClass_Composite));
  };

  getOwnedID_MediaObject = (compositeID: string) => {
    let returnData = [];
    if (hasKeyFound(compositeID, this.DataCentral.OwnedClass_Composite)) {
      returnData = Object.assign(this.DataCentral.OwnedClass_Composite[compositeID].OwnedID_MediaObject);
    }
    return returnData;
  };

  getOwnedID_AnimatorGroup = (mediaObjectID: string) => {
    return Object.assign(this.DataCentral.OwnedClass_MediaObject[mediaObjectID].OwnedID_AnimatorGroup);
  };

  getOwnedID_Animator = (animatorGroup: string) => {
    return Object.assign(this.DataCentral.OwnedClass_AnimatorGroup[animatorGroup].OwnedID_Animator);
  };

  getOwnedID_Keyframe = (animatorID: string) => {
    return Object.assign(this.DataCentral.OwnedClass_Animator[animatorID].OwnedID_Keyframe);
  };

  getOwnedID_CSSPropertySpeciesHasAnimator = (animatorID: string) => {
    const thenAnimator: middleDataClass.Animator = Object.assign(this.DataCentral.OwnedClass_Animator[animatorID]);
    return thenAnimator.OwnedID_cssPropertyValue;
  };

  getOwnedID_CSSPropertySpeciesHasKeyframe = (keyframeID: string) => {
    const thenKeyframe: middleDataClass.Keyframe = Object.assign(this.DataCentral.OwnedClass_Keyframe[keyframeID]);
    return thenKeyframe.OwnedID_cssPropertyValue;
  };

  getOwnedClassComposite = (compositeID: string) => {
    return Object.assign(this.DataCentral.OwnedClass_Composite[compositeID]);
  };
  getOwnedClassMediaObject = (mediaObjectID: string) => {
    return Object.assign(this.DataCentral.OwnedClass_MediaObject[mediaObjectID]);
  };
  getOwnedClassAnimatorGroup = (animatorGroupID: string) => {
    return Object.assign(this.DataCentral.OwnedClass_AnimatorGroup[animatorGroupID]);
  };

  getOwnedClassAnimator = (animatorID: string) => {
    return Object.assign(this.DataCentral.OwnedClass_Animator[animatorID]);
  };
  getOwnedClassKeyframe = (keyframeID: string) => {
    return Object.assign(this.DataCentral.OwnedClass_Keyframe[keyframeID]);
  };

  getOwnedClassCSSPropertySpecies = (CSSPropertySpeciesID: string) => {
    return Object.assign(this.DataCentral.OwnedClass_CSSProperty[CSSPropertySpeciesID]);
  };

  getMediaObjectTime = (mediaObjectID: string) => {
    return [
      this.DataCentral.OwnedClass_MediaObject[mediaObjectID].MediaObject_StartTime,
      this.DataCentral.OwnedClass_MediaObject[mediaObjectID].MediaObject_EndTime,
    ];
  };

  getMediaObjectSourceSpecies = (mediaObjectID: string) => {
    if (!hasKeyFound(mediaObjectID, this.DataCentral.OwnedClass_MediaObject)) {
      return;
    }

    return this.DataCentral.OwnedClass_MediaObject[mediaObjectID].MediaObject_SourceSpecies;
  };

  getMediaObjectName = (mediaObjectID: string) => {
    if (!hasKeyFound(mediaObjectID, this.DataCentral.OwnedClass_MediaObject)) {
      return;
    }

    return this.DataCentral.OwnedClass_MediaObject[mediaObjectID].MediaObject_Name;
  };

  setMediaObjectName = (mediaObjectID: string, newName: string) => {
    if (!hasKeyFound(mediaObjectID, this.DataCentral.OwnedClass_MediaObject)) {
      return;
    }

    this.DataCentral.OwnedClass_MediaObject[mediaObjectID].MediaObject_Name = newName;
  };

  getMediaObjectColor = (mediaObjectID: string) => {
    if (!hasKeyFound(mediaObjectID, this.DataCentral.OwnedClass_MediaObject)) {
      return;
    }

    return this.DataCentral.OwnedClass_MediaObject[mediaObjectID].MediaObject_Color;
  };
  setMediaObjectColor = (mediaObjectID: string, color: Array<number>) => {
    this.DataCentral.OwnedClass_MediaObject[mediaObjectID].MediaObject_Color = color;
  };

  getCompositeHorizontalMode = (compositeID: string) => {
    if (!hasKeyFound(compositeID, this.DataCentral.OwnedClass_Composite)) {
      return "";
    }

    const thenComposite = this.DataCentral.OwnedClass_Composite[compositeID];
    //console.log("thenComposite", thenComposite);
    return thenComposite.Composite_HorizontalMode;
  };
  getCompositeLocationMode = (compositeID: string) => {
    if (!hasKeyFound(compositeID, this.DataCentral.OwnedClass_Composite)) {
      return "";
    }

    const thenComposite = this.DataCentral.OwnedClass_Composite[compositeID];
    //console.log("thenComposite", thenComposite);

    return thenComposite.Composite_LocationMode;
  };

  getCompositeName = (compositeID: string) => {
    if (!hasKeyFound(compositeID, this.DataCentral.OwnedClass_Composite)) {
      return "";
    }

    const thenComposite = this.DataCentral.OwnedClass_Composite[compositeID];
    //console.log("thenComposite", thenComposite);
    return thenComposite.Composite_Name;
  };
  getCompositeDuration = (compositeID: string) => {
    if (!hasKeyFound(compositeID, this.DataCentral.OwnedClass_Composite)) {
      return;
    }
    return this.DataCentral.OwnedClass_Composite[compositeID].Composite_Duration;
  };

  getCompositeStyleViewPos = (compositeID: string) => {
    if (!hasKeyFound(compositeID, this.DataCentral.OwnedClass_Composite)) {
      return null;
    }
    const viewPos: Array<number> = [
      this.DataCentral.OwnedClass_Composite[compositeID].staStyleViewPos,
      this.DataCentral.OwnedClass_Composite[compositeID].endStyleViewPos,
    ];
    return viewPos;
  };

  getCompositePlayheadTimePos = (compositeID: string) => {
    if (!hasKeyFound(compositeID, this.DataCentral.OwnedClass_Composite)) {
      return;
    }
    const viewPos: number = this.DataCentral.OwnedClass_Composite[compositeID].playheadTimePos;
    // console.log("getCompositePlayheadTimePos", viewPos);
    return viewPos;
  };

  getCompositePreviewViewPos = (compositeID: string): { x: number; y: number } => {
    if (!hasKeyFound(compositeID, this.DataCentral.OwnedClass_Composite)) {
      return;
    }

    if (!this.DataCentral.OwnedClass_Composite[compositeID].previewViewPosX || !this.DataCentral.OwnedClass_Composite[compositeID].previewViewPosY) {
      return { x: 0, y: 0 };
    }

    const viewPosX: number = this.DataCentral.OwnedClass_Composite[compositeID].previewViewPosX;
    const viewPosY: number = this.DataCentral.OwnedClass_Composite[compositeID].previewViewPosY;
    // console.log("getCompositePlayheadTimePos", viewPos);
    return { x: viewPosX, y: viewPosY };
  };

  setCompositeName = (compositeID: string, compositeName: string) => {
    if (!hasKeyFound(compositeID, this.DataCentral.OwnedClass_Composite)) {
      return;
    }
    this.DataCentral.OwnedClass_Composite[compositeID].Composite_Name = compositeName;
  };

  setCompositeHorizontalMode = (compositeID: string, compositeHorizontalMode: string) => {
    if (!hasKeyFound(compositeID, this.DataCentral.OwnedClass_Composite)) {
      return;
    }
    this.DataCentral.OwnedClass_Composite[compositeID].Composite_HorizontalMode = compositeHorizontalMode;
  };

  setCompositeLocationMode = (compositeID: string, compositeLocationMode: string) => {
    if (!hasKeyFound(compositeID, this.DataCentral.OwnedClass_Composite)) {
      return;
    }
    this.DataCentral.OwnedClass_Composite[compositeID].Composite_LocationMode = compositeLocationMode;
  };

  setCompositeWidth = (compositeID: string, compositeWidth: number) => {
    if (!hasKeyFound(compositeID, this.DataCentral.OwnedClass_Composite)) {
      return;
    }
    this.DataCentral.OwnedClass_Composite[compositeID].Composite_Width = compositeWidth;
  };

  setCompositeWidthUnit = (compositeID: string, compositeWidthUnit: string) => {
    if (!hasKeyFound(compositeID, this.DataCentral.OwnedClass_Composite)) {
      return;
    }
    this.DataCentral.OwnedClass_Composite[compositeID].Composite_WidthUnit = compositeWidthUnit;
  };

  setCompositeHeight = (compositeID: string, compositeHeight: number) => {
    if (!hasKeyFound(compositeID, this.DataCentral.OwnedClass_Composite)) {
      return;
    }
    this.DataCentral.OwnedClass_Composite[compositeID].Composite_Height = compositeHeight;
  };

  setCompositeHeightUnit = (compositeID: string, compositeHeightUnit: string) => {
    if (!hasKeyFound(compositeID, this.DataCentral.OwnedClass_Composite)) {
      return;
    }
    this.DataCentral.OwnedClass_Composite[compositeID].Composite_HeightUnit = compositeHeightUnit;
  };

  setCompositeStyleViewPos = (compositeID: string, viewPos: Array<number>) => {
    if (!hasKeyFound(compositeID, this.DataCentral.OwnedClass_Composite)) {
      return;
    }
    this.DataCentral.OwnedClass_Composite[compositeID].staStyleViewPos = viewPos[0];
    this.DataCentral.OwnedClass_Composite[compositeID].endStyleViewPos = viewPos[1];
  };

  setCompositePlayheadTimePos = (compositeID: string, time: number) => {
    if (!hasKeyFound(compositeID, this.DataCentral.OwnedClass_Composite)) {
      return;
    }
    this.DataCentral.OwnedClass_Composite[compositeID].playheadTimePos = time;
  };

  setCompositePreviewViewPos = (compositeID: string, pos: { x: number; y: number }) => {
    if (!hasKeyFound(compositeID, this.DataCentral.OwnedClass_Composite)) {
      return;
    }
    this.DataCentral.OwnedClass_Composite[compositeID].previewViewPosX = pos.x;
    this.DataCentral.OwnedClass_Composite[compositeID].previewViewPosY = pos.y;
  };

  getKeyframeTime = (keyframeID: string) => {
    const Keyframe_AbsoluteTime = this.DataCentral.OwnedClass_Keyframe[keyframeID].Keyframe_AbsoluteTime;

    return Keyframe_AbsoluteTime;
  };

  searchSpecificAnimatorGroupSpecies = (mediaObjectID: string, animatorGroupSpeciesName: string) => {
    const animatorGroupFormatListKey = AnimatorGroupFormat.getAnimatorGroupFormatListKey();

    let tempAnimatorGroupIDArray: Array<string> = [];

    if (!hasKeyFound(mediaObjectID, this.DataCentral.OwnedClass_MediaObject)) {
      return;
    }
    const OwnedID_AnimatorGroup = this.DataCentral.OwnedClass_MediaObject[mediaObjectID].OwnedID_AnimatorGroup;

    for (let ani = 0; ani < OwnedID_AnimatorGroup.length; ani++) {
      const thenAnimatorGroupID = OwnedID_AnimatorGroup[ani];
      const thenAnimatorGroupClass = this.DataCentral.OwnedClass_AnimatorGroup[thenAnimatorGroupID];

      if (thenAnimatorGroupClass.AnimatorGroup_Species === animatorGroupSpeciesName) {
        tempAnimatorGroupIDArray.push(thenAnimatorGroupID);
      }
    }

    return tempAnimatorGroupIDArray;
  };

  searchSpecificAnimatorPropertySpecies = (animatorGroupID: string, animatorSpeciesName: string) => {
    const animatorGroupFormatListKey = AnimatorGroupFormat.getAnimatorGroupFormatListKey();

    let tempAnimatorIDArray: Array<string> = [];
    if (!hasKeyFound(animatorGroupID, this.DataCentral.OwnedClass_AnimatorGroup)) {
      return;
    }
    const OwnedID_Animator = this.DataCentral.OwnedClass_AnimatorGroup[animatorGroupID].OwnedID_Animator;

    for (let ani = 0; ani < OwnedID_Animator.length; ani++) {
      const thenAnimatorID = OwnedID_Animator[ani];
      const thenAnimatorClass = this.DataCentral.OwnedClass_Animator[thenAnimatorID];

      if (thenAnimatorClass.Animator_propertySpecies === animatorSpeciesName) {
        tempAnimatorIDArray.push(thenAnimatorID);
      }
    }

    return tempAnimatorIDArray;
  };

  deleteComposite = (compositeID: string) => {
    if (!hasKeyFound(compositeID, this.DataCentral.OwnedClass_Composite)) {
      return;
    }
    delete this.DataCentral.OwnedClass_Composite[compositeID];
  };
  deleteMediaObject = (compositeID: string, mediaObjectID: string) => {
    if (!hasKeyFound(compositeID, this.DataCentral.OwnedClass_Composite)) {
      return;
    }

    const OwnedID_MediaObject = this.DataCentral.OwnedClass_Composite[compositeID].OwnedID_MediaObject;

    const index = OwnedID_MediaObject.indexOf(mediaObjectID);
    console.log("deleteMediaObjectA", index);
    if (index > -1) {
      this.DataCentral.OwnedClass_Composite[compositeID].OwnedID_MediaObject.splice(index, 1);
    }

    console.log("deleteMediaObjectB", index);
  };
  deleteAnimatorGroup = (mediaObjectID: string, animatorGroupID: string) => {
    if (!hasKeyFound(mediaObjectID, this.DataCentral.OwnedClass_MediaObject)) {
      return;
    }

    const OwnedID_AnimatorGroup = this.DataCentral.OwnedClass_MediaObject[mediaObjectID].OwnedID_AnimatorGroup;

    const index = OwnedID_AnimatorGroup.indexOf(animatorGroupID);
    console.log("deleteAnimatorGroupA", index);
    if (index > -1) {
      this.DataCentral.OwnedClass_MediaObject[mediaObjectID].OwnedID_AnimatorGroup.splice(index, 1);
    }
  };
  deleteKeyframe = (keyframeID: string) => {
    const animatorClass = Object.values(this.DataCentral.OwnedClass_Animator);
    const alen = animatorClass.length;

    for (let i = 0; i < alen; i++) {
      const ownedID_keyframe = animatorClass[i].OwnedID_Keyframe;

      const index = ownedID_keyframe.indexOf(keyframeID);
      console.log("deletekeyframeA", index);
      if (index > -1) {
        this.DataCentral.OwnedClass_Animator[animatorClass[i].Animator_ID].OwnedID_Keyframe.splice(index, 1);
      }
    }
  };

  layerMaximum = (compositeID: string) => {
    const targetMediaObjectLengh = this.DataCentral.OwnedClass_Composite[compositeID].OwnedID_MediaObject.length;

    // const nowMax = 0;

    // for (let i = 0; i < targetMediaObjectLengh ;i++ )
    // {
    //   MediaObjectValue[i]
    // }
  };
  layerNormalization = (compositeID: string) => {
    //たぶん計算量がn^2ぐらいになりそう
  };

  fileInportCommon = () => {};

  fileExportCommon = (jsonData: any, fileName: string, typeText: string, extension: string) => {
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
    this.fileExportCommon(jsonDataCentral, "DataCentralFile", "application/json", "json");
  };
  fileExportComposite = (CompositeID: string) => {
    const Composite = this.DataCentral.OwnedClass_Composite[CompositeID];
    const jsonComposite = JSON.stringify(Composite, null, "\t");
    this.fileExportCommon(jsonComposite, CompositeID + "File", "application/json", "json");
  };
  buildMiddleDataHtml = (CompositeID: string) => {
    const jsonData = JSON.parse(JSON.stringify(this.DataCentral, null, "\t"));
    const jsonSyntaxHtml = htmlBuildMain(jsonData, CompositeID);

    this.fileExportCommon(jsonSyntaxHtml, CompositeID + "html", "text/html", "html");
  };

  previewMiddleDataHtml = (CompositeID: string) => {
    if (!hasKeyFound(CompositeID, this.DataCentral.OwnedClass_Composite)) {
      return `<body> notExist html <body>`;
    }

    const jsonData = JSON.parse(JSON.stringify(this.DataCentral, null, "\t"));
    const jsonSyntaxHtml = htmlBuildMain(jsonData, CompositeID, true);
    return jsonSyntaxHtml;
  };

  rewriteMediaObejctAnimatorOpen = (mediaObjectID: string, openBool: boolean) => {
    this.DataCentral.OwnedClass_MediaObject[mediaObjectID].animatorOpen = openBool;
  };
  getMediaObejctAnimatorOpen = (mediaObjectID: string) => {
    const retemp: boolean = this.DataCentral.OwnedClass_MediaObject[mediaObjectID].animatorOpen;
    return retemp;
  };
}

//ユーザー操作をEdit
//コンピューター操作をoperation
