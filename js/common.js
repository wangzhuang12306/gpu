/**
 * �ռ��Ի��򵯳��������
 * �������ں�̨���棬ǰ̨С��
 * ҳ������ֲ���룺
 * 
 	<div id="fModal_message" class="modal hide fade" tabindex="-1"
		role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-header">
			<h3 id="modal_message_title"></h3>
		</div>
		<div class="modal-body">
			<p id="modal_message_body"></p>
			<p>
				<span class='secRemain'></span>�����ʧ
			</p>
		</div>
		<div class="modal-footer"></div>
	</div>
 *
 * javascript ���� showMessage(title, message,seconds)
 * �� showMessage("�й���", "�й��첻����һ����ɫ",5)
 * seconds Ϊ ��ʱʱ��
 */

function showMessage(title, message,seconds) {
	seconds = seconds || 2;
	$("#fModal_message .secRemain").text(seconds);
	$("#modal_message_title").text(title);
	$("#modal_message_body").text(message);
    $("#fModal_message").modal("show");
    var temple = function(){
    	var sec = Number($("#fModal_message .secRemain").text());
        sec = sec - 1;
        if(sec<=0){
        	$("#fModal_message").modal("hide");
        }else{
       	 	$("#fModal_message .secRemain").text(sec);
       	 	setTimeout(temple,1000);
        }
    }
    setTimeout(temple,1000);
}