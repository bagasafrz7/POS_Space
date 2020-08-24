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
            <h4 v-show="!isUpdate">Your cart is empty</h4>
            <p>Please add some items from the menu</p>
          </b-col>
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
