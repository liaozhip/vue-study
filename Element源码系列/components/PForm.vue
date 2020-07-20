<template>
  <div class="p-form">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'PForm',

  provide() {
    return {
      PForm: this
    }
  },

  props: {
    model: Object,
    rules: Object
  },

  data() {
    return {
      fields: []
    }
  },

  created() {
    this.$on('p-form-addField', (field) => {
      if (field) {
        this.fields.push(field)
      }
    })

    this.$on('p-form-removeField', (field) => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1)
      }
    })
  },

  methods: {
    validate(callback) { // 执行所有校验
      if (!this.model) {
        console.warn('model is required for validate to work!')
        return
      }

      let promise
      if (typeof callback !== 'function' && window.Promise) {
        promise = new window.Promise((resolve, reject) => {
          callback = function(valid) {
            valid ? resolve(valid) : reject(valid)
          }
        })
      }

      let valid = true
      let count = 0

      if (this.fields.length === 0 && callback) {
        callback(true)
      }

      const invalidFields = {}
      this.fields.forEach(field => {
        field.validate('', (error, field) => {
          if (error) {
            valid = false
          }

          Object.assign({}, invalidFields, field)

          if (typeof callback === 'function' && ++count === this.fields.length) {
            callback(valid, invalidFields)
          }
        })
      })

      if(promise) {
        return promise
      }
    }
  }
}
</script>

<style>

</style>