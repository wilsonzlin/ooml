import ast

from Compile.Expression.ExpressionCompiler import ExpressionCompiler
from Error.UnsupportedSyntaxError import UnsupportedSyntaxError
from Processing.Context import Context


class UnaryOperationCompiler:
    @staticmethod
    def compile(ctx: Context, expr: ast.UnaryOp) -> str:
        compiled_operand = ExpressionCompiler.compile(ctx, expr.operand)

        if isinstance(expr.op, ast.Not):
            return "!" + compiled_operand

        elif isinstance(expr.op, ast.USub):
            return "-" + compiled_operand

        elif isinstance(expr.op, ast.Invert):
            return "~" + compiled_operand

        else:
            raise UnsupportedSyntaxError(expr)
