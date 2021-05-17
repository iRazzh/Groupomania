<template>
  <div class="signupForm">

    <form @submit.prevent = signup()>
      <div class="formSignup">
        <label>Nom :</label> <br />
        <input class="nameSignup" type="text" placeholder="Marc DUPONT" required />
        <br />
      </div>

      <div class="formSignup">
        <label>Email :</label> <br />
        <input class="emailSignup" type="text" placeholder="marc.dupont@gmail.com" required />
        <br />
      </div>

      <div class="formSignup">
        <label>Mot de passe :</label> <br />
        <input
          class="passwordSignup"
          type="password"
          placeholder="Mot de passe"
          required
        />
        <br />
      </div>

      <div class="formSignup">
        <label>Vérification du mot de passe :</label> <br />
        <input
          class="verifPasswordSignup"
          type="password"
          placeholder="Mot de passe"
          required
        />
        <br />
      </div>

      <button class="btnSignup" type="submit">S'inscrire !</button> <br />
      <p class="errorSignup"></p>

      <p class="wantLogin">Vous êtes déjà inscrits ?</p>
      <nav><router-link to="/">Se connecter</router-link></nav>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Signup",

  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },

  methods: {

    signup() {
      const name = document.getElementsByClassName("nameSignup")[0].value;
      const email = document.getElementsByClassName("emailSignup")[0].value;
      const password = document.getElementsByClassName("passwordSignup")[0].value;
      const validPassword = document.getElementsByClassName("verifPasswordSignup")[0].value;
      if (password === validPassword) {
        axios.post("http://localhost:3000/api/auth/signup",
            {
              name,
              email,
              password,
            },

            {
                header: {
                "Content-Type": "application/json",
                },
            }
        )
        .then((res) => {
            alert("Votre compte vient d'être crée !");
            console.log(res)
        })
        .catch((error) => {console.log("Problème lors de l'identhification!" + error);
          });
      } else if (password !== validPassword) {
          alert("Les mots de passe ne sont pas identiques");
      }
    },

  },
};
</script>

<style scoped>
.signupForm {
  margin-bottom: 2rem;
}
form {
  text-align: center;
  margin: 1rem 0;
}
.formSignup {
  margin-bottom: 1rem;
}
input {
  margin: 1rem 0;
  padding: 5px;
}
.wantLogin {
  text-align: center;
  margin: 4rem 0 3rem 0;
}
a {
  text-decoration: none;
  color: black;
  border: 1px black transparent;
  border-radius: 10px;
  padding: 1rem;
  background: rgb(175, 175, 175);
}
</style>
