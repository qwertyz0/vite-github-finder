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
