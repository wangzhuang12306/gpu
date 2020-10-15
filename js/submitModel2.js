$(document).ready(function() {
	function plupload(id, url) {
		// alert("function");
		var uploader = $(id).pluploadQueue({
			// General settings
			runtimes : 'html5,gears,browserplus,silverlight,flash,html4',
			url : url,
			max_file_size : '70mb',
			unique_names : true,
			chunk_size : '70mb',
			// Specify what files to browse for
//			filters : [ {
//				//title : "Image files",
//				//extensions : "jpg,gif,png"
//			}, {
//				title : "Zip files",
//				extensions : "zip"
//			} ],
			resize : {
				width : 640,
				height : 480,
				quality : 90
			},
			// Flash settings
			flash_swf_url : 'plupload/plupload.flash.swf',
			// Silverlight settings
			silverlight_xap_url : 'plupload/plupload.silverlight.xap',
			// 参数
			init : {
				PostInit : function() {
					/*$('#uploadfiles').html("上传文件");
					$("#uploadfiles").on('click', function() {
						uploader.start();
						return false;
					});*/
				},
				FilesAdded : function(up, files) {
//					 alert("in");
					// var temp = up.files;
					// $.each(temp,function(n,value){
					// //alert(value.name);
					// var tempRow = $(".new_file_line").clone();
					// $(tempRow).removeClass("new_file_line");
					// tempRow.find(".malfile_name").text(value.name);
					// //alert(tempRow.find(".malfile_name").text());
					// tempRow.appendTo(".dynamicTable tbody");
					// });
				},

				UploadProgress : function(up, file) {

				},
				BeforeUpload : function(up, file){//在提交任务前，把username，taskName，gpu_number参数加入url，一起传入后台，方便给特定用户构建特定的文件夹
					function isContains(str, substr) {
					    return new RegExp(substr).test(str);
					}
					if(!isContains(this.settings.url,"taskName")){//避免重复添加参数
					var user = $("#username").text();
					var taskName = $("input[name='taskName']").val();
					var gpuNumber = $("input[name='gpu_number']").val();
					var params = "user="+user+"&taskName="+taskName+"&gpuNumber="+gpuNumber;
					this.settings.url=this.settings.url+"?"+params;}
//					alert("before: : "+this.settings.url);
				},
				FileUploaded : function(up, file, response) {
					var data = response.response;
				},
				UploadComplete : function(up, file) {
					// alert("in");
					
					var temp = up.files;
					$.each(temp, function(n, value) {
//						 alert(value.name);
						var tempRow = $(".new_file_line").clone();
						$(tempRow).removeClass("new_file_line");
						tempRow.find(".malfile_name").text(value.name);
						// alert(tempRow.find(".malfile_name").text());

						tempRow.appendTo(".dynamicTable tbody");
						$("input[type='checkbox']").css("opacity", 1);
						checkboxInitialize();
					});
				},
				Error : function(up, err) {
				}
			}
		});

		uploader.init();
	}
	plupload("#uploader","/KCloud/upload/model");
	plupload("#uploader1","/KCloud/upload/data");
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
				url : "/KCloud/submit/start",
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
					self.location.reload();
				},
				complete : function(data) {
				}
			});
		}
		var user = $("#username").text();
		var taskName = $("input[name='taskName']").val();
		var gpuNumber = $("input[name='gpu_number']").val();
		var entrypoint = $("input[name='entrypoint']").val();
		var params = "user="+user+"&taskName="+taskName+"&gpuNumber="+gpuNumber;		
		var flag1 = uploadfiles("#uploader",params);//上传模型文件
		if(flag1){
			var flag2 = uploadfiles("#uploader1",params);//上传数据文件
			if(flag2){
				startTask(taskName,gpuNumber,user,entrypoint);//提交任务
				}
		}
		
    });
});

function checkTaskName() {
	var name = $("input[name='taskName']").val();
	
// var reg=/\s?/;
// alert(reg.test(name));
// if (!reg.test(name)) {
		$.ajax({
			type : "post",
			dataType : "json",
			url : "/NeoMalbox/task/checkName",
			data : {
				taskName : name
			},
			success : function(flag) {
				if (flag) {
					// alert("任务名有效");
					$('#note').text('项目名有效');
					$('#wizard_validate').removeClass("validating");
				} else {
					// alert("任务名已经存在");
					$('#taskName').text('');
					$('#note').text('无效的项目名，或项目名已经存在');
					$('#wizard_validate').addClass("validating");
				}
			},
			complete : function() {
			}
		});
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
		url : "/KCloud/submit/start",
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
