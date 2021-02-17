<template>
  <div class="signup">
    <br /><br />
    <div class="container">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm">
          
            <div class="form-group">
              <label for="exampleInputFirstname">First name:</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span
                    class="input-group-text"
                    style="height: 40px"
                    id="basic-addon1"
                    ><i class="fas fa-user"></i
                  ></span>
                </div>
                <input
                  type="text"
                  v-model="first_name"
                  class="form-control"
                  placeholder="Firstname"
                  aria-describedby="nameHelp"
                  required
                />
              </div>
            </div>
            <div class="form-group">
              <label for="exampleInputLastname">Last name:</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span
                    class="input-group-text"
                    style="height: 40px"
                    id="basic-addon1"
                    ><i class="fas fa-user"></i
                  ></span>
                </div>
                <input
                  type="text"
                  v-model="last_name"
                  class="form-control"
                  placeholder="Lastname"
                  aria-describedby="nameHelp"
                  required
                />
              </div>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">E-mail:</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">@</span>
                </div>
                <input
                  type="email"
                  v-model="email"
                  class="form-control"
                  placeholder="Enteremail"
                  aria-label="emailaddress"
                  aria-describedby="emailHelp"
                  required
                />
              </div>
              <small id="emailHelp" class="form-text text-muted"></small>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Password:</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span
                    class="input-group-text"
                    style="height: 40px"
                    id="basic-addon1"
                    ><i class="fas fa-key"></i
                  ></span>
                </div>
                <input
                  type="password"
                  v-model="password1"
                  class="form-control"
                  placeholder="password"
                  aria-label="password"
                  required
                />
              </div>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Confirm password:</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span
                    class="input-group-text"
                    style="height: 40px"
                    id="basic-addon1"
                    ><i class="fas fa-key"></i
                  ></span>
                </div>
                <input
                  type="password"
                  v-model="password_confirm"
                  class="form-control"
                  placeholder="password"
                  aria-label="password"
                  aria-describedby="password"
                  required
                />
              </div>
            </div>
            <br />
            <button
              @click="register"
              class="btn btn-success"
              style="width: 120px"
            >
              Sign up
            </button>
          
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Signup",
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password1: "",
      password_confirm: "",
    };
  },
  methods: {
    register: function() {
      let first_name = this.first_name;
      let last_name = this.last_name;
      let email = this.email;
      let password = this.password1;
      let password_confirm = this.password_confirm;

      if (password === password_confirm) {
        this.$store
          .dispatch("register", {
            first_name,
            last_name,
            email,
            password,
          })
          .then(() => {
            alert("Successful registration. Please check your email and confirm your registration via email. You can then log in.");
            this.$router.push("/signin");
          })
          .catch((err) => console.log(err));
      } else {
        alert("Password isn't equal to confirmed password");
      }
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
</style>
