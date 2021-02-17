<template>
  <div
    class="row"
    style="padding-top:40px;height:100%; margin:0px;padding-left:0px padding-right:0px"
  >
    <NavsButton2 />
    <div class="col" style="padding:0px; margin:0px">
      <Table />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import NavsButton2 from "@/components/NavsButton2.vue";
import Table from "@/components/Table.vue";
export default {
  name: "Costentry",
  components: {
    Table,
    NavsButton2,
    Chart,
  },
  data() {
    return {
      isHidden: false,
      user: null,
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
};
</script>
<style lang="scss" scoped>
#active {
  color: white !important;
}
#icn {
  height: 29px;
  padding: 3px;
}
</style>
