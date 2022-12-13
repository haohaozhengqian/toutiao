<template>
  <div>
    <van-nav-bar title="设置昵称" left-arrow left-text="取消" right-text="完成" @click-left="$emit('close')"></van-nav-bar>
    <!-- 输入框 -->
    <van-field v-model="message" rows="2" autosize type="textarea" maxlength="7" placeholder="请修改昵称" show-word-limit />
  </div>
</template>

<script>
export default {
  date() {
    return {
      message: '',
    }
  },
}
</script>

<style scoped lang="less">
</style>