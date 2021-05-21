<template>
    <div class="searchOnePost">
        <header class="header">
            <router-link to="/wall">
                <img src="../assets/icon.png" alt="Logo de Groupomania">
                <p>Votre mur</p>
            </router-link>
        </header>
    
        <div class="posts">
            <h3>Vous avez choisi ce post</h3>
            <article class="post" v-if="post !== undefined">
                <div class="post-content"> {{ post.content }} </div>
                <div class="post-image"><img :src="post.image"></div>
                <div class="comments" v-for="comment in comments" :key="comment">
                    <div class="comment-content"> {{comment.content}} </div>
                </div>
            </article>      
        </div>

        <div class="createComments">
            <h3>Commentaire</h3>
            <form class="formComment" @submit.prevent="createComment">

                <div class="formNewComments">
                    <label for="newComment">Un commentaire ?</label> <br>
                    <textarea name="newComment" class="contentNewComment" placeholder="Un commentaire?" required v-model="content"></textarea> <br>
                    <button type="submit">Commenter !</button>
                </div>

            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'SearchOnePost',

    data() {
        return {
            post: [],
            comments: [],
        }
    },

    mounted() {
        this.getOnePost();
        this.getAllComments();

    },

    methods: {
        getOnePost(){

            const id = this.$route.params.id
            console.log(this.$route.params.id)

            const token = localStorage.getItem("token")
            axios.get("http://localhost:3000/api/post/" + id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                this.post = res.data[0];
            })
        },
        createComment()
        {
            const content = document.getElementsByClassName("contentNewComment")[0].value;
            console.log(content)
            const userId = localStorage.getItem('userId')
            console.log(userId)
            const postId = parseInt(this.id_post);
            console.log(postId)
            const token = localStorage.getItem("token");

            axios.post("http://localhost:3000/api/comment/" /* + idPost/comment */, 
            {
                content,
                userId
            },
            {
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(res => 
            {
                    if (res) 
                    {
                        window.location.reload()
                    }
            })
            .catch(error => 
            {
                console.log( error )
            });
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
