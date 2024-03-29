import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import AlertContext from "../../context/alert/AlertContext";
import { searchUsers } from "../../context/github/GithubActions";

function UserSearch() {
  const { users, dispatch } = useContext(GithubContext); //github-context users data from reducer /now remove default searchUsers function from context and use it from GithubActions/, add dispatch function, remove clear users
  const { setAlert } = useContext(AlertContext); //alert-context

  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text === "") {
      setAlert("Please enter something", "error");
    } else {
      // todo - serch users
      dispatch({ type: "SET_LOADING" });
      const users = await searchUsers(text); //need to create variable for returning data from searchUsers (asyncron)
      dispatch({ type: "GET_USERS", payload: users });

      setText("");
    }
  };

  const handleClear = () => {
    dispatch({ type: "CLEAR_USERS" }); //refactoring clearUsers function
    setText("");
  };

  return (
    <div className="grid grid-cols-1  xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="Search"
                value={text}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button className="btn btn-ghost btn-lg" onClick={handleClear}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
