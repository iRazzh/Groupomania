<template>
  <div class="loginForm">

    <form @submit.prevent = login()>
      <div class="formLogin">
        <label>Email :</label> <br />
        <input 
        class="emailLogin" 
        type="text" 
        placeholder="Email" 
        required 
        />
        <br />
      </div>

      <div class="formLogin">
        <label>Mot de passe :</label> <br />
        <input
          class="passwordLogin"
          type="password"
          placeholder="Mot de passe"
          required
        />
        <br />
      </div>

      <button class="btnLogin" type="submit">Connexion</button> <br />
      <p class="errorLogin"></p>

      <p class="wantSignup">Vous souhaitez vous inscrire ?</p>
      <nav><router-link to="/signup">S'inscrire</router-link></nav>
    </form>

    

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",

  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {

    login() {
      const email = document.getElementsByClassName("emailLogin")[0].value;
      const password = document.getElementsByClassName("passwordLogin")[0].value;

        axios.post("http://localhost:3000/api/auth/login",
            {
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
            localStorage.setItem("user", JSON.stringify(res.data));
            console.log("Vous êtes connecté!")
            // Mettre la redirection
          })
          .catch((error) => {
            console.log("Problème lors de l'identhification!" + error);
          });
    },

  },
};
</script>

<style scoped>
.loginForm {
  margin-bottom: 2rem;
}
form {
  text-align: center;
  margin: 1rem 0;
}
.formLogin {
  margin-bottom: 1rem;
}
input {
  margin: 1rem 0;
  padding: 5px;
}
.wantSignup {
  text-align: center;
  margin: 4rem 0 3rem 0;
}
a{
    text-decoration: none;
    color: black;
    border: 1px black transparent;
    border-radius: 10px;
    padding: 1rem;
    background: rgb(175, 175, 175);
}
</style>
