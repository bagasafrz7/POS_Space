<template>
  <div class="history">
    <b-container fluid>
      <b-row class="main-navbar fixed-top">
        <b-col cols="12" md="12" sm="12" class="navigation">
          <NavbarHistory />
        </b-col>
        <!-- <b-col cols="12" md="4" sm="4" class="side-cart">
          <Cart />
        </b-col>-->
      </b-row>
      <b-row class="main-history">
        <b-col cols="12" sm="1" md="1" class="detail-sidenav">
          <Navigation />
        </b-col>
        <b-col cols="12" sm="11" md="11" class="content-history">
          <ContentHistory />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavbarHistory from '../components/_base/NavbarHistory'
import Navigation from '../components/_base/Navigation'
import ContentHistory from '../components/_module/ContentHistory'
export default {
  name: 'History',
  components: {
    NavbarHistory,
    Navigation,
    ContentHistory
  }
}
</script>

<style scoped src="../assets/css/main.css"></style>
