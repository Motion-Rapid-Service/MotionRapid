import * as PropertyFormat from "./AnimatorGroupPropertyFormat";

const animatorGroupFormatList: { [name: string]: PropertyFormat.PropertyFormatSpecies } = {
  margin: PropertyFormat.PropertyFormat_margin,
  backgroundColor: PropertyFormat.PropertyFormat_backgroundColor,
  blockSize: PropertyFormat.PropertyFormat_blockSize,
};

export const getAnimatorGroupFormatList = (animatorGroupFormatPropertyName: string) => {
  return Object.assign(animatorGroupFormatList[animatorGroupFormatPropertyName]);
};

export const getAnimatorGroupFormatListKey = () => {
  return Object.keys(animatorGroupFormatList);
};
