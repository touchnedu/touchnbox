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
		if($(this).hasClass('not-ready')) {
//			window.bookcase.notReady();
			console.log("Not Ready");
		} else {
			window.bookcase.openQuizActivity(allCode);
		}
		
	});
	
});	

/*
function convertNumber(number) {
	var convertChapterNumber = "";
	switch(number) {
	case "1":
		convertChapterNumber = "Ⅰ";
		break;
	case "2":
		convertChapterNumber = "Ⅱ";
		break;
	case "3":
		convertChapterNumber = "Ⅲ";
		break;
	case "4":
		convertChapterNumber = "Ⅳ";
		break;
	case "5":
		convertChapterNumber = "Ⅴ";
		break;
	case "6":
		convertChapterNumber = "Ⅵ";
		break;
	}
	return convertChapterNumber;
}
*/