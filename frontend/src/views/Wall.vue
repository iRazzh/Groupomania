<template>
    <div class="wall">

        <HeaderLogged />
        <CreatePost />
        <AllPosts />
        <CreateComments />
        <Footer />
        
    </div>
</template>

<script>
// @ is an alias to /src

import HeaderLogged from "@/components/HeaderLogged.vue"
import CreatePost from "@/components/CreatePost.vue"
import CreateComments from "@/components/CreateComments.vue"
import AllPosts from "@/components/AllPosts.vue"
import Footer from "@/components/Footer.vue"

export default {
  name: "Wall",
  components: { HeaderLogged, CreatePost, AllPosts, CreateComments, Footer },
}

</script>