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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(8080, () => {
  //this starts the app server
  console.log('Your app is listening on port 8080.');
});