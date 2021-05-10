const db = require('../sqlBDD');
const Commentaire = require('../models/Commentaire');

// Création d'un commentaire
exports.createComment = (req, res, next) => {
    let sql = `INSERT INTO commentaire SET ?`;
    db.query(sql, (error, result) => {
        if(error) {
            res.status(400).json({ error: 'Commentaire non crée' })
        } else {
            res.status(200).json({ results })
        }
    })
}

// Suppression d'un commentaire
exports.deleteComment = (req, res, next) => {
    db.query(`DELETE FROM commentaire WHERE id = ${req.params.id}`, (error, result) => {
        if (error) {
            return res.status(400).json({ error: "Le commentaire n'a pas pu être supprimé" })
        }
        return res.status(200).json(result);
    })
}