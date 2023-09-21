# Github finder

For GitHub Finder app basically I used the GitHub REST API to be able to search users and get their profile data and display it nicely.
And deal with a third-party API.

The main things I worked with on this project:
- GitHub REST API

And second thing, dive more into the
- Context API

And instead of just using the `useState` hook within our Context like I did in the feedback app, I used reducers. 
And reducers are basically, they're pure functions that are used to manipulate parts of your state in app. So I used reducers along with a hook called `useReducer`. 

This React application was also built using Vite, a fast build tool and development server.

## Style

That project entire UI write with **`Tailwind`** and also this Tailwind component called **`Daisy UI`**, 
which gives us some higher level classes for buttons and alerts and things like that.

## What inside app ?

I can search users. If have no field in here in search bar, I'll get a nice little alert that shows up and goes away. So I had an alert context as well.

If I just search some github names, i'll see it'll give me some cards with some users. I can clear the state as well.

But if I click on view profile, it'll take me to a nice looking profile where it has next things:
1. The image
2. The bio
3. Location of the user
4. Stats
5. Followers
6. Following, et cetera

And then I'll also make another request to the API to fetch the users repositories. And these all have links to go to the repos as well. If I go to something that doesn't exist, I'll get 404 not found page. 

A token for requests to the server via the Github API is also created and stored separately in a file with the **`.env`** extension

## Libraries used in the project

- Tailwind
- daisyui
- prop-types
- react-icons
- react-router-dom
- axios

## How to start app

After cloning the repository, in the root folder, run the following commands: 

    npm install
    npm run dev
