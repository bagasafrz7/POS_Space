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
          <ContectUser />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Navbar from '../components/_base/Navbar'
import Navigation from '../components/_base/Navigation'
import ContectUser from '../components/_module/ContectUser'

export default {
  name: 'ManageUser',
  components: {
    Navbar,
    Navigation,
    ContectUser
  }
}
</script>

<style scoped src="../assets/css/main.css"></style>
