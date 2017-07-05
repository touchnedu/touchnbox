$(document).ready(function() {
	
	$('article').not('.non-click').click(function() {
		var gradeCode = $(this).attr('data-chap').substr(0, 3);
		var termCode = $(this).attr('data-chap').substring(3);
		if($(this).hasClass('basic')) {
			window.bookcase.confirmPayment();
			return;
		}
		if($(this).hasClass('not-ready')) 
			console.log("Not Ready");
		else 
			window.bookcase.getHintContentInfo($(this).text(), gradeCode, termCode);
	});
});	
