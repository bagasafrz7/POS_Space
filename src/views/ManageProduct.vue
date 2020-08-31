<template>
  <div class="manage">
    <b-container fluid>
      <b-row class="main-navbar fixed-top">
        <b-col cols="12" md="12" sm="12" class="navigation">
          <Navbar />
        </b-col>
      </b-row>
      <b-row class="main-home">
        <b-col cols="12" sm="1" md="1" class="detail-sidenav">
          <Navigation />
        </b-col>
        <b-col cols="12" sm="11" md="11" class="hero-manage">
          <ManageProduct />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/_base/Navbar'
import Navigation from '../components/_base/Navigation'
import ManageProduct from '../components/_module/ManageProduct'

export default {
  name: 'Manage',
  components: {
    Navbar,
    Navigation,
    ManageProduct
  }
}
</script>

<style scoped src="../assets/css/main.css"></style>
