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
    <van-icon name="plus" size="16" class="plus" />
  </div>
</template>

<script>
import { getUserChannelAPI } from '@/api/homeAPI.js'
import ArtList from '@/components/ArtList/ArtList'
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
  components: {
    ArtList
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
    z-index: 999;
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
</style>>
