from builtin.annotation import property, staticmethod


class object:
    ...


class int(object):
    ...


class bool(int):
    ...


class bytearray(object):
    def append(self, *args, **kwargs):  # real signature unknown
        pass

    def capitalize(self):  # real signature unknown; restored from __doc__
        pass

    def center(self, width, fillchar=None):  # real signature unknown; restored from __doc__
        pass

    def clear(self, *args, **kwargs):  # real signature unknown
        pass

    def copy(self, *args, **kwargs):  # real signature unknown
        pass

    def count(self, sub, start=None, end=None):  # real signature unknown; restored from __doc__
        return 0

    def decode(self, *args, **kwargs):  # real signature unknown
        pass

    def endswith(self, suffix, start=None, end=None):  # real signature unknown; restored from __doc__
        return False

    def expandtabs(self, tabsize=8):  # real signature unknown; restored from __doc__
        pass

    def extend(self, *args, **kwargs):  # real signature unknown
        pass

    def find(self, sub, start=None, end=None):  # real signature unknown; restored from __doc__
        return 0

    @classmethod  # known case
    def fromhex(cls, *args, **kwargs):  # real signature unknown; NOTE: unreliably restored from __doc__
        pass

    def hex(self):  # real signature unknown; restored from __doc__
        return ""

    def index(self, sub, start=None, end=None):  # real signature unknown; restored from __doc__
        return 0

    def insert(self, *args, **kwargs):  # real signature unknown
        pass

    def isalnum(self):  # real signature unknown; restored from __doc__
        return False

    def isalpha(self):  # real signature unknown; restored from __doc__
        return False

    def isdigit(self):  # real signature unknown; restored from __doc__
        return False

    def islower(self):  # real signature unknown; restored from __doc__
        return False

    def isspace(self):  # real signature unknown; restored from __doc__
        return False

    def istitle(self):  # real signature unknown; restored from __doc__
        return False

    def isupper(self):  # real signature unknown; restored from __doc__
        return False

    def join(self, *args, **kwargs):  # real signature unknown
        pass

    def ljust(self, width, fillchar=None):  # real signature unknown; restored from __doc__
        pass

    def lower(self):  # real signature unknown; restored from __doc__
        pass

    def lstrip(self, *args, **kwargs):  # real signature unknown
        pass

    @staticmethod  # known case
    def maketrans(*args, **kwargs):  # real signature unknown
        pass

    def partition(self, *args, **kwargs):  # real signature unknown
        pass

    def pop(self, *args, **kwargs):  # real signature unknown
        pass

    def remove(self, *args, **kwargs):  # real signature unknown
        pass

    def replace(self, *args, **kwargs):  # real signature unknown
        pass

    def reverse(self, *args, **kwargs):  # real signature unknown
        pass

    def rfind(self, sub, start=None, end=None):  # real signature unknown; restored from __doc__
        return 0

    def rindex(self, sub, start=None, end=None):  # real signature unknown; restored from __doc__
        return 0

    def rjust(self, width, fillchar=None):  # real signature unknown; restored from __doc__
        pass

    def rpartition(self, *args, **kwargs):  # real signature unknown
        pass

    def rsplit(self, *args, **kwargs):  # real signature unknown
        pass

    def rstrip(self, *args, **kwargs):  # real signature unknown
        pass

    def split(self, *args, **kwargs):  # real signature unknown
        pass

    def splitlines(self, *args, **kwargs):  # real signature unknown
        pass

    def startswith(self, prefix, start=None, end=None):  # real signature unknown; restored from __doc__
        return False

    def strip(self, *args, **kwargs):  # real signature unknown
        pass

    def swapcase(self):  # real signature unknown; restored from __doc__
        pass

    def title(self):  # real signature unknown; restored from __doc__
        pass

    def translate(self, *args, **kwargs):  # real signature unknown
        pass

    def upper(self):  # real signature unknown; restored from __doc__
        pass

    def zfill(self, width):  # real signature unknown; restored from __doc__
        pass

    def __add__(self, *args, **kwargs):  # real signature unknown
        pass

    def __alloc__(self):  # real signature unknown; restored from __doc__
        return 0

    def __contains__(self, *args, **kwargs):  # real signature unknown
        pass

    def __delitem__(self, *args, **kwargs):  # real signature unknown
        pass

    def __eq__(self, *args, **kwargs):  # real signature unknown
        pass

    def __getattribute__(self, *args, **kwargs):  # real signature unknown
        pass

    def __getitem__(self, *args, **kwargs):  # real signature unknown
        pass

    def __ge__(self, *args, **kwargs):  # real signature unknown
        pass

    def __gt__(self, *args, **kwargs):  # real signature unknown
        pass

    def __iadd__(self, *args, **kwargs):  # real signature unknown
        pass

    def __imul__(self, *args, **kwargs):  # real signature unknown
        pass

    def __init__(self, source=None, encoding=None, errors='strict'):  # known special case of bytearray.__init__
        pass

    def __iter__(self, *args, **kwargs):  # real signature unknown
        pass

    def __len__(self, *args, **kwargs):  # real signature unknown
        pass

    def __le__(self, *args, **kwargs):  # real signature unknown
        pass

    def __lt__(self, *args, **kwargs):  # real signature unknown
        pass

    def __mod__(self, *args, **kwargs):  # real signature unknown
        pass

    def __mul__(self, *args, **kwargs):  # real signature unknown
        pass

    def __ne__(self, *args, **kwargs):  # real signature unknown
        pass

    def __reduce_ex__(self, *args, **kwargs):  # real signature unknown
        pass

    def __reduce__(self, *args, **kwargs):  # real signature unknown
        pass

    def __repr__(self, *args, **kwargs):  # real signature unknown
        pass

    def __rmod__(self, *args, **kwargs):  # real signature unknown
        pass

    def __rmul__(self, *args, **kwargs):  # real signature unknown
        pass

    def __setitem__(self, *args, **kwargs):  # real signature unknown
        pass

    def __sizeof__(self, *args, **kwargs):  # real signature unknown
        pass

    def __str__(self, *args, **kwargs):  # real signature unknown
        pass


