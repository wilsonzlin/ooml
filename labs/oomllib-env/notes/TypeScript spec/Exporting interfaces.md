# Exporting interfaces

Given:

```typescript
interface SomeClass {
  prop: string;
  method(a: boolean | null): number;
}
```

There are two forms:

```typescript
interface SomeClassConstructor {
  new(ca: number, ca2: string): SomeClass;
  readonly prototype: SomeClass;
}

declare const SomeClass: SomeClassConstructor;
```

```typescript
declare var SomeClass: {
  prototype: SomeClass;
  new(ca: number, ca2: string): SomeClass;
};
```

When processing, on the `*Constructor` or inline interface:

- ignore the return type from any constructors, as it may not handle generics properly (e.g. see `WeakSetConstructor`)
- remove the `prototype` property
- ignore the name of the `const`/`var` or `*Constructor` interface
- add all interface body units as static units to the `prototype` interface
- drop the `const`/`var` or `*Constructor` interface

## Indirect constructor

When the constructor return value does not match the class name. 

```typescript
declare var Audio: {
  new(src?: string): HTMLAudioElement;
}
```

## Out-of-order declarations and extensions

- Variable declarations are always parsed at the end.
- Another file may extend a prototype-side interface.
- Another file may extend a static-side interface, and then declare the variablbe again.
- Another file may extend an interface that hasn't been declared yet (because it has yet to be loaded).
