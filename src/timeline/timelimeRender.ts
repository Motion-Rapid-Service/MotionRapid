export type TypeTimelimeRender = {
  playheadViewPos: number;
  staViewTime: number;
  endViewTime: number;
  staStyleRate: number;
  endStyleRate: number;
  timeNavigatorFlag: boolean;
  durationWidth: number;
};

export type TypeTimelimeRenderActionCompositeMove = {
  type: string;
};

export type TypeTimelimeRenderActionTimeNavigatorScroll = {
  type: string;
  staStyleRate: number;
  endStyleRate: number;
};

export type TypeTimelimeRenderActionPlayheadMove = {
  type: string;
  playheadViewPos: number;
};

export type TypeTimelimeRenderActionTimeNavigatorFlag = {
  type: string;
  timeNavigatorFlag: boolean;
};

export type TypeTimelimeRenderActionWindowResize = {
  type: string;
  windowWidthSzie: number;
};

export type TypeMediaObjectRender = { staStylePos: number; endStylePos: number; animatorOpen: boolean };

export type TypeMediaObjectRenderActionUpdate = {
  type: string;
};

export type TypeMediaObjectRenderActionStyle = {
  type: string;
  staStylePos: number;
  endStylePos: number;
};

export type TypeMediaObjectRenderActionAnimatorOpen = {
  type: string;
  animatorOpen: boolean;
};

export type TypeAnimaterKeyframeRender = {};
