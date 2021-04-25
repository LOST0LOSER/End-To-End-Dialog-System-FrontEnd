module.exports = {
  configureWebpack: {
    devtool: "source-map",
  },

  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },
  transpileDependencies: ["quasar"],
  
  devServer: {
    open: (function() {
      process.platform === "win32";
      process.arch === "x64";
    })(),
    // open: process.arch === "x64",
    host: "0.0.0.0",
    hot: true,
    http2: false,
    port: 8080,
    https: false,

    // mock接口设置
    // before: require("./src/mock"),

    // 设置代理，
    proxy: {
      "/api": {
        // 目标 API 地址
        // target: "https://11f3944d-a24c-4d9e-a922-b061437033c2.mock.pstmn.io/", // 接口的域名
        // target: "http://rap2api.taobao.org/app/mock/271997/",
        target: "http://127.0.0.1:5000",
        // target: "https://yapi.baidu.com/mock/17108/",
        // port:38080,
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        // ws:true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  lintOnSave: false,
  css: {
    extract: false,
  },

};
