<template>
  <div class="button-group d-flex justify-content-center">
    <button
      v-for="button in buttons"
      :key="button.code"
      :data-type="button.code"
      type="button"
      :class="[
        'btn-type',
        'btn',
        'border-dark',
        'border-2',
        { active: button.isActive }
      ]"
      @click="changeCropType(button.code)"
    >
      {{ button.label }}
    </button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      buttons: [
        { code: 'N04', label: '蔬果', isActive: false },
        { code: 'N05', label: '水果', isActive: false },
        { code: 'N06', label: '花卉', isActive: false }
      ]
    }
  },
  emits: ['changeCropType'],
  methods: {
    changeCropType (type) {
      this.$emit('changeCropType', type)
      // eslint-disable-next-line no-return-assign
      this.buttons.forEach((item) => (item.isActive = false))
      if (type === 'N04') {
        this.buttons[0].isActive = true
      } else if (type === 'N05') {
        this.buttons[1].isActive = true
      } else if (type === 'N06') {
        this.buttons[2].isActive = true
      }
    }
  }
}
</script>

<style scoped>
.active {
  background: #f8d45a;
}
.btn-type {
  padding: 0.5rem 2.5rem;
  color: #2a2a2a;
  letter-spacing: 1px;
  margin: 0 0.625rem 1.25rem 0;
}
.btn-type:hover{
  background: #f8ae5a;
}
.btn-type:active {
  background: #f8d45a;
}
</style>
