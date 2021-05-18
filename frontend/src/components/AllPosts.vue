  
<template>
    <div class="posts">
        <h3>L'actualité de vos collègues</h3>
        <article class="post" v-for="post in posts" :key="post.id">
            <div class="allPost">
            </div>
            <div class="post-content"></div>
        </article>
    </div>
</template>



<script>
import axios from 'axios';

export default {
    name: 'AllPosts',

    data() {
        return {
            posts: [],
        }
    },

    mounted() {
        if(localStorage.user != undefined) {
            this.getAllPost();
        }
    },

    methods: {
        getAllPost() {
            axios.get("http://localhost:3000/api/post/all", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer' + window.localStorage.getItem('token')
                }
            })
            .then(res => {
                this.posts = res.data;
            })
        }
    }
}
</script>


<style scoped>
.posts{
    text-align: center;
}
</style>