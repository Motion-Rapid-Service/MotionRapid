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
    layoutGlow: new layoutGlowClass([], [], false, false, false, false, false, false, false, false, false, false),
  },
  {
    title: "画面の紹介 - ツールバー",
    main: "さまざまな操作ができます",
    layoutGlow: new layoutGlowClass([], [], false, true, false, false, false, false, false, false, false, false),
  },

  {
    title: "コンポジションを作成しよう",
    main: "コンポジション -> 新規作成",
    layoutGlow: new layoutGlowClass(["compositeEdit"], ["3A"], false, false, false, false, false, false, false, false, false, false),
  },
  {
    title: "画面の紹介 - コンポジション操作画面",
    main: "コンポジションに関する設定ができます。クリックで当該コンポジションに移動します。ダブルクリックで設定画面が開きます",
    layoutGlow: new layoutGlowClass([], [], true, false, false, false, false, false, false, false, false, false),
  },

  {
    title: "画面の紹介 - タイムライン",
    main: "コンポジションに関する設定ができます。クリックで当該コンポジションに移動します。ダブルクリックで設定画面が開きます",
    layoutGlow: new layoutGlowClass([], [], false, false, false, true, false, false, false, false, false, false),
  },
  {
    title: "画面の紹介 - タイムラインナビゲーター",
    main: "タイムラインの横軸を表示します。スクロールバー(青色)で表示範囲を操作することができます",
    layoutGlow: new layoutGlowClass([], [], false, false, false, false, true, false, false, false, false, false),
  },
  {
    title: "画面の紹介 - プレビューナビゲーター",
    main: "プレビュー上の座標を表示します。描画範囲 / 灰色：描画範囲外 / 黄緑：上位コンポジションが固定配置モードになっている場合の描画範囲",
    layoutGlow: new layoutGlowClass([], [], false, false, false, false, false, true, false, false, false, false),
  },
  {
    title: "テキストを追加してみよう",
    main: "テキストメディアオブジェクトです(緑色)。ダブルクリックで設定画面が開きます",
    layoutGlow: new layoutGlowClass(["mediaObjectEdit"], ["4A"], false, false, false, false, false, false, false, false, false, false),
  },
  {
    title: "ほかのコンポジションを呼び出すことができます",
    main: "コンポジションメディアオブジェクトです(赤色)。ほかのコンポジションを呼び出すことができます。ダブルクリックで設定画面が開きます。循環参照するとMotionRapidはフリーズします(対策していないため)",
    layoutGlow: new layoutGlowClass(["mediaObjectEdit"], ["4B"], false, false, false, false, false, false, false, false, false, false),
  },
  {
    title: "コンポジションをもう一つ作成しよう",
    main: "コンポジション -> 新規作成",
    layoutGlow: new layoutGlowClass(["compositeEdit"], ["3A"], true, false, false, false, false, false, false, false, false, false),
  },
  {
    title: "画像を追加してみよう",
    main: "テキストメディアオブジェクトです(青色)。ダブルクリックで設定画面が開きます。",
    layoutGlow: new layoutGlowClass(["mediaObjectEdit"], ["4C"], false, false, false, false, false, false, false, false, false, false),
  },
  {
    title: "図形を追加してみよう",
    main: "図形メディアオブジェクトです(紫色)。ダブルクリックで設定画面が開きます。",
    layoutGlow: new layoutGlowClass(["mediaObjectEdit"], ["4D"], false, false, false, false, false, false, false, false, false, false),
  },
  {
    title: "メディアオブジェクトの長さを変更してみよう(準備中)",
    main: "現在、メディアオブジェクトの長さを変更することはできますが、影響があるのは、赤色のコンポジションメディアオブジェクトだけで、他コンポジション呼び出し開始時刻に反映されることのみです。AfterEffectsなどの編集ソフトでは各要素の表示期間に影響を与えますが、実装を後回しにしているのため影響を与えません",
    layoutGlow: new layoutGlowClass([], [], false, false, false, false, false, false, true, false, false, false),
  },
  {
    title: "画面の紹介 - レイヤーパネル操作画面 1/2 全般",
    main: "コンポジションに関する設定ができます。クリックで当該コンポジションに移動します。ダブルクリックで設定画面が開きます",
    layoutGlow: new layoutGlowClass([], [], false, false, false, false, false, false, false, true, false, false),
  },

  {
    title: "画面の紹介 - レイヤーパネル操作画面 2/2 キーフレーム",
    main: "キーフレームを新規作成することができます",
    layoutGlow: new layoutGlowClass([], [], false, false, false, false, false, false, false, false, false, true),
  },
  {
    title: "キーフレーム",
    main: "ダブルクリックで設定画面が開きます。ドラッグで左右に動かすことができます。",
    layoutGlow: new layoutGlowClass([], [], false, false, false, false, false, false, false, false, true, false),
  },
  {
    title: "レイヤーパネルを操作してみよう",
    main: "ダブルクリックでアニメーター操作エリアを折りたたむことができます。ctrlキーを押しながらドラッグすることでメディアオブジェクトを上下に入れ替えることができます。MotionRapidでは、タイムラインにて下のほうが、重なりが上になります",
    layoutGlow: new layoutGlowClass([], [], false, false, false, false, false, false, false, false, false, false),
  },
  {
    title: "エフェクトを追加してみよう",
    main: "メディアオブジェクトを選択してから「エフェクトを追加するボタン」を押してください。座標指定など、要素に対する詳細設定ができるようになります。そのうち日本語に対応します。",
    layoutGlow: new layoutGlowClass(["mediaObjectEdit"], ["4E"], false, false, false, false, false, false, false, false, false, false),
  },
  {
    title: "機能紹介はここまで！",
    main: "おつかれさまでした！もう少し続きます。",
    layoutGlow: new layoutGlowClass([], [], false, false, false, false, false, false, false, false, false, false),
  },
  {
    title: "テンプレートを読み込んでみよう",
    main: "初見で新しいLPをゼロから作成するのは大変だと思うので、LPを用意しておきました。",
    layoutGlow: new layoutGlowClass(["templateInput"], ["5A", "5B"], false, false, false, false, false, false, false, false, false, false),
  },
];

const SetupPractice = () => {
  const practiceModeList = ["notExist", "basic"];
  const [practiceMode, practiceModeSetState] = useState<string>(practiceModeList[0]);
  const practiceModeHistory: { [name: string]: Array<TypePracticeHistory> } = { basic: basicPractice };
  const setPracticeView = (state: boolean) => {
    return !state;
  };

  const [practiceView, practiceViewSetState] = useReducer(setPracticeView, false);
  // const [practiceHistoryNumber, practiceHistoryNumberSetState] = useState<number>(0);

  const setPracticeHistoryNumber = (state: number, action: string) => {
    let now = state;

    if (!practiceModeHistory[practiceMode]) {
      return 0;
    }

    if (action === "next") {
      now += 1;
    }
    if (action === "back") {
      now -= 1;
    }

    if (now < 0) {
      now = 0;
      console.log("setPracticeHistoryNumberA", now, action);
    }
    const historyLength = practiceModeHistory[practiceMode].length;
    if (now >= historyLength - 1) {
      now = historyLength - 1;
      console.log("setPracticeHistoryNumberB", now, action, historyLength);
    }

    console.log("setPracticeHistoryNumber", now, action);

    return now;
  };

  const [practiceHistoryNumber, practiceHistoryNumberSetState] = useReducer(setPracticeHistoryNumber, 0);

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
