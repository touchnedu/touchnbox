$(document).ready(function() {
	var schoolCode = location.href.substr(location.href.lastIndexOf('=') + 1);
	var quizCode = "", value = "";

	getIsPremium();
//	setBasicChapter();
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
		if($(this).hasClass('not-ready')) 
			return;
		
		if(location.href.substr(36, 2) == "ex")
			window.bookcase.openExQuizActivity(allCode);
		else
			window.bookcase.openQuizActivity(allCode);
		
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
	if(Premium.getPremium()) {
		$('.free-list').each(function(i) {
			$(this).css('display', 'none');
		});
		return;
	}
	$('div > article:not([data-accordion])').each(function(i) {
		// 초등학교일 경우(대단원이 1이고 중단원이 0일 경우 3챕터)
		// 중학교일 경우(대단원이 1이고 중단원이 1보다 클 경우 3챕터)
		var chapNo = $(this).attr('data-chap');
		if(chapNo.substr(1, 1) * 1 > 0) {
			// 중단원이 있을 경우(중등)
			if($(this).parent().hasClass('free-m')) {
				$(this).append("<div class='free-chapter'><img src='../images/free_icon.png'></div>");
				return true;
			}
			
		} else {
			// 중단원이 없을 경우(초등)
			if(chapNo.substr(0, 1) === '1' || chapNo.substr(0, 1) === '4' || chapNo.substr(0, 1) === '6') {
				$(this).append("<div class='free-chapter'><img src='../images/free_icon.png'></div>");
				return true;
			}
		}
		
		$(this).addClass('basic');
		$(this).append("<div class='free-chapter'><img src='../images/sub_icon.png'></div>");

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