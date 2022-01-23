<template>
  <div class="home-container">
    <van-nav-bar fixed>
      <template #left>
        <img src="@/assets/logo.png" alt="logo" class="logo">
      </template>
      <template #right>
        <van-icon name="search" color="white" size="18" />
      </template>
    </van-nav-bar>
    <!-- 通过 v-model 绑定当前激活标签对应的索引值，默认情况下启用第一个标签。 -->
    <van-tabs v-model="active" sticky offset-top="46px">
      <van-tab v-for="item in userChannel" :title="item.name" :key="item.id">
        <!-- 注意：Vue 官方建议在绑定 props 时，把“小驼峰”的属性名，改造成“短横线”的形式使用 -->
        <art-list :id='item.id' class="art-list"></art-list>
      </van-tab>
    </van-tabs>
    <van-icon name="plus" size="16" class="plus" @click="show=true" />
    <van-popup v-model="show" :close-on-click-overlay="false" @closed="isDel=false">
      <div class="popup-container">
        <!-- 弹出层的头部区域 -->
        <van-nav-bar title="频道管理">
          <template #right>
            <van-icon name="cross" color="white" size="14" @click="show=false" />
          </template>
        </van-nav-bar>
        <!-- 弹出层的主体区域 -->
        <div class="popup-body">
          <!-- 我的频道 -->
          <div class="my-channel-box">
            <div class="channel-title">
              <div>
                <span class="title-bold">已添加频道：</span>
                <span class="title-gray">{{isDel?'点击移除频道':'点击进入频道'}}</span>
              </div>
              <span class="btn-edit" @click="isDel=!isDel">{{isDel?'返回':'编辑'}}</span>
            </div>
            <!-- 我的频道列表 -->
            <van-row type="flex">
              <van-col span="6" v-for="(item,index) in userChannel" :key="item.id">
                <div class="channel-item" @click="onUserChannelClick(item,index)">
                  {{item.name}}
                  <van-badge color="transparent" class="cross-badge" v-if="isDel&&item.name!=='推荐'&&userChannel.length>2">
                    <div class="child" />
                    <template #content>
                      <van-icon name="cross" class="badge-icon" color="#cfcfcf" />
                    </template>
                  </van-badge>
                </div>
              </van-col>
            </van-row>
          </div>
          <van-divider :style="{margin:'10px 0 10px 0'}" />
          <!-- 全部频道 -->
          <div class="all-channel-box">
            <div class="channel-title">
              <div>
                <span class="title-bold">可添加频道：</span>
                <span class="title-gray">点击添加频道</span>
              </div>
            </div>
            <!-- 更多的频道列表 -->
            <van-row type="flex">
              <van-col span="6" v-for="item in moreChannel" :key="item.id">
                <div class="channel-item" @click="addChannel(item)">{{item.name}}</div>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannelAPI, getAllChannelAPI, updateUserChannelAPI } from '@/api/homeAPI.js'
import ArtList from '@/components/ArtList/ArtList'
export default {
  name: 'Home',
  data () {
    return {
      active: 0,
      userChannel: [],
      allChannel: [],
      show: false,
      isDel: false
    }
  },
  methods: {
    async initUserChannel () {
      const { data: res } = await getUserChannelAPI()
      if (res.message === 'OK') {
        this.userChannel = res.data.channels
      }
    },
    async initAllChannel () {
      const { data: res } = await getAllChannelAPI()
      if (res.message === 'OK') {
        this.allChannel = res.data.channels
      }
    },
    async updateChannel () {
      const channel = this.userChannel.map((item, index) => {
        return {
          id: item.id,
          seq: index
        }
      })
      const { data: res } = await updateUserChannelAPI(channel)
      if (res.message === '更新用户频道成功') {
        this.$notify({ type: 'success', message: '更新用户频道成功', duration: 1000 })
      }
    },
    onUserChannelClick (channel, index) {
      if (this.isDel) {
        if (channel.name === '推荐' || this.userChannel.length < 3) return
        this.userChannel = this.userChannel.filter(item => item.id !== channel.id)
        this.updateChannel()
      } else {
        this.show = false
        this.active = index
      }
    },
    addChannel (channel) {
      this.userChannel.push(channel)
      this.updateChannel()
    }
  },
  computed: {
    moreChannel () {
      return this.allChannel.filter(item => {
        const index = this.userChannel.findIndex(x => x.id === item.id)
        if (index === -1) return true
      })
    }
  },
  components: {
    ArtList
  },
  created () {
    this.initUserChannel()
    this.initAllChannel()
  }

}
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
// 组件外层容器的样式
.home-container {
  padding-top: 92px;
  padding-bottom: 100px;
  .plus {
    position: fixed;
    top: 116px;
    right: 20px;
    z-index: 999;
  }
  .popup-container {
    background-color: #fff;
    height: 100%;
    width: 100%;
  }
}
// logo 样式
.logo {
  height: 80%;
}
/deep/.van-tabs__wrap {
  padding-right: 72px;
  background-color: white;
}
.van-popup {
  background-color: #fff;
  height: 100%;
  width: 100%;
}
.popup-body {
  padding: 16px;
}
.all-channel-box,
.my-channel-box {
  .channel-title {
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    line-height: 56px;
    padding: 0 12px;
    .title-bold {
      font-weight: bold;
    }
    .title-gray {
      color: gray;
      font-size: 24px;
    }
  }
}
.btn-edit {
  border: 1px solid gray;
  border-radius: 12px;
  padding: 0 20px;
  font-size: 24px;
  height: 44px;
  line-height: 44px;
}
.channel-item {
  position: relative;
  border: 1px solid rgb(241, 241, 241);
  background-color: #fafafa;
  font-size: 24px;
  height: 72px;
  line-height: 72px;
  margin: 12px;
  text-align: center;
}
.cross-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
}
</style>>
