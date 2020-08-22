<template>
  <div class="side-bar">
    <b-container fluid>
      <b-row>
        <b-col cols="12" sm="1" md="1" class="detail-sidenav">
          <nav class="nav">
            <router-link to="/history">
              <img alt="History logo" src="../../assets/img/icon/clipboard.png" />
            </router-link>
            <router-link to>
              <img alt="History logo" src="../../assets/img/icon/add.png" @click="showModal" />
            </router-link>
          </nav>
        </b-col>
        <b-col cols="12" sm="7" md="7" class="main-content">
          <b-dropdown text="Filter" variant="primary" class="mb-1">
            <b-dropdown-item href="#">Action</b-dropdown-item>
            <b-dropdown-item href="#">Another action</b-dropdown-item>
            <b-dropdown-item href="#">Something else here</b-dropdown-item>
          </b-dropdown>
          <b-row>
            <b-col cols="6" sm="6" md="4" class="main-food">
              <img alt="Img 1" src="../../assets/img/food-menu/1_min.jpg" class="img-fluid" />
              <b-row>
                <b-col cols="9">
                  <p>Product Name</p>
                  <h3>Product Harga</h3>
                  <b-button class="mt-1" variant="success">Update</b-button>
                  <b-button class="mx-1 mt-1" variant="danger">Delete</b-button>
                </b-col>
                <b-col cols="3">
                  <b-button class="mt-2" variant="primary">+</b-button>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12" sm="4" md="4" class="content-cart">
          <b-row>
            <b-col
              cols="12"
              sm="12"
              md="12"
              class="main-cart text-center"
              v-for="(item, index) in product"
              :key="index"
            >
              <img
                alt="Restorant logo"
                src="../../assets/img/icon/food-and-restorant.png"
                width="200"
              />
              <h4>Your cart is empty</h4>
              <p>Please add some items from the menu</p>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
    <!-- Modal Add -->
    <div>
      <b-modal ref="my-modal" hide-footer centered title="Add Item">
        <div class="d-block text-center">
          <b-form-group label-cols="4" label-cols-lg="2" label="Name" label-for="input-default">
            <b-form-input id="input-default"></b-form-input>
          </b-form-group>
          <b-form-group label-cols="4" label-cols-lg="2" label="Image" label-for="input-default">
            <b-form-input id="input-default"></b-form-input>
          </b-form-group>
          <b-form-group label-cols="4" label-cols-lg="2" label="Price" label-for="input-default">
            <b-form-input id="input-default" class="price"></b-form-input>
          </b-form-group>
          <b-form-group label-cols="4" label-cols-lg="2" label="Category" label-for="input-default">
            <b-form-select v-model="selected" :options="options"></b-form-select>
          </b-form-group>
        </div>
        <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Cancel</b-button>
        <b-button class="mt-3" variant="outline-warning" block @click="toggleModal">Add</b-button>
      </b-modal>
    </div>
    <!-- End Modal Add -->
  </div>
</template>

<script>
export default {
  name: 'Axios',
  components: {},
  methods: {
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
  },
  data() {
    return {
      selected: null,
      options: [
        { value: null, text: 'Please select an option' },
        { value: 'a', text: 'This is First option' },
        { value: 'b', text: 'Selected Option' },
        { value: { C: '3PO' }, text: 'This is an option with object value' },
        { value: 'd', text: 'This one is disabled', disabled: true }
      ]
    }
  }
}
</script>

<style scoped src="../../assets/css/main.css"></style>
