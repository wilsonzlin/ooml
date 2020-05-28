import {TemplateElement} from './template';

export const BoundProps = Symbol('ooml.BoundProps');
export const ViewTemplate = Symbol('ooml.ViewTemplate');
export const ViewRoot = Symbol('ooml.ViewRoot');

export type BoundPropDescriptor = {
  value: {
    getter: () => any;
    setter: (val: any) => void;
  } | {
    value: any;
  };
  bindings: {
    anchor: string | Comment;
    compute: Function;
    value: any;
  }[];
};

export type OomlInstance = {
  readonly [BoundProps]: Map<string, BoundPropDescriptor>;
  readonly [ViewRoot]: HTMLElement;
  readonly [ViewTemplate]: TemplateElement;
};

export const isOomlInstance = (val: any): val is OomlInstance => !!val && typeof val == 'object' && ViewRoot in val;

export const attachInstance = (inst: any, elem: HTMLElement) => {
  elem.append(inst[ViewRoot]);
};
