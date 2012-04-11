/*
 * Style File - jQuery plugin for styling file input elements
 *  
 * Copyright (c) 2007-2009 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Based on work by Shaun Inman
 *   http://www.shauninman.com/archive/2007/09/10/styling_file_inputs_with_css_and_the_dom
 *
 */

(function($) {
    
    $.fn.filestyle = function(options) {
                
        /* TODO: This should not override CSS. */
        var settings = {
            width : 250
        };
                
        if(options) {
            $.extend(settings, options);
        };
                        
        return this.each(function() {
            
            var self = this;
            var wrapper = $("<div class='filebtn'>")
                            .css({
                                "width": "203px",
                                "height": "30px",
                                "background": "url('images/addFiles.png') 0 0 no-repeat",
                                "background-position": "right",
                                "display": "inline",
                                "position": "absolute",
								"margin-left":"-168px",
                              //  "overflow": "hidden"
                            });
            var valname = $('.txtpart')             
            var filename = $('<input class="file" placeholder="Choose File">')
                             .addClass($(self).attr("class"))
                             .css({
                                 "display": "inline",
								 "color": "#666666",
								 "font-size": "11px",
                                 "width": "150px"
                             });

            $(self).before(filename);
            $(self).wrap(wrapper);

            $(self).css({
                        "position": "absolute",
                        "height": "30px",
                        "width": "203px",
                        "display": "inline",
                        "cursor": "pointer",
                        "opacity": "0.0"
                    });

            if ($.browser.mozilla) {
                if (/Win/.test(navigator.platform)) {
                    $(self).css("margin-left", "-142px");                    
                } else {
                    $(self).css("margin-left", "-168px");                    
                };
            } else {
                $(self).css("margin-left", settings.imagewidth - settings.width + "px");                
            };

            $(self).bind("change", function() {
                valname.html($(self).val());
				filename.val($(self).val());
            });
      
        });
        

    };
    
})(jQuery);
