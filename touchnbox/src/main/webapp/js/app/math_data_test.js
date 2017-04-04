var isNext = false;
var allQuizCode = "";
var chapNumber = "";
var quizNumber = "";
var quizNumberBack = "00";
$(document).ready(function() {
	
	$('#prevQuiz').click(function() {
		prevQuiz(quizNumberF);
	});
	
	$('#nextQuiz').click(function() {
		nextQuiz(chapNumber, quizNumberF);
	});
	loadQuiz(211320500600);
});	

function loadQuiz(quizCode) {
	
	console.log("번호 : " + quizCode);
//	allQuizCode = quizCode;
//	chapNumber = quizCode.substr(0, 7);
//	quizNumber = quizCode.substr(7, 3);
	
	var interpolatedOffset = 0;
	
//	if(androidVersion != "5") {
//		interpolatedOffset = 2;
//	}
	
	$('#math-data-area').empty();
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
		
	});
//	window.android.setCurrentQuizNumber(quizNumber);
	console.log("보내는 값 : " + quizNumber);
}

function prevQuiz() {
	if((quizNumber * 1) > 1) {
		loadQuiz(chapNumber + calcNumber(quizNumber * 1 - 1) + quizNumberBack);
	} else {
		window.android.quizMessage("first");
	}
}

function nextQuiz() {
	if(isNext) {
		loadQuiz(chapNumber + calcNumber(quizNumber * 1 + 1) + quizNumberBack);
	} else {
		window.android.quizMessage("last");
	}
	
}

function calcNumber(number) {
	var returnNumber = number * 1;
	if(returnNumber < 10) {
		returnNumber = "00" + returnNumber;
	} else if(number > 9 && number < 100) {
		returnNumber = "0" + returnNumber;
	} 
	
	return returnNumber;
}

/** 오답 애니메이션 */
function incorrectAnswer(id) {
	$('#box0' + id).addClass('shake');
	setTimeout(function () {
		$('#box0' + id).removeClass('shake');
	}, 1000);
}

/** 최종답 애니메이션 */
function animateFinalAnswer(id) {
	$('#answer-ring').css('display', 'inline-block');
	$('#answer-ring').offset({
										 top: $('#box0' + id).attr('data-top') * 1,
										 left: $('#box0' + id).attr('data-left') *
									 });
	for(var i = 1; i < 9; i++) {
		(function() {
			var idx = i;
			setTimeout(function() {
				$('#answer-ring > img').attr('src', 'img/answer_ring_0' + idx + '.png');
			}, i * 30 - 20);
		})();
	}
}

/** 모범 답안 보기 */
function viewSolution() {
	$('input[id^=box]').each(function(index) {
		$(this).removeClass('active-box');
	});
	$('input[id^=box]').css('animation-name', 'fadeout')
				           .css('-webkit-animation-name', 'fadeout')
				           .css('animation-duration', '1s')
				           .css('-webkit-animation-duration', '1s')
				           .css('border', 'none')
				           .css('background-color', 'transparent');
}
