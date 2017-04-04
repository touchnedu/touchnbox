var $boxNumber01Code = "",
		$boxNumber02Code = "",
		$boxNumber03Code = "",
		$boxNumber04Code = "",
		$boxNumber05Code = "",
		$boxNumber06Code = "",
		$boxNumber07Code = "";
var totalBoxNumber = 1;
var updateQNumber;
var arrowNumber = "";
const ANSWERCODE = "<div id='answer-ring'><img src=''></div>\n";
(function() {
	/** 문제 이미지 불러오기 */
	var loadImage = function(source) {
		var contentImg = new Image();
		contentImg.src = "../quiz_images/" + source + "_00.png";
		contentImg.onload = function() {
			var imgTag = "<img id='content-src' src='" + contentImg.src + "'>";
			$('#preview-quiz').empty();
			$('#preview-quiz').append(imgTag);
			checkQNumber(source);
		} 
		contentImg.onerror = function() {
			alertify.alert("문제가 존재하지 않습니다.");
		}
	};
	
	/** 박스 Div 컨트롤러 */
	var controlDiv = function() {
		// 체크된 값까지 박스 입력을 활성화
		for(var i = totalBoxNumber; i > 1; i--) {
			(function() {
				var idx = i;
				$('.text-boxnumber-0' + idx).css('color', '#000 !important')
																		.css('display', 'block !important');
				$('.text-boxnumber-0' + idx + ' > *').css('color', '#000 !important')
																						 .css('display', 'inline-block');
			})();
		}
		// 체크된 값보다 큰 값의 박스 입력을 비활성화
		for(var i = totalBoxNumber; i < 7; i++) {
			(function() {
				var idx = (i * 1) + 1;
				$('.text-boxnumber-0' + idx).css('color', '#eee !important')
																		.css('display', 'none !important');
				$('.text-boxnumber-0' + idx + ' > *').css('color', '#eee !important')
																						 .css('display', 'none');
				$('.text-boxnumber-0' + idx).find('div[class^=box-type]')
																	.animate({top:0, left:0}, 600, 'easeOutCubic');
			})();
		}
		switch(totalBoxNumber) {
			case "1":
				$boxNumber02Code = "";
				$boxNumber03Code = "";
				$boxNumber04Code = "";
				$boxNumber05Code = "";
				$boxNumber06Code = "";
				$boxNumber07Code = "";
				break;
			case "2":
				$boxNumber03Code = "";
				$boxNumber04Code = "";
				$boxNumber05Code = "";
				$boxNumber06Code = "";
				$boxNumber07Code = "";
				break;
			case "3":
				$boxNumber04Code = "";
				$boxNumber05Code = "";
				$boxNumber06Code = "";
				$boxNumber07Code = "";
				break;
			case "4":
				$boxNumber05Code = "";
				$boxNumber06Code = "";
				$boxNumber07Code = "";
				break;
			case "5":
				$boxNumber06Code = "";
				$boxNumber07Code = "";
				break;
			case "6":
				$boxNumber07Code = "";
				break;
		}
	};
	
	/* 자바스크립트는 replaceAll이 없다.
	 * 치환하려는 문자의 " 대신에 /를 넣고 대소문자 구별이 없는 gi를 뒤에 붙이면
	 * 정규식으로 모든 문자(또는 기호)를 치환할 수 있다. */
	/** 저장하기 */
	var saveContents = function() {
		var genImgTag = "<img src='../quiz_images/" + $('#image-src').val() + 
										"_00.png' data-boxNum='" + totalBoxNumber + "'>\n"; // 이미지 주소
		var mathCode = $('#image-src').val().replace(/_/gi, "") + "00"; // 문제 번호
		var chapCode = mathCode.substr(0, 7); // 챕터 번호
		
		var school = $('#image-src').val().substr(0, 1);
		var grade = $('#image-src').val().substr(1, 1);
		var term = $('#image-src').val().substr(2, 1);
		
		var bigChapter = $('#image-src').val().substr(4, 1);
		var midChapter = $('#image-src').val().substr(5, 1);
		var smallChapter = $('#image-src').val().substr(6, 2);
		
		var quizNumber01 = $('#image-src').val().substr(9, 3);
		var quizNumber02 = "00";
		
		// 박스 생성 코드
		var genQuizCode = genImgTag + $boxNumber01Code + $boxNumber02Code +
											$boxNumber03Code + $boxNumber04Code + $boxNumber05Code +
											$boxNumber06Code + $boxNumber07Code + ANSWERCODE;
		
		$.ajax('/mathdata/insert.do', 
		{
			method: 'POST',
			dataType: 'json',
			data: {
				mno: $('#current-id').attr('data-id'),
				imgCode: $('#image-src').val() + "_00",
				mathCode: mathCode,
				chapCode: chapCode,
				school: school,
				grade: grade,
				term: term,
				bigChapter: bigChapter,
				midChapter: midChapter,
				smallChapter: smallChapter,
				boxNumber: totalBoxNumber,
				quizNumber01: quizNumber01,
				quizNumber02: quizNumber02,
				content: genQuizCode
			}, success: function(result) {
				alertify.delay(2000).success("저장되었습니다.");
				resetAllBox();
			}
		});
		
	};
	
	/** 로그인 유무 검사 */
	$('#area-header').load('header.html', function() {
		$.getJSON('/auth/loginInfo.do', function(result) {
			if(result.state == "yes") {
				init(result.member.no, result.member.name);
				$('body').css('display', 'block');
			} else {
				alertify.alert("로그인해주세요.", function() {
					location.replace("../index.html");
				});
			}
		});
	});
	
	$('input:radio').iCheck({
    checkboxClass: 'icheckbox_square-green',
    radioClass: 'iradio_square-green',
    increaseArea: '0%' // optional
  });

	/** 픽셀 이동 화살표 방향 지정하기 */
	$('div[class=box-type-gen]').click(function() {
		arrowNumber = $(this).parent().attr('class').substring(15);
	});
	
	/** 박스 드래그 이벤트 */
	$('div[class=box-type-gen]').draggable({
		containment: "#content-quiz",
		revert: "invalid",
		cursor: "-webkit-grabbing",
		start: function() {
//			$(this).css('cursor', '-webkit-grabbing');
		},
		stop: function() {
			// 다른 네모를 드래그할 경우 기존 네모를 원위치 시킨다.
			$(this).prevAll().animate({top:0, left:0}, 600, 'easeOutCubic');
			$(this).nextAll().animate({top:0, left:0}, 600, 'easeOutCubic');
		}
	});
	
	/** 박스 드랍 이벤트 */
	$('#preview-phone').droppable({
		accept: "div[class^=box-type]",
		drop: function(event, ui) {
			ui.draggable.addClass("drop");
			if($('#content-src').attr('src') == undefined) {
				alertify.delay(2000).error("문제 이미지를 불러와주세요"); 
				ui.draggable.animate({top:0, left:0}, 600, 'easeOutCubic');
			} else {
				var topPosition = ui.draggable.offset().top
																					- $('#content-src').position().top;
				var leftPosition = Math.round(ui.draggable.offset().left
																					- $('#content-src').position().left);
	//			console.log(ui.draggable.offset().top);
	//			console.log(ui.draggable.offset().left);
	//			console.log(ui.draggable.position());
				
				var currentBoxNumber = ui.draggable.parent().attr("class").substring(15); // 박스 번호
				var boxTypeNum = ui.draggable.attr("data-type"); // 박스 타입
				var currentAns = ui.draggable.parent().find('.input-answer').val(); // 정답
				if(currentAns == '') {
					alertify.delay(2000).error("정답을 입력해주세요.");
					ui.draggable.animate({top:0, left:0}, 600, 'easeOutCubic');
				} else {
					var genMathCode = "data-top='" + topPosition + "' " +
														"data-left='" + leftPosition + "' " +
														"data-width='" + ui.draggable.width() + "' " +
														"data-height='" + ui.draggable.height() + "' " +
//														"data-type='" + boxTypeNum + "' " +
														"data-answer='" + currentAns + "'>\n";
					
					switch(currentBoxNumber) {
						case "01":
							$boxNumber01Code = "<input type='text' id='box01' " + genMathCode;
							break;
						case "02":
							$boxNumber02Code = "<input type='text' id='box02' " + genMathCode;
							break;
						case "03":
							$boxNumber03Code = "<input type='text' id='box03' " + genMathCode;
							break;
						case "04":
							$boxNumber04Code = "<input type='text' id='box04' " + genMathCode;
							break;
						case "05":
							$boxNumber05Code = "<input type='text' id='box05' " + genMathCode;
							break;
						case "06":
							$boxNumber06Code = "<input type='text' id='box06' " + genMathCode;
							break;
						case "07":
							$boxNumber07Code = "<input type='text' id='box07' " + genMathCode;
							break;
					}
				}
			}	
		}
	});
	
	/** 문제 이미지 불러오기 */
	$('#load-img').click(function() {
		if($('#image-src').val() == "") {
			alertify.delay(2000).error("문제 번호를 입력하세요.");
		} else {
			loadImage($('#image-src').val());
		}
	});
	
	/** 문제 데이터 저장하기 */
	$('#save-content').click(function() {
		var indexCount = 0;
		for(var i = 1; i <= totalBoxNumber; i++) {
			(function() {
				var idx = i;
				if($('.text-boxnumber-0' + idx).find('.input-answer').val() != '') {
					indexCount += 1;
				}
			})();
		}
		if(indexCount == totalBoxNumber) {
			saveContents();
		} else {
			alertify.delay(2000).error("입력하지 않은 정답이 있습니다.");
		}
		 
		/* 필요한 데이터
		 * 문제 번호(언더바 제거), 박스 개수, 박스 크기, 박스 위치, 정답 값
		 * 각 타입별 코드(학교, 학년 .. )
		 * */
		// 박스 개수 totalBoxNumber
	});
	
	/** 문제 데이터 불러오기 */
	$('#load-content').click(function() {
		loadList();
	});
	
	/** 오류 문제 데이터 불러오기 */
	$('#load-wcontent').click(function() {
		loadWrongQuizList();
	});
	
	/** 전체 박스 위치 초기화 */
	$('#reset-content').click(function() {
		resetAllBox();
	});
	
	/** 직접 입력 눌렀을 때 */
	$('.gen-box-btn').click(function() {
		var w = $(this).parent().children(".gen-box-w").val();
		var h = $(this).parent().children(".gen-box-h").val();
		if(w > 150) {
			$(this).parent().children(".gen-box-w").val('150');
			w = 125;
			alertify.delay(1000).error("150px까지만 가능합니다.");
		}
		if(w != '' && h != '') {
			$(this).parents('div[class^=text-boxnumber]')
						 .find('.box-type-gen')
						 .animate({width:w, height:h}, 400, 'easeOutCubic');
		}
		
	});
	
	$('div[class^=box-type]').click(function() {
		var thisWidth = $(this).width();
		var thisHeight = $(this).height();
		$(this).parent().find('.gen-box-w').val(thisWidth);
		$(this).parent().find('.gen-box-h').val(thisHeight);
		$(this).parent().find('.box-type-gen').animate({
			width:thisWidth, height:thisHeight
		}, 400, 'easeOutCubic');
	});
	
	/** 라디오 박스 체크 이벤트 */
	$('input:radio[name^=boxNumber]').on('ifChecked', function() {
		totalBoxNumber = $('input:radio[name^=boxNumber]:checked').val(); 
		controlDiv();
	});
	
	/** 클립보드에 복사하기 */
	var clipboard = new Clipboard('.copy-text', {
		text : function() {
			return '√';
		}
	});
	clipboard.on('success', function(e) {
		alertify.delay(2000).success("복사되었습니다.");
	});
	clipboard.on('error', function(e) {
		alertify.delay(2000).error("복사 실패.");
	});
	
	/** 문제 번호 텍스트 삭제(초기화) */
	$('.reset-text').click(function() {
		$('#image-src').val('');
	});
	
	/** 문제 오류 신고하기 */
	$('.bookmark-text').click(function() {
		alertify.confirm("오류 문제로 등록하시겠습니까?", function() {
			insertWrongQuiz($('#image-src').val().substr(0, 12));
		}, function() {
			alertify.delay(2000).log("취소되었습니다.");
		});
	});
	
	/** 픽셀 이동 */
	$('#pixer-mover button').click(function() {
		var curObj = $('.text-boxnumber-' + arrowNumber + ' > .box-type-gen');
		if(arrowNumber != 0) {
			switch($(this).attr('data-way')) {
			case "top":
				curObj.offset({top:curObj.offset().top - 1});
				break;
			case "left":
				curObj.offset({left:curObj.offset().left - 1});
				break;
			case "right":
				curObj.offset({left:curObj.offset().left + 1});
				break;
			case "bottom":
				curObj.offset({top:curObj.offset().top + 1});
				break;
			}
		}
		pixelMove(curObj.offset().top, curObj.offset().left, curObj.width(), 
																									curObj.height(), arrowNumber);
		
	});
	
}());

