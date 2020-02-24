import ast

from Processing.PContext import PContext


class ContinueCompiler:
    @staticmethod
    def compile(ctx: PContext, stmt: ast.Continue) -> str:
        return "continue"
