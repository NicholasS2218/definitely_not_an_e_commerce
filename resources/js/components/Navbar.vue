<template>
    <nav class="navbar liquid-glass rounded mx-5 mt-2">
        <ul class="px-4">
            <li><router-link to="/">Dashboard <i class="bi bi-house"></i></router-link></li>
            <li><router-link to="/cart">Keranjang <i class="bi bi-basket3"></i></router-link></li>

            <li class="search-li">
                <div class="search-container input-group">
                    <Vueform class="search-form d-flex">
                        <TextElement :columns="{ container: 12, wrapper: 12, default: 12}" class="h-100"
                            name="search" type="text" v-model="query" placeholder="Cari Sparepart"/>
                    </Vueform>
                    <button class="btn btn-primary " @click.prevent="search"><i class="bi bi-search"></i></button>
                </div>
            </li>

            <li><router-link to="/logout">Logout <i class="bi bi-box-arrow-right"></i></router-link></li>
        </ul>
    </nav>
</template>

<script setup>
import { ref } from 'vue'

const query = ref('')

const search = () => {
  console.log('Searching for:', query.value)
  // Later: send query to Laravel backend via Axios
}

defineOptions({ name: 'Navbar' })
</script>

<style scoped>
    .navbar {
        padding: 1rem;
    }

    ul {
        list-style: none;
        display: flex;
        width: 100%;
        gap: 2rem;
        margin: 0;
        padding: 0;
        align-items: center;
    }

    li {
    }

    a {
        color: black;
        text-decoration: none;
    }

    a.active {
        font-weight: bold;
        text-decoration: underline;
    }

    .spacer{
        flex-grow: 1;
    }

    .liquid-glass{
        background: rgba(233, 233, 255, 0.3); /* white with opacity */
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px); /* for Safari */
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    }

    /* Let the search bar expand */
    .search-li {
        flex: 1;
        display: flex;
        justify-content: center;
    }

    /* Search container holds form + button */
    .search-container {
        display: flex;
        align-items: center;
        width: 100%;
    }

    /* Make Vueform fill available space */
    .search-form {
        flex: 1;
        height: 38px;
    }

    /* Force Vueform’s nested grid wrappers to use flex instead */
    .search-form :deep(.vf-row), .search-form :deep(.vf-element), 
    .search-form :deep(.vf-element-layout), .search-form :deep(.vf-element-layout-outer-wrapper),
    .search-form :deep(.vf-element__inner), .search-form :deep(.vf-layout-inner-container),
    .search-form :deep(.vf-layout-inner-wrapper), .search-form :deep(.vf-input-group),
    .search-form :deep(.vf-control) {
        display: flex !important;
        flex: 1 1 0% !important;
        min-width: 0 !important;
    }

    /* Input itself stretches */
    .search-form :deep(input) {
        flex: 1 1 0% !important;
        width: 100% !important;
        min-width: 0 !important;
    }
</style>