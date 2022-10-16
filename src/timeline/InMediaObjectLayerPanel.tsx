import * as React from "react";
const { useState, useRef, useEffect, useContext, useReducer, createContext } = React;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppContext, ComponentConvertAnimatorAreaType, ComponentConvertAnimatorGroupType, ComponentConvertAnimatorType } from "../AppContext";
import {
  MediaObjectContext,
  TimelineAreaDivContext,
  LayerPanelContext,
  LayerDurationContext,
  LayerPanelAnimaterContext,
  AnimaterCSSpropertyContext,
  TypeSetCSSpropertyValueAction,
  TypeSetCSSpropertyUnitAction,
} from "./timelineContext";
import { SetupEditorContext } from "./../SetupEditor/SetupEditorContext";
import { SetupConfigContext } from "../SetupEditor/SetupConfigContext";
import { SetupUndoContext } from "./../SetupEditor/SetupUndoContext";

import { TimeNavigatorContext } from "./TimeNavigator/TimeNavigatorContext";

import * as buildSourceSpecies from "./../BuildSite/buildHTML/buildSourceSpecies";
// import { timelineMousePosition ,timelineLayerPanelPostion} from "./timeLineMousePosition";
import * as timelineMousePosition from "./timeLineMousePosition";

import * as middleDataClass from "./../MiddleData/middleDataClass";
import * as AnimatorGroupFormat from "./../AnimatorGroupFormat/AnimatorGroupFormat";
import * as AnimatorGroupPropertyFormat from "./../AnimatorGroupFormat/AnimatorGroupPropertyFormat";
import * as MiddleDataOperationType from "./../MiddleData/middleDataOperationType";

// import generateCSSproperty from "../BuildSite/generateCSSproperty";
class UserHandLayerPanelOperation {
  mousePushPos: number; //マウスが押された時のマウス座標
  //mouseDownKeyframeStyle: number; //マウスが押された時のメディアオブジェクト開始地点
  constructor(send_mousePushPos: number) {
    this.mousePushPos = send_mousePushPos;
  }
}
const UserHandLayerPanelList: {
  [name: string]: UserHandLayerPanelOperation;
} = {};

const SwitchTimelineAreaLayerPanelComponent = (props: any) => {
  const AppContextValue = useContext(AppContext);
  const MediaObjectContextValue = useContext(MediaObjectContext);
  const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);
  const LayerPanelContextValue = useContext(LayerPanelContext);
  const animatorOpen = MediaObjectContextValue.animatorOpen as boolean;
  const animatorOpenSetState = MediaObjectContextValue.animatorOpenSetState;
  useEffect(() => {
    const positon = timelineMousePosition.mediaObjectTimelinePostion(
      TimelineAreaDivContextValue.timelineScrollElement,
      LayerPanelContextValue.timelineAreaLayerPanelElement
    );

    const size = timelineMousePosition.elementSize(LayerPanelContextValue.timelineAreaLayerPanelElement);

    const yPosHeight = [positon[1], positon[1] + size[1]];

    TimelineAreaDivContextValue.mediaObejctDivHeightSetStateValue(MediaObjectContextValue.mediaObejctIndex, yPosHeight);
  }, [AppContextValue.update, MediaObjectContextValue.mediaObjectUUID, animatorOpen, TimelineAreaDivContextValue.animationOpenUpdate]);

  if (animatorOpen) {
    return (
      <div className="layer_panel-animator">
        {AppContextValue.componentConvertAnimatorArea(MediaObjectContextValue.mediaObjectUUID).map(
          (output: ComponentConvertAnimatorAreaType, index: number) => (
            // <>{fruit}</> //SurfaceControlIndividualを追加するmap (list_surface_controlに入っている)
            <SwitchLayerPanelAnimaterGroupComponent DownstreamMiddleDataAnimator={output} key={index} />
          )
        )}
      </div>
    );
  } else {
    return <></>;
  }
};

