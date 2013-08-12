$(document).ready(function(){
	
	// IFRAME Layout
	
	$('a.iframe').fancybox({
		'scrolling'		: 'auto',
		'width'			: '60%',
		'height'		: '70%',
		'titleShow'		: false,
		'autoScale'		: true,
		'autoSize'		: false,
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
	
	// Link and type
	
	$('input[name="link_type"]').change(function(){
		changeLinkType($(this).val());
	});
	
	changeLinkType($('input[name="link_type"]:checked').val()); // Default value
	
	/**
	 * IN : type value
	 * 0 : no link
	 * 1 : internal link
	 * 2 : external link
	 */
	function changeLinkType(type){
		console.log(type);
		type = parseInt(type);
		
		if (type == 0) {
			$('#form_link_internal').hide();
			$('#form_link_external').hide();
			$('#form_link_target_blank').hide();
		}
		else if (type == 1) {
			$('#form_link_internal').show();
			$('#form_link_external').hide();
			$('#form_link_target_blank').show();
		}
		else if (type == 2) {
			$('#form_link_internal').hide();
			$('#form_link_external').show();
			$('#form_link_target_blank').show();
		}
	}
});

//Translations

I18n.defaultLocale = defaultLangCode;
I18n.locale = currentLangCode;
I18n.translations = {};