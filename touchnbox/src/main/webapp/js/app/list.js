var curId = $(opener.document).find('#current-id').attr('data-id') * 1;
var curPageNo = 1;
var defaultPageSize = 15;
function initList() {
	$('#find-by-chapter').click(function(event) {
		var cCode = "1" + $('#load-by-chapter').val();
		cCode *= 1;
		findByChapter(cCode);
	});
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
}

function viewList(pageNo, pageSize) {
	$.getJSON('/math/list.do', 
	{
		no: curId,
		pageNo: pageNo,
		pageSize: pageSize
	}, function(result) {
		handlebarsFunc(result);
	});
}

function viewDetail(no) {
	$.getJSON('/math/detail.do?no=' + no, function(result) {
		$(opener.document).find('#ins-quizText').val(result.data.title);
		$(opener.document).find('#popupContent').val(result.data.content);
		$(opener.document).find('#update-code-1').val(result.data.school);
		$(opener.document).find('#update-code-2').val(result.data.grade);
		$(opener.document).find('#update-code-3').val(result.data.term);
		$(opener.document).find('#update-code-4').val(result.data.bigChapter);
		$(opener.document).find('#update-code-5').val(result.data.midChapter);
		$(opener.document).find('#update-code-6').val(result.data.smallChapter);
		$(opener.document).find('#update-code-7').val(result.data.difficulty);
		$(opener.document).find('#update-code-8').val(result.data.boxNumber);
		$(opener.document).find('#update-code-9').val(result.data.quizNumber01);
		$(opener.document).find('#update-code-10').val(result.data.quizNumber02);
		
		$(opener.document).find('#ins-quizText').css('border', '1px solid #a9a9a9')
																						.css('background', 'white')
																						.removeAttr('readonly');
		$(opener.document).find('#ins-quizText').attr('data-qno', no);
		
		$(opener.document).find('#update-content').css('display', 'inline');
		$(opener.document).find('#cancel-content').css('display', 'inline');
		$(opener.document).find('#save-content').css('display', 'none');
		$(opener.document).find('input[id^="update-code"]').removeAttr('readonly');
	});
}

/** 챕터별 보기 */
function findByChapter(cCode) {
	$.getJSON('/math/listByChapter.do', 
	{
		mno: curId,
		chapCode: cCode
	}, function(result) {
		handlebarsFunc(result);
		$('#load-by-chapter').val('');
	});
}

/** handleBars 템플릿 적용 */
function handlebarsFunc(result) {
	$('.data-row').remove();
  var source = $('#template_list').html();
  var template = Handlebars.compile(source);
  var content = template(result);
  $('#view-content-table tbody').html(content);
  $('#blank-div').attr('data-pageNo', result.pageNo);
  
  curPageNo = result.pageNo;
  console.log("페이지 번호 : " + result.pageNo);
  console.log("논리 : " + result.isNextPage);
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
	$('.titleLink').click(function(event) {
		event.preventDefault();
		viewDetail($(this).attr('data-no'));
	});
	checkBoxController();
	$('#div-del > button').click(function(event) {
		if($('input:checkbox[name="del-chkbox"]:checked').length == 0) {
			alert('삭제할 항목을 선택하세요.');
		} else {
			if(confirm("선택한 항목을 삭제하시겠습니까?")) {
				deleteContent();
			}
		}
	});
}

/** 게시물 삭제 */
function deleteContent() {
	var chk_length = $('input:checkbox[name="del-chkbox"]').length;
	var dataArray = new Array();
	$('input:checkbox[name="del-chkbox"]:checked').each(function() {
		dataArray.push($(this).attr('data-no'));
	});
	var arrJson = { "delArr[]" : dataArray }; /* 주석 1 */
	console.log(dataArray);
	// 배열 형태로 서버 전송을 위한 설정
	$.ajaxSettings.traditional = true;
	$.ajax('/math/delete.do', 
	{
		method: 'GET',
		dataType: 'json',
		data: arrJson, 
		success: function(result) {
			if(result.data == 'success') {
				alert("삭제되었습니다.");
				location.reload();
			} else {
				alert("삭제 실패. 다시 시도해주세요.");
			}
		}
	});
}

/** 체크박스 컨트롤러 */
function checkBoxController() {
	$('#sel-all').click(function(event) {
		if($('input:checkbox[name="del-chkbox"]').length != 
												$('input:checkbox[name="del-chkbox"]:checked').length) {
			$('input:checkbox[name="del-chkbox"]').each(function() {
				this.checked = true;
			});
		} else {
			$('input:checkbox[name="del-chkbox"]').each(function() {
				this.checked = false;
			});
		}
	});
	
	$('input:checkbox[name="del-chkbox"]').click(function(event) {
		if($('input:checkbox[name="del-chkbox"]').length == 
												$('input:checkbox[name="del-chkbox"]:checked').length) {
			$('input:checkbox[id="sel-all"]').prop('checked', true);
		} else {
			$('input:checkbox[id="sel-all"]').prop('checked', false);
		}
	});
}

/* 주석 1 : 컨트롤러로의 요청 시 dataType이 json이기 때문에 key/value 형태로 보내야 
 * 				 한다. 그리고 배열이기 때문에 key를 배열형식으로 작성해야 한다.
 * */
