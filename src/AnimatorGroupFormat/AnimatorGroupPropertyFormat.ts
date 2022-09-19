import { textJoinAnimatorGroup } from "./AnimatorGroupAuxiliaryFunction";

export type PropertyFormatSpecies = {
  cssPropertyName: string;
  cssPropertySpeciesList: { [name: string]: string };
  cssWriteFunction: Function;
};

export const propertySpeciesUnitList: Array<string> = ["not", "number", "rgb", "rgba", "text", "image"]; //ここで設定画面の方式を決定
export const cssValueUnit: { [name: string]: Array<string> } = {
  not: [],
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
export const PropertyFormat_left: PropertyFormatSpecies = {
  cssPropertyName: "left",
  cssPropertySpeciesList: {
    left: propertySpeciesUnitList[1],
  },

  cssWriteFunction: (send_propertyName: string, send_cssPropertySpeciesList: { [name: string]: string }) => {
    const rtext = textJoinAnimatorGroup(["left:", send_cssPropertySpeciesList["left"], ";"]);
    return rtext;
  },
};

export const PropertyFormat_right: PropertyFormatSpecies = {
  cssPropertyName: "right",
  cssPropertySpeciesList: {
    right: propertySpeciesUnitList[1],
  },

  cssWriteFunction: (send_propertyName: string, send_cssPropertySpeciesList: { [name: string]: string }) => {
    const rtext = textJoinAnimatorGroup(["right:", send_cssPropertySpeciesList["right"], ";"]);
    return rtext;
  },
};
export const PropertyFormat_top: PropertyFormatSpecies = {
  cssPropertyName: "top",
  cssPropertySpeciesList: {
    top: propertySpeciesUnitList[1],
  },

  cssWriteFunction: (send_propertyName: string, send_cssPropertySpeciesList: { [name: string]: string }) => {
    const rtext = textJoinAnimatorGroup(["top:", send_cssPropertySpeciesList["top"], ";"]);
    return rtext;
  },
};
export const PropertyFormat_bottom: PropertyFormatSpecies = {
  cssPropertyName: "bottom",
  cssPropertySpeciesList: {
    bottom: propertySpeciesUnitList[1],
  },

  cssWriteFunction: (send_propertyName: string, send_cssPropertySpeciesList: { [name: string]: string }) => {
    const rtext = textJoinAnimatorGroup(["bottom:", send_cssPropertySpeciesList["bottom"], ";"]);
    return rtext;
  },
};

export const PropertyFormat_opacity: PropertyFormatSpecies = {
  cssPropertyName: "透明度(1~100)",
  cssPropertySpeciesList: {
    opacity: propertySpeciesUnitList[0],
  },

  cssWriteFunction: (send_propertyName: string, send_cssPropertySpeciesList: { [name: string]: string }) => {
    // console.log("opacity", send_cssPropertySpeciesList["opacity"]);
    // const val: number = Number(send_cssPropertySpeciesList["opacity"]) / 100;
    const rtext = textJoinAnimatorGroup(["opacity:", send_cssPropertySpeciesList["opacity"], ";"]);
    return rtext;
  },
};

//https://nyanblog2222.com/programming/javascript/1132/
//inputタグからfileRenaderを使って画面に表示する方法 div要素に出力する

export const PropertyFormat_fontProperty: PropertyFormatSpecies = {
  cssPropertyName: "font",
  cssPropertySpeciesList: {
    fontSize: propertySpeciesUnitList[1],
    r: propertySpeciesUnitList[3],
    g: propertySpeciesUnitList[3],
    b: propertySpeciesUnitList[3],
    a: propertySpeciesUnitList[3],
  },

  cssWriteFunction: (send_propertyName: string, send_cssPropertySpeciesList: { [name: string]: string }) => {
    const rtext = textJoinAnimatorGroup([
      "font-size:",
      send_cssPropertySpeciesList["fontSize"],
      ";",
      "color : rgba(",
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
