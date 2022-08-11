import { textJoinAnimatorGroup } from "./AnimatorGroupAuxiliaryFunction";

export type PropertyFormatSpecies = {
  cssPropertyName: string;
  cssPropertySpeciesList: { [name: string]: string };
  cssWriteFunction: Function;
};

export const propertySpeciesUnitList: Array<string> = ["not", "number", "rgb", "rgba", "text"]; //ここで設定画面の方式を決定
export const cssValueUnit: { [name: string]: Array<string> } = {
  number: ["px", "vw", "vh", "%"],
  rgb: [],
  rgba: [],
  text: [],
};

export const PropertyFormat_margin: PropertyFormatSpecies = {
  cssPropertyName: "margin",
  cssPropertySpeciesList: {
    top: propertySpeciesUnitList[1],
    right: propertySpeciesUnitList[1],
    bottom: propertySpeciesUnitList[1],
    left: propertySpeciesUnitList[1],
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

export const PropertyFormat_backgroundColor: PropertyFormatSpecies = {
  cssPropertyName: "background-color",
  cssPropertySpeciesList: {
    r: propertySpeciesUnitList[3],
    g: propertySpeciesUnitList[3],
    b: propertySpeciesUnitList[3],
    a: propertySpeciesUnitList[3],
  },

  cssWriteFunction: (send_propertyName: string, send_cssPropertySpeciesList: { [name: string]: string }) => {
    const rtext = textJoinAnimatorGroup([
      send_propertyName,
      ":rgba(",
      send_cssPropertySpeciesList["r"],
      ",",
      send_cssPropertySpeciesList["g"],
      ",",
      send_cssPropertySpeciesList["b"],
      ",",
      send_cssPropertySpeciesList["a"],
      ");",
    ]);
    return rtext;
  },
};

export const PropertyFormat_blockSize: PropertyFormatSpecies = {
  cssPropertyName: "width,height",
  cssPropertySpeciesList: {
    width: propertySpeciesUnitList[1],
    height: propertySpeciesUnitList[1],
  },

  cssWriteFunction: (send_propertyName: string, send_cssPropertySpeciesList: { [name: string]: string }) => {
    const rtext = textJoinAnimatorGroup(["width:", send_cssPropertySpeciesList["width"], ";", "height:", send_cssPropertySpeciesList["height"], ";"]);
    return rtext;
  },
};
