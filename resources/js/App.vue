<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/products">Products</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    
    <router-view></router-view>  <!-- Pages show here -->
  </div>
</template>

<script>
    export default {
    name: 'App'
    }
</script>

<style>
    body {
        background-color: black;
    }
    nav {
    padding: 20px;
    background: #f0f0f0;
    }
    nav a {
    margin: 0 10px;
    text-decoration: none;
    }
</style>