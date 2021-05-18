<template>
    <div class="createPost">
        <h2>Quelque chose à nous raconter ?</h2>
        <div class="newPost">
            <form @submit.prevent="createPost">

                <div class="formNewPost">
                    <label for="content"></label>
                    <textarea name="content" class="contentNewPost" type="text" placeholder="Quoi de beau ?" required v-model="content"></textarea> <br>
                </div>

                <div class="formNewPost">
                    <label for="image">
                        <input class="imageNewPost" type="file" name="image" ref="image" v-on:change="upload"> <br>
                    </label>
                </div>

                <button type="submit">Publier</button>

            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'CreatePost',
    data() {
        return {
            content: "",
            image: null
        };
    },
    methods: {
        upload: function(e) 
        {
           var files = e.target.files || e.dataTransfer.files;
           if (files.length <= 0) this.createImage(files[0]);
        },
        createImage: function(file) 
        {
            let reader = new FileReader();
            let vm = this; // this correspond à l'objet Vue

            reader.onload = (e) => {
                vm.image = e.target.result;
            };

            reader.readAsDataURL(file);
        },
        createPost: function() 
        {
            const token = localStorage.getItem("token");
           const data = new FormData();
                        
           data.append("content", this.content);
           data.append("image", "");
            
                
            axios.post("http://localhost:3000/api/post/create", data, {
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(res => 
            {
                    if (res) 
                    {
                        this.$router.reload();
                    }
            })
            .catch(error => 
            {
                console.log(JSON.stringify(error))
            });
        }
    }
}

</script>

<style scoped>
.createPost{
    text-align: center;
    border: 1px solid black;
    border-radius: 70px;
    width: 40%;
    margin: auto;
    padding: 1rem;
    margin-bottom: 2rem;
}
.formNewPost{
    margin: 2rem 0;
}
.contentNewPost{
    padding: 2rem;
    border: 1px solid black;
    border-radius: 10px;
}
</style>