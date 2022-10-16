import * as React from "react";
const { createContext } = React;

type SetupPracticeContextValue = {
  practiceMode: string;
  practiceModeSetState: Function;
  practiceModeList: Array<string>;
  practiceModeHistory: Array<typePracticeStory>;
};

export const SetupPracticeContext = createContext<SetupPracticeContextValue>({} as SetupPracticeContextValue);

export type typePracticeStory = {};