class bytes(object):
    def capitalize(self):  # real signature unknown; restored from __doc__
        pass

    def center(self, width, fillchar=None):  # real signature unknown; restored from __doc__
        pass

    def count(self, sub, start=None, end=None):  # real signature unknown; restored from __doc__
        return 0

    def decode(self, *args, **kwargs):  # real signature unknown
        pass

    def endswith(self, suffix, start=None, end=None):  # real signature unknown; restored from __doc__
        return False

    def expandtabs(self, tabsize=8):  # real signature unknown; restored from __doc__
        pass

    def find(self, sub, start=None, end=None):  # real signature unknown; restored from __doc__
        return 0

    @classmethod  # known case
    def fromhex(cls, *args, **kwargs):  # real signature unknown; NOTE: unreliably restored from __doc__
        pass

    def hex(self):  # real signature unknown; restored from __doc__
        return ""

    def index(self, sub, start=None, end=None):  # real signature unknown; restored from __doc__
        return 0

    def isalnum(self):  # real signature unknown; restored from __doc__
        return False

    def isalpha(self):  # real signature unknown; restored from __doc__
        return False

    def isdigit(self):  # real signature unknown; restored from __doc__
        return False

    def islower(self):  # real signature unknown; restored from __doc__
        return False

    def isspace(self):  # real signature unknown; restored from __doc__
        return False

    def istitle(self):  # real signature unknown; restored from __doc__
        return False

    def isupper(self):  # real signature unknown; restored from __doc__
        return False

    def join(self, *args, **kwargs):  # real signature unknown; NOTE: unreliably restored from __doc__
        pass

    def ljust(self, width, fillchar=None):  # real signature unknown; restored from __doc__
        pass

    def lower(self):  # real signature unknown; restored from __doc__
        pass

    def lstrip(self, *args, **kwargs):  # real signature unknown
        pass

    @staticmethod  # known case
    def maketrans(*args, **kwargs):  # real signature unknown
        pass

    def partition(self, *args, **kwargs):  # real signature unknown
        pass

    def replace(self, *args, **kwargs):  # real signature unknown
        pass

    def rfind(self, sub, start=None, end=None):  # real signature unknown; restored from __doc__
        return 0

    def rindex(self, sub, start=None, end=None):  # real signature unknown; restored from __doc__
        return 0

    def rjust(self, width, fillchar=None):  # real signature unknown; restored from __doc__
        pass

    def rpartition(self, *args, **kwargs):  # real signature unknown
        pass

    def rsplit(self, *args, **kwargs):  # real signature unknown
        pass

    def rstrip(self, *args, **kwargs):  # real signature unknown
        pass

    def split(self, *args, **kwargs):  # real signature unknown
        pass

    def splitlines(self, *args, **kwargs):  # real signature unknown
        pass

    def startswith(self, prefix, start=None, end=None):  # real signature unknown; restored from __doc__
        return False

    def strip(self, *args, **kwargs):  # real signature unknown
        pass

    def swapcase(self):  # real signature unknown; restored from __doc__
        pass

    def title(self):  # real signature unknown; restored from __doc__
        pass

    def translate(self, *args, **kwargs):  # real signature unknown
        pass

    def upper(self):  # real signature unknown; restored from __doc__
        pass

    def zfill(self, width):  # real signature unknown; restored from __doc__
        pass

    def __add__(self, *args, **kwargs):  # real signature unknown
        pass

    def __contains__(self, *args, **kwargs):  # real signature unknown
        pass

    def __eq__(self, *args, **kwargs):  # real signature unknown
        pass

    def __getattribute__(self, *args, **kwargs):  # real signature unknown
        pass

    def __getitem__(self, *args, **kwargs):  # real signature unknown
        pass

    def __getnewargs__(self, *args, **kwargs):  # real signature unknown
        pass

    def __ge__(self, *args, **kwargs):  # real signature unknown
        pass

    def __gt__(self, *args, **kwargs):  # real signature unknown
        pass

    def __hash__(self, *args, **kwargs):  # real signature unknown
        pass

    def __init__(self, value=b'', encoding=None, errors='strict'):  # known special case of bytes.__init__
        pass

    def __iter__(self, *args, **kwargs):  # real signature unknown
        pass

    def __len__(self, *args, **kwargs):  # real signature unknown
        pass

    def __le__(self, *args, **kwargs):  # real signature unknown
        pass

    def __lt__(self, *args, **kwargs):  # real signature unknown
        pass

    def __mod__(self, *args, **kwargs):  # real signature unknown
        pass

    def __mul__(self, *args, **kwargs):  # real signature unknown
        pass

    def __ne__(self, *args, **kwargs):  # real signature unknown
        pass

    def __repr__(self, *args, **kwargs):  # real signature unknown
        pass

    def __rmod__(self, *args, **kwargs):  # real signature unknown
        pass

    def __rmul__(self, *args, **kwargs):  # real signature unknown
        pass

    def __str__(self, *args, **kwargs):  # real signature unknown
        pass


