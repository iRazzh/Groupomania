<template>
    <div class="searchOnePost">
        <header class="header">
            <router-link to="/wall">
                <img src="../assets/icon.png" alt="Logo de Groupomania">
            </router-link>
        </header>
    
        <div class="posts">
            <article class="post" v-if="post !== undefined">
                <div class="post-content"> {{ post.content }} </div>
                <div class="post-image"><img :src="post.image"></div>
                <div class="allComments">
                    <h3 class="titleComments">Commentaires :</h3>
                    <div class="comments" v-for="comment in comments" :key="comment">
                        {{comment.content}} 
                    </div>
                </div>
            </article>      
        </div>

        <div class="createComments">
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
    border-radius: 10px;
}
.searchOnePost{
    text-align: center;
}
.posts{
    text-align: center;
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
    background-color: rgba(209, 213, 219);
    padding: 1rem 0;
    margin-bottom: 10px;
}
.post-image{
    margin-bottom: 10px;
}
.post-image img{
    width: 50%;
}
.comments{
    background-color: rgba(209, 213, 219);
    border: 1px transparent black;
    border-radius: 10px;
    width: 88%;
    margin: auto;
    margin-bottom: 15px;
    text-align: initial;
    padding: 15px;
}
.titleComments{
    width: 88%;
    margin: auto;
    text-align: initial;
    padding: 15px;
}
</style>
