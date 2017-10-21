
$(function () {
    // 注册登录切换
    $("#li-signUp").click(function () {
        $(this).attr('class', 'cli');
        $("#li-signIn").attr('class', 'no_cli');
        $("#signUp").show();
        $("#signIn").hide();
    })
    $("#li-signIn").click(function () {
        $(this).attr('class', 'cli');
        $("#li-signUp").attr('class', 'no_cli');
        $("#signIn").show();
        $("#signUp").hide();
    })

    // 判空验证
    function checkNull(inputId, infoId, tip) {
        var inputValue = $("#" + inputId).val();
        var info = $("#" + infoId);
        if (inputValue == "") {
            info.html(tip + "不能为空").attr("class", "info");
            return;
        } else {
            info.html("");
        }
    }

    // 邮箱
    $("#email").blur(function () {
        // 判空
        checkNull("email", "emailInfo", "邮箱");
        // 判断格式
        var pattern = /\b(^['_A-Za-z0-9-]+(\.['_A-Za-z0-9-]+)*@([A-Za-z0-9-])+(\.[A-Za-z0-9-]+)*((\.[A-Za-z0-9]{2,})|(\.[A-Za-z0-9]{2,}\.[A-Za-z0-9]{2,}))$)\b/;
        var emailVal = $("#email").val();
        var info = $("#emailInfo");
        if (emailVal != '') {
            if (!pattern.test(emailVal)) {
                info.html("邮箱格式不正确").attr('class', 'info');
            } else {
                info.html("√").attr('class', 'pass');
            }
        }
        // 查重
    })

    // 密码
    $("#pwd").blur(function () {
        // 判空
        checkNull("pwd", "pwdInfo", "密码");
    }).keyup(function () {
        // 强弱
        var regxs = new Array();
        regxs[0] = /[^a-zA-Z0-9_]/g;
        regxs[1] = /[a-z]/g;
        regxs[2] = /[0-9]/g;
        regxs[3] = /[A-Z]/g;
        var pwd = $("#pwd").val();
        var len = pwd.length;
        var streng = 0;
        var s1 = $("#strength1");
        var s2 = $("#strength2");
        var s3 = $("#strength3");
        var tab = $("#strengthTab");
        if (len < 6 && pwd != "") {
            $("#pwdInfo").html("密码不能小于六位").attr("class", "info").show();
            $("#strength").hide();
        } else if (pwd != ""){
            $("#strength").show();
            $("#pwdInfo").hide();
            for (i = 0; i < regxs.length; i++) {
                if (pwd.match(regxs[i])) {
                    streng++;
                }
            }
            if(streng == 1) {
                // 弱
                // 第一格变色。除他自己以外的统计元素无色
                s1.attr("class", "red").siblings("span").attr("class", "");
                // 改变标签位置和颜色
                tab.attr("class", "change1").animate({left:"-105px"});
            } else if (streng == 2) {
                // 中
                // 第一格变色
                s1.attr("class", "orange");
                // 第二格变色。他的下一格无色
                s2.attr("class", "orange").next("span").attr("class", "");
                // 改变标签位置和颜色
                tab.attr("class", "change2").animate({left:"-70px"});
            } else if (streng == 3) {
                // 强
                // 第一格变色
                s1.attr("class", "green");
                // 第二格变色
                s2.attr("class", "green");
                // 第三格变色
                s3.attr("class", "green");
                // 改变标签位置和颜色
                tab.attr("class", "change3").animate({left:"-35px"});
            }
        }
    })

    // 重复密码
    $("#pwd2").blur(function () {
        // 判空
        checkNull("pwd2", "pwd2Info", "重复密码");
        // 一致
        var password = $("#pwd").val();
        var password2 = $("#pwd2").val();
        if (password2 != "") {
            if (password != password2) {
                $("#pwd2Info").html("两次密码不一致");
            } else {
                $("#pwd2Info").html("√").attr('class', 'pass');
            }
        }
    })

    // 验证码
    $("#verifyCode").blur(function () {
        // 判空
        checkNull("verifyCode", "verifyInfo", "验证码");
        // 对错
    })

    $("#signInBtn").click(function () {
        $("#indexForm").submit();
    })
    $("#signUpBtn").click(function () {
        // 判断是否为空

        $("#indexForm").action="/index/index.action";
        $("#indexForm").submit();
    })

    // 登录判断用户是否存在
    $("#userName").blur(function () {
        if ($(this).val()!=""){
            $.ajax({
                url:"/index/checkUser.action",    //请求的url地址
                dataType:"json",   //返回格式为json
                async:true,//请求是否异步，默认为异步，这也是ajax重要特性
                data:{"userName":$(this).val()},    //参数值
                type:"POST",   //请求方式
                success:function(data){
                    $("#nameInfo").html("√").attr('class', 'pass');
                },
                error:function(){
                    //请求出错处理
                    $("#nameInfo").html("该用户不存在").attr('class', 'info');
                }
            });
        }
    })

    // 验证登录密码是否正确
    
})
