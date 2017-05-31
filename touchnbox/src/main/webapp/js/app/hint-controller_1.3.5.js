$(document).ready(function() {
	
	getIsPremium();
	
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

function getIsPremium() {
	window.bookcase.getIsPremiumHint();
}
function setIsPremiumHint(what) {
	Premium.setPremium(what);
	setBasicHintChapter();
}
function setBasicHintChapter() {
	if(Premium.getPremium())
		return;
	$('div > article:not(.middle-title)').each(function(i) {
		if($(this).hasClass('free-hint')) {
			$(this).append("<div class='free-chapter'><img src='../images/free_icon.png'></div>");
			return true;
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
