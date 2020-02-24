import ast

from Compiling.Expression.ExpressionCompiler import ExpressionCompiler
from Error.UnsupportedSyntaxError import UnsupportedSyntaxError
from Processing.PContext import PContext


class DictionaryCompiler:
    @staticmethod
    def compile(ctx: PContext, expr: ast.Dict) -> str:
        compiled_keys = []
        spread_indexes = set()

        for i, k in enumerate(expr.keys):
            if k is None:
                spread_indexes.add(i)

            elif not isinstance(k, ast.Str):
                raise UnsupportedSyntaxError(k, "Non-string-literal dictionary keys")

            else:
                compiled_keys.append(ExpressionCompiler.compile(ctx, k))

        compiled = "new window.Map([\n"

        for i, v in enumerate(expr.values):
            compiled_value = ExpressionCompiler.compile(ctx, v)

            compiled += "\t"

            if i in spread_indexes:
                compiled += "..." + compiled_value  # Don't need .entries() as [Symbol.iterator] returns same value

            else:
                compiled += f"[{compiled_keys[i]}, {compiled_value}], "

            compiled += ",\n"

        compiled += "])"

        return compiled