export const TimelineAreaLayerPanelComponent = (props: any) => {
  const AppContextValue = useContext(AppContext);
  const MediaObjectContextValue = useContext(MediaObjectContext);
  const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);
  const timelineAreaLayerPanelElement = useRef(null);
  const SetupEditorContextValue = useContext(SetupEditorContext);
  const SetupUndoContextValue = useContext(SetupUndoContext);
  const SetupConfigContextValue = useContext(SetupConfigContext);

  const animatorOpen = MediaObjectContextValue.animatorOpen as boolean;
  const animatorOpenSetState = MediaObjectContextValue.animatorOpenSetState;

  const mouseUp = (event: any) => {
    if (!(MediaObjectContextValue.mediaObjectUUID in UserHandLayerPanelList)) {
      return;
    }

    const thenY = timelineMousePosition.timelineMousePostion(event, TimelineAreaDivContextValue.timelineScrollElement)[1];

    const staY = Object.values(UserHandLayerPanelList)[0].mousePushPos;

    const spaceNumber = TimelineAreaDivContextValue.mediaObjectSwopInsertionDestination(staY, thenY);

    if (spaceNumber < 0) {
      return;
    }
    SetupUndoContextValue.pushEditHistory();
    AppContextValue.swopMediaObject(SetupEditorContextValue.choiceComposite, MediaObjectContextValue.mediaObejctIndex, spaceNumber);

    delete UserHandLayerPanelList[MediaObjectContextValue.mediaObjectUUID];

    TimelineAreaDivContextValue.focusMediaObjectSpaceSetState(-1);
    AppContextValue.updateDOM();
  };
  const mouseMove = (event: any) => {
    if (!(MediaObjectContextValue.mediaObjectUUID in UserHandLayerPanelList)) {
      return;
    }

    const thenY = timelineMousePosition.timelineMousePostion(event, TimelineAreaDivContextValue.timelineScrollElement)[1];

    const staY = Object.values(UserHandLayerPanelList)[0].mousePushPos;

    const spaceNumber = TimelineAreaDivContextValue.mediaObjectSwopInsertionDestination(staY, thenY);

    TimelineAreaDivContextValue.focusMediaObjectSpaceSetState(spaceNumber);
  };

  const mouseDown = (event: any) => {
    if (SetupConfigContextValue.configMode !== SetupConfigContextValue.configModeList[0]) {
      return;
    }

    if (event.ctrlKey || event.metaKey) {
      const mousePushPosY = timelineMousePosition.timelineMousePostion(event, TimelineAreaDivContextValue.timelineScrollElement)[1];
      UserHandLayerPanelList[MediaObjectContextValue.mediaObjectUUID] = new UserHandLayerPanelOperation(mousePushPosY);
    }
  };
  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
    };
  }, [MediaObjectContextValue.mediaObjectUUID, animatorOpen]);

  return (
    <div className="media_object-area-layer_panel" ref={timelineAreaLayerPanelElement} onMouseDown={mouseDown} style={{}}>
      <LayerPanelContext.Provider value={{ timelineAreaLayerPanelElement: timelineAreaLayerPanelElement }}>
        <LayerPanelMediaObjectComponent />
        <SwitchTimelineAreaLayerPanelComponent />
      </LayerPanelContext.Provider>
    </div>
  );
};

export const LayerPanelMediaObjectComponent = (props: any) => {
  const AppContextValue = useContext(AppContext);
  const MediaObjectContextValue = useContext(MediaObjectContext);
  const SetupConfigContextValue = useContext(SetupConfigContext);
  // const MediaObjectContextValue = useContext(MediaObjectContext);
  const animatorOpen = MediaObjectContextValue.animatorOpen as boolean;
  const animatorOpenSetState = MediaObjectContextValue.animatorOpenSetState;
  const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);
  const MouseDoubleClick = (event: any) => {
    animatorOpenSetState(!animatorOpen);

    TimelineAreaDivContextValue.focusMediaObjectSpaceSetState(-1);
  };

  return (
    <div className="layer_panel-entity" onDoubleClick={MouseDoubleClick}>
      <p>{AppContextValue.getMediaObjectName(MediaObjectContextValue.mediaObjectUUID)}</p>
      <MediaObjectFixedCheckBox MediaObject_ID={MediaObjectContextValue.mediaObjectUUID} />
    </div>
  );
};

const MediaObjectFixedCheckBox = (props: any) => {
  const MediaObject_ID: string = props.MediaObject_ID;
  const AppContextValue = useContext(AppContext);
  const nowFlag = AppContextValue.getMediaObejctCSSFixed(MediaObject_ID);
  const [fixedFlag, fixedFlagSetState] = useState(nowFlag);
  const mouseDown = () => {
    fixedFlagSetState(!fixedFlag);
    AppContextValue.setMediaObejctCSSFixed(MediaObject_ID, !fixedFlag);
  };
  return <div className="layer_panel-entity-fixed_flag" onMouseDown={mouseDown}></div>;
};

