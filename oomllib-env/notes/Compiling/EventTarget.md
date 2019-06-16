# EventTarget

## Requirements

- Must compile.
- Must take into account type erasure.
- Must only accept compatible event types for class (which includes all super types, and excludes all descendant types). For example, `HTMLElement` cannot take `canplay` but `HTMLMediaElement` can take `click`.

## Ideas

### Implement on every class with <Target, Type>

- Won't work in Java if inheriting from a class implementing EventTarget to due type erasure.

### Only implement on top-level classes

- Won't work for lower-level classes (e.g. `HTMLElement`, `HTMLMediaElement`).

### Only implement on lowest-level classes

- Higher-level classes won't have methods, so a cast to a specific type is needed to use them (and the type needs to be known beforehand).
- Won't accept ancestor event types (e.g. `HTMLMediaElement` can't take `HTMLElement` events).

### Directly implement on classes

- Won't work due to inheritance and type erasure combination.

### Make methods generic (rather than class)

- Won't ensure specific type is compatible with class.

### Propagate generic parameters across all descendant classes

```java
class EventTarget<Target extends EventTarget<Target, Type>, Type extends EventType> {
  <SpecificType extends Type> void addEventListener(Class<SpecificType> type, Listener<Target, SpecificType> listener) {}
}
class HTMLElement<Target extends HTMLElement<Target, Type>, Type extends HTMLElementEventType> extends EventTarget<Target, Type> {
}
class HTMLMediaElement<Target extends HTMLMediaElement<Target, Type>, Type extends HTMLMediaElementEventType> extends HTMLElement<Target, Type> {
}
class HTMLVideoElement extends HTMLMediaElement<HTMLVideoElement, HTMLVideoElementEventMap> {
}
```

- Messy.
- Need to provide generic arguments to non-lowest classes.
  - Not sure how to, seems to infinitely recurse?
- Event map interfaces need to subclass, so descendant event types are also accepted, which are unlikely to be valid.
- Ancestor event types are not accepted.

### Directly implement on classes with unique method names

```java
class HTMLElement {
  <T extends HTMLElementEventType> void addHTMLElementEventListener(Class<T> type, Listener<Node, T> listener) {};
}
class HTMLMediaElement extends HTMLElement {
  <T extends HTMLMediaElementEventType> void addHTMLMediaElementEventListener(Class<T> type, Listener<Node, T> listener) {};
}
```

- Works, but verbose.
- If event map interfaces don't subclass, each method only accepts own types.
  - Ancestor event types are accepted, descendant ones are not. (Perfect.)
