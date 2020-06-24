<template>
  <div>
    <b-navbar type="is-warning">
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">Password Manager</b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item :to="{ path: '/' }" :active="path  == '/'">Home</b-navbar-item>
      </template>
    </b-navbar>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      path: this.$route && this.$route.path
    };
  },
  watch: {
    $route(route) {
      this.path = route.path;
    }
  }
};
</script>
<style lang="scss">
.page {
  padding: 20px;
}
button {
  margin-right: 10px;
}
.center {
  text-align: center;
}
h1 {
  font-size: 32px !important;
}
</style>
