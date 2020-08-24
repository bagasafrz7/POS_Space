<template>
  <div class="home">
    <b-container fluid>
      <b-row class="main-navbar">
        <b-col cols="12" md="8" sm="8" class="navigation">
          <Navbar />
        </b-col>
        <b-col cols="12" md="4" sm="4" class="side-cart">
          <Cart />
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" sm="1" md="1" class="detail-sidenav">
          <Navigation />
        </b-col>
        <b-col cols="12" sm="7" md="7" class="main-content">
          <ProductList />
        </b-col>
        <b-col cols="12" sm="4" md="4" class="content-cart">
          <ContentCart />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '../components/_base/Navbar'
import Cart from '../components/_base/Cart'
import ProductList from '../components/_module/ProductList'
import Navigation from '../components/_base/Navigation'
import ContentCart from '../components/_module/ContentCart'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    Navbar,
    Cart,
    ProductList,
    Navigation,
    ContentCart
  },
  data() {
    return {
      cart: [],
      page: 2,
      limit: 9,
      sort: '',
      products: [],
      form: {
        category_id: '',
        product_name: '',
        product_harga: '',
        product_image: '',
        product_status: ''
      },
      alert: false,
      inMsg: '',
      isUpdate: false,
      product_id: ''
    }
  },
  created() {
    this.getProduct()
  },
  methods: {
    increment() {
      console.log('Cliked')
      this.$emit('increment', 1)
    },
    incrementCount(data) {
      this.count += data
    },
    addToCart(data) {
      const setCart = {
        product_id: data.product_id,
        qty: 1
      }
      // spread operator
      this.cart = [...this.cart, setCart]
      console.log(this.cart)
    },
    getProduct() {
      axios
        .get(
          `http://127.0.0.1:3001/product?page=${this.page}&limit=${this.limit}&sort=${this.sort}`
        )
        .then((response) => {
          this.products = response.data.data
          console.log(this.products)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addProduct() {
      console.log(this.form)
      axios
        .post('http://127.0.0.1:3001/product', this.form)
        .then((response) => {
          console.log(response)
          this.alert = true
          this.inMsg = response.data.msg
          this.getProduct()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    setProduct(data) {
      this.form = {
        category_id: data.category_id,
        product_name: data.product_name,
        product_harga: data.product_harga,
        product_image: data.product_image,
        product_status: data.product_status
      }
      this.isUpdate = true
      this.product_id = data.product_id
      // console.log(data.product_id)
    },
    patchProduct() {
      console.log(this.form)
      console.log(this.product_id)
      axios
        .patch(`http://127.0.0.1:3001/product/${this.product_id}`, this.form)
        .then((response) => {
          console.log(response)
          this.alert = true
          this.inMsg = response.data.msg
          this.getProduct()
        })
        .catch((error) => {
          console.log(error)
        })
      this.isUpdate = false
    },
    deleteProduct(data) {
      console.log(data.product_id)
      axios
        .delete(`http://127.0.0.1:3001/product/${data.product_id}`)
        .then((response) => {
          console.log(response)
          this.alert = true
          this.inMsg = response.data.msg
          this.getProduct()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    showModal() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs['my-modal'].toggle('#toggle-btn')
    }
  }
}
</script>

<style scoped src="../assets/css/main.css"></style>
