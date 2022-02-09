<template>
  <div>
    <div ref="like">
      <!-- 评论列表 -->
      <van-list class="cmt-list" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <!-- 评论每一项 -->
        <div class="cmt-item" v-for="(item,index) in CmtList" :key="index">
          <!-- 头部区域 -->
          <van-cell center :title="item.aut_name">
            <!-- 使用 title 插槽来自定义标题 -->
            <template #icon>
              <img :src="item.aut_photo" alt="" class="avatar">
            </template>
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #right-icon>
              <van-icon name="like" class="like-icon" color="red" v-if="item.is_liking" @click=" disLike (item)" />
              <van-icon name="like-o" class="like-icon" v-else @click="addLike(item)" />
            </template>
          </van-cell>
          <!-- 内容区域 -->
          <div class="cmt-contain">{{item.content}}</div>
          <!-- 尾部区域 -->
          <div class="cmt-footer">{{item.pubdate|dateFormat}}</div>
        </div>
      </van-list>
      <!-- 底部添加评论区域 - 1 -->
      <div class="add-cmt-box van-hairline--top" v-if="isShowBox1">
        <van-icon name="arrow-left" size="18" @click="$router.back()" />
        <div class="ipt-cmt-div" @click="showBox2">发表评论</div>
        <div class="icon-box">
          <van-badge :content="cmtCount" :max="99">
            <van-icon name="comment-o" size="20" @click="scrollToCmtList" />
          </van-badge>
          <van-icon name="star-o" size="20" />
          <van-icon name="share-o" size="20" />
        </div>
      </div>
      <!-- 底部添加评论区域 - 2 -->
      <div class="cmt-box van-hairline--top" v-else>
        <textarea placeholder="友善评论、理性发言、阳光心灵" @blur="hideBox2" ref="iptCmt" v-model.trim="cmt"></textarea>
        <van-button type="default" :disabled="cmt.length === 0">发布</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getCmtListAPI, addLikeCmtAPI, disLikeCmtAPI, pubCommentAPI } from '@/api/articleAPI.js'
// 从 popmotion 中按需导入 animate 动画函数
import { animate } from 'popmotion'
export default {
  name: 'ArtCmt',
  data () {
    return {
      CmtList: [],
      offset: null,
      loading: false,
      finished: false,
      isShowBox1: true,
      cmtCount: 0,
      cmt: ''
    }
  },
  props: {
    artId: {
      type: [String, Number],
      required: true
    }
  },
  methods: {
    async initCmtList () {
      const { data: res } = await getCmtListAPI(this.artId, this.offset)
      if (res.message === 'OK') {
        // 为总评论数赋值
        this.cmtCount = res.data.total_count
        // 为偏移量赋值
        this.offset = res.data.last_id
        // 1. 数据拼接：“旧数据”在前，“新数据”在后
        this.CmtList = [...this.CmtList, ...res.data.results]
        // 2. 将 loading 重置为 false
        this.loading = false
        // 3. 判断所有数据是否加载完毕
        if (res.data.results.length === 0) {
          this.finished = true
        }
      }
    },
    // 点击了发布评论的按钮
    async pubCmt () {
      // 调用 API 接口
      const { data: res } = await pubCommentAPI(this.artId, this.cmt)
      if (res.message === 'OK') {
        // 评论数自增 +1
        this.cmtCount += 1
        // 动态给响应回来的数据添加 is_liking 属性
        res.data.new_obj.is_liking = false
        // 将接口返回的、最新的评论内容，unshift 追加到 cmtlist 中
        this.cmtlist.unshift(res.data.new_obj)
        // 提示用户发表评论成功
        this.$toast.success('发表评论成功')
      }
    },
    scrollToCmtList () {
      // 1. 当前滚动条的位置
      const now = window.scrollY
      // 2. 目标位置（文章信息区域的高度）
      const dist = this.$refs.like.offsetTop - 46
      // 3. 实现滚动动画
      animate({
        from: now, // 当前的位置
        to: dist, // 目标位置
        onUpdate: latest => window.scrollTo(0, latest)
      })
    },
    onLoad () {
      this.initCmtList()
    },
    async addLike (item) {
      await addLikeCmtAPI(item.com_id)
      this.$toast.success('点赞成功！')
      item.is_liking = true
    },
    async disLike (item) {
      await disLikeCmtAPI(item.com_id)
      this.$toast.success('取消点赞成功！')
      item.is_liking = false
    },
    showBox2 () {
      this.isShowBox1 = false
      this.$nextTick(() => {
        // 2. 通过 ref 获取到 textarea 的引用
        this.$refs.iptCmt.focus()
      })
    },
    hideBox2 () {
      // 当文本框失去焦点时，延迟 100ms 再隐藏第二个评论区域
      // 目的：让发布评论的按钮能正常响应用户的点击事件
      setTimeout(() => {
        // 隐藏第二个评论区域
        this.isShowBox1 = true
        // 清空用户输入的评论内容
        this.cmt = ''
      }, 100)
    }
  },
  created () {
    this.initCmtList()
  }
}
</script>

<style lang="less" scoped>
.cmt-list {
  margin: 20px;
  .cmt-item {
    padding: 20px 0;
    border-bottom: 1px solid #ebedf0;
    .van-cell {
      padding: 10px 0;
      .avatar {
        width: 40px * 2;
        height: 40px * 2;
        border-radius: 50%;
        border: none;
        margin-right: 10px;
      }
      .like-icon {
        font-size: 16px * 2;
        line-height: inherit;
      }
    }
    .van-cell::after {
      border: none;
    }
  }
  .cmt-contain {
    text-indent: 40px;
    font-size: 30px;
    margin-top: 10px;
  }
  .cmt-footer {
    font-size: 24px;
    color: gray;
    margin-top: 20px;
  }
}
// 外层容器
.art-cmt-container-1 {
  padding-bottom: 46px;
}
.art-cmt-container-2 {
  padding-bottom: 80px;
}

// 发布评论的盒子 - 1
.add-cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 92px;
  line-height: 92px;
  padding-left: 20px;
  .ipt-cmt-div {
    flex: 1;
    border: 1px solid #efefef;
    border-radius: 30px;
    height: 60px;
    font-size: 24px;
    line-height: 60px;
    padding-left: 30px;
    margin-left: 20px;
    background-color: #f8f8f8;
  }
  .icon-box {
    width: 40%;
    display: flex;
    justify-content: space-evenly;
    line-height: 0;
  }
}

.child {
  width: 40px;
  height: 40px;
  background: #f2f3f5;
}

// 发布评论的盒子 - 2
.cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px * 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px * 2;
  padding-left: 10px * 2;
  box-sizing: border-box;
  background-color: white;
  textarea {
    flex: 1;
    height: 66%;
    border: 1px solid #efefef;
    background-color: #f8f8f8;
    resize: none;
    border-radius: 12px;
    padding: 10px;
  }
  .van-button {
    height: 100%;
    border: none;
  }
}
</style>