export const SwitchLayerPanelAnimaterGroupComponent = (props: any) => {
  const entitySpecies = props.DownstreamMiddleDataAnimator["entitySpecies"];

  if (entitySpecies === "AnimatorGroup") {
    return <LayerPanelAnimaterGroupComponent DownstreamMiddleDataAnimator={props.DownstreamMiddleDataAnimator} />;
  } else if (entitySpecies === "Animator") {
    return <LayerPanelAnimaterComponent DownstreamMiddleDataAnimator={props.DownstreamMiddleDataAnimator} />;
  }
};

export const LayerPanelAnimaterGroupComponent = (props: any) => {
  // const AppContextValue = useContext(AppContext);

  const DownstreamMiddleDataAnimator: ComponentConvertAnimatorGroupType = props.DownstreamMiddleDataAnimator;
  const AnimatorGroup_ID: string = DownstreamMiddleDataAnimator.AnimatorGroup_ID;
  const AnimatorGroup_Species: string = DownstreamMiddleDataAnimator.AnimatorGroup_Species;
  const MediaObjectContextValue = useContext(MediaObjectContext);
  const SetupConfigContextValue = useContext(SetupConfigContext);

  const mouseDoubleClick = (event: any) => {
    const clientX = event.clientX;
    const clientY = event.clientY;

    SetupConfigContextValue.cssLeftSetState(clientX + 10);
    SetupConfigContextValue.cssTopSetState(clientY + 10);

    SetupConfigContextValue.setConfigModeArgsOption({
      AnimatorGroup_ID: AnimatorGroup_ID,
      MediaObject_ID: MediaObjectContextValue.mediaObjectUUID,
    });
    SetupConfigContextValue.configModeSetState(SetupConfigContextValue.configModeList[9]);
    SetupConfigContextValue.configSwitchGUISetState(SetupConfigContextValue.configSwitchGUIList[2]);
  };

  return (
    <div className="layer_panel-animator_group-entity" onDoubleClick={mouseDoubleClick}>
      <p>{AnimatorGroup_Species}</p>
    </div>
  );
};

export const LayerPanelAnimaterComponent = (props: any) => {
  const DownstreamMiddleDataAnimator: ComponentConvertAnimatorType = props.DownstreamMiddleDataAnimator;
  const Animator_ID: string = DownstreamMiddleDataAnimator.Animator_ID;
  const Animator_propertySpecies: string = DownstreamMiddleDataAnimator.Animator_propertySpecies;
  const AnimatorGroup_Species: string = DownstreamMiddleDataAnimator.AnimatorGroup_Species;
  const AppContextValue = useContext(AppContext);
  const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);
  const MediaObjectContextValue = useContext(MediaObjectContext);
  const SetupConfigContextValue = useContext(SetupConfigContext);

  useEffect(() => {
    if (SetupConfigContextValue.configMode !== SetupConfigContextValue.configModeList[0]) {
      delete UserHandLayerPanelList[MediaObjectContextValue.mediaObjectUUID];
      TimelineAreaDivContextValue.focusMediaObjectSpaceSetState(-1);
      AppContextValue.updateDOM();
    }
  }, [SetupConfigContextValue.configMode]);

  // const onClick = () => {
  //   //イベント開放用
  //   console.log("LayerPanelAnimaterComponent Onclick");

  //   delete UserHandLayerPanelList[MediaObjectContextValue.mediaObjectUUID];
  //   TimelineAreaDivContextValue.focusMediaObjectSpaceSetState(-1);
  //   AppContextValue.updateDOM();
  // };
  return (
    <LayerPanelAnimaterContext.Provider
      value={{ Animator_ID: Animator_ID, Animator_propertySpecies: Animator_propertySpecies, AnimatorGroup_Species: AnimatorGroup_Species }}
    >
      <div className="layer_panel-animator-entity">
        {/* <AnimaterLeftKeyframeMoveButton /> */}
        <AnimaterInsertKeyframeButton Animator_ID={Animator_ID} />
        {/* <AnimaterRightKeyframeMoveButton /> */}
        <p className="layer_panel-animator-entity-animator_name">{Animator_propertySpecies}</p>
        <AnimaterCSSproperty Animator_ID={Animator_ID} />
      </div>
    </LayerPanelAnimaterContext.Provider>
  );
};

