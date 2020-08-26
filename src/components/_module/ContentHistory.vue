<template>
  <div>
    <b-row>
      <b-col cols="12" md="12" sm="12">
        <div class="card-history">
          <div class="btn-income">
            <h5>Today's Income</h5>
            <h2>Rp. 1.000.000</h2>
            <p>+2% Yesterday</p>
          </div>
          <div class="btn-orders">
            <h5>Orders</h5>
            <h2>3.270</h2>
            <p>+5% Last Week</p>
          </div>
          <div class="btn-years">
            <h5>This Year's Income</h5>
            <h2>Rp. 100.000.000.000</h2>
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
  </div>
</template>

<script>
export default {
  name: 'ContentHistory'
}
</script>

// <script>
// var app = new Vue({

// })
//
</script>

<style scoped src="../../assets/css/main.css"></style>
