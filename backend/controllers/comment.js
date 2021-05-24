const db = require('../sqlBDD');
const Comment = require('../models/Comment');

// Création d'un commentaire
exports.createComment = (req, res, next) => {
    date = new Date ();
    const comment = new Comment ({
        id_user: req.id_user,
        id_post: req.params.id,
        content: req.body.content,
        date_creation: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay(),
        status: 1
    })
    db.query(`INSERT INTO comment SET ?`, comment, (error, result) => {
        if(error) {
            res.status(400).json({ error: 'Commentaire non crée' })
        } else {
            res.status(200).json({ result })
        }
    })
}

// Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
    const id = req.params.id
    db.query(`DELETE FROM comment WHERE id = ?` , id, (error, result) => {
        if (error) {
            return res.status(400).json({ error: "Le commentaire n'a pas pu être supprimé" })
        }
        return res.status(200).json(result);
    })
}

// Accès à tous les commentaires
exports.getAllComments = (req, res, next) => {
    db.query(`SELECT id, comment.id_user, comment.id_post, content, date_creation, status FROM comment INNER JOIN user ON user.id_user = comment.id_user`, (error, result) => {
        if (error) {
            return res.status(400).json({ error: "Vous ne pouvez pas accéder à tous les commentaires" })
        }
        return res.status(200).json(result);
    })
}