<template>
  <div class="search-container">
    <!-- 顶部搜索篮 -->
    <form action="/" class="search-form">
      <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" background="#3296fa" @focus="isResultShow=false" />
    </form>
    <!-- 搜索结果 -->
    <SearchResult v-if="isResultShow" :search-text="searchText"></SearchResult>
    <!-- 联想建议 -->
    <SearchSuggestion v-else-if="searchText" :search-text="searchText" @search="onSearch"></SearchSuggestion>
    <!-- 搜索历史记录 -->
    <SearchHistory v-else :search-histories="searchHistories" @clear-search-history="searchHistories=[]" @search="onSearch"></SearchHistory>

  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'
import { setItem, getItem } from '@/utils/storage.js'
export default {
  name: 'SearchIndex',
  components: {
    SearchResult,
    SearchSuggestion,
    SearchHistory,
  },
  props: {},
  data() {
    return {
      searchText: '',
      isResultShow: false, //控制搜索结果的展示
      searchHistories: getItem('serach-histories') || [],
    }
  },
  computed: {},
  watch: {
    searchHistories(val) {
      // 同步到本地存储
      setItem('serach-histories', val)
    },
  },
  created() {},
  methods: {
    onSearch(val) {
      //更新文本框
      this.searchText = val
      //存储历史搜索记录
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }

      this.searchHistories.unshift(val)
      //渲染搜索结果
      this.isResultShow = true
    },
    onCancel() {
      this.$router.go('-1')
    },
  },
}
</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>