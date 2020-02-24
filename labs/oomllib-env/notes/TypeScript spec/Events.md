# Event declarations

- Classes may be a target of events.
- There are event classes.
- There are event names.
- More than one event name may use the same event class.
  - For example, `dragend` uses `DragEvent`, but so does `dragenter`.
- An event name may be the same name as an event class.
  - For example, `wheel` uses `Wheel`.

## Structure

- There are 5 types of types:
  - The event target class e.g. `Window`.
    - It may extend another event target.
    - It either extends a handler methods interface or implements one directly (i.e. has its own `addEventListener` and `removeEventListener`).
  - The handler methods interface for a common set of event names e.g. `WindowEventHandlers`.
    - It should have `addEventListener` and `removeEventListener` for its set of specific event names.
  - The interface that maps a common set of event names to their event classes e.g. `WindowEventHandlersEventMap`.
    - This may extend another map-like interface.
  - The specific event names e.g. `pointercancel`.
  - The event class e.g. `PointerEvent`.

## Type checking

- TypeScript uses `keyof` and index queries for type checking, but this is basically impossible to replicate in other languages directly.
- A plan for type checking in Java:
