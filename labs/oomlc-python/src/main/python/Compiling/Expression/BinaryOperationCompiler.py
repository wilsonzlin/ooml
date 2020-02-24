import ast

from Compiling.Expression.ExpressionCompiler import ExpressionCompiler
from Error.UnsupportedSyntaxError import UnsupportedSyntaxError
from Processing.PContext import PContext

_BINARY_OPS = {
    ast.Add: "add",
    ast.Sub: "sub",
    ast.Mult: "mul",
    ast.Div: "div",
    ast.FloorDiv: "floordiv",
    ast.Mod: "mod",
    ast.Pow: "exp",
    ast.LShift: "blshift",
    ast.RShift: "brshift",
    ast.BitOr: "bor",
    ast.BitXor: "bxor",
    ast.BitAnd: "band",
}


class BinaryOperationCompiler:
    @staticmethod
    def compile(ctx: PContext, expr: ast.BinOp) -> str:
        compiled_lhs = ExpressionCompiler.compile(ctx, expr.left)
        compiled_rhs = ExpressionCompiler.compile(ctx, expr.right)

        for node_type, op in _BINARY_OPS.items():
            if isinstance(expr.op, node_type):
                # $op is already set
                break
        else:
            raise UnsupportedSyntaxError(expr)

        return "window.oomlpy.__delop.{}({}, {})".format(op, compiled_lhs, compiled_rhs)
