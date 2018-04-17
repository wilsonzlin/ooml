# Object validation schema

Object with attribute names and values to validate against ->
Schema with property names and rules ->
Resulting object with resulting keys and values

|Schema property rule|Description|Valid values|
|---|---|---|
|default|Value to use if attribute doesn't exist; implies optional|Any|
|equals|Attribute value must equal (`===`) this|Any|
|glob|If attribute value matches regular expression, match attribute name against regular expression, and push an object to the resulting value array (instead of using value directly); the object contains the value as `value` and matched groups joined as `key`|Function|
|notEmptyStr|Attribute value must be a string that's not empty after trimming whitespace from ends|`true`|
|noTrim|Do not trim attribute value before processing it if it is a string|`true`|
|optional|Do not throw error if attribute is missing|`true`|
|regex|Attribute value must be a string that matches provided regular expression|`RegExp` instance|
|skip|Skip attribute|`true`|
|type|Attribute value must be of a specific type|Any `typeof` result|
|validator|Provided function must return truthy value when called with attribute value|Function|
