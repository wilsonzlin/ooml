import ast

from Compile.Expression.AccessCompiler import AccessCompiler
from Compile.Expression.BinaryOperationCompiler import BinaryOperationCompiler
from Compile.Expression.BooleanOperationCompiler import BooleanOperationCompiler
from Compile.Expression.BooleanOrNoneCompiler import BooleanOrNoneCompiler
from Compile.Expression.CallCompiler import CallCompiler
from Compile.Expression.ComparisonCompiler import ComparisonCompiler
from Compile.Expression.ComprehensionCompiler import ComprehensionCompiler
from Compile.Expression.DictionaryCompiler import DictionaryCompiler
from Compile.Expression.YieldOrYieldFromCompiler import YieldOrYieldFromCompiler
from Compile.NoOpCompiler import NoOpCompiler
from Compile.Expression.IfExpressionCompiler import IfExpressionCompiler
from Compile.Expression.ListOrTupleOrSetCompiler import ListOrTupleOrSetCompiler
from Compile.Expression.NumberCompiler import NumberCompiler
from Compile.Expression.StarredCompiler import StarredCompiler
from Compile.Expression.StringCompiler import StringCompiler
from Compile.Expression.SubscriptCompiler import SubscriptCompiler
from Compile.Expression.UnaryOperationCompiler import UnaryOperationCompiler
from Error.InvalidSyntaxError import InvalidSyntaxError
from Processing.Context import Context

_COMPILERS = {
    # Literals
    ast.Num: NumberCompiler,
    ast.Str: StringCompiler,
    ast.List: ListOrTupleOrSetCompiler,
    ast.Tuple: ListOrTupleOrSetCompiler,
    ast.Set: ListOrTupleOrSetCompiler,
    ast.Dict: DictionaryCompiler,
    ast.Ellipsis: NoOpCompiler,
    ast.NameConstant: BooleanOrNoneCompiler,
    # NOT IMPLEMENTED: FormattedValue, JoinedStr, Bytes

    # Variables
    ast.Starred: StarredCompiler,
    # TODO Name

    # Expressions
    ast.UnaryOp: UnaryOperationCompiler,
    ast.BinOp: BinaryOperationCompiler,
    ast.BoolOp: BooleanOperationCompiler,
    ast.Compare: ComparisonCompiler,
    ast.Call: CallCompiler,
    ast.IfExp: IfExpressionCompiler,
    ast.Attribute: AccessCompiler,

    # Subscripting
    ast.Subscript: SubscriptCompiler,

    # Comprehensions
    ast.ListComp: ComprehensionCompiler,
    ast.SetComp: ComprehensionCompiler,
    ast.GeneratorExp: ComprehensionCompiler,
    ast.DictComp: ComprehensionCompiler,

    # Function and class definitions
    # TODO Lambda
    ast.Yield: YieldOrYieldFromCompiler,
    ast.YieldFrom: YieldOrYieldFromCompiler,
}


class ExpressionCompiler:
    @staticmethod
    def compile(ctx: Context, expr: ast.expr, **config) -> str:
        for node_type, compiler in _COMPILERS.items():
            if isinstance(expr, node_type):
                compiled = compiler.compile(ctx, expr, **config)
                break
        else:
            raise InvalidSyntaxError(expr, "Unknown expression")

        return f"({compiled})"
