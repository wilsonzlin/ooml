class BaseException:
    ...


class Exception(BaseException):
    ...


class ArithmeticError(Exception):
    ...


class AssertionError(Exception):
    ...


class AttributeError(Exception):
    ...


class SyntaxError(Exception):
    ...


class LookupError(Exception):
    ...


class IndexError(LookupError):
    ...


class KeyError(LookupError):
    ...


class NameError(Exception):
    ...


class RuntimeError(Exception):
    ...


class NotImplementedError(RuntimeError):
    ...


class RecursionError(RuntimeError):
    ...


class ReferenceError(Exception):
    ...


class TypeError(Exception):
    ...


class UnboundLocalError(NameError):
    ...


class ValueError(Exception):
    ...


class StopAsyncIteration(Exception):
    ...


class StopIteration(Exception):
    ...


class GeneratorExit(BaseException):
    ...
