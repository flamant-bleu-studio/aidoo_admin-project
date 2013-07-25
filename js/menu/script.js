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