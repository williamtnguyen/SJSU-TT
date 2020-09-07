# SJSU Theta Tau Website / Registry Portal

A full stack web application built with [Gatsby](https://github.com/gatsbyjs/gatsby) and [Express](https://github.com/expressjs/express).

## Installation

First, clone this repository

```
$ git clone https://github.com/williamtnguyen/SJSU-TT-v3.git
```

Next, install dependencies for backend and frontend (_Note: you'll need to have [Node.js](https://nodejs.org/en/) installed prior to this_)

```
$ npm install
$ npm run install-frontend
```

## Running the application

The client/server paradigm means the frontend and backend are separate applications that communicate to eachother. To run the full-stack application, we need to start both servers:
(_Note: You'll need to have 2 terminals open for each server_)

```
$ npm run dev:frontend
$ npm run dev:server
```

If everything works, the terminal running the backend will respond with `Server started on port 5000`, and the terminal running the frontend will respond with `success Building development bundle`.
Visit `http://localhost:8000` to use open the development environment

## How do I start on an assigned task?

- You will be assigned a task via the `Issues` section of this repository.
  - The description of the task will usually have pretty clear high-level sub-tasks that will help you break down the task at hand.
  - If there is any confusion, please reach out for clarification/guidance!
- Make use of the `Wiki` section of this repository to understand the Git development workflow and how to structure your commits.
  - _It is important that you understand these steps before starting anything_
- Make a new local branch, then do the task
- Before submitting a pull request (PR):
  - Ensure all your changes are under commits that conform to the [Git Development Standards](https://github.com/williamtnguyen/SJSU-TT-v3/wiki/Git-Development-Standards)
  - Ensure your commits are squashed (if multiple commits are in the PR)
  - Ensure your code doesn't raise any linting errors
    - `npm run lint` will run linter on frontend/backend
