(function() {
	$('#download-app').bind('click', function(event) {
		event.preventDefault();
		var value = prompt("인증번호를 입력하세요.");
		if(value != null) 
			checkValue(value);
	});
	
	var checkValue = function(value) {
		if(value == "2016") {
			location.href="http://touchnedu.cafe24.com/touchnmath.apk";
		} else {
			alert("암호가 올바르지 않습니다.");
		}
	};
	
}());
