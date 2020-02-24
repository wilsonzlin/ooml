import ast

from Compiling.Expression.AccessCompiler import AccessCompiler
from Compiling.Expression.BinaryOperationCompiler import BinaryOperationCompiler
from Compiling.Expression.BooleanOperationCompiler import BooleanOperationCompiler
from Compiling.Expression.BooleanOrNoneCompiler import BooleanOrNoneCompiler
from Compiling.Expression.CallCompiler import CallCompiler
from Compiling.Expression.ComparisonCompiler import ComparisonCompiler
from Compiling.Expression.ComprehensionCompiler import ComprehensionCompiler
from Compiling.Expression.DictionaryCompiler import DictionaryCompiler
from Compiling.Expression.YieldOrYieldFromCompiler import YieldOrYieldFromCompiler
from Compiling.NoOpCompiler import NoOpCompiler
from Compiling.Expression.IfExpressionCompiler import IfExpressionCompiler
from Compiling.Expression.ListOrTupleOrSetCompiler import ListOrTupleOrSetCompiler
from Compiling.Expression.NumberCompiler import NumberCompiler
from Compiling.Expression.StarredCompiler import StarredCompiler
from Compiling.Expression.StringCompiler import StringCompiler
from Compiling.Expression.SubscriptCompiler import SubscriptCompiler
from Compiling.Expression.UnaryOperationCompiler import UnaryOperationCompiler
from Error.InvalidSyntaxError import InvalidSyntaxError
from Processing.PContext import PContext

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
    def compile(ctx: PContext, expr: ast.expr, **config) -> str:
        for node_type, compiler in _COMPILERS.items():
            if isinstance(expr, node_type):
                compiled = compiler.compile(ctx, expr, **config)
                break
        else:
            raise InvalidSyntaxError(expr, "Unknown expression")

        return f"({compiled})"
