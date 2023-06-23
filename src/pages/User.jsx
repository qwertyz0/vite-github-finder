import React, { useEffect, useContext } from "react";
import GithubContext from "../context/github/GithubContext";
import { useParams } from "react-router-dom";

function User() {
  const { getUser, user } = useContext(GithubContext);

  const params = useParams(); // hook to get login name parametr

  useEffect(() => {
    getUser(params.login);
  }, []);
  return <div>{user.login}</div>;
}

export default User;