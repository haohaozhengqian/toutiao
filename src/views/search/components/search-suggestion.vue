<template>
  <div class="search-suggestion">
    <van-cell icon="search" v-for="(text,i) in suggestions" :key="i" @click="$emit('search',text)">
      <div v-html="highlight(text)" slot="title"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search.js'
import { debounce } from 'lodash'
export default {
  data() {
    return {
      suggestions: [], //联想建立数据列表
      timer: null, //防抖
      htmlStr: 'Hello <span style="color: red">World</span>',
    }
  },
  props: {
    searchText: {
      type: String,
    },
  },
  watch: {
    searchText: {
      handler(value) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.loadSearchSuggestions(value)
        }, 500)
      },
      immediate: true,
    },
  },
  methods: {
    async loadSearchSuggestions(q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('获取失败稍后再试')
        console.log(err)
      }
    },
    highlight(text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    },
  },
}
</script>

<style scoped lang="less">
/deep/ span.active {
  color: #3296fa;
}
</style>