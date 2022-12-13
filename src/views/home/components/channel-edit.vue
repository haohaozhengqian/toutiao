<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button type="danger" plain round size="small" class="edit-btn">编辑</van-button>
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item v-for="(channel,index) in myChannels" :key="index" :text="channel.name" class="grid-item" icon="clear" />
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item v-for="(channel,index) in recommendChannels" :key="index" :text="channel.name" class="grid-item" icon="plus" @click="onAddChannel(channel)" />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel.js'
export default {
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      allChannels: [], //所有频道
      isEdit: false, //控制编辑状态的显示
    }
  },
  created() {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels() {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('获取频道失败')
      }
    },
    //点击添加新频道
    onAddChannel(channel) {
      this.myChannels.push(channel)
    },
  },
  computed: {
    //处理获取channel的
    recommendChannels() {
      const channels = []
      this.allChannels.forEach((channel) => {
        //find也是遍历数组 ，找到腕足条件的元素相
        const ret = this.myChannels.find((myChannel) => {
          return myChannel.id === channel.id
        })
        //如果我的频道中不包括该频道项，则收集到的推荐频道中
        if (!ret) {
          channels.push(channel)
        }
      })
      //返回计算结果
      return channels
    },
  },
}
</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;

  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text {
        font-size: 28px;
        color: #222;
        .van-grid-item__text {
          margin-top: 0;
        }
      }
    }
  }

  /deep/.my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  /deep/.recommend-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>