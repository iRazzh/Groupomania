<template>
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
</template>

<script>
import axios from 'axios'

export default {

    name: 'CreateComments',

    data() {
        return {
            comments: [],
            userId: "",
        };
    },

    methods: {
        createComment: function()
        {
            const content = document.getElementsByClassName("contentNewComment")[0].value;
            console.log(content)
            // const postId = parseInt(this.$route.params.id);
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
        }
    }
}
</script>

<style scoped>

</style>