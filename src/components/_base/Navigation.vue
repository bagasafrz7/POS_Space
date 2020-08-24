<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" sm="1" md="1">
        <nav class="nav">
          <router-link to="/home-select">
            <img alt="History logo" src="../../assets/img/icon/fork.png" />
          </router-link>
          <router-link to="/history">
            <img alt="History logo" src="../../assets/img/icon/clipboard.png" />
          </router-link>
          <router-link to>
            <img alt="History logo" src="../../assets/img/icon/add.png" @click="showModal" />
          </router-link>
        </nav>
      </b-col>
    </b-row>
    <Modal />
  </b-container>
</template>

<script>
import Modal from './Modal'
export default {
  name: 'Navigation',
  components: {
    Modal
  }
}
</script>

<style scoped src="../../assets/css/main.css"></style>
