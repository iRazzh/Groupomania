<template>
    <div class="profile">
        <header class="header">
            <router-link to="/wall">
                <img src="../assets/icon.png" alt="Logo de Groupomania">
                <p>Votre mur</p>
            </router-link>
        </header>

        <main >
            <h2>Bonjour, </h2>
            <div class="userName"></div>

            <button class="delete" @click="deleteProfile">Supprimer le profil</button>
        </main>
    </div>
</template>

<script>
import axios from 'axios'

export default {

    name: 'Profile',

    data() {
        return {
            token: "",
            userId: "",
            name: "",
        }
    },

    mounted(){
        const name = localStorage.getItem('name')
        document.getElementsByClassName("userName")[0].innerHTML = name
    },

    methods: {
        deleteProfile() {
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('userId')
        
        axios.delete('http://localhost:3000/api/auth/delete/' + id, {
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(res => {

                if (res) {
                    localStorage.removeItem('token');
                    this.$router.push('/signup'); 
                }

            })
            .catch(error => {
                console.log( error )
            }
            )
        }
    }
}

</script>

<style scoped>
.header, main{
    text-align: center;
}

img{
    width: 18%;
}
p{
    font-size: 20px;
    margin: 0;
    margin-bottom: 3rem;
}
a{
    text-decoration: none;
    color: red;
}
</style>