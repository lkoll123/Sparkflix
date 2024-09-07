Project Description: For my 2024 Spark Red application, I developed “Sparkflix”, a netflix application replica using html(JSX), css, NodeJS, ReactJS, and MySQL.
I developed this application completely from scratch(no pre-written code/components, no class-less css stylesheets), using the vite local development server.
My website features a fully functional landing screen, login page, signup sequence(including plan selection), a whos-watching page supporting up to 5 users per account, 
and netflix home screen(You can’t actually watch movies, I would have had to pirate movies for that), all of which are closely modeled after the real netflix application. 
Project Structure/Tools:
My project follows a general react-app structure, with a pages folder, React components folder, util folder(for general js functionality), an assets folder(for static resources 
such as images), a styles folder, and App.jsx/index.html files that route and display the information. On the back-end, I utilized nodejs to service all api calls that either 
queried or manipulated the data. This ranges from checking if an email is already registered with the account database, account verification when logging in, adding/removing 
users from an account, etc. All information is stored in a MySQL database. The bcryptjs module is utilized to encrypt(hash) the password before storage in the mysql database,
as well as account verification. At time of submission, Sparkflix features UI components for email verification/signup with code, but this has not yet been configured with 
google OAuth. That being said, I will continue working on this project so it may be by the time of review. In order to acquire movie data(images, descriptions, etc) for the
netflix interface, I utilized the free tmdb api.
Time Spent:
I spent around 25-30 hours across the past 4 days to get to the stage I’m at. (Most of this was from meticulous css styling)
Features:
My application features frontend components as well as simple transition/fade-in animations that replicate what the netflix site uses. Although I didn’t attempt to 
replicate the mobile interface or focus much on mobile compatibility, I tried to make the pages responsive to window size, and therefore should be generally functional
on smaller windows. My application is purely a react project, heavily using react state management, useEffect, localStorage, etc. Although my backend wasn’t very
complicated, and therefore does not feature OOP, I had user verification, API calls, and MySQL integration in my project. I also had full-stack integration, connecting
the front end with my node/express backend.
