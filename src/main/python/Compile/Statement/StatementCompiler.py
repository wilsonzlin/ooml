import ast

from Compile.NoOpCompiler import NoOpCompiler
from Compile.Statement.BreakCompiler import BreakCompiler
from Compile.Statement.ContinueCompiler import ContinueCompiler
from Compile.Statement.DeletionCompiler import DeletionCompiler
from Compile.Statement.ExpressionStatementCompiler import ExpressionStatementCompiler
from Compile.Statement.IfStatementCompiler import IfStatementCompiler
from Compile.Statement.RaiseCompiler import RaiseCompiler
from Error.InvalidSyntaxError import InvalidSyntaxError
from Processing.Context import Context

_COMPILERS = {
    # Expressions
    ast.Expr: ExpressionStatementCompiler,

    # Statements
    ast.Raise: RaiseCompiler,
    ast.Delete: DeletionCompiler,
    ast.Pass: NoOpCompiler,
    # TODO Assign, AnnAssign, AugAssign
    # NOT IMPLEMENTED: Assert
    # LEGACY: Print

    # Imports
    # NOT IMPLEMENTED: Import, ImportFrom

    # Control flow
    ast.If: IfStatementCompiler,
    ast.For: None,  # TODO
    ast.While: None,  # TODO
    ast.Break: BreakCompiler,
    ast.Continue: ContinueCompiler,
    # TODO Try
    # NOT IMPLEMENTED: With
    # LEGACY: TryFinally, TryExcept

    # Function and class definitions
    # TODO FunctionDef, Return, Nonlocal
    # NOT IMPLEMENTED: Global, ClassDef
}


class StatementCompiler:
    @staticmethod
    def compile(ctx: Context, stmt: ast.stmt) -> str:
        for node_type, compiler in _COMPILERS.items():
            if isinstance(stmt, node_type):
                compiled = compiler.compile(ctx, stmt)
                break
        else:
            raise InvalidSyntaxError(stmt, "Unknown statement")

        return f"{compiled};\n"
