(function($){	
	$.confirm = function(params){		
		if($('#confirmOverlay').length){
			return false;
		}		
		var buttonHTML = '';
		$.each(params.buttons,function(name,obj){					
			buttonHTML += '<a href="#" class="uibutton large '+obj['class']+'">'+name+'<span></span></a>';			
			if(!obj.action){
				obj.action = function(){};
			}
		});
		
	  $('body').append('<div id="confirmOverlay"></div><div id="confirmBox"><h1>'+params.title+'</h1><p>'+params.message+'</p><div id="confirmButtons">'+buttonHTML+'</div></div>');
	  $('#confirmOverlay').css('opacity',0.5).fadeIn(400);
		$('#confirmBox').fadeIn(400);
		var buttons = $('#confirmBox .uibutton');
		i = 0;
		$.each(params.buttons,function(name,obj){
			buttons.eq(i++).click(function(){
				obj.action();
				$.confirm.hide();
				return false;
			});
		});
	}

	$.confirm.hide = function(){
		
		$('#confirmBox').fadeOut(function(){
			$(this).remove();						  
		});
		$('#confirmOverlay').fadeOut(function() {
			$(this).delay(50).remove();
		});	
	}	
})(jQuery);