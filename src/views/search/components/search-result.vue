<template>
  <div class="search-result">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(article,index) in list" :key="index" :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
    }
  },
  methods: {
    async onLoad() {
      try {
        //获取数据
        const { data } = await getSearchResult({
          page: this.page, //页码
          per_page: this.perPage, //每页的数据
          q: this.searchText, //搜索关键字
        })
        //添加到数组列表中
        const { results } = data.data
        this.list.push(...results)
        //加载中的loading关闭
        this.loading = false
        //判断是否还有数据
        if (results.length) {
          //如果有则更新获取下一页
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        //加载失败了也要关闭loading
        this.loading = false
        this.$toast('数据获取失败')
      }
    },
  },
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped lang="less">
</style>