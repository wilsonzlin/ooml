from enum import unique, Enum


@unique
class SymbolType(Enum):
    VAR_LOCAL = "var_local"
    VAR_NONLOCAL = "var_nonlocal"
    VAR_GENERATED = "var_generated"

    IMPORT = "import"

    BUILTIN = "builtin"
