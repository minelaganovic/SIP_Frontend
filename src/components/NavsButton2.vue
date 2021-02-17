<template>
  <div class="row" style="margin:0px; padding:0px;min-height:100%; height:100%">
    <div
      class="container"
      style="margin-top:80px"
      :class="{ show: showSidebar }"
    >
      <div class="control">
        <i class="fas fa-angle-double-right" @click="showNav"></i>
      </div>
      <div class="navigation-icons"></div>
      <div class="navigation-links">
        <transition-group name="fade">
          <div v-show="showLink" key="1">
            <router-link to="/user"
              ><i class="far fa-address-card"></i> About me</router-link
            >
          </div>
          <div v-show="showLink" key="2">
            <router-link id="active" to="/costentry"
              ><i id="active" class="fas fa-money-check-alt"></i> Add
              Costs</router-link
            >
          </div>
          <div v-if="admin" v-show="showLink" key="3">
            <router-link to="/statistic"
              ><i class="fas fa-chart-pie"></i> Statistic</router-link
            >
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "NavsButton1",
  data() {
    return {
      showSidebar: false,
      showLink: false,
    };
  },
  async create() {
    const response = await axios.get("user");
    this.user = response.data;
  },
  methods: {
    showNav() {
      if (this.showSidebar) {
        this.showLink = false;
        setTimeout(() => {
          this.showSidebar = false;
        }, 500);
      } else {
        this.showSidebar = true;
        setTimeout(() => {
          this.showLink = true;
        }, 500);
      }
    },
  },
  computed:{
    admin() {
      return this.$store.state.admin;
    },
  }
};
</script>
<style lang="scss" scoped>
p {
  float: left;
  font-size: 20px;
}
#active {
  color: white !important;
  text-decoration: none;
}
#icn {
  height: 29px;
  padding: 3px;
}
.btn {
  background: #224605;
  color: #f5efef;
}
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 70px;
  text-decoration: none;
  padding: 14px;
  min-height: 80px;
  border-bottom-right-radius: 5px;
  background-color: rgba($color: rgb(27, 56, 27), $alpha: 0.8);
  border: solid #fff;
  border-width: 0 1px 0 0;
  z-index: 999;
  transition: all 0.5s ease-in-out;
  .control {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    margin-bottom: 10px;
    i {
      text-decoration: none;
      font-size: 2rem;
      cursor: pointer;
      transition: all 0.5s ease-in-out;
    }
  }
  &.show {
    width: 300px;
    height: 100%;
    .control > i {
      color: #fff;
      transform: rotateZ(-180deg);
    }
    .navigation-icons {
      color: #fff;
      padding-bottom: 20px;
    }
  }
  i {
    text-decoration: none;
  }
  .navigation-icons {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    flex-direction: column;
    width: 50px;
    float: left;
    i {
      text-decoration: none;
      font-size: 2rem;
      padding: 8px 0;
      cursor: pointer;
      transition: all 0.5s ease-in-out;
      &:hover {
        color: #fff;
        text-decoration: none;
      }
    }
  }
  ruter-link {
    text-decoration: none;
  }
  .navigation-links {
    padding-top: 14px;
    text-decoration: none;
    float: left;
    div {
      font-size: 1.35rem;
      text-decoration: none;
      padding-left: 10px;
      padding-top: 9px;
      margin-bottom: 18px;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
  }
}
@mixin nav-childs($values...) {
  @each $var in $values {
    &:nth-child(#{$var}) {
      transition: transform linear calc(0.1s * #{$var}), display 0.5s;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  @include nav-childs(1, 2, 3, 4, 5);
}
.fade-enter,
.fade-leave-to {
  transform: scale(0);
}
@media screen and (max-width: 960px) {
  .card {
    background-color: #939394;
    box-shadow: 4px 4px solid black;
    font-size: 10px;
  }
}
</style>
