import axios from 'axios'

export default {
  state: {
    page: 1,
    limit: 9,
    sort: '',
    products: []
  },
  mutations: {
    setProduct(state, payload) {
      state.products = payload.data
      state.totalRows = payload.pagination.totalData
    },
    changePage(state, payload) {
      state.page = payload
    }
  },
  actions: {
    getProducts(context, payload) {
      axios
        .get(
          `http://127.0.0.1:3001/product?page=${context.state.page}&limit=${context.state.limit}&sort=${context.state.sort}`
        )
        .then((response) => {
          context.commit('setProduct', response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addProducts(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://127.0.0.1:3001/product', payload)
          .then(response => {
            // console.log(response)
            resolve(response.data)
          })
          .catch(error => {
            console.log(error.response)
            // reject(error.response)
          })
      })
    }
  },
  getters: {
    getLimit(state) {
      return state.limit
    },
    getPage(state) {
      return state.page
    },
    getSort(state) {
      return state.sort
    },
    getProduct(state) {
      return state.products
    }
  }
}
