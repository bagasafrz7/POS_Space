<template>
  <div class="main-manage">
    <b-row>
      <b-col cols="12" md="12" sm="12">
        <b-row>
          <b-col cols="6" md="6" sm="6">
            <h4>Data Product</h4>
            <b-button squared variant="outline-info" @click="showModal" class="btn-data">
              Add Data
              <b-icon icon="file-plus-fill" variant="primary"></b-icon>
            </b-button>
          </b-col>
          <b-col cols="6" md="6" sm="6" class="text-right">
            <div class="btn-sorting">
              <b-dropdown id="sort" :text="sortText" right variant="primary" class="mb-1 mr-2">
                <b-dropdown-item-button @click="sorting('product_created_at%20DESC')">Latest</b-dropdown-item-button>
                <b-dropdown-item-button @click="sorting('product_created_at%20ASC')">Oldest</b-dropdown-item-button>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-group id="dropdown-group-1" header="Name">
                  <b-dropdown-item-button @click="sorting('product_name%20ASC')">A-Z</b-dropdown-item-button>
                  <b-dropdown-item-button @click="sorting('product_name%20DESC')">Z-A</b-dropdown-item-button>
                </b-dropdown-group>
                <b-dropdown-group id="dropdown-group-2" header="Price">
                  <b-dropdown-item-button @click="sorting('product_harga%20ASC')">Cheapest Price</b-dropdown-item-button>
                  <b-dropdown-item-button
                    @click="sorting('product_harga%20DESC')"
                  >Most Expensive Price</b-dropdown-item-button>
                </b-dropdown-group>
                <b-dropdown-group id="dropdown-group-2" header="Category">
                  <b-dropdown-item-button @click="sorting('category_id=2')">Drinks</b-dropdown-item-button>
                  <b-dropdown-item-button @click="sorting('category_id=1')">Foods</b-dropdown-item-button>
                </b-dropdown-group>
                <b-dropdown-divider></b-dropdown-divider>
              </b-dropdown>
            </div>
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
            <tbody v-for="(item, index) in products" :key="index">
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
                <input type="file" @change="handleFile" class="form-control image" id="image" />
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
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'ContentManage',
  data() {
    return {
      currentPage: 1,
      product_id: '',
      form: {
        category_id: '',
        product_name: '',
        product_image: {},
        product_harga: '',
        product_status: ''
      },
      alert: false,
      inMsg: '',
      isUpdate: false,
      isCart: false,
      sortText: 'Sort'
    }
  },
  created() {
    this.getProducts()
  },
  methods: {
    ...mapActions([
      'getProducts',
      'addProducts',
      'updateProducts',
      'deleteProducts'
    ]),
    ...mapMutations(['changePage', 'sortProduct']),
    handleFile(event) {
      this.form.product_image = event.target.files[0]
      // console.log(event.target.files[0])
    },
    makeToast(variant = '') {
      this.$bvToast.toast(`${this.inMsg}`, {
        title: `Congrats! ${'' || ''}`,
        variant: variant,
        solid: true
      })
    },
    handlePageChange(numberPage) {
      this.$router.push(`?page=${numberPage}`)
      this.changePage(numberPage)
      this.getProducts()
    },
    sorting(value) {
      if (value === 'product_created_at%20DESC') {
        this.sortText = 'Latest'
      } else if (value === 'product_created_at%20ASC') {
        this.sortText = 'Oldest'
      } else if (value === 'product_name%20ASC') {
        this.sortText = 'A-Z'
      } else if (value === 'product_name%20DESC') {
        this.sortText = 'Z-A'
      } else if (value === 'product_harga%20ASC') {
        this.sortText = 'Cheapest Price'
      } else if (value === 'product_harga%20DESC') {
        this.sortText = 'Most Expensive Price'
      } else if (value === 'category_id=2') {
        this.sortText = 'Drinks'
      } else if (value === 'category_id=1') {
        this.sortText = 'Foods'
      }
      this.sortProduct(value)
      this.getProducts()
      this.$router.push(`?sort=${value}`)
    },
    addProduct() {
      const data = new FormData()
      data.append('category_id', this.form.category_id)
      data.append('product_name', this.form.product_name)
      data.append('product_image', this.form.product_image)
      data.append('product_harga', this.form.product_harga)
      data.append('product_status', this.form.product_status)
      this.addProducts(data)
        .then((response) => {
          this.inMsg = response.msg
          this.makeToast(this.inMsg)
          this.$refs['add-product'].hide()
          this.getProducts()
          console.log(response)
        })
        .catch((error) => {
          this.inMsg = error.data.msg
          this.makeToast(this.inMsg)
          this.$refs['add-product'].hide()
          console.log(error)
        })
    },
    setProduct(data) {
      this.form = {
        category_id: data.category_id,
        product_name: data.product_name,
        product_image: data.product_image,
        product_harga: data.product_harga,
        product_status: data.product_status
      }
      this.isUpdate = true
      this.product_id = data.product_id
      this.$refs['add-product'].show()

      // console.log(data.product_id)
    },
    patchProduct() {
      const data = new FormData()
      data.append('category_id', this.form.category_id)
      data.append('product_name', this.form.product_name)
      data.append('product_image', this.form.product_image)
      data.append('product_harga', this.form.product_harga)
      data.append('product_status', this.form.product_status)
      const setData = {
        product_id: this.product_id,
        form: data
      }
      this.updateProducts(setData)
        .then((response) => {
          this.inMsg = response.msg
          this.makeToast(this.inMsg)
          this.isUpdate = false
          this.$refs['add-product'].hide()
          this.getProducts()
          console.log(response)
        })
        .catch((error) => {
          this.inMsg = error.data.msg
          this.makeToast(this.inMsg)
          this.isUpdate = false
          this.$refs['add-product'].hide()
          console.log(error)
        })
    },
    deleteProduct(data) {
      this.deleteProducts(data.product_id)
        .then((response) => {
          this.inMsg = response.msg
          this.makeToast(this.inMsg)
          this.getProducts()
          console.log(response)
        })
        .catch((error) => {
          this.inMsg = error.data.msg
          this.makeToast(this.inMsg)
          console.log(error)
        })
      // console.log(data.product_id)
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
    ...mapGetters({
      products: 'getProduct',
      totalPage: 'getTotalPage',
      limit: 'getLimit',
      sort: 'getSortProduct',
      search: 'getSearch'
    })
    // filteredList() {
    //   return this.products.filter((item, index) => {
    //     // if (this.search) {
    //     //   this.products = this.notSearch
    //     // } else {
    //     return item.product_name
    //       .toLowerCase()
    //       .includes(this.search.toLowerCase())
    //     // }
    //   })
    // }
  }
}
</script>

<style scoped src="../../assets/css/main.css"></style>
