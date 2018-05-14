def abs(x):
    ...


def all(iterable):
    ...


def any(iterable):
    ...


def ascii(object):
    ...


def bin(x):
    ...


def callable(object):
    ...


def chr(i):
    ...


def delattr(object, name):
    ...


# Python's `dir` behaves wildly and does not match `Object.keys` exactly,
# so don't mislead (also `__dir__` is not supported)


def divmod(a, b):
    ...


def enumerate(iterable, start=0):
    ...


def filter(function, iterable):
    ...


def format(value, format_spec=None):
    ...


def getattr(object, name, default=None):
    ...


def hasattr(object, name):
    ...


def hex(x):
    ...


def input(prompt=None):
    """
    [ooml] Mapped to `window.prompt`. EOFError is never raised.
    """
    ...


def isinstance(object, classinfo):
    ...


def issubclass(klass, classinfo):
    ...


def iter(object, sentinel=None):
    ...


def len(s):
    ...


def map(function, *iterables):
    ...


def max(iterable, *args, key=None, default=None):
    ...


def min(iterable, *args, key=None, default=None):
    ...


def next(iterator, default=None):
    ...


def oct(x):
    ...


def ord(c):
    ...


def pow(x, y, z=None):
    ...


def print(*objects, sep=' ', end='\n'):
    """
    [ooml] Mapped to `console.log`.
           Does not support $file and $flush.
           Calls providing them will cause an error.
    """
    ...


def reversed(seq):
    ...


def round(number, ndigits=None):
    ...


def setattr(object, name, value):
    ...


def sorted(iterable, *, key=None, reverse=False):
    ...


def sum(iterable, start=None):
    ...


def super(type=None, object_or_type=None):
    """
    [ooml] `super` is treated specially by the compiler,
           and is not a class.
    """
    ...


def type(object):
    """
    [ooml] `type` can only check types and cannot create any.
    """
    ...


def zip(*iterables):
    ...
