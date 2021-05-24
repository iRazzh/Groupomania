<template>
    <div class="header">
        <img src="../assets/icon_modify.png" alt="Logo de Groupomania">
        <router-link to="/profile">
            <p>Votre profil</p>
        </router-link>
        <router-link to="/home">
            <button class="disconnect" @click="disconnect">Se déconnecter</button>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'HeaderLogged',

    methods: {
        disconnect() {
            localStorage.clear()
        }
    }
}

    
</script>

<style scoped>
.header{
    text-align: center;
}

img{
    width: 18%;
    margin-bottom: 1rem;
}
p{
    font-size: 20px;
    margin: 0;
    margin-bottom: 2rem;
}
.disconnect{
    font-weight: initial;
    font-size: 15px;
    margin-bottom: 2rem;
}
a{
    text-decoration: none;
    color: black;
    font-weight: bold;
}
</style>