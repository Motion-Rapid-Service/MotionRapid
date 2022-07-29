import { textJoinAnimatorGroup } from "./AnimatorGroupAuxiliaryFunction";

export type PropertyFormatSpecies = {
  cssPropertyName: string;
  cssPropertySpeciesList: { [name: string]: string };
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
  cssPropertySpeciesList: {
    top: propertySpeciesList[1],
    right: propertySpeciesList[1],
    bottom: propertySpeciesList[1],
    left: propertySpeciesList[1],
  },

  cssWriteFunction: (send_propertyName: string, send_cssPropertySpeciesList: { [name: string]: string }) => {
    const rtext = textJoinAnimatorGroup([
      send_propertyName,
      ":",
      send_cssPropertySpeciesList["top"],
      send_cssPropertySpeciesList["right"],
      send_cssPropertySpeciesList["bottom"],
      send_cssPropertySpeciesList["left"],
      ";",
    ]);
    return rtext;
  },
};
