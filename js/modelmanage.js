$(document).ready(function() {
	initialization();
});
function initialization() {
	//隐藏原有的行
	$(".ex_prop_line").hide();
	
	//上一级
	$("#lastdir").click(function() {
		lastDirectory();
	});
	//新建文件夹
	$("#newdir").click(function() {
		newDirectory();
	});
	//上传文件,需要传入文件以及存储的位置
	$("#uploadFileForm").attr("action", "/CMRI/UploadServlet");
	$("#uploadButton").click(uploadFile);
	//删除文件、文件夹，需要传入要删除的文件名
	$("#deleteButton").click(deleteFileAndDir);
	//下载文件，需要传入文件以及存储的位置
	$("#downfiles").click(downloadFile);
	//显示文件列表，缺少分页
	showDatarProp();//显示文件datas,models,codes与此相同，只有目录改变了
}

//上传文件,需要传入文件以及存储的位置
function uploadFile() {
    if($("#fileInput").attr("value")==""){
        alert('error', "请先选择文件");
        return;
    }
    var nowdir = $("#nowdir").val();//当前文件夹
    $("#hiddenDirectory").val(nowdir);//参数，代表存储位置**********
//    alert($("#hiddenDirectory").val());
    $('#uploadFileForm').submit();//提交表单

}
function downloadFile() {
    //下载需要使用checkbox来确定有哪些文件要下载
    var nowdir = $("#nowdir").val();//当前文件夹
    $("#downDirectory").val(nowdir);//参数，代表存储位置**********("D:\\home\\qqzhao\\gpu_cluster\\root\\models\\");//
//    alert($("#hiddenDirectory").val());
    $('#downloadFileForm').submit();//提交表单

}
//删除文件
function deleteFileAndDir() {
	var fileName = "tttt.txt"+","+"a";//此处需要传入要删除的文件名;//**********如何传递？
    var dir = $("#nowdir").val();
    //
    if(confirm("真的要删除 "+ fileName +"吗?")){
    	   deleteFile(fileName, dir.substring(0,dir.lastIndexOf("/")));
    	  }
    	  else{
    	  }

}
function showDatarProp() {
	var user = $("#username").text();
	var homedir = $("#hiddeninput").attr("value");
	var directory = homedir+user+"/models/";
	$("#nowdir").val(directory);//设置当前目录
	showAll(directory);
	
}

function lastDirectory(){
	var user = $("#username").text();
	var nowdir = $("#nowdir").val();
	var homedir = $("#hiddeninput").attr("value");
	var rootdir = homedir+user+"/models/";
	var newdir="";
	if(nowdir==rootdir){
		newdir=rootdir;
	}else{
		var newdir=nowdir.substring(0,nowdir.lastIndexOf("/"));
		newdir=newdir.substring(0,newdir.lastIndexOf("/"))+"/";
		
	}
	$("#nowdir").val(newdir);
	showAll(newdir);
}

function newDirectory(){
	var user = $("#username").text();
	var nowdir = $("#nowdir").val();
	var homedir = $("#hiddeninput").attr("value");
	var rootdir = homedir+user+"/models/";
	var name=prompt("输入文件夹名称","")
	  if (name!=null && name!="")
	    {
		  addFolder(nowdir, name);
	    }else{
	    	alert("名字不能为空");
	    }
	showAll(nowdir);
}

//parentDir : 上层目录路径，dirName：新建目录名称
function addFolder(parentDir, dirName) {
    $.post("/CMRI/OnlineFileManagerServlet", {
        command:"addFolder",
        directory : parentDir + "/" + dirName
    },
    function(data){
        if(data == null || data['success'] != true){
            alert('error', '添加失败，可能存在同名目录或新目录名含有非法字符(? \\ / : * \" < > |)，请重试。');
        }
    }, "json");
}

function showAll(dir){//缺少分页
	var cmd = "listall";
	$.ajax({
		type : "post",
		dataType : "json",
		url : "/CMRI/OnlineFileManagerServlet",// 显示文件
		data : {
			command:cmd,
			directory : dir
		},

		complete : function() {
		},

		success : function(msg) {
			$(".data_table .databody").empty();
			$.each(msg, function(idx, item) {
				var row = $(".ex_prop_line").clone();
				$(row).removeClass("ex_prop_line");
				row.find(".prop_filename").text(item.fileName);
				row.find(".prop_filetime").text(item.uploadTime);
				row.find(".prop_taskname").text(item.fileKind);
				row.find(".prop_filesize").text(item.fileSize);
				if(item.fileKind=="directory"){//文件夹可以继续点击
					row.click(function() {
						$(".data_table .databody").empty();
						$("#nowdir").val(dir+item.fileName+"/");//设置当前目录
						showAll(dir+item.fileName+"/");
					});
				}
				row.appendTo(".data_table .databody");
				$(row).show();
			});
		}
	});
}

function deleteFile(fileName, dir) {
    $.post("/CMRI/OnlineFileManagerServlet", {
        command:"deleteFile",
        file:fileName,
        directory:dir
    },
    function(data){
        if(data ==null || data['success'] != true){
            alert("删除失败，可能该文件夹内有其他文件，请重试。");
        }
        showAll(dir);
    }, "json");
}