<template>
  <nav id="nav" class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img
          src="@/assets/logoo.png"
          height="44"
          width="47"
          class="d-inline-block align-top"
          alt=""
        />
        <strong>COSTAPP</strong>
      </a>
      <button
        class="navbar-toggler toggler-light bg-secondary"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo02"
        aria-controls="#navbarTogglerDemo02"
        aria-expanded="true"
        aria-label="Toggle navigation"
        @click="showMe = !showMe"
      >
        <transition name="toggle">
          <span class="navbar-toggler-icon" v-if="showMe"></span>
          <span v-else class="toggler-icon"><b>X</b></span>
        </transition>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link active">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="!logged" to="/signin" class="btn btn-light me-2" id="prijaval"
              >Sign in</router-link
            >
          </li>
          <li class="nav-item">
            <a  v-if="logged" class="btn btn-light me-2" id="prijaval" @click="logout">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  name: "Header",
  data() {
    return {
      isHidden: false,
      user: null,
      showMe: true,
    };
  },
  methods: {
    logout: function() {
      this.$store
        .dispatch("logout")
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    },
  },
  components: {
    Header,
  },
  computed:{
    logged() {
      return this.$store.state.token;
    },
  }
};
</script>
<style lang="scss">
#navbarTogglerDemo02 {
  padding-top: 5px;
  margin-left: 5px;
  padding-left: 44%;
  font-size: 20px;
}
#prijaval {
  margin-left: 9px;
  width: 120px;
  height: 40px;
}
</style>
