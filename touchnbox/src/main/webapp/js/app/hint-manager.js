function loadHint(hintCode) {
	var schoolCode = hintCode.substr(0, 3);
	var chapterCode = hintCode.substring(3);
	var hintTag = "<br><img src='../hint_images/" 
													+ schoolCode + "/" + schoolCode + "_" + chapterCode	
													+ ".png' style='max-width:100%'>";
	$('#hintArea').append(hintTag);
}

function loadHintAll(schoolCode, hintCode) {
	var imageSrc = "../hint_images/" + schoolCode + "/" + schoolCode + "_"
																														+ hintCode + ".png";
	var imageSrcTag = "<img src='../hint_images/" + schoolCode + "/"
																						+ schoolCode + "_" + hintCode
																						+ ".png' style='max-width:100%'>";
	
	$.ajax({
		url:imageSrc,
		type:'HEAD',
		error: function() {
			window.hintroid.isLastHint();
		},
		success: function() {
			$('#hintArea').empty();
			$('#hintArea').append(imageSrcTag);
		}
	});
	
}
