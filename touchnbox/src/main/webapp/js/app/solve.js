function init(code) { // 앱에서 호출해야 함.
//	var code = 11513001200100;
	code *= 1;
	$('#quiz-text').remove();
	$('#questionArea').empty();
	
	$.getJSON('../math/load.do?code=' + code, function(result) {
		var title = "<span id='quiz-text'>" + result.data.title + "</span>";
		var content = result.data.content;
		
		$('.text-font').append(title);
		$('#questionArea').append(content);
	
		setTimeout(function() {
			parseMath();
		}, 15);
	});
	
}

function parseMath() {
	M.parseMath(document.body);
	setTimeout(function() {
		solve($('#boxCode').val(), $('#typeCode').val());
	}, 85);
}

function solve(boxNumber, typeNumber) {
	$('body').css('opacity', '1');
	var topOffset = -1,
			leftOffset = 1;
	
	// 전역 변수
	setOffsetX = 0;
	setOffsetY = 0;
	setWidthScale = 0;
	setHeightScale = 0;
	
	totalBoxNumber = boxNumber;
	currentBoxNumber = 1;
			
	if(typeNumber == 2) {
		topOffset = 6;
		leftOffset = 5;
		setOffsetX = 4;
		setOffsetY = 6;
	} else if(typeNumber == 3) {
//			setOffsetX = -2;
//			topOffset = 4;
//			topOffset = 8;
	} else if(typeNumber == 4) {
		topOffset = 6;
		leftOffset = 5;
		setOffsetX = 4;
		setOffsetY = 6;
		setWidthScale = 5;
		setHeightScale = 5;
	}
		
//		console.log("보정값 : " + $('.fm-mi-length-1').length);
		/* 문자형 변수가 들어갈 경우 분수의 위치가 어긋나는 것을 보정 */
	$('.fm-mi-length-1').parentsUntil($('.fm-frac'), 'table')
											.css('margin-bottom', '8px', '!important');
	/* ------------------------------------------------------- */
	
	$('#solve01').css('width', fixedSizeX($('#qPosition01').width()) + 3 - setWidthScale)
					 		 .css('height', fixedSizeY($('#qPosition01').height()) - 6 - setHeightScale)
						 	 .css("top", $('#qPosition01').offset().top - topOffset)
							 .css("left", $('#qPosition01').offset().left - leftOffset)
							 .css('display', 'inline-block');
	
	if(boxNumber > 1) {
		for(var i = 2; i <= boxNumber; i++) {
			if($('#qPosition0' + i).text() != null && $('#qPosition0' + i).text() != "") {
				$('#solve0' + i).css('width', fixedSizeX($('#qPosition0' + i).width()) + 3 - setWidthScale)
		 		 								//.css('height', fixedSizeY($('#qPosition0' + i).height()) - 6 - setHeightScale)
												.css('height', $('#qPosition0' + i).height())
		 		 								.css("top", $('#qPosition0' + i).offset().top - topOffset)
		 		 								.css("left", $('#qPosition0' + i).offset().left - leftOffset);
				$('#solve0' + i).css('display', 'inline-block');
				if(i == boxNumber) {
					$('#qPosition0' + i).css('color', '#696564');
				}
				
				console.log("높이값 " + i + ": " + $('#qPosition0' + i).height());
				
			} else {
				break;
			}
		}
	} else {
		$('#qPosition01').css('color', '#0000ff');
	}
	
	$('#answer-ring').css('top', $('#qPosition0' + boxNumber).offset().top - 25)
									 .css('left', $('#qPosition0' + boxNumber).offset().left - 30);
	
	var bodyArea = $('#questionArea').height();
	$('body').css('height', bodyArea);
	window.android.setAnswer($('#qPosition01').attr('ans'));
	window.android.setScale(fixedSizeX($('#qPosition01').width()), 
													fixedSizeY($('#qPosition01').height()));
	window.android.setPosition($('#qPosition01').offset().left - setOffsetX, 
														 $('#qPosition01').offset().top - setOffsetY);
		
	
}

function fixedSizeX(width) {
//	console.log("width: " + width);
	if(width < 19) {
		width = 18;
	} else if(width > 18 && width < 28) {
		width = 28;
	} else if(width > 27 && width < 40) {
		width = 38;
	} else if(width > 39) {
		width = 48;
	}
	return width;
}

function fixedSizeY(height) {
//	if(height <= 40 && height > 19) {
//		height = 29;
//	} else if(height > 40 && height < 60) {
//		height = 64;
//	} else if(height < 20) {
//		height = 18;
//	}
	return height;
}

function correctAnswer(id) {
	var intId; 
	intId = Number(id) + 1;
	++currentBoxNumber;
	
	$('#solve' + id).css('display', 'none');
	
	if($('#qPosition0' + intId).text() != null 
																	&& $('#qPosition0' + intId).text() != "") {
		
		$('#solve0' + intId).addClass('activebox');
		
		window.android.setAnswer($('#qPosition0' + intId).attr('ans'));
		window.android.setScale(fixedSizeX($('#qPosition0' + intId).width()), 
														fixedSizeY($('#qPosition0' + intId).height()));
		window.android.setPosition($('#qPosition0' + intId).offset().left - setOffsetX, 
															 $('#qPosition0' + intId).offset().top - setOffsetY);
		
		window.android.rightSoundPlay();
	} else {
		animateFinalAnswer();
		intId = 0;
		window.android.finishQuiz();
		
	}
}
function incorrectAnswer(id) {
	$('#solve' + id).addClass('shake');
	setTimeout(function () {
		$('#solve' + id).removeClass('shake');
	}, 1000);
}
function viewSolution() {
	for(var i = currentBoxNumber; i <= totalBoxNumber; i++) {
		$('#solve0' + i).removeClass('activebox');
	}
	$('input').css('animation-name', 'fadeout')
	          .css('-webkit-animation-name', 'fadeout')
	          .css('animation-duration', '1s')
	          .css('-webkit-animation-duration', '1s')
	          .css('border', 'none')
	          .css('background-color', 'transparent');
}
function animateFinalAnswer() {
	$('#answer-ring').css('display', 'inline-block');
	for(var i = 1; i < 9; i++) {
		(function() {
			var idx = i;
			setTimeout(function() {
				$('#answer-ring > img').attr('src', '../js/images/answer_ring_0' + idx + '.png');
			}, i * 30 - 20);
		})();
	}
}
