$(document).ready(function() {
	var schoolCode = location.href.substr(location.href.lastIndexOf('=') + 1);
	var quizCode = "", value = "";
	
//	getIsPremium();
	setBasicChapter();
	if(window.currentQuizNum == "00000") {
		quizCode = "00100";
	} else {
		quizCode = window.currentQuizNum;
	}
	
	$('article').not('.non-click').click(function() {
		var allCode = schoolCode + $(this).attr('data-chap') + quizCode;
		if($(this).hasClass('basic')) {
			window.bookcase.confirmPayment();
			return;
		}
		if($(this).hasClass('not-ready')) {
//			window.bookcase.notReady();
			console.log("Not Ready");
		} else {
			window.bookcase.openQuizActivity(allCode);
		}
		
	});
	
});	

function getIsPremium() {
	window.bookcase.getIsPremium();
}
function setIsPremium(what) {
	Premium.setPremium(what);
	setBasicChapter();
}

function setBasicChapter() {
	if(Premium.getPremium())
		return;
	$('div > article:not([data-accordion])').each(function(i) {
		if($(this).attr('data-chap').substr(2, 2) === '01' ||
				$(this).attr('data-chap').substr(2, 2) === '02' ||
														$(this).attr('data-chap').substr(2, 2) === '03') {
			$(this).append("<div class='free-chapter'><img src='../images/free_icon.png'></div>");
			
			if($(this).attr('data-chap').substr(2, 2) === '03')
				$(this).addClass('last-free');
			
			return true;
		}
		$(this).addClass('basic');
	});
}

var Premium = {
	isPremium:  false,
	getPremium: function() {
		return this.isPremium;
	},
	setPremium: function(property) {
		this.isPremium = property;
	}
}