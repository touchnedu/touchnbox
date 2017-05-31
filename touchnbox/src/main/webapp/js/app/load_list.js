var curId = $(opener.document).find('#current-id').attr('data-id') * 1;
var curPageNo = 1;
var defaultPageSize = 15;
var tempCategoryNumber = "0";
var currentListNo = 1;
const NORMAL_LIST = 1, EX_LIST = 2;

(function () {
	$('#find-by-category').click(function(event) {
		if($('#load-by-category').val() != '' && $('#load-by-category').val() != null) {
			switch($('select[name=category] option:selected').val()) {
			case "1":
				listByChapter($('#load-by-category').val(), 1, 15);
				break;
			case "2":
				listByQuizNumber($('#load-by-category').val(), 1, 15);
				break;
			case "3":
				listByBoxNumber($('#load-by-category').val(), 1, 15);
				break;
			}
		} 
	});
	
	$('#first-page').click(function(event) {
		event.preventDefault();
		tempCategoryNumber = "0";
		viewList(currentListNo, 1, 15);
		$('#load-by-category').val('');
		$('select[name=category]').val('1');
	});
	
	$('#prevPage').click(function(event) {
		event.preventDefault();
		getCategoryState("prev");
	});
	
	$('#nextPage').click(function(event) {
		event.preventDefault();
		getCategoryState("next");
	});
	
}());

function setCurrentList(no) {
	currentListNo = no;
	viewList(currentListNo, 1, 15);
}

function getCategoryState(target) {
	if(target == "prev") {
		curPageNo -= 1;
	} else if(target == "next") {
		curPageNo += 1;
	}
	
	switch(tempCategoryNumber) {
	case "1":
		listByChapter($('#load-by-category').val(), curPageNo, defaultPageSize);
		break;
	case "2":
		listByQuizNumber($('#load-by-category').val(), curPageNo, defaultPageSize);
		break;
	case "3":
		listByBoxNumber($('#load-by-category').val(), curPageNo, defaultPageSize);
		break;
	default:
		viewList(currentListNo, curPageNo, defaultPageSize);
		break;
	}
}

function viewList(currentListNo, pageNo, pageSize) {
	var url = "";
	if(currentListNo == NORMAL_LIST)
		url = '/mathdata/list.do';
	else if(currentListNo == EX_LIST)
		url = '/mathdata/exlist.do';
	$.getJSON(url, {
		no: curId,
		pageNo: pageNo,
		pageSize: pageSize
	}, function(result) {
		handlebarsFunc(result);
	});
}

function viewDetail(no) {
	var url = "";
	if(currentListNo == NORMAL_LIST)
		url = '/mathdata/detail.do?no=';
	else if(currentListNo == EX_LIST)
		url = '/mathdata/exdetail.do?no=';
	
	$.getJSON(url + no, function(result) {
		var data = result.data;
		var imageSource = data.imgCode;
		var contentSource = data.content;
		
		if(result.data != '' && result.data != null) {
			loadImage(result.data.imgCode);
			$(opener.document).find('#image-src').val(data.imgCode);
			$(opener.document).find('#loaded-content').empty();
			$(opener.document).find('#loaded-content').append(data.content);
			$(opener.document).find('#update-content').css('display', 'inline');
			$(opener.document).find('#save-content').css('display', 'none');
			$(opener.document).find('#image-src').prop('disabled', true);
			$(opener.document).find('#load-img').css('display', 'none');
			
			if(currentListNo == NORMAL_LIST) {
				$(opener.document).find('#is_ex').prop('checked', false);
				$(opener.document).find('#is_ex').prop('disabled', false);
			} else if(currentListNo == EX_LIST) {
				$(opener.document).find('#is_ex').prop('checked', true);
				$(opener.document).find('#is_ex').prop('disabled', true);
			}
			
			setTimeout(function() {
				$(opener.location).attr("href", "javascript:openerController('" + no + "');");
			}, 25);
		} else {
			alert("오류");
		}
		
	});
}

