# Meme App

This full-stack Node.js app is designed to allow users to share the memes they like with others.
## Getting Started
To get you started you can simply clone the repository:

```
git clone https://github.com/FortechRomania/express-mongo-example-project
```
and install the dependencies
```
npm install
```
### Prerequisites

You will need Node.js and MongoDB.

### Installation
This app can be installed using npm either locally or globally.

To perform a local install:
```
$ git clone <project>
$ cd <project_folder>
$ npm install
```

Once the dependencies are installed, you can run to start the application. You will then be able to access it at localhost:27017
```
$ node app.js
```

## User Stories

Without being logged in, user can
 * register as a new user
 * login to start a new session
 * logout of their session
 * View a list of memes and its comments

A logged in user can:
 * create memes
 * edit the memes they own
 * update memes the memes they own
 * delete memes the memes they own
 * Comment on memes
