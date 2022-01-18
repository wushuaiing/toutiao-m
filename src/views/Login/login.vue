<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="头条 - 登录" fixed />
    <!-- 登录表单 -->
    <van-form @submit="login" :show-error-message=true class="login-form">
      <van-field class="wuhsuai" v-model="user.mobile" name="手机号" label="手机号" clearable placeholder="请填写手机号" :rules="rules.mobile">
        <i slot="left-icon" class="iconfont icon-shouji" />
      </van-field>
      <van-field v-model="user.code" name="密码" type="password" required center clearable label="密码" placeholder="请输入密码" :rules="rules.code">
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
      </van-field>
      <div class="login-btn-wrap" style="margin: 16px;">
        <van-button class="login-btn" round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginAPI } from '@/api/user.js'
import { mapMutations } from 'vuex'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      rules: {
        // 手机号的校验规则
        mobile: [
          { required: true, message: '请填写您的手机号', trigger: 'onBlur' },
          { pattern: /^1\d{10}$/, message: '请填写正确的手机号', trigger: 'onBlur' }
        ],
        // 密码的校验规则
        code: [{ required: true, message: '请填写您的密码', trigger: 'onBlur' }]
      }
    }
  },
  computed: {},
  watch: {

  },
  created () {

  },
  mounted () {

  },
  methods: {
    // 2. 映射 mutations 中的方法
    ...mapMutations(['updateTokenInfo']),
    async login () {
      // 只有当表单数据校验通过之后，才会调用此 login 函数
      const { data: res } = await loginAPI(this.user)
      // 当数据请求成功之后，res.data 中存储的就是服务器响应回来的数据
      // console.log(res.data)
      // 判断是否登录成功了
      if (res.message === 'OK') {
        // TODO1：把登录成功的结果，存储到 vuex 中
        this.updateTokenInfo(res.data)
        // TODO2：登录成功后，跳转到主页
        this.$router.push('/home')
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  padding-top: 92px;
}
</style>
