<template>
    <div class="createComments">
        <h3>Je suis là </h3>
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
        createComments: function()
        {
            axios.post("http://localhost:3000/api/")
        }
    }
}
</script>

<style scoped>

</style>