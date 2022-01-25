module.exports = {
  // 配置要使用的PostCSS插件
  plugins: {
    // 配置使用autoprefixer插件
    // 作用：生成浏览器CSS样式规则前缀
    // VueCLI 内部已经配置了autoprefixer插件
    // 所以有配置一次，产生冲突
    // autoprefixer: {
    //   //配置要兼容到的环境信息
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    // 作用：把px转换为rem
    'postcss-pxtorem': {
      // lib-flexible的rem适配方案：把一行分为10份
      // 所以rootValue应该设置为设计稿宽度的10分之一
      // 设计稿是750，所以设置成750/10=75
      // vant建议设置为37.5，唯一缺点就是使用设计稿的尺寸都除以2
      // 好方法？
      // 如果是Vant样式，按照37.5转换 ，  如果是自己的样式使用75转换
      // 查文档  发现rootValue 支持两种类型
      //      数字：固定的数字
      //      函数：可以动态处理返回
      //                        postcss-pxtorem处理每个css文件都会调用这个函数
      //                        他会把处理的css文件相关信息通过参数传递给该函数
      rootValue ({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 配置要转换的CSS属性
      //* 表示所有
      propList: ['*'],
      // 配置不要转换的样式资源
      exclude: 'github-markdown'
    }
  }
}
