import * as middleDataClass from "../MiddleData/middleDataClass";

const generateTImeValueDict = (
  thenAnimatorClass: middleDataClass.Animator,
  OwnedClass_Keyframe: { [name: string]: middleDataClass.Keyframe },
  OwnedClass_CSSProperty: { [name: string]: middleDataClass.CSSProperty }
): { [name: number]: string | number } => {
  let tempTimeValue: { [name: number]: string | number } = {};
  const OwnedID_Keyframe: Array<string> = thenAnimatorClass.OwnedID_Keyframe;

  if (OwnedID_Keyframe.length === 0) {
    //アニメーターに一つもキーフレームが存在しない場合
    const OwnedID_cssPropertyValue = thenAnimatorClass.OwnedID_cssPropertyValue;
    const thenCSSPropertyClass: middleDataClass.CSSProperty = OwnedClass_CSSProperty[OwnedID_cssPropertyValue];
    tempTimeValue[0] = thenCSSPropertyClass.CSSProperty_Value;
    return tempTimeValue;
  }

  for (let ki = 0; ki < OwnedID_Keyframe.length; ki++) {
    //キーフレーム
    const thenkeyframeID = OwnedID_Keyframe[ki];
    const thenkeyframeClass: middleDataClass.Keyframe = OwnedClass_Keyframe[thenkeyframeID];
    const Keyframe_AbsoluteTime = thenkeyframeClass.Keyframe_AbsoluteTime;

    let thenCSSPropertyID: string = thenkeyframeClass.OwnedID_cssPropertyValue;
    let thenCSSPropertyClass: middleDataClass.CSSProperty = OwnedClass_CSSProperty[thenCSSPropertyID];

    tempTimeValue[Keyframe_AbsoluteTime] = thenCSSPropertyClass.CSSProperty_Value;
  }
  return tempTimeValue;
};

export default generateTImeValueDict;
