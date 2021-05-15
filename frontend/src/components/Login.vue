<template>
  <div class="loginForm">

    <form>
      <div class="formLogin">
        <label>Email :</label> <br />
        <input class="emailLogin" type="text" placeholder="Email" required />
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

      <div class="formLogin">
        <label>Confirmation du mot de passe :</label> <br />
        <input
          class="confirmPasswordLogin"
          type="password"
          placeholder="Confirmation"
          required
        />
        <br />
      </div>

      <button class="btnLogin" type="sumbit">Connexion</button> <br />
      <p class="errorLogin"></p>
    </form>

    <p class="wantSignup">Vous souhaitez vous inscrire ?</p>

    <nav class="navSignup">
      <router-link to="/signup">S'inscrire</router-link>
    </nav>

  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",

  data() {
    return {
      message: "",
    };
  },

  methods: {
    login() {
      const email = document.getElementsByClassName("emailLogin")[0].value;
      const password = document.getElementsByClassName("passwordLogin")[0]
        .value;
      const validPassword = document.getElementsByClassName(
        "confirmPasswordLogin"
      )[0].value;
      console.log(validPassword),
        axios
          .post(
            "http://localhost:3000/api/auth/login",
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
.navSignup {
  text-align: center;
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
