<template>
  <div class="home-select">
    <Navbar />
    <Card />
  </div>
</template>

<script>
import Navbar from '../components/_base/Navbar'
import Card from '../components/_module/ProductList'
export default {
  name: 'HomeSelect',
  components: {
    Navbar,
    Card
  }
}
</script>
