const jwt = require("jsonwebtoken");
require('dotenv').config()

module.exports = (req, res, next) => {
    try 
    {
        // Récupération du token dans le header, et du deuxième élément du tableau
        const token = req.headers.authorization.replace("Bearer ", "");
        // Vérification des token
        const decodedToken = jwt.verify(token, process.env.TOKEN);
        console.log(decodedToken)
        // Pour récupérer le user Id
        req.id_user = decodedToken.userId; 
        req.admin = decodedToken.adminRank;
        
        if(decodedToken.userId == undefined) {
            console.log('Coucou')
            throw new Error
        }
        next();

    } 
    catch(err) 
    {
        res.status(401).json({ error: 'Requête non authentifiée !'});
    }
};