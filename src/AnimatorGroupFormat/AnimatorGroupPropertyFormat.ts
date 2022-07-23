import { textJoinAnimatorGroup } from "./AnimatorGroupAuxiliaryFunction";

export type PropertyFormatSpecies = {
  cssPropertyName: string;
  cssValueList: { [name: string]: string };
  cssWriteFunction: Function;
};

export const propertySpeciesList: Array<string> = ["not", "number", "rgb", "rgba", "text"]; //ここで設定画面の方式を決定
export const valueUnit: { [name: string]: Array<string> } = {
  number: ["px", "vw", "vh", "%"],
  rgb: [],
  rgba: [],
  text: [],
};

export const PropertyFormat_margin: PropertyFormatSpecies = {
  cssPropertyName: "margin",
  cssValueList: {
    top: propertySpeciesList[1],
    right: propertySpeciesList[1],
    bottom: propertySpeciesList[1],
    left: propertySpeciesList[1],
  },

  cssWriteFunction: (send_propertyName: string, send_cssValueList: { [name: string]: string }) => {
    const rtext = textJoinAnimatorGroup([
      send_propertyName,
      ":",
      send_cssValueList["top"],
      send_cssValueList["right"],
      send_cssValueList["bottom"],
      send_cssValueList["left"],
      ";",
    ]);
    return rtext;
  },
};
