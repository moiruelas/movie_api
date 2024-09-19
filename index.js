const express = require('express');
const morgan = require('morgan');
const path = require('path'); //added to support 'path' module
const app = express();

app.use(morgan('common'));//this logs every request, commonn is the default and logs date, time, method, and ip

app.use('/documentaion', express.static('public'));//this allows the API to serve static files from the public folder

app.get('/', (req, res) => {
  //this just lists the below message when visiting the root of the app
  res.send('Welcome to my movie app :)!');
});

app.get('/movies', (req, res) => {
  //this sends the movies.json file
  res.sendFile(path.join(__dirname, 'movies.json'));
});

app.get('/documentation', (req, res) => {
  //this serves the documentation.html file from the public folder
  res.sendFile(path.join(__dirname, 'public', 'documentation.html'));
});

//This is where the API routes start

// Route for getting all movies
app.get('/movies', (req, res) => {
  res.send('Successful GET request returning a list of all movies');
});

// Route for getting a single movie by title
app.get('/movies/:title', (req, res) => {
  res.send(`Successful GET request returning data about the movie titled "${req.params.title}"`);
});

// Route for getting data about a genre by name
app.get('/genres/:name', (req, res) => {
  res.send(`Successful GET request returning data about the genre named "${req.params.name}"`);
});

// Route for getting data about a director by name
app.get('/directors/:name', (req, res) => {
  res.send(`Successful GET request returning data about the director named "${req.params.name}"`);
});

// Route for registering a new user
app.post('/users', (req, res) => {
  res.send('Successful POST request to register a new user');
});

// Route for updating user info (username)
app.put('/users/:username', (req, res) => {
  res.send(`Successful PUT request to update user info for username "${req.params.username}"`);
});

// Route for adding a movie to a user’s list of favorites
app.post('/users/:username/movies/:movieId', (req, res) => {
  res.send(`Successful POST request to add movie with ID "${req.params.movieId}" to the favorites list of user "${req.params.username}"`);
});

// Route for removing a movie from a user’s list of favorites
app.delete('/users/:username/movies/:movieId', (req, res) => {
  res.send(`Successful DELETE request to remove movie with ID "${req.params.movieId}" from the favorites list of user "${req.params.username}"`);
});

// Route for deregistering a user
app.delete('/users/:username', (req, res) => {
  res.send(`Successful DELETE request to deregister user with username "${req.params.username}"`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  //this starts the app server
  console.log('Your app is listening on port 8080.');
});