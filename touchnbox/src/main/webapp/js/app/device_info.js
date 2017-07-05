(function() {
	$('#number').bind('keyup', function() {
		$(this).val($(this).val().replace(/[^0-9]/gi,""));
	});
	
	$('#saveBtn').bind('click', function() {
		var msg = '';
		if($('#divce_id').text().replace(/\s/g,"").length == 0)
			msg = '기기 정보가 입력되지 않았습니다.';
		if($('#name').val().replace(/\s/g,"").length == 0 && msg == '')
			msg = '학원명을 입력해주세요.';
		if($('#addr').val().replace(/\s/g,"").length == 0 && msg == '')
			msg = '지역 정보를 입력해주세요.';
		if($('#number').val().replace(/\s/g,"").length == 0 && msg == '')
			msg = '기기 번호를 입력해주세요.';
				
		if(msg == '')
			alert('저장');
		else
			alert(msg);
		
	});
}());

