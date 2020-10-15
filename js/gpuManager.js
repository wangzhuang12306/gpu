
/**
 * 
 */$(document).ready(function() {
	initialization();
	
});

function initialization() {
	// hide template table and line
	$(".ex_prop_line").hide();


	// modify a chosen coupon property
/*	$("#ok_modifyUser").click(function() {
		updateUserProp();
		$("#fModal_modifyUser").find("select").val("");
	});

	// cancel modify action
	$("#cancel_modifyUser").click(function() {
		$("#fModal_modifyUser").find("select").val("");
		//alert("haha");
	});*/

	// refresh table
	$("#prop_refresh").click(function() {
		showTaskProp();
	});

	// show data
	showTaskProp();
	
}


function showTaskProp() {
	var block = $(".coupon_props").parents('[class^=block]');
	add_loader(block);
	var user = $("#username").text();
	$.ajax({
		type : "post",
		dataType : "json",
		url : "/CMRI/gpu/show",// 显示任务
		data : {
			user : user
		},
		
		complete : function() {
//			tableElementsInit();
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
					bSort : false,
					bAutoWidth : true,
					"bPaginate" : true,
					"bStateSave" : true,
					"bDestroy" : true,
					"iDisplayLength" : 5,
					"iDisplayStart" : 0,
					"aLengthMenu" : [ 5, 10, 25, 50, 100 ], // can be removed

					"sPaginationType" : "full_numbers",
					"aoColumnDefs" : [ {
						"bSortable" : false,
						"aTargets" : [ -1, 0 ]
					} ]
				});
			}
			remove_loader(block);
		},

		success : function(msg) {
			$(".coupon_props tbody").empty();
			$(".fpTable").dataTable().fnClearTable();
			$.each(msg, function(idx, item) {
				var row = $(".ex_prop_line").clone();
				$(row).removeClass("ex_prop_line");

			//	row.find(".prop_id").text(item.iD);
				//alert(item.iD);
				row.find(".node").text(item.node);
				row.find(".busid").text(item.busid);
				row.find(".taskno").text(item.taskno);
				row.find(".username").text(item.username);
				row.find(".process").text(item.process);
				row.find(".gpuusage").text(item.gpuuse);
				row.find(".starttime").text(item.runtime+"s");
				row.find(".endtime").text(item.endtime+"s");
		/*		if(item.state=="0"){
					row.find(".prop_state").text("未运行");
					row.find('#stopTask').attr("disabled", true);
					row.find('#taskResult').attr("disabled", true);
				}else if(item.state=="1"){
					row.find(".prop_state").text("正在运行");
					row.find('#startTask').attr("disabled", true);
					row.find('#taskResult').attr("disabled", true);
				}else if(item.state=="2"){
					row.find(".prop_state").text("运行完毕");
					row.find('#startTask').attr("disabled", true);
					row.find('#stopTask').attr("disabled", true);
				}else if(item.state=="3"){
					row.find(".prop_state").text("终止运行");
					row.find('#stopTask').attr("disabled", true);
//					row.find('#taskResult').attr("disabled", true);
				}else if(item.state=="4"){
					row.find(".prop_state").text("等待");
					row.find('#startTask').attr("disabled", true);
//					row.find('#stopTask').attr("disabled", true);
					row.find('#taskResult').attr("disabled", true);
				}*/
				//alert(item.name);
//				tableButtonInit(row);
				row.appendTo(".coupon_props tbody");
				$(row).show();
			});
		}
	});
}
$("#pluginurl").click(function(){
	alert("click");
});
// table elements initialization
// �޸ĺ�ɾ��


