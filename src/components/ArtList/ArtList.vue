<template>
  <div>
    <!-- 没有更多数据时，禁用下拉刷新的效果： -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" :disabled="finished">
      <!-- :immediate-check="false" 属性，即可防止首次加载时触发 load 事件 -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check="false">
        <ArtItem v-for="item in artList" :key="item.id" :article="item"></ArtItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArtListAPI } from '@/api/homeAPI.js'
import ArtItem from '@/components/ArtItem/ArtItem'
export default {
  name: 'ArtList',
  data () {
    return {
      artList: [],
      timestamp: Date.now(),
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  props: {
    id: {
      default: 0,
      type: Number, // 数值类型
      required: true
    }
  },
  methods: {
    async initArtList (isRefresh) {
      const { data: res } = await getArtListAPI(this.id, this.timestamp)
      if (res.message === 'OK') {
        if (isRefresh) {
          this.artList = [...res.data.results, ...this.artList]
          this.refreshing = false
        } else {
          this.artList = [...this.artList, ...res.data.results]
          this.loading = false
        }
        this.timestamp = res.data.pre_timestamp
        if (res.data.pre_timestamp === null) {
          this.finished = true
        }
      }
    },
    onLoad () {
      // 异步更新数据
      console.log('触发了上拉加载更多')
      this.initArtList()
    },
    onRefresh () {
      console.log('触发了下拉刷新')
      this.initArtList(true)
    }
  },
  created () {
    this.initArtList()
  },
  components: {
    ArtItem
  }
}
</script>

<style lang="less" scoped>
</style>
