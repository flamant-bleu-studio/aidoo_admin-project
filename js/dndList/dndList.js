$(function() {
	
	$.fn.dndList = function(params) {
		
		var defaults = {
				draggableItemClass : "drag",
		        openNodeClass : "dnd_listOpen",
		        closeNodeClass : "dnd_listClosed",
		        expanderClass : "dnd_expander"
		    };   
		
		params = $.extend(defaults, params); 
		
	    $('.closeallmenu').bind('click', $.bind(this, function(){
			$("li").each(function() {
				$(this).removeClass(params.openNodeClass).addClass(params.closeNodeClass);
			});
			return false;
		}));
		
	    $('.openallmenu').bind('click', $.bind(this, function(){
			$("li").each(function() {
				$(this).removeClass(params.closeNodeClass).addClass(params.openNodeClass);
			});
			return false;
		}));
		
		
		
		// Ajout d'une dropzone avant chaque balise li
	    $(this).find('li').prepend('<div class="dropzone"></div>');
	
	    $(this).find('dl.drop, .dropzone').droppable({
	        accept: function(d) { 
	            if(d.parents().has($(this))){
	                return true;
	            }
	        },
	        tolerance: 'pointer',
	        drop: function(e, ui) {
	    	
	        	// Element qui accueille l'element droppé
	            var li = $(this).parent();
	            // Est ce que l'element droppé est placé en tant qu'enfant du receveur ?
	            var child = !$(this).hasClass('dropzone');
	           
	            // S'il ne reste plus d'enfant dans l'ancien parent, on lui retire la classe listOpen, c'est triste :'(
	            if(ui.draggable.siblings().length == 1)
	            	ui.draggable.parent().parent().removeClass('dnd_listOpen');
 
	            // Si l'element droppé est placé en enfant, et que le nouveau parent ne contient pas d'ul, on le crée
	            if(child && li.children('ul').length == 0)
	            	li.append('<ul/>');
	            
	            // Si l'element droppé est placé en enfant, on le place dans le ul, sinon juste avant ce nouveau parent
	            if(child) 
	            	li.addClass(params.openNodeClass).removeClass(params.closeNodeClass).children('ul').append(ui.draggable);
	            else 
	            	li.before(ui.draggable);
	            
	            // Remise à zero des styles
	            li.find('dl.drop, div.dropzone').css({ backgroundColor: ''});
	            
	            if($(this).hasClass('dropzone'))
	            {
	            	params.onDropInterline.call(this, {
	            		src : $(ui.draggable).attr('id').substr(4),
	            		dst : $(this).parent().attr("id").substr(4)
	            	});
	            }
	            else
	            {
	            	params.onDropElement.call(this, {
	            		src : $(ui.draggable).attr('id').substr(4),
	            		dst : $(this).parent().attr("id").substr(4)
	            	});
	            }            
	            
	        },
	        over: function() {
	            $(this).filter('dl.drop').css({ backgroundColor: '#ccc' });
	            $(this).filter('div.dropzone').css({ backgroundColor: '#ccc' });
	        },
	        out: function() {
	            $(this).filter('dl.drop').css({ backgroundColor: '' });
	            $(this).filter('div.dropzone').css({ backgroundColor: '' });
	        }
	    });
	    
	    $(this).find('li.'+params.draggableItemClass).draggable({
	        handle: ' > dl',
	        opacity: .8,
	        addClasses: false,
	        helper: 'clone',
	        zIndex: 100
	    });
	    
	    // Toggle
	    $(this).find('a.'+params.expanderClass).live('click', function() {
			$(this).parent().parent().toggleClass(params.openNodeClass).toggleClass(params.closeNodeClass);
			return false;
		});
	    
	    $(this).find('dl').live('mouseover', function() {
	    	$(this).find('dt.actions a').css({
	    		"opacity": 		"1",
	    	    "filter" : 		"alpha(opacity=100)"
	    	});
	    	$(this).css({ backgroundColor: '#9acbe0' });
		});
	    
	    $(this).find('dl').live('mouseout', function() {
	    	$(this).find('dt.actions a').css({
	    		"opacity": 		"0.1",
	    	    "filter" : 		"alpha(opacity=10)"
	    	});
	    	$(this).css({ backgroundColor: '' });
		});

	    
		return this;
	}

});

