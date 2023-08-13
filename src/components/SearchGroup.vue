<template>
  <div class="search-group d-flex flex-column flex-md-row">
    <div class="crop-input d-flex mb-2">
      <label class="rounded-start text-white" for="crop">作物名稱</label>
      <input
        class="rounded-end"
        type="text"
        placeholder="請輸入作物名稱"
        id="crop"
        name="crop"
        v-model="searchText"
      />
    </div>
    <button
      type="button"
      class="search text-white btn mb-2"
      @click="searchCrop"
    >
      清空搜尋
    </button>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String
  },
  emits: ['searchCrop', 'update:modelValue'],
  data () {
    return {
      searchText: this.modelValue
    }
  },
  watch: {
    searchText (newText) {
      this.$emit('update:modelValue', newText)
    },
    modelValue () {
      if (this.modelValue === '') {
        this.searchText = ''
      }
    }
  },
  methods: {
    searchCrop () {
      this.$emit('searchCrop')
    }
  }
}
</script>

<style>
.search-group {
  white-space: nowrap;
  margin-bottom: 2.5rem;
  width: 100%;
}
.date-input,
.crop-input {
  width: 40.625%;
}

.date-input label,
.crop-input label {
  background: #899e39;
  padding: 0.5rem 1rem;
  width: 27.5%;
}
.date-input input,
.crop-input input {
  width: 80%;
  border: 2px #899e39 solid;
  padding: 0.375rem;
  margin-left: -0.3125rem;
}
.search, .search:hover {
  width: 16.39%;
  background: #899e39;
  padding: 0.5rem 3.375rem;
  margin-left: 0.5rem
}
@media (max-width: 767px) {
  .search-group {
    margin-bottom: 1.5rem;
    align-items: center;
  }
  .date-input,
  .crop-input {
    width: 100%;
  }
  .search {
    width: 100%;
    padding: 0;
    margin-left: 0
  }
}
</style>
