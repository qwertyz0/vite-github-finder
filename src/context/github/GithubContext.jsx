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
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState); //reducer hook take to arguments (created reducer and initialized state)

  // 'fetchUsers' function for testing purposes (not using in main version)
  const fetchUsers = async () => {
    setLoading()

    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await response.json();

    // dispatching action with type and payload data
    dispatch({
      type: "GET_USERS",
      payload: data,
    });
  };

  //set loading function 
  const setLoading = () =>{
    dispatch({
      type: "SET_LOADING"
    })
  }

  //returning data of context and give variables and functiones in value={} field
  return (
    <GithubContext.Provider
      value={{
        users: state.users, //fetching users data from reducer state
        loading: state.loading, //loading variable from reducer state
        fetchUsers: fetchUsers, //fetching function
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
