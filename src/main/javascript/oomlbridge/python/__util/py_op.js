function py_op_matches_arg (matcher, arg, aux) {
  if (is_function(matcher)) {
    return matcher(arg, aux);

  } else {
    return Object.keys(matcher).every(k => {
      matcher[k](arg[k]);
    });
  }
}

function py_bin_op_matches_args (lhs, rhs, a, b) {
  let lhs_matches = true;
  if (lhs) {
    lhs_matches = lhs.some(m => py_op_matches_arg(m, a, b));
  }

  let rhs_matches = true;
  if (rhs) {
    rhs_matches = rhs.some(m => py_op_matches_arg(m, b, a));
  }

  return lhs_matches && rhs_matches;
}

let py_un_op = (configs, a) => {
  let rv;
  let handled = configs.some(c => {
    let op = c.op;

    let matches = op.some(m => py_op_matches_arg(m, a));

    if (matches) {
      rv = c.result(a);
    }

    return matches;
  });

  if (!handled) {
    throw TypeError(`bad operand type for unary`);
  }

  return rv;
};

let py_bin_op = (configs, a, b) => {
  let rv;
  let handled = configs.some(c => {
    let commutative = c.commutative;
    let lhs = c.lhs;
    let rhs = c.rhs;

    if (c.both) {
      lhs = rhs = c.both;
      // Don't need to change $commutative;
      // if it doesn't match first time, it won't match when swapped
    }

    let matches = py_bin_op_matches_args(lhs, rhs, a, b);

    if (commutative && !matches) {
      // Try swapping $a and $b
      // WARNING: Swap only if matches
      matches = py_bin_op_matches_args(lhs, rhs, b, a);
      if (matches) {
        let tmp = a;
        a = b;
        b = tmp;
      }
    }

    if (matches) {
      rv = c.result(a, b);
    }

    return matches;
  });

  if (!handled) {
    throw TypeError(`unsupported operand type(s)`);
  }

  return rv;
};
