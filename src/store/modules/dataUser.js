import axios from 'axios'

export default {
  state: {
    search: '',
    totalPage: '',
    page: 1,
    limit: 9,
    sort: '',
    dataUsers: []
  },
  mutations: {
    setDataUser(state, payload) {
      state.dataUsers = payload.data
      state.totalPage = payload.pagination.totalData
    },
    changePage(state, payload) {
      state.page = payload
    }
  },
  actions: {
    getDataUsers(context, payload) {
      axios
        .get(
          `${process.env.VUE_APP_URL}users?page=${context.state.page}&limit=${context.state.limit}&sort=${context.state.sort}`
        )
        .then((response) => {
          console.log(response.data)
          context.commit('setDataUser', response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateDataUsers(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch(`${process.env.VUE_APP_URL}users/${payload.user_id}`, payload.form)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response)
          })
      })
    },
    deleteDataUsers(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`${process.env.VUE_APP_URL}users/${payload}`)
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
    getSort(state) {
      return state.sort
    },
    getData(state) {
      return state.dataUsers
    },
    getTotalPage(state) {
      return state.totalPage
    }
  }
}