const AnimaterInsertKeyframeButton = (props: any) => {
  const AppContextValue = useContext(AppContext);
  const SetupUndoContextValue = useContext(SetupUndoContext);
  const SetupEditorContextValue = useContext(SetupEditorContext);
  const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);

  const mouseDown = () => {
    SetupUndoContextValue.pushEditHistory();

    const Animator_ID = props.Animator_ID;
    const keyframeID: string = AppContextValue.operationCreateKeyframe();
    AppContextValue.linkKeyframe(Animator_ID, keyframeID);

    const temp: MiddleDataOperationType.OperationKeyframeTimeType = {
      KeyframeID: keyframeID,
      time: AppContextValue.getCompositePlayheadTimePos(SetupEditorContextValue.choiceComposite),
    };

    // TimelineAreaDivContextValue.focusMediaObjectSpaceSetState(-1);

    AppContextValue.operationKeyframeTime(temp);

    AppContextValue.updateDOM();
  };
  return <div className="layer_panel-animator-entity-insert_keyframe_button" onMouseDown={mouseDown}></div>;
};

const AnimaterLeftKeyframeMoveButton = (props: any) => {
  const AppContextValue = useContext(AppContext);
  const SetupUndoContextValue = useContext(SetupUndoContext);

  const mouseDown = () => {
    // SetupUndoContextValue.pushEditHistory();
    AppContextValue.updateDOM();
  };
  return <div className="layer_panel-animator-entity-insert_keyframe_button" onMouseDown={mouseDown}></div>;
};

const AnimaterRightKeyframeMoveButton = (props: any) => {
  const AppContextValue = useContext(AppContext);
  const SetupUndoContextValue = useContext(SetupUndoContext);

  const mouseDown = () => {
    // SetupUndoContextValue.pushEditHistory();
    AppContextValue.updateDOM();
  };
  return <div className="layer_panel-animator-entity-insert_keyframe_button" onMouseDown={mouseDown}></div>;
};

