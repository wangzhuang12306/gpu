
/**
 * 
 */
$(document).ready(function() {
	initialization();
});

function initialization() {
	// show data
	showUserProp();

$(".updateUser").click(function() {
		getuinfo();
	});
$("#ok_updateUser").click(function() {
	changepasswd();
});
}


function showUserProp() {
	var block = $(".coupon_props").parents('[class^=block]');
	add_loader(block);
	var user = $("#username").text();
	
	$.ajax({
		type : "post",
		dataType : "json",
		url : "/CMRI/user/myaccount",// 显示账户信息
		data : {
			user : user
		},

		complete : function() {
		},

		success : function(u) {
			$("#ugpu").text(u.quota+"个");
			$("#uhard").text(u.hard);
			$("#umem").text(u.memory);
			$("#uname").text(u.name);
			$("#umail").text(u.mail);
			$("#upasswd").text("******");
			
		}
	});
}

function getuinfo(){
	var username = $("#uname").val();
	$("#fModal_updateuser").find("input[name='username']").val(username);
}

function changepasswd() {
	var username = $("#fModal_updateuser").find("input[name='username']").val();
	var oldpasswd = $("#fModal_updateuser").find("input[name='oldpasswd']").val();
	var newpasswd = $("#fModal_updateuser").find("input[name='newpasswd']").val();
	
	//更新用户信息
	$.ajax({
		type : "post",
		dataType : "json",
		url : "/CMRI/user/changepasswd",
		data : {
			username : username,
			oldpasswd : oldpasswd,
			newpasswd : newpasswd
		},
		success : function(flag) {
			if (flag) {
				alert("修改成功");
			} else {
				alert("修改失败");
			}
		},
		complete : function() {
			showUserProp();
		}
	});
}


