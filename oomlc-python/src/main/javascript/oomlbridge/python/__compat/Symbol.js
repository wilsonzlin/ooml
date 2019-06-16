if (!window.Symbol) {
  // If there's no Symbol, create *local* Symbol,
  // and use AIL method names as values
  let Symbol = {
    iterator: "iterator", // [AIL] iterables have to implement this
  };
}
