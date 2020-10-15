
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
		url : "/CMRI/task/show",// 显示任务
		data : {
			user : user
		},
		
		complete : function() {
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

				row.find(".prop_id").text(item.iD);
				//alert(item.iD);
				row.find(".prop_taskname").text(item.taskName);
				row.find(".prop_gpunumber").text(item.gpuNumber);
				row.find(".prop_username").text(item.user);
				row.find(".trainfiles").text(item.trainfiles);
				row.find(".entrypoint").text(item.entrypoint);
				row.find(".datadir").text(item.datadir);
				if(item.state=="0"){
					row.find(".prop_state").text("未运行");
					row.find('#stopTask').attr("disabled", true);
					row.find('#taskResult').attr("disabled", true);
				}else if(item.state=="1"){
					row.find(".prop_state").text("正在运行");
					row.find('#startTask').attr("disabled", true);
					row.find('#taskResult').attr("disabled", true);
					row.find('#deleteTask').attr("disabled", true);
				}else if(item.state=="2"){
					row.find(".prop_state").text("运行完毕");
					row.find('#startTask').attr("disabled", true);
					row.find('#stopTask').attr("disabled", true);
				}else if(item.state=="3"){
					row.find(".prop_state").text("终止运行");
					row.find('#stopTask').attr("disabled", true);
//					row.find('#taskResult').attr("disabled", true);
				}else if(item.state=="4"){
					row.find(".prop_state").text("正在构造容器");
					row.find('#startTask').attr("disabled", true);
//					row.find('#stopTask').attr("disabled", true);
					row.find('#taskResult').attr("disabled", true);
					row.find('#deleteTask').attr("disabled", true);
				}else if(item.state=="5"){
					row.find(".prop_state").text("等待");
					row.find('#startTask').attr("disabled", true);
//					row.find('#stopTask').attr("disabled", true);
					row.find('#taskResult').attr("disabled", true);
//					row.find('#deleteTask').attr("disabled", true);
				}
				//alert(item.name);
				tableButtonInit(row);
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
function tableButtonInit(row){
	row.find("#startTask").click(function() {
		var isSure = confirm("确认提交任务？");
		if (isSure) {
				var id = $(this).parents("tr").find(".prop_id").text();
					var id = $(this).parents("tr").find(".prop_id").text();
					//row.find(".prop_id").text(item.iD);
					var taskName = $(this).parents("tr").find(".prop_taskname").text();
					var gpuNumber = $(this).parents("tr").find(".prop_gpunumber").text();
					var user = $(this).parents("tr").find(".prop_username").text();
					var trainfiles = $(this).parents("tr").find(".trainfiles").text();
					var entrypoint = $(this).parents("tr").find(".entrypoint").text();
					var datadir = $(this).parents("tr").find(".datadir").text();
					$.ajax({
						type : "post",
						dataType : "text",
						url : "/CMRI/task/start",
						data : {
							id : id,
							taskName : taskName,
							gpuNumber : gpuNumber,
							user : user,
							trainfiles : trainfiles,
							entrypoint : entrypoint,
							datadir : datadir
						},
						success : function(flag) {
//							 alert("添加成功");
							if("gpu lack".indexOf(flag)+1>0){
								alert("当前系统中可用的GPU数目不够");
							}else{
							 alert("flag: "+flag);}
							self.location.reload();
						},
						complete : function(data) {
//							alert("data: "+data);
						}
					});

		}
	});
	row.find("#stopTask").click(function() {
		var isSure = confirm("确认终止任务？");
		if (isSure) {
					var id = $(this).parents("tr").find(".prop_id").text();
					//row.find(".prop_id").text(item.iD);
//					alert(id);
					var taskName = $(this).parents("tr").find(".prop_taskname").text();
					var gpuNumber = $(this).parents("tr").find(".prop_gpunumber").text();
					var user = $(this).parents("tr").find(".prop_username").text();
					var trainfiles = $(this).parents("tr").find(".trainfiles").text();
					var entrypoint = $(this).parents("tr").find(".entrypoint").text();
					var datadir = $(this).parents("tr").find(".datadir").text();
//					alert(user);
					$.ajax({
						type : "post",
						dataType : "text",
						url : "/CMRI/task/stop",
						data : {
							id : id,
							taskName : taskName,
							gpuNumber : gpuNumber,
							user : user,
							trainfiles : trainfiles,
							entrypoint : entrypoint,
							datadir : datadir
						},
						success : function(flag) {
//							 alert("添加成功");
							 alert("flag: "+flag);
							self.location.reload();
						},
						complete : function(data) {
//							alert("data: "+data);
						}
					});
				
				
		}
	});
	row.find("#taskResult").click(function() {
		var isSure = confirm("确认查看结果？");
		if (isSure) {
//			window.open("http://www.baidu.com");
				var id = $(this).parents("tr").find(".prop_id").text();
					var id = $(this).parents("tr").find(".prop_id").text();
					//row.find(".prop_id").text(item.iD);
					
					var taskName = $(this).parents("tr").find(".prop_taskname").text();
					var gpuNumber = $(this).parents("tr").find(".prop_gpunumber").text();
					var user = $(this).parents("tr").find(".prop_username").text();
					
//					var h = $(this).parents("a").find("#pluginurl").attr("href");
//					alert(h);
					var filename = "downtest";
					var newid = "pluginurl"+id;
//					alert($(this).parents("tr").find("#pluginurl").attr("href"));
//					$(this).parents("tr").find("#pluginurl").attr("id",newid);
//					console.log($(this).parents("tr").find("#pluginurl").attr("id"));
					var url2 = "/CMRI/download/res?username="+user+"&taskname="+taskName+"&kind=tensorflow";//////
					$(this).parents("tr").find("#pluginurl").attr("href",url2);//////
					/*$.ajax({
						type : "post",
						dataType : "text",
						url : "/CMRI/task/result",
						data : {
//							id : id,
							taskName : taskName,
//							gpuNumber : gpuNumber,
							user : user,
//							filename : filename
						},
						success : function(filepath) {
//							 alert("添加成功");
//							 alert("flag: "+flag);
//							self.location.reload();
							alert("download: "+filepath);
							var url2 = "/CMRI/download/test?filename="+filepath;//////
//							$(this).parents("tr").find("#pluginurl").attr("href",url2);//////
							alert($("tr").find("#pluginurl").attr("href"));
							$("tr").find("#pluginurl"+id).attr("href",url2);
							console.log($("tr").find("#pluginurl"+id).attr("href"));
							$("tr").find("#pluginurl"+id).click();
						},
						complete : function(data) {
						}
					});*/
					/*$.ajax({
						type : "post",
						dataType : "json",
						url : "/CMRI/task/result",
						data : {
							id : id,
							taskName : taskName,
							gpuNumber : gpuNumber,
							user : user
						},
						success : function(flag) {
//							 alert("添加成功");
//							 alert("flag: "+flag);
							self.location.reload();
						},
						complete : function(data) {
						}
					});*/
		}
	});
	row.find("#deleteTask").click(function() {
		var isSure = confirm("确认删除任务？");
		if (isSure) {
					var id = $(this).parents("tr").find(".prop_id").text();
					var taskName = $(this).parents("tr").find(".prop_taskname").text();
					var user = $(this).parents("tr").find(".prop_username").text();
					$.ajax({
						type : "post",
						dataType : "text",
						url : "/CMRI/task/delete",
						data : {
							id : id,
							taskName : taskName,
							user : user
						},
						success : function(flag) {
//							 alert("添加成功");
//							 alert("flag: "+flag);
							self.location.reload();
						},
						complete : function(data) {
						}
					});
				
				
		}
	});
}
function tableElementsInit() {
	// delete user property
	/*$("#startTask").click(function() {
		var isSure = confirm("确认提交任务？");
		if (isSure) {
			$('#startTask').click(function () {//点击提交任务按钮
				var id = $(this).parents("tr").find(".prop_id").text();
					var id = $(this).parents("tr").find(".prop_id").text();
					//row.find(".prop_id").text(item.iD);
					//alert(item.iD);
					var taskName = $(this).parents("tr").find(".prop_taskname").text();
					var gpuNumber = $(this).parents("tr").find(".prop_gpunumber").text();
					var user = $(this).parents("tr").find(".prop_username").text();
					$.ajax({
						type : "post",
						dataType : "json",
						url : "/CMRI/task/start",
						data : {
							id : id,
							taskName : taskName,
							gpuNumber : gpuNumber,
							user : user
						},
						success : function(flag) {
//							 alert("添加成功");
							 alert("flag: "+flag);
							self.location.reload();
						},
						complete : function(data) {
						}
					});
				
				
		    });
		}
	});*/
	/*$("#stopTask").click(function() {
		var isSure = confirm("确认终止任务？");
		if (isSure) {
			$('#stopTask').click(function () {//点击提交任务按钮
				var id = $(this).parents("tr").find(".prop_id").text();
					var id = $(this).parents("tr").find(".prop_id").text();
					//row.find(".prop_id").text(item.iD);
					//alert(item.iD);
					var taskName = $(this).parents("tr").find(".prop_taskname").text();
					var gpuNumber = $(this).parents("tr").find(".prop_gpunumber").text();
					var user = $(this).parents("tr").find(".prop_username").text();
					$.ajax({
						type : "post",
						dataType : "json",
						url : "/CMRI/task/stop",
						data : {
							id : id,
							taskName : taskName,
							gpuNumber : gpuNumber,
							user : user
						},
						success : function(flag) {
//							 alert("添加成功");
							 alert("flag: "+flag);
							self.location.reload();
						},
						complete : function(data) {
						}
					});
				
				
		    });
		}
	});
	$("#taskResult").click(function() {
		var isSure = confirm("确认查看结果？");
		if (isSure) {
			$('#taskResult').click(function () {//点击提交任务按钮
				var id = $(this).parents("tr").find(".prop_id").text();
					var id = $(this).parents("tr").find(".prop_id").text();
					//row.find(".prop_id").text(item.iD);
					//alert(item.iD);
					var taskName = $(this).parents("tr").find(".prop_taskname").text();
					var gpuNumber = $(this).parents("tr").find(".prop_gpunumber").text();
					var user = $(this).parents("tr").find(".prop_username").text();
					$.ajax({
						type : "post",
						dataType : "json",
						url : "/CMRI/task/result",
						data : {
							id : id,
							taskName : taskName,
							gpuNumber : gpuNumber,
							user : user
						},
						success : function(flag) {
//							 alert("添加成功");
							 alert("flag: "+flag);
							self.location.reload();
						},
						complete : function(data) {
						}
					});
		    });
		}
	});*/
}

