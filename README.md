# Remember-the-Knot
Are you a busy person who juggles and struggles with plans? Are you trying to get your life more organized and stress free?

If your answer is yes to any of these, then Remember the Knot is what you need!

Remember the Knot is an application to have a digital copy of your to-do/remember list that can be accessed from anywhere!

#Live Server
http://remember-the-knot.herokuapp.com

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

#Highlight Features
* List Feature
Fully DOM manipulated feature which allows the user to create and update lists without having to reload the browser each time. Without having to reload gives the website a feeling that is more of an application than being a site. This feature highlights our teams ability to manipulate the DOM to display data the users wants.

* Task Feature
Along with a fully DOM manipulated list feature comes with a fully DOM manipulated task feature which allows users to pin tasks to new list without having to reload. 
This feature shows that our team can build not just one DOM feature but two interconnecting DOM features and have the organization and communication to do so.

#Challenges
1. Because this feature is fully DOM, a huge challenge when implementing the feature is efficent communication and organization of our code. A strong skill used to overcome this challenge is precision and apt variable and function naming which allowed the team to easily pick out code to work with and use. We truly felt a solid foundation 
starts with a good naming convention for all variables and functions and efficiently communicating this convention to the team.
 
2. The challenge with coding the task feature is the interaction it has with the list feature which would create plentiful of bugs. Many bug handling codes were pushed during the development of the task feature. Because of the code's strong naming and modular coding the team was able to problem solve each bug and pinpoint where in the code to fix it without breaking other features. This challenge was mainly overcome with the teams ability to problem solve and logically follow the code already put in front. 

#Code Highlight
The following code by itself is not impressive but displays the prowess of the teams naming and modular coding.
The context for this code is to load a default list upon loading in or deleting a list the user is on. Each function used in this is also used in other functions
that provide other functionalities such as adding new list or task.
![code highlight](https://user-images.githubusercontent.com/83061284/134843425-50999834-3477-4bdb-b6f8-9cfb9bf40715.PNG)



 # Database Schema
![Remember the Knot (3)](https://user-images.githubusercontent.com/83061284/134025252-547b7fcb-d1b8-428d-b38f-0a901aa942af.png)

