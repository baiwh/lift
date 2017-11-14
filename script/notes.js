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
    $(".theYear:contains("+year+")").animate({"opacity":"1"}).addClass("choose").attr("id","chooseYear");
    $(".theMonth:eq("+(month-1)+")").animate({"opacity":"1"}).addClass("choose").attr("id","chooseMonth");
    $(".theDay:eq("+(day-1)+")").addClass("choose").attr("id","chooseDay");

    // 调整到指定位置
    $(".year").animate({"scrollTop":(year-2017)*40});
    $(".month").animate({"scrollTop":(month-1)*40});
    $(".day").animate({"scrollTop":(day-1)*40});


    // 鼠标移入便签范围。显示垃圾桶
    $("body").on("mouseover",".note",function () {
        $(this).find(".delNote").show();
        $(this).find(".delNote").attr("display", "block");
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

    var userId=$("#userId").val();

    // 鼠标离开输入框
    $("body").on("blur",".noteInput",function () {
        // // 计算出时和分
        // var time=""+hour+":"+minute;
        // // 赋给对应的span
        // $(this).parent().parent().find(".hour span").html(time);
        // 获取它的内容
        var noteInput=$(this).html();
        var noteId=$(this).parent().prev().val();
        var allTime=""+year+"-"+month+"-"+day+"/"+hour+":"+minute;
        // 回传一个Ajax
        $.ajax({
            url: "/note/updateNote.action",
            dataType: "json",
            async: false,
            data: {
                "allTime":allTime,
                "noteId":noteId,
                "content":noteInput,
                "userId": userId
            },
            type: "POST",
            success: function (data) {
                if(data.status){

                }else {
                    alert("数据过长")
                }


            },
            error: function () {
                // alert("服务器错误");
                // return;
            }
        });

    })

    // 点击垃圾桶就删除他爸爸
    $("body").on("click",".delNote",function () {
        var flag=0;
        // 回传一个Ajax
        var noteId=$(this).siblings("input").val();
        $.ajax({
            url: "/note/updateNote.action",
            dataType: "json",
            async: false,
            data: {
                "noteId":noteId,
                "userId": userId,
                "del":"yes"
            },
            type: "POST",
            success: function (data) {
                if(data.status) {
                    alert("删除成功");
                }
                flag=1;
            },
            error: function () {
                // alert("服务器错误");
                // return;
            }
        });
        if (flag=1){
            $(this).parent().remove();
        }
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
        var noteId=$(".contents").children("input:first").val();
        $.ajax({
            url: "/note/insertNote.action",
            dataType: "json",
            async: false,
            data: {
                "userId": userId
            },
            type: "POST",
            success: function (data) {
                if(data.status) {
                    $(".contents").prepend("<div class=\"note newNote\"><div class=\"hour\"><span></span></div><input type=\"hidden\" class=\"noteId\"><div class=\"notes\"><div class=\"noteInput\" contenteditable=\"true\"><br/></div></div><img class=\"delNote\" src=\"/icon/del.png\" alt=\"\" ></div>");
                    var time=""+hour+":"+minute;
                    $(".newNote").find(".hour span").html(time);
                    $(".newNote").find(".noteId").val(data.data);
                    if($(".newNote").is(":hidden")){
                        $(".newNote").slideDown();
                    }
                    alert("新增note成功")
                }else {
                    alert("新增note失败")
                }

            },
            error: function () {
                // alert("服务器错误");
                // return;
            }
        });
    })


    $(".theYear").click(function () {
        // 如果点击的这个是choose。且没有选择日和月。就去掉透明度。
        if($(this).hasClass("choose")&&($("#chooseDay").length<1)&&($("#chooseMonth").length<1)){
            $(this).animate({"opacity":"0.3"}).removeClass("choose");
            //去掉id
            $(this).attr("id","");
            $(this).siblings().attr("id","");
            time(null,null);
        }else {
            // 它同级的透明度0.3
            $(this).siblings().animate({"opacity":"0.3"}).removeClass("choose");
            // 不透明
            $(this).animate({"opacity":"1"}).addClass("choose");
            //给它加上id
            $(this).attr("id","chooseYear");
            $(this).siblings().attr("id","");
            // 获取这个数字
            var number=$(this).html();
            // 年的先减2016
            number=number-2017;
            var scroll=number*40;
            $(this).parent().animate({"scrollTop":scroll});
            // 如果选择了月
            if($("#chooseMonth").length>0){
                // 选择了日
                if($("#chooseDay").length>0){
                    var startTime=$(this).html()+"-"+$("#chooseMonth").html()+"-"+$("#chooseDay").html();
                    var endTime=$(this).html()+"-"+$("#chooseMonth").html()+"-"+$("#chooseDay").html();
                }
                if($("#chooseDay").length<1){
                    var startTime=$(this).html()+"-"+$("#chooseMonth").html()+"-01";
                    var endTime=$(this).html()+"-"+$("#chooseMonth").html()+"-31";
                }
            }else {
                var startTime=$(this).html()+"-01-01";
                var endTime=$(this).html()+"-12-31";
            }
            time(startTime,endTime);
        }
    })
    $(".theMonth").click(function () {
        // 如果点击的这个是choose。就去掉透明度。
        if($(this).hasClass("choose")&&($("#chooseDay").length<1)){
            $(this).animate({"opacity":"0.3"}).removeClass("choose");
            //去掉id
            $(this).attr("id","");
            $(this).siblings().attr("id","");
            var startTime=$("#chooseYear").html()+"-01-01";
            var endTime=$("#chooseYear").html()+"-12-31";
            time(startTime,endTime);
        }else {
            // 如果年已经被选中
            if ($("#chooseYear").length>0){
                // 它同级的透明度0.3
                $(this).siblings().animate({"opacity":"0.3"}).removeClass("choose");
                // 不透明
                $(this).animate({"opacity":"1"}).addClass("choose");
                //给它加上id
                $(this).attr("id","chooseMonth");
                $(this).siblings().attr("id","");
                // 获取这个数字
                var number=$(this).html();
                // 月和日的span往上挪.先获取点击的HTML。然后*40
                var scroll=(number-1)*40;
                $(this).parent().animate({"scrollTop":scroll});
                // 如果选择了日
                if($("#chooseDay").length>0){
                    var startTime=$("#chooseYear").html()+"-"+$(this).html()+"-"+$("#chooseDay").html();
                    var endTime=$("#chooseYear").html()+"-"+$(this).html()+"-"+$("#chooseDay").html();
                }else {
                    var startTime=$("#chooseYear").html()+"-"+$(this).html()+"-01";
                    var endTime=$("#chooseYear").html()+"-"+$(this).html()+"-31";
                }
                time(startTime,endTime);
            }
        }
    })
    $(".theDay").click(function () {
        // 如果点击的这个是choose。就去掉透明度。
        if($(this).hasClass("choose")){
            $(this).animate({"opacity":"0.3"}).removeClass("choose");
            //去掉id
            $(this).attr("id","");
            $(this).siblings().attr("id","");
            var startTime=$("#chooseYear").html()+"-"+$("#chooseMonth").html()+"-01";
            var endTime=$("#chooseYear").html()+"-"+$("#chooseMonth").html()+"-31";
            time(startTime,endTime);
        }else {
            // 如果年月已经被选中
            if(($("#chooseYear").length>0)&&($("#chooseMonth").length>0)){
                // 它同级的透明度0.3
                $(this).siblings().animate({"opacity":"0.3"}).removeClass("choose");
                // 不透明
                $(this).animate({"opacity":"1"}).addClass("choose");
                //给它加上id
                $(this).attr("id","chooseDay");
                $(this).siblings().attr("id","");
                // 获取这个数字
                var number=$(this).html();
                // 月和日的span往上挪.先获取点击的HTML。然后*40
                var scroll=(number-1)*40;
                $(this).parent().animate({"scrollTop":scroll});
                var startTime=$("#chooseYear").html()+"-"+$("#chooseMonth").html()+"-"+$(this).html();
                var endTime=$("#chooseYear").html()+"-"+$("#chooseMonth").html()+"-"+$(this).html();
                time(startTime,endTime);
            }
        }
    })




    //时间筛选的Ajax
    function time(startTime,endTime) {
        $("#noteInputForm").load("/note/noteInputList.action?startTime=" + startTime+"&endTime="+endTime);

    }



})