class dict(object):
    def clear(self):  # real signature unknown; restored from __doc__
        pass

    def copy(self):  # real signature unknown; restored from __doc__
        pass

    @staticmethod  # known case
    def fromkeys(*args, **kwargs):  # real signature unknown
        pass

    def get(self, k, d=None):  # real signature unknown; restored from __doc__
        pass

    def items(self):  # real signature unknown; restored from __doc__
        pass

    def keys(self):  # real signature unknown; restored from __doc__
        pass

    def pop(self, k, d=None):  # real signature unknown; restored from __doc__
        pass

    def popitem(self):  # real signature unknown; restored from __doc__
        pass

    def setdefault(self, k, d=None):  # real signature unknown; restored from __doc__
        pass

    def update(self, E=None, **F):  # known special case of dict.update
        pass

    def values(self):  # real signature unknown; restored from __doc__
        pass

    def __contains__(self, *args, **kwargs):  # real signature unknown
        pass

    def __delitem__(self, *args, **kwargs):  # real signature unknown
        pass

    def __eq__(self, *args, **kwargs):  # real signature unknown
        pass

    def __getattribute__(self, *args, **kwargs):  # real signature unknown
        pass

    def __getitem__(self, y):  # real signature unknown; restored from __doc__
        pass

    def __ge__(self, *args, **kwargs):  # real signature unknown
        pass

    def __gt__(self, *args, **kwargs):  # real signature unknown
        pass

    def __init__(self, seq=None, **kwargs):  # known special case of dict.__init__
        pass

    def __iter__(self, *args, **kwargs):  # real signature unknown
        pass

    def __len__(self, *args, **kwargs):  # real signature unknown
        pass

    def __le__(self, *args, **kwargs):  # real signature unknown
        pass

    def __lt__(self, *args, **kwargs):  # real signature unknown
        pass

    def __ne__(self, *args, **kwargs):  # real signature unknown
        pass

    def __repr__(self, *args, **kwargs):  # real signature unknown
        pass

    def __setitem__(self, *args, **kwargs):  # real signature unknown
        pass

    def __sizeof__(self):  # real signature unknown; restored from __doc__
        pass


