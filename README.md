# todo-api-node

todo-api-node is a RESTFUL Api which returns a `JSON` data that can be used for your simple Todo App.

## App Features

* Ability to CREATE USERS,
* LOGIN
* Create activity lists for the day,
* View activities for the day
* View activities for week or month.
* Ability to mark an activity as completed.

## How to run the api

* Clone the repo to your computer
* Cd into the root dir of the project 
* Run `npm install` to install dependency.
* Run `npm start` to start the server which will run on `http://localhost:3500`.


## How to Test the todo-activity-list api

Postman can be use for Api testing 

* To `create` new `user` send a `post request` to the route `http://localhost:3500/api/users` 
* To `login` send a `post request` to the route `http://localhost:3500/api/login` with an already created user's detail
* To create `activity list` send a `post request` to the route `http://localhost:3500/api/activities` 
* To view `activity list` for `day` send a `get request` to the route `http://localhost:3500/api/activities`
* To view `activity list` for `week` and `month` send a `get request` to `http://localhost:3500/api/activities` passing the `:/{jan}` and `:/{mon}` to the route
* To mark an `activity` as `completed` send a `put request` to the route `http://localhost:3500/api/activities` passing in the `/:id`




## Technologies
[<img alt="javascript" height="25px" src="https://www.freepnglogos.com/uploads/javascript/javascript-online-logo-for-website-0.png" />](https://github.com/code-collabo/node-mongo-cli)
[<img alt="node js" height="25px" src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg" />](https://github.com/code-collabo/node-mongo-cli)
