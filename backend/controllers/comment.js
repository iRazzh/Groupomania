const db = require('../sqlBDD');
const Comment = require('../models/Comment');

// Création d'un commentaire
exports.createComment = (req, res, next) => {
    date = new Date ();
    const comment = new Comment ({
        id_user: req.body.id_user,
        id_post: req.params.id,
        content: req.body.content,
        date_creation: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay(),
        status: 1
    })
    db.query(`INSERT INTO comment SET ?`, comment, (error, result) => {
        if(error) {
            console.log(error)
            res.status(400).json({ error: 'Commentaire non crée' })
        } else {
            res.status(200).json({ result })
        }
    })
}

// Modification d'un commentaire 
exports.modifyComment = (req, res, next) => {
    db.query(`UPDATE comment SET content = ? WHERE id = ?`, [req.body.content, req.params.id], (error, result) => {
        if (error) {
            return res.status(400).json({ error: "Le commentaire n'a pas pu être modifié" })
        }
        return res.status(200).json(result);
    })
}

// Adapter le delete (comme user)
// Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
    db.query(`DELETE FROM comment WHERE id = ${req.params.id}`, (error, result) => {
        if (error) {
            return res.status(400).json({ error: "Le commentaire n'a pas pu être supprimé" })
        }
        return res.status(200).json(result);
    })
}