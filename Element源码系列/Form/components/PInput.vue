<template>
  <div>
    <input :type="type" v-bind="$attrs" @input="onInput">
  </div>
</template>

<script>
export default {
  name: 'PInput',

  inheritAttrs: false,

  inject: ['PFormItem'],

  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: String || Number
  },

  watch: {
    value() {
      this.PFormItem.$emit('p-form-item-change')
    }
  },

  data() {
    return {
      
    }
  },
  
  methods: {
    onInput(e) {
      this.$emit('input', e.target.value)
    }
  }
}
</script>

<style>

</style>