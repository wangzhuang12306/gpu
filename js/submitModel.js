$(document).ready(function() {
	$("#closeTipButton").click(function(){
        $("#operationTipDiv").hide();
    });
	showTaskProp();
//	var nowgpu=$("#nowgpu").val();
//	$('#note22').text('当前系统中有'+nowgpu+'个GPU可以用');
//	var tsknames = getUserTaskInfo();
//	alert(tsknames);
	$('#selecttrainfiles').click(function () {
		var user = $("#username").text();
		var homedir = $("#hiddeninput").attr("value");
		$('iframe').attr('src','./fileManager/fileManager2.html?rootFolder='+user+'&homedir='+homedir);
//		$("#fModal_addUser").find("input").val("");
		setText("input[name='trainfiles']");
	});
	$('#selectentrypoint').click(function () {
		var user = $("#username").text();
		var homedir = $("#hiddeninput").attr("value");
		$('iframe').attr('src','./fileManager/fileManager2.html?rootFolder='+user+'&homedir='+homedir);
//		$("#fModal_addUser").find("input").val("");
		setText("input[name='entrypoint']");
	});
	$('#selectdatadir').click(function () {
		var user = $("#username").text();
		var homedir = $("#hiddeninput").attr("value");
		$('iframe').attr('src','./fileManager/fileManager2.html?rootFolder='+user+'&homedir='+homedir);
//		$("#fModal_addUser").find("input").val("");
		setText("input[name='datadir']");
	});
	$('#submitTask2').click(function () {//点击提交任务按钮时，执行以下操作。本来设计的是点击这个按钮可以把模型文件和数据文件一起上传，然后运行任务。但是在上传文件时发生错误，所以文件只能在前两步手动点击上传键来上传
		function isContains(str, substr) {
		    return new RegExp(substr).test(str);
		}
		function uploadfiles(id,params){
			
			var url1 = $(id).pluploadQueue().settings.url;
//			if(!isContains(url1,"taskName")){
//				alert("aaaaa");
//				alert(id+": "+url1);
//			$(id).pluploadQueue().settings.url = url1+"?"+params;
			$(id).pluploadQueue().refresh();
			$(id).pluploadQueue().start();
			return true;
		}
		function startTask(taskName,gpuNumber,user,entrypoint){
			$.ajax({
				type : "post",
				dataType : "text",
				url : "/CMRI/submit/start",
				data : {
					taskName : taskName,
					gpuNumber : gpuNumber,
					user : user,
					entrypoint : entrypoint
				},
				success : function(flag) {
					 alert("添加成功");
					 alert("flag: "+flag);
					//setTimeout("layer.alert('添加成功', 8)",1000);
					//Pause(this,20000);//调用暂停函数
					//layer.alert('白菜级别前端攻城师贤心', 8);
//					self.location.reload();
					 window.location.href="taskManager.jsp";
				},
				complete : function(data) {
				}
			});
		}
		var user = $("#username").text();
		var taskName = $("input[name='taskName']").val();
		var gpuNumber = $("input[name='gpu_number']").val();
		var trainfiles = $("input[name='trainfiles']").val();
		var entrypoint = $("input[name='entrypoint']").val();
		var datadir = $("input[name='datadir']").val();
		var runtype = $("select[name='runtype']").val();
		if(runtype=="1"){
			gpuNumber =1;
		}
		
		if(taskName=="请输入项目名"){
			alert("项目名输入错误");
		}
		else if(isNaN(gpuNumber)){
			alert("gpu数目输入错误");
		}
		else if(trainfiles=="请输入目录路径"){
			alert("训练样本路径输入错误");
		}
		else if(entrypoint=="请输入文件路径"){
			alert("训练入口文件路径输入错误");
		}
		else if(datadir=="请输入目录路径"){
			alert("数据路径输入错误");
		}
		else{
		$.ajax({
		type : "post",
		dataType : "text",
		url : "/CMRI/submit/start",
		data : {
			userName : user,
			taskName : taskName,
			gpuNumber : gpuNumber,
			trainfiles : trainfiles,
			entrypoint : entrypoint,
			datadir : datadir,
			runtype : runtype
		},

		success : function(flag) {
//			alert(flag);
//			alert(flag);
//			alert("too many gpu ask".indexOf(flag));
			if("gpu exceed all gpu".indexOf(flag)+1>0){
				alert("系统无法满足GPU需求，任务无法提交!!!");
				self.location.reload();
			}
			else if("gpu exceed user gpu".indexOf(flag)+1>0){
				alert("你请求的GPU数量超过了你可以请求的最大数量!!!");
				self.location.reload();
			}
			else if("too many gpu ask".indexOf(flag)+1>0){
				alert("添加失败，项目名或请求的GPU数不符合要求");
				self.location.reload();
			}else{
				alert("添加成功");
				window.location.href="taskManager.jsp";
			}
//			 alert("添加成功");
			//setTimeout("layer.alert('添加成功', 8)",1000);
			//Pause(this,20000);//调用暂停函数
			//layer.alert('白菜级别前端攻城师贤心', 8);
//			self.location.reload();
//			window.location.href="taskManager.jsp";
		},
		complete : function(flag) {
//			alert("complete : "+flag);
		}
	});
	}
    });
});
function setText(name){
	/*$("#ok_addUser").click(function() {
		var h = frames[0];
		var s = h.document.getElementById("filepath").value;
//		alert(s);
//		alert($(window.frames["myFrame"].document).find("#filepath").val());
		var t=$(window.frames["myFrame"].document).find("#filepath").val()
		$(name).val(t);
	});*/
	$("#ok_addUser").one("click",function() {//只需要触发一次的，随后要立即解除绑定
		var h = frames[0];
		var s = h.document.getElementById("filepath").value;
//		alert(s);
//		alert($(window.frames["myFrame"].document).find("#filepath").val());
		var t=$(window.frames["myFrame"].document).find("#filepath").val()
		$(name).val(t);
	});
}
/*function getUserTaskInfo(){
	var username = $("#username").text();
	var tsknames = new Array();
	$.ajax({
		type : "post",
		dataType : "json",
		url : "/CMRI/task/getUserTaskInfo",
		data : {
			username : username
		},
		success : function(flag) {
			tsknames=flag;
//			alert(tsknames[1]);
		},
		complete : function() {
		}
	});
	return tsknames;
}*/
function checkGPUNumber(obj){
	var runtype = $("select[name='runtype']").val();
	if(runtype!="1"){
	var maxgpu=$("#hiddengpu").val();
	if(!obj.value){
		obj.value=obj.defaultValue;
		obj.style.color='#999';
			}
	if(isNaN(obj.value)){
		$('#note2').text(obj.defaultValue);
		obj.value=obj.defaultValue;
//		alert(obj.value);
	}else{
		var gpu = obj.value;
		$('#note2').text("");
		if(gpu<0 || gpu>maxgpu){
			$('#note2').text('请求的gpu数目错误');
			obj.value=obj.defaultValue;
//			alert("请求的gpu数目错误");
		}
		if(runtype=="2" && gpu > 4){
			$('#note2').text('单机多卡模式最多可用4个GPU');
			obj.value=obj.defaultValue;
		}
	}
	}
}
function checkTaskName(obj) {
	var name = $("input[name='taskName']").val();
	var username = $("#username").text();
	if(!obj.value){
		obj.value=obj.defaultValue;
		obj.style.color='#999';
		$('#note').text(obj.defaultValue);
			}
	else{
// var reg=/\s?/;
// alert(reg.test(name));
// if (!reg.test(name)) {
		$.ajax({
			type : "post",
			dataType : "json",
			url : "/CMRI/task/getUserTaskInfo",//"/NeoMalbox/task/checkName",
			data : {
				username : username,//
				taskName : name
			},
			success : function(flag) {
				if (flag) {
//					 alert("任务名有效");
					$('#note').text("");
//					$('#wizard_validate').removeClass("validating");
				} else {
//					 alert("任务名已经存在");
					$('#taskName').text('');
					$('#note').text('无效的项目名，或项目名已经存在');
//					$('#wizard_validate').addClass("validating");
				}
			},
			complete : function() {
			}
		});
	}
// }
}

