import ast

from Compile.Expression.ExpressionCompiler import ExpressionCompiler
from Error.UnsupportedSyntaxError import UnsupportedSyntaxError
from Processing.Context import Context


class BooleanOperationCompiler:
    @staticmethod
    def compile(ctx: Context, expr: ast.BoolOp) -> str:
        compiled_operands = [ExpressionCompiler.compile(ctx, v) for v in expr.values]

        if isinstance(expr.op, ast.And):
            return " && ".join(compiled_operands)

        elif isinstance(expr.op, ast.Or):
            return " || ".join(compiled_operands)

        else:
            raise UnsupportedSyntaxError(expr)
