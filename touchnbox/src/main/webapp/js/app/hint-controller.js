$(document).ready(function() {
	
	$('article').not('.non-click').click(function() {
		var gradeCode = $(this).attr('data-chap').substr(0, 3);
		var termCode = $(this).attr('data-chap').substring(3);
		
		if($(this).hasClass('not-ready')) {
//			window.bookcase.notReady();
			console.log("Not Ready");
		} else {
			console.log("제목 : " + $(this).text());
			console.log("코드 : " + gradeCode + ", " + termCode);
			window.bookcase.getHintContentInfo($(this).text(), gradeCode, termCode);
		}
		
	});
	
});	
