
export interface Position {
  x: number;
  y: number;
}

export enum ElementType {
  SCENE_HEADING = 'scene-heading',
  ACTION = 'action',
  CHARACTER = 'character',
  DIALOGUE = 'dialogue',
  PARENTHETICAL = 'parenthetical',
  TRANSITION = 'transition',
  GENERAL_NOTE = 'general-note',
  SHOT_SUBHEADING = 'shot-subheading',
  PAGE_BREAK = 'page-break',
  MONTAGE_BEGIN = 'montage-begin',
  MONTAGE_END = 'montage-end',
  FLASHBACK_BEGIN = 'flashback-begin',
  FLASHBACK_END = 'flashback-end'
}

export interface ScriptElement {
  id: string;
  type: ElementType;
  content: string;
}
