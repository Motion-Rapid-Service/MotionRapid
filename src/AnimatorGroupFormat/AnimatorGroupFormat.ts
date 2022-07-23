import * as PropertyFormat from "./AnimatorGroupPropertyFormat";

const animatorGroupFormatList: { [name: string]: PropertyFormat.PropertyFormatType } = {
  margin: PropertyFormat.PropertyFormat_margin,
};

export const getAnimatorGroupFormatList = (animatorGroupFormatPropertyName: string) => {
  return Object.assign(animatorGroupFormatList[animatorGroupFormatPropertyName]);
};

export const getAnimatorGroupFormatListKey = () => {
  return Object.keys(animatorGroupFormatList);
};
