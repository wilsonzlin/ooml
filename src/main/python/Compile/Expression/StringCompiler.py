import ast

from Processing.Context import Context


class StringCompiler:
    @staticmethod
    def compile(ctx: Context, expr: ast.Str) -> str:
        val = expr.s \
            .replace("\\", "\\\\") \
            .replace("\r", "\\r") \
            .replace("\n", "\\n") \
            .replace("\"", "\\\"")

        return val
