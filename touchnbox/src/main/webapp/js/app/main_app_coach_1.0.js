const E_SCHOOL = "1", M_SCHOOL = "2", H_SCHOOL = "3";

$(function() {
	var demo1 = $("#top_banner").slippry();
	
	$(".tab_content").hide();
	$(".tab_content:first").show();

	$("ul.tabs li").not('.h-school').click(function() {
		$("ul.tabs li").removeClass("active");
		$(this).addClass("active");
		$(".tab_content").hide()
		var activeTab = $(this).attr("rel");
		$("#" + activeTab).fadeIn();
	});
	
	$('.book-data').click(function(event) {
		event.preventDefault();
		var checkStr = $(this).children('img').attr('src').substr(7, 2);
		var title = $('.active').text() + " " + $(this).parent().find('.grade-text').text();
		if(checkStr == "no") {
			window.bookcase.notReadyContent();
		} else {
			var checkStrSplit = $(this).children('img').attr('src').substr(18, 5).split('_');
			checkStr = "";
			for(var i in checkStrSplit) {
				checkStr += checkStrSplit[i];
			}
			readyContent(checkStr, $(this).children('img').attr('src').substr(18, 5));
			window.bookcase.setChapterTitle(title);
		}
	});
	
	$('.hint-data').click(function(event) {
		event.preventDefault();
		if($(this).attr('data-ready') == "ok") {
			readyHintContent($(this).children('img').attr('src').substr(20, 3));
			window.bookcase.setChapterTitle($(this).attr("data-title"));
		} else {
			window.bookcase.notReadyContent();
		}
	});
	
	$('.test-data').click(function(event) {
		event.preventDefault();
		var checkData = $(this).children('img').attr('src').substr(7, 2);
		var title = $('.active').text() + " " + $(this).parent().find('.grade-text').text();
		if(checkData == "no") 
			window.bookcase.notReadyContent();
		else {
			var checkStrSplitEx = $(this).children('img').attr('src').substr(23, 5).split('_');
			checkData = "";
			for(var i in checkStrSplitEx) {
				checkData += checkStrSplitEx[i];
			}
			readyExContent(checkData, $(this).children('img').attr('src').substr(23, 5));
			window.bookcase.setChapterTitle(title);
		}
	});
	
});


function calculateNumber(number) {
	if((number * 1) > 999999) {
		return number;
	} else if((number * 1) < 1000000 && (number * 1) > 99999) {
		return "0" + number;
	} else if((number * 1) < 100000 && (number * 1) > 9999) {
		return "00" + number;
	} else if((number * 1) < 10000 && (number * 1) > 999) {
		return "000" + number;
	} else if((number * 1) < 1000 && (number * 1) > 99) {
		return "0000" + number;
	} else if((number * 1) < 100 && (number * 1) > 9) {
		return "00000" + number;
	} else {
		return "000000" + number;
	}
}

function readyHintContent(hintName) {
	var hint_src = "http://touchnbox.cafe24.com/chapter_hint_coach/chapter_hint_";
	var html_src = ".html";
	location.href = hint_src + hintName + html_src;
}

function readyContent(chapCode, htmlCode) {
	var schoolCode = chapCode.substr(0, 1);
	
	switch(schoolCode) {
	case "e":
		schoolCode = E_SCHOOL + chapCode.substr(1, 2);
		break;
	case "m":
		schoolCode = M_SCHOOL + chapCode.substr(1, 2);
		break;
	case "h":
		schoolCode = H_SCHOOL + chapCode.substr(1, 2);
		break;
	}
	
	location.href = "chapter_coach/chapter_" + htmlCode + ".html?schoolCode=" + schoolCode; 
}

function readyExContent(chapCode, htmlCode) {
	var schoolCode = chapCode.substr(0, 1);
	switch(schoolCode) {
	case "e":
		schoolCode = E_SCHOOL + chapCode.substr(1, 2);
		break;
	case "m":
		schoolCode = M_SCHOOL + chapCode.substr(1, 2);
		break;
	case "h":
		schoolCode = H_SCHOOL + chapCode.substr(1, 2);
		break;
	}
		
	location.href = "chapter_ex_coach/chapter_ex_" + htmlCode + ".html?schoolCode=" + schoolCode;
}
