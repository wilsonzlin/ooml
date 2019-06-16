import ast

from Compiling.Expression.ExpressionCompiler import ExpressionCompiler
from Compiling.TargetsCompiler import TargetsCompiler
from Error.UnsupportedSyntaxError import UnsupportedSyntaxError
from Processing.PContext import PContext

_IASSIGN_OP = {
    ast.Add: "iadd",
    ast.Sub: "isub",
    ast.Mult: "imul",
    ast.Div: "idiv",
    ast.FloorDiv: "ifloordiv",
    ast.Mod: "imod",
    ast.Pow: "iexp",
    ast.LShift: "iblshift",
    ast.RShift: "ibrshift",
    ast.BitOr: "ibor",
    ast.BitXor: "ibxor",
    ast.BitAnd: "iband",
}


class InlineAssignmentCompiler:
    @staticmethod
    def compile(ctx: PContext, stmt: ast.AugAssign) -> str:
        for node_type, op in _IASSIGN_OP.items():
            if isinstance(stmt.op, node_type):
                # $op is already set
                break
        else:
            raise UnsupportedSyntaxError(stmt)

        # TODO Eventually handle all subscript targets (also TODO on TargetsCompiler)
        compiled_target_read = ExpressionCompiler.compile(ctx, stmt.target)
        compiled_value = ExpressionCompiler.compile(ctx, stmt.value)
        compiled_result = "window.oomlpy.__delop.{}({}, {})".format(
            op,
            compiled_target_read,
            compiled_value)

        compiled_target = TargetsCompiler.compile(ctx, stmt.target, compiled_result)

        # Yes the transpilation is correct
        # If `a.b` is an instance of `B` and `B` has `__iadd__` returning `x`,
        # `a.b += some_val` -> `a.b == x`, even if `x` is None or not of type `B`
        # Continuing on, if `a` is an instance of `B`, `a += some_val` -> `a == x`

        return compiled_target
