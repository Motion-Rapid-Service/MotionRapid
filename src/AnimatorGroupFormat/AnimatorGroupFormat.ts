import * as PropertyFormat from "./AnimatorGroupPropertyFormat";

const animatorGroupFormatList: { [name: string]: PropertyFormat.PropertyFormatSpecies } = {
  margin: PropertyFormat.PropertyFormat_margin,
};

export const getAnimatorGroupFormatList = (animatorGroupFormatPropertyName: string) => {
  return Object.assign(animatorGroupFormatList[animatorGroupFormatPropertyName]);
};

export const getAnimatorGroupFormatListKey = () => {
  return Object.keys(animatorGroupFormatList);
};
