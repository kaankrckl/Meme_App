# Meme App

This full-stack Node.js app is designed to allow users to share the memes they like with others.
## Getting Started

### Prerequisites

You will need Node.js and MongoDB.

### Installation
To get you started you can simply clone the repository:

```
git clone https://github.com/kaankrckl/Meme_App.git
```
and install the dependencies
```
npm install
```

#### MongoDB
The project uses MongoDB as a database. (https://www.youtube.com/watch?v=b089GmAvUyQ&feature=youtu.be I have used this tutorial to install and prepare mongodb setup since I am working with c9 platform.)

Once the dependencies are installed, you can run to start the application.
```
$ node app.js
```
## To use all functionality of the application
 1. Create an account with a username and password
 2. Post a meme with a meme link and description
 3. View others memes and comments your thoughts
 
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
