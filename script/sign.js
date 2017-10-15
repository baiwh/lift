$(function () {
    // 注册登录切换
    $("#li-signUp").click(function () {
        $(this).attr('class','cli');
        $("#li-signIn").attr('class','no_cli');
        $("#signUp").show();
        $("#signIn").hide();
    })
    $("#li-signIn").click(function () {
        $(this).attr('class','cli');
        $("#li-signUp").attr('class','no_cli');
        $("#signIn").show();
        $("#signUp").hide();
    })
    // 判空验证
    function checkNull (inputId,infoId,tip) {
        var inputValue=$("#"+inputId).val();
        var info=$("#"+infoId);
        if (inputValue==""){
            info.html(tip+"不能为空");
            return;
        }else {
            info.html("√").attr('class','pass');
        }
    }
    // 邮箱
    $("#email").blur(function () {
        // 判空
        checkNull("email","emailInfo","邮箱");
        // 判断格式
        var pattern=/\b(^['_A-Za-z0-9-]+(\.['_A-Za-z0-9-]+)*@([A-Za-z0-9-])+(\.[A-Za-z0-9-]+)*((\.[A-Za-z0-9]{2,})|(\.[A-Za-z0-9]{2,}\.[A-Za-z0-9]{2,}))$)\b/;
        var emailVal=$("#email").val();
        var info=$("#emailInfo");
        if (!pattern.test(emailVal)){
            info.html("邮箱格式不正确");
        }else {
            // info.html("√").attr('class','pass');
        }
        // 查重
    })
    // 密码
    $("#pwd").blur(function () {
        // 判空
        checkNull("pwd","pwdInfo","密码");
        // 强弱
    })
    // 重复密码
    $("#pwd2").blur(function () {
        // 判空
        checkNull("pwd2","pwd2Info","重复密码");
        // 一致
        var password=$("#pwd").val();
        var password2=$("#pwd2").val();
        if (password2!=""){
            if (password!=password2){
                $("#pwd2Info").html("两次密码不一致");
            }else {
                $("#pwd2Info").html("√").attr('class','pass');
            }
        }

    })
    // 验证码
    $("#verifyCode").blur(function () {
        // 判空
        checkNull("verifyCode","verifyInfo","验证码");
        // 对错
    })






})
