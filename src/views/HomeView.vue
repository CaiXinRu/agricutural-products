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
        :filteredList="dataShown"
        :cropType="cropType"
        :searchText="searchText"
      />
      <!-- <PaginatePage :page-total="pageTotal" :current-page="currentPage" @emit-switch="pagination" :dataShown="dataShown"/> -->
      <div class="pagination" v-if="filteredList.length">
        <el-pagination background layout="prev, pager, next" :total="filteredList.length" :page-size="perPage" v-model:current-page="currentPage"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ButtonGroup from '@/components/ButtonGroup.vue'
import SearchGroup from '@/components/SearchGroup.vue'
import SelectGroup from '@/components/SelectGroup.vue'
import TableGroup from '@/components/TableGroup.vue'
import { ElPagination } from 'element-plus'
// import PaginatePage from '@/components/PaginatePage.vue'

export default {
  data () {
    return {
      data: [],
      cropType: '',
      searchText: '',
      sortType: '排序篩選',
      dataShown: [], // 透過pagination()分頁後的資料
      currentPage: 1, // 當前瀏覽第幾頁，預設第一頁
      pageTotal: 0, // 原始資料總共分為幾頁，先預設有0頁
      perPage: 20
    }
  },
  components: {
    ButtonGroup,
    SearchGroup,
    SelectGroup,
    TableGroup,
    ElPagination
    // PaginatePage
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    filteredList () {
      let filteredData = []
      if (this.cropType === '') {
        if (this.searchText.trim() === '') {
          return filteredData
        } else {
          filteredData = this.data.filter((item) =>
            item.作物名稱?.match(this.searchText.trim())
          )
          if (filteredData.length > 0) {
            return this.data.filter((item) =>
              item.作物名稱?.match(this.searchText.trim())
            )
          } else if (filteredData.length === 0) {
            return filteredData
          }
        }
      } else {
        if (this.searchText.trim() === '') {
          return this.data.filter((item) => item.種類代碼 === this.cropType)
        } else {
          filteredData = this.data.filter((item) =>
            item.作物名稱?.match(this.searchText.trim())
          )
          if (filteredData.length > 0) {
            return this.data.filter(
              (item) =>
                item.種類代碼 === this.cropType &&
                item.作物名稱?.match(this.searchText.trim())
            )
          } else if (filteredData.length === 0) {
            return filteredData
          }
        }
      }
    }
  },
  methods: {
    changeCropType (type) {
      this.cropType = type
      this.pagination(1)
    },
    searchCrop () {
      if (this.searchText.trim() === '') {
        alert('請輸入作物名稱！')
      } else {
        this.searchText = ''
      }
      this.pagination(1)
      console.log('searchCrop')
    },
    sortUp (value) {
      this.filteredList.sort((a, b) => b[value] - a[value])
      this.pagination(1)
    },
    sortDown (value) {
      this.filteredList.sort((a, b) => a[value] - b[value])
      this.pagination(1)
      console.log(this.dataShown)
      console.log(this.filteredList)
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
    },
    pagination (nowPage) {
      const dataTotal = this.filteredList.length
      this.pageTotal = Math.ceil(dataTotal / this.perPage)
      this.currentPage = nowPage
      if (this.currentPage > this.pageTotal) {
        this.currentPage = this.pageTotal
      }
      const minData = (this.currentPage - 1) * this.perPage
      const maxData = (this.currentPage * this.perPage)
      this.dataShown = this.filteredList.slice(minData, maxData)
    }
  },
  watch: {
    filteredList () {
      this.pagination(1)
    },
    currentPage () {
      this.pagination(this.currentPage)
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
.pagination{
  display: flex;
  justify-content: center;
  --el-color-primary: #f8d45b;
  --el-fill-color: #889d39;
  --el-text-color-primary: #ffffff;
  --el-disabled-bg-color: #f3f1ea;
}
</style>
