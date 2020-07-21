<template>
  <transition name="p-notification-fade">
    <div
      :class="['p-notification', horizontalClass]"
      :style="positionStyle"
      v-show="visible"
    >
      <p>{{ message }}</p>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PNotification',

  data() {
    return {
      position: 'top-right',
      message: '',
      visible: false,
      closed: false,
      onClose: null,
      duration: 4500,
      timer: null,
      verticalOffset: 0
    }
  },

  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false
        this.$el.addEventListener('transitionend', this.destroyElement)
      }
    }
  },

  computed: {
    horizontalClass() {
      return this.position.indexOf('right') > -1 ? 'right' : 'left'
    },

    verticalProperty() {
      return /^top-/.test(this.position) ? 'top' : 'bottom'
    },

    positionStyle() {
      return {
        [this.verticalProperty]: `${this.verticalOffset}px`
      }
    }
  },

  methods: {
    destroyElement() {
      this.$el.removeEventListener('transitionend', this.destroyElement)
      this.$destroy(true)
      this.$el.parentElement.removeChild(this.$el)
    },

    close() {
      this.closed = true
      if (typeof this.onClose === 'function') {
        this.onClose()
      }
    }
  },

  mounted() {
    if (this.duration > 0) {
      this.timer = setTimeout(() => {
        if (!this.closed) {
          this.close()
        }
      }, this.duration)
    }
  }
}
</script>

<style>
.p-notification {
  position: fixed;
  padding: 12px;
  width: 300px;
  box-sizing: border-box;
  border: 1px solid #eee;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: -1px 1px 5px #ddd;
  top: 16px;
  transition: opacity .3s, transform .3s, left .3s, right .3s, top 0.4s, bottom .3s;
}
.p-notification.left {
  left: 16px;
}
.p-notification.right {
  right: 16px;
}

.p-notification-fade-enter.right {
  right: 0;
  transform: translateX(100%);
}
.p-notification-fade-enter.left {
  left: 0;
  transform: translateX(-100%);
}

.p-notification-fade-leave-active {
  opacity: 0;
}
</style>