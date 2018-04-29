# Source code structure

# `validator/*`

Functions that take some input and return a boolean. Should not throw errors.

Reasons for creating a validator function rather than inlining:

- a specific unit is being validated
- validation is complex
- same validation is repeatedly done
  - improve abstraction
  - increase minifier efficiency
  
Take note:

- there is a function call overhead
- do not duplicate functionality of `assert_*` functions

Validators can be defined by submodules.

# `util/*`

Helper functions that do JS-only stuff. Not dependent on environment or framework. Independent of other variables and functions except other `u_*` functions.

Unused functions in submodules get removed by minifier. 
