<template>
  <div class="p-form-item">
    <label class="p-form-item__label" v-if="label">{{ label }}</label>
    <slot />
    <div class="p-form-item__error" v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator'

export default {
  name: 'PFormItem',

  provide() {
    return {
      PFormItem: this
    }
  },

  inject: ['PForm'], // 拿到PForm组件

  props: {
    label: String,
    prop: String
  },

  data() {
    return {
      error: '',
      validateDisabled: false
    }
  },

  computed: {
    // 拿到 PForm 中的 model
    model() {
      return this.PForm.model || {}
    },
    // 拿到 PForm 中的 rules
    rules() {
      if (this.PForm.rules && this.PForm.rules[this.prop]) {
        return this.PForm.rules[this.prop]
      }
      return []
    }
  },

  methods: {
    // 执行校验
    validate(trigger, callback) {
      if (this.prop) {
        const rules = this.getFilterRules(trigger)

        // 首先创建一个AsyncValidator实例，它接收一个对象为参数: { '字段名': [验证规则: Object | Array] }
        const description = {}

        if (rules && rules.length > 0) {
          rules.forEach(rule => {
            delete rule.trigger
          })
        }
        description[this.prop] = rules
        const validator = new AsyncValidator(description)

        // 它的实例上面有个用来执行校验的方法: validate.
        const model = {}
        model[this.prop] = this.PForm.model[this.prop]
        validator.validate(model, { firstFields: true }, (errors, invalidField) => {
          if (errors) {
            this.error = errors[0].message
          } else {
            this.error = ''
          }
          callback && callback(this.error, invalidField)
        })
      }
    },
    onFieldChange() { // 实时监听验证
      if (this.validateDisabled) {
        this.validateDisabled = false
        return
      }

      this.validate('change')
    },
    getFilterRules(trigger) { // 根据 trigger 过虑验证方式
      return this.rules.filter(rule => {

        if (!rule.trigger || trigger === '') {
          return true
        }
        if (Array.isArray(rule.trigger)) {
          return rule.trigger.indexOf(trigger) > -1
        } else {
          return rule.trigger === trigger
        }
      })
    }
  },

  mounted() {
    // 检查添加 prop 的需要校验
    if (this.prop) {
      this.PForm.$emit('p-form-addField', this)
      this.$on('p-form-item-change', this.onFieldChange)
    }
  },

  beforeDestroy() {
    // 此组件如果卸载了, 就删除校验
    this.PForm.$emit('p-form-removeField', this)
  }
}
</script>

<style>
.p-form-item__label {
  margin-right: 5px;
}
.p-form-item__error {
  font-size: 12px;
  color: red;
}
</style>