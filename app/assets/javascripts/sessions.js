$(document).ready(function() {
	setTimeout("animation()", 1000);

	$(".on_off_checkbox").iphoneStyle();
	$('.tip a').tipsy({
		gravity: 'sw'
	});
	$('.tip :text,:password').tipsy({
		trigger: 'focus',
		gravity: 'w'
	});

	$('#formLogin').submit(function() {
		if (document.formLogin.username.value == "" || document.formLogin.password.value == "") {
			loginError("Please Input Username / Password");
			return false;
		};

		var options = {
			success: function(data) {
				showSuccess("Login as " + data.username);
				Login();
			},
			error: function (xhr, ajaxOptions, thrownError) {
				data = JSON.parse(xhr.responseText);
				loginError(data.error);
		  },
			// post-submit callback 
			dataType: 'json' // 'xml', 'script', or 'json' (expected server response type) 
		};

		$(this).ajaxSubmit(options);

		return false;
	});

	// $('#alertMessage').click(function() {
	// 	hideTop();
	// });

	$(this).ajaxError(function(event, request, setting) {
		// alert(request);
	});
});

function Login() {
	$("#login").queue('login', [
		function(next) {
			$(this).animate({
				opacity: 1,
				top: '49%'
			}, 200, next);
		},
		function(next) {
			$('.userbox').show().animate({
				opacity: 1
			}, 500);
			$(this).animate({
				opacity: 0,
				top: '60%'
			}, 500, next);
		},
		function(next) {
			$(".text_success").slideDown();
			$("#successLogin").animate({
				opacity: 1,
				height: "200px"
			}, 500, next);
		}
	]).dequeue('login');
	setTimeout("window.location.href='/'", 2500);
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

function loading(name, overlay) {
	$('body').append('<div id="overlay"></div><div id="preloader">' + name + '..</div>');
	if (overlay == 1) {
		$('#overlay').css('opacity', 0.1).fadeIn(function() {
			$('#preloader').fadeIn();
		});
		return false;
	}
	$('#preloader').fadeIn();
}

function unloading() {
	$('#preloader').fadeOut('fast', function() {
		$('#overlay').fadeOut();
	});
}

function animation() {
	$(document).queue('start', [
		function(next) {
			$('#login').show().animate({
				opacity: 1
			}, 2000);
			$('.logo').show().animate({
				opacity: 1,
				top: '40%'
			}, 800, next);
		},
		function(next) {
			$('.logo').show().delay(500).animate({
				opacity: 1,
				top: '12%'
			}, 300, next);
		},
		function(next) {
			$('.formLogin').animate({
				opacity: 1,
				left: '0'
			}, 300);
			$('.userbox').animate({
				opacity: 0
			}, 200).hide();
		}
	]).dequeue('start');
}

function loginError(str) {
	showError(str);
	$('.inner').jrumble({
		x: 4,
		y: 0,
		rotation: 0
	});
	$('.inner').trigger('startRumble');
	setTimeout('$(".inner").trigger("stopRumble")', 500);
}