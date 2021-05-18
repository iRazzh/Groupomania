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
    </form>

      <router-link to="/" class="loginNav">
        <div class="wantLogin">
          Connectez-vous ici !
        </div>
      </router-link>

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
      password_confirmation: "",
    };
  },

  methods: {

    signup() {
      const name = document.getElementsByClassName("nameSignup")[0].value;
      const email = document.getElementsByClassName("emailSignup")[0].value;
      const password = document.getElementsByClassName("passwordSignup")[0].value;
      const password_confirmation = document.getElementsByClassName("verifPasswordSignup")[0].value;
      if (password === password_confirmation && password.length > 0) {
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
            localStorage.setItem("user", JSON.stringify(res.data.user))
            console.log(localStorage)
            this.$router.push('/wall')
            }) 

        .catch((error) => {console.log("Problème lors de l'identhification!" + error);
          });
      } else if (password !== password_confirmation) {
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
  margin: auto;
  border: 1px solid black;
  border-radius: 10px;
  width: 15%;
  padding: 10px;
  box-shadow: 0.3rem 0.5rem 0.5rem black;
}
.btnSignup {
    text-decoration: none;
    color: black;
    border: 1px black transparent;
    border-radius: 10px;
    padding: 1rem;
    background: rgb(175, 175, 175);
    margin-bottom: 3rem;
}
.loginNav{
    text-decoration: none;
    color: black;
}
</style>
