


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
        }
    }

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
            info.html("");
        }
        // 查重
    })
    $("#pwd").blur(function () {
        // 判空
        checkNull("pwd","pwdInfo","密码");
        // 强弱

    })
    $("#pwd2").blur(function () {
        checkNull("pwd2","pwd2Info","重复密码");
    })
    $("#verifyCode").blur(function () {
        checkNull("verifyCode","verifyInfo","验证码");
    })






})
