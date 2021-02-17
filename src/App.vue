<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  name: "App",
  components: {
    Header,
  },
  data() {
    return {
      isHidden: false,
      user: null,
    };
  },
  async create() {
    const response = await axios.get("user");
    this.user = response.data;
  },
};
</script>
<style lang="scss">
* {
  padding: 0px;
  margin: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0c0b0b;
  width: 100%;
  height: 100%;
  padding-top: 70px;
}
#nav {
  padding: 10px;
  background-color: rgb(19, 49, 19) !important;

  a {
    font-weight: bold;
    color: #939394;
    margin-bottom: 10px;

    &.router-link-exact-active {
      color: #f5f5fa;
      background-color: rgb(19, 49, 19) !important ;
      text-decoration: underline;
    }
  }
  strong {
    font-family: Wide Latin;
    font-size: 29px;
  }
  select {
    width: 120px;
    height: 40px;
    color: #121213;
    border-radius: 4px;
    margin-bottom: 10px;
  }
}
</style>
