;(function($, window, document, undefined) {
    "use strict";

	$(function(){
		 function playInst(){
        v.play();
    }
    function pauseInst(){
        v.pause();
    }
    var v = document.getElementById("bgvid");
    $(document).on('click', '.video-pause', function(){
			$('.hide-content').addClass('act');
			$('.close-full-video').addClass('act');
		    $('.main-wrapper').addClass('active');
		    $('.bg-wrapp .clip.active .bg').addClass('bg-hidden');
			playInst();
    });
	$('.close-full-video').on('click', function(){
	       $(this).removeClass('act');
		   $('.hide-content').removeClass('act');
		   $('.main-wrapper').removeClass('active');
		   $('.bg-wrapp .clip.active .bg').removeClass('bg-hidden');
		pauseInst();
	});



    });

    /*============================*/
	/* SWIPER SLIDE */
	/*============================*/

	var swipers = [], winW, winH, winScr, _isresponsive, smPoint = 480, mdPoint = 992, lgPoint = 1200, addPoint = 1600, _ismobile = navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);

	function pageCalculations(){
		winW = $(window).width();
		winH = $(window).height();
	}

	pageCalculations();


	function updateSlidesPerView(swiperContainer){
		if(winW>=addPoint) return parseInt(swiperContainer.attr('data-add-slides'),10);
		else if(winW>=lgPoint) return parseInt(swiperContainer.attr('data-lg-slides'),10);
		else if(winW>=mdPoint) return parseInt(swiperContainer.attr('data-md-slides'),10);
		else if(winW>=smPoint) return parseInt(swiperContainer.attr('data-sm-slides'),10);
		else return parseInt(swiperContainer.attr('data-xs-slides'),10);
	}

	function resizeCall(){
		pageCalculations();

		$('.swiper-container.initialized[data-slides-per-view="responsive"]').each(function(){
			var thisSwiper = swipers['swiper-'+$(this).attr('id')], $t = $(this), slidesPerViewVar = updateSlidesPerView($t), centerVar = thisSwiper.params.centeredSlides;
			thisSwiper.params.slidesPerView = slidesPerViewVar;
			thisSwiper.reInit();
			if(!centerVar){
				var paginationSpan = $t.find('.pagination span');
				var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
				if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
				else $t.removeClass('pagination-hidden');
				paginationSlice.show();
			}
		});
	}
	if(!_ismobile){
		$(window).resize(function(){
			resizeCall();
		});
	} else{
		window.addEventListener("orientationchange", function() {
			resizeCall();
		}, false);
	}

	/*=====================*/
	/* 07 - swiper sliders */
	/*=====================*/
	function initSwiper(){
		var initIterator = 0;
		$('.swiper-container').each(function(){
			var $t = $(this);

			var index = 'swiper-unique-id-'+initIterator;

			$t.addClass('swiper-'+index + ' initialized').attr('id', index);
			$t.find('.pagination').addClass('pagination-'+index);

			var autoPlayVar = parseInt($t.attr('data-autoplay'),10);

			var slidesPerViewVar = $t.attr('data-slides-per-view');
			if(slidesPerViewVar == 'responsive'){
				slidesPerViewVar = updateSlidesPerView($t);
			}
			else slidesPerViewVar = parseInt(slidesPerViewVar,10);

			var directionVar = $t.attr('data-direction');
			if(!directionVar){directionVar='horizontal';}

			var loopVar = parseInt($t.attr('data-loop'),10);
			var speedVar = parseInt($t.attr('data-speed'),10);
            var centerVar = parseInt($t.attr('data-center'),10);
			swipers['swiper-'+index] = new Swiper('.swiper-'+index,{
				speed: speedVar,
				pagination: '.pagination-'+index,
				mode: directionVar,
				loop: loopVar,
				paginationClickable: true,
				autoplay: autoPlayVar,
				slidesPerView: slidesPerViewVar,
				keyboardControl: true,
				calculateHeight: true,
				simulateTouch: true,
				roundLengths: true,
				centeredSlides: centerVar,
				onInit: function(swiper){
					var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
                       $t.find('.swiper-slide').addClass('active');
					if($t.closest('.swiper-6').length) {
                     	  $('.prev-item').on('click', function(){
                            var eqIndex = $('.prev-item').index(this);
                            $('.prev-item').removeClass('active');
                            $(this).addClass('active');
                            swiper.swipeTo(eqIndex);
                            swiper.stopAutoplay();
                            return false;
                        });
			       }
				},
				onSlideChangeStart: function(swiper) {
					var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
					$('.count span i').text(activeIndex+1);
					if($t.closest('.swiper-two-bg').length){
						$t.closest('.main-wrapper').find('.bg-wrapp .clip.active').removeClass('active');
						$t.closest('.main-wrapper').find('.bg-wrapp .clip').eq(activeIndex).addClass('active');
					}
					if($t.closest('.anime-slide').length){
					   $t.find('.swiper-slide.active').removeClass('active');
					}
				},
				onSlideChangeEnd: function(swiper){
					var activeIndex = (loopVar===true)?swiper.activeIndex:swiper.activeLoopIndex;
					if($t.closest('.swiper-6').length){
					   var eqIndex = $('.prev-item').index(this);
						$('.prev-item').removeClass('active');
                        $t.closest('.main-wrapper').find('.prev-item').eq(activeIndex).addClass('active');
				    }
					if($t.closest('.anime-slide').length){
					   var qVal = $t.find('.swiper-slide-active').attr('data-val');
					   $t.find('.swiper-slide[data-val="'+qVal+'"]').addClass('active');
					}
				}
			});
			swipers['swiper-'+index].reInit();
				if($t.attr('data-slides-per-view')=='responsive'){
					var paginationSpan = $t.find('.pagination span');
					var paginationSlice = paginationSpan.hide().slice(0,(paginationSpan.length+1-slidesPerViewVar));
					if(paginationSlice.length<=1 || slidesPerViewVar>=$t.find('.swiper-slide').length) $t.addClass('pagination-hidden');
					else $t.removeClass('pagination-hidden');
					paginationSlice.show();
				}
			initIterator++;
		});

       $('.swiper-container.connected-to-bottom-swiper').each(function(){
			var $t = $(this);
			if($t.closest('.testi-wrapper').find('.connected-to-top-swiper').length){
				swipers['swiper-'+$t.attr('id')].addCallback('SlideChangeStart', function(swiper){
					swipers['swiper-'+$t.closest('.testi-wrapper').find('.connected-to-top-swiper').attr('id')].swipeTo(swiper.activeIndex);
				});
			}
		});
	}



	//swiper arrows

	$('.swiper-arrow-left').on('click', function(){
		swipers['swiper-'+$(this).closest('.arrows').find('.swiper-container').attr('id')].swipePrev();
	});

	$('.swiper-arrow-right').on('click', function(){
		swipers['swiper-'+$(this).closest('.arrows').find('.swiper-container').attr('id')].swipeNext();
	});

	/*============================*/
	/* DROPDOWN */
	/*============================*/

	$('.nav-menu-icon a').on('click', function() {
	  if ($('nav').hasClass('slide-menu')){
		   $('nav').removeClass('slide-menu');
		   $(this).removeClass('active');
		   $('body').css({'overflow':'auto'});
	  }else {
		   $('nav').addClass('slide-menu');
		   $(this).addClass('active');
		   $('body').css({'overflow':'hidden'});
	  }
		return false;
	 });


		$('nav > ul > li').on('click', function(){
		   if ($(this).find('.dropmenu').hasClass('slidemenu')) {
			   $(this).find('.dropmenu').removeClass('slidemenu');
		   }else{
			   $('nav > ul > li').find('.dropmenu').removeClass('slidemenu');
			   $(this).find('.dropmenu').addClass('slidemenu');
		   }
		});


	/***********************************/
	/*VIDEO POPUP*/
	/**********************************/

	$(document).on('click', '.video-open', function(){
		$('.video-player').addClass('active');
		var videoSource = $(this).attr('data-src');
		setTimeout(function(){$('.video-player iframe').attr('src', videoSource);}, 1000);
		$('body').css({'overflow':'hidden'});
	});

	$('.video-player .close-iframe').on('click', function(){
		$('.video-player iframe').attr('src', '');
		setTimeout(function(){$('.video-player').removeClass('active');}, 300);
		$('body').css({'overflow':'auto'});
	});

	/*============================*/
	/* WINDOW LOAD */
	/*============================*/

	$(window).load(function(){
		$('.preload').fadeOut();
		initSwiper();
	});


	if ($(".fancybox").length){
	    $(".fancybox").fancybox({
			afterLoad          : function () {
				initSwiper();

	     },
	        helpers : {
				title : { type : 'inside' }
			   }

		 });
	}




})(jQuery, window, document);
