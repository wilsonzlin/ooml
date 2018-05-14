import ast

from Error.CompileError import CompileError


class InvalidSyntaxError(CompileError):
    def __init__(self, ast_node: ast.AST, msg: str):
        super().__init__("{} [Line {}, Column {}]".format(msg, ast_node.lineno, ast_node.col_offset))
