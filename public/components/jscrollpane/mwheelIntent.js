/**
* @author trixta
* @version 1.2
*/
(function ($) {

    var mwheelI = {
        pos: [-260, -260]
    },
	minDif = 3,
	doc = document,
	root = doc.documentElement,
	body = doc.body,
	longDelay, shortDelay;

    function unsetPos() {
        if (this === mwheelI.elem) {
            mwheelI.pos = [-260, -260];
            mwheelI.elem = false;
            minDif = 3;
        }
    }

    $.event.special.mwheelIntent = {
        setup: function () {
            var jElm = $(this).bind('mousewheel', $.event.special.mwheelIntent.handler);
            if (this !== doc && this !== root && this !== body) {
                jElm.bind('mouseleave', unsetPos);
            }
            jElm = null;
            return true;
        },
        teardown: function () {
            $(this)
			.unbind('mousewheel', $.event.special.mwheelIntent.handler)
			.unbind('mouseleave', unsetPos);
            return true;
        },
        handler: function (e, d) {
            var pos = [e.clientX, e.clientY];
            if (this === mwheelI.elem || Math.abs(mwheelI.pos[0] - pos[0]) > minDif || Math.abs(mwheelI.pos[1] - pos[1]) > minDif) {
                mwheelI.elem = this;
                mwheelI.pos = pos;
                minDif = 250;

                clearTimeout(shortDelay);
                shortDelay = setTimeout(function () {
                    minDif = 10;
                }, 200);
                clearTimeout(longDelay);
                longDelay = setTimeout(function () {
                    minDif = 3;
                }, 1500);
                e = $.extend({}, e, { type: 'mwheelIntent' });
                return $.event.handle.apply(this, arguments);
            }
        }
    };
    $.fn.extend({
        mwheelIntent: function (fn) {
            return fn ? this.bind("mwheelIntent", fn) : this.trigger("mwheelIntent");
        },

        unmwheelIntent: function (fn) {
            return this.unbind("mwheelIntent", fn);
        }
    });

    $(function () {
        body = doc.body;
        //assume that document is always scrollable, doesn't hurt if not
        $(doc).bind('mwheelIntent.mwheelIntentDefault', $.noop);
    });
})(jQuery);

		(function(){
    
    var special = jQuery.event.special,
        uid1 = 'D' + (+new Date()),
        uid2 = 'D' + (+new Date() + 1);
        
    special.scrollstart = {
        setup: function() {
            
            var timer,
                handler =  function(evt) {
                    
                    var _self = this,
                        _args = arguments;
                    
                    if (timer) {
                        clearTimeout(timer);
                    } else {
                        evt.type = 'scrollstart';
                        jQuery.event.handle.apply(_self, _args);
                    }
                    
                    timer = setTimeout( function(){
                        timer = null;
                    }, special.scrollstop.latency);
                    
                };
            
            jQuery(this).bind('scroll', handler).data(uid1, handler);
            
        },
        teardown: function(){
            jQuery(this).unbind( 'scroll', jQuery(this).data(uid1) );
        }
    };
    
    special.scrollstop = {
        latency: 300,
        setup: function() {
            
            var timer,
                    handler = function(evt) {
                    
                    var _self = this,
                        _args = arguments;
                    
                    if (timer) {
                        clearTimeout(timer);
                    }
                    
                    timer = setTimeout( function(){
                        
                        timer = null;
                        evt.type = 'scrollstop';
                        jQuery.event.handle.apply(_self, _args);
                        
                    }, special.scrollstop.latency);
                    
                };
            
            jQuery(this).bind('scroll', handler).data(uid2, handler);
            
        },
        teardown: function() {
            jQuery(this).unbind( 'scroll', jQuery(this).data(uid2) );
        }
    };
    
})();
		
