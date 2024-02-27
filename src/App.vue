<script setup>
import { RouterView } from "vue-router";
import Sidebar from "./components/side-bar.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap";
</script>

<template>
  <div class="app">
    <notify />
    <div class="sidebars">
      <Sidebar v-if="!isSignInScreen" style="width: 5%" />
    </div>
    <!-- Sidebar -->
    <!-- Content -->
    <div class="content">
      <router-view style="width: 100%" />
    </div>
  </div>
</template>

<style lang="scss">
.sidebars {
  position: relative;
  z-index: 999;
  transition: width 0.3s ease-out;
}


@media (max-width: 1024px) {
  .app {
    flex-direction: column;
  }

  .sidebars {
    width: 100%;
  }

  .content {
    padding-left: 7%;
  }
}

.content {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  transition: margin-left 0.3s ease-out, width 0.3s ease-out;
}

.content::-webkit-scrollbar {
  display: none;
}

.content {
  position: relative;
  width: 100%;
  transition: margin-left 0.3s ease-out, width 0.3s ease-out;
}

:root {
 
  --grey2: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 250px;

  --blacks: #001514;
  --grey1: #ececec;
  --white: #fbfffe;
  --blue: #00bbff;
  --blue-alt: #5ed4ff;
  --black-trans: rgba(0, 21, 20, 0.6)
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}

body {
  background: var(--light);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app {
  display: flex;
  justify-content: space-between;

  main {
    position: relative;
    flex: 1 1 0;
    padding: 2rem;

    @media (max-width: 1024px) {
      padding-left: 10%;
    }
  }
}
</style>
<script>
import notify from './views/notify.vue';

export default {
   components: {
    notify
  },
  computed: {
    isSignInScreen() {
      return this.$route.path === "/login";
    },
  },
};
</script>
