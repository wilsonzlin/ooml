# Literal

## String

From the docs:

=====

String literals that are part of a single expression and have only whitespace between them will be implicitly converted to a single string literal. That is, (`"spam " "eggs") == "spam eggs"`.

=====

However, this is handled by `ast.parse`.
