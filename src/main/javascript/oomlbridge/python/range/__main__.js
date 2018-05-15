class range {
  constructor (start, stop, step) {
    if (step == undefined) {
      step = 1;
    } else if (step === 0) {
      throw ValueError(`Step must not be zero`);
    }

    if (stop == undefined) {
      stop = start;
      start = 0;
    }

    this.start = start;
    this.stop = stop;
    this.step = step;
  }

  [Symbol.iterator] () {
    let start = this.start;
    let stop = this.stop;
    let step = this.step;

    let dir_neg = step < 0;

    let current = start;

    return {
      next: function () {
        if (dir_neg ? current > stop : current < stop) {
          let rv = {
            done: false,
            value: current,
          };
          current += step;
          return rv;

        } else {
          return {
            done: true,
          };
        }
      }
    };
  }
}
