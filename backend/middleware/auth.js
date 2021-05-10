const jwt = require("jsonwebtoken");
require('dotenv').config()

module.exports = (req, res, next) => {
    try {
        // Récupération du token dans le header, et du deuxième élément du tableau
        const token = req.headers.authorization.split(' ')[1];
        // Vérification des token
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        // Vérification de l'userId avec celui encodé du token
        const userId = decodedToken.userId;
        if (req.body.id_user && req.body.id_user !== userId) {
            throw 'Invalid user ID';
        } else {
            next()
        }
    } catch {
        res.status(401).json({ error: 'Requête non authentifiée !'});
    }
};