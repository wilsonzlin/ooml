import ast

from Compile.Expression.ExpressionCompiler import ExpressionCompiler
from Error.UnsupportedSyntaxError import UnsupportedSyntaxError
from Processing.Context import Context

_UNARY_OPS = {
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


class UnaryOperationCompiler:
    @staticmethod
    def compile(ctx: Context, expr: ast.UnaryOp) -> str:
        compiled_operand = ExpressionCompiler.compile(ctx, expr.operand)

        for node_type, op in _UNARY_OPS.items():
            if isinstance(expr.op, node_type):
                # $op is already set
                break
        else:
            raise UnsupportedSyntaxError(expr)

        return "window.oomlpy.__delop.{}({})".format(op, compiled_operand)
