import * as React from "react";
const { useContext, useReducer, createContext, useEffect, useState } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "../AppContext";
import { SetupEditorContext } from "./SetupEditorContext";
import { SetupPracticeContext, TypePracticeHistory, layoutGlowClass } from "./SetupPracticeContext";
import SetupUndo from "./SetupUndo";

const notExistPractice: Array<TypePracticeHistory> = [
  {
    title: "(´・ω・`)",
    main: "",
    layoutGlow: new layoutGlowClass([], [], false, false, false, false, false, false, false, false, false, false),
  },
];
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
    main: "各要素を配置したり、重なりを変えたり、アニメーションの設定をすることができます。",
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
    title: "メディアオブジェクトの長さを変更してみよう",
    main: "各オブジェクトが表示される範囲を設定することができます。",
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
    main: "ダブルクリックでアニメーター操作エリアを折りたたむことができます。ctrlキーを押しながらドラッグすることでメディアオブジェクトを上下に入れ替えることができます。MotionRapidでは、タイムラインにて下のほうが、重なりが上になります(AviUtl方式)",
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
    title: "注意事項 & 現在できないこと",
    main: "MotionRapidはまだ開発途上です。",
    layoutGlow: new layoutGlowClass([], [], false, false, false, false, false, false, false, false, false, false),
  },
  {
    title: "テンプレートを読み込んでみよう",
    main: "初見で新しいLPをゼロから作成するのは大変だと思うので、LPを用意しておきました。",
    layoutGlow: new layoutGlowClass(["templateInput"], ["5A", "5B"], false, false, false, false, false, false, false, false, false, false),
  },
];

