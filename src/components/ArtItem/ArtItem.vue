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
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #label>
        <div class="label-box">
          <span>作者{{article.aut_name}} &nbsp;&nbsp; {{article.comm_count}}评论 &nbsp;&nbsp; 发布时间&nbsp;{{article.pubdate | dateFormat}} </span>
          <van-icon name="cross" />
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArtItem',
  props: {
    article: {
      type: Object,
      require: true
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
</style>