class float(object):
    def as_integer_ratio(self):  # real signature unknown; restored from __doc__
        pass

    def conjugate(self, *args, **kwargs):  # real signature unknown
        pass

    @staticmethod  # known case
    def fromhex(string):  # real signature unknown; restored from __doc__
        return 0.0

    def hex(self):  # real signature unknown; restored from __doc__
        return ""

    def is_integer(self, *args, **kwargs):  # real signature unknown
        pass

    def __abs__(self, *args, **kwargs):  # real signature unknown
        pass

    def __add__(self, *args, **kwargs):  # real signature unknown
        pass

    def __bool__(self, *args, **kwargs):  # real signature unknown
        pass

    def __divmod__(self, *args, **kwargs):  # real signature unknown
        pass

    def __eq__(self, *args, **kwargs):  # real signature unknown
        pass

    def __float__(self, *args, **kwargs):  # real signature unknown
        pass

    def __floordiv__(self, *args, **kwargs):  # real signature unknown
        pass

    def __format__(self, format_spec):  # real signature unknown; restored from __doc__
        return ""

    def __getattribute__(self, *args, **kwargs):  # real signature unknown
        pass

    def __getformat__(self, typestr):  # real signature unknown; restored from __doc__
        return ""

    def __getnewargs__(self, *args, **kwargs):  # real signature unknown
        pass

    def __ge__(self, *args, **kwargs):  # real signature unknown
        pass

    def __gt__(self, *args, **kwargs):  # real signature unknown
        pass

    def __hash__(self, *args, **kwargs):  # real signature unknown
        pass

    def __init__(self, x):  # real signature unknown; restored from __doc__
        pass

    def __int__(self, *args, **kwargs):  # real signature unknown
        pass

    def __le__(self, *args, **kwargs):  # real signature unknown
        pass

    def __lt__(self, *args, **kwargs):  # real signature unknown
        pass

    def __mod__(self, *args, **kwargs):  # real signature unknown
        pass

    def __mul__(self, *args, **kwargs):  # real signature unknown
        pass

    def __neg__(self, *args, **kwargs):  # real signature unknown
        pass

    def __ne__(self, *args, **kwargs):  # real signature unknown
        pass

    def __pos__(self, *args, **kwargs):  # real signature unknown
        pass

    def __pow__(self, *args, **kwargs):  # real signature unknown
        pass

    def __radd__(self, *args, **kwargs):  # real signature unknown
        pass

    def __rdivmod__(self, *args, **kwargs):  # real signature unknown
        pass

    def __repr__(self, *args, **kwargs):  # real signature unknown
        pass

    def __rfloordiv__(self, *args, **kwargs):  # real signature unknown
        pass

    def __rmod__(self, *args, **kwargs):  # real signature unknown
        pass

    def __rmul__(self, *args, **kwargs):  # real signature unknown
        pass

    def __round__(self, *args, **kwargs):  # real signature unknown
        pass

    def __rpow__(self, *args, **kwargs):  # real signature unknown
        pass

    def __rsub__(self, *args, **kwargs):  # real signature unknown
        pass

    def __rtruediv__(self, *args, **kwargs):  # real signature unknown
        pass

    def __setformat__(self, typestr, fmt):  # real signature unknown; restored from __doc__
        pass

    def __str__(self, *args, **kwargs):  # real signature unknown
        pass

    def __sub__(self, *args, **kwargs):  # real signature unknown
        pass

    def __truediv__(self, *args, **kwargs):  # real signature unknown
        pass

    def __trunc__(self, *args, **kwargs):  # real signature unknown
        pass

    imag = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default
    real = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default


