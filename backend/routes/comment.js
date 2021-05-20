const express = require('express');
const router = express.Router();

// Important de "auth" qui permet de sécuriser les routes
const auth = require('../middleware/auth');

// Importation du "controller" concernant les "commentaire"
const commentCtrl = require('../controllers/comment');

// Router de la création d'un commentaire
router.post('/:id/comment', auth, commentCtrl.createComment);
// Router de la modification d'un commentaire
router.put('/comment/:id', auth, commentCtrl.modifyComment);
// Router de la suppression d'un commentaire
router.delete('/comment/:id', auth, commentCtrl.deleteComment);
// Router de l'accès à tous les commentaires
router.get('/all', auth, commentCtrl.getAllComments);

module.exports = router;