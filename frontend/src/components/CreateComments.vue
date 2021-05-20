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
            content: "",
        };
    },

    methods: {
        createComment: function()
        {
            const formComment = document.getElementsByClassName("formComment")[0];
            const token = localStorage.getItem("token");
            console.log(formComment)

            axios.post("http://localhost:3000/api/comment/" /* + userId/comment */, {
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