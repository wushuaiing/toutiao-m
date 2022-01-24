<template>
  <div>
    <van-cell>
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <div class="title-box">
          <span>{{article.title}}</span>
          <img alt="" class="thumb" v-if="article.cover.type === 1" v-lazy="article.cover.images[0]">
        </div>
        <div class="thumb-box" v-if="article.cover.type === 3">
          <img alt="" class="thumb" v-for="(item,index) in article.cover.images" :key="index" v-lazy="item">
        </div>
      </template>
      <!-- 使用 label 插槽来自定义标签 -->
      <template #label>
        <div class="label-box">
          <span>{{article.aut_name}} &nbsp;&nbsp; {{article.comm_count}}评论 &nbsp;&nbsp; 发布时间&nbsp;{{article.pubdate | dateFormat}} </span>
          <van-icon name="cross" @click="show = true" v-if="closable" />
        </div>
      </template>
    </van-cell>
    <van-action-sheet v-model="show" cancel-text="取消" close-on-click-action get-container="body">
      <div class="content">
        <van-cell :title="item.name" v-for="item in actions" :key="item.name" clickable @click="clickCell(item.name)" />
      </div>
    </van-action-sheet>
    <van-action-sheet v-model="isFirst" cancel-text="返回" @close="changeShow(flag)" close-on-click-action get-container="body">
      <div class="content">
        <van-cell :title="item.label" v-for="item in reports" :key="item.type" clickable @click="reportArtList(item.type)" />
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import reports from '@/api/reports.js'
import { dislikeArticleAPI, reportArticleAPI } from '@/api/homeAPI.js'

export default {
  name: 'ArtItem',
  props: {
    article: {
      type: Object,
      require: true
    },
    closable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      show: false,
      isFirst: false,
      flag: true,
      actions: [{ name: '不感兴趣' }, { name: '反馈垃圾内容' }, { name: '拉黑作者' }],
      reports
    }
  },
  methods: {
    async clickCell (name) {
      if (name === '不感兴趣') {
        const { data: res } = await dislikeArticleAPI(this.article.art_id.toString())
        if (res.message === 'OK') {
          this.$emit('remove-article', this.article.art_id.toString())
        }
        console.log(name)
        this.show = false
      } else if (name === '拉黑作者') {
        console.log(name)
        this.show = false
      } else if (name === '反馈垃圾内容') {
        this.show = false
        this.isFirst = true
      }
    },
    async reportArtList (type) {
      this.isFirst = false
      this.flag = false
      const { data: res } = await reportArticleAPI(this.article.art_id, type)
      if (res.message) {
        this.$emit('remove-article', this.article.art_id)
      }
    },
    changeShow (flag) {
      if (flag) {
        this.show = true
        console.log(this.flag)
      } else {
        this.show = false
        this.flag = true
        console.log(this.flag)
      }
      // if (this.isFirst === false) {
      //   this.show = false
      // } else {
      //   this.show = true
      // }
    }
  }
}
</script>

<style lang="less" scoped>
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.thumb {
  width: 113px * 2;
  height: 70px * 2;
  background-color: #f8f8f8;
  object-fit: cover;
}
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.thumb-box {
  display: flex;
  justify-content: space-between;
}
.content {
  text-align: center;
}
</style>