class frozenset(object):
    def copy(self, *args, **kwargs):  # real signature unknown
        pass

    def difference(self, *args, **kwargs):  # real signature unknown
        pass

    def intersection(self, *args, **kwargs):  # real signature unknown
        pass

    def isdisjoint(self, *args, **kwargs):  # real signature unknown
        pass

    def issubset(self, *args, **kwargs):  # real signature unknown
        pass

    def issuperset(self, *args, **kwargs):  # real signature unknown
        pass

    def symmetric_difference(self, *args, **kwargs):  # real signature unknown
        pass

    def union(self, *args, **kwargs):  # real signature unknown
        pass

    def __and__(self, *args, **kwargs):  # real signature unknown
        pass

    def __contains__(self, y):  # real signature unknown; restored from __doc__
        pass

    def __eq__(self, *args, **kwargs):  # real signature unknown
        pass

    def __getattribute__(self, *args, **kwargs):  # real signature unknown
        pass

    def __ge__(self, *args, **kwargs):  # real signature unknown
        pass

    def __gt__(self, *args, **kwargs):  # real signature unknown
        pass

    def __hash__(self, *args, **kwargs):  # real signature unknown
        pass

    def __init__(self, seq=()):  # known special case of frozenset.__init__
        pass

    def __iter__(self, *args, **kwargs):  # real signature unknown
        pass

    def __len__(self, *args, **kwargs):  # real signature unknown
        pass

    def __le__(self, *args, **kwargs):  # real signature unknown
        pass

    def __lt__(self, *args, **kwargs):  # real signature unknown
        pass

    def __ne__(self, *args, **kwargs):  # real signature unknown
        pass

    def __or__(self, *args, **kwargs):  # real signature unknown
        pass

    def __rand__(self, *args, **kwargs):  # real signature unknown
        pass

    def __reduce__(self, *args, **kwargs):  # real signature unknown
        pass

    def __repr__(self, *args, **kwargs):  # real signature unknown
        pass

    def __ror__(self, *args, **kwargs):  # real signature unknown
        pass

    def __rsub__(self, *args, **kwargs):  # real signature unknown
        pass

    def __rxor__(self, *args, **kwargs):  # real signature unknown
        pass

    def __sizeof__(self):  # real signature unknown; restored from __doc__
        pass

    def __sub__(self, *args, **kwargs):  # real signature unknown
        pass

    def __xor__(self, *args, **kwargs):  # real signature unknown
        pass


class list(object):
    def append(self, p_object):  # real signature unknown; restored from __doc__
        pass

    def clear(self):  # real signature unknown; restored from __doc__
        pass

    def copy(self):  # real signature unknown; restored from __doc__
        return []

    def count(self, value):  # real signature unknown; restored from __doc__
        return 0

    def extend(self, iterable):  # real signature unknown; restored from __doc__
        pass

    def index(self, value, start=None, stop=None):  # real signature unknown; restored from __doc__
        return 0

    def insert(self, index, p_object):  # real signature unknown; restored from __doc__
        pass

    def pop(self, index=None):  # real signature unknown; restored from __doc__
        pass

    def remove(self, value):  # real signature unknown; restored from __doc__
        pass

    def reverse(self):  # real signature unknown; restored from __doc__
        pass

    def sort(self, key=None, reverse=False):  # real signature unknown; restored from __doc__
        pass

    def __add__(self, *args, **kwargs):  # real signature unknown
        pass

    def __contains__(self, *args, **kwargs):  # real signature unknown
        pass

    def __delitem__(self, *args, **kwargs):  # real signature unknown
        pass

    def __eq__(self, *args, **kwargs):  # real signature unknown
        pass

    def __getattribute__(self, *args, **kwargs):  # real signature unknown
        pass

    def __getitem__(self, y):  # real signature unknown; restored from __doc__
        pass

    def __ge__(self, *args, **kwargs):  # real signature unknown
        pass

    def __gt__(self, *args, **kwargs):  # real signature unknown
        pass

    def __iadd__(self, *args, **kwargs):  # real signature unknown
        pass

    def __imul__(self, *args, **kwargs):  # real signature unknown
        pass

    def __init__(self, seq=()):  # known special case of list.__init__
        pass

    def __iter__(self, *args, **kwargs):  # real signature unknown
        pass

    def __len__(self, *args, **kwargs):  # real signature unknown
        pass

    def __le__(self, *args, **kwargs):  # real signature unknown
        pass

    def __lt__(self, *args, **kwargs):  # real signature unknown
        pass

    def __mul__(self, *args, **kwargs):  # real signature unknown
        pass

    def __ne__(self, *args, **kwargs):  # real signature unknown
        pass

    def __repr__(self, *args, **kwargs):  # real signature unknown
        pass

    def __reversed__(self):  # real signature unknown; restored from __doc__
        pass

    def __rmul__(self, *args, **kwargs):  # real signature unknown
        pass

    def __setitem__(self, *args, **kwargs):  # real signature unknown
        pass

    def __sizeof__(self):  # real signature unknown; restored from __doc__
        pass


