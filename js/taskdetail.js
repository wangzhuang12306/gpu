$(document).ready(function() {
	initialization();
});

function format() {
	// `d` is the original data object for the row
	return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'
			+ '<tr>'
			+ '<td>Full name:</td>'
			+ '<td></td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td>Extension number:</td>'
			+ '<td></td>'
			+ '</tr>'
			+ '<tr>'
			+ '<td>Extra info:</td>'
			+ '<td>And any further details here (images etc)...</td>'
			+ '</tr>'
			+ '</table>';
}

function initialization() {
	// hide template table and line
	$(".ex_prop_line").hide();
	$(".ex_process_prop_line").hide();
	// refresh table
	$("#task_refresh").click(function() {
		showTaskProp();
	});

	showTaskProp();
}

// 显示优惠券品种信息

function showTaskProp() {
	var block = $(".task_props").parents('[class^=block]');

	add_loader(block);

	$.ajax({
		type : "post",
		dataType : "json",
		url : "/NeoMalbox/task/show",

		// 要访问的后台地址,
		complete : function() {

			if ($(".fpTable").length > 0) {
				var table = $(".fpTable").dataTable({
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
					// 重建表格，配合刷新使用
					"bDestroy" : true,
					"iDisplayLength" : 5,
					// 从第几行开始显示，设置模板行不显示，从第二行开始显示
					// 显示行与模板行不在统一表格时可设置为0
					"iDisplayStart" : 0,
					"aLengthMenu" : [ 5, 10, 25, 50, 100 ],
					// can be removed
					// for basic
					// 10 items per page
					"sPaginationType" : "full_numbers",
					"aoColumnDefs" : [ {
						"bSortable" : false,
						"aTargets" : [ -1, 0 ]
					} ]
				});
				$('.fpTable tbody').on(
						'click',
						'td.details-control',
						function() {
							var nTr = $(this).parents('tr')[0];
							if (table.fnIsOpen(nTr)) {
								$(this).removeClass("shown");
								table.fnClose(nTr);
							} else {
								/* Open this row */
								$(this).addClass("shown");
								var taskID=$(nTr).find(".id").text();
								var sOut = getDetail(nTr,taskID);
								table.fnOpen(nTr, sOut, 'details');
								showProcessProp(taskID);								
							}
						});
				tableElementsInit(table);
			}
			remove_loader(block);
		},

		success : function(msg) {
			$(".task_props tbody").empty();
			$(".fpTable").dataTable().fnClearTable();
			$.each(msg, function(idx, item) {
				var row = $(".ex_prop_line").clone();
				$(row).removeClass("ex_prop_line");
				row.find(".details-control").text('');
				row.find(".id").text(item.iD);
				row.find(".name").text(item.taskName);
				row.find(".user").text(item.createUser);
				row.find(".time").text(item.createTime);
				//row.find(".status").addClass("label_important").addClass("label").text("等待执行");
				showStatus(row,item.status);
				row.appendTo(".task_props tbody");
				$(row).show();
			});
		}
	});
}

// table elements initialization
// 修改和删除方法
function getDetail(nTr,taskID){
	var result = $(".nestedTable").clone();
	//var taskID =$(nTr).find(".id").text();
	$(result).removeClass("nestedTable");
	$(result).attr("id","table"+taskID);
	$(result).addClass("processTable");
	//showProcessProp(taskID);
	return result;
}

function tableElementsInit(table) {

}

function showProcessProp(taskID){
	var block = $("#table"+taskID+" .process_props").parents('[class^=block]:first'); 
	add_loader(block);

	$.ajax({
		type : "post",
		dataType : "json",
		url : "/NeoMalbox/process/show",
		// 要访问的后台地址,
		data:{
			taskID: taskID
		},
		
		complete : function() {

			if ($("#table"+taskID+" .proTable").length > 0) {
				var table = $("#table"+taskID+" .proTable").dataTable({
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
					// 重建表格，配合刷新使用
					"bDestroy" : true,
					"iDisplayLength" : 5,
					// 从第几行开始显示，设置模板行不显示，从第二行开始显示
					// 显示行与模板行不在统一表格时可设置为0
					"iDisplayStart" : 0,
					"aLengthMenu" : [ 5, 10, 25, 50, 100 ],
					// can be removed
					// for basic
					// 10 items per page
					"sPaginationType" : "full_numbers",
					"aoColumnDefs" : [ {
						"bSortable" : true,
						"aTargets" : [ -1, 0 ]
					} ],
					"aoColumns":[
					      {"sWidth":"5%"},
					      {"sWidth":"20%"},
					      {"sWidth":"10%"},
					      {"sWidth":"20%"},
					      {"sWidth":"45%"}
					 ]
				});
			}
			remove_loader(block);
		},
		success : function(msg) {
			$("#table"+taskID+" .process_props tbody").empty();
			$("#table"+taskID+" .proTable").dataTable().fnClearTable();
			$.each(msg, function(idx, item) {
				var row = $("#table"+taskID+" .ex_process_prop_line").clone();
				$(row).removeClass("ex_process_prop_line");
				row.find(".id").text(item.iD);
				row.find(".samplename").text(item.sampleName);
				row.find(".scenenumber").text(item.scene.name);
				//row.find(".status").text(item.status);
				showStatus(row,item.status);
				row.appendTo("#table"+taskID+" .process_props tbody");
				$(row).show();
			});
			viewButtonInit();
		},
		
		error: function(msg){
			alert("error");
		}
	});
}

function viewButtonInit(){
	 $(".viewButton").click(function() {
		 
	/*	 var reportFile = 'reports/result.html';
	        $.layer({
	            type : 2,
	            title: '分析结果',
	            shadeClose: true,
	            maxmin: true,
	            fix : true,  
	            area: ['1024px', 500],                     
	            iframe: {
	                src : reportFile
	            } 
	        });*/
		 
		 	var val="";
			var nTr = $(this).parents('tr')[0];
			var inputArray = $(nTr).find("input[type='checkbox']");
			$(inputArray).each(function(){
				//alert($(this).val());
				if($(this).prop("checked") ==true){
					//alert($(this).val());
					 val += $(this).val()+",";
				}
			});
			var processID = $(nTr).find(".id").text();
			$.ajax({
				url:"/NeoMalbox/process/viewreport",
				method:"post",
				data:{
					processID: processID,
					regulation: val
				},
				dataType:"json",
				complete:function(){
					var reportFile = 'reports/tmp.html';
			        $.layer({
			            type : 2,
			            title: '分析结果',
			            shadeClose: true,
			            maxmin: true,
			            fix : true,  
			            area: ['1024px', 500],                     
			            iframe: {
			                src : reportFile
			            } 
			        });
				},
				/*error:function(){
					alert("error");
				}*/
			});
			
	    });
}

function showStatus(row,statusID){
	if(statusID==0){
		$(row).find(".status").addClass("label").addClass("label_important").text("等待执行");
	}else if(statusID==1){
		$(row).find(".status").addClass("label").addClass("label-warning").text("正在执行");
	}else if(statusID==2){
		$(row).find(".status").addClass("label").addClass("label-success").text("执行完毕");
	}
}


