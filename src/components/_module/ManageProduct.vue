<template>
  <div class="main-manage">
    <b-row>
      <b-col cols="12" md="12" sm="12">
        <h4>Data Product</h4>
        <b-row>
          <b-col cols="6" md="6" sm="6">
            <b-button squared variant="outline-info" @click="showModal" class="btn-data">
              Add Data
              <b-icon icon="file-plus-fill" variant="primary"></b-icon>
            </b-button>
          </b-col>
          <b-col cols="6" md="6" sm="6" class="text-right">
            <div class="search-wrapper">
              <input type="text" v-model="search" placeholder="Search Product" />
            </div>
          </b-col>
        </b-row>
        <!-- <b-button variant="success" @click="makeToast('success')" class="mb-2">Success</b-button> -->

        <b-toast id="my-toast" variant="success" solid>
          <template v-slot:toast-title>
            <div class="d-flex flex-grow-1 align-items-baseline">
              <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
              <strong class="mr-auto">Notice!</strong>
              <small class="text-muted mr-2">42 seconds ago</small>
            </div>
          </template>
          This is the content of the toast.
          It is short and to the point.
        </b-toast>
        <div class="table-data">
          <table class="table table-hover text-center" width="100">
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Product Name</th>
                <th scope="col">Product Price</th>
                <th scope="col">Product Created</th>
                <th scope="col">Product Updated</th>
                <th scope="col">Product Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody v-for="(item, index) in products, filteredList" :key="index">
              <tr>
                <th scope="row">{{item.category_id}}</th>
                <td>{{item.product_name}}</td>
                <td>{{item.product_harga}}</td>
                <td>{{item.product_created_at}}</td>
                <td>{{item.product_updated_at}}</td>
                <td>{{item.product_status}}</td>
                <td>
                  <b-button @click="setProduct(item)" variant="outline">
                    <b-icon icon="arrow-counterclockwise" variant="success"></b-icon>
                  </b-button>|
                  <b-button @click="deleteProduct(item)" variant="outline">
                    <b-icon icon="trash" variant="danger"></b-icon>
                  </b-button>
                </td>
              </tr>
            </tbody>
          </table>
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
        </div>
      </b-col>
    </b-row>
    <!-- Modal -->
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
              v-show="!isUpdate"
            >Add</b-button>
            <b-button
              type="button"
              class="mt-3"
              variant="outline-warning"
              block
              v-show="isUpdate"
              @click="patchProduct()"
            >Update</b-button>
          </form>
        </div>
      </b-modal>
    </div>
    <!-- EndModal -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ContentManage',
  data() {
    return {
      // perPage: 10,
      totalPage: '',
      currentPage: 1,
      cart: [],
      cartNone: [],
      page: 1,
      limit: 9,
      sort: '',
      search: '',
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
      isUpdate: false,
      isCart: false
    }
  },
  created() {
    this.getProduct()
  },
  methods: {
    makeToast(variant = '') {
      this.$bvToast.toast(`${this.inMsg}`, {
        title: `Congrats! ${'' || ''}`,
        variant: variant,
        solid: true
      })
    },
    handlePageChange(numberPage) {
      this.$router.push(`?page=${numberPage}`)
      this.page = numberPage
      this.getProduct()
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
    addProduct() {
      console.log(this.form)
      axios
        .post('http://127.0.0.1:3001/product', this.form)
        .then((response) => {
          console.log(response)
          this.inMsg = response.data.msg
          this.makeToast(this.inMsg)
          this.$refs['add-product'].hide()
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
      this.$refs['add-product'].show()

      // console.log(data.product_id)
    },
    patchProduct() {
      console.log(this.form)
      console.log(this.product_id)
      axios
        .patch(`http://127.0.0.1:3001/product/${this.product_id}`, this.form)
        .then((response) => {
          console.log(response)
          this.inMsg = response.data.msg
          this.isUpdate = false
          this.$refs['add-product'].hide()
          this.makeToast(this.inMsg)
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
          this.inMsg = response.data.msg
          this.makeToast(this.inMsg)
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
      // this.setProduct = []
      this.$refs['add-product'].hide()
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
    }
  }
}
</script>

<style scoped src="../../assets/css/main.css"></style>
