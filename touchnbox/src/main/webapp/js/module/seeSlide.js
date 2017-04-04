var slideTimer;

//Edit this config as you wish
var config = {
      //slideDuration determines how many millisecods each slide will be visible for. Default: 3000
      slideDuration: 3000,
      //slideDuration determines how quickly the next image will slide in to place. Default: 1000
      slideOnDuration: 1000,
      //slideOffDuration determines how quickly the current image will slide out of view. Default: 2500
      slideOffDuration: 2500,
      
      //Do not touch these values
      nextImage: 0,
      animating: false,
      currentImage: 0,
}

function resetTimer(){
  clearInterval(slideTimer);
  slideTimer = setInterval(showNextImage, config.slideDuration);
}

function initDiscs(){
  var discs = $("<ul id='slideDiscs'></ul>");
  config.numSliders = $("#seeSlide img").length;
  for (i = 0; i<config.numSliders; i++){
    discs.append("<a href='#'><li data-ref='" + i + "'> </li></a>");
  }
  $("#seeSlide").prepend(discs);
  $("#seeSlide #slideDiscs").addClass("hidden");
  for (i = 0; i<config.numSliders; i++){
    //If a disc is clicked
    $("#seeSlide #slideDiscs li").eq(i).on("click", function(event){
    	event.preventDefault();
      var forcedImage = $(this).attr("data-ref");
      //If the slideshow is in the process of animating, ignore the request.
      if (config.animating == false) {
        //Otherwise show the next image
        showNextImage(forcedImage);
        resetTimer();
      }
    });
  }
  
  //Position discs
  var slideCenter = parseInt($("#seeSlide").css("width"))/2;
  var discsCenter = parseInt($("#seeSlide #slideDiscs").css("width"))/2;
  slideCenter = slideCenter - discsCenter;
  slideCenter += "px";
  $("#seeSlide #slideDiscs").css("left", slideCenter);
}

function initSlideImgs(){
  //Place all images to the right of the viewport
  var slideWidth = parseInt($("#seeSlide").css("width"));
  $("#seeSlide img").addClass("hidden");
  $("#seeSlide img").css({
      left:  slideWidth + "px",
      zIndex: 1
      });
  //Place the current image (should be 0) in the viewport
  $("#seeSlide img").eq(config.currentImage).css({
      left: "0px",
      zIndex: 2
      });
  $("#slideDiscs li").eq(config.currentImage).addClass("selected");
  //$("#slideDiscs li").eq(currentImage).css("color", "white");
}


function showNextImage(forcedImage){
  
  config.animating = true;
  if (forcedImage === undefined){
    //Standard procedure, nextImage is currentImage + 1, unless current image is last image
    config.nextImage = parseInt(config.currentImage + 1);
    if (config.nextImage == config.numSliders){
      config.nextImage = 0;
    }
  } else {
    //if the user has chosen the currently displayed image, ignore the request.
    if (forcedImage == config.currentImage){
      return;
    }
    //Otherwise, set the next Image as the forced image
    config.nextImage = parseInt(forcedImage);
  }
  
      $("#seeSlide img").eq(config.currentImage).css("z-index", 1);
      $("#seeSlide img").eq(config.nextImage).css("z-index", 2);
      var slideWidth = parseInt($("#seeSlide").css("width"));
      slideWidth += "px";
    //place all Images just off to the right
    $("#seeSlide img").css("left", slideWidth);
    //re-place current image in the viewport
    $("#seeSlide img").eq(config.currentImage).css("left", "0px");
  
  
  //Animate current image to the left;

  $("#seeSlide img").eq(config.currentImage).animate({left: "-"+slideWidth}, config.slideOffDuration, function(){
      
      });
  
  //animate next image to the viewport from the right
  $("#seeSlide img").eq(config.nextImage).animate({left: "0px"}, config.slideOnDuration, function(){

    //set the appropriate disc to filled
    $("#seeSlide #slideDiscs li").css("color", "");
    $("#seeSlide #slideDiscs li").removeClass("selected");
    $("#seeSlide #slideDiscs li").eq(config.nextImage).addClass("selected");
      $("#seeSlide img").eq(config.currentImage).finish();
      //place all Images just off to the right
      $("#seeSlide img").css("left", slideWidth);
      //end slideOff animation
      //re-place current image in the viewport
      $("#seeSlide img").eq(config.nextImage).css("left", "0px");      
    
    //set the current image to the image that has just filled the viewport
    config.currentImage = parseInt(config.nextImage);
    //Finished the animation, accept clicks again.
    config.animating = false;
    resetTimer();
  } );

  
}


/*function initArrows(){
  var arrows = $('<div id="arrows"><a href="#" id="slideLeftArrow">&laquo;</a><a href="#" id="slideRightArrow">&raquo;</a></div>');
  $("#seeSlide").prepend(arrows);
  $("#seeSlide #arrows").addClass("hidden");
  $("#seeSlide #arrows a").on("mousemove", function(){
    $(this).css("opacity", 0.6);
  });
  
  $("#seeSlide #arrows a").on("mouseleave", function(){
    $(this).css("opacity", "");
  });
  
  $("#seeSlide #arrows #slideLeftArrow").on("click", function(){
    if (config.animating == false) {
      var prevImage = config.currentImage - 1;
      if (prevImage<0){
        prevImage = (config.numSliders - 1);
      }
      showNextImage(prevImage);
      resetTimer();
    }
  });
  
  $("#seeSlide #arrows #slideRightArrow").on("click", function(){
    if (config.animating == false) {
      showNextImage();
      resetTimer();
    }
  });
}*/

function makeEverythingVisible(){
  $("#seeSlide #arrows").removeClass("hidden");
  $("#seeSlide #slideDiscs").removeClass("hidden");
  $("#seeSlide img").removeClass("hidden");
  $("#seeSlide").css("backgroundImage", "none");
}

$(window).load(function(){
      //When all images are loaded
      makeEverythingVisible();
      slideTimer = setInterval(showNextImage, config.slideDuration);      
});

$(function(){
	console.log("seeSlide");
  initDiscs();
//  initArrows();
  initSlideImgs();
});
