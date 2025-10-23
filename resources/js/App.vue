<template>
  <div>
    <Nav />
    
    <router-view></router-view>  <!-- Pages show here -->
  </div>
</template>

<script>
    import Nav from './components/Navbar.vue';
    export default {
        name: 'App',
        components: {
            Nav,
        }
    }
</script>

<style>
</style>