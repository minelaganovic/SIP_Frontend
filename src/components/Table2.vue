<template>
  <div style="margin-top:30px" class="container-fluid mt-10">
    <div clas="row">
      <form>
        <div class="row" style="margin-top:40px; margin-left:50px;">
          <div class="col-sm">
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1"
                    >Category:</span
                  >
                </div>
                <select
                  name="Category"
                  class="form-control"
                  v-model="categoryId"
                >
                  <option value="0">All</option>
                  <option value="1">Food</option>
                  <option value="2">Home</option>
                  <option value="3">Cosmetics</option>
                  <option value="4">Sweets</option>
                  <option value="5">Presents</option>
                  <option value="6">Bills</option>
                  <option value="7">Shopping</option>
                  <option value="8">Faculty</option>
                  <option value="9">Drugs</option>
                  <option value="10">Various</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-sm">
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1"
                    >Date from:
                  </span>
                </div>
                <input type="date" v-model="dateFrom" class="form-control" />
              </div>
            </div>
          </div>
          <div class="col-sm">
            <div class="form-group">
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1"
                    >Date to:</span
                  >
                </div>
                <input type="date" v-model="dateTo" class="form-control" />
              </div>
            </div>
          </div>
          <div class="col-sm">
            <input
              class="btn btn-success"
              style="width:140px;"
              @click="getStatistic"
              value="Apply"
            />
          </div>
        </div>
      </form>
    </div>
    <div class="table-responsive">
      <table
        v-if="!loading"
        class="table table-striped table-bordered table-hover"
      >
        <thead>
          <tr class="bg-dark text-white">
            <th scope="col">Category</th>
            <th scope="col">Exspense</th>
            <th scope="col">Date</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in costs" v-bind:key="index">
            <th v-html="item.category.name"></th>
            <td v-html="item.product_record"></td>
            <td v-html="item.product_date"></td>
            <td v-html="item.product_price"></td>
            <td v-html="item.product_qty"></td>
            <td v-html="item.total"></td>
          </tr>
          
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  name: "Table2",
  data() {
    return {
      categoryId: 0,
      dateFrom: "",
      dateTo: "",
      loading: true,
    };
  },
  methods: {
    getStatistic() {
      let categoryId = this.categoryId;
      let dateFrom = this.dateFrom;
      let dateTo = this.dateTo;

      //provera da li su validni datumi, ako nisu obustavi funkciju za backend

      this.$store
        .dispatch("costs/getCosts", {
          categoryId,
          dateFrom,
          dateTo,
        })
        .then(() => {
          this.loading = false;
        })
        .catch((err) => console.log(err));
    },
  },
  computed: {
    costs() {
      return this.$store.getters["costs/getCosts"];
    },
  },
};
</script>
<style scoped>
.table td,
.table th {
  padding: 10px;
}
input {
  margin-bottom: 30px;
  height: 38px;
  border-radius: 2px black;
  border-bottom-right-radius: 2px black;
  border-top-right-radius: 2px black;
}
p {
  float: left;
  font-size: 20px;
}
#basic-addon1 {
  width: 90px;
  height: 38px;
  background-color: #939394;
  border: 2px solid black;
  border-radius: 1px solid;
  color: black !important;
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
}
#datalist {
  border-bottom-right-radius: 2px solid black;
  border-top-right-radius: 2px solid black;
}
</style>
