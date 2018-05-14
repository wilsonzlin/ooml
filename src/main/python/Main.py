import argparse

args_parser = argparse.ArgumentParser(description="Compile Python to ooml bytecode")
args_parser.add_argument("-o", "--out", metavar="destination", type=str, required=True,
                         help="path to write compiled bytecode file to")
args_parser.add_argument("sourceroot", type=str, nargs=1,
                         help="path to ooml sources root directory")

args = args_parser.parse_args()
print(args)
