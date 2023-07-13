//actions file for refactoring

const GITHUB_URL = import.meta.env.VITE_APP_GITHUB_URL;
const GITHUB_TOKEN = import.meta.env.VITE_APP_GITHUB_TOKEN;

//get search users function
export const searchUsers = async (text) => {
  // make query parameter with URLSearchParams to get (q=TEXT_WE_TYPE) from UserSearch.jsx search bar
  const params = new URLSearchParams({
    q: text,
  });

  const response = await fetch(
    `${GITHUB_URL}/search/users?${params}` /*add /serch/ and query parameter dinamic */,
    {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    }
  );

  //destructuring all geting data, to get all data in {items}
  const { items } = await response.json();

  return items;

  // // dispatching action with type and payload data
  // dispatch({
  //   type: "GET_USERS",
  //   payload: items /* use destruct items instead of data*/,
  // });
};

//get user (single)
export const getUser = async (login) => {
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

    return data;

    // dispatching action for single user from data
    // dispatch({
    //   type: "GET_USER",
    //   payload: data,
    // });
  }
};

//get repositories of user
export const getUserRepos = async (login) => {
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

  return data;

  // // dispatching action with type and payload data
  // dispatch({
  //   type: "GET_REPOS",
  //   payload: data,
  // });
};
