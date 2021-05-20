  
<template>
    <div class="posts">
        <h3>L'actualité de vos collègues</h3>
        <article class="post" v-for="post in posts" :key="post.id">
            <div class="allPost">
                <div class="post-content"> {{ post.content }} </div>
                <div class="post-image"><img :src="post.image"></div>
                <div class="post-comments"></div>
            </div>
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
            this.getAllPost();
    },

    methods: {
        getAllPost() {
            const token = localStorage.getItem("token")
            axios.get("http://localhost:3000/api/post/all", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
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
    border: 1px solid black;
    border-radius: 40px;
    width: 65%;
    margin: auto;
}
.post{
    border: 1px solid black;
    width: 90%;
    margin: auto;
    height: auto;
    margin-bottom: 1rem;
}
.post-content{
    background: rgb(187, 187, 187);
    padding: 1rem 0;
    margin-bottom: 10px;
}
img{
    border-radius: 10px;
}
</style>