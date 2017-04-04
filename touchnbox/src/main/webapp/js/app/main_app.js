const E_SCHOOL = "1", M_SCHOOL = "2", H_SCHOOL = "3";

$(function() {
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
	
	$('.sy-caption > a').click(function(e) {
		console.log("클릭");
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
	
  $(".digits").countdown({
  	image: "img/digits.png",
    format: "dd:hh:mm:ss",
    startTime: "99:99:99:99",
    start:false,
    continuous: false
  });
	
});

function notReadyContent() {
	alert("준비중입니다.");
}

function readyHintContent(hintName) {
	var hint_src = "http://touchnbox.cafe24.com/chapter_hint/chapter_hint_";
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
	default:
		break;
	}
	
	location.href ="chapter/chapter_" + htmlCode + ".html?schoolCode=" + schoolCode; 
}