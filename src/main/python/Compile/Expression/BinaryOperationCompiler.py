import ast

from Compile.Expression.ExpressionCompiler import ExpressionCompiler
from Error.UnsupportedSyntaxError import UnsupportedSyntaxError
from Processing.Context import Context


class BinaryOperationCompiler:
    @staticmethod
    def compile(ctx: Context, expr: ast.BinOp) -> str:
        compiled_lhs = ExpressionCompiler.compile(ctx, expr.left)
        compiled_rhs = ExpressionCompiler.compile(ctx, expr.right)

        if isinstance(expr.op, ast.Add):
            return compiled_lhs + "+" + compiled_rhs

        elif isinstance(expr.op, ast.Sub):
            return compiled_lhs + "-" + compiled_rhs

        elif isinstance(expr.op, ast.Mult):
            return compiled_lhs + "*" + compiled_rhs

        elif isinstance(expr.op, ast.Div):
            return compiled_lhs + "/" + compiled_rhs

        elif isinstance(expr.op, ast.FloorDiv):
            return "window.Math.floor(" + compiled_lhs + "/" + compiled_rhs + ")"

        elif isinstance(expr.op, ast.Mod):
            return compiled_lhs + "%" + compiled_rhs

        elif isinstance(expr.op, ast.Pow):
            return compiled_lhs + "**" + compiled_rhs

        elif isinstance(expr.op, ast.LShift):
            return compiled_lhs + "<<" + compiled_rhs

        elif isinstance(expr.op, ast.RShift):
            return compiled_lhs + ">>" + compiled_rhs

        elif isinstance(expr.op, ast.BitOr):
            return compiled_lhs + "|" + compiled_rhs

        elif isinstance(expr.op, ast.BitXor):
            return compiled_lhs + "^" + compiled_rhs

        elif isinstance(expr.op, ast.BitAnd):
            return compiled_lhs + "&" + compiled_rhs

        else:
            raise UnsupportedSyntaxError(expr)
