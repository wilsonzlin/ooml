let assert = (pred, error_type, error_message) => {
  if (!pred) {
    throw error_type(error_message);
  }
  return true;
};
