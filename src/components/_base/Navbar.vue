<template>
  <div class="header">
    <!-- <b-container fluid> -->
    <b-row>
      <b-col cols="12" md="8" sm="8">
        <b-row>
          <b-col cols="1" md="1" sm="1" class="header-burger">
            <router-link to="/">
              <img alt="Burger logo" src="../../assets/img/icon/menu.png" />
            </router-link>
          </b-col>
          <b-col cols="10" md="10" sm="10">
            <h2 class="text-center">SPACE</h2>
          </b-col>
          <!-- <b-col cols="1" md="1" sm="1" class="header-search">
            <img alt="Search logo" src="../../assets/img/icon/search.png" />
            <a href="#" class="search-btn"></a>
            <input
              type="text"
              v-model="search"
              class="search-txt"
              name="search"
              placeholder="Search"
            />
          </b-col>-->
        </b-row>
      </b-col>
    </b-row>
    <!-- </b-container> -->
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Navbar',
  components: {},
  data() {
    return {
      search: ''
    }
  },
  methods: {
    getProductByName() {
      axios.get(
        `http://127.0.0.1:3001/product/search?search=${this.search}&limit=9`
      )
    }
  }
}
</script>

<style scoped src="../../assets/css/main.css"></style>
