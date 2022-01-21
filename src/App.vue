<template>
  <nav>
    <ul class="nav nav-tabs justify-content-center">
      <li class="nav-item">
        <!-- <a class="nav-link active" aria-current="page" href="#">總覽</a> -->
        <router-link class="nav-link" :class="{'active':visibility == 'allData'}" @click="visibility = 'allData'" to="/allData">總覽</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :class="{'active':visibility == 'account'}" @click="visibility = 'account'" to="/account">記帳</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" :class="{'active':visibility == 'report'}" @click="visibility = 'report'" to="/report">報表</router-link>
      </li>
    </ul>

    {{  visibility }}
  </nav>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <router-view/>
</template>

<script>
import { ref } from 'vue';

export default {
  name: "app",
  setup() {
    const visibility = ref('allData');
    // const visibilityChange = computed(() = > )
    return {
      visibility,
    }
  }
}

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
