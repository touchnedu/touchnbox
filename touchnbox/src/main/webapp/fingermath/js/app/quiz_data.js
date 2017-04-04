var isNext = false;
var allQuizCode = "";
var chapNumber = "";
var quizNumber = "";
var quizNumberBack = "00";
var androidVersion;
$(document).ready(function() {
	$('#prevQuiz').click(function() {
		prevQuiz(quizNumberF);
	});
	
	$('#nextQuiz').click(function() {
		nextQuiz(chapNumber, quizNumberF);
	});

});	

function setVersion(version) {
	androidVersion = version * 1;
}

function loadQuiz(quizCode) {
	allQuizCode = quizCode;
	chapNumber = quizCode.substr(0, 7);
	quizNumber = quizCode.substr(7, 3);
	
	var interpolatedOffset = 0;
	if(androidVersion < 21) {
		interpolatedOffset = 2;
	}
	
	$('#data-area').empty();
	$.getJSON('/mathdata/load.do?no=' + quizCode, function(result) {
		if(result.data != '' && result.data != null) {
			$('#math-data-area').append(result.data);
			$('img').css('width', '320px');
			
			$('input[id^=box]').each(function(i) {
				$(this).offset({
					top:($(this).attr('data-top') * 1) + interpolatedOffset,
					left:($(this).attr('data-left') * 1) + interpolatedOffset
				}).css('width', $(this).attr('data-width'))
					.css('height', $(this).attr('data-height'));
				
				if(i == 0) {
					$(this).addClass('active-box');
				}
				
			});
		} else {
			$('#math-data-area').text("문제가 없습니다");
		}
		
		if(result.isNext) {
			isNext = true;
		} else {
			isNext = false;
		}
		window.android.setAnswer($('#box01').attr('data-answer'));
		sendQuizPositionInfo($('#box01').attr('data-top'), $('#box01').attr('data-left'),
												 $('#box01').width() + 12, $('#box01').height() + 12);
	});
	sendQuizInfo();
	
}

function sendQuizInfo() {
	window.android.setCurrentQuizNumber(quizNumber);
}

function sendQuizPositionInfo(top, left, width, height) {
	window.android.setScale(width, height);
	window.android.setPosition(top * 1, left * 1);
}

function isNextChapter(chapterCode) {
	var nextChapterNum = (chapterCode + 1) + "";
	var codeSrc = "../chapter_images/prv_" + nextChapterNum.substr(0, 3) + "_" 
																				 + nextChapterNum.substring(3) + ".png";
	var fullCode = location.protocol + "//" 
																	 + location.host + "/chapter_images/prv_"
																	 + nextChapterNum.substr(0, 3) + "_" 
																	 + nextChapterNum.substring(3) + ".png";
	$.ajax({
		url:codeSrc,
		type:'HEAD',
		error: function() {
			window.android.getIsNextChapter(false, "");
		},
		success: function() {
			window.android.getIsNextChapter(true, fullCode);
		}
	});
}

/** 이전 문제 */
function prevQuiz() {
	if((quizNumber * 1) > 1) {
		loadQuiz(chapNumber + calcNumber(quizNumber * 1 - 1) + quizNumberBack);
	} else {
		window.android.quizMessage("first");
	}
}

/** 다음 문제 */
function nextQuiz() {
	if(isNext) {
		loadQuiz(chapNumber + calcNumber(quizNumber * 1 + 1) + quizNumberBack);
	} else {
		window.android.quizMessage("last");
	}
	
}

/** string -> number 변환 */
function calcNumber(number) {
	var returnNumber = number * 1;
	if(returnNumber < 10) {
		returnNumber = "00" + returnNumber;
	} else if(number > 9 && number < 100) {
		returnNumber = "0" + returnNumber;
	} 
	
	return returnNumber;
}

