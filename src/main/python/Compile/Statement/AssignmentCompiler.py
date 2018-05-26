import ast
from typing import Union

from Compile.Expression.ExpressionCompiler import ExpressionCompiler
from Compile.TargetsCompiler import TargetsCompiler
from Processing.Context import Context


class AssignmentCompiler:
    @staticmethod
    def compile(ctx: Context, stmt: Union[ast.Assign, ast.AnnAssign]) -> str:
        # TODO Eventually handle complex targets (also TODO on TargetsCompiler)
        # TODO Annotated assignment

        compiled = ""

        compiled_value = ExpressionCompiler.compile(ctx, stmt.value)

        if len(stmt.targets) > 1:
            tmp_var = ctx.generate_and_use_symbol()
            compiled += "{} = {};\n".format(tmp_var, compiled_value)
            compiled_value = tmp_var

        for target in stmt.targets:
            compiled += TargetsCompiler.compile(ctx, target, compiled_value) + ";\n"

        return compiled
