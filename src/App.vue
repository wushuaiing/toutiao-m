<template>
  <div id="app">
    <router-view />
    <h1>阿呆头条</h1>
    <div>
      <i class="iconfont icon-shipin"></i>
    </div>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <div class="boy">helloworld</div>
  </div>
</template>

<script>
export default {}
</script>
<style lang="less">
.boy {
  width: 375px;
  height: 88px;
  background-color: pink;
}
</style>
