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
          v-model = "email"
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
          v-model = "password"
        />
        <br />
      </div>

      <button class="btnLogin" type="submit">Connexion</button> <br />
      <p class="errorLogin"></p>
    </form>

      <router-link to="/signup" class="signupNav">
        <div class="wantSignup">
          Inscrivez-vous ici !
        </div>
      </router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",

  data() {
    return {
      token: "",
      email: "",
      password: "",
      userId: "",
    };
  },

  methods: {

    login: function() {

      const email = this.email;
      const password = this.password;

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
        {
          localStorage.setItem("token", (res.data.token));
          localStorage.setItem("id", res.data.userId);
        }
        this.$router.push('/wall');
      })
      .catch((error) => {
        console.log("Problème lors de l'identhification!" + error);
      });

    },
  }
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
  margin: auto;
  border: 1px solid black;
  border-radius: 10px;
  width: 15%;
  padding: 10px;
  box-shadow: 0.3rem 0.5rem 0.5rem black;
}
.btnLogin{
    text-decoration: none;
    color: black;
    border: 1px black transparent;
    border-radius: 10px;
    padding: 1rem;
    background: rgb(175, 175, 175);
    margin-bottom: 3rem;
}
.signupNav{
    text-decoration: none;
    color: black;
}
</style>
