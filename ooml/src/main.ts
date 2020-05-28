import {attachBinding, BindingType, detachBinding, determineBindingType} from './dom';
import {BoundPropDescriptor, BoundProps, OomlInstance, ViewRoot, ViewTemplate} from './instance';
import {TemplateElement} from './template';

export {ViewTemplate, attachInstance, isOomlInstance} from './instance';
export {TemplateElement, TemplateAttr, TemplateBinding} from './template';
export * from './jsx';

const setUpBoundProp = (name: string, instance: OomlInstance) => {
  const boundProps = instance[BoundProps];

  if (boundProps.has(name)) {
    // Already set up.
    return;
  }

  const existingProp = Object.getOwnPropertyDescriptor(instance, name);
  if (!existingProp) {
    throw new ReferenceError(`${name} is bound in view but does not exist`);
  }
  const {get, set, value} = existingProp;
  if (get && !set || !get && set) {
    throw new SyntaxError(`Only getter/setter exists for ${name}`);
  }
  const boundProp: BoundPropDescriptor = {
    value: get ? {
      getter: get!,
      setter: set!,
    } : {
      value: value,
    },
    bindings: [],
  };
  boundProps.set(name, boundProp);

  Object.defineProperty(instance, name, {
    get () {
      return 'getter' in boundProp.value
        ? boundProp.value.getter.call(instance)
        : boundProp.value.value;
    },
    set (value: any) {
      if ('setter' in boundProp.value) {
        boundProp.value.setter.call(instance, value);
      } else {
        boundProp.value.value = value;
      }

      for (const binding of boundProp.bindings) {
        const {anchor, compute, value: oldValue} = binding;
        const newValue = compute.call(instance);
        if (typeof anchor == 'string') {
          // It's an attribute.
          instance[anchor] = newValue;
        } else {
          // It's an element's child.
          const oldType = determineBindingType(oldValue);
          const newType = determineBindingType(newValue);
          if (oldType == BindingType.TEXT && newType == BindingType.TEXT) {
            anchor.nextSibling!.nodeValue = newValue;
          } else {
            detachBinding(anchor, oldValue);
            attachBinding(anchor, newValue);
          }
        }
        binding.value = newValue;
      }
    },
  });
};

const buildElement = (template: TemplateElement, instance: OomlInstance) => {
  const elem = document.createElement(template.name);

  const boundProps = instance[BoundProps];

  for (const attr of template.attrs) {
    const initialValue = elem[attr.name] = attr.binding.compute.call(instance);
    for (const varName of attr.binding.boundProps) {
      setUpBoundProp(varName, instance);
      boundProps.get(varName)!.bindings.push({
        anchor: attr.name,
        compute: attr.binding.compute,
        value: initialValue,
      });
    }
  }

  for (const child of template.children) {
    if (typeof child == 'string') {
      // Is static text.
      elem.append(child);
    } else if ('boundProps' in child) {
      // Is expression.
      const anchor = document.createComment('');
      elem.append(anchor);
      const initialValue = child.compute.call(instance);
      attachBinding(anchor, initialValue);
      for (const varName of child.boundProps) {
        setUpBoundProp(varName, instance);
        boundProps.get(varName)!.bindings.push({
          anchor,
          compute: child.compute,
          value: initialValue,
        });
      }
    } else {
      // Is element.
      elem.append(buildElement(child, instance));
    }
  }

  return elem;
};

export const OomlClass = <T extends {
  new (...args: any[]): {
    [ViewTemplate]: TemplateElement;
  };
}> (BaseClass: T) => {
  const wrapped = class extends BaseClass {
    constructor (...args: any[]) {
      super(...args);
      // If this is not the leaf class, then leave these to the leaf class.
      if (this.constructor === wrapped) {
        this[BoundProps] = new Map();
        this[ViewRoot] = buildElement(this[ViewTemplate], this as any);
      }
    }
  };
  Object.defineProperty(wrapped, 'name', {value: `OomlWrapped${BaseClass.name}`});
  return wrapped;
};
