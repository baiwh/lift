/**
 * Created by 白 on 2017/10/26.
 */
$(function () {
    // 获取当前时间
    var date=new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();
    var hour=date.getHours();
    var minute=date.getMinutes();
    // 如果分钟小于10。前边加个0
    if (minute<10){
        minute="0"+minute;
    }
    // 给当天的日期去掉透明度
    $(".theYear:contains("+year+")").animate({"opacity":"1"});
    $(".theMonth:contains("+month+")").animate({"opacity":"1"});
    $(".theDay:contains("+day+")").animate({"opacity":"1"});
    // 调整到指定位置
    $(".year").animate({"scrollTop":(year-2017)*40});
    $(".month").animate({"scrollTop":(month-1)*40});
    $(".day").animate({"scrollTop":(day-1)*40});


    // 鼠标移入便签范围。显示垃圾桶
    $("body").on("mouseover",".note",function () {
        $(this).find(".delNote").show();
    })

    // 鼠标移出便签范围。隐藏垃圾桶
    $("body").on("mouseout",".note",function () {
        $(this).find(".delNote").hide();
    })

    // 鼠标点击某个便签
    $("body").on("click",".noteInput",function (){
        // 添加选中效果
        $(this).parent().addClass("choose");
        $(this).parent().parent().find(".hour").css("color","#009cff");
        // 其他的去掉选中效果
        $(this).parent().parent().siblings().find(".notes").removeClass("choose");
        $(this).parent().parent().siblings().children(".hour").css("color","#c2c2c2");
    })

    // 鼠标离开输入框
    $("body").on("blur",".noteInput",function () {
        // 计算出时和分
        var time=""+hour+":"+minute;
        // 赋给对应的span
        $(this).parent().parent().find(".hour span").html(time);
        // 回传一个Ajax
        // 获取它的内容
        var noteInput=$(this).find("span").html();
    })

    // 点击垃圾桶就删除他爸爸
    $("body").on("click",".delNote",function () {
        $(this).parent().remove();
        // 回传一个Ajax
    })

    // 点击加号。添加新的
    $("body").on("click","#add",function () {
        $(".contents").prepend("<div class=\"note newNote\"><div class=\"hour\"><span></span></div><input type=\"hidden\" class=\"noteId\"><div class=\"notes\"><div class=\"noteInput\" contenteditable=\"true\"><br/></div></div><img class=\"delNote\" src=\"icon/del.png\" alt=\"\"></div>");
        var time=""+hour+":"+minute;
        $(".newNote").find(".hour span").html(time);
        if($(".newNote").is(":hidden")){
            $(".newNote").slideDown();
        }
        // 回传一个Ajax
    })

    // 点击时间的span
    $(".theTime span").click(function () {

        // 它同级的透明度0.3
        $(this).siblings().animate({"opacity":"0.3"});
        // 去掉透明度
        $(this).animate({"opacity":"1"});

        // 获取这个数字
        var number=$(this).html();
        if(number<100){
            // 月和日的span往上挪.先获取点击的HTML。然后*40
            var scroll=(number-1)*40;
            $(this).parent().animate({"scrollTop":scroll});
        }else {
            // 年的先减2016
            number=number-2016;
            var scroll=(number-1)*40;
            $(this).parent().animate({"scrollTop":scroll});
        }

        // 传个什么？？
    })


})