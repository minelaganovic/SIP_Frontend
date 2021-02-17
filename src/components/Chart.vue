<template>
  <div class="container">
    <column-chart :data="ChartData"></column-chart>
    <h4>Statistics for the given categories.</h4>
  </div>
</template>
<script>
export default {
  name: "Chart",
  data() {
    return {
      ChartData: {
        Food: 91,
        Bills: 86,
        Home: 70,
        Drugs: 45,
        Cosmetics: 79,
        Sweets: 60,
        Presents: 49,
        Shopping: 46,
        Varios: 79,
        Faculty: 56,
      },
    };
  },
};
</script>
<style lang="scss" scoped></style>
