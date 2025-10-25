<template>
    <nav class="navbar liquid-glass rounded mx-2 mt-2">
        <ul class="p-3">
            <li><router-link to="/">Profile</router-link></li>
            <li><router-link to="/cart">Order</router-link></li>
            <li><router-link to="/logout">Invoice </router-link></li>
        </ul>
    </nav>
</template>

<script setup>
import { ref } from 'vue'

const query = ref('')

defineOptions({ name: 'Sidebar' })
</script>

<style scoped>
    .navbar {
        padding: 1rem;
        background-color: none;
    }

    ul {
        list-style: none;
        display: block;
        width: 100%;
        gap: 2rem;
        margin: 0;
        padding: 0;
        align-items: center;
    }

    a {
        color: black;
        text-decoration: none;
    }

    a.active {
        font-weight: bold;
        text-decoration: underline;
    }

    .liquid-glass{
        background: rgba(233, 233, 255, 0.6); /* white with opacity */
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px); /* for Safari */
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    }
</style>