const backgroundChangePractice: Array<TypePracticeHistory> = [
  {
    title: "背景が徐々に変化していくLPを作成してみよう",
    main: "この学習では、画面いっぱいの画像が、スクロールに合わせて徐々に変化していくLPを作成します",
    layoutGlow: new layoutGlowClass([], [], false, false, false, false, false, false, false, false, false, false),
  },
  {
    title: "コンポジションを作成しよう",
    main: "コンポジションを作成しましょう。\n1.コンポジション名を「背景」に変更してください\n2.配置方法を「文書配置」から「背景固定」に変更してください\n文書配置モード:要素を順に配置します\n固定背景モード:コンポジション内のすべての要素を画面左上基準で配置します",
    layoutGlow: new layoutGlowClass(["compositeEdit"], ["3A"], false, false, false, false, false, false, false, false, false, false),
  },
  {
    title: "コンポジションを開こう",
    main: "コンポジションを作成しましょう。\n1.コンポジション操作画面の「背景」を選択してください",
    layoutGlow: new layoutGlowClass([], [], true, false, false, false, false, false, false, false, false, false),
  },
  {
    title: "メディアオブジェクトを追加しよう",
    main: "メディアオブジェクトを追加しましょう。\n1.ツールバーのメディアオブジェクト→画像挿入",
    layoutGlow: new layoutGlowClass(["mediaObjectEdit"], ["4C"], false, false, false, false, false, false, false, false, false, false),
  },
  {
    title: "メディアオブジェクトの設定を変更しよう",
    main: "メディアオブジェクトの名前と、表示される画像を変更してみよう。\n1.メディアオブジェクトをダブルクリックして設定画面を開いてみよう\n2画像をアップロードしよう\n3メディアオブジェクトの名前を「背景画像1」に変更しよう.\nメディアオブジェクト設定画面はポップアップ上部(白い場所)をドラッグすることで移動できます",
    layoutGlow: new layoutGlowClass([], [], false, false, false, false, false, false, false, false, false, false),
  },
  {
    title: "プレビューナビゲーターを追従モードにしよう",
    main: "1.プレビューナビゲーター上のプレイヘッドをクリックして切り替える。\nプレビュー画面を出力時に表示される位置に追従することができます。\nもう一度クリックすることで解除することができます",
    layoutGlow: new layoutGlowClass([], [], false, false, false, false, false, false, false, false, false, false),
  },

  {
    title: "表示サイズを設定しよう",
    main: "画像の表示サイズを別途設定する必要があります。\n1.widthの数値設定を100に、単位をvwにする\n2.heightの数値設定を100に、単位をvhにする\nMotionRapidでは画像を設定サイズいっぱいにできるだけ大きく拡大縮小し、必要に応じて画像を引き伸ばします。画像の比率が要素と異なる場合は、何もない空間が残らないように、上下または左右が切り取られます。(background-size: cover)",
    layoutGlow: new layoutGlowClass([], [], false, false, false, false, false, false, false, false, false, false),
  },
  {
    title: "コピーしたメディアオブジェクトの設定を変更しよう",
    main: "1.コピーしたメディアオブジェクトの名前を「背景画像2」に変更しよう",
    layoutGlow: new layoutGlowClass([], [], false, false, false, false, false, false, false, false, false, false),
  },
  //もう2回

  {
    title: "透明度を変更しよう",
    main: "「背景画像2」を選択した状態で、「メディアオブジェクト→エフェクトを追加する」「opacity」(透明度)を選択",
    layoutGlow: new layoutGlowClass([], [], false, false, false, false, false, false, false, false, false, false),
  },
  {
    title: "キーフレームを追加しよう",
    main: "1.プレイヘッドを500付近に移動しよう\n2.「背景画像2」のキーフレーム追加ボタンからキーフレームを追加する",
    layoutGlow: new layoutGlowClass([], [], false, false, false, false, false, false, false, false, false, false),
  },
  {
    title: "キーフレームの設定を変更しよう",
    main: "1.作成したキーフレームをダブルクリックしてキーフレーム設定を開く\n2.「配置数値」を0にする",
    layoutGlow: new layoutGlowClass([], [], false, false, false, false, false, false, false, false, false, false),
  },
  {
    title: "キーフレームを追加しよう(1)",
    main: "1.プレイヘッドを1000付近に移動しよう\n2.「背景画像2」のキーフレーム追加ボタンからキーフレームを追加する",
    layoutGlow: new layoutGlowClass([], [], false, false, false, false, false, false, false, false, false, false),
  },
  {
    title: "キーフレームの設定を変更しよう(2)",
    main: "1.作成したキーフレームをダブルクリックしてキーフレーム設定を開く\n2.「配置数値」を1にする",
    layoutGlow: new layoutGlowClass([], [], false, false, false, false, false, false, false, false, false, false),
  },
  {
    title: "コピーしたメディアオブジェクトの設定を変更しよう",
    main: "1.メディアオブジェクトの名前を「背景画像3」に変更しよう",
    layoutGlow: new layoutGlowClass([], [], false, false, false, false, false, false, false, false, false, false),
  },
  //コピー
  {
    title: "コピーしたメディアオブジェクトの設定を変更しよう",
    main: "1.コピーしたメディアオブジェクトの名前を「背景画像3」に変更しよう",
    layoutGlow: new layoutGlowClass([], [], false, false, false, false, false, false, false, false, false, false),
  },
  {
    title: "キーフレームを移動しよう",
    main: "1つ目のキーフレームをダブルクリックして1100へ、2つめのキーフレームをダブルクリックして2000に変更しよう",
    layoutGlow: new layoutGlowClass([], [], false, false, false, false, false, false, false, false, false, false),
  },
  {
    title: "HTMLを描きだしてみよう",
    main: "HTMLを出力して確認してみましょう!",
    layoutGlow: new layoutGlowClass([], [], false, false, false, false, false, false, false, false, false, false),
  },
];

const SetupPractice = () => {
  const practiceModeList = ["notExist", "basic", "backgroundChange"];
  const [practiceMode, practiceModeSetState] = useState<string>(practiceModeList[0]);
  const practiceModeHistory: { [name: string]: Array<TypePracticeHistory> } = {
    notExist: notExistPractice,
    basic: basicPractice,
    backgroundChange: backgroundChangePractice,
  };
  const setPracticeView = (state: boolean) => {
    return !state;
  };

  const [practiceView, practiceViewSetState] = useReducer(setPracticeView, false);
  // const [practiceHistoryNumber, practiceHistoryNumberSetState] = useState<number>(0);

  const setPracticeHistoryNumber = (state: number, action: string) => {
    let now = state;
    console.log("setPracticeHistoryNumberPA", now, action);

    if (!practiceModeHistory[practiceMode] || practiceMode === "notExist" || action === "reset") {
      return 0;
    }

    console.log("setPracticeHistoryNumberPB", now, action);

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