class range(object):
    def count(self, value):  # real signature unknown; restored from __doc__
        return 0

    def index(self, value, start=None, stop=None):  # real signature unknown; restored from __doc__
        return 0

    def __bool__(self, *args, **kwargs):  # real signature unknown
        pass

    def __contains__(self, *args, **kwargs):  # real signature unknown
        pass

    def __eq__(self, *args, **kwargs):  # real signature unknown
        pass

    def __getattribute__(self, *args, **kwargs):  # real signature unknown
        pass

    def __getitem__(self, *args, **kwargs):  # real signature unknown
        pass

    def __ge__(self, *args, **kwargs):  # real signature unknown
        pass

    def __gt__(self, *args, **kwargs):  # real signature unknown
        pass

    def __hash__(self, *args, **kwargs):  # real signature unknown
        pass

    def __init__(self, stop):  # real signature unknown; restored from __doc__
        pass

    def __iter__(self, *args, **kwargs):  # real signature unknown
        pass

    def __len__(self, *args, **kwargs):  # real signature unknown
        pass

    def __le__(self, *args, **kwargs):  # real signature unknown
        pass

    def __lt__(self, *args, **kwargs):  # real signature unknown
        pass

    def __ne__(self, *args, **kwargs):  # real signature unknown
        pass

    def __reduce__(self, *args, **kwargs):  # real signature unknown
        pass

    def __repr__(self, *args, **kwargs):  # real signature unknown
        pass

    def __reversed__(self, *args, **kwargs):  # real signature unknown
        pass

    start = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default
    step = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default
    stop = property(lambda self: object(), lambda self, v: None, lambda self: None)  # default


class set(object):
    def add(self, *args, **kwargs):  # real signature unknown
        pass

    def clear(self, *args, **kwargs):  # real signature unknown
        pass

    def copy(self, *args, **kwargs):  # real signature unknown
        pass

    def difference(self, *args, **kwargs):  # real signature unknown
        pass

    def difference_update(self, *args, **kwargs):  # real signature unknown
        pass

    def discard(self, *args, **kwargs):  # real signature unknown
        pass

    def intersection(self, *args, **kwargs):  # real signature unknown
        pass

    def intersection_update(self, *args, **kwargs):  # real signature unknown
        pass

    def isdisjoint(self, *args, **kwargs):  # real signature unknown
        pass

    def issubset(self, *args, **kwargs):  # real signature unknown
        pass

    def issuperset(self, *args, **kwargs):  # real signature unknown
        pass

    def pop(self, *args, **kwargs):  # real signature unknown
        pass

    def remove(self, *args, **kwargs):  # real signature unknown
        pass

    def symmetric_difference(self, *args, **kwargs):  # real signature unknown
        pass

    def symmetric_difference_update(self, *args, **kwargs):  # real signature unknown
        pass

    def union(self, *args, **kwargs):  # real signature unknown
        pass

    def update(self, *args, **kwargs):  # real signature unknown
        pass

    def __and__(self, *args, **kwargs):  # real signature unknown
        pass

    def __contains__(self, y):  # real signature unknown; restored from __doc__
        pass

    def __eq__(self, *args, **kwargs):  # real signature unknown
        pass

    def __getattribute__(self, *args, **kwargs):  # real signature unknown
        pass

    def __ge__(self, *args, **kwargs):  # real signature unknown
        pass

    def __gt__(self, *args, **kwargs):  # real signature unknown
        pass

    def __iand__(self, *args, **kwargs):  # real signature unknown
        pass

    def __init__(self, seq=()):  # known special case of set.__init__
        pass

    def __ior__(self, *args, **kwargs):  # real signature unknown
        pass

    def __isub__(self, *args, **kwargs):  # real signature unknown
        pass

    def __iter__(self, *args, **kwargs):  # real signature unknown
        pass

    def __ixor__(self, *args, **kwargs):  # real signature unknown
        pass

    def __len__(self, *args, **kwargs):  # real signature unknown
        pass

    def __le__(self, *args, **kwargs):  # real signature unknown
        pass

    def __lt__(self, *args, **kwargs):  # real signature unknown
        pass

    def __ne__(self, *args, **kwargs):  # real signature unknown
        pass

    def __or__(self, *args, **kwargs):  # real signature unknown
        pass

    def __rand__(self, *args, **kwargs):  # real signature unknown
        pass

    def __reduce__(self, *args, **kwargs):  # real signature unknown
        pass

    def __repr__(self, *args, **kwargs):  # real signature unknown
        pass

    def __ror__(self, *args, **kwargs):  # real signature unknown
        pass

    def __rsub__(self, *args, **kwargs):  # real signature unknown
        pass

    def __rxor__(self, *args, **kwargs):  # real signature unknown
        pass

    def __sizeof__(self):  # real signature unknown; restored from __doc__
        pass

    def __sub__(self, *args, **kwargs):  # real signature unknown
        pass

    def __xor__(self, *args, **kwargs):  # real signature unknown
        pass


