function indexinit() {
	$('#modaltrigger').leanModal({ top: 110, overlay: 0.45, 
																 closeButton: ".hidemodal" });
	
//	$.getJSON('/auth/ipCheck.do', function(result) {
//		
//	});
	
	$('#username').focusout(function() {
		if($('#username').val() == "") {
			$('#warning-username').text("아이디를 입력하세요.");
		} else {
			$('#warning-username').text("");
		}
	});
	
	$('#password').focusout(function() {
		if($('#password').val() == "") {
			$('#warning-password').text("비밀번호를 입력하세요.");
		} else {
			$('#warning-password').text("");
		}
	});
	
	$('#loginbtn').click(function(event) {
		if($('#username').val() == "" || $('#password').val() == "") {
			alert("id 또는 password를 입력해주세요.");
		} else {
			login($('#username').val(), $('#password').val());
		}
	});
	
}

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
				$("#lean_overlay").fadeOut(200);
				$('#loginmodal').css({"display":"none"});
				location.href="math/quiz_maker.html";
			} else {
				alert("id 또는 password를 확인해주세요.");
			}
		}
	});
}
