<template>
  <div class="main-cart">
    <b-row>
      <b-col cols="12" sm="12" md="12">
        <b-row class="text-center">
          <b-col cols="12" sm="12" md="12">
            <img
              alt="Restorant logo"
              src="../../assets/img/icon/food-and-restorant.png"
              width="200"
            />
            <h4>Your cart is empty</h4>
            <p>Please add some items from the menu</p>
          </b-col>
          <b-row class="detail-cart mt-4">
            <b-col cols="3">
              <img src="../../assets/img/food-menu/3_min.jpg" alt />
            </b-col>
            <b-col cols="6" class="detail-number">
              <h5>Product Name</h5>
              <b-button type="button" class="btn btn-secondary minus">-</b-button>
              <input type="text" class="number" id="number" value="1" disabled />
              <b-button type="button" class="btn btn-secondary plus">+</b-button>
            </b-col>
            <b-col cols="3">
              <h6>Product Price</h6>
            </b-col>
          </b-row>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'ContentCart'
}
</script>

<style scoped src="../../assets/css/main.css"></style>
