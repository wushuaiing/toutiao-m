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
        {{ item.name}}
      </van-tab>
    </van-tabs>
    <van-icon name="plus" size="16" class="plus" />
  </div>
</template>

<script>
import { getUserChannelAPI } from '@/api/homeAPI.js'
export default {
  name: 'Home',
  data () {
    return {
      active: 0,
      userChannel: []
    }
  },
  methods: {
    async initUserChannel () {
      const { data: res } = await getUserChannelAPI()
      if (res.message === 'OK') {
        this.userChannel = res.data.channels
      }
    }
  },
  created () {
    this.initUserChannel()
  }

}
</script>

<style lang="less" scoped>
// 组件外层容器的样式
.home-container {
  padding-top: 92px;
  padding-bottom: 100px;
  .plus {
    position: fixed;
    top: 116px;
    right: 20px;
  }
}
// logo 样式
.logo {
  height: 80%;
}
.van-tabs {
  padding-right: 72px;
  background-color: white;
}
</style>>
