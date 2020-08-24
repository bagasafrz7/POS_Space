<template>
  <!-- Modal Add -->
  <div>
    <b-modal ref="my-modal" hide-footer centered title="Add Item">
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
            v-show="!isUpdate"
            class="mt-3"
            variant="outline-warning"
            block
            @click="toggleModal"
          >Add</b-button>
          <b-button
            type="button"
            v-show="isUpdate"
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
</template>

<script>
export default {
  name: 'Modal'
}
</script>

<style scoped src="../../assets/css/main.css"></style>
