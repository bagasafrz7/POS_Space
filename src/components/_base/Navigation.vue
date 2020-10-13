<template>
  <b-container fluid>
    <b-row>
      <b-col cols="12" sm="1" md="1">
        <nav class="nav">
          <router-link to="/" class="detail-link">
            <img alt="Fork logo" src="../../assets/img/icon/fork.png" />
          </router-link>
          <router-link to="/history" class="detail-link">
            <img
              alt="Clipboard logo"
              src="../../assets/img/icon/clipboard.png"
            />
          </router-link>
          <!-- <router-link to>
            <img alt="Add logo" src="../../assets/img/icon/add.png" @click="showModal" />
          </router-link>-->
          <router-link
            to="/manage-product"
            v-if="user.user_role === 1"
            class="detail-link"
          >
            <img alt="Add logo" src="../../assets/img/icon/od.png" />
          </router-link>
          <router-link
            to="/manage-category"
            v-if="user.user_role === 1"
            class="detail-link"
          >
            <img alt="Add logo" src="../../assets/img/icon/category.png" />
          </router-link>
          <router-link
            to="/manage-user"
            v-if="user.user_role === 1"
            class="detail-link"
          >
            <img alt="Add logo" src="../../assets/img/icon/group.png" />
          </router-link>
          <a class="logout detail-link" @click="$bvModal.show('modal-logout')">
            <img src="../../assets/img/icon/logout.png" alt />
          </a>
          <div class="detail-user">
            <h5>{{ user.user_name }}</h5>
          </div>
        </nav>
      </b-col>
    </b-row>
    <!-- Modal Logout -->
    <div>
      <b-modal id="modal-logout" centered>
        <template v-slot:modal-header="{ close }">
          <!-- Emulate built in modal header close button action -->
          <h5>Notice</h5>
          <b-button size="sm" variant="outline" @click="close()">X</b-button>
        </template>

        <h6>Are You Sure to Quit?</h6>

        <template v-slot:modal-footer="{ cancel }">
          <b-button size="sm" variant="success" @click="handleLogout()"
            >OK</b-button
          >
          <b-button size="sm" variant="danger" @click="cancel()"
            >Cancel</b-button
          >
        </template>
      </b-modal>
    </div>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Navigation',
  components: {},
  data() {
    return {
      alert: false
    }
  },
  computed: {
    ...mapGetters({ user: 'setUser' })
  },
  methods: {
    ...mapActions(['logout']),
    handleLogout() {
      this.$swal
        .fire({
          title: 'logout account ?',
          icon: 'warning',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: 'Cancel'
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$swal.fire('See you again!', '', 'success')
            this.logout()
          }
        })
    }
  }
}
</script>

<style scoped src="../../assets/css/main.css"></style>