class str(object):
    def capitalize(self):  # real signature unknown; restored from __doc__
        return ""

    def casefold(self):  # real signature unknown; restored from __doc__
        return ""

    def center(self, width, fillchar=None):  # real signature unknown; restored from __doc__
        return ""

    def count(self, sub, start=None, end=None):  # real signature unknown; restored from __doc__
        return 0

    def encode(self, encoding='utf-8', errors='strict'):  # real signature unknown; restored from __doc__
        return b""

    def endswith(self, suffix, start=None, end=None):  # real signature unknown; restored from __doc__
        return False

    def expandtabs(self, tabsize=8):  # real signature unknown; restored from __doc__
        return ""

    def find(self, sub, start=None, end=None):  # real signature unknown; restored from __doc__
        return 0

    def format(self, *args, **kwargs):  # known special case of str.format
        pass

    def format_map(self, mapping):  # real signature unknown; restored from __doc__
        return ""

    def index(self, sub, start=None, end=None):  # real signature unknown; restored from __doc__
        return 0

    def isalnum(self):  # real signature unknown; restored from __doc__
        return False

    def isalpha(self):  # real signature unknown; restored from __doc__
        return False

    def isdecimal(self):  # real signature unknown; restored from __doc__
        return False

    def isdigit(self):  # real signature unknown; restored from __doc__
        return False

    def isidentifier(self):  # real signature unknown; restored from __doc__
        return False

    def islower(self):  # real signature unknown; restored from __doc__
        return False

    def isnumeric(self):  # real signature unknown; restored from __doc__
        return False

    def isprintable(self):  # real signature unknown; restored from __doc__
        return False

    def isspace(self):  # real signature unknown; restored from __doc__
        return False

    def istitle(self):  # real signature unknown; restored from __doc__
        return False

    def isupper(self):  # real signature unknown; restored from __doc__
        return False

    def join(self, iterable):  # real signature unknown; restored from __doc__
        return ""

    def ljust(self, width, fillchar=None):  # real signature unknown; restored from __doc__
        return ""

    def lower(self):  # real signature unknown; restored from __doc__
        return ""

    def lstrip(self, chars=None):  # real signature unknown; restored from __doc__
        return ""

    def maketrans(self, *args, **kwargs):  # real signature unknown
        pass

    def partition(self, sep):  # real signature unknown; restored from __doc__
        pass

    def replace(self, old, new, count=None):  # real signature unknown; restored from __doc__
        return ""

    def rfind(self, sub, start=None, end=None):  # real signature unknown; restored from __doc__
        return 0

    def rindex(self, sub, start=None, end=None):  # real signature unknown; restored from __doc__
        return 0

    def rjust(self, width, fillchar=None):  # real signature unknown; restored from __doc__
        return ""

    def rpartition(self, sep):  # real signature unknown; restored from __doc__
        pass

    def rsplit(self, sep=None, maxsplit=-1):  # real signature unknown; restored from __doc__
        return []

    def rstrip(self, chars=None):  # real signature unknown; restored from __doc__
        return ""

    def split(self, sep=None, maxsplit=-1):  # real signature unknown; restored from __doc__
        return []

    def splitlines(self, keepends=None):  # real signature unknown; restored from __doc__
        return []

    def startswith(self, prefix, start=None, end=None):  # real signature unknown; restored from __doc__
        return False

    def strip(self, chars=None):  # real signature unknown; restored from __doc__
        return ""

    def swapcase(self):  # real signature unknown; restored from __doc__
        return ""

    def title(self):  # real signature unknown; restored from __doc__
        return ""

    def translate(self, table):  # real signature unknown; restored from __doc__
        return ""

    def upper(self):  # real signature unknown; restored from __doc__
        return ""

    def zfill(self, width):  # real signature unknown; restored from __doc__
        return ""

    def __add__(self, *args, **kwargs):  # real signature unknown
        pass

    def __contains__(self, *args, **kwargs):  # real signature unknown
        pass

    def __eq__(self, *args, **kwargs):  # real signature unknown
        pass

    def __format__(self, format_spec):  # real signature unknown; restored from __doc__
        return ""

    def __getattribute__(self, *args, **kwargs):  # real signature unknown
        pass

    def __getitem__(self, *args, **kwargs):  # real signature unknown
        pass

    def __getnewargs__(self, *args, **kwargs):  # real signature unknown
        pass

    def __ge__(self, *args, **kwargs):  # real signature unknown
        pass

    def __gt__(self, *args, **kwargs):  # real signature unknown
        pass

    def __hash__(self, *args, **kwargs):  # real signature unknown
        pass

    def __init__(self, value='', encoding=None, errors='strict'):  # known special case of str.__init__
        pass

    def __iter__(self, *args, **kwargs):  # real signature unknown
        pass

    def __len__(self, *args, **kwargs):  # real signature unknown
        pass

    def __le__(self, *args, **kwargs):  # real signature unknown
        pass

    def __lt__(self, *args, **kwargs):  # real signature unknown
        pass

    def __mod__(self, *args, **kwargs):  # real signature unknown
        pass

    def __mul__(self, *args, **kwargs):  # real signature unknown
        pass

    def __ne__(self, *args, **kwargs):  # real signature unknown
        pass

    def __repr__(self, *args, **kwargs):  # real signature unknown
        pass

    def __rmod__(self, *args, **kwargs):  # real signature unknown
        pass

    def __rmul__(self, *args, **kwargs):  # real signature unknown
        pass

    def __sizeof__(self):  # real signature unknown; restored from __doc__
        pass

    def __str__(self, *args, **kwargs):  # real signature unknown
        pass