const AnimaterCSSproperty = (props: any) => {
  const AppContextValue = useContext(AppContext);
  const LayerPanelAnimaterContextValue = useContext(LayerPanelAnimaterContext);
  const AnimaterCSSpropertyContextValue = useContext(AnimaterCSSpropertyContext);

  const OwnedID_Keyframe: Array<string> = AppContextValue.getOwnedID_Keyframe(LayerPanelAnimaterContextValue.Animator_ID);
  const isAnimator = OwnedID_Keyframe.length === 0;

  const AnimatorCSSPropertyID = AppContextValue.getOwnedID_CSSPropertySpeciesHasAnimator(LayerPanelAnimaterContextValue.Animator_ID);
  const CSSPropertyUnit: string = AppContextValue.getCSSPropertyUnit(AnimatorCSSPropertyID);
  const CSSPropertyValue: string = AppContextValue.getCSSPropertyValue(AnimatorCSSPropertyID);
  const TimeNavigatorContextValue = useContext(TimeNavigatorContext);
  const SetupEditorContextValue = useContext(SetupEditorContext);

  const animatorGroupFormat: AnimatorGroupPropertyFormat.PropertyFormatSpecies = AnimatorGroupFormat.getAnimatorGroupFormatList(
    LayerPanelAnimaterContextValue.AnimatorGroup_Species
  ); //cssのpropertyによる

  const cssPropertySpeciesList = animatorGroupFormat.cssPropertySpeciesList; //そのpropertyに指定できるvalue一覧
  const cssPropertySpecies = cssPropertySpeciesList[LayerPanelAnimaterContextValue.Animator_propertySpecies]; //そのvalueはどのような指定方法をするか 文字列か数値か
  const cssValueUnitList: Array<string> = Object.assign(AnimatorGroupPropertyFormat.cssValueUnit[cssPropertySpecies]); //そのcssのpropertyがどのような値をとりえるか

  //初期値設定用+

  const setCSSpropertyValue = (state: any, action: TypeSetCSSpropertyValueAction): string => {
    console.log("setCSSpropertyValue", action.cssValue);

    if (action.actionType === "previewUpdate") {
      if (isAnimator) {
        const newValue = AppContextValue.getCSSPropertyValue(AnimatorCSSPropertyID);
        console.log("setCSSpropertyValue previewUpdate A", newValue);
        return newValue;
      } else {
        const newValue = SetupEditorContextValue.getKeyframeValue(OwnedID_Keyframe, TimeNavigatorContextValue.getPlayheadTime());
        console.log("setCSSpropertyValue previewUpdate B", newValue);
        return newValue;
      }
    }

    switch (isAnimator) {
      case true:
        const unitSendData: MiddleDataOperationType.OoperationCSSPropertyValueType = {
          CSSPropertyID: AnimatorCSSPropertyID,
          CSSPropertyValue: action.cssValue,
        };
        AppContextValue.operationCSSPropertyValue(unitSendData);
        return action.cssValue;

      case false:
        if (action.actionType !== "user") {
          return action.cssValue;
        }

        const nowTime = TimeNavigatorContextValue.getPlayheadTime();
        const equalsThenKeyframeID = AppContextValue.equalsKeyframeTime(nowTime, LayerPanelAnimaterContextValue.Animator_ID);
        if (!equalsThenKeyframeID) {
          // 同じ時間にkeyframeが存在するかを確認する;
          // 存在しない場合;
          const keyframeID: string = AppContextValue.operationCreateKeyframe();
          AppContextValue.linkKeyframe(LayerPanelAnimaterContextValue.Animator_ID, keyframeID);
          const temp: MiddleDataOperationType.OperationKeyframeTimeType = { KeyframeID: keyframeID, time: nowTime };
          AppContextValue.operationKeyframeTime(temp);
          const thenCSSPropertyID: string = AppContextValue.getOwnedID_CSSPropertySpeciesHasKeyframe(keyframeID);
          const unitSendData: MiddleDataOperationType.OoperationCSSPropertyValueType = {
            CSSPropertyID: thenCSSPropertyID,
            CSSPropertyValue: action.cssValue,
          };
          AppContextValue.operationCSSPropertyValue(unitSendData);
        } else {
          const thenCSSPropertyID: string = AppContextValue.getOwnedID_CSSPropertySpeciesHasKeyframe(equalsThenKeyframeID);
          const unitSendData: MiddleDataOperationType.OoperationCSSPropertyValueType = {
            CSSPropertyID: thenCSSPropertyID,
            CSSPropertyValue: action.cssValue,
          };
          AppContextValue.operationCSSPropertyValue(unitSendData);
        }
        //存在する場合
        return action.cssValue;
    }
  };

  const setCSSpropertyUnit = (state: any, action: TypeSetCSSpropertyUnitAction): string => {
    const unitSendData: MiddleDataOperationType.OoperationCSSPropertyUnitType = {
      CSSPropertyID: AnimatorCSSPropertyID,
      CSSPropertyUnit: action.cssUnit,
    };
    AppContextValue.operationCSSPropertyUnit(unitSendData);

    return action.cssUnit;
  };

  const [animaterCSSpropertyValue, animaterCSSpropertyValueUpdate] = useReducer(setCSSpropertyValue, CSSPropertyValue);
  const [animaterCSSpropertyUnit, animaterCSSpropertyUnitUpdate] = useReducer(setCSSpropertyUnit, CSSPropertyUnit);

  useEffect(() => {
    SetupEditorContextValue.previewUpdateDOM();
  }, [animaterCSSpropertyValue, animaterCSSpropertyUnit]);

  useEffect(() => {
    if (!isAnimator) {
      animaterCSSpropertyValueUpdate({
        actionType: "",
        cssValue: SetupEditorContextValue.getKeyframeValue(OwnedID_Keyframe, TimeNavigatorContextValue.getPlayheadTime()),
      });
    }
  }, [TimeNavigatorContextValue.playheadViewPos]);

  useEffect(() => {
    animaterCSSpropertyValueUpdate({
      actionType: "previewUpdate",
      cssValue: null,
    });
  }, [SetupEditorContextValue.previewUpdate]);

  let unitMessage = "";
  if (
    cssPropertySpecies === AnimatorGroupPropertyFormat.propertySpeciesUnitList[2] ||
    cssPropertySpecies === AnimatorGroupPropertyFormat.propertySpeciesUnitList[3]
  ) {
    unitMessage = "0~255";
  }

  if (cssPropertySpecies === AnimatorGroupPropertyFormat.propertySpeciesUnitList[8]) {
    unitMessage = "0~1の小数数値";
  }

  return (
    <div className="layer_panel-animator-entity-css_property">
      <AnimaterCSSpropertyContext.Provider
        value={{
          animaterCSSpropertyValue: animaterCSSpropertyValue,
          animaterCSSpropertyValueUpdate: animaterCSSpropertyValueUpdate,
          animaterCSSpropertyUnit: animaterCSSpropertyUnit,
          animaterCSSpropertyUnitUpdate: animaterCSSpropertyUnitUpdate,
        }}
      >
        <AnimaterCSSpropertyValue />
        <AnimaterCSSpropertyUnit />
        <p className="layer_panel-animator-entity-css_property-unit_message">{unitMessage}</p>
      </AnimaterCSSpropertyContext.Provider>
    </div>
  );
};

