export default {
  data() {
    return {}
  },
  methods: {
    onReset() {
      this.form = {
        user_email: '',
        user_password: ''
      }
    },
    onResetReg() {
      this.form = {
        user_email: '',
        user_password: '',
        user_name: ''
      }
    }
  }
}
