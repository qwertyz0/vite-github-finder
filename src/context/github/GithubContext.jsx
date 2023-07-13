import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";
// create react context to store fetching data in context and then use useContext and useReducer(instead of useState)

const GithubContext = createContext();

//.env variables
const GITHUB_URL = import.meta.env.VITE_APP_GITHUB_URL;
const GITHUB_TOKEN = import.meta.env.VITE_APP_GITHUB_TOKEN;

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

  //get user (single)
  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (response.status === 404) {
      window.location = "/notfound"; //redirect if user 404
    } else {
      //destructuring all geting data, to get all data in {items}
      const data = await response.json();

      // dispatching action for single user from data
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  //get repositories of user
  const getUserRepos = async (login) => {
    setLoading();

    // make query parameter with URLSearchParams to get (sort=LAST_CREATED) and only 10
    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}` /*find repos of the user*/,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    //getinag all repos as data
    const data = await response.json();

    // dispatching action with type and payload data
    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };

  //set loading function
  const setLoading = () => {
    dispatch({
      type: "SET_LOADING",
    });
  };

  //clear profile state function
  const clearUsers = () => {
    dispatch({
      type: "CLEAR_USERS",
    });
  };

  //returning data of context and give variables and functiones in value={} field
  return (
    <GithubContext.Provider
      value={{
        ...state /*refactoring code  (//fetching users data from reducer state //loading variable from reducer state //user object from reducer (initial state) //list of repositories) all this wariables in state*/,
        dispatch, //refactoring dispatch function from reducer
        //searchUsers: searchUsers, //searching function (remove when refactoring)
        clearUsers: clearUsers, //clear users
        getUser: getUser, //geting single user info function
        getUserRepos: getUserRepos, //function to fetch reposetories of user
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
