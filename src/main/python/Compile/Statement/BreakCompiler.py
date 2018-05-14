import ast

from Processing.Context import Context


class BreakCompiler:
    @staticmethod
    def compile(ctx: Context, stmt: ast.Break) -> str:
        return "break"
