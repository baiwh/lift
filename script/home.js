/**
 * Created by 白 on 2017/10/17.
 */
$(function () {

    // 重要程度选择
    $('body').on('click', '.grade', function () {
        // $(".grade").click(function () {
        // 获取他的同辈div
        var sibl = $(this).siblings("div");
        // 如果他的同辈div是隐藏状态
        if (sibl.is(":hidden")) {
            // 则显示他们
            sibl.show();
        } else {
            //将点击的div设置为选中
            $(this).animate({'opacity': '1'});
            //将其他的同级别Div设置为透明
            sibl.animate({'opacity': '0.1'});
            sibl.hide();
        }
    })


    //新增Div的方法
    function addElementDiv(obj) {
        var parent = document.getElementById(obj);
        //添加 div
        var div = document.createElement("div");
        //设置 div 属性，如 id
        div.setAttribute("class", "newDiv");
        div.innerHTML = "<div class=\"list\" id=\"addList\"><div class=\"stateBar\"><div class=\"grade\" id=\"grade1\"></div><div class=\"grade\" id=\"grade2\" ></div><div class=\"grade\" id=\"grade3\"></div><span class=\"tag theTag\" id=\"newTag1\"  >0</span></div><div class=\"allTag\"><span class=\"tag\">a</span><span class=\"tag\">b</span><span class=\"tag\">c</span></div><div class=\"title\"><input type=\"text\" class=\"listInput\" placeholder=\"标题\"><span class=\"listSpan\">试一试</span></div><div class=\"day\"><input type=\"date\" class=\"listInput\"><span class=\"listSpan\">2017-10-10</span></div><div class=\"rate\"><div class=\"ratio\"></div></div><span class=\"rateVal\" id=\"numb\">0/0</span></div>";
        // 在之后加
        // parent.appendChild(div);
        //在之前加
        parent.prepend(div);
        $(".newDiv").slideDown();
    }

    // 添加新任务
    $("#add").click(function () {
        addElementDiv('list-box');
    })

    // 划掉项目
    $(".items").click(function () {
        var items = $(this).find("input[type=checkbox]");
        if (items.is(":checked")) {
            items.attr("checked", false);
            $(this).find("span").removeClass("spanChecked");
            $(this).find(".checkBox").removeClass("c");

        } else {
            items.attr("checked", true);
            $(this).find("span").addClass("spanChecked");
            $(this).find(".checkBox").addClass("c");

        }
    })

    // 添加新的div。点击切换input
    $(".listSpan").click(function () {
        $(this).hide();
        $(this).siblings().show();
    })
    // 光标离开input。切换回span
    $(".listInput").blur(function () {
        $(this).hide();
        $(this).siblings().show();
        // 获取标题
        var titInput = $(".title").find("input").val();
        // 把input的值赋给span
        if (titInput != "") {
            $(this).parent().find("span").html(titInput);
        }

        // 获取日期
        var datInput = $(".day").find("input").val();
        if (datInput != "") {
            $(this).parent().find("span").html(datInput);
        }


    })
    // 输入的同时详细列表改变信息
    $(".listInput").keyup(function () {
        // 获取标题
        var titInput = $(".title").find("input").val();
        // 把标题赋给h2
        if (titInput != "") {
            $(".item").find("h2").html(titInput);
        }

    })

    // 标签悬浮窗的显示和隐藏
    $(".stateBar span").click(function () {
        // 获取他的悬浮标签
        var tag=$(this).parent().next("div");
        if(tag.is(":hidden")){
            tag.fadeIn();
        }else {
            tag.fadeOut();
        }
    })

    // 点击悬浮窗内的标签。替换悬浮窗外的
    // 当它被点击
    $(".allTag span").click(function () {
        // 获取悬浮窗内被点击的html
        var newTag=$(this).html();
        // 获取要替换的那个tag
        var theTag=$(this).parent().parent().children().find(".theTag");
        // 替换
        theTag.html(newTag);

        // 替换掉大列表里的标签
        $(".item").find(".tag").html(newTag);
        // 隐藏悬浮窗
        $(this).parent().fadeOut();
    })


    // 被选中的小列表加上效果
    $(".list").click(function () {
        $(this).addClass("choose");
        $(this).siblings().removeClass("choose");
    })

    // 标签对详情页的绑定



    // 获取紧急程度的id
    var chooseGrade=choose.find("div:visited").attr("id");
    // 赋给大列表的
    $(".item").find("grade").attr("id",chooseGrade);



})
