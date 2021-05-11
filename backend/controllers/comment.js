const db = require('../sqlBDD');
const Comment = require('../models/Comment');

// Création d'un commentaire
exports.createComment = (req, res, next) => {
    const comment = new Comment ({
        id_user: req.body.id_user,
        id_post: req.body.id_post,
        content: req.body.content
    })
    db.query(`INSERT INTO comment SET ?`, comment, (error, result) => {
        if(error) {
            res.status(400).json({ error: 'Commentaire non crée' })
        } else {
            res.status(200).json({ results })
        }
    })
}

// Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
    db.query(`DELETE FROM comment WHERE id = ${req.params.id}`, (error, result) => {
        if (error) {
            return res.status(400).json({ error: "Le commentaire n'a pas pu être supprimé" })
        }
        return res.status(200).json(result);
    })
}