class tuple(object):
    def count(self, value):  # real signature unknown; restored from __doc__
        return 0

    def index(self, value, start=None, stop=None):  # real signature unknown; restored from __doc__
        return 0

    def __add__(self, *args, **kwargs):  # real signature unknown
        pass

    def __contains__(self, *args, **kwargs):  # real signature unknown
        pass

    def __eq__(self, *args, **kwargs):  # real signature unknown
        pass

    def __getattribute__(self, *args, **kwargs):  # real signature unknown
        pass

    def __getitem__(self, *args, **kwargs):  # real signature unknown
        pass

    def __getnewargs__(self, *args, **kwargs):  # real signature unknown
        pass

    def __ge__(self, *args, **kwargs):  # real signature unknown
        pass

    def __gt__(self, *args, **kwargs):  # real signature unknown
        pass

    def __hash__(self, *args, **kwargs):  # real signature unknown
        pass

    def __init__(self, seq=()):  # known special case of tuple.__init__
        pass

    def __iter__(self, *args, **kwargs):  # real signature unknown
        pass

    def __len__(self, *args, **kwargs):  # real signature unknown
        pass

    def __le__(self, *args, **kwargs):  # real signature unknown
        pass

    def __lt__(self, *args, **kwargs):  # real signature unknown
        pass

    def __mul__(self, *args, **kwargs):  # real signature unknown
        pass

    def __ne__(self, *args, **kwargs):  # real signature unknown
        pass

    def __repr__(self, *args, **kwargs):  # real signature unknown
        pass

    def __rmul__(self, *args, **kwargs):  # real signature unknown
        pass
