(function() {
	
	var quizNumber = 1;
//	var quizSrc01 = "../mathdata/sample0"; // 문제
//	var quizSrc01 = "../mathdata/sample_a_"; // 중학교 정답
	var quizSrc01 = "../mathdata/solution/sample_"; // ? 정답
	var quizSrc02 = ".png";
	var maxNumber = 13;
	
	if(quizNumber < 10) {
		$('#quiz-area > img').attr('src', quizSrc01 + "0" + quizNumber + quizSrc02);
	} else {
		$('#quiz-area > img').attr('src', quizSrc01 + quizNumber + quizSrc02);
	}

	$('#prevQuiz').click(function() {
		if(quizNumber > 1) {
			quizNumber--;
			console.log(quizNumber);
			if(quizNumber < 10) {
				$('#quiz-area > img').attr('src', quizSrc01 + "0" + quizNumber + quizSrc02);
			} else {
				$('#quiz-area > img').attr('src', quizSrc01 + quizNumber + quizSrc02);
			}
		} else {
			quizNumber = "0" + 1;
		}
	});
	
	$('#nextQuiz').click(function() {
		if(quizNumber < maxNumber) {
			quizNumber++;
			if(quizNumber < 10) {
				$('#quiz-area > img').attr('src', quizSrc01 + "0" + quizNumber + quizSrc02);
			} else {
				$('#quiz-area > img').attr('src', quizSrc01 + quizNumber + quizSrc02);
			}
		} else {
			quizNumber = maxNumber;
		}
	});
	
}());

