import ast

from Processing.Context import Context


class ContinueCompiler:
    @staticmethod
    def compile(ctx: Context, stmt: ast.Continue) -> str:
        return "continue"
