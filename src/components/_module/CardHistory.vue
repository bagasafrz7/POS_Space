<template>
  <div>
    <b-row>
      <b-col cols="12" md="12" sm="12">
        <div class="card-history">
          <div class="btn-income">
            <h5>Today's Income</h5>
            <h2>Rp. {{todayIncome}}</h2>
            <p>+2% Yesterday</p>
          </div>
          <div class="btn-orders">
            <h5>Orders</h5>
            <h2>{{ordersWeek}}</h2>
            <p>+5% Last Week</p>
          </div>
          <div class="btn-years">
            <h5>This Year's Income</h5>
            <h2>Rp. {{yearsIncome}}</h2>
            <p>+10% Last Year</p>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'CardHistory',
  data() {
    return {
      todayIncome: '',
      ordersWeek: '',
      yearsIncome: ''
    }
  },
  created() {
    this.getHistoryDays()
    this.getHistoryWeek()
    this.getHistoryYears()
  },
  methods: {
    getHistoryDays() {
      axios.get('http://127.0.0.1:3001/history/days').then((response) => {
        this.days = response.data.data
        this.todayIncome = response.data.data[0].totalToday
        console.log(this.todayIncome)
      })
    },
    getHistoryYears() {
      axios
        .get('http://127.0.0.1:3001/history/years')
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
        .get('http://127.0.0.1:3001/history/week')
        .then((response) => {
          this.week = response.data.data
          this.ordersWeek = response.data.data[0].Orders
          console.log(this.ordersWeek)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped src="../../assets/css/main.css"></style>
