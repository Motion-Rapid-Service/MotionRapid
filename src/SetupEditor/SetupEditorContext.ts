import * as React from "react";
const { createContext } = React;

type SetupEditorContextValue = {
  choiceComposite: string;
  choiceCompositeSetState: Function;
  playHeadTime: number;
  playHeadTimeSetState: Function;

  insertUserHandMediaObject: Function;
  deleteUserHandMediaObject: Function;
  hasUserHandMediaObject: Function;
  getUserHandMediaObject: Function;
  getUserHandMediaObjectIDArray: Function;
  alldeleteUserHandMediaObject: Function;

  insertUserHandKeyframe: Function;
  deleteUserHandKeyframe: Function;
  hasUserHandKeyframe: Function;
  getUserHandKeyframe: Function;
  getUserHandKeyframeIDArray: Function;
  alldeleteUserHandKeyframe: Function;
};

export const SetupEditorContext = createContext<SetupEditorContextValue>({} as SetupEditorContextValue);
