<template>
  <div class="search-result">
    <van-nav-bar title="搜索结果" left-arrow @click-left="$router.back()" fixed />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :immediate-check='false'>
      <ArtItem v-for="item in searchList" :key="item.art_id" :article="item" :closable="false"></ArtItem>
    </van-list>
    <!-- </van-list><van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <ArtItem v-for="(item,index) in searchList" :key="index" :article="item"></ArtItem> -->
  </div>
</template>

<script>
import { getSearchResultAPI } from '@/api/searchResult.js'
import ArtItem from '@/components/ArtItem/ArtItem'
export default {
  name: 'searchResult',
  data () {
    return {
      page: 1,
      searchList: [],
      loading: false,
      finished: false
    }
  },
  props: ['value'],
  components: {
    ArtItem
  },
  methods: {
    async initSearchList () {
      const { data: res } = await getSearchResultAPI(this.value, this.page)
      if (res.message === 'OK') {
        this.searchList = [...this.searchList, ...res.data.results]
        this.loading = false
        if (res.data.results.length === 0) { this.finished = true }
        this.page += 1
      }
    },
    onLoad () {
      this.initSearchList()
    }
  },
  created () {
    this.initSearchList()
  }
}
</script>

<style lang="less" scoped>
.search-result {
  padding-top: 46 * 2px;
}
</style>
