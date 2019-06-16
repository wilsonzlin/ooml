# Contributing

## Where to help out

Check out below for currently prioritised goals.

### Compiled APIs

#### All platforms

- Ensuring APIs match closely with native JavaScript APIs.
- Improving ease of use relative to native JavaScript APIs.

#### Java

NOTE: When referring to classes, this includes all types of classes (e.g. interfaces, enums, annotations).

- Normalising and reducing the number of functional interfaces.
- Removing unused classes.
- Creating constructors for classes with no specific ones (such as option bags).
- Improving coverage and accuracy of `@NotNull`/`@Nullable` annotations and `Optional` types.
- Finding better ways to express union types.
- Implementing or improving APIs that were cancelled or restricted due to difficulty.
- Reduce the use of `Object`.
- Making sure classes are not accidently instantiated or extended when appropriate by using `abstract`, `final`, and/or private constructors.
  - This should apply to most classes.
