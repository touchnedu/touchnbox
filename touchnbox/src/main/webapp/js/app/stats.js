(function() {
	/* 오늘 날짜 구하기 */
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();
	
	if(dd < 10) 
		dd = "0" + dd;
	
	if(mm < 10)
		mm = "0" + mm;
	
	today = yyyy + "-" + mm + "-" + dd;
	/* -- */
	
	$('.dateInfo').text(today);
	getDayInfo(today);

	$.datepicker.setDefaults({
    prevText: '이전 달',
    nextText: '다음 달',
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    showMonthAfterYear: true,
    yearSuffix: '년'
});
	
	$('#datepicker').datepicker({
		dateFormat: "yy-mm-dd"
	});

	$('#getDayInfoBtn').click(function() {
		if($('#datepicker').val() == "")
			return;
		getDayInfo($('#datepicker').val());
	});
	
}());

function getDayInfo(today) {
	$.getJSON('/member/stats.do?today=' + today, function(result) {
		if(result.today_all == 0) {
			alert("조회된 데이터가 없습니다.");
			return;
		}
		
		$('#total-mem').text(result.total_mem);
		$('#today-all').text(result.today_all);
		$('.dateInfo').text(today);
		
		// 네이버로 가입
		$('#naversm').text(result.naversm);
		$('#naversf').text(result.naversf);
		$('#navercm').text(result.navercm);
		$('#navercf').text(result.navercf);
		
		$('#naver-total').text(result.naversm + result.naversf 
																						+ result.navercm + result.navercf);
		$('#naver-stu').text(result.naversm + result.naversf);
		$('#naver-etc').text(result.navercm + result.navercf);
		
		// 직접 가입
		$('#directsm').text(result.directsm);
		$('#directsf').text(result.directsf);
		$('#directcm').text(result.directcm);
		$('#directcf').text(result.directcf);
		
		$('#direct-total').text(result.directsm + result.directsf 
																					+ result.directcm + result.directcf);
		$('#direct-stu').text(result.directsm + result.directsf);
		$('#direct-etc').text(result.directcm + result.directcf);
		
		// 탈퇴 회원
		$('#total-quit-num').text(result.totalquitnum);
		$('#quit-num-total').text(result.quittodaytotal);
		$('#quit-num-today').text(result.quittoday);
		
	});
}