function checkboxInitialize() {
	$("#checkAll").click(function() {
		if ($(this).attr("checked") == "checked") {
			$("input[type='checkbox']").prop("checked", true);
		} else {
			$("input[type='checkbox']").prop("checked", false);
		}
	});

	$(".rowSelect").click(
			function() {
				if ($(this).attr("checked") == "checked") {
					$(this).parents("tr").find("input[type='checkbox']").prop(
							"checked", true);
				} else {
					$(this).parents("tr").find("input[type='checkbox']").prop(
							"checked", false);
				}

			});

	$(".columnSelect").click(
			function() {
				var name = $(this).attr("name");
				if ($(this).attr("checked") == "checked") {

					$(this).parents("table")
							.find("input[class='" + name + "']").prop(
									"checked", true);
				} else {
					$(this).parents("table")
							.find("input[class='" + name + "']").prop(
									"checked", false);
				}
			});
}
function selecttrainfiles(){
	alert("select");
}
function submitTask(modelPath) {
	// alert("submitTaskhaha");
	var taskQueue = [];
	var taskName = $("input[name='taskName']").val();
	var gpuNumber = $("input[name='gpu_number']").val();
	// alert(taskName);
	$(".table tr.dataline").each(function() {
		var malfile_name = $(this).find(".malfile_name").text();
		// alert(malfile_name);
		$(this).find("input[class^='column']").each(function(index) {
			if ($(this).attr("checked") == "checked") {
				// alert(index+1);
				var temp = [];
				temp.push('{"fileName":"');
				temp.push(malfile_name);
				temp.push('","sceneNum":');
				temp.push(index + 1);
				temp.push('}');
				taskQueue.push(temp.join(""));
			}

		});
	});

//	alert(url);
//	$("#uploader").pluploadQueue().setOption('url', url);
//	$("#uploader").pluploadQueue().refresh();
//	$("#uploader").pluploadQueue().start();
	/*$.ajax({
		type : "post",
		dataType : "json",
		url : "/CMRI/submit/start",
		data : {
			taskName : taskName,
			gpuNumber : gpuNumber
		},
//		url : "/NeoMalbox/task/add",
//		data : {
//			taskName : taskName,
//			taskQueue : taskQueue
//		},
		success : function(flag) {
//			 alert("添加成功");
			//setTimeout("layer.alert('添加成功', 8)",1000);
			//Pause(this,20000);//调用暂停函数
			//layer.alert('白菜级别前端攻城师贤心', 8);
			self.location.reload();
		},
		complete : function() {
		}
	});*/
	// alert(taskQueue);
}
function showTaskProp() {
	var username = $("#username").text();
	$.ajax({
		type : "post",
		dataType : "json",
		url : "/CMRI/gpu/gpunum",//"/NeoMalbox/task/checkName",
		data : {
			username : username,//
		},
		success : function(flag) {
			if (flag>=0) {
				$('#note22').text('当前系统中有'+flag+'个GPU可以用');
			} else {
				var nowgpu=$("#nowgpu").val();
				$('#note22').text('当前系统中有'+nowgpu+'个GPU可以用');
			}
		},
		complete : function() {
		}
	});

}

function selectMode(Names){
	if(Names=="1"){
		Nnews=document.getElementById("x1")
		Nnews.style.display='none';
	}else{
		Nnews=document.getElementById("x1")
		Nnews.style.display='';
	}
}
