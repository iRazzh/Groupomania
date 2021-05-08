const db = require('../sqlBDD');
const fs = require('fs');
const Post = require('../models/Post');

// Création d'un post
exports.createPost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    const post = new Post({
        ...postObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    });
    db.query(`INSERT INTO post SET ?`, post, (error, result) => {
        if(error) {
            return res.status(400).json({ error: "Le post n'a pas pu être crée!" });
        }
        return res.status(201).json ({ message: "Post crée!" })
    })
    post.save()
    .then(() => res.status(201).json({ message: "Post enregistré!" }))
    .catch((error) => res.status(400).json({ error }));
};

// Modifier un post
exports.modifyPost = (req, res, next) => {
    db.query(`UPDATE post SET contenu = '${req.body.contenu}'`, (error, result) => {
        if (error) {
            return res.status(400).json({ error: "Le post n'a pas pu être modifié" })
        }
        return res.status(200).json(result);
    })
}

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
    db.query(`SELECT id, id_user, contenu, image, date, status FROM post INNER JOIN post ON id_user = id_user ORDER BY date DESC`, (error, result) => {
        if (error) {
            return res.status(400).json({ error: "Vous ne pouvez pas accéder à tous les posts" })
        }
        return res.status(200).json(result);
    })
}