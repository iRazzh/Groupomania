const db = require('../sqlBDD');
const Commentaire = require('../models/Commentaire');

// Création d'un commentaire
exports.createComments = (req, res, next) => {
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
