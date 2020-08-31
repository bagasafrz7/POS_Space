<template>
  <div class="main-manage">
    <b-row>
      <b-col cols="12" md="12" sm="12">
        <h4>Data Category</h4>
        <b-row>
          <b-col cols="6" md="6" sm="6">
            <b-button squared variant="outline-info" @click="showModal" class="btn-data">
              Add Data
              <b-icon icon="file-plus-fill" variant="primary"></b-icon>
            </b-button>
          </b-col>
          <b-col cols="6" md="6" sm="6" class="text-right">
            <div class="search-wrapper">
              <input type="text" v-model="search" placeholder="Search Category" />
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
                <th scope="col">Category ID</th>
                <th scope="col">Category Name</th>
                <th scope="col">Category Created</th>
                <th scope="col">Category Updated</th>
                <th scope="col">Category Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody v-for="(item, index) in categorys, filteredList" :key="index">
              <tr>
                <th scope="row">{{item.category_id}}</th>
                <th>{{item.category_name}}</th>
                <td>{{item.category_created_at}}</td>
                <td>{{item.category_updated_at}}</td>
                <td>{{item.category_status}}</td>
                <td>
                  <b-button @click="setCategory(item)" variant="outline">
                    <b-icon icon="arrow-counterclockwise" variant="success"></b-icon>
                  </b-button>|
                  <b-button @click="deleteCategory(item)" variant="outline">
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
      <b-modal ref="add-category" hide-footer centered title="Add Item">
        <div class="d-block text-center">
          <form v-on:submit.prevent="addCategory">
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Name</label>
              <div class="col-sm-10">
                <input type="text" v-model="form.category_name" class="form-control" id="name" />
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-2 col-form-label">Status</label>
              <div class="col-sm-10">
                <select id="inputState" class="form-control" v-model="form.category_status">
                  <option selected disabled>Category Status</option>
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
              @click="patchCategory()"
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
  name: 'ContentCategory',
  data() {
    return {
      // perPage: 10,
      totalPage: '',
      currentPage: 1,
      page: 1,
      limit: 9,
      sort: '',
      search: '',
      categorys: [],
      form: {
        category_name: '',
        category_status: ''
      },
      inMsg: '',
      category_id: '',
      isUpdate: false
    }
  },
  created() {
    this.getCategory()
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
      this.getCategory()
    },
    getCategory() {
      axios
        .get(
          `http://127.0.0.1:3001/category?page=${this.page}&limit=${this.limit}&sort=${this.sort}`
        )
        .then((response) => {
          this.categorys = response.data.data
          this.totalPage = response.data.pagination.totalData
          console.log(this.categorys)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addCategory() {
      console.log(this.form)
      axios
        .post('http://127.0.0.1:3001/category', this.form)
        .then((response) => {
          console.log(response)
          this.inMsg = response.data.msg
          this.makeToast(this.inMsg)
          this.$refs['add-category'].hide()
          this.getCategory()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    setCategory(data) {
      this.form = {
        category_name: data.category_name,
        category_status: data.category_status
      }
      this.isUpdate = true
      this.category_id = data.category_id
      this.$refs['add-category'].show()

      // console.log(data.product_id)
    },
    patchCategory() {
      console.log(this.form)
      console.log(this.category_id)
      axios
        .patch(`http://127.0.0.1:3001/category/${this.category_id}`, this.form)
        .then((response) => {
          console.log(response)
          this.inMsg = response.data.msg
          this.isUpdate = false
          this.$refs['add-category'].hide()
          this.makeToast(this.inMsg)
          this.getCategory()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    deleteCategory(data) {
      console.log(data.category_id)
      axios
        .delete(`http://127.0.0.1:3001/category/${data.category_id}`)
        .then((response) => {
          console.log(response)
          this.inMsg = response.data.msg
          this.makeToast(this.inMsg)
          this.getCategory()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    showModal() {
      this.$refs['add-category'].show()
    },
    hideModal() {
      // this.setProduct = []
      this.$refs['add-category'].hide()
    }
  },
  computed: {
    filteredList() {
      return this.categorys.filter((item, index) => {
        // if (this.search) {
        //   this.products = this.notSearch
        // } else {
        return item.category_name
          .toLowerCase()
          .includes(this.search.toLowerCase())
        // }
      })
    }
  }
}
</script>

<style scoped src="../../assets/css/main.css"></style>
