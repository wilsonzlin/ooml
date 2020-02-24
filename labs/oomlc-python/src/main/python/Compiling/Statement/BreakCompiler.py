import ast

from Processing.PContext import PContext


class BreakCompiler:
    @staticmethod
    def compile(ctx: PContext, stmt: ast.Break) -> str:
        return "break"
