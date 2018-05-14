import ast

from Processing.Context import Context


class AssignmentCompiler:
    @staticmethod
    def compile(ctx: Context, stmt: ast.Assign) -> str:
        ...