const AnimaterCSSpropertyValue = () => {
  const LayerPanelAnimaterContextValue = useContext(LayerPanelAnimaterContext);
  const AnimaterCSSpropertyContextValue = useContext(AnimaterCSSpropertyContext);

  const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);

  const onChange = (event: any) => {
    const text = event.target.value;
    console.log("onChangeAnimater");
    // AnimaterCSSpropertyContextValue.animaterCSSpropertyValueSetState(String(text));

    AnimaterCSSpropertyContextValue.animaterCSSpropertyValueUpdate({ actionType: "user", cssValue: String(text) });

    // TimelineAreaDivContextValue.focusMediaObjectSpaceSetState(-1);
  };
  return <input className="text_box_common" type="number" value={AnimaterCSSpropertyContextValue.animaterCSSpropertyValue} onChange={onChange} />;
};

const AnimaterCSSpropertyUnit = () => {
  const LayerPanelAnimaterContextValue = useContext(LayerPanelAnimaterContext);
  const AnimaterCSSpropertyContextValue = useContext(AnimaterCSSpropertyContext);
  const animatorGroupFormat: AnimatorGroupPropertyFormat.PropertyFormatSpecies = AnimatorGroupFormat.getAnimatorGroupFormatList(
    LayerPanelAnimaterContextValue.AnimatorGroup_Species
  ); //cssのpropertyによる

  const cssPropertySpeciesList = animatorGroupFormat.cssPropertySpeciesList; //そのpropertyに指定できるvalue一覧
  const cssPropertySpecies = cssPropertySpeciesList[LayerPanelAnimaterContextValue.Animator_propertySpecies]; //そのvalueはどのような指定方法をするか 文字列か数値か
  const cssValueUnitList: Array<string> = Object.assign(AnimatorGroupPropertyFormat.cssValueUnit[cssPropertySpecies]); //そのcssのpropertyがどのような値をとりえるか

  const TimelineAreaDivContextValue = useContext(TimelineAreaDivContext);

  const onChange = (event: any) => {
    const selectValue = String(event.target.value);
    console.log("selectValue", selectValue, event.target.value);
    AnimaterCSSpropertyContextValue.animaterCSSpropertyUnitUpdate({ actionType: "", cssUnit: selectValue });

    // TimelineAreaDivContextValue.focusMediaObjectSpaceSetState(-1);
  };
  if (cssValueUnitList.length === 0) {
    return <></>;
  }
  return (
    <>
      <select className="select_common" onChange={onChange} value={AnimaterCSSpropertyContextValue.animaterCSSpropertyUnit}>
        {cssValueUnitList.map((output: string, index: number) => (
          <AnimaterCSSpropertyUnitOption output={output} index={index} key={index} />
        ))}
      </select>
    </>
  );
};
const AnimaterCSSpropertyUnitOption = (props: any) => {
  const LayerPanelAnimaterContextValue = useContext(LayerPanelAnimaterContext);

  const animatorGroupFormat: AnimatorGroupPropertyFormat.PropertyFormatSpecies = AnimatorGroupFormat.getAnimatorGroupFormatList(
    LayerPanelAnimaterContextValue.AnimatorGroup_Species
  ); //cssのpropertyによる

  const cssPropertySpeciesList = animatorGroupFormat.cssPropertySpeciesList; //そのpropertyに指定できるvalue一覧
  const cssPropertySpecies = cssPropertySpeciesList[LayerPanelAnimaterContextValue.Animator_propertySpecies]; //そのvalueはどのような指定方法をするか 文字列か数値か
  const cssValueUnitList: Array<string> = Object.assign(AnimatorGroupPropertyFormat.cssValueUnit[cssPropertySpecies]); //そのcssのpropertyがどのような値をとりえるか

  return <option value={props.output}>{props.output}</option>;
  // }
};
