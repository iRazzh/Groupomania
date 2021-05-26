const express = require('express');
const router = express.Router();

// Important de "auth" qui permet de sécuriser les routes
const auth = require('../middleware/auth');

// Importation du "controller" concernant les "commentaire"
const commentCtrl = require('../controllers/comment');

// Router de la création d'un commentaire
router.post('/:id/comment', auth, commentCtrl.createComment);
// Router de la suppression d'un commentaire
router.delete('/comment/:id', auth, commentCtrl.deleteComment);

module.exports = router;