<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col cols="12" md="7" sm="7" class="left-register">
          <img src="../../assets/img/food-menu/space-icon2.png" alt />
        </b-col>
        <b-col cols="12" md="5" sm="5" class="right-register">
          <div class="access-link">
            <router-link to="/login">Login</router-link>
            <router-link to="/register">Registration</router-link>
          </div>
          <h3>Welcome</h3>
          <h6>Registration for your account</h6>
          <b-form @submit.prevent="postUser" @reset.prevent="onReset">
            <b-form-group id="input-group-1" label="Email Address:" label-for="input-1">
              <input type="email" v-model="form.user_email" required placeholder="Input Email" />
            </b-form-group>

            <b-form-group id="input-group-1" label="Password:" label-for="input-1">
              <input
                type="password"
                v-model="form.user_password"
                required
                placeholder="Input Password"
              />
            </b-form-group>

            <b-form-group id="input-group-1" label="Username:" label-for="input-1">
              <input type="text" v-model="form.user_name" required placeholder="Input Username" />
            </b-form-group>

            <button type="submit" class="btn-submit">Sign Up</button>
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
export default {
  name: 'Register',
  data() {
    return {
      inMsg: '',
      form: {
        user_email: '',
        user_password: '',
        user_name: ''
      }
    }
  },
  methods: {
    ...mapActions(['addUsers']),
    makeToast(variant = '') {
      this.$bvToast.toast(`${this.inMsg}`, {
        title: `Notice! ${'' || ''}`,
        variant: variant,
        solid: true
      })
    },
    postUser() {
      this.addUsers(this.form)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          // this.inMsg = error.data
          // this.makeToast(this.inMsg)
          console.log(error)
        })
    },
    onReset() {
      this.form = {
        user_email: '',
        user_password: '',
        user_name: ''
      }
    }
  }
}
</script>

<style scoped>
.left-register {
  /* background: orange; */
  background: url('../../assets/img/food-menu/img-register.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.left-register img {
  /* line-height: 150px; */
  /* margin: 50px 0 0 150px; */
  display: block;
  margin: 0 auto;
}

.right-register {
  padding: 50px 100px;
}

.right-register .access-link {
  margin: 10px 0 50px 0;
}

.right-register .access-link a {
  margin: 0 15px;
  color: rgb(54, 54, 54);
}

.right-register h3 {
  font-size: 36px;
  font-weight: bold;
}

.right-register h6 {
  font-size: 16px;
  color: rgb(117, 116, 116);
  font-weight: normal;
  margin-bottom: 50px;
}

.right-register form input {
  border: none;
  border-bottom: 1px solid rgb(207, 207, 207);
  width: 75%;
  margin: 15px 0;
  padding: 10px;
  transition: 0.8s ease-in-out;
  outline: none;
}

.right-register form input:hover {
  border-bottom: 1px solid black;
}

.right-register .btn-submit {
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

.right-register .btn-submit:hover {
  border: 1px solid rgb(184, 120, 3);
  background: rgb(184, 120, 3);
}

.right-register .btn-reset {
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

.right-register .btn-reset:hover {
  border: 1px solid rgb(204, 56, 2);
  background: rgb(204, 56, 2);
}

.right-register p {
  margin: 50px 0 60px 0;
  text-align: center;
  color: rgb(117, 116, 116);
}
</style>
