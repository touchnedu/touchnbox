/** - 수식 스크립트 영역 */
var ents_ = { nwarr: '\u2196', swarr: '\u2199' };
function doMathSrc(n) {
  var srcE = $('#mathSrc'+n)[0],
    ms = srcE.value.replace(/&([-#.\w]+);|\\([a-z]+)(?: |(?=[^a-z]))/ig,
      function(s, e, m) {
        if (m && (M.macros_[m] || M.macro1s_[m])) return s; // e.g. \it or \sc
        var t = '&'+(e || m)+';', res = $('<span>'+t+'</span>').text();
        return res != t ? res : ents_[e || m] || s;
      }),
    h = ms.replace(/</g, '&lt;');
  // ms 는 입력한 값을 실시간으로 저장
  if (srcE.value != h)  srcE.value = h; // assignment may clear insertion point
  
  
  var t;
  try {
    t = M.sToMathE(ms, true);
  } catch(exc) {
    t = String(exc);
  }
  $('#mathTgt'+n).empty().append(t);
// $('#mathTgt'+n).empty().append(t);
}

function checkUnicodeTitle(event) /* if the event's target is a 1 or 2 character string, then
    its unicode code point(s) are made visible */ {
  var e = event.target, t = e.firstChild;
  if (e.nodeType == 1 /* Element */ && t && e.lastChild == t && t.nodeType == 3 /* Text */) {
    var s = t.data, len = s.length;
    if (0 < len && len <= 2) {
      var iToU = function(i) {
          var h = s.charCodeAt(i).toString(16).toUpperCase();
          while (h.length < 4)  h = '0'+h;
          return 'U+'+h;
        }, u = F.fToA(iToU, len).join(' ');
      if (! e.title)  e.title = u;
      else if (e.title.indexOf(u) == -1)  e.title = u+': '+e.title;
    }
  }
}
function insertToSrc2(event) /* if the event's target is a 1 or 2 character string, then
    it is inserted into $('#mathSrc2') */ {
  var e = event.target, t = e.firstChild;
  if (e.nodeType == 1 /* Element */ && t && e.lastChild == t && t.nodeType == 3 /* Text */) {
    var s = t.data, len = s.length;
    if (0 < len && len <= 2) {
      if (s == '\u2044' /* fraction slash */) {
        alert('This buggy "fraction slash" is being replaced by a regular / (U+002F).');
        s = '/';
      } else if (s == '&')  s = '&amp;';
      else if (s == '<')  s = '&lt;';
      else if ($(e).hasClass('no-meta') || $(e).is('.use-backslash *')) s = '\\'+s;
      else if ($(e).is('.use-sc *'))  s = '\\sc '+s;
      else if ($(e).is('.use-fr *'))  s = '\\fr '+s;
      
      var te = $('#mathSrc7')[0];
      te.value += s;
      te.focus();
      var n = te.value.length;
      if (te.setSelectionRange) te.setSelectionRange(n, n);
      else if (te.createTextRange) {
        var range = te.createTextRange();
        range.collapse(false);
        range.select();
      }
      
      doMathSrc(7);
    }
  }
} /** 수식 스크립트 영역 - */

/** 초기화 */
function init() {
	$('#header-area').load('header.html', function() {
		$.getJSON('/auth/loginInfo.do', function(result) {
			if(result.state == "yes") {
				docuInit(result.member.no, result.member.name);
				$('#main-content').css('display', 'block');
			} else {
				alert("로그인해주세요.");
				location.replace("../index.html");
			}
		});
	});
}

/** 로그아웃 */
function logout() {
	$.getJSON('/auth/logout.do', function(result) {
		if(result.data == 'success') {
			alert("로그아웃되었습니다.");
			location.replace("../index.html");
		}
	});
}

/** 기본 세팅 */
function docuInit(loginId, loginName) {
	M.trustHtml = true;
  for(var i = 1; i < $('.convertArea').length; i++) {
  	(function() {
  		var id = i;
  		if(id < 10) {
  			id = "0" + i;
  		}
  		$('#mathSrc' + id).keyup(F(doMathSrc, id)).mouseup(F(doMathSrc, id));
  	})();
  }
  $('table.prec-form-char td:last-child').addClass('fm-mo')
    																		 .mouseover(checkUnicodeTitle)
    																		 .click(insertToSrc2);
  
  $('#current-id').text(loginName);
  $('#current-id').attr('data-id', loginId);

  $('.logout-button').click(function(event) {
  	event.preventDefault();
  	logout();
  });
  
  /* 답 체크 시 이벤트 */
  $("input[type=checkbox]").click(function(event) {
  	if($(this).attr('id').substring(0, 3) == "ans") {
  		var checkBoxIdValue = $(this).attr('id').substring($(this).attr('id').length - 2);
  		var nextTextAreaId = checkBoxIdValue * 1 + 1;
  		if(nextTextAreaId < 10) {
  			nextTextAreaId = "0" + nextTextAreaId;
  		}
  		console.log("nextTextAreaId : " + nextTextAreaId);
  		
  		if($(this).is(":checked")) {
  			$('#select-ans-number-' + checkBoxIdValue).attr('disabled', false);
  			$('#input-ans-' + checkBoxIdValue).attr('disabled', false);
  			$('#mathSrc' + nextTextAreaId).val('\\;');
  		} else {
  			$('#select-ans-number-' + checkBoxIdValue).attr('disabled', true);
  			$('#input-ans-' + checkBoxIdValue).attr('disabled', true);
  			$('#mathSrc' + nextTextAreaId).val('');
  		}
  	}
  });
  
  /* = 입력 시 자동 줄바꿈 처리 */
  /* trim 정규식 문자로 처리
   * ^	: 시작
   * \s : 빈문자
   * *	: 임의의 수 (모든)
   * |	: or
   * $	: 끝
   * g	: 전역 검색
   * i	: 대소문자 구분 안함
   * "" : 치환할 문자
   * */
//  $('textarea').focusout(function() {
//  	var getIdNumber = $(this).attr('id').substring($(this).attr('id').length - 1);
//  	if($(this).attr('id').substring(0,4) == "math" 
//  											&& $(this).val().replace(/(^\s*)|(\s*$)/gi, "") == "=") {
//  		$('input:[id=next-line' + getIdNumber + ']').attr('checked', false);
//  	} else {
//  		$('input:[id=next-line' + getIdNumber + ']').attr('checked', true);
//  	}
//  });
  
  /* 분수 내 네모 설정 시 */
  $('#gen-optionVal').click(function(event) {
  	genOptionValue();
  });
  
  /* 분수 내 네모 값 입력 체크 이벤트 */
  $('input[id=etc-chk]').click(function(event) {
  	if($(this).is(":checked")) {
  		$('#mathSrc99').attr('disabled', false);
  		$('#select-ans-number-99').attr('disabled', false);
  		$('#input-ans-99').attr('disabled', false);
  		$('#gen-optionVal').attr('disabled', false);
  	} else {
  		$('#mathSrc99').attr('disabled', true);
  		$('#select-ans-number-99').attr('disabled', true);
  		$('#input-ans-99').attr('disabled', true);
  		$('#gen-optionVal').attr('disabled', true);
  		$('#mathSrc99').val("");
  		$('#input-ans-99').val("");
  		$('#select-ans-number-99 option:eq(0)').attr('selected', 'selected');
  	}
  });
  
  // 코드 생성 버튼
  $('#content-copy').click(function(event) {
  	generate();
  });
  
  // 초기화 버튼
  $('#content-reset').click(function(event) {
  	if(confirm("초기화 하시겠습니까?")) {
  		contentReset();
  	}
  });

  // 미리보기
  $('#prv-content').click(function(event) {
  	var makeCode = $('#view-content > textarea').val();
  	var titleForm = $('#ins-quizText').val();
  	
  	var topPosition = (screen.height - 640) / 2;
  	var leftPosition = (screen.width - 360) / 2;
  	
  	var popupUrl = "math_popup.html";
  	var popupOption = "width=360, height=640" +
  										", top=" + topPosition + ", left=" + leftPosition +
  										", resizable=no, scrollbars=no, status=no;";
  	if(makeCode != "" && titleForm != "") {
  		window.open(popupUrl, "", popupOption);
  	} else {
  		alert("문제를 작성해주세요.");
  	}
  	
  });
  
}

// 초기화
function contentReset() {
	$('input').val('');
	$('textarea').val('');
	$('input[id=etc-chk]').prop('checked', false);
	$('#select-box-number option:eq(0)').prop('selected', true);
	$('#select-type-number option:eq(0)').prop('selected', true);
	$('input:checkbox[id^="ans-chk"]').prop('checked', false);
	$('input:checkbox[id^="next-line"]').prop('checked', true);
	$('select[name^="ans-number"] option:eq(0)').prop('selected', true);
	$('select[name="ans-number-99"] option:eq(0)').prop('selected', true);
	$('select[name^="ans-number"]').prop('disabled', true);
	$('input[id^="input-ans"]').prop('disabled', true);
	$('input[id^="input-ans"]').val('');
	$('td[id^="mathTgt"]').text('');
	$('#mathSrc99').prop('disabled', true);
	$('#gen-optionVal').prop('disabled', true);
	$('#code-type-5').val('00');
}

function childFunction() {
	var titleValue = "<div id='quiz-text'><img src='img/icon_pencel.png' width='16'>&nbsp;"
									 + window.opener.document.getElementById("ins-quizText").value 
									 + "</div>";
	var contentValue = window.opener.document.getElementById("popupContent").value;
	$('.text-font').append(titleValue);
	$('#makeQuestionArea').append(contentValue);
	
	solve($('#boxCode').val(), $('#typeCode').val());
}

// {\html'&lt;span id="qPosition00" ans="3"&gt;3&lt;/span&gt;'}
function genOptionValue() {
	var isCompleted = true;
	if($('input[id=etc-chk]').is(':checked')) {
		if($('#mathSrc99').val() == "" 
						| $('#select-ans-number-99 option:selected').val() == "ns"
						| $('#input-ans-99').val() == "") {
			isCompleted = false;
		} else {
			isCompleted = true;
		}
	}
	if(isCompleted) {
		var visibleVal = $('#mathSrc99').val(); // 보이는 값
		var selBoxNumVal = $('#select-ans-number-99 option:selected').val(); // 선택된 네모 번호
		var answerHiddenVal = $('#input-ans-99').val(); // 정답
		var genOptionValCode = "{\\html'&amp;lt;span id=\"qPosition0" + selBoxNumVal
													 + "\" ans=\"" + answerHiddenVal + "\""
													 + "&amp;gt;" + visibleVal + "&amp;lt;/span&amp;gt;'}";
		$('#mathTgt99').text(genOptionValCode);
		
		
	} else {
		alert("모든 값을 입력 또는 선택하세요.");
	}
}

/* 코드 생성 */
function generate() {
	$('#view-content > textarea').val("");
	
	var qpNum = "";
	var answerVal = "";
	var allContent = "";
	var chkAnswer = false;
	var boxNumber = $('#select-box-number option:selected').val();
	var typeNumber = $('#select-type-number option:selected').val();
	var boxGenCode = "\n<input class='abox activebox' id='solve01' type='text'>";
	var addBoxCode = "";
	var typeNumCode = "\n<input id='typeCode' type='hidden' value='" 
													+ $('#select-type-number option:selected').val() + "'>";
	var boxNumCode = "\n<input id='boxCode' type='hidden' value='" + boxNumber + "'>";
													
	if(boxNumber > 1) {
		for(var i = 2; i <= boxNumber; i++) {
			(function() {
				var idb = i;
				addBoxCode += "\n<input class='abox' id='solve0" + idb + "' type='text'>";
			})();
		}
	}
	
	var startDiv = "<div>$";
	var endDiv = "";
	
	for(var i = 1; i <= 15; i++) {
		(function() {
			var idx = i;
			if(idx < 10) {
				idx = "0" + i;
			} 
			var contents = $('#mathSrc' + idx).val();
			
			if($("input:checkbox[id=next-line" + idx + "]").is(":checked")) {
				endDiv = "$</div>\n<p class='blankArea'></p>\n";
			} else {
				endDiv = "$</div>\n";
			}
			
			if($("input:checkbox[id=ans-chk" + idx + "]").is(":checked")) {
				// 체크된 경우 값이 1~7 사이일 때 textarea 내용을 집어넣는다.
				var selNum = $('#select-ans-number-' + idx + ' option:selected').val();
				if(selNum > 0 && selNum < 8 && $('#input-ans-' + idx).val() != "") {
					qpNum = " id='qPosition0" + selNum + "'";
					answerVal = " ans='" + $('#input-ans-' + idx).val() + "'";
					startDiv = "<div" + qpNum + answerVal + ">$";
					
					allContent += startDiv + contents + endDiv;
					
				} else {
					chkAnswer = true;
					alert("답 번호를 선택, 또는 정답을 입력하세요");
				}
				
			} else {
				startDiv = "<div>$";
				if(contents != "" && contents != null) {
					allContent += startDiv + contents + endDiv;
				} 
				
			}
			
			if(idx == 15 && !chkAnswer) {
				allContent += boxGenCode + addBoxCode + typeNumCode + boxNumCode;
				$('#popupContent').val(allContent);
				$('#ins-quizText').val($('#title-form').val());
			}
			
		})();
	}
	
	if(chkAnswer) {
		alert("답 번호를 선택, 또는 정답을 입력하세요");
	}
	
} /* 코드 생성 */

/** */

function solve(boxNumber, typeNumber) {
	
	var topOffset = 1,
			leftOffset = 4;
	
	// 전역 변수
			setOffsetX = 0;
			setOffsetY = 0;
			
			totalBoxNumber = boxNumber;
			currentBoxNumber = 1;
			
	$(window).load(function() {
//		if(typeNumber == 2) {
//			topOffset = -3;
//			leftOffset = 4;
//			setOffsetX = 3;
//			setOffsetY = 5;
//		} else if(typeNumber == 3) {
//			setOffsetX = -2;
//			topOffset = 5;
//		}
		
		console.log("탑옵셋: " + topOffset);
		$('#solve01').css('width', fixedSizeX($('#qPosition01').width()) + 3)
						 		 .css('height', fixedSizeY($('#qPosition01').height()))
							 	 .css("top", $('#qPosition01').offset().top - topOffset)
								 .css("left", $('#qPosition01').offset().left - leftOffset)
								 .css('display', 'inline-block');
		
		if(boxNumber > 1) {
			for(var i = 2; i <= boxNumber; i++) {
				if($('#qPosition0' + i).text() != null && $('#qPosition0' + i).text() != "") {
					$('#solve0' + i).css('width', fixedSizeX($('#qPosition0' + i).width()) + 3)
			 		 								.css('height', fixedSizeY($('#qPosition0' + i).height()))
			 		 								.css("top", $('#qPosition0' + i).offset().top - topOffset)
			 		 								.css("left", $('#qPosition0' + i).offset().left - leftOffset);
					$('#solve0' + i).css('display', 'inline-block');
					if(i == boxNumber) {
						$('#qPosition0' + i).css('color', '#0000ff');
					}
					console.log("높이값 " + i + ": " + $('#qPosition0' + i).height());
				} else {
					break;
				}
			}
		} else {
			$('#qPosition01').css('color', '#0000ff');
		}
		
		$('#answer-ring').css('top', $('#qPosition0' + boxNumber).offset().top - 25)
										 .css('left', $('#qPosition0' + boxNumber).offset().left - 30);
		
		var bodyArea = $('#questionArea').height();
		$('body').css('height', bodyArea);
		
//		window.android.setAnswer($('#qPosition01').attr('ans'));
//		window.android.setScale($('#qPosition01').width(), 
//														$('#qPosition01').height());
//		window.android.setPosition($('#qPosition01').offset().left - setOffsetX, 
//															 $('#qPosition01').offset().top - setOffsetY);
		
	});
	
}

function fixedSizeX(width) {
//	if(width < 15) {
//		width = 18;
//	} else if(width < 24 && width > 14) {
//		width = 26;
//	} else {
//		width = width + 4;
//	}
	width = width + 4;
	return width;
}

function fixedSizeY(height) {
	if(height <= 40 && height > 26) {
		height = 26;
	} else if(height > 40 && height < 55) {
		height = 56;
	} else if(height < 27) {
		height = 18;
	}
	return height;
}

function correctAnswer(id) {
	var intId; 
	intId = Number(id) + 1;
	++currentBoxNumber;
	
	$('#solve' + id).css('display', 'none');
	
	if($('#qPosition0' + intId).text() != null 
																	&& $('#qPosition0' + intId).text() != "") {
		
		$('#solve0' + intId).addClass('activebox');
		
//		window.android.setAnswer($('#qPosition0' + intId).attr('ans'));
//		window.android.setScale($('#qPosition0' + intId).width(), 
//														$('#qPosition0' + intId).height());
//		window.android.setPosition($('#qPosition0' + intId).offset().left - setOffsetX, 
//															 $('#qPosition0' + intId).offset().top - setOffsetY);
		
//		window.android.rightSoundPlay();
	} else {
		animateFinalAnswer();
		intId = 0;
//		window.android.finishQuiz();
		
	}
}
function incorrectAnswer(id) {
	$('#solve' + id).addClass('shake');
	setTimeout(function () {
		$('#solve' + id).removeClass('shake');
	}, 1000);
}
function viewSolution() {
	for(var i = currentBoxNumber; i <= totalBoxNumber; i++) {
		$('#solve0' + i).removeClass('activebox');
	}
	$('input').css('animation-name', 'fadeout')
	          .css('-webkit-animation-name', 'fadeout')
	          .css('animation-duration', '1s')
	          .css('-webkit-animation-duration', '1s')
	          .css('border', 'none')
	          .css('background-color', 'transparent');
}
function animateFinalAnswer() {
	$('#answer-ring').css('display', 'inline-block');
	for(var i = 1; i < 9; i++) {
		(function() {
			var idx = i;
			setTimeout(function() {
				$('#answer-ring > img').attr('src', '../js/images/answer_ring_0' + idx + '.png');
			}, i * 30 - 20);
		})();
	}
}