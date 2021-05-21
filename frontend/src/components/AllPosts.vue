<template>
    <div class="posts">
        <h3>L'actualité de vos collègues</h3>
        <article class="post" v-for="post in posts" :key="post.id">
                <div class="post-content"> {{ post.content }} </div>
                <div class="post-image"><img :src="post.image"></div>
                <div class="comments" v-for="comment in comments" :key="comment.id">
                    <div class="comment-content"> {{comment.content}} </div>
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
            comments: [],
        }
    },

    mounted() {
            this.getAllPost();
            this.getAllComments();
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
        },
        getAllComments() {
            const token = localStorage.getItem("token")
            axios.get("http://localhost:3000/api/comment/all", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                this.comments = res.data;
            })
        },
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