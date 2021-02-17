<template>
  <div class="col" style="margin:0px;padding:0px">
    <h1>ADD COSTS</h1>
    <br />
    <button
      type="button"
      class="btn btn-success"
      @click="saveInvoice"
      id="newRow"
    >
      <i class="fas fa-check-circle"></i> Save Costs
    </button>
    <button
      type="submit"
      class="btn btn-success"
      id="newRow"
      @click="addnewRow"
    >
      <i class="fas fa-plus-circle"></i> Add Cost
    </button>
    <table class="table table-responsive">
      <thead class="thead-dark" style="border-radius:2px solid">
        <tr>
          <th scope="col">Category</th>
          <th scope="col">Exspense</th>
          <th scope="col">Date</th>
          <th scope="col text-right">Price</th>
          <th scope="col text-right">Quantity</th>
          <th scope="col text-right">Total</th>
          <th scope="col">#</th>
        </tr>
      </thead>
      <tr v-for="(invoice_product, k) in invoice_products" :key="k">
        <td>
          <select
            name="test"
            class="form-control"
            v-model="invoice_product.product_category"
          >
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
        </td>
        <td>
          <input
            class="form-control"
            type="text"
            v-model="invoice_product.product_record"
            v-if="!null"
          />
        </td>
        <td>
          <input
            class="form-control"
            type="date"
            v-model="invoice_product.product_date"
            v-if="!null"
          />
        </td>
        <td>
          <input
            class="form-control"
            type="number"
            min="0"
            step=".01"
            v-model="invoice_product.product_price"
            @change="calculateLineTotal(invoice_product)"
            required
          />
        </td>
        <td>
          <input
            class="form-control"
            type="number"
            min="0"
            step=".01"
            v-model="invoice_product.product_qty"
            @change="calculateLineTotal(invoice_product)"
            required
          />
        </td>
        <td>
          <input
            readonly
            class="form-control"
            type="number"
            min="0"
            step=".01"
            v-model="invoice_product.line_total"
          />
        </td>
        <td class="trashIconContainer">
          <i class="fas fa-trash" @click="deleteRow(k, invoice_product)"></i>
        </td>
      </tr>
      <tfoot>
        <tr>
          <td class="text-left"><h4>Current Cost:</h4></td>
          <td class="text-right" colspan="7">
            <b>{{ invoice_subtotal }} RSD</b>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "Table",
  data() {
    return {
      showMe: true,
      times: null,
      invoice_subtotal: 0,
      invoice_tax: 5,
      invoice_total: 0,
      invoice_products: [
        {
          product_category: "",
          product_record: "",
          product_qty: 1,
          product_price: 1,
          product_date: "",
          line_total: 0,
        },
      ],
    };
  },
  methods: {
    saveInvoice() {
      this.fetchTimes();
    },
    addnewRow() {
      this.invoice_products.push({
        product_category: "",
        product_record: "",
        product_qty: 1,
        product_price: 1,
        product_date: "",
        line_total: 0,
      });
    },
    calculateLineTotal(invoice_product) {
      var total =
        parseFloat(invoice_product.product_price) *
        parseFloat(invoice_product.product_qty);
      if (!isNaN(total)) {
        invoice_product.line_total = total.toFixed(2);
      }
      this.calculateTotal();
    },
    calculateTotal() {
      var subtotal, total;
      subtotal = this.invoice_products.reduce(function(sum, product) {
        var lineTotal = parseFloat(product.line_total);
        if (!isNaN(lineTotal)) {
          return sum + lineTotal;
        }
      }, 0);
      this.invoice_subtotal = subtotal.toFixed(2);
      total = subtotal * (this.invoice_tax / 100) + subtotal;
      total = parseFloat(total);
      if (!isNaN(total)) {
        this.invoice_total = total.toFixed(2);
      } else {
        this.invoice_total = "0.00";
      }
    },
    deleteRow(index, invoice_product) {
      var indx = this.invoice_products.indexOf(invoice_product);
      console.log(indx, index);
      if (indx > -1) {
        this.invoice_products.splice(indx, 1);
      }
      this.calculateTotal();
    },
    fetchTimes() {
      let valid = true;
      let products = this.invoice_products;

      products.forEach((element) => {
        if (isNaN(element.product_price)) {
          valid = false;
        }
        if (isNaN(element.product_qty)) {
          valid = false;
        }
        if (element.product_record == "") {
          valid = false;
        }
        if (element.product_date == "") {
          valid = false;
        }
        if (element.product_category == "" || element.product_category == 0) {
          valid = false;
        }
      });

      if (valid) {
        products.forEach((element) => {
          element.product_category = parseFloat(element.product_category);
          element.product_qty = parseFloat(element.product_qty);
          element.product_price = parseFloat(element.product_price);
        });

        this.$store
          .dispatch("costs/postCost", {
            products,
          })
          .then(() => {
            alert("Successfully added your cost, thanky for you trust!");
            this.invoice_products = [
              {
                product_category: "",
                product_record: "",
                product_qty: 1,
                product_price: 1,
                product_date: "",
                line_total: 0,
              },
            ];
          })
          .catch((err) => console.log(err));
      } else {
        alert("All fields are not valid.");
      }
    },
  },
};
</script>

<style scoped>
input,
select {
  border: 2px solid black;
  margin-bottom: 10px;
  margin-right: 5px;
}
table {
  padding-left: 20px;
  padding-right: 20px;
}

th {
  background-color: black;
  color: white;
}
#icn {
  height: 29px;
  padding: 3px;
}
#newRow {
  float: right;
  margin-right: 10px;
  width: 150px;
  height: 45px;
  margin-bottom: 18px;
}
@media screen and (max-width: 960px) {
  .col {
    font-size: 10px;
  }
  .table {
    font-size: 10px;
    margin-left: 0px;
    margin-right: 10px;
  }
}
</style>
