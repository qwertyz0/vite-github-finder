import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
// create react context to store fetching data in context and then use useContext and useReducer(instead of useState)

const GithubContext = createContext();

// provider with all functionality
export const GithubProvider = ({ children }) => {
  //instead of using  useState, we are using reducer and now need to initial state to store our users from API
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState); //reducer hook take to arguments (created reducer and initialized state)

  //returning data of context and give variables and functiones in value={} field
  return (
    <GithubContext.Provider
      value={{
        ...state /*refactoring code  (//fetching users data from reducer state //loading variable from reducer state //user object from reducer (initial state) //list of repositories) all this wariables in state*/,
        dispatch, //refactoring dispatch function from reducer
        //searchUsers: searchUsers, //searching function ---- (remove when refactoring)
        // clearUsers: clearUsers, //clear users ---- (remove when refactoring)
        // getUser: getUser, //geting single user info function ---- (remove when refactoring)
        // getUserRepos: getUserRepos, //function to fetch reposetories of user ---- (remove when refactoring)
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;

// 'fetchUsers' function for testing purposes (not using in main version)
// const fetchUsers = async () => {
//   setLoading()

//   const response = await fetch(`${GITHUB_URL}/users`, {
//     headers: {
//       Authorization: `token ${GITHUB_TOKEN}`,
//     },
//   });

//   const data = await response.json();

//   // dispatching action with type and payload data
//   dispatch({
//     type: "GET_USERS",
//     payload: data,
//   });
// };