/** 개별 함수 선언 */
/* 초기화 */
function init(memberNo, name) {
  $('#current-id').text(name);
  $('#current-id').attr('data-id', memberNo);
  $('#area-header').css('display', 'block');
  $('#content-quiz').css('display', 'block');
  
  $('.logout-button').click(function(event) {
  	event.preventDefault();
  	logout();
  });
}

/* 불러오기 */
function loadList() {
	var topPosition = (screen.height - 580) / 2;
	var leftPosition = (screen.width - 482) / 2;
	var popupUrl = "load_list.html";
	var popupOption = "width=482, height=580" +
										", top=" + topPosition + ", left=" + leftPosition +
										", resizable=no, scrollbars=yes, status=no;";
	
	window.open(popupUrl, "", popupOption);
}


/* 로그아웃 */
function logout() {
	$.getJSON('/auth/logout.do', function(result) {
		if(result.data == 'success') {
			alertify.confirm("로그아웃 하시겠습니까?", function() {
				location.replace("../index.html");
			}, function() {
				alertify.delay(2000).log("취소되었습니다");
			});
		} else {
			alertify.delay(2000).error("로그아웃 실패. 관리자에게 문의.");
		}
	});
}

/* 수정하기 기능 - 문제 번호 클릭 시 화면에 로드 */
function openerController(no) {
	updateQNumber = no;
	var loadedBoxNumber = $('#loaded-content > img').attr('data-boxnum');
	$('input:radio[value=' + loadedBoxNumber +']').iCheck('check');
	
	for(var i = 1; i <= loadedBoxNumber; i++) {
		(function() {
			var j = i,
					obj = $('#box0' + j);
//					objType = $('#box0' + j).attr('data-type');
			
//			if(objType == 0) { // 직접 입력으로 만든 네모
			$('.text-boxnumber-0' + j + ' > .box-type-gen')
						.width(obj.attr('data-width')).height(obj.attr('data-height'))
						.offset({
							top:obj.attr('data-top') * 1 + $('#content-src').position().top,
							left:obj.attr('data-left') * 1 + $('#content-src').position().left
						});
			
			$('.text-boxnumber-0' + j + ' .input-answer').val(obj.attr('data-answer'));
			
		})();
	}
	
	$('#update-content').click(function() {
		alertify.confirm("수정하시겠습니까?", function() {
			updateReady(loadedBoxNumber);
		}, function() {
			alertify.delay(2000).log("취소되었습니다");
		});
	});
	
}

