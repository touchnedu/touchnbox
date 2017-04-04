var curId = $(opener.document).find('#current-id').attr('data-id') * 1;
var curPageNo = 1;
var defaultPageSize = 15;
(function () {
	
	$('#first-page').click(function(event) {
		event.preventDefault();
		viewList();
	});
	$('#prevPage').click(function(event) {
		event.preventDefault();
		viewList(curPageNo - 1, defaultPageSize);
	});
	$('#nextPage').click(function(event) {
		event.preventDefault();
		viewList(curPageNo + 1, defaultPageSize);
	});
	
	viewList(1, 15);
	
}());

function viewList(pageNo, pageSize) {
	$.getJSON('/wrongdata/listWrongQuiz.do', 
	{
			pageNo: pageNo,
			pageSize: pageSize
		}, function(result) {
			handlebarsFunc(result);
	});
}

/** handleBars 템플릿 적용 */
function handlebarsFunc(result) {
	$('.data-row').remove();
  var source = $('#template_list').html();
  var template = Handlebars.compile(source);
  var content = template(result);
  $('#view-content-table tbody').html(content);
  $('#span-pageNo').text(result.pageNo);
  
  curPageNo = result.pageNo;
  
  /* 페이징 기능 */
  if(result.pageNo > 1) {
  	$('#prevPage img').css('display', 'inline-block');
  	$('#h-prevBtn').css('display', 'none');
  } else {
  	$('#prevPage img').css('display', 'none');
  	$('#h-prevBtn').css('display', 'inline-block');
  }
  
  if(result.isNextPage) {
  	$('#nextPage img').css('display', 'inline-block');
  	$('#h-nextBtn').css('display', 'none');
  } else {
  	$('#nextPage img').css('display', 'none');
  	$('#h-nextBtn').css('display', 'inline-block');
  }
  /* 페이징 기능 */
  
  // 템플릿이 뿌려준 후에 클릭이벤트 등록을 해야 함.
	$('.complete-wquiz').click(function(event) {
		event.preventDefault();
		var delNo = $(this).attr('data-wno');
		alertify.confirm("삭제하시겠습니까?", function() {
			deleteWrongQuiz(delNo);
		}, function() {
			alertify.delay(2000).log("취소되었습니다.");
		});
	});
	
}

/** 오류 문제 삭제하기 */
function deleteWrongQuiz(no) {
	$.getJSON('/wrongdata/deleteWrongQuiz.do?no=' + no, function(result) {
		if(result.data == 'success') {
			alertify.delay(2000).success("삭제되었습니다.");
			location.reload();
		} else {
			alertify.delay(2000).error("삭제 실패. 관리자에게 문의.");
		}
	});
}

