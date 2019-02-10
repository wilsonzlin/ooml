import ast

from Processing.PContext import PContext


class NoOpCompiler:
    @staticmethod
    def compile(ctx: PContext, expr: ast.AST) -> str:
        return ""
