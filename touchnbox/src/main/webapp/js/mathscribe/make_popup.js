var makeCode = "";
function makePopup() {
	
  $('#content-preview').click(function(event) {
  	makeCode = $('#view-content > textarea').val();
//  	$('#makeQuestionArea').text(makeCode);
  	
  	var getBoxNumber = $('#boxCode').val(),
  	getTypeNumber = $('#typeCode').val();
  	
  	solve(getBoxNumber, getTypeNumber);
  	
  	var popupUrl = "math_popup.html";
  	var popupOption = "width=360, height=640, resizable=no, scrollbars=no, status=no;";
  	window.open(popupUrl, "", popupOption);
  	
  });

}

function generatePopup() {
	console.log("generate Popup");
	console.log("makecode : " + makeCode);
}


/** */
function solve(boxNumber, typeNumber) {
	
	var topOffset = 0,
			leftOffset = 1;
	
	// 전역 변수
			setOffsetX = 0;
			setOffsetY = 0;
			
			totalBoxNumber = boxNumber;
			currentBoxNumber = 1;
	
	$(window).load(function() {
		if(typeNumber == 2) {
			topOffset = 5;
			leftOffset = 4;
			setOffsetX = 3;
			setOffsetY = 3;
		} else if(typeNumber == 3) {
			setOffsetX = -2;
			topOffset = 4;
		}
		
		$('#solve01').css('width', fixedSizeX($('#qPosition01').width()) + 3)
						 		 .css('height', fixedSizeY($('#qPosition01').height()) - 6)
							 	 .css("top", $('#qPosition01').offset().top - topOffset)
								 .css("left", $('#qPosition01').offset().left - leftOffset)
								 .css('display', 'inline');
		
		if(boxNumber > 1) {
			for(var i = 2; i <= boxNumber; i++) {
				if($('#qPosition0' + i).text() != null && $('#qPosition0' + i).text() != "") {
					$('#solve0' + i).css('width', fixedSizeX($('#qPosition0' + i).width()) + 3)
			 		 								.css('height', fixedSizeY($('#qPosition0' + i).height()) - 6)
			 		 								.css("top", $('#qPosition0' + i).offset().top - topOffset)
			 		 								.css("left", $('#qPosition0' + i).offset().left - leftOffset);
					$('#solve0' + i).css('display', 'inline-block');
					
				} else {
					break;
				}
			}
		}

		if(underline > 0) {
			for(var i = 1; i <= underline; i++) {
				if($('#underline-0' + i).attr('attr') != null) {
					$('#underline-0' + i).css('top', $('#bracket0' + i).offset().top + 24)
															 .css('left', $('#bracket0' + i).offset().left + 1);
				}
			}
		}
		
		console.log("좌표 : " + $('#qPosition0' + boxNumber).offset());
		console.log("boxNumber : " + boxNumber);
		$('#answer-ring').css('top', $('#qPosition0' + boxNumber).offset().top - 15)
		 								 .css('left', $('#qPosition0' + boxNumber).offset().left - 30);
		
		animateFinalAnswer();
		
//		window.android.setAnswer($('#qPosition01').attr('ans'));
//		window.android.setScale($('#qPosition01').width(), 
//														$('#qPosition01').height());
//		window.android.setPosition($('#qPosition01').offset().left - setOffsetX, 
//															 $('#qPosition01').offset().top - setOffsetY);
		
	});
	
}
function animateFinalAnswer() {
	for(var i = 1; i < 9; i++) {
		(function() {
			var idx = i;
			setTimeout(function() {
				$('#answer-ring > img').attr('src', 'img/answer_ring_0' + idx + '.png');
				
			}, i * 30);
			
		})();
	}
}

function fixedSizeX(width) {
//	if(width < 15) {
//		width = 18;
//	} else if(width < 24 && width > 14) {
//		width = 26;
//	} else {
//		width = width + 4;
//	}
	width = width + 4;
	return width;
}

function fixedSizeY(height) {
	if(height < 30) {
		height = 28;
	} else if(height > 30 && height < 55) {
		height = 56;
	}
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
		
//		window.android.setAnswer($('#qPosition0' + intId).attr('ans'));
//		window.android.setScale($('#qPosition0' + intId).width(), 
//														$('#qPosition0' + intId).height());
//		window.android.setPosition($('#qPosition0' + intId).offset().left - setOffsetX, 
//															 $('#qPosition0' + intId).offset().top - setOffsetY);
		
	} else {
		window.android.finishQuiz();
		intId = 0;
		
	}
}
function incorrectAnswer(id) {
	$('#solve' + id).addClass('shake');
	setTimeout(function () {
		$('#solve' + id).removeClass('shake');
	}, 1000);
}
function viewSolution() {
	for(var i = currentBoxNumber; i < totalBoxNumber; i++) {
			$('#solve0' + i).css('display', 'none');
	}
}
