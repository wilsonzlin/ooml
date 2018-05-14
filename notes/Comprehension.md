# Comprehension

## List

```python
[(x, y) for x in range(10) if x > 5 for y.a in range(10) if y.a < 10]
```

```javascript
var x;
var y;
var _tmp = [];
for (x of range(10)) {
  if (x > 5) {
    for (y.a of range(10)) {
      if (y.a < 10) {
        _tmp.push(Object.freeze([x, y]));
      }
    }  
  }
}
_tmp;
```

## Set

```python
{x * y.a + 0xB33F for x, a.b.c in enumerate(list(range(10))) if x > 5 for y.a in range(10) if y.a < 10}
```

```javascript
var x;
var a;
var y;
var _tmp = [];
for ([x, a.b.c] of enumerate(list(range(10)))) {
  if (x > 5) {
    for (y.a of range(10)) {
      if (y.a < 10) {
        _tmp.push(x * y.a + 0xB33F);
      }
    }  
  }
}
new window.Set(_tmp);
```

## Generator

```python
((x, y) for x in range(10) if x > 5 for y.a in range(10) if y.a < 10)
```
   
```javascript
var x;
var y;
function* gen () {
  for (x of range(10)) {
    if (x > 5) {
      for (y.a of range(10)) {
        if (y.a < 10) {
          yield window.Object.freeze([x, y]);
        }
      }  
    }
  }
}
gen;
```

## Dictionary

```python
{x + 1: y + 2 for x in range(10) if x > 5 for y.a in range(10) if y.a < 10}
```

```javascript
var x;
var y;
var _tmp = [];
for (x of range(10)) {
  if (x > 5) {
    for (y.a of range(10)) {
      if (y.a < 10) {
        _tmp.push([x + 1, y + 2]);
      }
    }  
  }
}
new window.Map(_tmp);
```
