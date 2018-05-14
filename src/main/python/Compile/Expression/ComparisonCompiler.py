import ast

from Compile.Expression.ExpressionCompiler import ExpressionCompiler
from Error.UnsupportedSyntaxError import UnsupportedSyntaxError
from Processing.Context import Context

_OPERAND_MAP = {
    ast.Eq: "===",
    ast.NotEq: "!==",
    ast.Lt: "<",
    ast.LtE: "<=",
    ast.Gt: ">",
    ast.GtE: ">=",
    ast.Is: "===",
    ast.IsNot: "!==",
}


class ComparisonCompiler:
    @staticmethod
    def compile(ctx: Context, expr: ast.Compare) -> str:
        # TODO Given `w < x < y < z`, `y` is only evaluated once and only if necessary
        """
        2 < 3 > 5 in a is 3 == 2

        2 < 3 && 3 > 5 && a.has(5) && a === 3 && 3 === 2
        """
        compiled_operands = [ExpressionCompiler.compile(ctx, v) for v in expr.comparators]

        last_operand = ExpressionCompiler.compile(ctx, expr.left)
        compiled = ""

        for op in expr.ops:
            compiled_operand = compiled_operands.pop(0)

            for ast_type, compiled in _OPERAND_MAP.items():
                if isinstance(op, ast_type):
                    compiled_op = compiled
                    compiled_comp = "{} {} {}".format(last_operand, compiled_op, compiled_operand)
                    break
            else:
                is_in = isinstance(op, ast.In)
                is_notin = isinstance(op, ast.NotIn)

                if is_in or is_notin:
                    compiled_comp = "{}{}.has({})".format("!" if is_notin else "", compiled_operand, last_operand)

                else:
                    raise UnsupportedSyntaxError(expr)

            compiled += " && " + compiled_comp

            last_operand = compiled_operand

        # Remove starting ampersands and spaces
        return compiled.lstrip("& ")
