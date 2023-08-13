<template>
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
                :class="{
                  'fa-caret-up': true,
                  'display-none': filteredList.length === 0
                }"
                icon="fa-solid fa-caret-up"
              />
              <font-awesome-icon
                data-price="上價"
                @click="sortDown('上價')"
                :class="{
                  'fa-caret-down': true,
                  'display-none': filteredList.length === 0
                }"
                icon="fa-solid fa-caret-down"
              />
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
                :class="{
                  'fa-caret-up': true,
                  'display-none': filteredList.length === 0
                }"
                icon="fa-solid fa-caret-up"
              />
              <font-awesome-icon
                data-price="中價"
                @click="sortDown('中價')"
                :class="{
                  'fa-caret-down': true,
                  'display-none': filteredList.length === 0
                }"
                icon="fa-solid fa-caret-down"
              />
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
                :class="{
                  'fa-caret-up': true,
                  'display-none': filteredList.length === 0
                }"
                icon="fa-solid fa-caret-up"
              />
              <font-awesome-icon
                data-price="下價"
                @click="sortDown('下價')"
                :class="{
                  'fa-caret-down': true,
                  'display-none': filteredList.length === 0
                }"
                icon="fa-solid fa-caret-down"
              />
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
                :class="{
                  'fa-caret-up': true,
                  'display-none': filteredList.length === 0
                }"
                icon="fa-solid fa-caret-up"
              />
              <font-awesome-icon
                data-price="平均價"
                @click="sortDown('平均價')"
                :class="{
                  'fa-caret-down': true,
                  'display-none': filteredList.length === 0
                }"
                icon="fa-solid fa-caret-down"
              />
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
                :class="{
                  'fa-caret-up': true,
                  'display-none': filteredList.length === 0
                }"
                icon="fa-solid fa-caret-up"
              />
              <font-awesome-icon
                data-price="交易量"
                @click="sortDown('交易量')"
                :class="{
                  'fa-caret-down': true,
                  'display-none': filteredList.length === 0
                }"
                icon="fa-solid fa-caret-down"
              />
            </span>
          </div>
        </th>
      </tr>
    </thead>
    <tbody class="showList">
      <tr v-if="cropType === '' && searchText == ''">
        <td colspan="7" class="text-center p-3">
          請輸入並搜尋想比價的作物名稱^＿^
        </td>
      </tr>
      <tr v-else-if="filteredList.length === 0">
        <td colspan="7" class="text-center p-3">查詢不到交易資訊QQ</td>
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
</template>

<script>
export default {
  props: {
    filteredList: Array,
    cropType: String,
    searchText: String
  },
  emits: ['sortUp', 'sortDown'],
  methods: {
    sortUp (value) {
      this.$emit('sortUp', value)
    },
    sortDown (value) {
      this.$emit('sortDown', value)
    }
  }
}
</script>

<style>
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
