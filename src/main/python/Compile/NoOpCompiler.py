import ast

from Processing.Context import Context


class NoOpCompiler:
    @staticmethod
    def compile(ctx: Context, expr: ast.AST) -> str:
        return ""
