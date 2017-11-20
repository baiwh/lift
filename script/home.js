/**
 * Created by 白 on 2017/10/17.
 */


$(function () {
    var userId = $("#userId").val();
    $("#search-button").click(function () {
        var taskName = $("#search-text").val();
        $("#searchForm").submit();
    })
    /*=================================================头部标签编辑开始===========================================*/
    // 点击标签筛选
    $("body").on("click", ".select", function () {
        // 获取选取标签的id
        var selectId = $(this).next().next().val();
        // 他自己是蓝的。别的全是灰的
        $(this).addClass("labelChoose");
        $(this).siblings(".tag").removeClass("labelChoose");

    })

    // 点击编辑标签
    $("body").on("click", ".tagChange", function () {
        // 他自己隐藏
        $(this).hide();
        // 全显示
        $(this).siblings().fadeIn();
    })

    // 点击添加新标签。添加输入框
    $("body").on("click", ".addTag", function () {
        $(this).before("<input class=\"inputTag\" type=\"text\" placeholder=\"新标签\" ><span class=\"tag select newTag\"></span><span class=\"tagDel\">-</span><input type=\"hidden\" value=\"\">");
    })

    // 鼠标离开新标签输入框。显示新标签。隐藏输入框
    $("body").on("blur", ".inputTag", function () {
        var labelName = $(this).val();
        var newLabel = $(this);
        addLabel(labelName, newLabel);
        if (labelName != "") {
            $(this).next().html(labelName);
            $(this).next().show();
            $(this).next().next().show();
            $(this).remove();
        }
    })

    // 添加新标签的Ajax
    function addLabel(labelName, newLabel) {
        var userId = $("#userId").val();
        $.ajax({
            url: "/label/insertLabel.action",    //请求的url地址
            dataType: "json",   //返回格式为json
            async: false,//请求是否异步，默认为异步，这也是ajax重要特性
            data: {
                "labelName": labelName,
                "userId": userId
            },
            type: "POST",   //请求方式
            success: function (data) {
                if (data.status) {
                    var labelId = data.data;
                    newLabel.next().next().next().val(labelId);
                    alert("label保存成功")
                } else {
                    alert("保存失败");
                }
            },
            error: function () {
                //请求出错处理
                // alert("服务器错误");
                // return;
            }
        });
    }

    // 点击减号
    $("body").on("click", ".tagDel", function () {
        var newTag = $(this).prev().html();
        var tagId = $(this).next().val();
        var clickLabel = $(this);
        updateLabel(newTag, "yes", tagId, clickLabel);
    })

    function updateLabel(labelName, del, labelId, clickLabel) {
        var userId = $("#userId").val();
        $.ajax({
            url: "/label/updateLabel.action",    //请求的url地址
            dataType: "json",   //返回格式为json
            async: false,//请求是否异步，默认为异步，这也是ajax重要特性
            data: {
                "labelName": labelName,
                "userId": userId,
                "del": del,
                "labelId": labelId
            },
            type: "POST",   //请求方式
            success: function (data) {
                if (data.status) {
                    alert("label删除成功");
                    // 他前边的span删除
                    clickLabel.prev().remove();
                    clickLabel.next().remove();
                    // 他自己也删除
                    clickLabel.remove();
                } else {
                    if (data.data === 1) {
                        alert("此标签正在使用，不能删除");
                    } else {
                        alert("保存失败");

                    }
                }
            },
            error: function () {
                //请求出错处理
                // alert("服务器错误");
                // return;
            }
        });
    }

    // 点击标签的对勾
    $("body").on("click", ".tagOk", function () {
        var par = $(this).parent();
        // 新标签隐藏
        par.find(".addTag").hide();
        // 减号隐藏
        par.find(".tagDel").hide();
        // 对勾隐藏
        par.find(".tagOk").hide();
        // 编辑显示
        par.find(".tagChange").fadeIn();
        // 隐藏输入框
        if ($(".inputTag").val() == "") {
            $(".inputTag").hide();
        }
    })


    /*------------------------------------------------头部标签编辑结束------------------------------------------------*/


    /*=================================================TaskDiv操作开始==============================================*/

    // 给页面的第一个小列表加上选中效果
    var div = $("#list-box").find("div:first");
    if(div.length>0) {

        div[0].classList.add("choose");
    }

    // 被选中的小列表加上效果
    //会引起冒泡事件
    $('body').on('click', '.task', function () {
        // $(".task").click(function () {
        $(this).addClass("choose");
        $(this).siblings().removeClass("choose");
        var taskId = $(this).find(".taskId").val();
        $("#detailForm").load("../taskDetail/list.action?taskId=" + taskId);
    })


    // 小列表的Ajax
    function updateTask(del, clickDiv) {
        var grade = clickDiv.find(".grade:visible").find("input").val();
        var labelName = clickDiv.find(".theTag1").html();
        var labelId = clickDiv.find(".labelId").val();
        var title = clickDiv.find(".title span").html();
        var day = clickDiv.find(".day span").html();
        var taskId = clickDiv.find(".taskId").attr("value");
        var userId = $("#userId").val();
        $.ajax({
            url: "../task/updateTask.action",    //请求的url地址
            dataType: "json",   //返回格式为json
            async: false,//请求是否异步，默认为异步，这也是ajax重要特性
            data: {
                "gradeId": grade,
                "labelName": labelName,
                "labelId": labelId,
                "taskName": title,
                "createTime": day,
                "del": del,
                "taskId": taskId,
                "userId": userId
            },    //参数值
            type: "POST",   //请求方式
            success: function (data) {
                if (data.status) {
                    if (del == "yes") {
                        clickDiv.remove();
                    }
                    // alert("保存成功");
                } else {
                    alert("保存失败");
                }
            },
            error: function () {
                //请求出错处理
                alert("服务器错误");
                // return;
            }
        });
    }

    // 在载入页面的时候将重要程度设为不透明
    var taskNo = $(".stateBar").find(".gradeBox").prev().find("input").length;
    for (var i = 0; i < taskNo; i++) {
        if ($(".stateBar").find(".gradeBox").prev().find("input")[i].value !== "") {
            $(".stateBar").find(".gradeBox").prev().animate({'opacity': '1'});
        }
    }

    $('body').on('click', '.grade', function (e) {
        // 如果点击的不是detail里的grade
        if ($(this).parent().parent().attr("class") != "header") {
            //若是点击单个grade
            if ($(this).parent().attr("class") != "gradeBox") {
                $(this).hide();
                $(this).next().show();
                /* 在取多个class的时候，不能有空格而且需要用"."或者","来分隔，
             不过我们将动画效果移入到下面的function中，就不需要取这个class了*/
                var gradeClass = $(this).attr("class");
                gradeClass = "." + gradeClass.replace(" ", ".");
                //将gradeBox中，与该单个Grade相同颜色的grade，设置为不透明。
                $(this).next().find(gradeClass).animate({'opacity': '1'});
                e.stopPropagation();
                $(this).closest(".task").addClass("choose");
                $(this).closest(".task").siblings().removeClass("choose");
            } else {
                // 如果点的是gradeBox。显示单个grade。隐藏gradeBox
                $(this).parent().prev().show();
                $(this).parent().hide();
                // 获取被选中的class和val，赋值给单个的grade，透明度改为1
                var gradeClass = $(this).attr("class");
                var gradeVal = $(this).find("input").val();
                //获取单个grade的div
                var grade = $(this).parent().prev();
                grade.attr("class", gradeClass);
                grade.find("input").attr("value", gradeVal);
                grade.animate({'opacity': '1'});
                //获取选中的grade。将他的透明度设为1.其他的设为0.1
                $(this).siblings().animate({'opacity': '0.1'});
                $(this).animate({'opacity': '1'});
                // 返回val到后台进行更新
                var clickDiv = $(this).parent().parent().parent();
                updateTask("no", clickDiv);
                $(".header").children().find(".grade").attr("class", gradeClass);
                e.stopPropagation();
                $(this).closest(".task").addClass("choose");
                $(this).closest(".task").siblings().removeClass("choose");
            }
        }
    })

    // 点击日期和标题，从span切换成input
    $('body').on('click', '.listSpan', function (e) {
        var str = $(this).html();
        $(this).prev().attr("value", str);
        // 让span隐藏，input显示
        $(this).hide();
        $(this).siblings().show();
        e.stopPropagation();
        $(this).closest(".task").addClass("choose");
        $(this).closest(".task").siblings().removeClass("choose");
    });

    // 日期和标题的onblur事件，对修改进行保存
    $('body').on('blur', '.listInput', function (e) {
        // 获取输入的值
        var input = $(this).val();
        // 把input的值赋给span
        if (input != "") {
            $(this).parent().find("span").html(input);
        }
        $(this).hide();
        $(this).siblings().show();
        // 获取当前点击的taskDiv
        var clickDiv = $(this).parent().parent();
        updateTask("no", clickDiv);
        e.stopPropagation();
        $(this).closest(".task").addClass("choose");
        $(this).closest(".task").siblings().removeClass("choose");
    })

    // 阻止冒泡
    $('body').on('click', '.listInput', function (e) {
        e.stopPropagation();
        $(this).closest(".task").addClass("choose");
        $(this).closest(".task").siblings().removeClass("choose");
    })

    // 初始化页面时，js取task标题赋值给detail标题
    var chooseTitle = $(".choose").find(".title span").html();
    $(".choose").find(".title input").val(chooseTitle);

    //  获取标题，将detail的标题与task的标题同步
    $('body').on('keyup', '.listInput', function () {
        var par = $(this).parent().attr("class");
        // 若点击的是title下面的input
        if (titInput != "" && par == "title") {
            var titInput = $(this).val();
            $("#item").find("h2").html(titInput);
        }

    })

    // 标签悬浮窗的显示和隐藏
    $('body').on('click', '.stateBar span', function (e) {
        var labelId = $(this).prev().val();
        $(".allTag").load("../label/getLabelList.action?userId=" + userId + "&labelId=" + labelId);
        // 获取他的悬浮标签
        var tag = $(this).parent().next("div");
        if (tag.is(":hidden")) {
            // //如果点击的是悬浮窗外的标签。显示悬浮窗
            tag.fadeIn();
            // // 获取这个标签的html。找到悬浮窗内相同的。变成蓝色。其他的变成灰色。
            // var label = $(this).html();
            // tag.find("span").addClass("NoChoose");
            // tag.find("span:contains(" + label + ")").removeClass("NoChoose");
        } else {
            //如果点击的是悬浮窗内的标签。隐藏悬浮窗
            tag.fadeOut();
        }
        e.stopPropagation();
        $(this).closest(".task").addClass("choose");
        $(this).closest(".task").siblings().removeClass("choose");
    })

    // 点击悬浮窗内的标签。替换悬浮窗外的
    $('body').on('click', '.allTag span', function (e) {
        // 获取悬浮窗内被点击的html
        var newLabel = $(this).html();
        var newLabelId = $(this).prev().val();
        // 获取要替换的那个tag
        var labelName = $(this).parent().parent().children().find(".theTag1");
        // 替换悬浮窗外的小标签
        labelName.html(newLabel);
        $(this).parent().parent().children().find(".labelId").val(newLabelId);
        // 替换掉大列表里的标签
        $(".item").find(".tag").html(newLabel);
        // 隐藏悬浮窗
        $(this).parent().fadeOut();
        // 颜色替换
        $(this).addClass("labelChoose");
        $(this).siblings().removeClass("labelChoose");
        var clickDiv = $(this).parent().parent();
        updateTask("no", clickDiv);
        e.stopPropagation();
        $(this).closest(".task").addClass("choose");
        $(this).closest(".task").siblings().removeClass("choose");
    })

    // TaskDiv的删除事件
    $("body").on("click", ".del", function (e) {
        var clickDiv = $(this).parent();
        updateTask("yes", clickDiv);
        e.stopPropagation();
        $(this).closest(".task").addClass("choose");
        $(this).closest(".task").siblings().removeClass("choose");
    })
    // 添加新任务
    $('body').on('click', '#add', function () {
        addTask();
    })

    // 新增task的ajax
    function addTask() {
        var userId = $("#userId").val();
        $.ajax({
            url: "../task/insertTask.action",    //请求的url地址
            dataType: "json",   //返回格式为json
            async: false,//请求是否异步，默认为异步，这也是ajax重要特性
            data: {
                "userId": userId
            },    //参数值
            type: "POST",   //请求方式
            success: function (data) {
                if (data.status) {
                    addElementDiv('list-box');
                    var task = data.data;
                    var taskDiv = $("#list-box").find("div:first");
                    taskDiv.find(".taskId").attr("value", task.taskId);
                    taskDiv.find(".title span").html(task.taskName);
                    taskDiv.find(".day span").html(task.beginDate.split(" ")[0]);
                } else {
                    alert("保存失败");
                }
            },
            error: function () {
                //请求出错处理
                // alert("服务器错误");
                // return;
            }
        });
    }

    // 页面新增taskDiv的方法
    function addElementDiv(obj) {
        var parent = document.getElementById(obj);
        //添加 div
        var div = document.createElement("div");
        //设置 div 属性，如 id
        div.setAttribute("class", "task newDiv");
        // div.innerHTML = "<input type=\"hidden\" id=\"\" class=\"taskId\"><div class=\"stateBar\"><div class=\"grade grade1\"></div><div class=\"grade grade2\" ></div><div class=\"grade grade3\" ></div><span class=\"tag theTag1\">家</span></div><div class=\"allTag\"><span class=\"tag NoChoose\">1</span><span class=\"tag NoChoose\">2</span><span class=\"tag NoChoose\">3</span></div><div class=\"title\"><input type=\"text\" class=\"listInput\" placeholder=\"标题\"><span class=\"listSpan\">标题</span></div><div class=\"day\"><input type=\"date\" class=\"listInput\"><span class=\"listSpan\">2017</span></div><div class=\"rate\"><div class=\"ratio\"></div></div><span class=\"rateVal\">0/0</span><img src=\"../icon/del.png\" alt=\"\" class=\"del\">";
        div.innerHTML = "  <input type=\"hidden\" id=\"\" class=\"taskId\" value=\"\"> <div class=\"stateBar\"> <div class=\"grade \" hidden=\"hidden\"> <input type=\"hidden\" value=\"\"> </div> <div class=\"gradeBox\" > <div class=\"grade grade1\"> <input type=\"hidden\" name=\"grade1\" value=\"1\"> </div> <div class=\"grade grade2\"> <input type=\"hidden\" name=\"grade2\" value=\"2\"> </div> <div class=\"grade grade3\"> <input type=\"hidden\" name=\"grade3\" value=\"3\"> </div> </div> <span class=\"tag theTag1 labelChoose\"></span> </div> <div class=\"allTag\"> <span class=\"tag \"></span> </div> <div class=\"title\"> <input type=\"text\" class=\"listInput\" placeholder=\"标题\"> <span class=\"listSpan\"></span> </div> <div class=\"day\"> <input type=\"date\" class=\"listInput\"> <span class=\"listSpan\"></span> </div> <div class=\"rate\"> <div class=\"ratio\"> </div> </div> <span class=\"rateVal\">0/0</span> <img src=\"../icon/del.png\" alt=\"\" class=\"del\"> "
        //在之前加
        parent.prepend(div);
        $(".newDiv").slideDown();
    }

    /*-----------------------------------------------TaskDiv操作结束-------------------------------------------*/

    /*=================================================DetailDiv操作开始========================================*/

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
        if (len > 0) {
            ratio.animate({left: leftNum + "px"});
        }
        // 获取进度条下的分数
        var rateVal = $(".choose").find(".rateVal");
        // 进度条下分数效果
        rateVal.html(checkLen + "/" + len);
    }

    ratioAnimation();

    // 添加新项目
    $('body').on('click', '#newItem', function () {
        // $("#newItem").click(function () {
        addItemDiv('toDoList');
        // ratioAnimation();
        // 显示输入框
        $(".newDiv:last").find(".items").slideUp();
        $(".newDiv:last").find(".itemInput").slideDown();
        $(".changeDel").hide();
    })

    //新增新项目Div的方法
    function addItemDiv(obj) {
        var parent = document.getElementById(obj);
        //添加 div
        var div = document.createElement("div");
        //设置 div 属性，如 id
        div.setAttribute("class", "newDiv");
        div.innerHTML = "<input type=\"hidden\" id=\"\" class=\"detailId\"><div class=\"items\"><input type=\"checkbox\"/><div class=\"checkBox\"></div><span></span></div><div class=\"itemInput\"><div class=\"checkBox\"></div><input class=\"changeInput\" type=\"text\" ><img class=\"changeDel\" src=\"../icon/del.png\" alt=\"\"></div>";
        // 在之后加
        parent.append(div);
        $(".newDiv").slideDown();

    }

    // 添加新的小项目Ajax
    function insert(inputData) {
        var taskId = $("#taskId").val();
        var userId = $("#userId").val();
        $.ajax({
            url: "../taskDetail/insertTaskDetail.action",    //请求的url地址
            dataType: "json",   //返回格式为json
            async: false,//请求是否异步，默认为异步，这也是ajax重要特性
            data: {
                "taskDetailName": inputData,
                "taskId": taskId,
                "userId": userId
            },    //参数值
            type: "POST",   //请求方式
            success: function (data) {
                if (data.status) {
                    ratioAnimation();
                    // alert("保存成功");
                    // window.location.reload();
                    $(".detailId").attr("value", data.data);
                } else {
                    alert("保存失败");
                    //保存失败的话就删除最后添加的
                    var temp = $(".changeInput").is(":visible");
                    if (temp) {
                        // $(".changeInput:last").parent().remove();
                        $(".newDiv:last").remove();
                    }
                    return false;
                }
            },
            error: function () {
                //请求出错处理
                alert("服务器错误");
                //保存失败的话就删除最后添加的
                var temp = $(".changeInput").is(":visible");
                if (temp) {
                    // $(".changeInput:last").parent().remove();
                    $(".newDiv:last").remove();
                }
                return false;
                // return;
            }
        });
    }


    /*detail修改, 输入框鼠标离开时将数据赋给原来的span
        并进行新增或更新操作*/
    $("body").on("blur", ".changeInput", function () {
        // 他自己的值
        var changeInput = $(this).val();
        // 如果是编辑状态
        if ($("#changeOk").is(":visible")) {
            $(this).parent().prev().find("span").html(changeInput);
            // 往后台传id和内容
            // 他的hidden的id
            var inputId = $(this).parent().prev().prev().val();
            var check = $(this).parent().prev().find("input").is(":checked");
            update(changeInput, inputId, "update", check, null, null);
        } else {
            // 新增item
            $(".itemInput").slideUp();
            $(".items").slideDown();
            $(this).parent().prev().find("span").html(changeInput);
            if (changeInput == "") {
                // $(this).parent().prev().prev().remove();
                // $(this).parent().prev().remove();
                $(this).parent().parent().remove();
                return;
            }
            insert(changeInput);
        }
    })

    // 划掉和选中项目的打钩动画效果
    $('body').on('click', '.items', function () {
        // 获取隐藏的CheckBox
        var items = $(this).find("input[type=checkbox]");
        if (items.is(":checked")) {
            items.attr("checked", false);
            $(this).find("span").removeClass("spanChecked");
            $(this).find(".checkBox").removeClass("c");
            // 给隐藏的input去掉对勾
            $(this).next().find(".checkBox").removeClass("c");
        } else {
            items.attr("checked", true);
            $(this).find("span").addClass("spanChecked");
            $(this).find(".checkBox").addClass("c");
            // 给隐藏的input加上对勾
            $(this).next().find(".checkBox").addClass("c");
        }
        // 进度条效果
        ratioAnimation();
        // 获取小项目的个数
        var totalNo = document.getElementsByClassName("items").length;
        // 获取小项目被选中的个数
        var checkedNo = $("#toDoList").find("input[type='checkbox']:checked").length;
        // 返回数据
        var name = $(this).find("span").text();
        var detailId = $(this).prev().val();
        var check = $(this).find("input[type='checkbox']").is(":checked");
        update(name, detailId, 'update', check, checkedNo, totalNo);
    })

    // detail编辑按钮效果
    $('body').on('click', '.change', function () {
        // 原span隐藏。输入框出现
        $(".items").slideUp();
        $(".itemInput").slideDown();
        // 加号隐藏。对勾出现
        $(".add").slideUp();
        $(".changeOk").slideDown();
        $(".changeDel").show();
    })

    // 点对勾恢复原样
    $("body").on("click", ".changeOk", function () {
        $(".itemInput").slideUp();
        $(".items").slideDown();
        $(".changeOk").slideUp();
        $(".add").slideDown();
    })

    // 修改状态下的详细列表的Ajax
    function update(name, detailId, actionType, check, checkedNo, totalNo, clickItem) {
        var taskId = $("#taskId").val();
        var userId = $("#userId").val();
        $.ajax({
            url: "../taskDetail/updateTaskDetail.action",    //请求的url地址
            dataType: "json",   //返回格式为json
            async: false,//请求是否异步，默认为异步，这也是ajax重要特性
            data: {
                "taskDetailName": name,
                "taskDetailId": detailId,
                "actionType": actionType,
                "isChecked": check,
                "taskId": taskId,
                "userId": userId,
                "checkedNo": checkedNo,
                "totalNo": totalNo
            },    //参数值
            type: "POST",   //请求方式
            success: function (data) {
                if (data.status) {
                    if (actionType === "del") {
                        clickItem.parent().prev().remove();
                        clickItem.parent().remove();
                        ratioAnimation();
                    }
                } else {
                    alert("保存失败");
                    // $("#item-box").location="../taskDetail/list.action";
                }
            },
            error: function () {
                //请求出错处理
                // alert("服务器错误");
                // return;
            }
        });
    }

    // 点垃圾桶删除这个小项目
    $("body").on("click", ".changeDel", function () {
        // 获取他的值
        var changeInput = $(this).parent().find(".changeInput").val();
        // 获取他的id
        var inputId = $(this).parent().prev().prev().val();
        var check = $(this).parent().prev().find("input").is(":checked");
        // $(this).parent().prev().remove();
        // $(this).parent().remove();
        // // 进度条效果
        // ratioAnimation();
        // 获取小项目的个数
        var totalNo = document.getElementsByClassName("items").length;
        // 获取小项目被选中的个数
        var checkedNo = $("#toDoList").find("input[type='checkbox']:checked").length;
        var clickItem = $(this);
        update(changeInput, inputId, "del", check, checkedNo, totalNo, clickItem);
    })
    // // 编辑状态下的添加小项目
    // $("body").on("click",".changeAdd",function () {
    //     $(this).parent().after("<div class=\"items\"><input type=\"checkbox\"/><div class=\"checkBox\"></div><span></span></div><div class=\"itemInput\"><input type=\"hidden\" id=\"\" class=\"detailId\"><div class=\"checkBox\"></div><input class=\"changeInput\" type=\"text\" ><img class=\"changeDel\" src=\"icon/del.png\" alt=\"\"></div>");
    //     $(this).parent().next().slideUp();
    //     $(this).parent().next().next().slideDown();
    // })


    /*-----------------------------------------------DetailDiv操作结束-------------------------------------------*/

})
