# Overloading for optional and union-type parameters

Given:

```typescript
interface A {
  fn(a: string, b?: number, c?: boolean | string, d?: string | string[]): number;
}
```

Generate:

```java
class A {
  double fn(String a);
  double fn(String a, double b);
  double fn(String a, double b, boolean c);
  double fn(String a, double b, String c);
  double fn(String a, double b, boolean c, String d);
  double fn(String a, double b, boolean c, String[] d);
  double fn(String a, double b, String c);
  double fn(String a, double b, String c, String d);
  double fn(String a, double b, String c, String[] d);
}
```
