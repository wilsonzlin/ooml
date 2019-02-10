import ast
from typing import Union, Tuple, List

import Util
from Compiling.Expression.ExpressionCompiler import ExpressionCompiler
from Compiling.TargetsCompiler import TargetsCompiler
from Error.UnsupportedSyntaxError import UnsupportedSyntaxError
from Processing.PContext import PContext


class ComprehensionCompiler:
    @classmethod
    def _compile_test_expressions(cls, ctx: PContext, exprs: List[ast.expr]) -> Tuple[str, str]:
        compiled_cond = ExpressionCompiler.compile(ctx, exprs[0])

        compiled_left = f"if (window.oomlpy.__delstx.if({compiled_cond})) {{\n"
        compiled_right = "\n}"

        if len(exprs) > 1:
            compiled_nested = cls._compile_test_expressions(ctx, exprs[1:])
            compiled_left += Util.indent(compiled_nested[0])
            compiled_right += Util.indent(compiled_nested[1])

        return compiled_left, compiled_right

    @classmethod
    def _compile_comprehensions(cls, ctx: PContext, comps: List[ast.comprehension]) -> Tuple[str, str]:
        gen = comps[0]

        if gen.is_async:
            raise UnsupportedSyntaxError(gen, "Async comprehensions")

        # TODO Refactor---copied from ForCompiler

        iter_var = ctx.generate_and_use_symbol("comp_iterator")
        compiled_iter = "{} = window.oomlpy.__fn.iter({});\n".format(
            iter_var,
            ExpressionCompiler.compile(ctx, gen.iter))

        next_var = ctx.generate_and_use_symbol("comp_iterator_next")

        compiled_target = TargetsCompiler.compile(ctx, gen.target, f"{next_var}.value")

        compiled_left = f"""
            {compiled_iter}
            while (true) {{
                {next_var} = {iter_var}.next();
                if ({next_var}.done) {{
                    break;
                }}
                {compiled_target}
        """

        compiled_right = "\n}"

        if gen.ifs:
            compiled_ifs = cls._compile_test_expressions(ctx, gen.ifs)
            compiled_left += Util.indent(compiled_ifs[0])
            compiled_right += Util.indent(compiled_ifs[1])

        if len(comps) > 1:
            compiled_other_gens = cls._compile_comprehensions(ctx, comps[1:])
            # TODO: This indentation is not correct
            compiled_left += Util.indent(compiled_other_gens[0])
            compiled_right += Util.indent(compiled_other_gens[1])

        return compiled_left, compiled_right

    @classmethod
    def compile(cls, ctx: PContext, expr: Union[ast.ListComp, ast.SetComp, ast.GeneratorExp, ast.DictComp]) -> str:
        is_list = isinstance(expr, ast.ListComp)
        is_set = isinstance(expr, ast.SetComp)
        is_gen = isinstance(expr, ast.GeneratorExp)
        is_dict = isinstance(expr, ast.DictComp)

        if is_dict:
            compiled_eval_key = ExpressionCompiler.compile(ctx, expr.key)
            compiled_eval_val = ExpressionCompiler.compile(ctx, expr.value)

        else:
            compiled_eval = ExpressionCompiler.compile(ctx, expr.elt)

        compiled_left, compiled_right = cls._compile_comprehensions(ctx, expr.generators)

        tmp_name = Util.generate_symbol("comprehension")

        compiled_core = None
        if is_list or is_set:
            compiled_core = f"{tmp_name}.push({compiled_eval});"
        elif is_gen:
            compiled_core = f"yield {compiled_eval};"
        elif is_dict:
            compiled_core = f"{tmp_name}.push([{compiled_eval_key}, {compiled_eval_val}]);"

        compiled_body = compiled_left + compiled_core + compiled_right

        if is_gen:
            compiled = f"function* {tmp_name} () {{\n" + Util.indent(compiled_body) + "\n}"
        else:
            compiled = f"var {tmp_name} = [];\n" + compiled_body

        return f"""
            (() => {{
                {Util.indent(compiled)}
                
                return {tmp_name};
            }})()
        """
