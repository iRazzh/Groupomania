<template>
    <div class="searchOnePost">

        <header class="header">
            <router-link to="/wall">
                <img src="../assets/icon_modify.png" alt="Logo de Groupomania">
            </router-link>
        </header>
    
        <div class="posts">
            <article class="post" v-if="post !== undefined">
                <div class="post-content" v-html="post.content"></div>
                <div class="post-image"><img :src="post.image"></div>

                    <label class="titleModify" for="modify">Modifier le contenu du post : </label> <br>
                    <textarea class="contentPost" name="modify" placeholder="Une modification ?" v-model="content"></textarea> <br>
                    <button class="modifyPost" @click="modifyPost">Modifier</button>

                <div class="allComments">
                    <h3 class="titleComments">Commentaires :</h3>
                    <div class="comments" v-for="comment in comments" :key="comment">
                        {{comment.content}}
                        <div>
                            <button class="deleteComment" @click="deleteComment(comment.id)"></button>
                        </div>
                    </div>
                </div>

                <button class="deletePost" @click="deletePost">Supprimer la publication</button>
            </article>      
        </div>

        <div class="createComments">
            <form class="formComment" @submit.prevent="createComment">

                <div class="formNewComments">
                    <label class="titleNewComment" for="newComment">Un commentaire ?</label> <br>
                    <textarea name="newComment" class="contentNewComment" placeholder="Un commentaire?" required></textarea> <br>
                    <button class="addComment" type="submit">Commenter</button>
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
            content: "",
            modifyContent: "",
        }
    },

    mounted() {
        this.getOnePost();
        this.getAllComments();

    },

    methods: {

        getOnePost() {
            const idPost = this.$route.params.id
            const token = localStorage.getItem("token")
            axios.get("http://localhost:3000/api/post/" + idPost, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                this.post = res.data[0];
            })
            .catch(error => {
                console.log("Le post n'a pas pu être récupéré /" + error)
            })
        },

        createComment() {
            const content = document.getElementsByClassName("contentNewComment")[0].value;
            const idPost = this.$route.params.id
            const token = localStorage.getItem("token");

            axios.post(`http://localhost:3000/api/comment/${idPost}/comment`, 
            {
                content,
            },

            {
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${token}`
                }
            }
            )
            .then(res => {
                this.comments = res.data;
                window.location.reload()
            })
            .catch(error => {
                console.log("Le commentaire n'a pas pu être crée /" + error)
            })
        },

        deleteComment(idComment) {
            const token = localStorage.getItem('token')
            axios.delete(`http://localhost:3000/api/comment/comment/${idComment}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                if (res) {
                    window.location.reload()
                }
            })
            .catch(error => {
                console.log("Le commentaire n'a pas pu être supprimé /" + error)
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
            .catch(error => {
                console.log("L'accès à tous les commentaires n'a pas pu se faire /" + error)
            })
        },

        deletePost() {
            const token = localStorage.getItem('token')
            const idPost = this.$route.params.id
            console.log(idPost)

            axios.delete("http://localhost:3000/api/post/" + idPost, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {

                if (res) {
                    this.$router.push('/wall'); 
                }

            })
            .catch(error => {
                console.log("Le post n'a pas pu être supprimé /" + error )
            }) 
        },

        modifyPost() {
            const idPost = this.$route.params.id;
            const token = localStorage.getItem('token');
            const content = document.getElementsByClassName("contentPost")[0].value;
            console.log(content)

            axios.put("http://localhost:3000/api/post/" + idPost, {
                idPost,
                content
            },

            {
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(res => {
                if (res) {
                    window.location.reload()
                }
            })
            .catch(error => {
                console.log("Le post n'a pas pu être modifié /" + error)
            })
        }
    }
}
</script>

<style scoped>
.header{
    text-align: center;
    margin-bottom: 2rem;
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
    border: 1px solid rgb(119, 119, 119);
    border-radius: 25px;
    width: 90%;
    margin: auto;
    height: auto;
    margin-bottom: 5rem;
}
.post-content{
    background-color: #FFF;
    padding: 3rem 1rem;
    margin-bottom: 10px;
    text-align: initial;
    border-radius: 25px 25px 0 0;
}
.post-image{
    margin-bottom: 10px;
}
.post-image img{
    width: 45%;
}
.comments{
    background-color: #FFF;
    border: 1px transparent black;
    border-radius: 10px;
    width: 88%;
    margin: auto;
    margin-bottom: 15px;
    text-align: initial;
    padding: 15px;
    display: flex;
    justify-content: space-between;
}
.titleComments{
    width: 90%;
    margin: auto;
    text-align: initial;
    padding: 15px;
}
.deleteComment{
    padding: 7px;
    background-color: white;
    border-radius: 50%;
    cursor: pointer;
}
.deleteComment:hover{
    background-color: rgba(239, 68, 68);
}
.titleModify, .contentPost{
    margin-bottom: 15px;
}
.contentPost{
    padding: 26px;
    margin-top: 15px;
    border-radius: 19px;
}
.modifyPost, .addComment{
    padding: 6px;
    width: 20%;
    border-radius: 15px;
    cursor: pointer;
}
.modifyPost:hover, .addComment:hover{
    background-color: #b7ebbb;
}
.deletePost{
    margin-bottom: 1rem;
    padding: 7px;
    background: rgba(239, 68, 68);
    border-radius: 10px;
    cursor: pointer;
    color: white;
}
.titleModify, .titleNewComment{
    font-weight: bold;
}
.formNewComments{
    border: 1px solid rgb(119, 119, 119);
    border-radius: 10px;
    width: 35%;
    margin: auto;
    margin-bottom: 2rem;
    padding: 1rem;
}
.contentNewComment{
    margin: 1rem 0;
    padding: 26px;
    border-radius: 19px;
}
</style>
