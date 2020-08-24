<template>
  <div class="side-bar">
    <b-container fluid>
      <b-row>
        <b-col cols="12" sm="12" md="12">
          <b-row>
            <b-col cols="8">
              <b-alert v-bind:show="alert" variant="success">{{inMsg}}</b-alert>
            </b-col>
            <b-col cols="4">
              <b-dropdown text="Filter" right variant="primary" class="mb-1 float-right">
                <b-dropdown-item href="#">Name</b-dropdown-item>
                <b-dropdown-item href="#">Price</b-dropdown-item>
                <b-dropdown-item href="#">Date</b-dropdown-item>
              </b-dropdown>
            </b-col>
          </b-row>
          <b-row>
            <b-col
              cols="6"
              sm="6"
              md="4"
              class="main-food"
              v-for="(item, index) in products"
              :key="index"
            >
              <img alt="Img 1" src="../../assets/img/food-menu/3_min.jpg" class="img-fluid" />
              <b-row>
                <b-col cols="8">
                  <p>{{item.product_name}}</p>
                  <h3>{{item.product_harga}}</h3>
                </b-col>
                <b-col cols="4" class="img-cart">
                  <b-button class="mt-2 mx-2" variant="outline-info" v-on:click="addToCart(item)">
                    <img src="../../assets/img/icon/cart.png" alt />
                  </b-button>
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="12">
                  <b-button
                    @click="setProduct(item)"
                    class="mt-1 btn-access btn-update"
                    variant="success"
                  >Update</b-button>
                  <b-button
                    @click="deleteProduct(item)"
                    class="mt-1 btn-access btn-delete"
                    variant="danger"
                  >Delete</b-button>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row class="my-4">
            <b-col>
              <b-pagination
                v-model="page"
                :total-rows="totalPage"
                :per-page="limit"
                first-text="First"
                prev-text="Prev"
                next-text="Next"
                last-text="Last"
              ></b-pagination>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <!-- Modal Add -->
    <div>
      <b-modal ref="update-product" hide-footer centered title="Add Item">
        <div class="d-block text-center">
          <form v-on:submit.prevent="addProduct">
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-10">
                <input type="text" v-model="form.product_name" class="form-control" id="name" />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Image</label>
              <div class="col-sm-10">
                <input type="text" v-model="form.product_image" class="form-control" id="name" />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Price</label>
              <div class="col-sm-10">
                <input
                  type="number"
                  v-model="form.product_harga"
                  class="form-control price"
                  id="price"
                />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Category</label>
              <div class="col-sm-10">
                <select id="inputState" class="form-control" v-model="form.category_id">
                  <option selected disabled>Category</option>
                  <option value="1">Drinks</option>
                  <option value="2">Foods</option>
                </select>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Status</label>
              <div class="col-sm-10">
                <select id="inputState" class="form-control" v-model="form.product_status">
                  <option selected disabled>Product Status</option>
                  <option value="0">Empty</option>
                  <option value="1">Available</option>
                </select>
              </div>
            </div>
            <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Cancel</b-button>
            <b-button
              type="button"
              class="mt-3"
              variant="outline-warning"
              block
              @click="toggleModal, patchProduct()"
            >Update</b-button>
          </form>
        </div>
      </b-modal>
    </div>
    <!-- End Modal Add -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Card',
  components: {},
  data() {
    return {
      totalPage: 100,
      // perPage: 10,
      // currentPage: 1,
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
        product_name: data.product_name,
        product_harga: data.product_harga,
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
      this.product_id = data.product_id
      this.$refs['update-product'].show()
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
    hideModal() {
      this.$refs['update-product'].hide()
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs['update-product'].toggle('#toggle-btn')
    }
  }
}
</script>

<style scoped src="../../assets/css/main.css"></style>
