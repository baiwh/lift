/**
 * Created by 白 on 2017/10/30.
 */
$(function () {

    // 给页面的第一个小列表加上选中效果
    var div = $("#list-box").find("div:first");
    div[0].classList.add("choose");

    // 被选中的小列表加上效果
    $('body').on('click', '.task', function () {
        $(this).addClass("choose");
        $(this).siblings().removeClass("choose");
    })

    // 获取进度条效果
    function ratioAnimation() {
        // 进度条效果
        // 获取小项目的个数
        var len = document.getElementsByClassName("items").length;
        // 获取小项目被选中的个数
        var checkLen = $("#toDoList").find("input[type='checkbox']:checked").length;
        // 获取进度条的条
        var ratio = $(".choose").find(".ratio");
        // 进度条效果
        var leftNum = (-325) + checkLen / len * 325;
        ratio.animate({left: leftNum + "px"});
        // 获取进度条下的分数
        var rateVal = $(".choose").find(".rateVal");
        // 进度条下分数效果
        rateVal.html(checkLen + "/" + len);
    }



    // 恢复的Ajax
    function update() {
        var userId=$("#userId").val();
        var taskId=$(".choose").find(".taskId").val();
        $.ajax({
            url: "",
            dataType: "json",
            async: false,
            data: {
                "taskId": taskId,
                "userId": userId
            },    //参数值
            type: "POST",   //请求方式
            success: function (data) {

            },
            error: function () {

            }
        });

    }

    // 恢复
    $(".del").click(function () {
        update();
        $(this).parent().remove();
    })




    // 点击标签筛选
    $("body").on("click", ".select", function () {

        // 获取选取标签的id
        var selectId = $(this).next().next().val();
        // $(window).attr('location','/task/list.action?label='+selectId);

        // 他自己是蓝的。别的全是灰的
        $(this).removeClass("NoChoose");
        $(this).siblings(".tag").addClass("NoChoose");

    })


})
