<template>
  <div class="user-container">
    <!-- 导航栏 -->
    <van-nav-bar title="个人信息" class="page-nav-bar" left-arrow @click-left="$router.back()"></van-nav-bar>
    <!-- 个人信息 -->
    <van-cell title="头像" is-link>
      <van-image class="avatar" src="https://img01.yzcdn.cn/vant/cat.jpeg" fit="cover" round />
    </van-cell>
    <van-cell title="昵称" :value="user.name" is-link @click="isUpdateNameShow=true" />
    <van-cell title="性别" :value="user.gender===0?'男':'女'" is-link />
    <van-cell title="生日" :value="user.birthday" is-link />
    <!-- 编辑昵称弹出层 -->
    <van-popup style="height:100%;" v-model="isUpdateNameShow" position="bottom">
      <UpdateName @close="isUpdateNameShow=false"></UpdateName>
    </van-popup>
  </div>
</template>

<script>
import UpdateName from './components/update-name.vue'
import { getUserProfile } from '@/api/user.js'
export default {
  name: 'UserPage',
  components: {},
  props: {},
  data() {
    return {
      user: {},
      isUpdateNameShow: false,
    }
  },
  computed: {},
  watch: {},
  created() {
    this.loadUserProfile()
  },
  mounted() {},
  methods: {
    async loadUserProfile() {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        this.$toast('获取失败')
      }
    },
  },
  components: {
    UpdateName,
  },
}
</script>

<style scoped lang="less">
.page-nav-bar {
  background-color: #3296fa;
}
/deep/.van-icon-arrow-left {
  color: white;
}
.avatar {
  width: 60px;
  height: 60px;
}
</style>