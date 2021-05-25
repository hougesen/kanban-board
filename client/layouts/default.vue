<template>
  <div>
    <TopNav />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  created() {
    this.$store.dispatch('fetchUserBoards');
  },
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&family=Ubuntu:wght@300;400;700&display=swap');

:root {
  --black: #101010;
  --default-border-radius: 5px;
  --task-color: #fff;
  --column-color: #ededed;
  --pos-color: green;
  --neg-color: red;
}

* {
  box-sizing: border-box;
  line-height: 1.6;
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', sans-serif;

  &::before,
  &::after {
    box-sizing: border-box;
    line-height: 1.6;
    margin: 0;
    padding: 0;
  }
}

html {
  scroll-behavior: smooth;
}

body,
html {
  min-height: 100vh;
  padding-top: 0;
  width: 100%;
}
button {
  cursor: pointer;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Ubuntu', sans-serif;
}
</style>
