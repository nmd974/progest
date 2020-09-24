const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const HttpError = require('./shared/http-error');
const db = require('./db');
const projectRoute = require('./routes/project-route');
const usersRoute = require('./routes/users-route');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join('public')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

//Routing
app.use('/api/project', projectRoute);
app.use('/api/users', usersRoute);


//CombinedAPP
app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});



app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500)
  res.json({ message: error.message || 'Une erreur inconnue est survenue' });
  res.json
});

//Acces au serveur + check avant si la bdd est bien connectée
db.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(process.env.PORT || 3100)
  }
});



