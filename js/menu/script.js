$(document).ready(function(){
	
	$('ul.dndList').each(function() {
		var id = $(this).attr('id');
		
		$('#'+id).dndList({
			onDropInterline : function(opt){
				move_to_next_sibling_menu_node(opt.src, opt.dst);
			},
			onDropElement : function(opt){
				update_parent_menu_node(opt.src, opt.dst);
			}
		});
	});
	
	$('.confirmDeleteMenuFolder').on('click', function(e){
		e.preventDefault();
		
		var href = $(this).attr('href');
		
		bootbox.dialog(I18n.t("confirm_delete_folder"), [{
		    "label" : I18n.t("confirm_delete_folder_label_button_folder_only"),
		    "class" : "btn-danger",
		    "callback": function() {
		    	window.location.href = href;
		    }
		},{
		    "label" : I18n.t("confirm_delete_folder_label_button_folder_and_items"),
		    "class" : "btn-danger",
		    "callback": function() {
		    	window.location.href = href+'/deletechildren';
		    }
		},{
		    "label" : I18n.t("confirm_delete_folder_label_button_folder_and_items_and_contents"),
		    "class" : "btn-danger",
		    "callback": function() {
		    	window.location.href = href+'/deletechildrenandcontent';
		    }
		}, {
		    "label" : I18n.t("cancel"),
		    "class" : "btn-default"
		},]);
	});
	
	$('.confirmDeleteMenuItemWhitContent').on('click', function(e){
		e.preventDefault();
				
		var href = $(this).attr('href');
		
		bootbox.dialog(I18n.t("confirm_delete_item"), [{
		    "label" : I18n.t("confirm_delete_item_label_button_item_only"),
		    "class" : "btn-danger",
		    "callback": function() {
		    	window.location.href = href;
		    }
		},{
		    "label" : I18n.t("confirm_delete_item_label_button_item_only_and_content"),
		    "class" : "btn-danger",
		    "callback": function() {
		    	window.location.href = href+'/deletecontent';
		    }
		}, {
		    "label" : I18n.t("cancel"),
		    "class" : "btn-default"
		},]);
	});
	
	$('.confirmDeleteMenuItem').on('click', function(e){
		e.preventDefault();
		
		var href = $(this).attr('href');
		
		bootbox.dialog(I18n.t("confirm_delete_item"), [{
		    "label" : I18n.t("delete"),
		    "class" : "btn-danger",
		    "callback": function() {
		    	window.location.href = href;
		    }
		}, {
		    "label" : I18n.t("cancel"),
		    "class" : "btn-default"
		},]);
	});
	
	$('.confirmDeleteMenu').on('click', function(e){
		e.preventDefault();
		
		var href = $(this).attr('href');
		
		bootbox.dialog(I18n.t("confirm_delete_menu"), [{
		    "label" : I18n.t("delete"),
		    "class" : "btn-danger",
		    "callback": function() {
		    	window.location.href = href;
		    }
		}, {
		    "label" : I18n.t("cancel"),
		    "class" : "btn-default"
		},]);
	});
});

function update_parent_menu_node(src, dst) {
	var datas = {
		"src" : src,
		"dst" : dst
	};
	$.post(
			baseUrl+'/ajax/menu/updateParent',
		datas, 
		function(results) {
			if (results['error'])
			{
				if (results['message'])
					alert("Une erreur est survenue :\n" + results["message"]);
				else
					alert("Une erreur est survenue ...\nActualisez la page et réessayez.");
			}
		},
		"json"
	);
}

function move_to_next_sibling_menu_node(src, dst) {
	var datas = {
		"src" : src,
		"dst" : dst
	};
	$.post(
			baseUrl+'/ajax/menu/moveprevioussibling',
		datas,
		function(results) {
			if (results['error'])
			{
				if (results['message'])
					alert("Une erreur est survenue :\n" + results["message"]);
				else
					alert("Une erreur est survenue ...\nActualisez la page et réessayez.");
			}
		},
		"json"
	);
}