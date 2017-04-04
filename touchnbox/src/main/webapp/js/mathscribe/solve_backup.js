function solve() {
	"use strict";
	
	$(window).ready(function() {
		
		var q01width = fixedSizeX($('#qPosition01').width(), $('#qPosition01').height());
		var q01height = fixedSizeY($('#qPosition01').height());
		var q01Position = $('#qPosition01').offset();
		console.log("q01 LEFT : " + q01Position.left);
		console.log("q01 TOP : " + q01Position.top);
		
//		q01width = fixedSizeX($('#qPosition01').width(), $('#qPosition01').height());
		
		
		$('#solve01').css('width', q01width)
						 		 .css('height', q01height - 4)
							 	 .css("top", q01Position.top)
								 .css("left", q01Position.left);
		console.log($('#solve01').offset().left);
		console.log($('#solve01').offset().top);

		if($('#qPosition02').text() != null && $('#qPosition02').text() != "") {
			var q02width = $('#qPosition02').width();
			var q02height = $('#qPosition02').height();
			var q02Position = $('#qPosition02').offset();
			console.log("q02 LEFT : " + q02Position.left);
			console.log("q02 TOP : " + q02Position.top);
			
			$('#solve02').css('width', q02width)
							 		 .css('height', q02height - 4)
									 .css("top", q02Position.top)
									 .css("left", q02Position.left);
			console.log($('#solve02').offset().left);
			console.log($('#solve02').offset().top);
		}
		
		if($('#qPosition03').text() != null && $('#qPosition03').text() != "") {
			var q03width = $('#qPosition03').width();
			var q03height = $('#qPosition03').height();
			var q03Position = $('#qPosition03').offset();
			console.log("q03 LEFT : " + q03Position.left);
			console.log("q03 TOP : " + q03Position.top);
			
			$('#solve03').css('width', q03width)
									 .css('height', q03height - 4)
									 .css("top", q03Position.top)
									 .css("left", q03Position.left);
			console.log($('#solve03').offset().left);
			console.log($('#solve03').offset().top);
		} else {
			console.log("빔");
		}
		
		if($('#qPosition04').text() != null && $('#qPosition04').text() != "") {
			var q04width = $('#qPosition04').width();
			var q04height = $('#qPosition04').height();
			var q04Position = $('#qPosition04').offset();
			console.log("q04 LEFT : " + q04Position.left);
			console.log("q04 TOP : " + q04Position.top);
			
			$('#solve04').css('width', q04width)
									 .css('height', q04height - 4)
									 .css("top", q04Position.top)
									 .css("left", q04Position.left);
			console.log($('#solve04').offset().left);
			console.log($('#solve04').offset().top);
		}

		if($('#qPosition05').text() != null && $('#qPosition05').text() != "") {
			var q05width = $('#qPosition05').width();
			var q05height = $('#qPosition05').height();
			var q05Position = $('#qPosition05').offset();
			console.log("q05 LEFT : " + q05Position.left);
			console.log("q05 TOP : " + q05Position.top);
			
			$('#solve05').css("top", q05Position.top)
									 .css("left", q05Position.left)
									 .css('width', q05width)
									 .css('height', q05height - 4);
			console.log($('#solve05').offset().left);
			console.log($('#solve05').offset().top);
			
		}
		
		function fixedSizeX(width, height) {
			if(width <= 10 && height < 25) {
				width = 10;
			}
			return width;
		}
		
		function fixedSizeY(height) {
			if(height < 25) {
				height = 21;
			}
			return height;
		}
		
		
		
		
		
		
		
		var boxPosition = $('#solve01').offset();
		
		$('#checkAnswer').click(function(event) {
			$('#solve01').css('display', 'none');
			
			var answer = $('#answer').text();
			var ans = $('#mathSrc').text();
			console.log("개수 : " + ans.length);
			var ans2 = ans.substr(1, ans.length - 2);
			console.log("자른거 : " + ans2);
			
			getAnswer(ans2);
		});
		
//		console.log("네모 1 넓이 : " + $('#qPosition01').width());
//		console.log("네모 1 높이 : " + $('#qPosition01').height());
//		console.log("네모 1 TOP : " + q01Position.top);
//		console.log("네모 1 LEFT : " + q01Position.left);
		
		
		// 첫 번째 tr의 두 번째 td의 첫 번째 mrow
		for(var i = 1; i < 5; i++) {
			if($('#underline-0' + i).attr('attr') != null) {
				$('#underline-0' + i).css('top', $('#bracket0' + i).offset().top + 23)
														 .css('left', $('#bracket0' + i).offset().left + 2);
			}
			
		}
		
	});
	
}


	
	/*
	function getAnswer(value) {
		M.trustHtml = true;
		$('#mathSrc').val(value)
		doMathSrc();
		/* $('#mathSrc1').keyup(F(doMathSrc, 1)).mouseup(F(doMathSrc, 1)); 
		 $('#mathSrc2').keyup(F(doMathSrc, 2)).mouseup(F(doMathSrc, 2)); 
		$('table.prec-form-char td:last-child')
		.addClass('fm-mo')
		.mouseover(checkUnicodeTitle)
		.click(insertToSrc2);
		
		var s = /^Win/.test(navigator.platform) ? 'win' : 'unix';
		$('#download').attr('href', '/downloads/mathscribe-'+s+'-0.4.3.zip');	//@@ version #
		
		$('#sendMsg').attr('href',
				'mail'+'to:'+encodeURIComponent('Dave Barton <dbarton'+'@mathscribe.c'+'om>'));
	}
	
	
	var ents_ = { nwarr: '\u2196', swarr: '\u2199' };
	function doMathSrc() {
		var srcE = $('#mathSrc')[0],
			ms = srcE.value.replace(/&([-#.\w]+);|\\([a-z]+)(?: |(?=[^a-z]))/ig,
					function(s, e, m) {
						if (m && (M.macros_[m] || M.macro1s_[m]))	return s;	// e.g. \it or \sc
						var t = '&'+(e || m)+';', res = $('<span>'+t+'</span>').text();
						return res != t ? res : ents_[e || m] || s;
					}),
			h = ms.replace(/</g, '&lt;');
		if (srcE.value != h)	srcE.value = h;	// assignment may clear insertion point
		
		var t;
		try {
			t = M.sToMathE(ms, true);
		} catch(exc) {
			t = String(exc);
		}
		$('#mathTgt').empty().append(t);
	}

	function checkUnicodeTitle(event)  if the event's target is a 1 or 2 character string, then
			its unicode code point(s) are made visible  {
		var e = event.target, t = e.firstChild;
		if (e.nodeType == 1  Element  && t && e.lastChild == t && t.nodeType == 3  Text ) {
			var s = t.data, len = s.length;
			if (0 < len && len <= 2) {
				var iToU = function(i) {
						var h = s.charCodeAt(i).toString(16).toUpperCase();
						while (h.length < 4)	h = '0'+h;
						return 'U+'+h;
					}, u = F.fToA(iToU, len).join(' ');
				if (! e.title)	e.title = u;
				else if (e.title.indexOf(u) == -1)	e.title = u+': '+e.title;
			}
		}
	}
	
	function insertToSrc2(event)  if the event's target is a 1 or 2 character string, then
			it is inserted into $('#mathSrc2')  {
		var e = event.target, t = e.firstChild;
		if (e.nodeType == 1  Element  && t && e.lastChild == t && t.nodeType == 3  Text ) {
			var s = t.data, len = s.length;
			if (0 < len && len <= 2) {
				if (s == '\u2044'  fraction slash ) {
					alert('This buggy "fraction slash" is being replaced by a regular / (U+002F).');
					s = '/';
				} else if (s == '&')	s = '&amp;';
				else if (s == '<')	s = '&lt;';
				else if ($(e).hasClass('no-meta') || $(e).is('.use-backslash *'))	s = '\\'+s;
				else if ($(e).is('.use-sc *'))	s = '\\sc '+s;
				else if ($(e).is('.use-fr *'))	s = '\\fr '+s;
				
				var te = $('#mathSrc2')[0];
				te.value += s;
				te.focus();
				var n = te.value.length;
				if (te.setSelectionRange)	te.setSelectionRange(n, n);
				else if (te.createTextRange) {
					var range = te.createTextRange();
					range.collapse(false);
					range.select();
				}
				
				doMathSrc(2);
			}
		}
	} */
	
	
	



function checkAnswer(value) {
	if(value == 1) {
		$('#answer').text("정답");
	} else {
		alert("오답");
	}
}
