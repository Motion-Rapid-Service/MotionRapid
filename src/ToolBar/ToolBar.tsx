import * as React from "react";
const { useState, useContext, useReducer, createContext, useEffect } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext } from "./../AppContext";

import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
import { SetupToolbarContext } from "../SetupEditor/SetupToolbarContext";
import { SetupConfigContext } from "../SetupEditor/SetupConfigContext";
import { SetupUndoContext } from "./../SetupEditor/SetupUndoContext";

import * as buildSourceSpecies from "../BuildSite/buildHTML/buildSourceSpecies";

import template2022_10_04 from "./../template/20221004.json";

// import templateA from "./../template/20221004.json";

const ToolBarDetailSingleComponent = (props: any) => {
  const AppContextValue = useContext(AppContext);
  const SetupToolbarContextValue = useContext(SetupToolbarContext);
  // const componentConvertToolBarEditor =
  //   AppContextValue.componentConvertToolBarEditor;
  // const toolBarClassificationArray = AppContextValue.toolBarClassificationArray;

  const MouseDown = () => {
    props.DownstreamToolBarEditorData.editorFunction({
      choiceComposite: props.choiceComposite,
    });
    AppContextValue.updateDOM();
  };

  return (
    <div className="toolBarDetail_single-area" onMouseDown={MouseDown}>
      <div className="toolBarDetail_single-area-title">
        <p>{props.DownstreamToolBarEditorData.editorLogo}</p>
      </div>
    </div>
  );
};

const ToolBarSingleComponent = (props: any) => {
  // ここでhooksを使える

  const MouseDown = () => {
    const toolBarClassificationName = props.DownstreamToolBarClassificationData.toolBarClassificationName;

    props.switchToolBarDetailSetState(toolBarClassificationName);
  };

  return (
    <div className="toolBar_single-area" onMouseDown={MouseDown}>
      <div className="toolBar_single-area-title">
        <p>{props.DownstreamToolBarClassificationData.toolBarClassificationLogo}</p>
      </div>

      {/* <TimelineComponent /> */}
    </div>
  );
};

