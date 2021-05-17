<template>
    <div class="sign">

        <Header />

        <Signup />

        <Footer />
        
    </div>
</template>

<script>
// @ is an alias to /src

import Header from "@/components/Header.vue"
import Signup from "@/components/Signup.vue"
import Footer from "@/components/Footer.vue"

export default {
  name: "Sign",
  components: { Header, Signup, Footer },
}

</script>
