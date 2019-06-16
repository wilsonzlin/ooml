ooml properties that are not [transient](#Transient properties) can have type declarations. A type declaration specifies what types of values the property can accept. Types go into two categories:

- Primitive types: `number`, `string`, and `boolean`
- Class types: any ooml class reference

To declare the type for a property, use the `type` attribute on the `p` declaration:

```html
<p name="aStringProperty" type="string">""</p>
```

If a property does not have a type declaration, it can take any value that is not undefined and null.

The [default value](#Default property values) of a property must be compatible with the type of the property.
