
/**
 * 
 */$(document).ready(function() {
	initialization();
});

function initialization() {
	// hide template table and line
	$(".ex_prop_line").hide();
	$("#prop_refresh").click(function() {
		showDatarProp();
	});
	$("#lastdir").click(function() {
		lastDirectory();
	});
//	$("#uploadFileForm").attr("action", "/CMRI/UploadServlet");
	$("#uploadButton").click(uploadFile);

	// show data
	showDatarProp();//显示文件datas,models,codes与此相同，只有目录改变了
}

//上传文件
function uploadFile() {
    if($("#fileInput").attr("value")==""){
        alert('error', "请先选择文件");
        return;
    }
//    blockPage();
    var nowdir = $("#nowdir").val();
    $("#hiddenDirectory").val(nowdir);
    $("#nowpage").val("datas.jsp");
//    alert($("#hiddenDirectory").val()+"  "+$("#fileInput").val());
//    $('#uploadFileForm').submit();
//    showDatarProp()
//    self.location.reload();
//    showAll(nowdir);
    var upload = $("#fileInput").val();
    var directory = $("#hiddenDirectory").val();
	var user = $("#username").text();
	var formData = new FormData($("#uploadForm")[0]); 
	alert("test  "+upload+"  "+directory);
	$.ajax({
		type : "post",
//		dataType : "json",
		url : "/CMRI/UploadServlet",// 显示账户信息//gpuavg
		/*data : {
			upload : upload,
			directory : directory
		},*/
		data: formData, 
		async: false, 
	     cache: false, 
	     contentType: false, 
	     processData: false, 

		complete : function(msg) {
			alert(msg);
		},

		success : function(msg) {
			alert(msg);
			showAll(nowdir);
		},
		failure: function(msg) {
            alert("fail"+msg);
        },
        error:function(XMLHttpRequest, textStatus){  
            console.log(XMLHttpRequest);  //XMLHttpRequest.responseText    XMLHttpRequest.status   XMLHttpRequest.readyState  
            console.log(textStatus);  
            $(".box").html("服务器错误！");  
        } 
	});
}
function upload() { 
	   var formData = new FormData($("#uploadForm")[0]); 
	   alert(formData);
	   $.ajax({ 
	     url: '/CMRI/UploadServlet', 
	     type: 'POST', 
	     data: formData, 
	     async: false, 
	     cache: false, 
	     contentType: false, 
	     processData: false, 
	     success: function(data) {
	     }, 
	     error: function(data) {   
	     } 
	   }); 
	}
///**
//* 遮罩效果，msg是需要显示的文字
//*/
//function blockPage() {
//    $.blockUI({
//        message: '<img src="./image/loading.gif"/>',
//        //消息框外框的样式
//        css : {
//            border: "none",
//            background: "transparent"
//        }
//    }
//    );
//}
///**
//* 去除遮罩效果
//*/
//function unBlockPage() {
//    $.unblockUI();
//}
function showDatarProp() {
	var block = $(".coupon_props").parents('[class^=block]');
	var user = $("#username").text();
	var homedir = $("#hiddeninput").attr("value");
	var directory = homedir+user+"/datas/";
	$("#nowdir").val(directory);//设置当前目录
	showAll(directory);
	
}

function lastDirectory(){
	var user = $("#username").text();
	var nowdir = $("#nowdir").val();
	var homedir = $("#hiddeninput").attr("value");
	var rootdir = homedir+user+"/datas/";
	var newdir="";
	if(nowdir==rootdir){
		newdir=rootdir;
	}else{
		var newdir=nowdir.substring(0,nowdir.lastIndexOf("/"));
		newdir=newdir.substring(0,newdir.lastIndexOf("/"))+"/";
		
	}
//	alert(newdir);
	showAll(newdir);
}

function showAll(dir){
//	alert(dir);
	var cmd = "listall";
	$.ajax({
		type : "post",
		dataType : "json",
		url : "/CMRI/OnlineFileManagerServlet",// 显示数据文件
		data : {
			command:cmd,
			directory : dir
		},

		complete : function() {
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
//			remove_loader(block);
		},

		success : function(msg) {
			$(".coupon_props tbody").empty();
			$(".fpTable").dataTable().fnClearTable();
			$.each(msg, function(idx, item) {
				var row = $(".ex_prop_line").clone();
				$(row).removeClass("ex_prop_line");
				row.find(".prop_filename").text(item.fileName);
				row.find(".prop_filetime").text(item.uploadTime);
				row.find(".prop_taskname").text(item.fileKind);
				row.find(".prop_filesize").text(item.fileSize);
				if(item.fileKind=="directory"){//文件夹可以继续点击
					row.click(function() {
						$(".coupon_props tbody").empty();
						$("#nowdir").val(dir+item.fileName+"/");//设置当前目录
						showAll(dir+item.fileName+"/");
					});
				}
				row.appendTo(".coupon_props tbody");
				$(row).show();
			});
		}
	});
}