function loadImage(source) {
	var contentImg = new Image();
	var ex = "";
	if(currentListNo == EX_LIST)
		ex = "ex_"
			
	contentImg.src = "../quiz_images/" + ex + source + ".png";
	contentImg.onload = function() {
		console.log(contentImg.src);
		var imgTag = "<img id='content-src' src='" + contentImg.src + "'>";
		$(opener.document).find('#preview-phone > div:eq(0)').empty();
		$(opener.document).find('#preview-phone > div:eq(0)').append(imgTag);
	} 
	contentImg.onerror = function() {
		alertify.alert("문제 이미지가 존재하지 않습니다.");
	}
};

/** 카테고리별 보기 */
function listByChapter(cCode, pageNo, pageSize) {
	var url = "";
	if(currentListNo == NORMAL_LIST)
		url = '/mathdata/listByChapter.do';
	else if(currentListNo == EX_LIST)
		url = '/mathdata/listByExChapter.do';
	
	tempCategoryNumber = "1";
	$.getJSON(url, 
	{
		mno: curId,
		chapCode: cCode,
		pageNo: pageNo,
		pageSize: pageSize
	}, function(result) {
		console.log(result);
		handlebarsFunc(result);
//		$('#load-by-category').val('');
//		$('select[name=category]').val('1');
	});
}

function listByQuizNumber(qNumber, pageNo, pageSize) {
	var url = "";
	if(currentListNo == NORMAL_LIST)
		url = '/mathdata/listByQuizNumber.do';
	else if(currentListNo == EX_LIST)
		url = '/mathdata/listByExQuizNumber.do';
	
	tempCategoryNumber = "2";
	$.getJSON(url, 
	{
		mno: curId,
		mathCode: qNumber,
		pageNo: pageNo,
		pageSize: pageSize
	}, function(result) {
		handlebarsFunc(result);
//		$('#load-by-category').val('');
//		$('select[name=category] option:eq(0)').prop("selected", true);
	});
}

function listByBoxNumber(bNumber, pageNo, pageSize) {
	var url = "";
	if(currentListNo == NORMAL_LIST)
		url = '/mathdata/listByBoxNumber.do';
	else if(currentListNo == EX_LIST)
		url = '/mathdata/listByExBoxNumber.do';
	
	tempCategoryNumber = "3";
	$.getJSON(url, 
	{
		mno: curId,
		boxNumber: bNumber,
		pageNo: pageNo,
		pageSize: pageSize
	}, function(result) {
		handlebarsFunc(result);
//		$('#load-by-category').val('');
//		$('select[name=category] option:eq(0)').prop("selected", true);
	});
}
/* ------------------------------------------ */

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
	$('.titleLink').click(function(event) {
		event.preventDefault();
		viewDetail($(this).attr('data-qno'));
	});
	
	checkBoxController();
	
	$('#delete-content').click(function(event) {
		var currentId = $(opener.document).find('#current-id').attr('data-id');
		if($('input:checkbox[name="del-chkbox"]:checked').length == 0) {
			alertify.delay(2000).error('삭제할 항목을 선택하세요.');
		} else {
			alertify.confirm("선택한 항목을 삭제하시겠습니까?", function() {
				if(currentId == 1001) {
					deleteContent();
				} else {
					alertify.delay(2000).error("권한이 없습니다.");
					$('input:checkbox[name="del-chkbox"]').each(function() {
						this.checked = false;
					});
				}
				
			}, function() {
				alertify.delay(2000).log("취소되었습니다");
			});
		}
	});
}

/** 게시물 삭제 */
function deleteContent() {
	var url = "";
	if(currentListNo == NORMAL_LIST)
		url = '/mathdata/delete.do';
	else if(currentListNo == EX_LIST)
		url = '/mathdata/deleteex.do';
	
	var chk_length = $('input:checkbox[name="del-chkbox"]').length;
	var dataArray = new Array();
	
	$('input:checkbox[name="del-chkbox"]:checked').each(function() {
		dataArray.push($(this).attr('data-no'));
	});
	
	var arrJson = { "delArr[]" : dataArray }; /* 주석 1 */
	
	// 배열 형태로 서버 전송을 위한 설정
	$.ajaxSettings.traditional = true;
	$.ajax(url, 
	{
		method: 'GET',
		dataType: 'json',
		data: arrJson, 
		success: function(result) {
			if(result.data == 'success') {
				location.reload();
			} else {
				alertify.delay(2000).error("다시 시도해주세요.");
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
