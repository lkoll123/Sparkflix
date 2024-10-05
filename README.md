Project Description:  a netflix application replica using html(JSX), css, NodeJS, ReactJS, and MySQL.
I developed this application using the vite local development server.
My website features a fully functional landing screen, login page, signup sequence(including plan selection), a whos-watching page supporting up to 5 users per account, 
and netflix home screen(You can’t actually watch movies, I would have had to pirate movies for that), all of which are closely modeled after the real netflix application. 
Project Structure/Tools:
My project follows a general react-app structure, with a pages folder, React components folder, util folder(for general js functionality), an assets folder(for static resources 
such as images), a styles folder, and App.jsx/index.html files that route and display the information. On the back-end, I utilized nodejs to service all api calls that either 
queried or manipulated the data. This ranges from checking if an email is already registered with the account database, account verification when logging in, adding/removing 
users from an account, etc. All information is stored in a MySQL database. The bcryptjs module is utilized to encrypt(hash) the password before storage in the mysql database,
as well as account verification. 
