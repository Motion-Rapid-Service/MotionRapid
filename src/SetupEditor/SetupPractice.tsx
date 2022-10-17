import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "../AppContext";
import { SetupEditorContext } from "./SetupEditorContext";
import { SetupPracticeContext, TypePracticeHistory, layoutGlowClass } from "./SetupPracticeContext";
import SetupUndo from "./SetupUndo";

const basicPractice: Array<TypePracticeHistory> = [
  {
    title: "はじめよう",
    main: "ここでは、MotionRapidの基礎的な機能を紹介します 内容：コンポジションの作成～エフェクトの追加",
    layoutGlow: new layoutGlowClass(),
  },
  { title: "画面の紹介 - ツールバー", main: "さまざまな操作ができます", layoutGlow: new layoutGlowClass() },
  { title: "コンポジションを作成しよう", main: "コンポジション -> 新規作成", layoutGlow: new layoutGlowClass() },
  {
    title: "画面の紹介 - コンポジション操作画面",
    main: "コンポジションに関する設定ができます。クリックで当該コンポジションに移動します。ダブルクリックで設定画面が開きます",
    layoutGlow: new layoutGlowClass(),
  },
  {
    title: "テキストを追加してみよう",
    main: "テキストメディアオブジェクトです(緑色)。ダブルクリックで設定画面が開きます",
    layoutGlow: new layoutGlowClass(),
  },
  {
    title: "ほかのコンポジションを呼び出すことができます",
    main: "コンポジションメディアオブジェクトです(赤色)。ほかのコンポジションを呼び出すことができます。ダブルクリックで設定画面が開きます。循環参照するとMotionRapidはフリーズします(対策していないため)",
    layoutGlow: new layoutGlowClass(),
  },
  { title: "コンポジションをもう一つ作成しよう", main: "コンポジション -> 新規作成", layoutGlow: new layoutGlowClass() },
  {
    title: "画像を追加してみよう",
    main: "テキストメディアオブジェクトです(青色)。ダブルクリックで設定画面が開きます。",
    layoutGlow: new layoutGlowClass(),
  },
  {
    title: "図形を追加してみよう",
    main: "図形メディアオブジェクトです(紫色)。ダブルクリックで設定画面が開きます。",
    layoutGlow: new layoutGlowClass(),
  },
  {
    title: "メディアオブジェクトの長さを変更してみよう(準備中)",
    main: "現在、メディアオブジェクトの長さを変更することはできますが、影響があるのは、赤色のコンポジションメディアオブジェクトだけで、他コンポジション呼び出し開始時刻に反映されることのみです。AfterEffectsなどの編集ソフトでは各要素の表示期間に影響を与えますが、実装を後回しにしているのため影響を与えません",
    layoutGlow: new layoutGlowClass(),
  },
  {
    title: "画面の紹介 - レイヤーパネル操作画面",
    main: "コンポジションに関する設定ができます。クリックで当該コンポジションに移動します。ダブルクリックで設定画面が開きます",
    layoutGlow: new layoutGlowClass(),
  },
  {
    title: "レイヤーパネルを操作してみよう",
    main: "ダブルクリックでアニメーター操作エリアを折りたたむことができます。ctrlキーを押しながらドラッグすることでメディアオブジェクトを上下に入れ替えることができます。MotionRapidでは、タイムラインにて下のほうが、重なりが上になります",
    layoutGlow: new layoutGlowClass(),
  },
  {
    title: "エフェクトを追加してみよう",
    main: "コンポジションに関する設定ができます。クリックで当該コンポジションに移動します。ダブルクリックで設定画面が開きます",
    layoutGlow: new layoutGlowClass(),
  },
];

const SetupPractice = () => {
  const practiceModeList = ["notExist"];
  const [practiceMode, practiceModeSetState] = useState<string>(practiceModeList[0]);
  const practiceModeHistory: { [name: string]: Array<TypePracticeHistory> } = {};
  const setPracticeView = (state: boolean) => {
    return !state;
  };

  const [practiceView, practiceViewSetState] = useReducer(setPracticeView, false);
  const [practiceHistoryNumber, practiceHistoryNumberSetState] = useState<number>(0);

  const getLayoutGlow = (): layoutGlowClass => {
    const thenHistory = practiceModeHistory[practiceMode];

    if (!thenHistory || !practiceView) {
      return new layoutGlowClass();
    }
    const thenHistoryBlock = thenHistory[practiceHistoryNumber];
    return thenHistoryBlock.layoutGlow;
  };
  const LayerGlow = (flag: boolean) => {
    if (flag) {
      return <div className="layout-glow"></div>;
    } else {
      return <></>;
    }
  };

  const KeyDown = (event: any) => {
    // console.log(event.key === "Z", event.ctrlKey || event.metaKey, event.shiftKey);
    if (event.key === "k") {
      // undoの処理
      practiceViewSetState();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", KeyDown);

    return () => {
      window.removeEventListener("keydown", KeyDown);
    };
  }, []);
  return (
    <SetupPracticeContext.Provider
      value={{
        practiceMode: practiceMode,
        practiceModeSetState: practiceModeSetState,
        practiceModeList: practiceModeList,
        practiceModeHistory: practiceModeHistory,
        practiceView: practiceView,
        practiceViewSetState: practiceViewSetState,
        practiceHistoryNumber: practiceHistoryNumber,
        practiceHistoryNumberSetState: practiceHistoryNumberSetState,
        getLayoutGlow: getLayoutGlow,
        LayerGlow: LayerGlow,
      }}
    >
      <SetupUndo />
    </SetupPracticeContext.Provider>
  );
};

export default SetupPractice;
