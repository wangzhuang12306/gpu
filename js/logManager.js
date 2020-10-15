
/**
 * 
 */$(document).ready(function() {
	initialization();
	
});

function initialization() {
	/*var user = $("#username").text();
	var logurl="http://219.245.186.41:8080/api/v1/proxy/namespaces/kube-system/services/kibana-logging";
	$('iframe').attr('src',logurl);*/
	$(".ex_prop_line").hide();
	showPods();
}
function showPods() {
	var block = $(".coupon_props").parents('[class^=block]');
	add_loader(block);
	var user = $("#username").text();
	$.ajax({
		type : "post",
		dataType : "json",
		url : "/CMRI/pods/show",// 显示任务
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

				row.find(".podname").text(item);
				//alert(item.iD);
				
				//alert(item.name);
				tableButtonInit(row);
				row.appendTo(".coupon_props tbody");
				$(row).show();
			});
		}
	});
	function tableElementsInit() {
	
	}
	function tableButtonInit(row){
		row.find("#podlog").click(function() {
			var podname = $(this).parents("tr").find(".podname").text();
			$.ajax({
				type : "post",
				dataType : "text",
				url : "/CMRI/pods/get",
				data : {
					user : user,
					podname : podname
					
				},
				success : function(data) {
//					 alert("添加成功");
//					 alert("flag: "+data);
					 $("#logtext").empty();
					 $("#logtext").html(data);
//					self.location.reload();
				},
				complete : function(data) {
//					alert("data: "+data);
				}
			});
		});
		
		row.find("#podres").click(function() {
			var podname = $(this).parents("tr").find(".podname").text();
			$.ajax({
				type : "post",
				dataType : "text",
				url : "/CMRI/pods/res",
				data : {
					user : user,
					podname : podname
					
				},
				success : function(data) {
//					 alert("添加成功");
//					 alert("flag: "+data);
					 $("#restext").empty();
					 $("#restext").html(data);
//					self.location.reload();
				},
				complete : function(data) {
//					alert("data: "+data);
				}
			});
		});
		row.find("#test").click(function() {
			var podname = $(this).parents("tr").find(".podname").text();
			$.ajax({
				type : "post",
				dataType : "text",
				url : "/CMRI/pods/test",
				data : {
					user : user,
					podname : podname
					
				},
				success : function(data) {
//					 alert("添加成功");
					 alert("flag: "+data);
				},
				complete : function(data) {
//					alert("data: "+data);
				}
			});
		});
	}
}

