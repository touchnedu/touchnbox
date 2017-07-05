$(document).ready(function() {
	var schoolCode = location.href.substr(location.href.lastIndexOf('=') + 1);
	var quizCode = "", value = "";

	if(window.currentQuizNum == "00000") {
		quizCode = "00100";
	} else {
		quizCode = window.currentQuizNum;
	}
	
	$('article').not('.non-click').click(function() {
		var allCode = schoolCode + $(this).attr('data-chap') + quizCode;
		if($(this).hasClass('not-ready')) 
			return;
		
		if(location.href.substr(36, 2) == "ex")
			window.bookcase.openExQuizActivity(allCode);
		else
			window.bookcase.openQuizActivity(allCode);
		
	});
	
});	
