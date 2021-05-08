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
// Ajout de "mysql" => Permet de se connecter à la BDD MySQL
const mysql = require('mysql');
// Masquage des infos importantes dans le fichier .env
require('dotenv').config()

// Création de la connexion à la BDD MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

});

// Connexion à la BDD
db.connect(function(err) {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL!");
});

// Système de sécurité CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Transformation des données en un objet JSON
app.use(bodyParser.json());
// Active helmet
app.use(helmet());
// Permet de charger les fichiers qui sont dans 'images'
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;