import { textJoinAnimatorGroup } from "./AnimatorGroupAuxiliaryFunction";

export abstract class PropertyFormatClass {
  abstract propertyName: string;
  abstract cssValueArray: { [name: string]: string };
  abstract cssWriteFunction: Function;
}

export const propertyTypeList: Array<string> = ["not", "number", "rgb", "rgba", "text"];

export class PropertyFormat_margin extends PropertyFormatClass {
  propertyName: string;
  cssValueArray: { [name: string]: string };
  constructor() {
    super();
    this.propertyName = "margin";
    this.cssValueArray = {
      top: propertyTypeList[1],
      right: propertyTypeList[1],
      bottom: propertyTypeList[1],
      left: propertyTypeList[1],
    };
  }

  cssWriteFunction = () => {
    const rtext = textJoinAnimatorGroup([
      this.propertyName,
      ":",
      this.cssValueArray["top"],
      this.cssValueArray["right"],
      this.cssValueArray["bottom"],
      this.cssValueArray["left"],
      ";"
    ]);
    return rtext;
  };
}