function updateReady(number) {
	var updateImgTag = "<img src='../quiz_images/" + $('#image-src').val() + 
										 ".png' data-boxNum='" + totalBoxNumber + "'>\n"; // 이미지 주소
	
	$('div[class^=text-boxnumber]').each(function(index) {
		if(index < number) {
			var uPositionTop = $(this).children('.box-type-gen').position().top 
																							- $('#content-src').position().top;
			var uPositionLeft = $(this).children('.box-type-gen').position().left 
																						 - $('#content-src').position().left;
			var uWidth = $(this).children('.box-type-gen').width();
			var uHeight = $(this).children('.box-type-gen').height();
		
			var updateCode = "data-top='" + uPositionTop + "' " +
											 "data-left='" + Math.round(uPositionLeft) + "' " +
											 "data-width='" + uWidth + "' " +
											 "data-height='" + uHeight + "' " +
//											 "data-type='" + boxObj + "' " +
											 "data-answer='" + $(this).find('.input-answer').val() + "'>\n";
			
			if(index == 0) {
				$boxNumber01Code = "<input type='text' id='box01' " + updateCode;
				
			} else if(index == 1) {
				$boxNumber02Code = "<input type='text' id='box02' " + updateCode;
				
			} else if(index == 2) {
				$boxNumber03Code = "<input type='text' id='box03' " + updateCode;
				
			} else if(index == 3) {
				$boxNumber04Code = "<input type='text' id='box04' " + updateCode;
				
			} else if(index == 4) {
				$boxNumber05Code = "<input type='text' id='box05' " + updateCode;
				
			} else if(index == 5) {
				$boxNumber06Code = "<input type='text' id='box06' " + updateCode;
				
			} else if(index == 6) {
				$boxNumber07Code = "<input type='text' id='box07' " + updateCode;
				
			}
			
		}
	});
	
	var finalUpdateCode = updateImgTag + $boxNumber01Code + $boxNumber02Code +
												$boxNumber03Code + $boxNumber04Code + $boxNumber05Code +
												$boxNumber06Code + $boxNumber07Code + ANSWERCODE;
	
	console.log(finalUpdateCode);
	updateContents(number, finalUpdateCode);
	
}

