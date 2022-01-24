<template>
  <div>
    <!-- 头部区域 -->
    <div class="search-header">
      <van-icon name="arrow-left" color="white" size="18px" class="back" @click="$router.back()" />
      <van-search v-model.trim="value" placeholder="请输入搜索关键词" shape="round" background="#007bff" ref="searchRef" @input="onInput" />
    </div>
    <!-- 建议区域 -->
    <div class="suggest-list">
      <div class="suggest-item" v-for="(item,index) in suggestList" :key="index" v-html="item" @click="gotoSearchResult"></div>
    </div>
    <!-- 搜索历史区域 -->
    <div class="search-history" v-show="historyShow">
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="delete" class="delete-icon" @click="history=[]" />
        </template>
      </van-cell>
      <div class="his-list">
        <span v-for="(item,i) in history" :key="i" class="his-item" @click="gotoSearchResult">{{item}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getSuggestListAPI } from '@/api/searchAPI.js'
export default {
  data () {
    return {
      value: '',
      timeId: null,
      suggestList: [],
      history: JSON.parse(localStorage.getItem('history')) || [],
      historyShow: true
    }
  },
  mounted () {
    const ipt = document.querySelector('input[type = search]')
    ipt.focus()
    // this.$refs.searchRef.focus()
  },
  watch: {
    history (newVal) {
      localStorage.setItem('history', JSON.stringify(newVal))
    }
  },
  methods: {
    async initSearchList () {
      const { data: res } = await getSuggestListAPI(this.value)
      if (res.message === 'OK') {
        this.historyShow = false
        this.heightKeyWord(res.data.options)
        this.suggestList = res.data.options
        console.log(this.suggestList)
        const newHistory = this.history.filter(item => item !== this.value)
        newHistory.unshift(this.value)
        this.history = newHistory
      }
    },
    // 高亮
    heightKeyWord (arr) {
      // 1. 根据用户输入的 value，动态创建正则表达式
      const reg = new RegExp(this.value, 'gi')
      arr.forEach((item, index) => {
        arr[index] = item.replace(reg, val => {
          // 2. 调用字符串的 replace 方法进行关键字的高亮处理
          return `<span style="color: red; font-weight: bold;">${val}</span>`
        })
      })
    },
    onInput () {
      // 清除定时器
      clearTimeout(this.timeId)
      // 如果输入内容为空就return出去
      if (this.value.length === 0) {
        this.historyShow = true
        this.suggestList = []
        return
      }
      // 开启定时器
      this.timeId = setTimeout(() => {
        this.initSearchList()
      }, 500)
    },
    // 搜索结果
    gotoSearchResult (e) {
      console.log(e.currentTarget.innerText)
      const value = e.currentTarget.innerText
      this.$router.push('/result/' + value)
    }
  }
}
</script>

<style lang="less" scoped>
.search-header {
  height: 46px * 2;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  .back {
    padding-left: 14px * 2;
  }
  .van-search {
    flex: 1;
  }
}
.suggest-list {
  .suggest-item {
    padding: 0 30px;
    font-size: 14px * 2;
    border-bottom: 1px solid #f8f8f8;
    line-height: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.delete-icon {
  font-size: 16px * 2;
  line-height: inherit;
}
.his-list {
  padding: 0px 20px;
  .his-item {
    font-size: 24px;
    border-radius: 20px;
    padding: 16px 28px;
    background-color: #efefef;
    margin: 20px 16px 0px;
  }
}
</style>
