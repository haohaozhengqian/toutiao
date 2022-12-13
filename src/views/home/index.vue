<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fiexd>
      <van-button @click="$router.push('/search')" slot="title" type="info" size="small" round icon="search" class="search-btn">搜索</van-button>
    </van-nav-bar>
    <!-- 导航栏 -->
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
        <!-- 文章列表 -->
        <ArticleList :channel="channel"></ArticleList>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div class="hamburger-btn" slot="nav-right" @click="isChannelEditShow=true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道编辑弹出层-->
    <van-popup v-model="isChannelEditShow" closeable position="bottom" :style="{ height: '100%' }" close-icon-position="top-left">
      <ChannelEdit :my-channels="channels"></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
export default {
  name: 'HomeIndex',
  data() {
    return {
      active: 0,
      //频道列表
      channels: [], //频道列表
      isChannelEditShow: false, //控制编辑频道弹出层的展示状态
    }
  },
  created() {
    this.loadChannels()
  },
  methods: {
    async loadChannels() {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
      } catch (err) {
        this.$toast.fail('获取用户列表信息失败')
      }
    },
  },
  components: {
    ArticleList,
    ChannelEdit,
  },
}
</script>

<style scoped lang="less">
.page-nav-bar {
  background-color: #3296fa;
}
.home-container {
  max-width: unset;
  padding-bottom: 100px;
  .search-btn {
    width: 400px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
}
/deep/.channel-tabs {
  .van-tab {
    min-width: 200px;
    border-right: 1px solid #edeff3;
    font-size: 30px;
    color: #777777;
  }
  .van-tab--active {
    color: #333333;
  }
  .van-tabs__nav {
    padding-bottom: 0;
  }
  .van-tabs__line {
    bottom: 8px;
    width: 31px !important;
    height: 6px;
    background-color: #3296fa;
  }
}
.placeholder {
  flex-shrink: 0;
  width: 66px;
  height: 82px;
}

.hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  opacity: 0.902;
  i.toutiao {
    font-size: 33px;
  }
  &:before {
    content: '';
    position: absolute;
    left: 0;
    width: 1px;
    height: 100%;
    background-image: url(~@/assets/gradient-gray-line.png);
    background-size: contain;
  }
}
.van-tabs__wrap {
  position: fixed;
  top: 92px;
  z-index: 1;
  left: 0;
  right: 0;
  height: 82px;
}
</style>