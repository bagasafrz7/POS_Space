import axios from 'axios'
import router from '../../router/index'

export default ({
  state: {
    msg: '',
    user: {},
    token: localStorage.getItem('token') || null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      state.token = payload.token
    },
    delUser(state) {
      state.user = {}
      state.token = null
    },
    msg(state, payload) {
      state.msg = payload.msg
    }
  },
  actions: {
    login(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3001/users/login', payload)
          .then(response => {
            console.log(response)
            context.commit('setUser', response.data.data)
            localStorage.setItem('token', response.data.data.token)
            resolve(response.data)
            console.log(response.data.data.msg)
          }).catch(error => {
            // console.log(error)
            reject(error.response)
          })
      })
    },
    logout(context) {
      localStorage.removeItem('token')
      context.commit('delUser')
      router.push('/login')
    },
    addUsers(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3001/users/register', payload)
          .then(response => {
            // console.log(response)
            resolve(response.data)
            context.commit('Msg', response.msg)
            // this.makeToast('Msg', response.data.msg)
            router.push('/login')
          })
          .catch(error => {
            console.log(error.response)
            // reject(error.response)
          })
      })
    },
    interceptorRequest(context) {
      console.log('interceptor Works')
      // Add a request interceptor
      axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${context.state.token}`
        // Do something before request is sent
        return config
      }, function (error) {
        // Do something with request error
        return Promise.reject(error)
      })
    },
    interceptorResponse(context) {
      axios.interceptors.response.use(function (response) {
        return response
      }, function (error) {
        console.log(error.response)
        console.log(error.response.data.msg)
        if (error.response.status === 403) {
          if (error.response.data.msg === 'invalid token' || error.response.data.msg === 'invalid signature') {
            localStorage.removeItem('token')
            context.commit('delUser')
            router.push('/login')
            alert('Maaf Token anda salah dan tidak bisa melanjutkan dihalaman ini!')
          } else if (error.response.data.msg === 'jwt expired') {
            localStorage.removeItem('token')
            context.commit('delUser')
            router.push('/login')
            alert('Maaf Token session anda telah habis')
          }
        } else if (error.response.status === 400) {
          alert(`${error.response.data.msg}`)
        }
        return Promise.reject(error)
      })
    }
  },
  getters: {
    isLogin(state) {
      return state.token !== null
    }
  }
})
