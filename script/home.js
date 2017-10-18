/**
 * Created by 白 on 2017/10/17.
 */
$(function () {

    var tag = $(".tag").innerHTML;
    if (tag == "") {
        $(".tag").removeClass("haveTag").addClass("haveNotTag");
    } else {
        $(".tag").removeClass("haveNotTag").addClass("haveTag");
    }

    // var tit=$("#title input").val();
    // if (tit!=""){
    //     $("#tit input").blur(function () {
    //         $("#tit input").replaceWith("<span></span>");
    //     })
    // }


    // 重要程度选择
    $(".grade").click(function () {
        var sibl = $(this).siblings("div");
        sibl.hide();
        $(this).animate({'opacity': '1'}).siblings("div").animate({'opacity': '0.1'});

        if (sibl.is(":hidden")) {
            $(this).click(function () {
                sibl.show();
            })
        }
    })

    //新增Div的方法
    function addElementDiv(obj) {
        var parent = document.getElementById(obj);
        //添加 div
        var div = document.createElement("div");
        //设置 div 属性，如 id
        div.setAttribute("class", "newDiv");
        div.innerHTML = " <div class=\"list\"> <div class=\"other\" > <div class=\"grade\"> </div> <span class=\"tag\"> 家 </span> </div> <div class=\"title\"> <span>最近怎么总下雨</span> </div> <div class=\"day\"> <span>2017.10.10</span> </div> <div class=\"rate\"> <div class=\"ratio\"> </div> </div> <span class=\"rateVal\">2/5</span> </div>";
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
        var items=$(this).find("input[type=checkbox]");
        if (items.is(":checked")){
            items.attr("checked",false);
            $(this).find("span").removeClass("spanChecked");
        }else {
            items.attr("checked",true);
            $(this).find("span").addClass("spanChecked");
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
        var titInput=$(".title").find("input").val();
        // 把input的值赋给span
        if (titInput!=""){
            $(this).parent().find("span").html(titInput);
        }

        // 获取日期
        var datInput=$(".day").find("input").val();
        if(datInput!=""){
            $(this).parent().find("span").html(datInput);
        }


    })

})
