<template>
  <div>
    <b-row>
      <b-col cols="12" md="12" sm="12">
        <div class="card-history">
          <div class="btn-income" v-for="(item, index1) in days" :key="index1">
            <h5>Today's Income</h5>
            <h2>Rp. {{item.totalToday}}</h2>
            <p>+2% Yesterday</p>
          </div>
          <div class="btn-orders" v-for="(item, index2) in week" :key="index2">
            <h5>Orders</h5>
            <h2>{{item.Orders}}</h2>
            <p>+5% Last Week</p>
          </div>
          <div class="btn-years" v-for="(item, index3) in years" :key="index3">
            <h5>This Year's Income</h5>
            <h2>Rp. {{item.totalYears}}</h2>
            <p>+10% Last Year</p>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row class="chart">
      <b-col cols="12" md="12" sm="12">
        <div class="cart-body">
          <b-row class="my-4">
            <b-col cols="6" md="6" sm="6">
              <h2>Revenue</h2>
            </b-col>
            <b-col cols="6" md="6" sm="6" class="text-right">
              <span class="badge badge-pill badge-secondary">Month</span>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="12" sm="12">
              <line-chart
                :data="{'2017-01-01': 9, '2017-01-02': 6, '2017-01-03': 8, '2017-01-03': 13, '2017-01-04': 10, '2017-01-05': 15, '2017-01-06': 1, '2017-01-07': 5, '2017-01-08': 8, '2017-01-09': 13, '2017-01-10': 15}"
              ></line-chart>
            </b-col>
            <!-- <div id="app"> -->
            <!-- <column-chart :data="[['Sun', 32], ['Mon', 46], ['Tue', 28]]"></column-chart> -->
            <!-- </div> -->
          </b-row>
        </div>
      </b-col>
    </b-row>
    <b-row class="recent-order">
      <b-col cols="12" md="12" sm="12">
        <b-row>
          <b-col cols="6" md="6" sm="6">
            <h2>Recent Order</h2>
          </b-col>
          <b-col cols="6" md="6" sm="6" class="text-right">
            <span class="badge badge-pill badge-secondary">Today</span>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" md="12" sm="12" class="mt-4">
            <b-table striped hover :items="items"></b-table>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'ContentHistory',
  data() {
    return {
      days: [],
      week: [],
      years: [],
      recentOrder: [],
      items: []
    }
  },
  created() {
    this.getHistoryDays()
    this.getHistoryWeek()
    this.getHistoryYears()
    this.getRecentOrder()
  },
  methods: {
    getHistoryDays() {
      axios.get('http://127.0.0.1:3001/history/days').then((response) => {
        this.days = response.data.data
        console.log(this.days)
      })
    },
    getHistoryYears() {
      axios
        .get('http://127.0.0.1:3001/history/years')
        .then((response) => {
          this.years = response.data.data
          console.log(this.years)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getHistoryWeek() {
      axios
        .get('http://127.0.0.1:3001/history/week')
        .then((response) => {
          this.week = response.data.data
          console.log(this.week)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getRecentOrder() {
      this.items = []
      axios
        .get('http://127.0.0.1:3001/order')
        .then((response) => {
          this.recentOrder = response.data.data
          this.recentOrder.map((value) => {
            const setItems = {
              INVOICES: `#${value.history_invoice}`,
              CASHIER: 'Cashier 1',
              DATE: `${value.history_created_at}`,
              ORDERS: `${value.product_name}`,
              AMOUNT: `${value.history_subtotal}`
            }
            this.items = [...this.items, setItems]
          })
          // console.log(this.recentOrder)
          console.log(this.items)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped src="../../assets/css/main.css"></style>
