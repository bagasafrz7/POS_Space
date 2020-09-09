<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" sm="1" md="1">
        <nav class="nav">
          <router-link to="/">
            <img alt="Fork logo" src="../../assets/img/icon/fork.png" />
          </router-link>
          <router-link to="/history">
            <img alt="Clipboard logo" src="../../assets/img/icon/clipboard.png" />
          </router-link>
          <!-- <router-link to>
            <img alt="Add logo" src="../../assets/img/icon/add.png" @click="showModal" />
          </router-link>-->
          <router-link to="/manage-product">
            <img alt="Add logo" src="../../assets/img/icon/od.png" />
          </router-link>
          <router-link to="/manage-category">
            <img alt="Add logo" src="../../assets/img/icon/add.png" />
          </router-link>
          <a class="logout" @click="handleLogout">
            <img src="../../assets/img/icon/logout.png" alt />
          </a>
        </nav>
      </b-col>
    </b-row>
    <div>
      <b-modal ref="add-product" hide-footer centered title="Add Item">
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
              type="submit"
              class="mt-3"
              variant="outline-warning"
              block
              @click="toggleModal"
            >Add</b-button>
          </form>
        </div>
      </b-modal>
    </div>
  </b-container>
</template>

<script>
// import Modal from './Modal'
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'Navigation',
  components: {},
  data() {
    return {
      cart: [],
      page: 1,
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
    ...mapActions({ handleLogout: 'logout' }),
    getProduct() {
      axios
        .get(
          `http://127.0.0.1:3001/product?page=${this.page}&limit=${this.limit}&sort=${this.sort}`
        )
        .then((response) => {
          this.products = response.data.data
          this.totalPage = response.data.pagination.totalData
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
    showModal() {
      this.$refs['add-product'].show()
    },
    hideModal() {
      this.$refs['add-product'].hide()
    },
    toggleModal() {
      // We pass the ID of the button that we want to return focus to
      // when the modal has hidden
      this.$refs['add-product'].toggle('#toggle-btn')
    }
  }
}
</script>

<style scoped src="../../assets/css/main.css"></style>
