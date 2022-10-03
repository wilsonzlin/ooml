let nullable_is = pred_is => {
  return a => {
    a === null || pred_is(a);
  };
};
