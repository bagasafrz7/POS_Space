import axios from 'axios'

export default {
  state: {
    search: '',
    totalPage: '',
    page: 1,
    limit: 9,
    sort: '',
    products: []
  },
  mutations: {
    setProduct(state, payload) {
      state.products = payload.data
      state.totalPage = payload.pagination.totalData
    },
    changePage(state, payload) {
      state.page = payload
    },
    sortProduct(state, payload) {
      state.sort = payload
    }
  },
  actions: {
    getProducts(context, payload) {
      axios
        .get(
          `${process.env.VUE_APP_URL}product?page=${context.state.page}&limit=${context.state.limit}&sort=${context.state.sort}`
        )
        .then((response) => {
          console.log(response.data)
          context.commit('setProduct', response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addProducts(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}product`, payload)
          .then(response => {
            // console.log(response)
            resolve(response.data)
          })
          .catch(error => {
            // console.log(error.response)
            reject(error.response)
          })
      })
    },
    updateProducts(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`${process.env.VUE_APP_URL}product/${payload.product_id}`, payload.form)
          .then(response => {
            // console.log(response)
            resolve(response.data)
          })
          .catch(error => {
            // console.log(error.response)
            reject(error.response)
          })
      })
    },
    deleteProducts(context, payload) {
      // console.log(payload)
      return new Promise((resolve, reject) => {
        axios
          .delete(`${process.env.VUE_APP_URL}product/${payload}`)
          .then((response) => {
            resolve(response.data)
          })
          .catch((error) => {
            reject(error.response)
          })
      })
    }
  },
  getters: {
    getSearch(state) {
      return state.search
    },
    getLimit(state) {
      return state.limit
    },
    getPage(state) {
      return state.page
    },
    getSortProduct(state) {
      return state.sort
    },
    getProduct(state) {
      return state.products
    },
    getTotalPage(state) {
      return state.totalPage
    }
  }
}
