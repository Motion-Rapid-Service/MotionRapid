console.log("UserHandInit");

export class UserHandMediaObjectOperation {
  mouseDownFlag: number;
  //0:押していない(番号として登録しているが、実際は0番登録するようなコードを書いてはいけない) ,
  //1:左側 , 2:右側 , 3:動作 4:単純選択(自発的な座標の移動はできない)

  mousePushPos: number; //マウスが押された時のマウス座標
  mouseDownStaStyle: number; //マウスが押された時のメディアオブジェクト開始地点
  mouseDownEndStyle: number; //マウスが押された時のメディアオブジェクト終了地点
  constructor(send_mouseDownFlag: number, send_mousePushPos: number, send_mouseDownStaStyle: number, send_mouseDownEndStyle: number) {
    this.mouseDownFlag = send_mouseDownFlag;
    this.mousePushPos = send_mousePushPos;
    this.mouseDownStaStyle = send_mouseDownStaStyle;
    this.mouseDownEndStyle = send_mouseDownEndStyle;
  }
}

const UserHandMediaObjectList: { [name: string]: UserHandMediaObjectOperation } = {}; //0番 無操作 1番左 2番右 3番移動 4番選択

class UserHandKeyframeOperation {
  mouseDownFlag: number;
  //0:押していない(番号として登録しているが、実際は0番登録するようなコードを書いてはいけない) ,
  //1:動作 2:単純選択(自発的な座標の移動はできない)

  mousePushPos: number; //マウスが押された時のマウス座標
  mouseDownKeyframeStyle: number; //マウスが押された時のキーフレーム地点
  constructor(send_mouseDownFlag: number, send_mousePushPos: number, send_mouseDownKeyframeStyle: number) {
    this.mouseDownFlag = send_mouseDownFlag;
    this.mousePushPos = send_mousePushPos;
    this.mouseDownKeyframeStyle = send_mouseDownKeyframeStyle;
  }
}
const UserHandKeyframeList: { [name: string]: UserHandKeyframeOperation } = {};

export const insertUserHandMediaObject = (mediaObjectUUID: string, stateUserHand: number, mousePushPos: number, staStylePos: number, endStylePos: number) => {
  UserHandMediaObjectList[mediaObjectUUID] = new UserHandMediaObjectOperation(stateUserHand, mousePushPos, staStylePos, endStylePos);
};
export const deleteUserHandMediaObject = (mediaObjectUUID: string) => {
  delete UserHandMediaObjectList[mediaObjectUUID];
};
export const hasUserHandMediaObject = (mediaObjectUUID: string) => {
  const hasHand = mediaObjectUUID in UserHandMediaObjectList;
  return hasHand;
};
export const getUserHandMediaObject = (mediaObjectUUID: string) => {
  const getHand = UserHandMediaObjectList[mediaObjectUUID];
  return getHand;
};

export const getUserHandMediaObjectIDArray = () => {
  const getIDArray = Object.keys(UserHandMediaObjectList);
  return getIDArray;
};

export const alldeleteUserHandMediaObject = () => {
  for (let key in UserHandMediaObjectList) {
    delete UserHandMediaObjectList[key];
  }
};

// **************************************************************

export const insertUserHandKeyframe = (keyframeUUID: string, stateUserHand: number, mousePushPos: number, mouseDownKeyframeStyle: number) => {
  UserHandKeyframeList[keyframeUUID] = new UserHandKeyframeOperation(stateUserHand, mousePushPos, mouseDownKeyframeStyle);
};
export const deleteUserHandKeyframe = (keyframeUUID: string) => {
  delete UserHandKeyframeList[keyframeUUID];
};
export const hasUserHandKeyframe = (keyframeUUID: string) => {
  const hasHand = keyframeUUID in UserHandKeyframeList;
  return hasHand;
};
export const getUserHandKeyframe = (keyframeUUID: string) => {
  const getHand = UserHandKeyframeList[keyframeUUID];
  return getHand;
};

export const getUserHandKeyframeIDArray = () => {
  const getIDArray = Object.keys(UserHandKeyframeList);
  return getIDArray;
};

export const alldeleteUserHandKeyframe = () => {
  for (let key in UserHandKeyframeList) {
    delete UserHandKeyframeList[key];
  }
};

// ***************************************************************

class UserHandPlayheadOperation {
  mouseDownFlag: number;
  //0:押していない(番号として登録しているが、実際は0番登録するようなコードを書いてはいけない) ,
  //1:動作

  mousePushPos: number; //マウスが押された時のマウス座標
  mouseDownPlayheadStyle: number; //マウスが押された時のキーフレーム地点
  constructor(send_mouseDownFlag: number, send_mousePushPos: number, send_mouseDownPlayheadStyle: number) {
    this.mouseDownFlag = send_mouseDownFlag;
    this.mousePushPos = send_mousePushPos;
    this.mouseDownPlayheadStyle = send_mouseDownPlayheadStyle;
  }
}
const UserHandPlayhead: UserHandPlayheadOperation = new UserHandPlayheadOperation(0, 0, 0);
export const insertUserHandPlayhead = (mousePushPos: number, mouseDownPlayheadStyle: number) => {
  UserHandPlayhead.mouseDownFlag = 1;
  UserHandPlayhead.mousePushPos = mousePushPos;
  UserHandPlayhead.mouseDownPlayheadStyle = mouseDownPlayheadStyle;
};
export const deleteUserHandPlayhead = () => {
  UserHandPlayhead.mouseDownFlag = 0;
  UserHandPlayhead.mousePushPos = 0;
  UserHandPlayhead.mouseDownPlayheadStyle = 0;
};

export const getUserHandPlayhead = () => {
  return UserHandPlayhead;
};
