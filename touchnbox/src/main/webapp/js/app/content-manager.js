function content() {
	$('.content-preview').click(function(event) {
		var attr = $(this).attr("id");
		switch(attr) {
		// 저장하기
		case "save-content":
			if($('input[id^="code-type"').val() == "" 
					|| $('#ins-quizText').val() == "" || $('#popupContent').val() == "") {
				alert("입력하지 않은 항목이 있습니다.");
			} else {
				saveContent();
			}
			break;
		// 수정하기	
		case "update-content":
			if(confirm("수정하시겠습니까?")) {
				updateContent();
			} 
			break;
		// 불러오기
		case "load-content":
			loadContent();
			break;
		case "cancel-content":
			cancelContent();
			break;
		// 미리보기는 별도로 작성 -> input_math.js
		default:
			break;
		}
	});
	
}

/* 로그인 아이디 가져오기 */
function getLoginId() {
	return $('#current-id').attr('data-id');
}

/* 문제 코드 유효성 검사 */
function validateCode(typeCode) {
	var isCode = 0;
	
	console.log(isCode);
	return isCode;
}
/* 저장하기 */
function saveContent() {
	// 카테고리별 분류 생성
	var getId = getLoginId();
	var countryCode = 1;
	var school = $('#code-type-1').val().substr(0, 1);
	var grade = $('#code-type-1').val().substr(1, 1);
	var term = $('#code-type-1').val().substr(2, 1);
	var bigChapter = $('#code-type-2').val().substr(0, 1);
	var midChapter = $('#code-type-2').val().substr(1, 1);
	var smallChapter = $('#code-type-2').val().substr(2, 2);
	var difficulty = $('#code-type-3').val();
	var quizNumber01 = $('#code-type-4').val();
	var quizNumber02 = $('#code-type-5').val();
	var chapCode = "1" + $('#code-type-1').val().concat($('#code-type-2').val());
	var typeCode = chapCode.concat($('#code-type-4').val(),	
																 $('#code-type-5').val());
	
	chapCode *= 1; // Number 타입으로 형변환
	typeCode *= 1; 
	
	$.getJSON('/math/validateCode.do?typeCode=' + typeCode, function(result) {
		if(result.data == 'yes') {
			alert("이미 존재하는 코드입니다.");
		} else {
	
			$.ajax('/math/insert.do', 
			{
				method: 'POST',
				dataType: 'json',
				data: {
					countryCode: countryCode,
					typeCode: typeCode,
					chapCode: chapCode,
					school: school,
					grade: grade,
					term: term,
					bigChapter: bigChapter,
					midChapter: midChapter,
					smallChapter: smallChapter,
					difficulty: difficulty,
					boxNumber: $('#select-box-number option:selected').val(),
					quizNumber01: quizNumber01,
					quizNumber02: quizNumber02,
					mno: getId,
					title: $('#ins-quizText').val(),
					content: $('#popupContent').val()
				}, success: function(result) {
					if(result.data == "success") {
						alert("저장되었습니다");
						$('textarea').val('');
						$('input[id=etc-chk]').prop('checked', false);
						$('#code-type-4').val('');
						$('#select-box-number option:eq(0)').prop('selected', true);
						$('#select-type-number option:eq(0)').prop('selected', true);
						$('input:checkbox[id^="ans-chk"]').prop('checked', false);
						$('input:checkbox[id^="next-line"]').prop('checked', false);
						$('select[name^="ans-number"] option:eq(0)').prop('selected', true);
						$('select[name="ans-number-99"] option:eq(0)').prop('selected', true);
						$('select[name^="ans-number"]').prop('disabled', true);
						$('input[id^="input-ans"]').prop('disabled', true);
						$('input[id^="input-ans"]').val('');
						$('td[id^="mathTgt"]').text('');
						$('#mathSrc99').prop('disabled', true);
						$('#gen-optionVal').prop('disabled', true);
					} else {
						alert("저장 실패! 다시 시도해주세요.");
					}
				}
			});
		}
	}); 
		
}

/* 수정하기 */
function updateContent() {
	var uCode06 = $('#update-code-6').val();
	if($('#update-code-6').val().length == 1) {
		uCode06 = "0" + uCode06;
	} 
	var uCode09 = $('#update-code-9').val();
	if($('#update-code-9').val().length == 1) {
		uCode09 = "00" + uCode09; 
	} else if($('#update-code-9').val().length == 2) {
		uCode09 = "0" + uCode09;
	}
	var uCode10 = $('#update-code-10').val();
	if($('#update-code-10').val().length == 1) {
		uCode10 = "0" + uCode10;
	}
	
	var cCode = "1" + $('#update-code-1').val().concat($('#update-code-2').val(),
																										 $('#update-code-3').val(),
																										 $('#update-code-4').val(),
																										 $('#update-code-5').val(),
																										 uCode06);
	var tCode = cCode.concat(uCode09, uCode10);
	
	$.ajax('/math/update.do', 
	{
		method: 'POST',
		dataType: 'json',
		data: {
			no: $('#ins-quizText').attr('data-qno') * 1,
			title: $('#ins-quizText').val(),
			content: $('#popupContent').val(),
			school: $('#update-code-1').val(),
			grade: $('#update-code-2').val(),
			term: $('#update-code-3').val(),
			bigChapter: $('#update-code-4').val(),
			midChapter: $('#update-code-5').val(),
			smallChapter: $('#update-code-6').val(),
			difficulty: $('#update-code-7').val(),
			boxNumber: $('#update-code-8').val(),
			quizNumber01: $('#update-code-9').val(),
			quizNumber02: $('#update-code-10').val(),
			typeCode: tCode,
			chapCode: cCode
		}, success: function(result) {
			if(result.data == "success") {
				alert("수정되었습니다");
				resetUpdate();
			} else {
				alert("수정 실패! 다시 시도해주세요.");
			}
		}
	});
}

/* 취소하기 */
function cancelContent() {
	if(confirm("취소하시겠습니까?")) {
		resetUpdate();
	} 
}

/* 불러오기 */
function loadContent() {
	var topPosition = (screen.height - 580) / 2;
	var leftPosition = (screen.width - 500) / 2;
	var popupUrl = "list.html";
	var popupOption = "width=500, height=580" +
										", top=" + topPosition + ", left=" + leftPosition +
										", resizable=no, scrollbars=yes, status=no;";
	
	window.open(popupUrl, "", popupOption);
	
}

/* 목록 보기 */
function viewList() {
	var curId = $(opener.document).find('#current-id').attr('data-id');
	
	$.getJSON('/math/list.do?no=' + curId, function(result) {
		
		$('.data-row').remove();
	  // HandlebarsJS 템플릿 적용
		console.log("데이터 : ");
		console.log(result.data);
	  var source = $('#template_list').html();
	  var template = Handlebars.compile(source);
	  var content = template(result);
	  $('#view-content-table tbody').html(content);
	  
	});
	
}

/* 취소 또는 수정 성공 시 폼 리셋 */
function resetUpdate() {
	$('#ins-quizText').css('border', 'none')
	.css('background', 'transparent');
	$('#ins-quizText').attr('readonly', 'readonly');
	
	$('#ins-quizText').val('');
	$('#popupContent').val('');
	
	$('#update-content').css('display', 'none');
	$('#cancel-content').css('display', 'none');
	$('#save-content').css('display', 'inline');	
	$('input[id^="update-code"]').attr('readonly', 'readonly');
	$('input[id^="update-code"]').val('');
}

