import * as PropertyFormat from "./AnimatorGroupPropertyFormat";

const animatorGroupFormatList: { [name: string]: PropertyFormat.PropertyFormatSpecies } = {
  margin: PropertyFormat.PropertyFormat_margin,
  backgroundColor: PropertyFormat.PropertyFormat_backgroundColor,
  blockSize: PropertyFormat.PropertyFormat_blockSize,
  boxShadow: PropertyFormat.PropertyFormat_blockBorderShadow,
  blockBorder: PropertyFormat.PropertyFormat_blockBorder,
  image: PropertyFormat.PropertyFormat_Image,
};

export const getAnimatorGroupFormatList = (animatorGroupFormatPropertyName: string) => {
  return Object.assign(animatorGroupFormatList[animatorGroupFormatPropertyName]);
};

export const getAnimatorGroupFormatListKey = () => {
  return Object.keys(animatorGroupFormatList);
};
