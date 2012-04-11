// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
// 

function initMenus() {
	$('ul#main_menu ul').hide();
	$('ul#main_menu ul li').append('<div class="arr"><span></span></div>');
	$('ul#main_menu li ').hover(function() {
		var menu = $(this).find('ul');
		$(menu).fadeIn('fast');
		$(this).on('mouseleave', function() {
			$(menu).fadeOut('fast');
		});
	});
}

$(document).ready(function() {
	initMenus();

	// icon  Logout 
	$('div.logout').hover(function() {
		var name = $(this).find('img').attr('alt');
		$(this).find('img').animate({
			opacity: 0.5
		}, 200, function() {
			$(this).attr('src', 'images/' + name + '.png').animate({
				opacity: 1
			}, 500);
		});
	}, function() {
		var name = $(this).find('img').attr('name');
		$(this).find('img').animate({
			opacity: 0.5
		}, 200, function() {
			$(this).attr('src', 'images/' + name + '.png').animate({
				opacity: 1
			}, 500);
		});
	});
	// icon  setting 
	$('div.setting').hover(function() {
		$(this).find('img').addClass('gearhover');
	}, function() {
		$(this).find('img').removeClass('gearhover');
	});

	$('.logout').click(function() {
		setTimeout("window.location.href='/'", 500);

		$.ajax({
		  url: '/users/sign_out',
		  type: 'DELETE',
		});
	});

	// hide notify  Message with click
	$('#alertMessage').click(function() {
		hideTop();					 
	});
});

// loading & unloading
function loading(name, overlay) {
	$('body').append('<div id="overlay"></div><div id="preloader">' + name + '..</div>');
	if (overlay == 1) {
		$('#overlay').css('opacity', 0.4).fadeIn(400, function() {
			$('#preloader').fadeIn(400);
		});
		return false;
	}
	$('#preloader').fadeIn();
}

function unloading() {
	$('#preloader').fadeOut(400, function() {
		$('#overlay').fadeOut();
		$.fancybox.close();
	}).remove();
}

function showMessage(str, delay, klass) {
	if (!delay) delay = 3000;
	$.jGrowl(str, {
		life: delay,
		theme: klass
	});
}

function showError(str, delay) {
	showMessage(str, delay, 'error');
}

function showSuccess(str, delay) {
	showMessage(str, delay, 'success');
}

function showWarning(str, delay) {
	showMessage(str, delay, 'warning');
}

function showInfo(str, delay) {
	showMessage(str, delay, '');
}

function LoadContent(url) {
	$("#right_content").hide().empty().load(url, function() {
		$(this).fadeIn(400);
	});
}