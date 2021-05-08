const express = require('express');
const router = express.Router();

// Importation du "controller" concernant les "users"
const userCtrl = require('../controllers/user');

// Router de l'inscription
router.post('/signup', userCtrl.signup);
// Router de la connexion
router.post('/login', userCtrl.login);
// Router de la suppression 
router.delete('/delete', userCtrl.delete);


module.exports = router;