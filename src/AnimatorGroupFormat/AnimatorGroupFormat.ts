import * as PropertyFormat from "./PropertyFormat";

const animatorGroupFormatList: { [name: string]: PropertyFormat.PropertyFormatClass } = {
  margin: PropertyFormat.PropertyFormat_margin,
};

export const getAnimatorGroupFormatList = (animatorGroupFormatPropertyName: string) => {
  return Object.assign(animatorGroupFormatList[animatorGroupFormatPropertyName]);
};
