// const noop = () => {}

export default {
  name: 'RouterLink',

  props: {
    to: {
      type: String,
      required: true
    }
  },

  render(h) {
    const data = {
      on: {
        'click': () => {
          this.$router.push(this.to)
        }
      }
    }

    return h('a', data, this.$slots.default)
  }
}
