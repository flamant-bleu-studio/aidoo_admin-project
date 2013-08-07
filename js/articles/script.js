$(document).ready(function(){
	$('.confirmDeleteArticle').on('click', function(e){
		e.preventDefault();
		
		var href = $(this).attr('href');
		
		bootbox.dialog(I18n.t("confirm_delete_article"), [{
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
	
	$('.confirmDeleteCategory').on('click', function(e){
		e.preventDefault();
		
		var href = $(this).attr('href');
		
		bootbox.dialog(I18n.t("confirm_delete_category"), [{
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