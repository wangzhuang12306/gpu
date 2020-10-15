$(document).ready(function() {
    initialization();
});

function initialization() {
    // hide template table and line
    $(".ex_prop_line").hide();
    $(".ex_user_line").hide();

    // add new coupon property
    $("#ok_addScene").click(function() {
        addSceneProp();
        $("#fModal_addScene").find("input").val("");
    });

    // cancel add action
    $("#cancel_add").click(function() {
        $("#fModal_addScene").find("input").val("");
    });

    // modify a chosen coupon property
    $("#ok_modifyScene").click(function() {
        updateSceneProp();
        $("#fModal_modifyScene").find("input").val("");
    });

    // cancel modify action
    $("#cancel_modifyScene").click(function() {
        $("#fModal_modifyScene").find("input").val("");
    });

    // refresh table
    $("#prop_refresh").click(function() {
        showSceneProp();
    });

    showSceneProp();
}

function addSceneProp() {
    var name = $("#fModal_addScene").find("input[name='sceneName']").val();
    var description = $("#fModal_addScene").find("input[name='sceneDescription']").val();
    $.ajax({
        type: "post",
        dataType: "json",
        url: "/NeoMalbox/scene/add",
        data: {
            name: name,
            description: description
        },
        success: function(flag) {
            if (flag) {
                showMessage("添加成功！");
            } else {
                showMessage("添加失败！","请稍后重试~");
            }
        },
        complete: function() {
            showSceneProp();
        }
    });
}

// 显示优惠券品种信息

function showSceneProp() {
    var block = $(".coupon_props").parents('[class^=block]');
    
    add_loader(block);

    $.ajax({
        type: "post",
        dataType: "json",
        url: "/NeoMalbox/scene/show",
        // 要访问的后台地址,
        complete: function() {
            tableElementsInit();
            if ($(".fpTable").length > 0) {
                $(".fpTable").dataTable({
                	"oLanguage" : {
		                "sLengthMenu": "每页显示 _MENU_ 条记录",
		                "sZeroRecords": "抱歉， 没有找到",
		                "sInfo": "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
		                "sInfoEmpty": "没有数据",
		                "sInfoFiltered": "(从 _MAX_ 条数据中检索)",
		                "sZeroRecords": "没有检索到数据",
		                 "sSearch": "名称:",
		                "oPaginate": {
		                "sFirst": "首页",
		                "sPrevious": "前一页",
		                "sNext": "后一页",
		                "sLast": "尾页"
		                }
					},
                    bSort: false,
                    bAutoWidth: true,
                    "bPaginate": true,
                    "bStateSave": true,
                    // 重建表格，配合刷新使用
                    "bDestroy": true,
                    "iDisplayLength": 5,
                    // 从第几行开始显示，设置模板行不显示，从第二行开始显示
                    // 显示行与模板行不在统一表格时可设置为0
                    "iDisplayStart": 0,
                    "aLengthMenu": [5, 10, 25, 50, 100],
                    // can be removed
                    // for basic
                    // 10 items per page
                    "sPaginationType": "full_numbers",
                    "aoColumnDefs": [{
                        "bSortable": false,
                        "aTargets": [-1, 0]
                    }]
                });
            }
            remove_loader(block);
        },

        success: function(msg) {
            $(".coupon_props tbody").empty();
            $(".fpTable").dataTable().fnClearTable();
            $.each(msg, function(idx, item) {
                var row = $(".ex_prop_line").clone();
                $(row).removeClass("ex_prop_line");

                row.find(".prop_id").text(item.iD);
                row.find(".prop_name").text(item.name);
                row.find(".prop_description").text(item.description);

                row.appendTo(".coupon_props tbody");
                $(row).show();
            });
        }
    });
}

// table elements initialization
// 修改和删除方法

function tableElementsInit() {
    // modify scene property
    $(".modifyScene").click(function() {
        var chosen = $(this).parents("tr");
        var id = chosen.find(".prop_id").text();
        var name = chosen.find(".prop_name").text();
        var description = chosen.find(".prop_description").text();
        var dialog = $("#fModal_modifyScene");
        dialog.find("#modifyScene_id").text(id);
        dialog.find("input[name='name']").val(name);
        dialog.find("input[name='description']").val(description);
    });

    // delete scene property
    $(".deleteScene").click(function() {
        var isSure = confirm("是否确认删除？");
        if (isSure) {
            var id = $(this).parents("tr").find(".prop_id").text();
            $.ajax({
                type: "post",
                dataType: "json",
                url: "/NeoMalbox/scene/delete",
                data: {
                    id: id
                },
                success: function(flag) {
                    if (flag) {
                        showMessage("删除成功！");
                    } else {
                        showMessage("删除失败！","请检查该种优惠券是否被使用完~");
                    }
                },
                complete: function() {
                    showSceneProp();
                }
            });
        }
    });

}

// modify the chosen scene property
// 修改场景属性的实现

function updateSceneProp() {
    var id = $("#fModal_modifyScene").find("#modifyScene_id").text();
    var name = $("#fModal_modifyScene").find("input[name='name']").val();
    var description = $("#fModal_modifyScene").find("input[name='description']").val();

   /* if(isNaN(limits)||isNaN(discount)||isNaN(least)||isNaN(guarantee)){
    	showMessage("修改失败！","请检查输入！");
    	return;
    }*/
    $.ajax({
        type: "post",
        dataType: "json",
        url: "/NeoMalbox/scene/update",
        data: {
            id: id,
            name: name,
            description: description
        },
        success: function(flag) {
            if (flag) {
                showMessage("修改成功！");
            	alert("修改成功");
            } else {
                showMessage("修改失败！");
                alert("修改失败");
            }
        },
        complete: function() {
            showSceneProp();
        }
    });
}

function showMessage(title, message, seconds) {
    seconds = seconds || 2;
    $("#fModal_message .secRemain").text(seconds);
    $("#modal_message_title").text(title);
    $("#modal_message_body").text(message);
    $("#fModal_message").modal("show");
    var temple = function() {
            var sec = Number($("#fModal_message .secRemain").text());
            sec = sec - 1;
            if (sec <= 0) {
                $("#fModal_message").modal("hide");
            } else {
                $("#fModal_message .secRemain").text(sec);
                setTimeout(temple, 1000);
            }
        }
    setTimeout(temple, 1000);
}
