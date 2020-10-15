
/**
 * 
 */
$(document).ready(function() {
	initialization();
});

function initialization() {
	// show data
	showUserProp();
	showTasks();
	showRuntime();
	showAvgGpu();
	showHistoryGpu();

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
		url : "/CMRI/home/allinfo",// 显示账户信息
		data : {
			user : user
		},

		complete : function() {
		},

		success : function(u) {
			$("#alldatas").text(u.alldatas);
			$("#allcodes").text(u.allcodes);
			$("#allmodels").text(u.allmodels);
			$("#running").text(u.running);
			$("#waiting").text(u.waiting);
			$("#finish").text(u.finish);
			$("#gpunum").text(u.gpunum);
			$("#storage").text(u.storage);
			$("#usedpercent").text(u.usedpercent);
			$("#taskremain").text(u.taskremain);
			
		}
	});
}
function showTasks() {
	var block = $(".coupon_props").parents('[class^=block]');
	add_loader(block);
	var user = $("#username").text();
	
	$.ajax({
		type : "post",
		dataType : "json",
		url : "/CMRI/home/alltask",// 显示平台总体情况

		complete : function() {
		},

		success : function(u) {
			$("#allgpu").text(u.allgpu);
			$("#alltask").text(u.alltask);
			$("#todaytask").text(u.todaytask);
			$("#usernum").text(u.usernum);
		}
	});
}
function showRuntime() {
	var block = $(".coupon_props").parents('[class^=block]');
	add_loader(block);
	var user = $("#username").text();
	
	$.ajax({
		type : "post",
		dataType : "json",
		url : "/CMRI/home/gpuruntime",// 显示账户信息
		data : {
			user : user
		},

		complete : function() {
		},

		success : function(msg) {
			$(".runtime .runtimebody").empty();
//			$(".runtime").dataTable().fnClearTable();
			$.each(msg, function(idx, item) {
				var row = $(".runtime_line").clone();
				$(row).removeClass("runtime_line");
				row.find("#gpunum").text("GPU"+item.iD);
				row.find("#busid").text(item.busid);
				row.find("#taskname").text(item.taskname);
				row.find("#gpuuse").text(item.gpuuse);
				row.find("#memoryusage").text(item.memoryusage);
				row.appendTo(".runtime .runtimebody");
				$(row).show();
			});
			
		}
	});
}

function showAvgGpu() {
	var block = $(".coupon_props").parents('[class^=block]');
	add_loader(block);
	var user = $("#username").text();
	
	$.ajax({
		type : "post",
		dataType : "json",
		url : "/CMRI/home/gpuavg",// 显示账户信息//gpuavg
		data : {
			user : user
		},

		complete : function() {
		},

		success : function(msg) {
			$(".avg .avgbody").empty();
			$.each(msg, function(idx, item) {
				var row = $(".avg_line").clone();
				$(row).removeClass("avg_line");
				row.find("#avggounum").text("GPU"+item.iD);
				row.find("#avgbusid").text(item.busid);
				row.find("#avgtaskname").text(item.taskname);
				row.find("#avggpuuse").text(item.gpuuse);
				row.find("#avgtime").text(item.memoryusage);
				row.appendTo(".avg .avgbody");
				$(row).show();
			});
			
		}
	});
}
function showHistoryGpu() {
//	var user = $("#username").text();
	var gpuid = 1;//gpu的id
	var timeul=$("#times");
	var time = timeul.find(".active").val();//7
	var myDate = new Date();
	var year = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
	var month = myDate.getMonth();//获取当前月份(0-11,0代表1月)
	var day = myDate.getDate();  //获取当前星期X(0-6,0代表星期天)
	var hour = myDate.getHours(); //获取当前小时数(0-23)
	var minute = myDate.getMinutes();     //获取当前分钟数(0-59)
	var s=myDate.toLocaleString( );        //获取日期与时间
	var endttime = year+"."+((month+1)<10?"0":"")+(month+1)+"."+(day<10?"0":"")+day+" "+(hour<10?"0":"")+hour+":"+(minute<10?"0":"")+minute;//"2017.08.08 00:00";
//	alert(endttime);
	$.ajax({
		type : "post",
		dataType : "json",
		url : "/CMRI/home/onegpuhistory",// 显示账户信息//gpuavg
		data : {
			gpuid : gpuid,
			endttime : endttime,
			time : time
		},

		complete : function() {
		},

		success : function(msg) {
			$("#starttime").text(msg.starttime);
			$("#endtime").text(msg.endtime);
			$.each(msg.usage, function(idx, item) {//idx为序号，item为对应的数值
				alert(idx+"   "+item);
			});
		},
		failure: function() {
            alert(2);
        },
        error: function(e) {
        	alert(e); 
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


