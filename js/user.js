
/**
 * 
 */$(document).ready(function() {
	initialization();
});

function initialization() {
	// hide template table and line
	$(".ex_prop_line").hide();

	// add new coupon property
	$("#ok_addUser").click(function() {
		addUserProp();
		$("#fModal_addUser").find("input").val("");
	});

	// cancel add action
	$("#cancel_addUser").click(function() {
		$("#fModal_addUser").find("input").val("");
	});

	$("#ok_updateUser").click(function() {
		updateUserProp();
//		$("#fModal_addUser").find("input").val("");
	});
	$("#ok_resetUser").click(function() {
		resetUserProp();
	});
	/*$("#ok_updatePasswd").click(function() {
		updatePasswdProp();
//		$("#fModal_addUser").find("input").val("");
	});*/
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
		showUserProp();
	});

	// show data
	showUserProp();
}

function addUserProp() {
	var userpasswd = $("#fModal_addUser").find("input[name='userpasswd']").val();
	var username = $("#fModal_addUser").find("input[name='username']").val();
	var gpunumber = $("#fModal_addUser").find("input[name='gpunumber']").val();
	var usermail = $("#fModal_addUser").find("input[name='usermail']").val();
	var hard = $("#fModal_addUser").find("input[name='hard']").val();
	var memory = $("#fModal_addUser").find("input[name='memory']").val();
	if(!username || username=="请输入用户名"){
		alert("用户名不能为空");
	}else if(!gpunumber){
		alert("gpu数目不能为空");
	}else if(!userpasswd){
		alert("密码不能为空");
	}else if(isNaN(gpunumber)){
		alert("gpu数目输入错误");
	}else if(gpunumber<0){
		alert("gpu数目输入错误");
	}
	else{
	$.ajax({
		type : "post",
		dataType : "json",
		url : "/CMRI/user/add",
		data : {
			userpasswd : userpasswd,
			username : username,
			quota : gpunumber,
			usermail : usermail,
			hard : hard,
			memory : memory
		},
		success : function(flag) {
			if (flag) {
				alert("添加成功");
			} else {
				alert(flag+"添加失败，用户名已存在或请求的GPU数目不合适，用户密码必须包含数字、字母、特殊字符三种，长度至少10位，不能包含空格、制表符、换页符等空白字符");
			}
		},
		complete : function() {
			showUserProp();
		}
	});
	}
}

function showUserProp() {
	var block = $(".coupon_props").parents('[class^=block]');
	add_loader(block);

	$.ajax({
		type : "post",
		dataType : "json",
		url : "/CMRI/user/show",// 显示用户

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
				row.find(".prop_username").text(item.name);
				//alert(item.name);
				row.find(".prop_gpunumber").text(item.quota);
				row.find(".prop_usermail").text(item.mail);
				row.find(".prop_hard").text(item.hard);
				row.find(".prop_memory").text(item.memory);
				row.appendTo(".coupon_props tbody");
				$(row).show();
			});
		}
	});
}

