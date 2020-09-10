<template>
  <div class="main-manage">
    <b-row>
      <b-col cols="12" md="12" sm="12">
        <h4>Data Users</h4>
        <b-row>
          <b-col cols="6" md="6" sm="6">
            <!-- <b-button squared variant="outline-info" @click="showModal" class="btn-data">
              Add Data
              <b-icon icon="file-plus-fill" variant="primary"></b-icon>
            </b-button>-->
          </b-col>
          <b-col cols="6" md="6" sm="6" class="text-right">
            <div class="search-wrapper">
              <input type="text" v-model="search" placeholder="Search Users" />
            </div>
          </b-col>
        </b-row>

        <div class="table-data">
          <table class="table table-hover text-center" width="100">
            <thead>
              <tr>
                <th scope="col">User ID</th>
                <th scope="col">User Email</th>
                <th scope="col">User Name</th>
                <th scope="col">User Role</th>
                <th scope="col">User Status</th>
                <th scope="col">User Created</th>
                <th scope="col">User Updated</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody v-for="(item, index) in users" :key="index">
              <tr>
                <th scope="row">{{item.user_id}}</th>
                <th>{{item.user_email}}</th>
                <th>{{item.user_name}}</th>
                <td>{{item.user_role}}</td>
                <td>{{item.user_status}}</td>
                <td>{{item.user_created_at}}</td>
                <td>{{item.user_updated_at}}</td>
                <td>
                  <b-button @click="setUser(item)" variant="outline">
                    <b-icon icon="arrow-counterclockwise" variant="success"></b-icon>
                  </b-button>|
                  <b-button @click="deleteUser(item)" variant="outline">
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
      <b-modal ref="add-user" hide-footer centered title="Add Item">
        <div class="d-block text-center">
          <form v-on:submit.prevent="addUser">
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
              @click="patchDataUser()"
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
  name: 'ContentUser',
  data() {
    return {
      // perPage: 10,
      currentPage: 1,
      user_id: '',
      form: {
        user_email: '',
        user_password: '',
        user_name: '',
        user_role: '',
        user_status: ''
      },
      inMsg: '',
      isUpdate: false
    }
  },
  created() {
    this.getDataUsers()
  },
  methods: {
    ...mapActions(['getDataUsers', 'updateDataUsers']),
    ...mapMutations(['changePage']),
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
      this.getDataUsers()
    },
    setDataUser(data) {
      this.form = {
        user_email: data.user_email,
        user_password: data.user_password,
        user_name: data.user_name,
        user_role: data.user_role,
        user_status: data.user_status
      }
      this.isUpdate = true
      this.user_id = data.user_id
      this.$refs['add-user'].show()
    },
    patchDataUser() {
      const setData = {
        user_id: this.user_id,
        form: this.form
      }
      // console.log(setData)
      this.updateDataUsers(setData)
        .then((response) => {
          this.inMsg = response.msg
          this.makeToast(this.inMsg)
          this.isUpdate = false
          this.$refs['add-user'].hide()
          this.getDataUsers()
          console.log(response)
        })
        .catch((error) => {
          this.inMsg = error.data.msg
          this.makeToast(this.inMsg)
          this.isUpdate = false
          this.$refs['add-user'].hide()
          console.log(error)
        })
    },
    showModal() {
      this.$refs['add-user'].show()
    },
    hideModal() {
      // this.setProduct = []
      this.$refs['add-user'].hide()
    }
  },
  computed: {
    ...mapGetters({
      users: 'getData',
      totalPage: 'getTotalPage',
      limit: 'getLimit',
      sort: 'getSort',
      search: 'getSearch'
    })
  }
}
</script>

<style scoped src="../../assets/css/main.css"></style>
