<template>
  <div>
    <b-row>
      <b-col cols="12" md="12" sm="12">
        <div class="card-history">
          <div class="btn-income">
            <h5>Today's Income</h5>
            <h2>
              Rp
              {{ todayIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}
            </h2>
            <p>+2% Yesterday</p>
          </div>
          <div class="btn-orders">
            <h5>Orders</h5>
            <h2>{{ ordersWeek }}</h2>
            <p>+5% Last Week</p>
          </div>
          <div class="btn-years">
            <h5>This Year's Income</h5>
            <h2>
              Rp
              {{ yearsIncome.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') }}
            </h2>
            <p>+10% Last Year</p>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row class="chart">
      <b-col cols="12" md="12" sm="12">
        <div class="cart-body">
          <b-row class="my-4 px-4">
            <b-col cols="6" md="6" sm="6">
              <h2>Revenue</h2>
            </b-col>
            <b-col cols="6" md="6" sm="6" class="text-right">
              <b-dropdown
                id="dropdown-right"
                right
                :text="month"
                class="m-md-2"
              >
                <b-dropdown-item @click="getOrdersJanuary()"
                  >January</b-dropdown-item
                >
                <b-dropdown-item @click="getOrdersFebruary()"
                  >February</b-dropdown-item
                >
                <b-dropdown-item @click="getOrdersMarch()"
                  >March</b-dropdown-item
                >
                <b-dropdown-item @click="getOrdersApril()"
                  >April</b-dropdown-item
                >
                <b-dropdown-item @click="getOrdersMay()">May</b-dropdown-item>
                <b-dropdown-item @click="getOrdersJune()">June</b-dropdown-item>
                <b-dropdown-item @click="getOrdersJuly()">July</b-dropdown-item>
                <b-dropdown-item @click="getOrdersAugust()"
                  >August</b-dropdown-item
                >
                <b-dropdown-item @click="getOrdersSeptember()"
                  >September</b-dropdown-item
                >
                <b-dropdown-item @click="getOrdersOctober()"
                  >October</b-dropdown-item
                >
                <b-dropdown-item @click="getOrdersNovember()"
                  >November</b-dropdown-item
                >
                <b-dropdown-item @click="getOrdersDecember()"
                  >December</b-dropdown-item
                >
              </b-dropdown>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" md="12" sm="12">
              <line-chart
                :data="{
                  '2017-01-01': 9,
                  '2017-01-02': 6,
                  '2017-01-03': 8,
                  '2017-01-03': 13,
                  '2017-01-04': 10,
                  '2017-01-05': 15,
                  '2017-01-06': 1,
                  '2017-01-07': 5,
                  '2017-01-08': 8,
                  '2017-01-09': 13,
                  '2017-01-10': 15
                }"
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
        <b-row class="px-4">
          <b-col cols="6" md="6" sm="6">
            <h2>Recent Order</h2>
          </b-col>
          <b-col cols="6" md="6" sm="6" class="text-right">
            <b-dropdown id="dropdown-right" right :text="text" class="m-md-2">
              <b-dropdown-item @click="getOrdersToday()">Today</b-dropdown-item>
              <b-dropdown-item @click="getOrdersWeek()"
                >This Week</b-dropdown-item
              >
              <b-dropdown-item @click="getOrdersMonth()"
                >This Month</b-dropdown-item
              >
            </b-dropdown>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" md="12" sm="12" class="text-center mt-4">
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
      todayIncome: '',
      ordersWeek: '',
      yearsIncome: '',
      text: 'Today',
      weeks: 'Week',
      month: 'Month',
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
    // this.getRecentOrder()
    this.getOrdersToday()
  },
  methods: {
    getHistoryDays() {
      axios.get(`${process.env.VUE_APP_URL}history/days`).then((response) => {
        this.days = response.data.data
        this.todayIncome = response.data.data[0].totalToday
        console.log(this.todayIncome)
      })
    },
    getHistoryYears() {
      axios
        .get(`${process.env.VUE_APP_URL}history/years`)
        .then((response) => {
          this.years = response.data.data
          this.yearsIncome = response.data.data[0].totalYears
          console.log(this.yearsIncome)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getHistoryWeek() {
      axios
        .get(`${process.env.VUE_APP_URL}history/week`)
        .then((response) => {
          this.week = response.data.data
          this.ordersWeek = response.data.data[0].Orders
          console.log(this.ordersWeek)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getRecentOrder() {
      this.items = []
      axios
        .get(`${process.env.VUE_APP_URL}order`)
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
    },
    getOrdersToday() {
      this.items = []
      axios
        .get(`${process.env.VUE_APP_URL}history/orders/days`)
        .then((response) => {
          this.recentOrder = response.data.data
          this.recentOrder.map((value) => {
            const setItems = {
              INVOICES: `#${value.history_invoice}`,
              CASHIER: 'Cashier 1',
              DATE: `${value.history_created_at.slice(0, 10)}`,
              ORDERS: `${value.product_name}`,
              AMOUNT: `${value.history_subtotal}`
            }
            this.items = [...this.items, setItems]
            this.$router.push(`?sort-orders=${this.text}`)
          })
          // console.log(this.recentOrder)
          console.log(this.items)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getOrdersWeek() {
      this.items = []
      axios
        .get(`${process.env.VUE_APP_URL}history/orders/weeks`)
        .then((response) => {
          this.recentOrder = response.data.data
          this.recentOrder.map((value) => {
            const setItems = {
              INVOICES: `#${value.history_invoice}`,
              CASHIER: 'Cashier 1',
              DATE: `${value.history_created_at.slice(0, 10)}`,
              ORDERS: `${value.product_name}`,
              AMOUNT: `${value.history_subtotal}`
            }
            this.items = [...this.items, setItems]
            this.$router.push(`?sort-orders=${this.weeks}`)
          })
          // console.log(this.recentOrder)
          console.log(this.items)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getOrdersMonth() {
      this.items = []
      axios
        .get(`${process.env.VUE_APP_URL}history/orders/month`)
        .then((response) => {
          this.recentOrder = response.data.data
          this.recentOrder.map((value) => {
            const setItems = {
              INVOICES: `#${value.history_invoice}`,
              CASHIER: 'Cashier 1',
              DATE: `${value.history_created_at.slice(0, 10)}`,
              ORDERS: `${value.product_name}`,
              AMOUNT: `${value.history_subtotal}`
            }
            this.items = [...this.items, setItems]
            this.$router.push(`?sort-orders=${this.month}`)
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
