<template>
    <nav class="navbar liquid-glass rounded mx-5 mt-2" v-outside="closeDropdown">
        <ul class="px-4">
            <li class="dropdown"
                @mouseenter="canHover && openDropdown"
                @mouseleave="canHover && closeDropdown"
            >
                <a href="#" @click.prevent="toggleDropdown">
                    Part Shop <i :class="dropdownOpen ? 'bi bi-chevron-up' : 'bi bi-chevron-down'"></i>
                </a>
                <ul v-if="dropdownOpen" class="dropdown-menu">
                    <li><router-link to="/" @click="closeDropdown">Beli Produk <i class="bi bi-cart"></i></router-link></li>
                    <li><router-link to="/cart" @click="closeDropdown">Keranjang <i class="bi bi-basket3"></i></router-link></li>
                    <li><router-link to="/favorite" @click="closeDropdown">Favorit <i class="bi bi-heart"></i></router-link></li>
                </ul>
            </li>
            <li class="spacer"></li>
            <li><router-link to="/profile">Profile <i class="bi bi-person"></i></router-link></li>
        </ul>
    </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
        dropdownOpen: false,
    }
  },
  methods: {
    toggleDropdown(){
        this.dropdownOpen = !this.dropdownOpen;
    },
    openDropdown(){
        this.dropdownOpen = true;
    },
    closeDropdown(){
        this.dropdownOpen = false;
    }
  },
  directives: {
    outside: {
      beforeMount(el, binding) {
        el.clickOutsideEvent = event => {
          if (!(el === event.target || el.contains(event.target))) {
            binding.value();
          }
        };
        document.body.addEventListener('click', el.clickOutsideEvent)
      },
      unmounted(el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
      }
    }
  }
}
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
        background: rgba(255, 255, 255, 0.4); /* white with opacity */
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px); /* for Safari */
        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    }

    .dropdown-menu {
        display: block;
        position: absolute;
        top: 100%;
        left: 0;
        background: white;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        padding: 0.5rem 0;
        min-width: 150px;
        z-index: 1000;
    }

    .dropdown-menu li {
        padding: 0;
    }

    .dropdown-menu li a {
        display: block;
        padding: 0.5rem 1rem;
        color: black;
        text-decoration: none;
    }

    .dropdown-menu li a:hover {
        background-color: #f0f0f0;
    }

    .arrow {
        margin-left: 0.5rem;
        font-size: 0.7rem;
        transition: transform 0.3s ease;
    }

    .arrow.open {
        transform: rotate(180deg);
    }
</style>