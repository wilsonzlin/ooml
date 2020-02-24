import ast
from typing import List

from Compiling.NoOpCompiler import NoOpCompiler
from Compiling.Statement.AssignmentCompiler import AssignmentCompiler
from Compiling.Statement.BreakCompiler import BreakCompiler
from Compiling.Statement.ContinueCompiler import ContinueCompiler
from Compiling.Statement.DeletionCompiler import DeletionCompiler
from Compiling.Statement.ExpressionStatementCompiler import ExpressionStatementCompiler
from Compiling.Statement.ForCompiler import ForCompiler
from Compiling.Statement.IfStatementCompiler import IfStatementCompiler
from Compiling.Statement.InlineAssignmentCompiler import InlineAssignmentCompiler
from Compiling.Statement.NonlocalCompiler import NonlocalCompiler
from Compiling.Statement.RaiseCompiler import RaiseCompiler
from Compiling.Statement.ReturnCompiler import ReturnCompiler
from Compiling.Statement.WhileCompiler import WhileCompiler
from Error.InvalidSyntaxError import InvalidSyntaxError
from Processing.PContext import PContext

_COMPILERS = {
    # Expressions
    ast.Expr: ExpressionStatementCompiler,

    # Statements
    ast.Raise: RaiseCompiler,
    ast.Delete: DeletionCompiler,
    ast.Pass: NoOpCompiler,
    ast.Assign: AssignmentCompiler,
    ast.AnnAssign: AssignmentCompiler,
    ast.AugAssign: InlineAssignmentCompiler,
    # NOT IMPLEMENTED: Assert
    # LEGACY: Print

    # Imports
    # TODO: Import, ImportFrom

    # Control flow
    ast.If: IfStatementCompiler,
    ast.For: ForCompiler,
    ast.While: WhileCompiler,
    ast.Break: BreakCompiler,
    ast.Continue: ContinueCompiler,
    # TODO Try
    # NOT IMPLEMENTED: With
    # LEGACY: TryFinally, TryExcept

    # Function and class definitions
    ast.Return: ReturnCompiler,
    ast.Nonlocal: NonlocalCompiler,
    # TODO FunctionDef
    # NOT IMPLEMENTED: Global, ClassDef
}


class StatementCompiler:
    @staticmethod
    def compile(ctx: PContext, stmt: ast.stmt) -> str:
        for node_type, compiler in _COMPILERS.items():
            if isinstance(stmt, node_type):
                compiled = compiler.compile(ctx, stmt)
                break
        else:
            raise InvalidSyntaxError(stmt, "Unknown statement")

        return f"{compiled};\n"

    @classmethod
    def compile_body(cls, ctx: PContext, stmts: List[ast.stmt]) -> str:
        return "\n".join([cls.compile(ctx, stmt) for stmt in stmts])