const toolBarComponent = (props: any) => {
  // ここでhooksを使える
  const AppContextValue = useContext(AppContext);

  const SetupEditorContextValue = useContext(SetupEditorContext);
  const SetupToolbarContextValue = useContext(SetupToolbarContext);
  const SetupUndoContextValue = useContext(SetupUndoContext);
  const SetupConfigContextValue = useContext(SetupConfigContext);

  const insertToolBarClassificationArraySetStateValue = SetupToolbarContextValue.insertToolBarClassificationArraySetStateValue;
  const insertToolBarEditorDictSetStateValue = SetupToolbarContextValue.insertToolBarEditorDictSetStateValue;
  const operationEditorStatus = SetupToolbarContextValue.operationEditorStatus;
  // const componentConvertToolBarClassification =
  //   AppContextValue.componentConvertToolBarClassification;

  // const toolBarClassificationArray = AppContextValue.toolBarClassificationArray;

  const [switchToolBarDetail, switchToolBarDetailSetState] = useState<string>("");

  const Test = () => {
    console.log("（╹◡╹）");
  };

  const downloadFile = () => {
    AppContextValue.fileExportDataCentral();
  };

  const uploadFile = (funcdata: { [name: string]: any }) => {
    SetupConfigContextValue.configModeSetState(SetupConfigContextValue.configModeList[7]);
    SetupConfigContextValue.configSwitchGUISetState(SetupConfigContextValue.configSwitchGUIList[1]);
  };

  useEffect(() => {}, [SetupEditorContextValue.choiceComposite]);

  const buildHtml = (funcdata: { [name: string]: any }) => {
    AppContextValue.buildMiddleDataHtml(funcdata["choiceComposite"]);
  };

  const toolBarCreateComposite = (funcdata: { [name: string]: any }) => {
    SetupConfigContextValue.configModeSetState(SetupConfigContextValue.configModeList[1]);
    SetupConfigContextValue.configSwitchGUISetState(SetupConfigContextValue.configSwitchGUIList[1]);
  };

  const toolBarCreateMediaObjectText = (funcdata: { [name: string]: any }) => {
    SetupUndoContextValue.pushEditHistory();
    const addClass = new buildSourceSpecies.SourceSpeciesTextClass("( 'ω')", "'Noto Sans JP', sans-serif");
    const t_MediaObjectID = AppContextValue.createMediaObject(addClass);
    AppContextValue.linkMediaObject(funcdata["choiceComposite"], t_MediaObjectID);

    const addAnimatorGroup = ["blockSize", "font"];

    for (let i = 0; i < addAnimatorGroup.length; i++) {
      const thenAddAnimatorGroup = addAnimatorGroup[i];
      const animatorGroupID = AppContextValue.createAnimatorGroup(thenAddAnimatorGroup);
      AppContextValue.linkAnimatorGroup(t_MediaObjectID, animatorGroupID);
      AppContextValue.operationLinkAnimatorGroup(animatorGroupID, thenAddAnimatorGroup);
    }
  };

  const toolBarCreateMediaObjectComposite = (funcdata: { [name: string]: any }) => {
    SetupUndoContextValue.pushEditHistory();
    const addClass = new buildSourceSpecies.SourceSpeciesCompositeClass("");
    const t_MediaObjectID = AppContextValue.createMediaObject(addClass);
    AppContextValue.linkMediaObject(funcdata["choiceComposite"], t_MediaObjectID);
  };

  const toolBarCreateMediaObjectImage = (funcdata: { [name: string]: any }) => {
    SetupUndoContextValue.pushEditHistory();
    const addClass = new buildSourceSpecies.SourceSpeciesImageClass(null);
    const t_MediaObjectID = AppContextValue.createMediaObject(addClass);
    AppContextValue.linkMediaObject(funcdata["choiceComposite"], t_MediaObjectID);

    const addAnimatorGroup = ["blockSize", "filter"];

    for (let i = 0; i < addAnimatorGroup.length; i++) {
      const thenAddAnimatorGroup = addAnimatorGroup[i];
      const animatorGroupID = AppContextValue.createAnimatorGroup(thenAddAnimatorGroup);
      AppContextValue.linkAnimatorGroup(t_MediaObjectID, animatorGroupID);
      AppContextValue.operationLinkAnimatorGroup(animatorGroupID, thenAddAnimatorGroup);
    }
  };

  const toolBarCreateMediaObjectShape = (funcdata: { [name: string]: any }) => {
    SetupUndoContextValue.pushEditHistory();
    const addClass = new buildSourceSpecies.SourceSpeciesChapeClass();
    const t_MediaObjectID = AppContextValue.createMediaObject(addClass);
    AppContextValue.linkMediaObject(funcdata["choiceComposite"], t_MediaObjectID);

    const addAnimatorGroup = ["blockSize", "backgroundColor"];

    for (let i = 0; i < addAnimatorGroup.length; i++) {
      const thenAddAnimatorGroup = addAnimatorGroup[i];
      const animatorGroupID = AppContextValue.createAnimatorGroup(thenAddAnimatorGroup);
      AppContextValue.linkAnimatorGroup(t_MediaObjectID, animatorGroupID);
      AppContextValue.operationLinkAnimatorGroup(animatorGroupID, thenAddAnimatorGroup);
    }
  };

  const toolBarCreateAnimatorGroup = (funcdata: { [name: string]: any }) => {
    SetupConfigContextValue.configModeSetState(SetupConfigContextValue.configModeList[2]);
    SetupConfigContextValue.configSwitchGUISetState(SetupConfigContextValue.configSwitchGUIList[1]);
  };

  const toolBarInputTemplate = (funcdata: { [name: string]: any }) => {
    console.log("template2022_10_04", template2022_10_04);
    AppContextValue.replaceDataCentral(template2022_10_04);
  };

  useEffect(() => {
    let toolBar1 = "fileEdit";
    insertToolBarClassificationArraySetStateValue(toolBar1, "ファイル操作", false);
    insertToolBarEditorDictSetStateValue(toolBar1, "1A", "ダウンロード", downloadFile, false);
    insertToolBarEditorDictSetStateValue(toolBar1, "1B", "アップロード", uploadFile, false);

    let toolBar2 = "buildEdit";
    insertToolBarClassificationArraySetStateValue(toolBar2, "ファイル生成", false);
    insertToolBarEditorDictSetStateValue(toolBar2, "2A", "html出力", buildHtml, false);

    let toolBar3 = "compositeEdit";
    insertToolBarClassificationArraySetStateValue(toolBar3, "コンポジット", false);
    insertToolBarEditorDictSetStateValue(toolBar3, "3A", "新規作成", toolBarCreateComposite, false);

    let toolBar4 = "mediaObjectEdit";
    insertToolBarClassificationArraySetStateValue(toolBar4, "メディアオブジェクト", false);
    insertToolBarEditorDictSetStateValue(toolBar4, "4A", "テキスト挿入", toolBarCreateMediaObjectText, false);
    insertToolBarEditorDictSetStateValue(toolBar4, "4B", "コンポジット挿入", toolBarCreateMediaObjectComposite, false);
    insertToolBarEditorDictSetStateValue(toolBar4, "4C", "画像挿入", toolBarCreateMediaObjectImage, false);
    insertToolBarEditorDictSetStateValue(toolBar4, "4D", "図形挿入", toolBarCreateMediaObjectShape, false);
    insertToolBarEditorDictSetStateValue(toolBar4, "4E", "エフェクトを追加する", toolBarCreateAnimatorGroup, false);

    let toolBar5 = "templateInput";
    insertToolBarClassificationArraySetStateValue(toolBar5, "テンプレート読込", false);
    insertToolBarEditorDictSetStateValue(toolBar5, "5A", "テンプレート1", toolBarInputTemplate, false);

    switchToolBarDetailSetState(toolBar1);
    AppContextValue.updateDOM();
  }, []);

  return (
    <div className="toolBar">
      <div className="toolBar-area">
        <>
          {SetupToolbarContextValue.componentConvertToolBarClassification().map((output: any, index: number) => (
            <ToolBarSingleComponent DownstreamToolBarClassificationData={output} switchToolBarDetailSetState={switchToolBarDetailSetState} key={index} />
          ))}
        </>
      </div>
      <div className="toolBarDetail-area">
        <>
          {SetupToolbarContextValue.componentConvertToolBarEditor(switchToolBarDetail).map((output: any, index: number) => (
            <ToolBarDetailSingleComponent DownstreamToolBarEditorData={output} choiceComposite={SetupEditorContextValue.choiceComposite} key={index} />
          ))}
        </>
      </div>
      <div className="toolBar-composite">
        <p>選択中のコンポジット</p>
        <p>Name : {AppContextValue.getCompositeName(SetupEditorContextValue.choiceComposite)}</p>
        <p>ID : {SetupEditorContextValue.choiceComposite}</p>
      </div>
    </div>
  );
};
export default toolBarComponent;