// table elements initialization
// �޸ĺ�ɾ��
function tableElementsInit() {
	// delete user property
	$(".deleteUser").click(function() {
		var isSure = confirm("确认删除？");
		if (isSure) {
			var id = $(this).parents("tr").find(".prop_id").text();
			$.ajax({
				type : "post",
				dataType : "json",
				url : "/CMRI/user/delete",
				data : {
					id : id
				},
				success : function(flag) {
					if (flag) {
						alert("删除成功");
					} else {
						alert("删除失败");
					}
				},
				complete : function() {
					showUserProp();
				}
			});
		}
	});
	
	
	$(".updateUser").click(function() {
		var id = $(this).parents("tr").find(".prop_id").text();
		var username = $(this).parents("tr").find(".prop_username").text();
		var gpunumber = $(this).parents("tr").find(".prop_gpunumber").text();
		var usermail = $(this).parents("tr").find(".prop_usermail").text();
		var hard = $(this).parents("tr").find(".prop_hard").text();
		var memory = $(this).parents("tr").find(".prop_memory").text();
		$("#fModal_updateuser").find("input[name='username']").val(username);
		$("#fModal_updateuser").find("input[name='gpunumber']").val(gpunumber);
		$("#fModal_updateuser").find("input[name='userid']").val(id);
		$("#fModal_updateuser").find("input[name='usermail']").val(usermail);
		$("#fModal_updateuser").find("input[name='hard']").val(hard.substring(0,hard.length-2));
		$("#fModal_updateuser").find("input[name='memory']").val(memory.substring(0,memory.length-2));
		
		$("#fModal_updatepasswd").find("input[name='userid']").val(id);
		$("#fModal_updatepasswd").find("input[name='username']").val(username);
	});
	/*$("#fModal_updateuser").click(function() {
		var id = $(this).parents("tr").find(".prop_id").text();
		alert(id);
	});*/
	$(".resetUser").click(function() {
		var id = $(this).parents("tr").find(".prop_id").text();
		var username = $(this).parents("tr").find(".prop_username").text();
		var oldPasswd = $(this).parents("tr").find(".prop_oldPasswd").text();
		var usermail = $(this).parents("tr").find(".prop_usermail").text();
		var newPasswd = $(this).parents("tr").find(".prop_newPasswd").text();
		var confPasswd = $(this).parents("tr").find(".prop_confPasswd").text();
		var gpunumber = $(this).parents("tr").find(".prop_gpunumber").text();
		var hard = $(this).parents("tr").find(".prop_hard").text();
		var memory = $(this).parents("tr").find(".prop_memory").text();
		$("#fModal_resetuser").find("input[name='username']").val(username);
	//	$("#fModal_resetuser").find("input[name='oldPasswd']").val(oldPasswd);
		$("#fModal_resetuser").find("input[name='userid']").val(id);
		$("#fModal_resetuser").find("input[name='usermail']").val(usermail);
		$("#fModal_resetuser").find("input[name='newPasswd']").val(newPasswd);
		$("#fModal_resetuser").find("input[name='confPasswd']").val(confPasswd);
	});
}
/*function checkGPUNumber(obj){
	if(!obj.value){
		obj.value=obj.defaultValue;
		obj.style.color='#999';
			}
	if(isNaN(obj.value)){
//		$('#note2').text(obj.defaultValue);
		alert("请求的gpu数目错误");
	}else{
		var gpu = obj.value;
//		$('#note2').text("");
		if(gpu<0){
			$('#note2').text('请求的gpu数目错误');
			alert("请求的gpu数目错误");
		}
	}
}*/
function updatePasswdProp() {
	var userid = $("#fModal_updatepasswd").find("input[name='userid']").val();
	var username = $("#fModal_updatepasswd").find("input[name='username']").val();
	var newpasswd = $("#fModal_updatepasswd").find("input[name='userpasswd']").val();
	
	{//更新用户信息
	$.ajax({
		type : "post",
		dataType : "json",
		url : "/CMRI/user/updatepasswd",
		data : {
			userid : userid,
			username : username,
			newpasswd : newpasswd
		},
		success : function(flag) {
			if (flag) {
				alert("密码成功重置");
			} else {
				alert(flag+"修改失败，用户密码必须包含数字、字母、特殊字符三种，长度至少10位，不能包含空格、制表符、换页符等空白字符");
			}
		},
		complete : function() {
			showUserProp();
		}
	});
  }
}


function updateUserProp() {
	var userid = $("#fModal_updateuser").find("input[name='userid']").val();
	var username = $("#fModal_updateuser").find("input[name='username']").val();
	var gpunumber = $("#fModal_updateuser").find("input[name='gpunumber']").val();
	var usermail = $("#fModal_updateuser").find("input[name='usermail']").val();
	var hard = $("#fModal_updateuser").find("input[name='hard']").val();
	var memory = $("#fModal_updateuser").find("input[name='memory']").val();
	if(!username){
		alert("用户名不能为空");
	}else if(!gpunumber){
		alert("gpu数目不能为空");
	}else if(isNaN(gpunumber)){
		alert("gpu数目输入错误");
	}else if(gpunumber<0){
		alert("gpu数目输入错误");
	}
	else{//更新用户信息
	$.ajax({
		type : "post",
		dataType : "json",
		url : "/CMRI/user/update",
		data : {
			userid : userid,
			username : username,
			quota : gpunumber,
			usermail : usermail,
			hard : hard,
			memory : memory
		},
		success : function(flag) {
			if (flag) {
				alert("修改成功");
			} else {
				alert("修改失败，GPU数目不合适");
			}
		},
		complete : function() {
			showUserProp();
		}
	});
  }
}

