<template>
  <div>
    <Nav />
    <div class="d-flex">
      <!-- <div class="side-container pt-5">
        <div class="sidebar">
          <Sidebar />
        </div>
      </div> -->
      <div class="content pt-5">
        <div class="container">
          <router-view></router-view> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Nav from './components/Navbar.vue';
    //import Sidebar from './components/Sidebar.vue';
    export default {
        name: 'App',
        components: {
            Nav,
            // Sidebar,
        }
    }
</script>

<style scoped>
  .side-container {
    width: 15%;
    display: flex;
    height: calc(100vh - 60px); /* adjust based on Nav height */
  }

  /* Sidebar styles */
  .sidebar {
    padding: 1rem;
    box-sizing: border-box;
    overflow-y: auto;
  }

  /* Main content area, change width if using sidebar */
  .content {
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    overflow-y: auto;
  }
</style>