function jsHover($el){
		// the extension functions and options 	
					extensionPlugin 	= {		
						extPluginOpts	: {
							mouseLeaveFadeSpeed	: 500,
							hovertimeout_t		: 1000,
							useTimeout			: false,
							deviceWidth			: 980
						},
						hovertimeout	: null, // timeout to hide the scrollbar
						isScrollbarHover: false,// true if the mouse is over the scrollbar
						elementtimeout	: null,	// avoids showing the scrollbar when moving from inside the element to outside, passing over the scrollbar
						isScrolling		: false,// true if scrolling
						addHoverFunc	: function() {
							
							// run only if the window has a width bigger than deviceWidth
							if( $(window).width() <= this.extPluginOpts.deviceWidth ) return false;
							var instance		= this;
							$.fn.jspmouseenter 	= $.fn.show;
							$.fn.jspmouseleave 	= $.fn.fadeOut;
							var $vBar			= this.getContentPane().siblings('.jspVerticalBar').hide();
							$el.bind('mouseenter.jsp',function() {
								
								$vBar.stop( true, true ).jspmouseenter();
								if( !instance.extPluginOpts.useTimeout ) return false;
								clearTimeout( instance.hovertimeout );
								instance.hovertimeout 	= setTimeout(function() {
									if( !instance.isScrolling )
										$vBar.stop( true, true ).jspmouseleave( instance.extPluginOpts.mouseLeaveFadeSpeed || 0 );
								}, instance.extPluginOpts.hovertimeout_t );
							}).bind('mouseleave.jsp',function() {
								
								if( !instance.extPluginOpts.useTimeout )
									$vBar.stop( true, true ).jspmouseleave( instance.extPluginOpts.mouseLeaveFadeSpeed || 0 );
								else {
								clearTimeout( instance.elementtimeout );
								if( !instance.isScrolling )
										$vBar.stop( true, true ).jspmouseleave( instance.extPluginOpts.mouseLeaveFadeSpeed || 0 );
								}
							});
							
							if( this.extPluginOpts.useTimeout ) {
								
								$el.bind('scrollstart.jsp', function() {
								
									// when scrolling show the scrollbar
									clearTimeout( instance.hovertimeout );
									instance.isScrolling	= true;
									$vBar.stop( true, true ).jspmouseenter();
									
								}).bind('scrollstop.jsp', function() {
									
									// when stop scrolling hide the scrollbar (if not hovering it at the moment)
									clearTimeout( instance.hovertimeout );
									instance.isScrolling	= false;
									instance.hovertimeout 	= setTimeout(function() {
										if( !instance.isScrollbarHover )
											$vBar.stop( true, true ).jspmouseleave( instance.extPluginOpts.mouseLeaveFadeSpeed || 0 );
									}, instance.extPluginOpts.hovertimeout_t );
									
								});
								
								// wrap the scrollbar
								// we need this to be able to add the mouseenter / mouseleave events to the scrollbar
								var $vBarWrapper	= $('<div/>').css({
									position	: 'absolute',
									left		: $vBar.css('left'),
									top			: $vBar.css('top'),
									right		: $vBar.css('right'),
									bottom		: $vBar.css('bottom'),
									width		: $vBar.width(),
									height		: $vBar.height()
								}).bind('mouseenter.jsp',function() {									
									clearTimeout( instance.hovertimeout );
									clearTimeout( instance.elementtimeout );
									instance.isScrollbarHover	= true;				
									instance.elementtimeout	= setTimeout(function() {
										$vBar.stop( true, true ).jspmouseenter();
									}, 100 );	
								}).bind('mouseleave.jsp',function() {
									clearTimeout( instance.hovertimeout );
									instance.isScrollbarHover	= false;
									instance.hovertimeout = setTimeout(function() {
										if( !instance.isScrolling )
											$vBar.stop( true, true ).jspmouseleave( instance.extPluginOpts.mouseLeaveFadeSpeed || 0 );
									}, instance.extPluginOpts.hovertimeout_t );
								});
								$vBar.wrap( $vBarWrapper );
							}
						}
					},
					// the jScrollPane instance
					jspapi 			= $el.data('jsp');
				// extend the jScollPane by merging	
				$.extend( true, jspapi, extensionPlugin );

				jspapi.addHoverFunc();
			
	
	
	}	