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
	
	// DataTable
	
	$.extend( $.fn.dataTableExt.oStdClasses, {
		"sSortAsc": "header headerSortDown",
		"sSortDesc": "header headerSortUp",
		"sSortable": "header"
	});
	
	if($('#datatable, table.datatable').length){
		$('#datatable, table.datatable').dataTable({
			"oLanguage": {
				"sUrl": datatable_lang_file
			},
			"sPaginationType": "full_numbers",
			"aoColumnDefs": [
				{"bSortable": false, "aTargets": ["no_sorting"]},
				{ "sType": "title-string", "aTargets": ["sortByTitle"] },
				{ "sType": "data-sort", "aTargets": ["sortByDataSort"] }
			]
		});
	}
});

//Translations

I18n.defaultLocale = defaultLangCode;
I18n.locale = currentLangCode;
I18n.translations = {};