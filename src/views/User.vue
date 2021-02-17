<template>
  <div class="row" style="margin:0px; padding:0px;min-height:100%; height:100%">
    <NavsButton1 />
    <div class="col">
      <div
        class="card"
        style="margin-top: 15px;margin-left: 60px;background: #939394;"
      >
        <div class="card-body">
          <img id="img1" class="card-img-top" src="@/assets/prifil.jpg" />
          <p class="card-title" v-if="user">
            Welcome to your profile, {{ first_name }} {{ last_name }}
          </p>
          <p>{{ note }}</p>
          <hr />
          <h4 class="card-title">Update your information:</h4>
          <div class="userdata-form">
            <b id="text" class="input-title">First name:</b>
            <input
              type="text"
              v-model="first_name"
              class="form-control mb-2"
              placeholder="firstname"
            />
            <b id="text" class="input-title">Last name:</b>
            <input
              type="text"
              v-model="last_name"
              class="form-control mb-2"
              placeholder="lastname"
            />
            <b id="text" class="input-title">Note:</b>
            <textarea
              type="text"
              class="form-control"
              cols="20"
              rows="4"
              v-model="note"
              placeholder="........"
            ></textarea
            ><br /><input
              type="submit"
              class="dugme"
              value="Save changes"
              @click="update"
            /><br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import NavsButton1 from "@/components/NavsButton1.vue";
export default {
  name: "User",
  components: {
    NavsButton1,
  },
  data() {
    return {
      isHidden: false,
      user: true,
      first_name: "",
      last_name: "",
      note: "",
    };
  },
  methods: {
    update: function() {
      let firstname = this.first_name;
      let lastname = this.last_name;
      let note = this.note;

      this.$store
        .dispatch("update", {
          firstname,
          lastname,
          note,
        })
        .then(() => {
          alert("Update success!");
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    this.first_name = this.firstNameDatabase;
    this.last_name = this.lastNameDatabase;
    this.note = this.noteDatabase;
  },
  computed: {
    firstNameDatabase() {
      return this.$store.state.firstname;
    },
    lastNameDatabase() {
      return this.$store.state.lastname;
    },
    noteDatabase() {
      return this.$store.state.note;
    },
  },
};
</script>
<style lang="scss">
.dugme {
  float: right;
  width: 140px;
  height: 50px;
  border: 1px solid;
  color: white;
  background-color: rgb(10, 43, 10);
  border-radius: 3px solid;
}
p {
  float: center;
  font-size: 20px;
}
#img1 {
  margin-top: 20px;
  height: 180px;
  width: 250px;
  margin-bottom: 15px;
  float: center;
  border-radius: 7px;
}
#text {
  float: left;
  font-size: 20px;
}
.card body {
  border: 2px solid black;
  background-color: #939394;
}

@media screen and (max-width: 960px) {
  .card {
    background-color: #939394;
    box-shadow: 4px 4px solid black;
    font-size: 10px;
  }
}
</style>
