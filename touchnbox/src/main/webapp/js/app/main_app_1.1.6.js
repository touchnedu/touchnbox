const E_SCHOOL = "1", M_SCHOOL = "2", H_SCHOOL = "3";

$(function() {
	var demo1 = $("#top_banner").slippry({});
	
	$(".tab_content").hide();
	$(".tab_content:first").show();

	$("ul.tabs li").click(function() {
		$("ul.tabs li").removeClass("active");
		$(this).addClass("active");
		$(".tab_content").hide()
		var activeTab = $(this).attr("rel");
		$("#" + activeTab).fadeIn();
	});
	
	$('.book-data').click(function(event) {
		event.preventDefault();
		alert('업데이트가 필요합니다.');
	});
	
	$('.hint-data').click(function(event) {
		event.preventDefault();
		alert('업데이트가 필요합니다.');
	});
	
	$('.kakao-data').click(function(event) {
		event.preventDefault();
		alert('업데이트가 필요합니다.');
	});
	
	$('.test-data').click(function(event) {
		event.preventDefault();
		alert('업데이트가 필요합니다.');
	});
	
	$('.update-btn').bind('click', function() {
		location.href = 'https://play.google.com/store/apps/details?id=com.touchnedu.gradea.studya.math&hl=ko';
	});
	
	$('.ok-btn').bind('click', function() {
		$('.open-plan').css('display', 'none');
	});
	
	loadSheet();
	
});

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
