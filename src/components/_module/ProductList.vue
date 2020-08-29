<template>
  <div class="side-bar">
    <!-- <b-container fluid> -->
    <div class="side-cart fixed-top">
      <h4 class="text-center">
        Cart
        <span class="badge badge-secondary">{{totalCart}}</span>
      </h4>
    </div>
    <b-row>
      <b-col cols="12" sm="8" md="8" class="main-content">
        <b-row>
          <b-col cols="8">
            <b-alert v-bind:show="alert" variant="success">{{inMsg}}</b-alert>
            <div class="search-wrapper">
              <input type="text" v-model="search" placeholder="Search Product" />
            </div>
          </b-col>
          <b-col cols="4">
            <b-dropdown text="Filter" right variant="primary" class="mb-1 float-right">
              <b-dropdown-item @click="sortID()">ID</b-dropdown-item>
              <b-dropdown-item @click="sortName()">Name</b-dropdown-item>
              <b-dropdown-item @click="sortPrice()">Price</b-dropdown-item>
              <b-dropdown-item @click="sortDate()">Date</b-dropdown-item>
            </b-dropdown>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            cols="6"
            sm="6"
            md="4"
            class="main-food"
            v-for="(item, index) in products, filteredList"
            :key="index"
          >
            <img alt="Img 1" src="../../assets/img/food-menu/8_min.jpg" class="img-fluid" />
            <div class="select-image text-center" v-if="checkCart(item)">
              <img src="../../assets/img/icon/select.png" alt />
            </div>
            <b-row>
              <b-col cols="8" md="8" sm="9">
                <p>{{item.product_name}}</p>
                <h3>{{item.product_harga}}</h3>
              </b-col>
              <b-col cols="4" md="4" sm="3" class="img-cart">
                <b-button class="mt-2" variant="outline-info" v-on:click="addToCart(item)">
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
              class="pagination"
              v-model="currentPage"
              :total-rows="totalPage"
              :per-page="limit"
              @change="handlePageChange"
              first-text="First"
              prev-text="Prev"
              next-text="Next"
              last-text="Last"
            ></b-pagination>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" sm="4" md="4" class="content-cart">
        <b-row class="text-center">
          <b-col cols="12" sm="12" md="12" v-show="!isCart" class="cartBefore">
            <img alt="Restorant logo" src="../../assets/img/icon/food-and-restorant.png" />
            <h4>Your cart is empty</h4>
            <p>Please add some items from the menu</p>
          </b-col>
        </b-row>
        <div class="detail-cart" v-show="isCart">
          <b-row class="mt-4" v-for="(item, index) in cart" :key="index">
            <b-col cols="3">
              <img src="../../assets/img/food-menu/8_min.jpg" alt />
            </b-col>
            <b-col cols="6" class="detail-number">
              <h5>{{item.product_name}}</h5>
              <b-button
                class="btn btn-secondary minus"
                @click="decrementCart(item)"
                :disabled="item.order_qty === 1"
              >-</b-button>
              <input type="text" class="number" :value="item.order_qty" id="number" disabled />
              <b-button class="btn btn-secondary plus" @click="incrementCart(item)">+</b-button>
            </b-col>
            <b-col cols="3">
              <h6>Rp.{{item.order_price * item.order_qty}}</h6>
            </b-col>
          </b-row>
          <div class="detail-cekout">
            <b-row>
              <b-col cols="6" md="6" sm="6" class="text-left">
                <p>Total :</p>
                <p>
                  <span>*Not Including VAT</span>
                </p>
              </b-col>
              <b-col cols="6" md="6" sm="6" class="text-right">
                <p>Rp.{{totalPriceCart()}}</p>
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col cols="12" md="12" sm="12">
                <b-button class="btn btn-primary btn-checkout" @click="postOrder(cart)">Checkout</b-button>
                <b-button class="btn btn-cancel" @click="cancelCart()">Cancel</b-button>
              </b-col>
            </b-row>
          </div>
        </div>
      </b-col>
    </b-row>
    <!-- </b-container> -->
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
    <!-- Modal Checkout -->
    <div class="modal-checkout">
      <b-modal ref="checkout-modal" hide-footer centered title="Checkout">
        <!-- <b-container fluid> -->
        <b-row class="mb-4">
          <b-col cols="6" md="6" sm="6" class="text-left">
            <p>Cashier : Pevita Pearce</p>
          </b-col>
          <b-col cols="6" md="6" sm="6" class="text-right">
            <p>
              Receipt No :
              <span>#{{invoice}}</span>
            </p>
          </b-col>
        </b-row>
        <b-row v-for="(value, index) in cart" :key="index">
          <b-col cols="6" md="6" sm="6" class="text-left mb-4">
            <p>
              {{value.product_name}}
              <span>{{value.order_qty}}x</span>
            </p>
          </b-col>
          <b-col cols="6" md="6" sm="6" class="text-right">
            <p>Rp.{{value.order_price * value.order_qty}}</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6" md="6" sm="6">
            <p>PPN 10%</p>
            <p>Payment: Cash</p>
          </b-col>
          <b-col cols="6" md="6" sm="6" class="text-right">
            <p>{{ppn}}</p>
            <p>Total : Rp.{{subTotal}}</p>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" md="12" sm="12" class="mt-4">
            <b-button class="btn btn-secondary btn-print" block @click="hideModal">Print</b-button>
            <p class="text-center my-2">Or</p>
            <b-button class="btn btn-primary btn-send" block @click="hideModal">Send Email</b-button>
          </b-col>
        </b-row>
        <!-- </b-container> -->
      </b-modal>
    </div>
    <!-- End Checkout -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Card',
  components: {},
  data() {
    return {
      // perPage: 10,
      totalPage: '',
      currentPage: 1,
      count: 1,
      cart: [],
      cartNone: [],
      page: 1,
      limit: 9,
      sort: '',
      search: '',
      notSearch: 'Product Not Found',
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
      product_id: '',
      isCart: false,
      totalCart: 0,
      dataDecrement: 1,
      orders: [],
      invoice: '',
      // totalPriceCart: '',
      subTotal: '',
      ppn: ''
    }
  },
  created() {
    this.getProduct()
  },
  methods: {
    sortID() {
      this.sort = 'product_id%20ASC'
      this.getProduct()
    },
    sortName() {
      this.sort = 'product_name%20ASC'
      this.getProduct()
    },
    sortPrice() {
      this.sort = 'product_harga%20ASC'
      this.getProduct()
    },
    sortDate() {
      this.sort = 'product_created_at%20ASC'
      this.getProduct()
    },
    checkCart(data) {
      return this.cart.some((item) => item.product_id === data.product_id)
    },
    incrementCart(data) {
      // console.log(data) // item yang di klik
      // console.log(this.cart) // array
      const incrementData = this.cart.find(
        (item) => item.product_id === data.product_id
      )
      incrementData.order_qty += 1
      console.log(this.cart)
    },
    decrementCart(data) {
      const decrementData = this.cart.find(
        (item) => item.product_id === data.product_id
      )
      decrementData.order_qty -= 1
    },
    handlePageChange(numberPage) {
      // this.$router.push(`?page=${numberPage}`)
      this.page = numberPage
      this.getProduct()
    },
    addToCart(data) {
      const setCart = {
        product_id: data.product_id,
        product_name: data.product_name,
        order_price: data.product_harga,
        order_qty: 1
      }
      // spread operator
      this.cart = [...this.cart, setCart]
      this.isCart = true
      this.totalCart = this.cart.length
      // this.totalPriceCart = this.cart
      console.log(this.cart)
      // console.log(this.cart.length)
    },
    totalPriceCart() {
      let totalDataCart = 0
      for (let i = 0; i < this.cart.length; i++) {
        totalDataCart += this.cart[i].order_price * this.cart[i].order_qty
      }
      return totalDataCart
    },
    cancelCart(data) {
      this.cart = this.cartNone
      this.isCart = false
      this.totalCart = 0
    },
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
    // getProductByName() {
    //   axios.get(
    //     `http://127.0.0.1:3001/product/search?search=${this.search}&limit=${this.limit}`
    //   )
    // },
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
    postOrder(data) {
      const setOrder = { orders: this.cart }
      console.log(setOrder)
      axios
        .post('http://127.0.0.1:3001/order', setOrder)
        .then((response) => {
          this.setOrder = response.data.data
          this.invoice = response.data.data.invoice
          this.ppn = response.data.data.ppn
          this.subTotal = response.data.data.subTotal
          this.isCart = false
          this.totalCart = 0
          this.$refs['checkout-modal'].show()
          console.log(response)
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
  },
  computed: {
    filteredList() {
      return this.products.filter((item, index) => {
        // if (this.search) {
        //   this.products = this.notSearch
        // } else {
        return item.product_name
          .toLowerCase()
          .includes(this.search.toLowerCase())
        // }
      })
    },
    rows() {
      return this.products.length
    }
  }
}
</script>

<style scoped src="../../assets/css/main.css"></style>
