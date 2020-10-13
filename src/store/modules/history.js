import axios from 'axios'

export default {
  state: {
    chartData: []
  },
  mutations: {
    setChart(state, payload) {
      state.chartData = payload
      console.log(payload)
    }
  },
  actions: {
    chart(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .get(`${process.env.VUE_APP_URL}history/chart`)
          .then(response => {
            const chartKick = response.data.data
            const charts = []
            chartKick.map(value => {
              charts.push([value.date.slice(0, 10), value.total])
            })
            context.commit('setChart', charts)
          })
          .catch(err => {
            console.lo(err)
          })
      })
    }
  },
  getters: {
    chartsData(state) {
      return state.chartData
    }
  }
}
