<template>
  <div class="manage">
    <b-container fluid>
      <!-- fixed-top -->
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
          <ContentCategory />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/_base/Navbar'
import Navigation from '../components/_base/Navigation'
import ContentCategory from '../components/_module/ContentCategory'

export default {
  name: 'Manage Category',
  components: {
    Navbar,
    Navigation,
    ContentCategory
  }
}
</script>

<style scoped src="../assets/css/main.css"></style>
