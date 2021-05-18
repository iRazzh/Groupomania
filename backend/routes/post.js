const express = require('express');
const router = express.Router();

// Important de "auth" qui permet de sécuriser les routes
const auth = require('../middleware/auth');

// Important de "multer" pour gérer les images
const multer = require('../middleware/multer-config');

// Importation du "controller" concernant les "post"
const postCtrl = require('../controllers/post');

// Rajouter le multer (a voir sur Git si jamais)

// Router de la création du post
router.post('/create', auth, multer, postCtrl.createPost);
// Router de la modification du post
router.put('/:id', auth, multer, postCtrl.modifyPost);
// Router de la suppression du post
router.delete('/:id', auth, postCtrl.deletePost);
// Router de l'accès à tous les posts 
router.get('/all', auth, postCtrl.getAllPost);

module.exports = router;