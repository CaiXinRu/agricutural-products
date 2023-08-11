<template>
  <h1 class="logo"><a href="#">Product</a></h1>
  <div id="app" class="wrap">
    <div class="main rounded">
      <div class="button-group d-flex justify-content-center">
        <button
          v-for="button in buttons"
          :key="button.code"
          :data-type="button.code"
          type="button"
          :class="['btn-type', 'btn', 'border-dark', 'border-2', {'active': button.isActive}]"
          @click="changeCropType(button.code)"
        >
          {{ button.label }}
        </button>
      </div>
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
          搜尋
        </button>
      </div>
      <div
        class="sort-content d-flex justify-content-md-between justify-content-center"
      >
        <p id="js-crop-name" class="show-result fw-bold"><span v-if="searchText">查看「{{searchText}}」的比價結果</span></p>
        <select
          v-model="sortType"
          class="sort-select border-secondary d-none d-md-block rounded p-2 pe-4"
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
      </div>
      <table class="market table me-4">
        <thead class="js-sort-advanced">
          <tr>
            <th width="15%">作物名稱</th>
            <th width="15%">市場名稱</th>
            <th width="14%">
              <div class="inline-flex sort-advanced">
                上價
                <span>
                  <font-awesome-icon
                  @click="sortUp('上價')"
                  :class="{'fa-caret-up':true, 'display-none': filteredList.length === 0}"
                  icon="fa-solid fa-caret-up" />
                  <font-awesome-icon
                  data-price="上價"
                  @click="sortDown('上價')"
                  :class="{'fa-caret-down': true, 'display-none': filteredList.length === 0}"
                  icon="fa-solid fa-caret-down" />
                </span>
              </div>
            </th>
            <th width="14%">
              <div class="inline-flex sort-advanced">
                中價
                <span>
                  <font-awesome-icon
                  data-price="中價"
                  @click="sortUp('中價')"
                  :class="{'fa-caret-up':true, 'display-none': filteredList.length === 0}"
                  icon="fa-solid fa-caret-up" />
                  <font-awesome-icon
                  data-price="中價"
                  @click="sortDown('中價')"
                  :class="{'fa-caret-down': true, 'display-none': filteredList.length === 0}"
                  icon="fa-solid fa-caret-down" />
                </span>
              </div>
            </th>
            <th width="14%">
              <div class="inline-flex sort-advanced">
                下價
                <span>
                  <font-awesome-icon
                  data-price="下價"
                  @click="sortUp('下價')"
                  :class="{'fa-caret-up':true, 'display-none': filteredList.length === 0}"
                  icon="fa-solid fa-caret-up" />
                  <font-awesome-icon
                  data-price="下價"
                  @click="sortDown('下價')"
                  :class="{'fa-caret-down': true, 'display-none': filteredList.length === 0}"
                  icon="fa-solid fa-caret-down" />
                </span>
              </div>
            </th>
            <th width="14%">
              <div class="inline-flex sort-advanced">
                平均價
                <span>
                  <font-awesome-icon
                  data-price="平均價"
                  @click="sortUp('平均價')"
                  :class="{'fa-caret-up':true, 'display-none': filteredList.length === 0}"
                  icon="fa-solid fa-caret-up" />
                  <font-awesome-icon
                  data-price="平均價"
                  @click="sortDown('平均價')"
                  :class="{'fa-caret-down': true, 'display-none': filteredList.length === 0}"
                  icon="fa-solid fa-caret-down" />
                </span>
              </div>
            </th>
            <th width="14%">
              <div class="inline-flex sort-advanced">
                交易量
                <span>
                  <font-awesome-icon
                  data-price="交易量"
                  @click="sortUp('交易量')"
                  :class="{'fa-caret-up':true, 'display-none': filteredList.length === 0}"
                  icon="fa-solid fa-caret-up" />
                  <font-awesome-icon
                  data-price="交易量"
                  @click="sortDown('交易量')"
                  :class="{'fa-caret-down': true, 'display-none': filteredList.length === 0}"
                  icon="fa-solid fa-caret-down" />
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="showList">
          <tr v-if="cropType==='' && searchText==''">
            <td colspan="7" class="text-center p-3">
              請輸入並搜尋想比價的作物名稱^＿^
            </td>
          </tr>
          <tr v-else-if="filteredList.length === 0">
            <td colspan="7" class="text-center p-3">
              查詢不到交易資訊QQ
            </td>
          </tr>
          <tr v-else v-for="(item, index) in filteredList" :key="index">
            <td>{{ item.作物名稱 }}</td>
            <td>{{ item.市場名稱 }}</td>
            <td>{{ item.上價 }}</td>
            <td>{{ item.中價 }}</td>
            <td>{{ item.下價 }}</td>
            <td>{{ item.平均價 }}</td>
            <td>{{ item.交易量 }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      data: [],
      cropType: '',
      buttons: [
        { code: 'N04', label: '蔬果', isActive: false },
        { code: 'N05', label: '水果', isActive: false },
        { code: 'N06', label: '花卉', isActive: false }
      ],
      toggleN04: false,
      toggleN05: false,
      toggleN06: false,
      searchText: '',
      sortType: '排序篩選',
      dataShown: [], // 透過pagination()分頁後的資料
      currentPage: 1 // 當前瀏覽第幾頁，預設第一頁
    }
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
          filteredData = this.data.filter(item => item.作物名稱?.match(this.searchText.trim()))
          if (filteredData.length > 0) {
            return this.data.filter(item => item.作物名稱?.match(this.searchText.trim()))
          // eslint-disable-next-line eqeqeq
          } else if (filteredData.length == 0) {
            return filteredData
          }
        }
      } else {
        if (this.searchText.trim() === '') {
          return this.data.filter(
            item => item.種類代碼 === this.cropType
          )
        } else {
          // eslint-disable-next-line no-unused-vars
          filteredData = this.data.filter(item => item.作物名稱?.match(this.searchText.trim()))
          if (filteredData.length > 0) {
            return this.data.filter(item => item.種類代碼 === this.cropType && item.作物名稱?.match(this.searchText.trim()))
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
      const maxData = (this.currentPage * perPage)
      this.dataShown = this.filteredList.slice(minData, maxData)
    },
    changeCropType (type) {
      this.cropType = type
      // eslint-disable-next-line no-return-assign
      this.buttons.forEach(item => item.isActive = false)
      if (type === 'N04') {
        this.buttons[0].isActive = true
      } else if (type === 'N05') {
        this.buttons[1].isActive = true
      } else if (type === 'N06') {
        this.buttons[2].isActive = true
      }
    },
    searchCrop () {
      if (this.searchText.trim() === '') {
        alert('請輸入作物名稱！')
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
.logo{
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
.active {
  background: #f8d45a;
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
.btn-type {
  padding: 0.5rem 2.5rem;
  color: #2a2a2a;
  letter-spacing: 1px;
  margin: 0 0.625rem 1.25rem 0;
}
.btn-type:hover,
.btn-type:active {
  background: #f8d45a;
}
@media (max-width: 767px) {
  .btn-type {
    padding: 0.5rem 2.25rem;
    margin: 0 0.375rem 1rem 0;
  }
}
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
.search {
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
.sort-select {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  background: url('data:image/svg+xml;utf8,<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sort-down" class="svg-inline--fa fa-sort-down fa-w-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="10 0 320 900"><path fill="currentColor" d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path></svg>')
    no-repeat;
  background-position: 105px 5px;
  cursor: pointer;
}

.show-result {
  font-size: 18px;
  letter-spacing: 1.12px;
}
.sort-content {
  margin-bottom: 1.25rem;
}
.market thead {
  background: #f4f1ea;
  border-top: 2px solid #2a2a2a;
  border-bottom: 2px solid #2a2a2a;
}
.market tbody {
  border-bottom: 2px solid #d9d9d9;
}
@media (max-width: 480px) {
  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
}
@media (max-width: 767px) {
  .mobile-select {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    background: url('data:image/svg+xml;utf8,<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sort-down" class="svg-inline--fa fa-sort-down fa-w-2" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="10 0 320 800"><path fill="currentColor" d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path></svg>')
      no-repeat;
    background-position: 60px 3px;
  }
}
.sort-advanced {
  position: relative;
}
.fa-caret-up,
.fa-caret-down {
  position: absolute;
  cursor: pointer;
}
.fa-caret-up {
  top: -2px;
  right: -15px;
}
.fa-caret-down {
  top: 9px;
  right: -15px;
}
.display-none{
  display: none
}
</style>
