<template>
  <div class="home">
    <Navbar />
    <ProductList />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/_base/Navbar'
import ProductList from '../components/_module/ProductList'

export default {
  name: 'Home',
  components: {
    Navbar,
    ProductList
  }
}
</script>
