import {isOomlInstance, ViewRoot} from './instance';

export const enum BindingType {
  ARRAY,
  INSTANCE,
  TEXT,
}

export const determineBindingType = (val: any): BindingType =>
  isOomlInstance(val) ? BindingType.INSTANCE :
    Array.isArray(val) ? BindingType.ARRAY :
      BindingType.TEXT;

const attachValue = (after: Node, value: any): Node => {
  const node = isOomlInstance(value) ? value[ViewRoot] : document.createTextNode(value);
  after.parentNode!.insertBefore(node, after.nextSibling);
  return node;
};

export const attachBinding = (anchor: Comment, value: any) => {
  switch (determineBindingType(value)) {
  case BindingType.INSTANCE:
  case BindingType.TEXT:
    attachValue(anchor, value);
    break;
  case BindingType.ARRAY:
    value.reduce((prevNode: Node, elemVal: any) => attachValue(prevNode, elemVal), anchor);
    break;
  }
};

export const detachBinding = (anchor: Comment, oldValue: any) => {
  if (Array.isArray(oldValue)) {
    oldValue.forEach(() => anchor.nextSibling!.remove());
  } else {
    anchor.nextSibling!.remove();
  }
};
