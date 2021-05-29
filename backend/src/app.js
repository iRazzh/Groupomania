// Ajout "d'express" => Infrastructure d'applications web Node.js minimaliste et flexible
const express = require('express');
// Création d'une application express
const app = express();
// Ajout de "bodyParser" => Parse les corps de requête entrants dans un middleware 
const bodyParser = require('body-parser');
// Ajout de "helmet" => Permet de sécuriser des applications Express en définissant divers en-têtes HTTP
const helmet = require('helmet');
// Ajout de "path" => Permet de travailler avec le système de fichier
const path = require('path');

// Importation de la route dédiée aux utilisateurs
const userRoutes = require('./routes/user');
// Importation de la route dédiée aux posts
const postRoutes = require('./routes/post');
// Importation de la route dédiée aux commentaires
const commentsRoutes = require('./routes/comment');

// Système de sécurité CORS
app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
  
});

// Transformation des données en un objet JSON
app.use(bodyParser.json());

// Active helmet
app.use(helmet());

// Permet de charger les fichiers qui sont dans 'images'
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes API => user
app.use('/api/auth', userRoutes);
// Routes API => post
app.use('/api/post', postRoutes);
// Routes API => comments
app.use('/api/comment', commentsRoutes);

module.exports = app;