// create reducer with state and action.
//'action' is tipicaly string payload type (like INCRASE, DECREAS etc.)
const githubReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      }
    default:
      return state;
  }
};

export default githubReducer;