/* update */
function updateContents(boxNumber, content) {
	$.ajax('/mathdata/update.do', 
	{
		method: 'POST',
		dataType: 'json',
		data: {
			no: updateQNumber,
			boxNumber: boxNumber,
			content: content
		}, success: function(result) {
			alertify.delay(2000).success("저장되었습니다.");
			location.reload();
		}
	});
}

/* 콘텐츠 초기화 */
function resetAllBox() {
	arrowNumber = 0;
	$('div[class^=box-type]').animate({top:0, left:0}, 600, 'easeOutCubic');
	$('.gen-box-w').val('');
	$('.gen-box-h').val('');
	$('.input-answer').val('');
	$('#preview-phone > div').not('#pixer-mover').empty();
//	$('#image-src').val('');
	$('#update-content').css('display', 'none');
	$('#save-content').css('display', 'inline');
	$('#image-src').prop('disabled', false);
	$('#load-img').css('display', 'inline-block');
	$('#validate-code').text('');
	$('input:radio[name=boxNumber][value=1]').iCheck('check');
	$boxNumber01Code = $boxNumber02Code = $boxNumber03Code 
									 = $boxNumber04Code = $boxNumber05Code = arrowNumber = "";
};

/* 문제 번호 유효성 검사 */
function checkQNumber(source) {
	var checkNum = source + "_00";
	checkNum = checkNum.replace(/_/gi, "");
	
	$.getJSON('/mathdata/checkQNumber.do?no=' + checkNum, function(result) {
		if(result.data == 'yes') {
			$('#validate-code').text("입력 가능한 문제입니다.");
			$('#validate-code').css('color', 'green');
			$('#save-content').prop('disabled', false)
												.css('cursor', 'pointer');
		} else {
			$('#validate-code').text("이미 입력된 문제입니다.");
			$('#validate-code').css('color', 'red');
			$('#save-content').prop('disabled', true)
												.css('cursor', 'default');
		}
	});
	
}

