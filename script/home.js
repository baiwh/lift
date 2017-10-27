/**
 * Created by 白 on 2017/10/17.
 */


$(function () {
    // 点击编辑标签
    $("body").on("click",".tagChange",function () {
        // 他自己隐藏
        $(this).hide();
        // 全显示
        $(this).siblings().fadeIn();
    })

    // 添加新标签的Ajax
    function addTag(newTag,del) {
        var taskId=$("#taskId").val();
        var userId=$("#userId").val();
        $.ajax({
            url:"",    //请求的url地址
            dataType:"json",   //返回格式为json
            async:false,//请求是否异步，默认为异步，这也是ajax重要特性
            data:{"newTag":newTag,
                "del":del,
                "taskId":taskId,
                "userId":userId},    //参数值
            type:"POST",   //请求方式
            success:function(data){
                if (data.status){

                }else {
                    alert("保存失败");
                }
            },
            error:function(){
                //请求出错处理
                // alert("服务器错误");
                // return;
            }
        });
    }

    // 点击减号
    $("body").on("click",".tagDel",function () {
        // 他前边的span删除
        $(this).prev().remove();
        // 他自己也删除
        $(this).remove();
        var newTag=$(this).prev().html();
        addTag(newTag,"yes");
    })

    // 点击标签的对勾
    $("body").on("click",".tagOk",function () {
        var par = $(this).parent();
        // 新标签隐藏
        par.find(".addTag").hide();
        // 减号隐藏
        par.find(".tagDel").hide();
        // 对勾隐藏
        par.find(".tagOk").hide();
        // 编辑显示
        par.find(".tagChange").fadeIn();
    })

    // 点击添加新标签。添加输入框
    $("body").on("click",".addTag",function (){
        $(this).before("<div class=\"newTag\"><input type=\"hidden\" id=\"\" class=\"detailId\"><input class=\"inputTag\" type=\"text\" placeholder=\"新标签\" ><span class=\"tag\"></span></div>");
    })

    // 鼠标离开新标签输入框。显示新标签。隐藏他自己
    $("body").on("blur",".inputTag",function (){
        var newTag=$(this).val();
        if(newTag!=""){
            $(this).next().html(newTag);
            $(this).next().show();
            $(this).hide();
        }
        tag(newTag,"no");
    })

    // 给页面的第一个小列表加上选中效果
    // $(document).ready(function () {
    //     var div = $("#list-box").find("div:first");
    //     div[0].classList.add("choose");
    //     // console.log(div[0].classList);
    // })
    var div = $("#list-box").find("div:first");
        div[0].classList.add("choose");

    // 被选中的小列表加上效果
    $('body').on('click', '.list', function () {
        // $(".list").click(function () {
        $(this).addClass("choose");
        $(this).siblings().removeClass("choose");
    })

    // 小列表的Ajax
    function updateTask(del){
        var choose=$(".choose");
        var grade=choose.find(".grade:visible").attr("class");
        var tag=choose.find(".theTag1").html();
        var title=choose.find(".title span").html();
        var day=choose.find(".day span").html();
        var taskId=$("#taskId").val();
        var userId=$("#userId").val();
        $.ajax({
            url:"",    //请求的url地址
            dataType:"json",   //返回格式为json
            async:false,//请求是否异步，默认为异步，这也是ajax重要特性
            data:{"grade":grade,
                "tag":tag,
                "title":title,
                "day":day,
                "del":del,
                "taskId":taskId,
                "userId":userId},    //参数值
            type:"POST",   //请求方式
            success:function(data){
                if (data.status){

                }else {
                    alert("保存失败");
                }
            },
            error:function(){
                //请求出错处理
                // alert("服务器错误");
                // return;
            }
        });
    }

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
        // 获取紧急程度的class
        var chooseGrade=$(this).parent().find("div:visible").attr("class");
        // 赋给大列表的
        $(".item").find(".grade").attr("class",chooseGrade).animate({'opacity': '1'});;
        updateTask("no");
    })

    // 修改标题。点击切换input
    $('body').on('click', '.listSpan', function () {
        // $(".listSpan").click(function () {
        $(this).hide();
        $(this).siblings().show();
    })

    // 光标离开标题、日期的input。切换回span
    $('body').on('blur', '.listInput', function () {
        // $(".listInput").blur(function () {
        $(this).hide();
        $(this).siblings().show();
        // 获取输入的值
        var input = $(this).val();
        // 把input的值赋给span
        if (input != "") {
            $(this).parent().find("span").html(input);
        }

        updateTask("no");
    })

    // 取标题赋给输入框
    var chooseTitle=$(".choose").find(".title span").html();
    $(".choose").find(".title input").val(chooseTitle);

    // 输入的同时详细列表标题改变信息
    $('body').on('keyup', '.listInput', function () {
        // $(".listInput").keyup(function () {
        var par=$(this).parent().attr("class");
        if (titInput != ""&&par=="title") {
            // 获取标题
            var titInput = $(this).val();
            // 把标题赋给h2
            $("#item").find("h2").html(titInput);
        }

    })

    // 标签悬浮窗的显示和隐藏
    $('body').on('click', '.stateBar span', function () {
        // $(".stateBar span").click(function () {
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
    $('body').on('click', '.allTag span', function () {
        // $(".allTag span").click(function () {
        // 获取悬浮窗内被点击的html
        var newTag=$(this).html();
        // 获取要替换的那个tag
        var theTag1=$(this).parent().parent().children().find(".theTag1");
        // 替换悬浮窗外的小标签
        theTag1.html(newTag);
        // 替换掉大列表里的标签
        $(".item").find(".tag").html(newTag);
        // 隐藏悬浮窗
        $(this).parent().fadeOut();
        // 颜色替换
        $(this).removeClass("NoChoose");
        $(this).siblings().addClass("NoChoose");
        updateTask("no");
    })

    // 小垃圾桶删除小列表的效果
    $("body").on("click",".del",function () {
        $(this).parent().remove();
        updateTask("yes");
    })

    //新增小列表Div的方法
    function addElementDiv(obj) {
        var parent = document.getElementById(obj);
        //添加 div
        var div = document.createElement("div");
        //设置 div 属性，如 id
        div.setAttribute("class", "list");
        div.innerHTML = "<div class=\"stateBar\"><div class=\"grade grade1\"></div><div class=\"grade grade2\" ></div><div class=\"grade grade3\" ></div><span class=\"tag theTag1\">0</span></div><div class=\"allTag\"><span class=\"tag NoChoose\">1</span><span class=\"tag NoChoose\">2</span><span class=\"tag NoChoose\">3</span></div><div class=\"title\"><input type=\"hidden\" id=\"\" class=\"detailId\"><input type=\"text\" class=\"listInput\" placeholder=\"标题\"><span class=\"listSpan\">标题</span></div><div class=\"day\"><input type=\"hidden\" id=\"\" class=\"detailId\"><input type=\"date\" class=\"listInput\"><span class=\"listSpan\">2017</span></div><div class=\"rate\"><div class=\"ratio\"></div></div><span class=\"rateVal\">0/0</span><img src=\"icon/del.png\" alt=\"\" class=\"del\">";
        //在之前加
        parent.prepend(div);
        $(".newDiv").slideDown();
    }

    // 新增小列表
    function addNewList() {
        var taskId=$("#taskId").val();
        var userId=$("#userId").val();
        $.ajax({
            url:"/task/insertTask.action",    //请求的url地址
            dataType:"json",   //返回格式为json
            async:false,//请求是否异步，默认为异步，这也是ajax重要特性
            data:{
                "taskId":taskId,
                "userId":userId},    //参数值
            type:"POST",   //请求方式
            success:function(data){
                if (data.status){

                }else {
                    alert("保存失败");
                }
            },
            error:function(){
                //请求出错处理
                // alert("服务器错误");
                // return;
            }
        });
    }

    // 添加新任务
    $('body').on('click', '#add', function () {
    // $("#add").click(function () {
        addElementDiv('list-box');
        addNewList();
    })

    //新增新项目Div的方法
    function addItemDiv(obj) {
        var parent = document.getElementById(obj);
        //添加 div
        var div = document.createElement("div");
        //设置 div 属性，如 id
        div.setAttribute("class", "newDiv");
        div.innerHTML = "<div class=\"items\"><input type=\"checkbox\"/><div class=\"checkBox\"></div><span></span></div><div class=\"itemInput\"><input type=\"hidden\" id=\"\" class=\"detailId\"><div class=\"checkBox\"></div><input class=\"changeInput\" type=\"text\" ><img class=\"changeDel\" src=\"icon/del.png\" alt=\"\"></div>";
        // 在之后加
        parent.append(div);
        $(".newDiv").slideDown();

    }

    // 添加新项目
    $('body').on('click', '#newItem', function () {
        // $("#newItem").click(function () {
        addItemDiv('toDoList');
        // 进度条效果
        // 获取小项目的个数
        var len=document.getElementsByClassName("items").length;
        // 获取小项目被选中的个数
        var checkLen=$("#toDoList").find("input[type='checkbox']:checked").length;
        // 获取进度条的条
        var ratio=$(".choose").find(".ratio");
        // 进度条效果
        var leftNum=(-325)+checkLen/len*325;
        ratio.animate({left:leftNum+"px"});
        // 获取进度条下的分数
        var rateVal=$(".choose").find(".rateVal");
        // 进度条下分数效果
        rateVal.html(checkLen+"/"+len);
        // 显示输入框
        $(".newDiv:last").find(".items").slideUp();
        $(".newDiv:last").find(".itemInput").slideDown();
        $(".changeDel").hide();
    })

    // 添加新的小项目Ajax
    function insert(inputData){
        var taskId=$("#taskId").val();
        var userId=$("#userId").val();
        $.ajax({
            url:"/taskDetail/insertTaskDetail.action",    //请求的url地址
            dataType:"json",   //返回格式为json
            async:false,//请求是否异步，默认为异步，这也是ajax重要特性
            data:{"dataList":inputData,
                "taskId":taskId,
                "userId":userId},    //参数值
            type:"POST",   //请求方式
            success:function(data){
                if (data.status){

                }else {
                    alert("保存失败");
                }
            },
            error:function(){
                //请求出错处理
                alert("服务器错误");
                // return;
            }
        });
    }

    // 添加新的小项目。当鼠标离开输入框

        $("body").on("blur",".itemInput",function () {
            // 如果这个输入框可见，且绿色对勾不可见。则隐藏输入框
            if($(this).is(":visible")&&$(".changeOk").is(":hidden")){
                $(".itemInput").slideUp();
                $(".items").slideDown();
            }
            // 获取输入的值，返回到后台
            var data=$(this).find(".changeInput").val();

            insert(data);
        })



    // 划掉项目
    $('body').on('click', '.items', function () {
        // $(".items").click(function () {
        var items = $(this).find("input[type=checkbox]");
        if (items.is(":checked")) {
            items.attr("checked", false);
            $(this).find("span").removeClass("spanChecked");
            $(this).find(".checkBox").removeClass("c");
            // 给后边的input也加上对勾
            $(this).next().find(".checkBox").removeClass("c");
        } else {
            items.attr("checked", true);
            $(this).find("span").addClass("spanChecked");
            $(this).find(".checkBox").addClass("c");
            $(this).next().find(".checkBox").addClass("c");
        }

        // 进度条效果
        // 获取小项目的个数
        var len=document.getElementsByClassName("items").length;
        // 获取小项目被选中的个数
        var checkLen=$("#toDoList").find("input[type='checkbox']:checked").length;
        // 获取进度条的条
        var ratio=$(".choose").find(".ratio");
        // 进度条效果
        var leftNum=(-325)+checkLen/len*325;
        ratio.animate({left:leftNum+"px"});
        // 获取进度条下的分数
        var rateVal=$(".choose").find(".rateVal");
        // 进度条下分数效果
        rateVal.html(checkLen+"/"+len);
        // 返回数据
        var changeInput=$(this).parent().next().find(".changeInput").val();
        var inputId=$(this).parent().next().find(".detailId").attr("id");
        var check=$(".items").find("input").is(":checked");
        update(changeInput,inputId,'update',check);
    })


    // 编辑按钮效果
    $(".change").click(function () {
        // 原span隐藏。输入框出现
        $(".items").slideUp();
        $(".itemInput").slideDown();
        // 加号隐藏。对勾出现
        $(".add").slideUp();
        $(".changeOk").slideDown();
        $(".changeDel").show();
    })

    // 修改状态下的详细列表的Ajax
    function update(inputData,inputId,actionType,check){
        var taskId=$("#taskId").val();
        var userId=$("#userId").val();
        $.ajax({
            url:"/taskDetail/updateTaskDetail.action",    //请求的url地址
            dataType:"json",   //返回格式为json
            async:false,//请求是否异步，默认为异步，这也是ajax重要特性
            data:{"dataList":inputData,
                "id":inputId,
                "actionType":actionType,
                "isChecked":check,
                "taskId":taskId,
                "userId":userId},    //参数值
            type:"POST",   //请求方式
            success:function(data){
                if (data.status){
                }else {
                    alert("保存失败");
                }
            },
            error:function(){
                //请求出错处理
                // alert("服务器错误");
                // return;
            }
        });
    }

    // detail修改输入框鼠标离开时将数据赋给原来的span
    $("body").on("blur",".changeInput",function () {
        // 他自己的值
        var changeInput=$(this).val();
        $(this).parent().prev().find("span").html(changeInput);
        // 往后台传id和内容
        // 他的hidden的id
        var inputId=$(this).parent().find("input:hidden").attr("id");
        var check=$(this).parent().prev().find("input").is(":checked");
        update(changeInput,inputId,"ud",check);
    })


    // 点垃圾桶删除这个小项目
    $("body").on("click",".changeDel",function () {
        $(this).parent().prev().remove();
        $(this).parent().remove();
        // 获取他的值
        var val=$(this).parent().find(".changeInput").val();
        // 获取他的id
        var inputId=$(this).parent().find("input:hidden").attr("id");
        var check=$(this).parent().prev().find("input").is(":checked");

        // 进度条效果
        // 获取小项目的个数
        var len=document.getElementsByClassName("items").length;
        // 获取小项目被选中的个数
        var checkLen=$("#toDoList").find("input[type='checkbox']:checked").length;
        // 获取进度条的条
        var ratio=$(".choose").find(".ratio");
        // 进度条效果
        var leftNum=(-325)+checkLen/len*325;
        ratio.animate({left:leftNum+"px"});
        // 获取进度条下的分数
        var rateVal=$(".choose").find(".rateVal");
        // 进度条下分数效果
        rateVal.html(checkLen+"/"+len);

        update(val,inputId,"del",check);
    })

    // // 编辑状态下的添加小项目
    // $("body").on("click",".changeAdd",function () {
    //     $(this).parent().after("<div class=\"items\"><input type=\"checkbox\"/><div class=\"checkBox\"></div><span></span></div><div class=\"itemInput\"><input type=\"hidden\" id=\"\" class=\"detailId\"><div class=\"checkBox\"></div><input class=\"changeInput\" type=\"text\" ><img class=\"changeDel\" src=\"icon/del.png\" alt=\"\"></div>");
    //     $(this).parent().next().slideUp();
    //     $(this).parent().next().next().slideDown();
    // })


    // 点对勾恢复原样
    $("body").on("click",".changeOk",function () {
        $(".itemInput").slideUp();
        $(".items").slideDown();
        $(".changeOk").slideUp();
        $(".add").slideDown();
    })






    // 点击标签筛选
    // $("body").on("click",".select",function (){
    //     // 获取点击的那个标签的值
    //     var select=$(this).html();
    //     var beSelect=$(".theTag1").html();
    //     if(select==beSelect){
    //         $(".theTag1").parent().parent().show();
    //     }else {
    //         $(".theTag1").parent().parent().hide();
    //     }
    //
    // })



})
