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
      };
    case "CLEAR_USERS":
      return {
        ...state,
        users: [],
        loading: false,
      };
    case "GET_USER_AND_REPOS": //return both data for user and repos and put it to state
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
        loading: false,
      };
    // case "GET_REPOS":
    //   return {
    //     ...state,
    //     repos: action.payload,
    //     loading: false,
    //   };
    default:
      return state;
  }
};

export default githubReducer;
