<template>
  <div class="search-history">
    <!-- 搜索历史头框 -->
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-search-history')">全部删除</span>
        <span @click="isDeleteShow=false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDeleteShow=true"></van-icon>
    </van-cell>
    <van-cell :title="item" v-for="(item,index) in searchHistories" :key="index" @click="onSearchItemClick(item,index)">
      <van-icon name="close" v-if="isDeleteShow"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  data() {
    return {
      //控制历史记录展示与隐藏的状态
      isDeleteShow: false,
    }
  },
  props: {
    //prop不能修改，改了也不会传到给父组件（布尔值，字符串，数字）
    //引用数组类型 对象数组等可以修改但是不能重新赋值
    searchHistories: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onSearchItemClick(item, index) {
      if (this.isDeleteShow) {
        //删除状态,要删除历史记录
        this.searchHistories.splice(index, 1)
      } else {
        //费删除装填直接诶进入搜索
        this.$emit('search', item)
      }
    },
  },
}
</script>

<style scoped lang="less">
</style>