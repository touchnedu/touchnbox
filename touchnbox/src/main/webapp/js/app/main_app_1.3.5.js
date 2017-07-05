const E_SCHOOL = "1", M_SCHOOL = "2", H_SCHOOL = "3";

$(function() {
	var demo1 = $("#top_banner").slippry({
		// transition: 'fade',
		// useCSS: true,
		// speed: 1000,
		// pause: 3000,
		// auto: true,
		// preload: 'visible',
		// autoHover: false
	});
	
	$(".tab_content").hide();
	$(".tab_content:first").show();

	$("ul.tabs li").click(function() {
		$("ul.tabs li").removeClass("active");
		//$(this).addClass("active").css({"color": "darkred","font-weight": "bolder"});
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
	
	$('.kakao-data').click(function(event) {
		event.preventDefault();
		var checkData = $(this).children('img').attr('src').substr(7, 2);
		if(checkData == "no") 
			window.bookcase.notReadyContent();
		else 
			loadKakaoPage($(this).children('img').attr('src').substr(13, 5));
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
	
	loadSheet();
	
});

function loadKakaoPage(grade) {
	switch(grade) {
	case 'e_4_1':
		location.href = 'http://page.kakao.com/home/49629708';
		break;
	case 'e_4_2':
		break;
	case 'e_5_1':
		location.href = 'http://page.kakao.com/home/49629799';
		break;
	case 'e_5_2':
		break;
	case 'e_6_1':
		location.href = 'http://page.kakao.com/link/49629838';
		break;
	case 'e_6_2':
		break;
	case 'm_1_1':
		location.href = 'http://page.kakao.com/home/49629839';
		break;
	case 'm_1_2':
		break;
	case 'm_2_1':
		location.href = 'http://page.kakao.com/home/49629840';
		break;
	case 'm_2_2':
		break;
	case 'm_3_1':
		location.href = 'http://page.kakao.com/home/49629841';
		break;
	case 'm_3_2':
		break;
	}
	
}

function loadSheet() {
	var dataId = "1KNZp0K56oZGtBxUlIXh_C2UT8USBuzmwqHWbTAL4LlY";
	var convertUrl = "https://spreadsheets.google.com/feeds/list/" 
									 + dataId 
									 + "/od6/public/values?alt=json-in-script&gid=0&callback=?";
	
	var downloadNumber = 0; 
	var formatNumber = "";
	$.getJSON(convertUrl, function(result) {
		var data = result.feed.entry;
		
		for(var i in data) {
			downloadNumber = (data[0].content.$t).substring(8);
		}
		downloadNumber = calculateNumber(downloadNumber);
		formatNumber = downloadNumber.substr(0, 1) + ":" +
									 downloadNumber.substr(1, 1) + 
									 downloadNumber.substr(2, 1) + ":" +
									 downloadNumber.substr(3, 1) +
									 downloadNumber.substr(4, 1) + ":" +
									 downloadNumber.substr(5, 1) +
									 downloadNumber.substr(6, 1);
		
		$('.digits > div').each(function(i) {
			if(i == 0) {
				$(this).css('background-image', 'url("img/digit_0.png"' + ')')
				 			 .css('background-size', 'cover');
			} else {
				$(this).css('background-image', 'url("img/digit_' + downloadNumber.substr(i - 1, 1) + '.png"' + ')')
							 .css('background-size', 'cover');
			}
						 
			
		});
		
	});
	
	
  $('.digits').bind('click', function() {
  	location.href = "http://www.touchnedu.com/ir.html";
  });
  
}

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

function notReadyContent() {
	alert("준비중입니다.");
}

function readyHintContent(hintName) {
	var hint_src = "http://touchnbox.cafe24.com/chapter_hint_1_3_5/chapter_hint_";
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
	
	location.href = "chapter_1_3_5/chapter_" + htmlCode + ".html?schoolCode=" + schoolCode; 
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
		
	location.href = "chapter_ex_1_3_5/chapter_ex_" + htmlCode + ".html?schoolCode=" + schoolCode;
}