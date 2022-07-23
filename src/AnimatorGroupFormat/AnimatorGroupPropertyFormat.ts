import { textJoinAnimatorGroup } from "./AnimatorGroupAuxiliaryFunction";

export type PropertyFormatType = {
  cssPropertyName: string;
  cssValueArray: { [name: string]: string };
  cssWriteFunction: Function;
};

export const propertyTypeList: Array<string> = ["not", "number", "rgb", "rgba", "text"]; //ここで設定画面の方式を決定
export const valueUnit: { [name: string]: Array<string> } = {
  number: ["px", "vw", "vh", "%"],
  rgb: [],
  rgba: [],
  text: [],
};

export const PropertyFormat_margin: PropertyFormatType = {
  cssPropertyName: "margin",
  cssValueArray: {
    top: propertyTypeList[1],
    right: propertyTypeList[1],
    bottom: propertyTypeList[1],
    left: propertyTypeList[1],
  },

  cssWriteFunction: (send_propertyName: string, send_cssValueArray: { [name: string]: string }) => {
    const rtext = textJoinAnimatorGroup([
      send_propertyName,
      ":",
      send_cssValueArray["top"],
      send_cssValueArray["right"],
      send_cssValueArray["bottom"],
      send_cssValueArray["left"],
      ";",
    ]);
    return rtext;
  },
};
