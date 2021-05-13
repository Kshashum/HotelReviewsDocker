# Hotel Reviews Website Deployed using Docker
# Frontend
The frontend is built using React(Hooks), Entire react app is Wrapped around a context api, that keep track of the state in the application. <br />
The front end has Seven pages<br />
<ol>
  <li>Home</li>
  <li>Hotels</li>
  <li>Review</li>
  <li>Login</li>
  <li>Signup</li>
  <li>404</li>
  <li>Unauthorized</li>
</ol>
Home page has some general information
<br />
Hotels page has a list of hotels and it's ratings
<br />
Review all reviews for the hotels selected
<br />
Login page for the user to login, and sign up page to register

# Backend
The backend is build using Node and express, There are Three routes
<br />
<ol>
<li>Hotel Route</li>
<li>User Route</li>
<li>Review Route</li>
</ol>
We are using jwt for session management, Hotel Router has all the CRUD operation routes, User Router is used for login and signup routes, Review Router is used to add or remove reviews.

# Database
Postgres is used as the database for this project, command for sql can be found in 
<a href="https://github.com/Kshashum/HotelReviewsDocker/blob/main/backend/db.sql" target="_blank">DB commands</a>