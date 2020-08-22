<template>
  <div class="header">
    <b-container fluid>
      <b-row>
        <b-col cols="12" md="8" sm="8" class="navigation">
          <b-row>
            <b-col cols="1" md="1" sm="1">
              <router-link to="/">
                <img alt="Burger logo" src="../../assets/img/icon/menu.png" />
              </router-link>
            </b-col>
            <b-col cols="10" md="10" sm="10">
              <h2 class="text-center">Food Items</h2>
            </b-col>
            <b-col cols="1" md="1" sm="1">
              <img alt="Search logo" src="../../assets/img/icon/search.png" />
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12" md="4" sm="4" class="side-cart">
          <h4 class="text-center">
            Cart
            <span class="badge badge-secondary">{{count}}</span>
          </h4>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      count: 0
    }
  }
}
</script>

<style scoped src="../../assets/css/main.css"></style>
