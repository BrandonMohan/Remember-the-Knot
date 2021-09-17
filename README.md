# Remember-the-Knot
Are you a busy person who juggles and struggles with plans? Are you trying to get your life more organized and stress free?

If your answer is yes to any of these, then Remember the Knot is what you need!

Remember the Knot is an application to have a digital copy of your to-do list that can be accessed from anywhere!

# Development
* Learn more about this project by visiting the wiki for Remember The Knot https://github.com/iethan-h/Remember-the-Knot/wiki
* To start the development enviroment:
  1. Clone the repository
  2. Run npm install from the root of the project in your terminal to install any needed dependencies
  3. Use the command npm start to launch the server
  4. Go to the specified localhost port in the config/index.js file

# Technologies implemented
* Javascript
* HTML/CSS
* Node.js
* Express
* Postgres
* Sequelize
* Pug
* Heroku
* Git/Github

# Features

* New account creation, log in/out and guest button
   * Users can create an account, sign into an account, and log out of their account.
   * Users can click the demo button to sign into the site
   * Users cannot access the dashboard without signing in
* Tasks
    * Create a new task button that will allow you to create a new task.
    * Checks which user is logged in and adds a task to the current list
    * Include a name field and completion date for new tasks
    * Manipulate the DOM to update the current list to include the new task without needing to refresh the page
    * Create an edit button to make changes to existing tasks
    * Create a delete button to remove existing tasks
* List
    * Users can create a new list which will hold tasks
    * Users can click a create new list button to open up a page to submit new list
    * Users should be able to add/delete/modify list
* List Summary, somewhere on list page or homepage displaying
    * Users should be able to see total time for a list
    * Users should be able to see how many task in the list
    * Users should see how many task completed
* Search
    * Users should be able to search keywords through list and task that belong to them
    * Users should be able to search results and render list of related search results.



 # Database Schema
 ![Remember the Knot (2)](https://user-images.githubusercontent.com/83061284/133859308-dde4e58a-9e50-41f7-b7a9-2f7092728bd3.png)

