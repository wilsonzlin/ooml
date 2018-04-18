# DOM attribute collector

|Schema property rule|Description|Valid values|
|---|---|---|
|boolean|Attribute is boolean, so must have empty value if provided; collection will have attribute set to false if it wasn't provided|`true`|
|glob|If attribute value matches regular expression, match attribute name against regular expression, and push an object to the resulting value array (instead of using value directly); the object contains the value as `value` and matched groups joined as `key`|Function|
|skip|Skip attribute|`true`|
