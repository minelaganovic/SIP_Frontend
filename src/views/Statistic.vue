<template>
  <div class="col" style="margin:0px; padding:0px;height:100%">
    <div class="col">
      <NavsButton3 /><br>
      <h1>Statistics Cost</h1>
      <Table2 />
      <Chart />
    </div>
  </div>
</template>
<script>
import Table2 from "@/components/Table2.vue";
import Chart from "@/components/Chart.vue";
import NavsButton3 from "@/components/NavsButton3.vue";
export default {
  name: "Statistic",
  components: {
    NavsButton3,
    Table2,
    Chart,
  },
  data() {
    return {
      isHidden: false,
    };
  },
  beforeMount(){
    if(!this.$store.state.admin){
      this.$router.push("/costentry");
    }
  }
};
</script>
<style lang="scss" scoped></style>
