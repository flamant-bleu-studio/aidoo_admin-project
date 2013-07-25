$(document).ready(function(){
	
	// IFRAME Layout
	
	$('a.iframe').fancybox({
		'scrolling'		: 'auto',
		'width'			: '75%',
		'height'		: '100%',
		'titleShow'		: false,
		'autoScale'		: true,
		'type'			: 'iframe',
		'openEffect'	: 'elastic',
		'closeEffect'	: 'elastic'
	});
	
	// Tooltip
	
	$('.showTooltip').tooltip();
});