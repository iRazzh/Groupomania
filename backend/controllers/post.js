const db = require('../sqlBDD');
const fs = require('fs');
const Post = require('../models/Post');

// Adapter le create (comme le comment)
// Création d'un post
exports.createPost = (req, res, next) => {    
    let image = "";
    if (req.file) {
        image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    }
    const post = new Post ({
        id_user: req.body.id_user,
        content: req.body.contenu,
        image: image
    })
    db.query(`INSERT INTO post SET ?`, post, (error, result) => {
        if(error) {
            return res.status(400).json({ error: "Le post n'a pas pu être crée!" });
        }
        return res.status(201).json ({ message: "Post crée!" })
    })
}

// Adapter le modify (comme le comment)
// Modifier un post
exports.modifyPost = (req, res, next) => {
    db.query(`UPDATE post SET content = '${req.body.content}'`, (error, result) => {
        if (error) {
            return res.status(400).json({ error: "Le post n'a pas pu être modifié" })
        }
        return res.status(200).json(result);
    })
}

// Adapter le delete (comme user)
// Supprimer un post
exports.deletePost = (req, res, next) => {
    db.query(`DELETE FROM post WHERE id = ${req.params.id}`, (error, result) => {
        if (error) {
            return res.status(400).json({ error: "Le post n'a pas pu être supprimé" })
        }
        return res.status(200).json(result);
    })
}

// Accès à tous les posts
exports.getAllPost = (req, res, next) => {
    db.query(`SELECT id, post.id_user, content, image, date, status, name FROM post INNER JOIN user ON user.id_user = post.id_user ORDER BY date DESC`, (error, result) => {
        if (error) {
            return res.status(400).json({ error: "Vous ne pouvez pas accéder à tous les posts" })
        }
        return res.status(200).json(result);
    })
}
