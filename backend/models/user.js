class User {
    constructor(id_user, name, email, password, admin) {
        this.id_user=id_user;
        this.name=name;
        this.email=email;
        this.password=password;
        this.admin=admin;
    }

    static addUser(name, email, password, admin) {
        // Envoyer à la BDD, ces infos-là et récupérer l'id_user
        console.log("addUser")
    }
    static removeUser(id_user) {
        // Envoyer à la BBD la suppression de l'utilisateur qui a l'id_user
    }
    modifyEmail(email) {
        // Envoyer à la BDD la modification de l'email de l'utilisateur
        // Pour récupérer l'id_user, je fais this.id_user
    }
}

monUser= new User("1","tanguy","tanguygerardin60@hotmail.com","1234","1")