/**
 * Created by 白 on 2017/10/26.
 */
$(function () {

    // 鼠标移入便签范围。显示垃圾桶
    $("body").on("mouseover",".note",function () {
        $(this).find(".delNote").show();
    })

    // 鼠标移出便签范围。隐藏垃圾桶
    $("body").on("mouseout",".note",function () {
        $(this).find(".delNote").hide();
    })

    // 鼠标离开输入框
    $("body").on("blur",".noteInput",function () {
        var noteInput=$(this).val();
        // 获取当前时间
        var date=new Date();
        var hour=date.getHours();
        var minute=date.getMinutes();
        var time=""+hour+":"+minute;
        $(".choose").siblings(".hour").find(".theHour").html(time);
    })

    // 改变textarea的高度
    $("body").on("keyup",".noteInput",function () {
        // 获取他的内容
        var noteInput=$(this).val();
        // 赋给他的pre
        $(this).parent().find(".notesPre").html(noteInput);
    })

    // 点击垃圾桶就删除他爸爸
    $("body").on("click",".delNote",function () {
        $(this).parent().remove();
    })

    // 点击加号。添加新的
    $("body").on("click","#add",function () {
        $(".contents").prepend("<div class=\"note newNote\"><div class=\"hour\"><span class=\"theHour\"></span></div><input type=\"hidden\" class=\"noteId\"><div class=\"notes\"><textarea name=\"\" class=\"noteInput\"></textarea></div><img class=\"delNote\" src=\"icon/del.png\" alt=\"\"></div>");
        var date=new Date();
        var hour=date.getHours();
        var minute=date.getMinutes();
        var time=""+hour+"："+minute;
        $(".newNote").find(".theHour").html(time);
        if($(".newNote").is(":hidden")){
            $(".newNote").slideDown();
        }
    })

    // 鼠标点击某个便签
    $("body").on("click",".noteInput",function (){
        // 添加选中效果
        $(this).parent().addClass("choose");
        $(this).parent().parent().siblings().find(".notes").removeClass("choose");
    })


})