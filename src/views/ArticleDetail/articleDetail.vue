<template>
  <div>
    <van-nav-bar title="文章详情" left-arrow @click-left="$router.back()" fixed />
    <!-- 文章信息 v-if="article"防止闪烁问题即数据访问较慢报错 article开始为空 -->
    <div class="article-contain" v-if="article">
      <!-- 文章标题 -->
      <h1 class="article-title">{{article.title}}</h1>
      <van-cell center :title="article.aut_name" :label="article.pubdate | dateFormat">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #icon>
          <!-- 头像 -->
          <img :src="article.aut_photo" alt="" class="avatar">
        </template>
        <template #default>
          <div>
            <!-- 是否关注了作者 -->
            <van-button type="info" size="mini" v-if="article.is_followed" @click="onFollow">已关注</van-button>
            <van-button icon="plus" plain type="info" size="mini" v-else @click="onFollow">关注</van-button>
          </div>
        </template>
      </van-cell>
      <!-- 分割线 -->
      <van-divider></van-divider>
      <!-- 文章内容 -->
      <div class="art-content markdown-body" v-html="article.content" ref="article-content"></div>
      <!-- 分割线 -->
      <van-divider>End</van-divider>
      <div class="like-box">
        <van-button icon="good-job" type="danger" size="mini" v-if="article.is_collected" @click="onLike">已点赞</van-button>
        <van-button icon="good-job-o" plain type="danger" size="mini" v-else @click="onLike">点赞</van-button>
      </div>
    </div>
    <ArtCmt :artId='id'></ArtCmt>
  </div>
</template>

<script>
import { getArticleDetailAPI, followUserAPI, deleteFollowAPI, addLikeAPI, dislikeAPI } from '@/api/articleAPI.js'
import { ImagePreview } from 'vant'
import ArtCmt from '@/components/ArtCmt/artCmt'
// ImagePreview({
//   images: [
//     'https://img01.yzcdn.cn/vant/apple-1.jpg',
//     'https://img01.yzcdn.cn/vant/apple-2.jpg'
//   ],
//   startPosition: 1
// })
export default {
  name: 'ArticleDetail',
  data () {
    return {
      article: null
    }
  },
  props: ['id'],
  components: {
    ArtCmt
  },
  methods: {
    async initArticle () {
      try {
        const { data: res } = await getArticleDetailAPI(this.id)
        if (res.message === 'OK') {
          this.article = res.data
          // console.log(this.article.content) 打印文章内容
          setTimeout(() => {
            this.PreviewImage()
          }, 0)
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
      }
    },
    // 图片预览
    PreviewImage () {
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: index,
            closeable: true
          })
        }
      })
    },
    async onFollow () {
      try {
        const authorId = this.article.aut_id
        if (this.article.is_followed) {
          await deleteFollowAPI(authorId)
          this.$toast.success('取关成功！')
        } else {
          await followUserAPI(authorId)
          this.$toast.success('关注成功！')
        }
        this.article.is_followed = !this.article.is_followed
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
    },
    async onLike () {
      try {
        if (this.article.is_collected) {
          const res = await dislikeAPI(this.id)
          if (res.status === 204) {
            // 提示用户
            this.$toast.success('取消点赞成功！')
          }
        } else {
          await addLikeAPI(this.id)
          this.$toast.success('点赞成功！')
        }
        this.article.is_collected = !this.article.is_collected
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
    }
  },
  created () {
    this.initArticle()
  }
}
</script>

<style lang="less" scoped>
// 导入github中的文章样式
@import url('./github-markdown.css');
.article-contain {
  padding: 20px;
  margin-top: 46 * 2px;
  .article-title {
    font-size: 32px;
    margin: 20px 0;
  }
  .van-cell {
    padding: 10px 0;
  }
  .avatar {
    // display: block;
    width: 60px * 2;
    height: 60px * 2;
    border-radius: 50%;
    border: none;
    margin-right: 10px;
  }
  .art-content {
    font-size: 24px;
    line-height: 48px;
    width: 100%;
    overflow-x: scroll;
    word-break: break-all;
  }
  .like-box {
    display: flex;
    justify-content: center;
  }
}
</style>