function resetUserProp() {
	var userid = $("#fModal_resetuser").find("input[name='userid']").val();
	var username = $("#fModal_resetuser").find("input[name='username']").val();
//	var oldPasswd = $("#fModal_resetuser").find("input[name='oldPasswd']").val();
	var usermail = $("#fModal_resetuser").find("input[name='usermail']").val();
	var newPasswd = $("#fModal_resetuser").find("input[name='newPasswd']").val();
	var confPasswd = $("#fModal_resetuser").find("input[name='confPasswd']").val();
	if(!username){
		alert("用户名不能为空");
	}else if(!newPasswd){
		alert("新密码不能为空");
//	}else if(isNaN(gpunumber)){
//		alert("gpu数目输入错误");
//	}else if(gpunumber<0){
//		alert("gpu数目输入错误");
	}
	else{//重置密码
	$.ajax({
		type : "post",
		dataType : "json",
		url : "/CMRI/user/reset",
		data : {
			userid : userid,
			username : username,
//			oldPasswd : oldPasswd,
			usermail : usermail,
			newPasswd : newPasswd,
			confPasswd : confPasswd
		},
		success : function(flag) {
			if (flag) {
				alert("修改密码成功");
			} else {
				alert("修改密码失败");
			}
		},
		complete : function() {
			showUserProp();/////////
		}
	});
  }
}

function checkGPUNumber(obj){
//	var maxgpu=$("#hiddengpu").val();
	
	if(!obj.value){
		obj.value=obj.defaultValue;
		$('#note2').text("请输入GPU配额");
	//	obj.style.color='#999';
			}
	if(isNaN(obj.value)){
		$('#note2').text("请输入数字");
//		alert(obj.value);
	}else{
		var gpu = obj.value;
		$('#note2').text("");
		if(gpu<0 ){
			$('#note2').text('请求的gpu数目错误');
//			alert("请求的gpu数目错误");
		}
	}
}
function checkGPUNumber2(obj){
//	var maxgpu=$("#hiddengpu").val();
	
	if(!obj.value){
		obj.value=obj.defaultValue;
		$('#note22').text("请输入GPU配额");
	//	obj.style.color='#999';
			}
	if(isNaN(obj.value)){
		$('#note22').text("请输入数字");
//		alert(obj.value);
	}else{
		var gpu = obj.value;
		$('#note22').text("");
		if(gpu<0 ){
			$('#note22').text('请求的gpu数目错误');
//			alert("请求的gpu数目错误");
		}
	}
}
function checkUsername(obj){
//	var maxgpu=$("#hiddengpu").val();
	
	if(!obj.value){
		obj.value=obj.defaultValue;
		$('#note').text("请输入用户名");
	//	obj.style.color='#999';
			}
}
function checkPasswd(obj){
//	var maxgpu=$("#hiddengpu").val();
	
	if(!obj.value){
		obj.value=obj.defaultValue;
		$('#note1').text("请输入密码");
	//	obj.style.color='#999';
			}
	else
		$('#note1').text("");
}

function checkNewPasswd(obj){
//	var maxgpu=$("#hiddengpu").val();
	
	if(!obj.value){
		obj.value=obj.defaultValue;
		$('#note20').text("请输入新密码");
	//	obj.style.color='#999';
			}
	else
		$('#note20').text("");
}
function checkOldPasswd(obj){
//	var maxgpu=$("#hiddengpu").val();
	
	if(!obj.value){
		obj.value=obj.defaultValue;
		$('#note202').text("请输入旧密码");
	//	obj.style.color='#999';
			}
	else
		$('#note202').text("");
}
function confNewPasswd(obj){////////////////////////////////////////////////////
	//重新输入一次新密码
//	var maxgpu=$("#hiddengpu").val();
  
	if(!obj.value){
		obj.value=obj.defaultValue;
		$('#note201').text("请再次输入新密码");
	//	obj.style.color='#999';
			}
//	else if(obj.value != document.getElementById("note20").value()){
//		alert("前后两次密码输入不同")
//	}
	else
		$('#note201').text("");
}
