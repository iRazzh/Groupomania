const mysql = require('mysql')

const Commentaire = function(commentaire) {
    this.id = commentaire.id;
    this.id_user = commentaire.id_user;
    this.id_post = commentaire.id_post;
    this.contenu = commentaire.contenu;
    this.date_creation = commentaire.date_creation;
    this.status = commentaire.status;
};

module.exports = Commentaire; 
