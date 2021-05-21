<template>
    <div class="header">
        <img src="../assets/icon.png" alt="Logo de Groupomania">
        <router-link to="/profile">
            <p>Votre profil</p>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'HeaderLogged',
    }
</script>

<style scoped>
.header{
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
    color: black;
    font-weight: bold;
}
</style>