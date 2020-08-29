<template>
  <div class="home">
    <b-container fluid>
      <b-row class="main-navbar fixed-top">
        <b-col cols="12" md="12" sm="12" class="navigation">
          <Navbar />
        </b-col>
        <!-- <b-col cols="12" md="4" sm="4" class="side-cart">
          <Cart />
        </b-col>-->
      </b-row>
      <b-row class="main-home">
        <b-col cols="12" sm="1" md="1" class="detail-sidenav">
          <Navigation />
        </b-col>
        <b-col cols="12" sm="11" md="11">
          <ProductList />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/_base/Navbar'
// import Cart from '../components/_base/Cart'
import ProductList from '../components/_module/ProductList'
import Navigation from '../components/_base/Navigation'
// import ContentCart from '../components/_module/ContentCart'

export default {
  name: 'Home',
  components: {
    Navbar,
    // Cart,
    ProductList,
    Navigation
    // ContentCart
  }
}
</script>

<style scoped src="../assets/css/main.css"></style>
