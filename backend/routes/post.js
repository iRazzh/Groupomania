const express = require('express');
const router = express.Router();

// Important de "auth" qui permet de sécuriser les routes
const auth = require('../middleware/auth');

// Importation du "controller" concernant les "post"
const postCtrl = require('../controllers/post');

// Router de la création du post
router.post('/', auth, postCtrl.createPost);
// Router de la modification du post
router.put('/:id', auth, postCtrl.modifyPost);
// Router de la suppression du post
router.delete('/:id', auth, postCtrl.deletePost);
// Router de l'accès à tous les posts 
router.get('/', auth, postCtrl.getAllPost);

module.exports = router;