// reducer for alerts
const alertReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALERT":
      return action.payload; /*return only msg and type in payload */
    case "REMOVE_ALERT":
      return null; /*basic state for remove alert */
    default:
      return state;
  }
};

export default alertReducer;
