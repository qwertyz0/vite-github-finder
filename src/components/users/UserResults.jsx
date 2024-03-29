import React from "react";
import { useContext } from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/GithubContext";

function UserResults() {
  // remove useEfect with fetchUsers function (was for testing)
  const {loading, users} = useContext(GithubContext)

  if (!loading) {
    {
      /* create grid colomn class style for different monitor size (grid - xl, lg, md) */
    }
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => {
          return <UserItem key={user.id} user={user}/>;
        })}
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default UserResults;
