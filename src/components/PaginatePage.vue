<template>
  <div>
    <button
      type="button"
      :data-page="currentPage - 1"
      @click="emitSwitchPage"
      :disabled="currentPage <= 1"
      :class="{ disabled: currentPage <= 1, btn: true }"
    >
      上一頁
    </button>
    <button
      type="button"
      v-for="page in pageTotal"
      :key="page"
      :data-page="page"
      @click="emitSwitchPage"
      :class="currentPage === page ? 'active': 'normal'"
    >
      {{ page }}
    </button>
    <button
      type="button"
      :data-page="currentPage + 1"
      @click="emitSwitchPage"
      :disabled="currentPage == pageTotal || dataShown.length == 0"
      :class="{ disabled: currentPage == pageTotal || dataShown.length == 0, btn: true }"
    >
      下一頁
    </button>
  </div>
</template>

<script scope>
export default {
  props: ['pageTotal', 'currentPage', 'dataShown'],
  emits: ['emit-switch'],
  methods: {
    emitSwitchPage (e) {
      const switchPage = parseInt(e.target.dataset.page)
      this.$emit('emit-switch', switchPage)
    }
  }
}
</script>

<style scoped>
.disabled {
  background-color: white;
  color: gray;
  border: solid 1px grey;
}
.normal {
  background-color: #889d39;
  color: #f3f1ea;
  border: solid 2px #889c39;
}
.normal:hover {
    background-color: #f8ae5a;
    color: #f3f1ea;
    border: solid 2px #889c39;
}
.active {
    background-color: #f8d45b;
    color: #000;
    border: solid 2px #889c39;
}
.btn {
    background-color: #889c39;
    color: #f3f1ea;
    border: solid 5px #f8d45b;
}
.btn:hover {
    background-color: #f8ae5a;
    color: #f3f1ea;
    border: solid 5px #889c39;
}
</style>
