
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

    // 注册页面邮箱判断
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
                $("#emailInfo").append("<img class='ok' src='/lift/icon/ok.png'>");
            }
        }
        // 查重
    })

    // 注册页面密码判断
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

    // 注册页面重复密码
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
                $("#pwd2Info").append("<img class='ok' src='/lift/icon/ok.png'>");
            }
        }
    })

    // 验证码
    $("#verifyCode").blur(function () {
        // 判空
        checkNull("verifyCode", "verifyInfo", "验证码");
        // 对错
    })


    // 登录
    $("#signInBtn").click(function () {
        // 对两个input进行判断
        var userName=$("#userName").val();
        var password=$("#password").val();
        // 如果都非空。则判断是否正确。否则提示为空
        if(userName!=""&&password!=""){
            $.ajax({
                url:"/index/signIn.action",    //请求的url地址
                dataType:"json",   //返回格式为json
                async:true,//请求是否异步，默认为异步，这也是ajax重要特性
                data:{"userName":userName,
                        "passWord":password},    //参数值
                type:"POST",   //请求方式
                success:function(data){
                    // 如果登录成功。跳转到主页面。否则提示密码错误
                    if (data.status){
                        // 对的
                        $("#indexForm").action="/task/list.action";
                        $("#indexForm").submit();
                    }else {
                        $("#passwordInfo").html("密码错误").attr('class', 'info');
                    }

                },
                error:function(){
                    //请求出错处理
                    alert("服务器错误");
                }
            });
        }else {
            if(userName==""){
                $("#nameInfo").html("请填写用户名").attr('class', 'info');
            }
            if (password==""){
                $("#passwordInfo").html("请输入密码").attr('class', 'info');
            }
        }
    })
    // 注册
    $("#signUpBtn").click(function () {
        // 验证是否为空
        // 判断邮箱是否存在
        // 判断两次密码是否一致

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
                    if (data.status){
                        // 对的
                        $("#nameInfo").append("<img class='ok' src='/lift/icon/ok.png'>");
                    }else {
                        $("#nameInfo").html("该用户不存在").attr('class', 'info');
                    }
                },
                error:function(){
                    //请求出错处理
                    alert("服务器错误");
                }
            });
        }
    })



})
