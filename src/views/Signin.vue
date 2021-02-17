<template>
  <div class="signin">
    <div class="container">
      <br /><br />
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="exampleInputEmail1">Email address:<br /></label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span
                    class="input-group-text"
                    style="height:39px;"
                    id="basic-addon1"
                    >@</span
                  >
                </div>
                <input
                  type="email"
                  v-model="email"
                  class="form-control"
                  placeholder="Enter email"
                  aria-label="emailaddress"
                  aria-describedby="emailHelp"
                  required
                />
              </div>
              <small id="nameHelp" class="form-text text-muted"></small>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Password:<br /></label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span
                    class="input-group-text"
                    style="height:39px;"
                    id="basic-addon1"
                    ><i class="fas fa-key"></i
                  ></span>
                </div>
                <input
                  type="password"
                  class="form-control"
                  v-model="password"
                  placeholder="Password"
                  aria-label="password"
                  aria-describedby="emailHelp"
                  required
                />
              </div>
            </div>
            <div class="form-group">
              <br />
              <a class="btn btn-success" style="width:160px;" @click="login">
                Sign in
              </a>
            </div>
            <hr />
            <span class="ant-divider-inner-text">OR</span>
            <hr />
            <router-link
              to="/signup"
              class="btn btn-success"
              style="width:160px;"
              >Create account!</router-link
            >
          </form>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Signin",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login: function() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => {
          this.$router.push("/costentry");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style scoped>
#basic-addon1 {
  background-color: #939394;
  color: black !important;
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
}
button {
  border-radius: 2px solid black;
}
</style>
