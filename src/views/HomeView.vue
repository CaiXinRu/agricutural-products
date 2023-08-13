<template>
  <h1 class="logo"><a href="#">Product</a></h1>
  <div id="app" class="wrap">
    <div class="main rounded">
      <ButtonGroup @changeCropType="changeCropType" />
      <SearchGroup @searchCrop="searchCrop" v-model="searchText" />
      <div
        class="sort-content d-flex justify-content-md-between justify-content-center"
      >
        <p id="js-crop-name" class="show-result fw-bold">
          <span v-if="searchText">查看「{{ searchText }}」的比價結果</span>
        </p>
        <SelectGroup
          @sortDown="sortDown"
          :filteredList="filteredList"
          v-model="sortType"
        />
      </div>
      <TableGroup
        @sortDown="sortDown"
        @sortUp="sortUp"
        :filteredList="filteredList"
        :cropType="cropType"
        :searchText="searchText"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ButtonGroup from '@/components/ButtonGroup.vue'
import SearchGroup from '@/components/SearchGroup.vue'
import SelectGroup from '@/components/SelectGroup.vue'
import TableGroup from '@/components/TableGroup.vue'
export default {
  data () {
    return {
      data: [],
      cropType: '',
      searchText: '',
      sortType: '排序篩選',
      dataShown: [], // 透過pagination()分頁後的資料
      currentPage: 1 // 當前瀏覽第幾頁，預設第一頁
    }
  },
  components: {
    ButtonGroup,
    SearchGroup,
    SelectGroup,
    TableGroup
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    filteredList () {
      let filteredData = []
      if (this.cropType === '') {
        if (this.searchText.trim() === '') {
          return filteredData
        } else {
          // eslint-disable-next-line no-unused-vars
          filteredData = this.data.filter((item) =>
            item.作物名稱?.match(this.searchText.trim())
          )
          if (filteredData.length > 0) {
            return this.data.filter((item) =>
              item.作物名稱?.match(this.searchText.trim())
            )
            // eslint-disable-next-line eqeqeq
          } else if (filteredData.length == 0) {
            return filteredData
          }
        }
      } else {
        if (this.searchText.trim() === '') {
          return this.data.filter((item) => item.種類代碼 === this.cropType)
        } else {
          // eslint-disable-next-line no-unused-vars
          filteredData = this.data.filter((item) =>
            item.作物名稱?.match(this.searchText.trim())
          )
          if (filteredData.length > 0) {
            return this.data.filter(
              (item) =>
                item.種類代碼 === this.cropType &&
                item.作物名稱?.match(this.searchText.trim())
            )
            // eslint-disable-next-line eqeqeq
          } else if (filteredData.length == 0) {
            return filteredData
          }
        }
      }
    }
  },
  methods: {
    pigination (nowPage) {
      const dataTotal = this.filteredList.length
      const perPage = 20
      const pageTotal = Math.ceil(dataTotal / perPage)
      this.currentPage = nowPage
      if (this.currentPage > pageTotal) {
        this.currentPage = pageTotal
      }
      const minData = (this.currentPage - 1) * perPage
      const maxData = this.currentPage * perPage
      this.dataShown = this.filteredList.slice(minData, maxData)
    },
    changeCropType (type) {
      this.cropType = type
    },
    searchCrop () {
      if (this.searchText.trim() === '') {
        alert('請輸入作物名稱！')
      } else {
        this.searchText = ''
      }
    },
    sortUp (value) {
      this.data.sort((a, b) => b[value] - a[value])
    },
    sortDown (value) {
      this.data.sort((a, b) => a[value] - b[value])
    },
    fetchData () {
      axios
        .get('https://hexschool.github.io/js-filter-data/data.json')
        .then((res) => {
          this.data = res.data
        })
        .catch((err) => {
          console.error(err)
        })
    }
  },
  created () {
    this.fetchData()
  }
}
</script>

<style scoped>
.wrap {
  max-width: 1140px;
  margin: 0 auto;
}
.logo {
  background-color: #f4f1ea;
}
.logo a {
  display: block;
  background: url(https://firebasestorage.googleapis.com/v0/b/hexschool-courses.appspot.com/o/course%2FJS%20%E5%89%8D%E7%AB%AF%E4%BF%AE%E7%B7%B4%E5%85%A8%E6%94%BB%E7%95%A5%2F1628942714013-logo%20%E6%94%B9.png?alt=media&token=583e78ed-6a6c-4660-9f0e-2f59f8eb78e2)
    no-repeat;
  width: 450px;
  height: 120px;
  text-indent: 101%;
  overflow: hidden;
  cursor: pointer;
}
@media (max-width: 767px) {
  .logo a {
    background: url(https://firebasestorage.googleapis.com/v0/b/hexschool-courses.appspot.com/o/course%2FJS%20%E5%89%8D%E7%AB%AF%E4%BF%AE%E7%B7%B4%E5%85%A8%E6%94%BB%E7%95%A5%2F1629001163643-logo-sm.png?alt=media&token=914f40fc-c143-4aaa-a1c3-fb0bdd17fa9c)
      no-repeat;
    width: 178px;
    height: 50px;
    margin: 0 auto;
  }
}
.main {
  background: #fff;
  padding: 2.5rem;
}
@media (max-width: 767px) {
  .main {
    padding: 0.75rem;
  }
}

.show-result {
  font-size: 18px;
  letter-spacing: 1.12px;
}
.sort-content {
  margin-bottom: 1.25rem;
}
</style>
