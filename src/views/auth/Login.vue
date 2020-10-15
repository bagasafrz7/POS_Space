<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col cols="12" md="7" sm="7" class="left-login">
          <img src="../../assets/img/food-menu/space-icon2.png" alt />
        </b-col>
        <b-col cols="12" md="5" sm="5" class="right-login">
          <div class="access-link">
            <router-link to="/login">Login</router-link>
            <router-link to="/register">Registration</router-link>
          </div>
          <h3>Welcome</h3>
          <h6 v-fontsize="16">Please login to your account</h6>
          <b-form @submit.prevent="onSubmit" @reset.prevent="onReset">
            <b-form-group
              id="input-group-1"
              label="Email Address:"
              label-for="input-1"
            >
              <input
                type="email"
                v-model="form.user_email"
                required
                placeholder="Input Email"
              />
            </b-form-group>

            <b-form-group
              id="input-group-1"
              label="Password:"
              label-for="input-1"
            >
              <input
                type="password"
                v-model="form.user_password"
                required
                placeholder="Input Password"
              />
            </b-form-group>

            <button type="submit" class="btn-submit">Sign In</button>
            <button type="reset" class="btn-reset">Reset</button>
          </b-form>
          <p>Terms and conditions & Privacy Policy</p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import mixins from '../../mixins/mixins'
export default {
  name: 'Login',
  mixins: [mixins],
  computed: {},
  data() {
    return {
      form: {
        user_email: '',
        user_password: ''
      }
    }
  },
  directives: {
    fontsize: {
      bind: function (el, binding) {
        // console.log(binding.expression)
        el.style.fontSize = binding.expression + 'px'
      }
    }
  },
  methods: {
    ...mapActions(['login']),
    makeToast(variant = '') {
      this.$bvToast.toast(`${this.inMsg}`, {
        title: `Notice! ${'' || ''}`,
        variant: variant,
        solid: true
      })
    },
    onSubmit() {
      // console.log(this.form)
      this.login(this.form)
        .then((result) => {
          this.$swal.fire({
            position: 'center',
            icon: 'success',
            title: result.msg,
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(() => {
            this.$router.push('/')
          }, 1000)
        })
        .catch((error) => {
          this.$swal.fire({
            position: 'center',
            icon: 'error',
            title: error.data.msg,
            showConfirmButton: false,
            timer: 1500
          })
        })
    }
    // onReset() {
    //   this.form = {
    //     user_email: '',
    //     user_password: ''
    //   }
    // }
  }
}
</script>

<style scoped>
.left-login {
  /* background: orange; */
  background: url('../../assets/img/food-menu/img-login.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.left-login img {
  /* line-height: 150px; */
  /* margin: 50px 0 0 150px; */
  display: block;
  margin: 0 auto;
}

.right-login {
  padding: 50px 100px;
}

.right-login .access-link {
  margin: 10px 0 50px 0;
}

.right-login .access-link a {
  margin: 0 15px;
  color: rgb(54, 54, 54);
}

.right-login h3 {
  font-size: 36px;
  font-weight: bold;
}

.right-login h6 {
  /* font-size: 16px; */
  color: rgb(117, 116, 116);
  font-weight: normal;
  margin-bottom: 50px;
}

.right-login form input {
  border: none;
  border-bottom: 1px solid rgb(207, 207, 207);
  width: 75%;
  margin: 15px 0;
  padding: 10px;
  transition: 0.8s ease-in-out;
  outline: none;
}

.right-login form input:hover {
  border-bottom: 1px solid black;
}

.right-login .btn-submit {
  border: none;
  border: 1px solid orange;
  border-radius: 25px;
  padding: 10px 15px;
  background: orange;
  width: 40%;
  margin: 5px;
  color: #fff;
  transition: 0.8s ease-in-out;
  outline: none;
}

.right-login .btn-submit:hover {
  border: 1px solid rgb(184, 120, 3);
  background: rgb(184, 120, 3);
}

.right-login .btn-reset {
  border: none;
  border: 1px solid orangered;
  border-radius: 25px;
  padding: 10px 15px;
  background: orangered;
  width: 40%;
  margin: 5px;
  color: #fff;
  transition: 0.8s ease-in-out;
  outline: none;
}

.right-login .btn-reset:hover {
  border: 1px solid rgb(204, 56, 2);
  background: rgb(204, 56, 2);
}

.right-login p {
  margin: 50px 0 60px 0;
  text-align: center;
  color: rgb(117, 116, 116);
}
</style>