/** 정답 */
function correctAnswer(id) {
	var intId; 
	intId = Number(id) + 1;
	
	$('#box0' + Number(id)).css('display', 'none');
	if($('#box0' + intId).length != 0) {
		$('#box0' + intId).addClass('active-box');
		window.android.setAnswer($('#box0' + intId).attr('data-answer'));
		sendQuizPositionInfo($('#box0' + intId).attr('data-top'), 
												 $('#box0' + intId).attr('data-left'),
												 $('#box0' + intId).width() + 12, 
												 $('#box0' + intId).height() + 12)
		
		window.android.rightSoundPlay();
		
	} else {
		animateFinalAnswer(Number(id));
		intId = 0;
		endQuiz();
		
	}
}

/** 오답 애니메이션 */
function incorrectAnswer(id) {
	$('#box0' + Number(id)).addClass('shake');
	setTimeout(function () {
		$('#box0' + Number(id)).removeClass('shake');
	}, 1000);
}

/** 최종답 애니메이션 */
function animateFinalAnswer(id) {
	var topPosition = $('#box0' + id).attr('data-top');
	var leftPosition = $('#box0' + id).attr('data-left');
	var width = $('#box0' + id).attr('data-width');
	var moveToRight = 0;
	console.log("left : " + leftPosition + ", width : " + width);
	if(leftPosition < 11 && width < 15) {
		moveToRight = 30;
	} else if(leftPosition > 10 && leftPosition < 35 && width < 13) {
		moveToRight = 24;
	} else if(leftPosition < 35 && width > 12 && width < 36) {
		moveToRight = 16;
	} else if(leftPosition < 20 && width > 40) {
		moveToRight = 25;
	} else if(leftPosition > 275) {
		moveToRight = - 15;
	} else {
		moveToRight = 0;
	}
	
	$('#answer-ring').offset({
		top: $('#box0' + id).attr('data-top') * 1 - 20 + ($('#box0' + id).attr('data-height') / 2),
		left: $('#box0' + id).attr('data-left') * 1 - 45 + ($('#box0' + id).attr('data-width') / 2) + moveToRight
	});
	$('#answer-ring').css('display', 'inline-block');
	
	for(var i = 1; i < 9; i++) {
		(function() {
			var idx = i;
			setTimeout(function() {
				$('#answer-ring > img').attr('src', 'img/answer_ring_0' + idx + '.png');
			}, i * 30 - 20);
		})();
	}
}

/** 문제 종료 */
function endQuiz() {
	window.android.finishQuiz();
}

/** 모범 답안 보기 */
function viewSolution() {
	var codeSrc = $('#math-data-area > img').attr('src').substr(0, 14) + "/sol/";
	var code = $('#math-data-area > img').attr('src').substr(15, 15) + "_a.png";

	$.ajax({
		url:codeSrc + code,
		type:'HEAD',
		error: function() {
			$('input[id^=box]').each(function(index) {
				$(this).removeClass('active-box');
			});
			$('input[id^=box]').css('animation-name', 'fadeout')
						           	 .css('-webkit-animation-name', 'fadeout')
						           	 .css('animation-duration', '1s')
						           	 .css('-webkit-animation-duration', '1s')
						           	 .css('border', 'none')
						           	 .css('background-color', 'transparent');
		},
		success: function() {
			/* 모범 답안 이미지 */
			var solTag = "<img src='" + codeSrc + code + "' style='width:320px;'>";
			$('#math-data-area').empty();
			$('#math-data-area').append(solTag);
		}
	});
	
	window.android.setBackEvent();
	
}
/* 1목적구가 단쿠션 1포인트 장쿠션 1.5포인트 내에 있고 수구가 1목적구와 예각이어야 된다.
 * 수구는 단쿠션에 너무 붙어있지만 않으면 됨
 * 무회전 절반 두께로 치면 수구와 1목적구의 일직선상 출발 위치로 돌아옴
 * (부드러운 테이블 중팁, 뻣뻣한 테이블 상단 1팁)
 * 3쿠션 지점에서 0.5포인트 멀어질수록 1팁씩 증가
 * 샷은 부드럽고 약하게 밀어치기
 * 1목적구가 1.5포인트를 벗어나면 0.5포인트당 1팁이 제자리로 돌아옴.
 * 수구과 1목적구의 거리가 멀수록 타격을 점점 강하게.
 * */
