import ast

from Compiling.Expression.ExpressionCompiler import ExpressionCompiler
from Error.UnsupportedSyntaxError import UnsupportedSyntaxError
from Processing.PContext import PContext

_OPERAND_MAP = {
    ast.Eq: "eq",
    ast.NotEq: "neq",
    ast.Lt: "lt",
    ast.LtE: "leq",
    ast.Gt: "gt",
    ast.GtE: "geq",
    ast.In: "in",
    ast.NotIn: "notin",
}


class ComparisonCompiler:
    @staticmethod
    def compile(ctx: PContext, expr: ast.Compare) -> str:
        """
        WARNING: Given `w < x < y < z`, `y` is only evaluated once and only if necessary
        """
        compiled_operands = [ExpressionCompiler.compile(ctx, v) for v in expr.comparators]

        last_operand = ExpressionCompiler.compile(ctx, expr.left)
        compiled = ""

        for cmp_no, op in enumerate(expr.ops):
            # NOTE: Last comparison pair, not last operand
            is_last = len(expr.ops) > 1 and cmp_no == len(expr.ops) - 1

            compiled_operand = compiled_operands.pop(0)
            tmp_var = None
            if not is_last:
                tmp_var = ctx.generate_and_use_symbol("cmp")
                compiled_operand = "({} = {})".format(tmp_var, compiled_operand)

            for ast_type, compiled in _OPERAND_MAP.items():
                if isinstance(op, ast_type):
                    compiled_op = compiled
                    compiled_comp = "{} {} {}".format(last_operand, compiled_op, compiled_operand)
                    break
            else:
                is_is = isinstance(op, ast.Is)
                is_isnot = isinstance(op, ast.IsNot)

                if is_is or is_isnot:
                    compiled_comp = "{} {}== {}".format(
                        last_operand,
                        "!" if is_isnot else "=",
                        compiled_operand)

                else:
                    raise UnsupportedSyntaxError(expr)

            compiled += " && " + compiled_comp

            last_operand = tmp_var if tmp_var is not None else compiled_operand

        # Remove starting ampersands and spaces
        return compiled.lstrip("& ")
