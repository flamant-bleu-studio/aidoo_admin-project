function updateFromIframe(datas){

	var tr = $("#datatable").find(".page_" + datas.id_page);

	tr.find(".title").text(datas.title[defaultLangId]);
	tr.find(".url_rewrite").text(datas.url_rewrite[defaultLangId]);
}

$(document).ready(function(){ 
	
	$("#datatable .typesPages").on("change", "select", function(){

		var elem = $(this),
			id = elem.attr("data-id"),
			tpl_id = elem.val();

		var parent = elem.parent();
		var html = parent.html();
		
		elem.parent().html($("<img src='"+baseUrl+"/images/loader.gif' />"));
		
		$.ajax({
			type: "POST",
			url: baseUrl+'/ajax/seo/updatetemplate',
			dataType: "json",
			data: {
				id : id,
				tpl_id : tpl_id
			},
			cache: false,
			error: function(results){
				alert("Une erreur est survenue ...\nActualisez la page et réessayez.");
			},
			success: function(results){
				if(results["error"] == true)
					alert("Une erreur est survenue :\n" + results["message"]);
				else {
					parent.html(html).find("select").val(tpl_id);
				}
			}
		});

		return false;
	});
	
	$('.deletepage').on('click', function(){
		if (confirm('Did you really wante to delete this page ? ("'+ $(this).data('url') +'")')) {
			$.ajaxCMS({
				url : "/seo/page/" + $(this).data('id'),
				type : "delete",
				success : function(e){
					if (!e.error) {
						$('.deletepage[data-id="' + e.id + '"]').parents('tr').hide('slow');
					}
				}
			});
		} 
		
		return false;
	});
	
});