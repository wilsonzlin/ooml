import ast
from typing import Union

import Util
from Compiling.Expression.ExpressionCompiler import ExpressionCompiler
from Error.InvalidSyntaxError import InvalidSyntaxError
from Error.UnsupportedSyntaxError import UnsupportedSyntaxError
from Processing.PContext import PContext


class TargetsCompiler:
    @staticmethod
    def compile(ctx: PContext,
                target: Union[ast.Name, ast.Tuple, ast.Subscript, ast.Attribute],
                value: str) -> str:
        # TODO Check if variable exists and is assignable (if not here then somewhere)
        if isinstance(target, ast.Name):
            ctx.ensure_assignable_var(target.id)
            return "{} = {}".format(target.id, value)

        elif isinstance(target, ast.Tuple):
            raise UnsupportedSyntaxError(target, "Tuple destructurings")

        elif isinstance(target, ast.Subscript):
            if not isinstance(target.slice, ast.Index):
                raise UnsupportedSyntaxError(target.slice, "Non-index subscript target")

            compiled_base = ExpressionCompiler.compile(ctx, target.value)
            compiled_index = ExpressionCompiler.compile(ctx, target.slice.value)

            return "window.oomlpy.__delstx.setitem({}, {}, {})".format(
                compiled_base,
                compiled_index,
                value)

        elif isinstance(target, ast.Attribute):
            compiled_base = ExpressionCompiler.compile(ctx, target.value)
            compiled_attr = Util.create_js_string_literal(target.attr)

            return "window.oomlpy.__delstx.assign({}, {}, {})".format(
                compiled_base,
                compiled_attr,
                value)

        else:
            raise InvalidSyntaxError(target, "Unknown targets")
