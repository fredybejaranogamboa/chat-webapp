var mySwiper;
var pushedBtn;
$(document).ready(function() {
	// initialize swiper when document ready
	mySwiper = new Swiper('.swiper-container', {
		// Optional parameters
		direction : 'horizontal',
		loop : true,
		speed : 1000,
		spaceBetween : 320,
		freeModeMomentumRatio : 20,
		onSlideChangeStart : function(swiper) {
			if (swiper.isBeginning) {
				iniTransactionMatch();
				//Action triggered by button
				if(pushedBtn==null)
					remoteLike();
			} else if (swiper.isEnd) {
				iniTransactionMatch();
				//Action triggered by button
				if(pushedBtn==null)
					remoteDislike();
			}
		},
		onSlideChangeEnd : function(swiper) {
			$('.swiper-slide-active').css('visibility', 'visible');
			var gsmActualUserToMatch = $( "input[name='formMatch:gsmActualUserToMatch']" ).val();
			if(!gsmActualUserToMatch){
				swiper.lockSwipes();//is locked when no users to match 
			}
			pushedBtn=null;
		},
		onSliderMove : function(swiper, event) {
			var gsmActualUserToMatch = $( "input[name='formMatch:gsmActualUserToMatch']" ).val();
			if(gsmActualUserToMatch){//is faded when exist users to match 
				var diff = swiper.touches.currentX - swiper.touches.startX;
				if (diff > 20) {
					$('.like').fadeTo(5, 0.1 + diff*0.01);
					$('.dislike').fadeTo(5, 0);
				} else if (diff < -20) {
					$('.like').fadeTo(5, 0);
					$('.dislike').fadeTo(5, 0.1 + diff*-0.01);
				}
			}
		},
		onTouchEnd : function(swiper, event) {
			$('.like').fadeTo(5, 0);
			$('.dislike').fadeTo(5, 0);
		}
	})
});

function iniTransactionMatch() {
	$('.swiper-slide-active').css('visibility', 'hidden');
	mySwiper.lockSwipes();
	hideImage();
}

function endTransactionMachFromBackBean() {
	mySwiper.unlockSwipes();
	showImage();
}

function hideImage() {
	$(".userPhoto").css({
		'display' : 'none'
	});
	$(".defaultPhoto").css({
		'display' : 'inline'
	});

}

function showImage(first) {
	if (first) {
		$(".defaultPhoto").css({
			'display' : 'none'
		});

		$(".userPhoto").css({
			'display' : 'inline'
		});

		var h = $(".swiper-container").height();
		var p = $(".userPhoto").height();

		$(".swiper-container").height(h);
		$(".userPhoto").height(p);

	} else {
		var counter = 0;
		$(".userPhoto").one('load', function() {
			counter++;
			if (this.complete && counter >= 3) {
				$(".defaultPhoto").css({
					'display' : 'none'
				});

				$(".userPhoto").css({
					'display' : 'inline'
				});
			}
		});
	}
}

function showDialog() {
	PF('confirmDialog').show();
}

function showLimitLikesDialog() {
	PF('limitLikeDialog').show();
}

window.addEventListener("orientationchange", function() {
	$(".swiper-container").height('auto');
	$(".userPhoto").height('auto');
		
	setTimeout(function() {
		var h = $(".swiper-container").height();
		var p = $(".userPhoto").height();
		
		var winWidth = $(window).outerWidth(true);
		var tenPercent = Math.max(winWidth * 0.1);
		var left = Math.max(tenPercent / 2);
		var dialogWidth = winWidth - tenPercent;
		
		if(dialogWidth > 300){
			dialogWidth = 300;
			left = (Math.max(winWidth - dialogWidth) / 2);
		}				
	    
		$(".customDialog").css("top",  Math.max(0, ($(window).height() - $(".customDialog").outerHeight(true)) / 2) + "px");
		$(".customDialog").css("width", dialogWidth + "px");
		$(".customDialog").css("left", left + "px");
	    		
		$(".swiper-container").height(h);
		$(".userPhoto").height(p);
	}, 900);
}, false);
