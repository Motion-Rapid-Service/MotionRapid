export const copySpeciesList = ["notExist", "mediaObject"];

export class copyDataClass {
  copySpecies: string;
  copyTargetID: Array<string>;

  constructor(send_copySpecies: string = "", send_copyTargetID: Array<string> = []) {
    this.copySpecies = send_copySpecies;
    this.copyTargetID = send_copyTargetID;
  }
}

let copyData: copyDataClass = new copyDataClass();

export const setCopyData = (send_copySpecies: string, send_copyTargetID: Array<string>) => {
  copyData = new copyDataClass(send_copySpecies, send_copyTargetID);
  console.log("copy-paste", copyData);
};

export const hasCopyData = (copySpecies: string) => {
  const copyAns: boolean = copyData.copySpecies === copySpecies;
  console.log("copy-paste-ans", copyAns);
  return copyAns;
};

export const getCopyData = () => {
  return copyData;
};
