import {TemplateElement} from './template';

export const AutoWrapProps = Symbol('ooml.AutoWrapProps');
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
    anchor: [HTMLElement, string] | Comment;
    compute: Function;
    value: any;
  }[];
};

export type OomlInstance = {
  readonly [AutoWrapProps]: { [prop: string]: Function };
  readonly [BoundProps]: Map<string, BoundPropDescriptor>;
  readonly [ViewRoot]: HTMLElement;
  readonly [ViewTemplate]: TemplateElement;
};

export const isPojo = (val: any): val is object => !!val && [null, Object.prototype].includes(Object.getPrototypeOf(val));

export const isOomlInstance = (val: any): val is OomlInstance => !!val && typeof val == 'object' && ViewRoot in val;

export const attachInstance = (inst: any, elem: HTMLElement) => {
  elem.append(inst[ViewRoot]);
};
