import argparse

from Enumerating.Enumeration import Enumeration
from Enumerating.Enumerator import Enumerator
from FQN import FQN
from Processing.Compilation import Compilation

args_parser = argparse.ArgumentParser(prog="oomlc-python", description="Compile Python code to ooml bytecode.")
args_parser.add_argument("-o", "--out", metavar="outdir", type=str, required=True,
                         help="directory to write compiled bytecode files to")
args_parser.add_argument("-i", "--imp", metavar="importdir", type=str, nargs='*', default=[],
                         help="zero or more directories containing available imports")
args_parser.add_argument("-s", "--src", metavar="sourcedir", type=str, nargs='+', required=True,
                         help="one or more directories containing source code files to compile")

args = args_parser.parse_args()

#
# STEP 1:
# Enumerate classes
#

enum = Enumeration()

for d in [*args.src, *args.imp]:
    Enumerator.enumerate_dir(enum=enum, prefix=FQN(None, None), d=d)

#
# STEP 2:
# Compile classes
#

proc = Compilation()

print(enum)
