
// var apiUrl = "http://172.18.0.249:8080", //测试环境
var apiUrl = "http://172.100.1.39:8081", //测试环境
    apiUrlPic = "https://qjw-test.oss-cn-hangzhou.aliyuncs.com/mall/";

var apiUrl = "https://api.petch.pro", //正式环境
    apiUrlPic = "https://qjw-prod.oss-cn-hangzhou.aliyuncs.com/mall/";

var settleAccountsPrice=500;//设置商品起送价格
if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE6.0" || navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE7.0" || navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0" || navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE9.0") {
    alert("您的浏览器版本过低，请下载IE9以上版本或使用其他浏览器");
    window.close();
}
requirejs.config({
    paths: {
        common: '/src/js/common', //前端官网共用js
        components: '/src/js/components', //网站共用组件
        jquery: '/src/libs/jquery-1.11.1.min', //jquery
        jqueryCookie: '/src/libs/jquery.cookie', //jquery.cookie
        template: '/src/libs/template',
        swiper: "/src/libs/swiper.jquery.min",
    },
    shim: {
        common: ["jquery"],
        components: ["jquery"],
        swiper: ["jquery"]
    }
});

//按scripts标签id加载相应脚本
define(["jquery", "jqueryCookie","components", "template"], function(jquery,jqueryCookie,components,template) {
    var module = $("#script").attr("require-module");
    if (module !== undefined && module !== "") {
        require([module]);
    }
});
