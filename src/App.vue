<template>
  <nav>
    |
    <router-link to="/about">Registrarme</router-link> | 
    <router-link to="login">login</router-link> | 
  </nav>
  
  <router-view/>
  
</template>

<style lang="scss">
//   @import 'bootstrap/dist/css/bootstrap.min.css';
// @import 'bootstrap-icons/font/bootstrap-icons.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
