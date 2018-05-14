import ast
from typing import Union, Tuple, List

from Compile import Util
from Compile.Expression.ExpressionCompiler import ExpressionCompiler
from Compile.Expression.ListOrTupleOrSetCompiler import ListOrTupleOrSetCompiler
from Error.UnsupportedSyntaxError import UnsupportedSyntaxError
from Processing.Context import Context


class ComprehensionCompiler:
    @classmethod
    def _compile_test_expressions(cls, ctx: Context, exprs: List[ast.expr]) -> Tuple[str, str]:
        compiled_cond = ExpressionCompiler.compile(ctx, exprs[0])

        compiled_left = f"if {compiled_cond} {{\n"
        compiled_right = "\n}"

        if len(exprs) > 1:
            compiled_nested = cls._compile_test_expressions(ctx, exprs[1:])
            compiled_left += Util.indent(compiled_nested[0])
            compiled_right += Util.indent(compiled_nested[1])

        return compiled_left, compiled_right

    @classmethod
    def _compile_comprehensions(cls, ctx: Context, comps: List[ast.comprehension], target_bases: List[str]) -> \
            Tuple[str, str]:
        gen = comps[0]

        if gen.is_async:
            raise UnsupportedSyntaxError(gen, "Async comprehensions")

        target_bases.extend(Util.get_base_names(gen.target))

        if isinstance(gen.target, ast.Tuple):
            target = ListOrTupleOrSetCompiler.compile(ctx, gen.target, False)
        else:
            target = ExpressionCompiler.compile(ctx, gen.target)

        compiled_iter = ExpressionCompiler.compile(ctx, gen.iter)

        compiled_left = f"for ({target} of {compiled_iter}) {{\n"
        compiled_right = "\n}"

        if gen.ifs:
            compiled_ifs = cls._compile_test_expressions(ctx, gen.ifs)
            compiled_left += Util.indent(compiled_ifs[0])
            compiled_right += Util.indent(compiled_ifs[1])

        if len(comps) > 1:
            compiled_other_gens = cls._compile_comprehensions(ctx, comps[1:], target_bases)
            # NOTE: This indentation is not correct
            compiled_left += Util.indent(compiled_other_gens[0])
            compiled_right += Util.indent(compiled_other_gens[1])

        return compiled_left, compiled_right

    @classmethod
    def compile(cls, ctx: Context, expr: Union[ast.ListComp, ast.SetComp, ast.GeneratorExp, ast.DictComp]) -> str:
        is_list = isinstance(expr, ast.ListComp)
        is_set = isinstance(expr, ast.SetComp)
        is_gen = isinstance(expr, ast.GeneratorExp)
        is_dict = isinstance(expr, ast.DictComp)

        if is_dict:
            compiled_eval_key = ExpressionCompiler.compile(ctx, expr.key)
            compiled_eval_val = ExpressionCompiler.compile(ctx, expr.value)

        else:
            compiled_eval = ExpressionCompiler.compile(ctx, expr.elt)

        target_bases = []
        compiled_left, compiled_right = cls._compile_comprehensions(ctx, expr.generators, target_bases)

        tmp_name = ctx.generate_symbol("comprehension")

        compiled_core = None
        if is_list or is_set:
            compiled_core = f"{tmp_name}.push({compiled_eval});"
        elif is_gen:
            compiled_core = f"yield {compiled_eval};"
        elif is_dict:
            compiled_core = f"{tmp_name}.push([{compiled_eval_key}, {compiled_eval_val}]);"

        compiled_body = compiled_left + compiled_core + compiled_right

        compiled = ""

        for target_base in target_bases:
            compiled += f"var {target_base};\n"

        if is_gen:
            compiled += f"function* {tmp_name} () {{\n" + Util.indent(compiled_body) + "\n}"
        else:
            compiled += f"var {tmp_name} = [];\n" + compiled_body

        return compiled
