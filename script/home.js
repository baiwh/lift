/**
 * Created by 白 on 2017/10/17.
 */
$(function () {
    // 插入新项目
    // $("#add").click(function () {
    //     $("#addList").slideDown();
    // })


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

    $("#add").click(function () {
        addElementDiv('list-box');
    })
    $(".items").click(function(){
        $(this).find("input[type=checkbox]").attr("checked", 'checked');
    });
    // var titleOk=$(".title").children("span");
    // var titleInput=$(".title").children("input");
    // titleOk.click(function () {
    //     titleInput.slideDown();
    // }).blur(function () {
    //     titleInput.slideUp();
    // })

})