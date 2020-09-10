export default {
  state: {
    totalPage: '',
    page: 1,
    limit: 9,
    sort: '',
    search: '',
    categorys: []
  },
  mutations: {
    setCategory(state, payload) {
      state.categorys = payload.data
      state.totalPage = payload.pagination.totalData
    },
    changePage(state, payload) {
      state.page = payload
    }
  },
  actions: '',
  getters: ''
}
