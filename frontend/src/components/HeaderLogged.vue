<template>
    <div class="header">
        <router-link to="/"><img src="../assets/icon.png" alt="Logo de Groupomania"></router-link>
        <p>N'hésitez plus, partagez vos plus beaux souvenirs !</p>
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
</style>