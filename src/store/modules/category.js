import axios from 'axios'

export default {
  state: {
    search: '',
    totalPage: '',
    page: 1,
    limit: 9,
    sort: '',
    categorys: []
  },
  mutations: {
    setCategory(state, payload) {
      state.categorys = payload.data
      state.totalPage = payload.pagination.totalData
    },
    changePage(state, payload) {
      state.page = payload
    },
    sortCategory(state, payload) {
      state.sort = payload
    }
  },
  actions: {
    getCategorys(context, payload) {
      axios
        .get(`${process.env.VUE_APP_URL}category?page=${context.state.page}&limit=${context.state.limit}&sort=${context.state.sort}`)
        .then((response) => {
          context.commit('setCategory', response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addCategorys(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.VUE_APP_URL}category`, payload)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    updateCategorys(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`${process.env.VUE_APP_URL}category/${payload.category_id}`, payload.form)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    deleteCategorys(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${process.env.VUE_APP_URL}category/${payload}`)
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
    getSortCategory(state) {
      return state.sort
    },
    getCategory(state) {
      return state.categorys
    },
    getTotalPage(state) {
      return state.totalPage
    }
  }
}
