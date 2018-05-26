import ast
from typing import List

from Compile.NoOpCompiler import NoOpCompiler
from Compile.Statement.AssignmentCompiler import AssignmentCompiler
from Compile.Statement.BreakCompiler import BreakCompiler
from Compile.Statement.ContinueCompiler import ContinueCompiler
from Compile.Statement.DeletionCompiler import DeletionCompiler
from Compile.Statement.ExpressionStatementCompiler import ExpressionStatementCompiler
from Compile.Statement.ForCompiler import ForCompiler
from Compile.Statement.IfStatementCompiler import IfStatementCompiler
from Compile.Statement.InlineAssignmentCompiler import InlineAssignmentCompiler
from Compile.Statement.NonlocalCompiler import NonlocalCompiler
from Compile.Statement.RaiseCompiler import RaiseCompiler
from Compile.Statement.ReturnCompiler import ReturnCompiler
from Compile.Statement.WhileCompiler import WhileCompiler
from Error.InvalidSyntaxError import InvalidSyntaxError
from Processing.Context import Context

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
    def compile(ctx: Context, stmt: ast.stmt) -> str:
        for node_type, compiler in _COMPILERS.items():
            if isinstance(stmt, node_type):
                compiled = compiler.compile(ctx, stmt)
                break
        else:
            raise InvalidSyntaxError(stmt, "Unknown statement")

        return f"{compiled};\n"

    @classmethod
    def compile_body(cls, ctx: Context, stmts: List[ast.stmt]) -> str:
        return "\n".join([cls.compile(ctx, stmt) for stmt in stmts])
