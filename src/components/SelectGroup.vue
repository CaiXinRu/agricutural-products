<template>
    <select
        v-model="sortType"
        class="sort-select mobile-select border-secondary d-none d-md-block rounded p-2 pe-4"
        @change="sortDown(sortType)"
        :disabled="filteredList.length === 0"
    >
        <option>排序篩選</option>
        <option value="上價">依上價排序</option>
        <option value="中價">依中價排序</option>
        <option value="下價">依下價排序</option>
        <option value="平均價">依平均價排序</option>
        <option value="交易量">依交易量排序</option>
    </select>
</template>

<script>
export default {
  props: {
    modelValue: String,
    filteredList: Array
  },
  emits: ['sortDown'],
  data () {
    return {
      sortType: this.modelValue
    }
  },
  methods: {
    sortDown (value) {
      this.$emit('sortDown', value)
    }
  }

}
</script>

<style scoped>
.sort-select {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url('data:image/svg+xml;utf8,<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sort-down" class="svg-inline--fa fa-sort-down fa-w-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="10 0 320 900"><path fill="currentColor" d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path></svg>')
    no-repeat;
  background-position: 105px 5px;
  cursor: pointer;
}

/* @media (max-width: 767px) {
  .mobile-select {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: url('data:image/svg+xml;utf8,<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sort-down" class="svg-inline--fa fa-sort-down fa-w-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="10 0 320 800"><path fill="currentColor" d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path></svg>')
      no-repeat;
    background-position: 60px 3px;
  }
} */
</style>
