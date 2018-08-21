define(["jquery",  "jqueryCookie"], function (jquery, bootstrap, jqueryCookie) {
    function getMsg(url, param, type) { //ajax请求
        return $.ajax({
            url: url,
            data: param || {},
            type: type || 'post',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            dataType: "json",
        }).then(function (msg) {
            if (msg.res == 301) {
                // alert(url);

                var href = location.href;
                if (url.indexOf("admin") > -1) {
                    $.cookie("preHrefB", href, {
                        path: '/'
                    });
                    setTimeout('location.href = "/page/manage_login.html"',1000);
                } else {
                    $.cookie("preHrefA", href, {
                        path: '/'
                    });
                    $.cookie("username", null, {
                        path: "/"
                    });
                    $.cookie("isLogin", null, { path: "/" });
                    layer.msg("登录已过期或失效~~~请重新登录", {time: 1000});
                    setTimeout('window.location.href = "/page/login.html";', 1000);

                }
            } else {
                return msg;
            }
        }, function (err) {
            console.log(err.status);
            /*if(err.status===0){
                $.cookie("isLogin", null, { path: "/" });
                layer.msg("登录已过期或失效~~~请重新登录", {time: 1000});
                setTimeout('window.location.href = "/page/login.html";', 1000);
            }*/
        });
    }

    return {
        getMsg: getMsg,
        logout: function (url) { //安全注销
            $.ajax({
                type: 'post',
                url: url,
                dataType: "json",
                success: function (msg, textStatus) {
                    var res = msg.res;
                    if (res == 1) {
                        $.cookie("username", null, {
                            path: "/"
                        });
                        $.cookie("isLogin", null, {
                            path: "/"
                        });
                        // location.href = "/";
                        setTimeout('window.location.href="/"', 1000);
                    } else if (res == 301) {
                        location.href = skipLinkObj.loginUrl;
                    }
                }
            });
        },
        Alert: function (type, msg) { //提示框
            var $alert = $("#alert");
            if (type == "success") {
                $alert.removeClass("alert-warning").addClass("alert-success").text(msg);
            } else {
                $alert.removeClass("alert-success").addClass("alert-warning").text(msg);
            }
            $alert.fadeIn();
            setTimeout(function () {
                $alert.fadeOut();
            }, 1000);
        },
        GetQueryString: function (name) { //获取url参数
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]);
            return null;
        },
        centerblock: function () {
            var maxHeight = 0;
            var boxTop = 0;
            function myBrowser() {
                var userAgent = navigator.userAgent;
                var isOpera = userAgent.indexOf("Opera") > -1;
                if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
                    return "IE";
                }
            }
            var mb = myBrowser();
            if ("IE" == mb) {
                maxHeight = (document.body.offsetHeight) + "px";
                pwdBoxTop = ((document.body.offsetHeight) - $(".center-box").height() - 88) / 2 + "px";
            } else {
                maxHeight = (window.innerHeight) + "px";
                pwdBoxTop = ((window.innerHeight) - $(".center-box").height() - 88) / 2 + "px";
            }
            $("body").css("max-height", maxHeight);
            $(".center-box").css("margin-top", pwdBoxTop);
            $(".center-box").css("margin-bottom", pwdBoxTop);
        },
        formatDate: function (str) {  //整理日期格式
            function checkTime(i) {
                if (i < 10) { i = "0" + i; }
                return i;
            }

            if (str && str !== "") {
                // str = str.replace(/-/g, "/");
                var date = new Date(str);
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();
                year = checkTime(year);
                month = checkTime(month);
                day = checkTime(day);
                str = year + "-" + (month) + "-" + day;
                return str;
            }
        },
        addActiveClass: function (index) {
            var childrens = $("#footer_tabbar").children();
            childrens.each(function (index1, element1) {
                $(element1).removeClass("weui-bar__item_on");
                var imgAndp = $(element1).children();
                var str = imgAndp.attr('class');
                var test = new RegExp("-", "g");
                var result = str.match(test);
                if (result.length > 1) {
                    var k = result.indexOf('-lv');
                    var newCls = result.substring(0, k);
                    imgAndp.attr('class', newCls);
                }
                if (index == index1) {
                    //字体变色
                    $(element1).addClass("weui-bar__item_on");
                    var str = imgAndp.attr('class') + '-lv';
                    imgAndp.css({
                        'font-weight': 'normal',
                        'color': '#2CC27B'
                    });
                    $(imgAndp[0]).attr("class", str);
                }
            });
        },
        manageSideBar: function () {
            var flag1 = false;
            var flag2 = false;
            var flag3 = false;
            var flag4 = false;
            var flag5 = false;
            var flag6 = false;
            getMsg(apiUrl + "/admin/module/module/queryModules" ).done(function (msg) {
                if (msg.res == 1) {
                    var objList = msg.obj;
                    for (var i = 0; i < objList.length; i++) {
                        var module = objList[i];
                        var id = module.moduleId;
                        var pid = module.parentId;
                        if(id == 7){
                            $("#goodsList").css("display","block");
                            flag1 = true;
                        }
                        if(id == 8){
                            $("#goodsOrder").css("display","block");
                            flag1 = true;
                        }
                        if(id == 9){
                            $("#goodsCatory").css("display","block");
                            flag1 = true;
                        }
                        if(id == 18){
                            $("#goodsRegion").css("display","block");
                            flag1 = true;
                        }
                        if(id == 10){
                            $("#memberManage").css("display","block");
                            flag2 = true;
                        }
                        if(id == 11){
                            $("#messageManage").css("display","block");
                            flag2 = true;
                        }
                        if(id == 12){
                            $("#articleManage").css("display","block");
                            flag3 = true;
                        }
                        if(id == 13){
                            $("#adManage").css("display","block");
                            flag4 = true;
                        }
                        if(id == 14){
                            $("#goodsReport").css("display","block");
                            flag5 = true;
                        }
                        if(id == 15){
                            $("#orderReport").css("display","block");
                            flag5 = true;
                        }
                        if(id == 16){
                            $("#adminManage").css("display","block");
                            flag6 = true;
                        }
                        if(id == 17){
                            $("#roleManage").css("display","block");
                            flag6 = true;
                        }
                        if(flag1){
                            $("#div1").css("display","block");
                        }
                        if(flag2){
                            $("#div2").css("display","block");
                        }
                        if(flag3){
                            $("#div3").css("display","block");
                        }
                        if(flag4){
                            $("#div4").css("display","block");
                        }
                        if(flag5){
                            $("#div5").css("display","block");
                        }
                        if(flag6){
                            $("#div6").css("display","block");
                        }
                        if(flag1 || flag2 || flag3 && flag4 || flag5 || flag6){
                            $('.container-wrap').css('display','block')
                        }
                    }
                }
                // location.href = "/page/manage_login.html";
            });
        }

    };
});
