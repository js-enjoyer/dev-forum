# My Project
Welcome to my unfinished scuffed project!

## Introduction
This is a simple application even though I didnt want it to be... 
It allows users to search for specific code questions by tags and search, post questions with snippet code strings(didnt fully work out with the visuals). and answer questions. Only users can create and anwer questions. You can check out other users profiles and check their stats(doesnt fully work). A user can upvote and downvote answers(didnt have time to do the same for the questions and a user can upvote and downvote multiple times which he shouldnt). The app makes request to a custom backend rest-api service. 

## Features
- User Authentication
- Ask and Answer Questions
- Upvote/Downvote Questions
- Tagging System

## Installation
1. Clone the repository:
    - Clone with repository with this url https://github.com/js-enjoyer/dev-forum.git. 
    - Either from a desktop app like GitHub Deskto
    - Or just directly clone with command: *git clone* ...repository url.

2. Install dependencies:
    When you open the app run command: *npm i*.
    This will install all of the needed dependecies.

3. Run the server:
    - You need MongoDB Compass on your pc so you can connect to the local database.
    - Open the folder called forum-REST-api.
    - Open in VScode.
    - Run commnad: *npm start*  in the terminal.

3. Run the app:
   - Run the app with command: *npm start* in the terminal.
   - Right click on the link that displays in the terminal.
   - Or just directly type http://localhost:4200/ in the address bar.


## Guide

1. **Login/Register:**
   - The app uses a server-side back and fort jwt token authentication system. 
   - Once you run the app, click on the *Log In* or *Sign Up* buttons top right.
   - If you want to log in use account username: *vazlor* and password: *asdasdasd*
   - You can also register when clicking Sign Up and filling out the form.

2. **Search for Questions:**
   - On any page, use the search bar in the navigation to look for specific questions based on tags or title.

3. **Ask a Question:**
   - Logged-in users can click the "Ask a Question" button to post new questions, including code snippets.
   - Fill in the form and submit your question. The code snippet is optional.

4. **Answer a Question:**
   - You can answer questions posted by other users when you click on the title of the question.
   - From there you can post a response in the submit form

5. **Upvote/Downvote Answers:**
   - Users can vote on answers if the find them usefull or misinforming.
   - Upvoting or downvoting an answer, changes the stats of the answer.

6. **Edit Profile**
    - On the edit profile page a user can edit his whole profile info.

# Validation and Features

1. *Log-In and Register*
    - Both forms have a dynamic custom validation system.
    - All the fields have popup messages notifying the client if the input is valid or not.
    - All fields are required.
    - All fields have custom length validation.
    - Email has regex validation with endpoint like .bg and .com

2. *Edit Profile*
    - Email is required when submitting.
    - Password is optional.
    - Updating your passwrod sends a request to the backend server where the back end checks if the old password matches.


## API Endpoints
*questions*
- **GET /questions/recommended**: Fetch all questions.(It was supposed to fetch based on watched tags but didnt have time:D)
- **GET questions/user/:id**: Fetch questions that a specific user has asked.
- **POST /questions/search**: Fetch questions based on the search and tags.
- **POST /questions/create**: Post a questions.
- **GET /questions/:id/details**: Fetch a specific question for details.
- **GET /questions/tags**: Fetch all tags.
- **POST /questions/tags/search**: Fetch searched for tags.

*answers*
- **POST /answers/create**: Post a asnwer to a question.
- **GET /question/:id**: Fetch all the answers for a specific question.
- **GET /:id/upvote**: Update answer with + upvote count.
- **GET /:id/downvote**: Update answer with - upvote count.

*user*
- **GET /user/profile**: Fetch the user profile with the jwt token.
- **POST /user/login**: Send a post login request.
- **POST /user/:register**: Send a post register request.
- **GET /user/logout**: Send a get logout request.
- **GET /user/users**(yes im that creative :D): Fetch all of the users.
- **POST /user/edit**: Send a update request for your profile.
- **GET /user/:id**: Fetch a specific user.
- **GET /user/upvote**: Update specific user with + upvote count.
- **GET /user/downvote**: Update specific user with - upvote count.