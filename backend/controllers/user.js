const User = require('../models/User');
const bcrypt = require("bcrypt"); // Utilisation de "bcrypt" pour hasher le mdp
const jwt = require('jsonwebtoken'); // Utilisation de "jsonwebtoken" pour attribuer un token lors de la connexion
const db = require('../sqlBDD');
require('dotenv').config() // Masquage des infos importantes dans le fichier .env

// Inscription d'un utilisateur
exports.signup = (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/; 
    const regexName = /^([A-Z][a-z]*((\s)))+[A-Z][a-z]*$/;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // Minimum 8 caractères, 1 lettre majuscule, 1 lettre minuscule et 1 nombre

    if(email.match(regexMail) && name.match(regexName) && password.match(regexPassword)) {
        bcrypt
        .hash(password, 10)
        .then((hash) => {
            const user = new User ({
                name: req.body.name,
                email: req.body.email,
                password: hash,
            });
            db.query(`INSERT INTO user SET ?`, user, (error, result) => {
                if (error) {
                    console.log(error)
                    return res.status(400).json("erreur")
                } else {
                    return res.status(201).json({ message: 'Création du compte effectuée' })
                };
            })
        })
        .catch(error => res.status(500).json({ error }));
    } else {
        throw new Error ("Un problème a été detecté lors de l'inscription")
    }
};

// Connexion d'un utilisateur 
exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let sql = `SELECT * FROM user WHERE email = ?`;
    db.query(sql, email, (error, result) => {
        if(result =='' || result == undefined) {
            return res.status(401).json({ error : "Utilisateur introuvable" })
        } else {
            console.log(result)
            bcrypt.compare(password, result[0].password)
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({ error : "Mot de passe incorrect" })
                } 
                res.status(200).json({ 
                    userId: result[0].id_user,
                    admin: result[0].admin,
                    token: jwt.sign({
                        userId: result[0].id_user},
                        process.env.TOKEN,
                        { expiresIn: '24h' })
                })
            })
        }
    })
};

// Supprime le compte d'un utilisateur
exports.delete = (req, res, next) => {
    console.log(req.params)
    db.query(`DELETE FROM user WHERE id_user = ?` , req.params.id, (error, result) => {
        if (error) {
            return res.status(400).json({ error : "L'utilisateur n'a pas pu être supprimé"})
        }
        return res.status(200).json(result);
    });  
};