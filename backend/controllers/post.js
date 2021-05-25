const db = require('../sqlBDD');
const fs = require('fs');
const Post = require('../models/Post');

// Création d'un post
exports.createPost = (req, res, next) => {    
    date = new Date();
    
    let image = "";
    
    if (req.file) {
        image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    }

    const post = new Post ({
        id_user: req.id_user,
        content: req.body.content,
        image: image,
        date: date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay(),
        status: 1
    });

    db.query(`INSERT INTO post SET ?`, post, (error, result) => {
        if(error) {
            // return res.status(400).json({ error: "Le post n'a pas pu être crée!" });
            return res.status(400).json({ error: error });
        }
        return res.status(201).json ({ message: "Post crée!" })
    });
}

// Modifier un post
exports.modifyPost = (req, res, next) => {
    db.query(`UPDATE post SET content = ? WHERE id = ?`, [req.body.content, req.params.id], (error, result) => {
        if (error) {
            return res.status(400).json({ error: "Le post n'a pas pu être modifié" })
        }
        return res.status(200).json(result);
    })
}

// Supprimer un post
exports.deletePost = (req, res, next) => {
    const id = req.params.id
    db.query(`DELETE FROM post WHERE id = ?`, id, (error, result) => {
        if (error) {
            return res.status(400).json({ error: "Le post n'a pas pu être supprimé" })
        }
        return res.status(200).json(result);
    })
}

// Accès à un post 
exports.getOnePost =  (req, res, next) => {
    const id = req.params.id
    db.query(`SELECT * FROM post WHERE id = ?`, id, (error, result) => {
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


