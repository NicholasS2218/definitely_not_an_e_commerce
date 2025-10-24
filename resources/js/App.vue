<template>
  <div>
    <Nav />
    
    <div class="container pt-5">
      <router-view></router-view>  <!-- Pages show here -->
    </div>
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