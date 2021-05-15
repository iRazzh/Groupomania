<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<style>
body{
  margin: 0;
  padding: 0;
  }
  
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: black;
}

a {
  color: #2c3e50;
  font-weight: bold;
}
a.router-link-exact-active {
  color: #42b983;
}
</style>
