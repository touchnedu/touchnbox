(function() {
	$('#loginbtn').click(function(event) {
		if($('#username').val() == "" || $('#password').val() == "") {
			alertify.alert("id 또는 password를 입력해주세요.");
		} else {
			login($('#username').val(), $('#password').val());
		}
	});
	
//	$('.stuDetail100025').click(function(event) {
//		event.preventDefault();
//		var link = this.getAtrribute('sno');
//	}); 그냥 변수 지정 참고하라고.
	
}());

function login(username, password) {
	$.ajax('/auth/login.do', 
	{
		method: 'POST',
		dataType: 'json',
		data: {
			id: username,
			password: password
		}, success: function(result) {
//			console.log("ip = " + result.ip);
			if(result.data == 'success') {
				$("body").css("background", "#fff");
				location.href="sub/quiz.html";
			} else {
				alertify.alert("id 또는 password를 확인해주세요.");
			}
		}
	});
}