/* 픽셀 이동 */
function pixelMove(top, left, width, height, bNum) {
	var pixelMoveTop = Math.round(top - $('#content-src').position().top);
	var pixelMoveLeft = Math.round(left - $('#content-src').position().left);
	
	switch(bNum) {
	case "01":
		$('#hidden-content').empty();
		$('#hidden-content').append($boxNumber01Code);
		$('#box01').attr('data-top', pixelMoveTop).attr('data-left', pixelMoveLeft)
							 .attr('data-width', width).attr('data-height', height);
		$boxNumber01Code = "" + $('#hidden-content').html();
		$('#hidden-content').empty();
		break;
	case "02":
		$('#hidden-content').empty();
		$('#hidden-content').append($boxNumber02Code);
		$('#box02').attr('data-top', pixelMoveTop).attr('data-left', pixelMoveLeft)
							 .attr('data-width', width).attr('data-height', height);
		$boxNumber02Code = "" + $('#hidden-content').html();
		$('#hidden-content').empty();
		break;
	case "03":
		$('#hidden-content').empty();
		$('#hidden-content').append($boxNumber03Code);
		$('#box03').attr('data-top', pixelMoveTop).attr('data-left', pixelMoveLeft)
							 .attr('data-width', width).attr('data-height', height);
		$boxNumber03Code = "" + $('#hidden-content').html();
		$('#hidden-content').empty();
		break;
	case "04":
		$('#hidden-content').empty();
		$('#hidden-content').append($boxNumber04Code);
		$('#box04').attr('data-top', pixelMoveTop).attr('data-left', pixelMoveLeft)
							 .attr('data-width', width).attr('data-height', height);
		$boxNumber04Code = "" + $('#hidden-content').html();
		$('#hidden-content').empty();
		break;
	case "05":
		$('#hidden-content').empty();
		$('#hidden-content').append($boxNumber05Code);
		$('#box05').attr('data-top', pixelMoveTop).attr('data-left', pixelMoveLeft)
							 .attr('data-width', width).attr('data-height', height);
		$boxNumber05Code = "" + $('#hidden-content').html();
		$('#hidden-content').empty();
		break;
	case "06":
		$('#hidden-content').empty();
		$('#hidden-content').append($boxNumber06Code);
		$('#box06').attr('data-top', pixelMoveTop).attr('data-left', pixelMoveLeft)
							 .attr('data-width', width).attr('data-height', height);
		$boxNumber06Code = "" + $('#hidden-content').html();
		$('#hidden-content').empty();
		break;
	case "07":
		$('#hidden-content').empty();
		$('#hidden-content').append($boxNumber07Code);
		$('#box07').attr('data-top', pixelMoveTop).attr('data-left', pixelMoveLeft)
							 .attr('data-width', width).attr('data-height', height);
		$boxNumber07Code = "" + $('#hidden-content').html();
		$('#hidden-content').empty();
		break;
	}
	
}

/* 오류 문제 저장하기 */
function insertWrongQuiz(num) {
	$.getJSON('/wrongdata/insertWrongQuiz.do', 
	{
		mno: $('#current-id').attr('data-id'),
		qno: num	
		}, function(result) {
			if(result.data == 'success') {
				alertify.delay(2000).success("저장되었습니다.");
			} else if(result.data == 'no'){
				alertify.delay(2000).error("이미 저장되어있는 문제입니다.");
			} else {
				alertify.delay(2000).error("저장 실패, 관리자에게 문의.");
			}
	});
}

/* 오류 문제 불러오기 */
function loadWrongQuizList() {
	var topPosition = (screen.height - 580) / 2;
	var leftPosition = (screen.width - 394) / 2;
	var popupUrl = "load_wrong_list.html";
	var popupOption = "width=394, height=580" +
										", top=" + topPosition + ", left=" + leftPosition +
										", resizable=no, scrollbars=yes, status=no;";
	
	window.open(popupUrl, "", popupOption);
}

