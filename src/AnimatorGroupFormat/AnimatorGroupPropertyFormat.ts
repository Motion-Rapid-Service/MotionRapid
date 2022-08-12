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

export const PropertyFormat_blockBorderShadow: PropertyFormatSpecies = {
  cssPropertyName: "box-shadow",
  cssPropertySpeciesList: {
    "offset-x": propertySpeciesUnitList[1],
    "offset-y": propertySpeciesUnitList[1],
    "blur-radius": propertySpeciesUnitList[1],
    "spread-radius": propertySpeciesUnitList[1],
    r: propertySpeciesUnitList[3],
    g: propertySpeciesUnitList[3],
    b: propertySpeciesUnitList[3],
    a: propertySpeciesUnitList[3],
  },

  cssWriteFunction: (send_propertyName: string, send_cssPropertySpeciesList: { [name: string]: string }) => {
    const rtext = textJoinAnimatorGroup([
      "box-shadow:",
      send_cssPropertySpeciesList["offset-x"],
      send_cssPropertySpeciesList["offset-y"],
      send_cssPropertySpeciesList["blur-radius"],
      send_cssPropertySpeciesList["spread-radius"],
      "rgba(",
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

export const PropertyFormat_blockBorder: PropertyFormatSpecies = {
  cssPropertyName: "border",
  cssPropertySpeciesList: {
    幅: propertySpeciesUnitList[1],
    r: propertySpeciesUnitList[3],
    g: propertySpeciesUnitList[3],
    b: propertySpeciesUnitList[3],
    a: propertySpeciesUnitList[3],
  },

  cssWriteFunction: (send_propertyName: string, send_cssPropertySpeciesList: { [name: string]: string }) => {
    const rtext = textJoinAnimatorGroup([
      "border:solid",
      send_cssPropertySpeciesList["幅"],
      "rgba(",
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
