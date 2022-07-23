import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SetupConfig from "./SetupConfig";
import { AppContext } from "../AppContext";
import { SetupEditorContext } from "./SetupEditorContext";

//ここを画面結合専用層にする予定
//ここから ツールバー処理用のクラス

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

const Editor = () => {
  const [choiceComposite, choiceCompositeSetState] = useState<string>("not");
  const [playHeadTime, playHeadTimeSetState] = useState<number>(0);

  useEffect(() => {}, [choiceComposite]);
  useEffect(() => {}, [playHeadTime]);

  const insertUserHandMediaObject = (mediaObjectUUID: string, stateUserHand: number, mousePushPos: number, staStylePos: number, endStylePos: number) => {
    //const CopyUserHandMediaObjectList = AppContextValue.deepCopyDict(UserHandMediaObjectList);
    UserHandMediaObjectList[mediaObjectUUID] = new UserHandMediaObjectOperation(stateUserHand, mousePushPos, staStylePos, endStylePos);
    //UserHandMediaObjectListSetState(CopyUserHandMediaObjectList);
    //animationOpenUpdateDOM();
  };
  const deleteUserHandMediaObject = (mediaObjectUUID: string) => {
    //const CopyUserHandMediaObjectList = AppContextValue.deepCopyDict(UserHandMediaObjectList);
    delete UserHandMediaObjectList[mediaObjectUUID];
    //UserHandMediaObjectListSetState(CopyUserHandMediaObjectList);
    //animationOpenUpdateDOM();
  };
  const hasUserHandMediaObject = (mediaObjectUUID: string) => {
    const hasHand = mediaObjectUUID in UserHandMediaObjectList;
    return hasHand;
  };
  const getUserHandMediaObject = (mediaObjectUUID: string) => {
    const getHand = UserHandMediaObjectList[mediaObjectUUID];
    return getHand;
  };

  const getUserHandMediaObjectIDArray = () => {
    const getIDArray = Object.keys(UserHandMediaObjectList);
    return getIDArray;
  };

  const alldeleteUserHandMediaObject = () => {
    // UserHandMediaObjectListSetState({})
    for (let key in UserHandMediaObjectList) {
      delete UserHandMediaObjectList[key];
    }
    //animationOpenUpdateDOM();
  };

  return (
    <SetupEditorContext.Provider
      value={{
        choiceComposite: choiceComposite,
        choiceCompositeSetState: choiceCompositeSetState,
        playHeadTime: playHeadTime,
        playHeadTimeSetState: playHeadTimeSetState,

        insertUserHandMediaObject: insertUserHandMediaObject,
        deleteUserHandMediaObject: deleteUserHandMediaObject,
        hasUserHandMediaObject: hasUserHandMediaObject,
        getUserHandMediaObject: getUserHandMediaObject,
        getUserHandMediaObjectIDArray: getUserHandMediaObjectIDArray,
        alldeleteUserHandMediaObject: alldeleteUserHandMediaObject,
      }}
    >
      <SetupConfig />
    </SetupEditorContext.Provider>
  );
};
export default Editor;
