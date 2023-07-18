//actions file for refactoring
import axios from "axios";

const GITHUB_URL = import.meta.env.VITE_APP_GITHUB_URL;
const GITHUB_TOKEN = import.meta.env.VITE_APP_GITHUB_TOKEN;

//create instance of axios (next time can use github.get or eth instead of axio.get and eth)
const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token ${GITHUB_TOKEN}` },
});

//get search users function
export const searchUsers = async (text) => {
  // make query parameter with URLSearchParams to get (q=TEXT_WE_TYPE) from UserSearch.jsx search bar
  const params = new URLSearchParams({
    q: text,
  });

  // in axio instantly return data of json (dont need to use responce.json!) All this info saved in axio obj "data"
  const responce = await github.get(`/search/users?${params}`);
  return responce.data.items; //return items from obj 'data'

  // const response = await fetch(
  //   `${GITHUB_URL}/search/users?${params}` /*add /serch/ and query parameter dinamic */,
  //   {
  //     headers: {
  //       Authorization: `token ${GITHUB_TOKEN}`,
  //     },
  //   }
  // );

  //destructuring all geting data, to get all data in {items}
  // const { items } = await response.json();
  // return items;

  // // dispatching action with type and payload data
  // dispatch({
  //   type: "GET_USERS",
  //   payload: items /* use destruct items instead of data*/,
  // });
};

//get user and repos in one function
export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]); // return data for both variable (user and repos) using promise

  return { user: user.data, repos: repos.data }; //destructurin from objects user and repos
};

//get user (single)
// export const getUser = async (login) => {
//   const response = await fetch(`${GITHUB_URL}/users/${login}`, {
//     headers: {
//       Authorization: `token ${GITHUB_TOKEN}`,
//     },
//   });

//   if (response.status === 404) {
//     window.location = "/notfound"; //redirect if user 404
//   } else {
//     //destructuring all geting data, to get all data in {items}
//     const data = await response.json();

//     return data;

//     // dispatching action for single user from data
//     // dispatch({
//     //   type: "GET_USER",
//     //   payload: data,
//     // });
//   }
// };

// //get repositories of user
// export const getUserRepos = async (login) => {
//   // make query parameter with URLSearchParams to get (sort=LAST_CREATED) and only 10
//   const params = new URLSearchParams({
//     sort: "created",
//     per_page: 10,
//   });

//   const response = await fetch(
//     `${GITHUB_URL}/users/${login}/repos?${params}` /*find repos of the user*/,
//     {
//       headers: {
//         Authorization: `token ${GITHUB_TOKEN}`,
//       },
//     }
//   );

//   //getinag all repos as data
//   const data = await response.json();

//   return data;

//   // // dispatching action with type and payload data
//   // dispatch({
//   //   type: "GET_REPOS",
//   //   payload: data,
//   // });
// };
