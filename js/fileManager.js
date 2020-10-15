
/**
 * 
 */$(document).ready(function() {
	initialization();
	
});

function initialization() {
	var user = $("#username").text();
//	$('iframe').attr('src','./fileManager/fileManager.html?rootFolder=E://web/'+user);
//	$('iframe').attr('src','./fileManager/fileManager.html?rootFolder=/home/lanlin/gpu_cluster_console_2/'+user);
	var homedir = $("#hiddeninput").attr("value");
	$('iframe').attr('src','./fileManager/fileManager.html?rootFolder='+user+'&homedir='+homedir);
}


