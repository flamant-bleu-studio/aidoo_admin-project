$(document).ready(function(){

	/**
	 * INIT
	 */
	var temp 			= new Array(); 	// Datas temporaire au moment de l'évenement image_set
	var temp_id 		= null; 		// temp_id pour l'édition

	changeNbImage(); 	// Change l'affichage du nombre d'image
	
	/* Taille max aperçu image select */
	$("#image_preview").css("max-width", "120px");
	$("#image2_preview").css("max-width", "120px");
	
	/**
	 * DRAG & DROP des mignatures
	 */
	$("#image_manage").sortable({
		placeholder: 'highlight',
		tolerance: 'pointer',
		revert: true,
		delay: 300,
		update: function(event, ui) {
			generateOrder();
		}
	}).disableSelection();
	
	/**
	 * ========
	 * Dates des diapos
	 * ========
	 */
	$("#isPermanent").on("click", function(){
		showDate(!$(this).is(":checked"));
	});
	
	function showDate(state) {
		if(state) // true
			$('#form_date').show(); // Afichage des dates
		else // false
			$('#form_date').hide();
	}
	
	/**
	 * ========
	 * Liens sur les diapos
	 * ========
	 */
	$("#addLink").on("click", function(){
		showLink($(this).is(':checked'));
	});
	
	function showLink(val){
		if ( val )
			$("#link").show();
		else
			$("#link").hide();
	}
	
	$("#link_type-0").attr('checked', true);
	showLinkType(0);
	
	$("#link_type-0").on("click", function(){
		showLinkType(0);
	});
	
	$("#link_type-1").on("click", function(){
		showLinkType(1);
	});

	function showLinkType(i){
		if(i == 1)
		{
			$("#page_link_internal").hide();
			$("#page_link_external").show();
		}
		else if (i == 0)
		{
			$("#page_link_internal").show();
			$("#page_link_external").hide();
		}
	}
	
	/**
	 * ========
	 * Suppression d'une image
	 * ========
	 */
	$("a.image_delete").on("click", function(e) {
		e.preventDefault();
		
		var selector_img = $(this).siblings("img.galerie_image"); // Selection de l'image que lon souhaite supprimer
		var id = $(selector_img).attr("rel"); // Récupération de l'id de l'image qu'on souhaite supprimer
		
		$("#form_galerie [name^=datas\\["+id+"\\]]").remove();
		
		incrementDiapo--; 
		changeNbImage(); // Décrémentation d'une image sur le nombre total
		$(this).parent().remove(); // Suppression de l'image dans le html
		generateOrder(); // Calcul de l'ordre des images
	});
	
	/**
	 * ========
	 *  Ajout / modification d'une image 
	 * ========
	 */
	
	/* Event lors de l'envoi d'une image */
	$("#image").bind("image_set", function(e, params){
		if( params.custom )
		{
			temp["path_thumb"] = params.custom.thumbnail_url;
		    temp["height"] = params.custom.height;
			temp["width"] = params.custom.width;
			temp["theight"] = params.custom.theight;
			temp["twidth"] = params.custom.twidth;
		}
	});
	
	$("#image2").bind("image_set", function(e, params){
		if( params.custom )
		{
			temp["path_thumb2"] = params.custom.thumbnail_url;
		}
	});
	
	$("#image_add, #image_manage .galerie_image").on("click", function(e){
		
		if ( $(this).attr("rel") ) // Vrai si edition d'une image
			temp_id = $(this).attr("rel"); // Récupération de l'id à éditer
		
		if( temp_id != null) // Edition, on charge les données dans le formulaire
		{
			$("#image").attr("value", getInput(temp_id, "path"));
			$("#image_preview").attr("src", getInput(temp_id, "path_thumb"));
			$("#imageSelectImg").css("display", "inline");
			
			if ($("#image2").length > 0) {
				$("#image2").attr("value", getInput(temp_id, "path2"));
				$("#image2_preview").attr("src", getInput(temp_id, "path_thumb2"));
				$("#image2SelectImg").css("display", "inline");
			}
			
			$('#description').val(getInput(temp_id, "description"));
			
			if(getInput(temp_id, "external_page") != "")
				$("#external_page").attr("value", getInput(temp_id, "external_page"));
				$("#bg_color_image").attr("value", getInput(temp_id, "bg_color_image"));
			
			if( getInput(temp_id, "page_link") != "" ){	
				$("#page_link").val(getInput(temp_id, "page_link"));
			}
			
			if( getInput(temp_id, "link_type") == 1){
				$("#link_type-1").attr('checked', true);
				$("#link_type-0").attr('checked', false);
				showLinkType(1);
			}
			else
			{
				$("#link_type-1").attr('checked', false);
				$("#link_type-0").attr('checked', true);
			}
			
			if(getInput(temp_id, "window") == "true")
				$("#window").attr('checked', true);
			else
				$("#window").attr('checked', false);
			
			if(getInput(temp_id, "addLink") == "true"){
				$("#addLink").attr('checked', true);
				showLink(true);
			}
			else{
				$("#addLink").attr('checked', false);
				showLink(false);
			}
			
			if(getInput(temp_id, "isPermanent") == "true"){
				$("#isPermanent").attr('checked', true);
				showDate(false);
			}
			else{
				$("#isPermanent").attr('checked', false);
				showDate(true);
			}
			
			if(getInput(temp_id, "date_start") != "")
				$("#date_start").attr("value", getInput(temp_id, "date_start"));
			
			if(getInput(temp_id, "date_end") != "")
				$("#date_end").attr("value",getInput(temp_id, "date_end"));
		}
		
		$.fancybox({
			'autoScale'		: true,
			'autoDimensions': true,
			'titleShow'		: false,
			afterShow	: function(){				
				tinyMCE.execCommand('mceAddControl', false, 'description');
			},
			beforeClose: function(){
				$('#formImage').validationEngine('hideAll');
				temp_id = null; // ID d'édition remis à null
				
				//tinyMCE.execCommand('mceFocus', false, 'description'); 
				tinyMCE.execCommand('mceRemoveControl', false, "description"); // Ferme le TinyMCE (pour la comptabilité avec fancybox) 

				$("#valid_image").unbind();
				$("#cancel_image").unbind();
				clearFormEdit(); // Appel de la fonction permettant de vider les champs du formulaire
				temp = new Array(); // Vide le tableau temporaire
			},
			'type'			: 'inline',
			'href' 			: '#edit_image'
		});
	});
	
	/**
	 * ========
	 * Bouton valid fancybox
	 * ========
	 */
	function fillInput(id, name, value){
		$("#form_galerie [name=datas\\["+id+"\\]\\["+name+"\\]]").val(value);
	}
	
	function getInput(id, name){
		return $("#form_galerie [name=datas\\["+id+"\\]\\["+name+"\\]]").val();
	}
	
	$("#valid_image").on("click", function(e){
		e.preventDefault();
		
		if ( $("#formImage").validationEngine('validate') )
		{
			// Si edition : on garde l'ID en cours
			if( temp_id != null)
				var id = temp_id;
			// SINON création d'un nouveau formulaire de stockage et nouvel ID
			else
				id = createNewImageForm();

			// Remplissage des données	
			// Resettage des données uniquement si nouvelle image choisie
			if(temp_id == null || getInput(id, "path") != $("#image").val()){
				fillInput(id, "path", 			$("#image").val());
				fillInput(id, "path_thumb", 	temp["path_thumb"]);
				fillInput(id, "width", 			temp["width"]);
				fillInput(id, "height", 		temp["height"]);
				fillInput(id, "thumb_width", 	temp["twidth"]);
				fillInput(id, "thumb_height", 	temp["theight"]);
			}
			
			if(($("#image2").length > 0) && (temp_id == null || getInput(id, "path2") != $("#image2").val())){
				fillInput(id, "path2", 			$("#image2").val());
				fillInput(id, "path_thumb2", 	temp["path_thumb2"]);
			}
			
			if (tinyMCE.activeEditor != null)
				fillInput(id, "description", 	tinyMCE.activeEditor.getContent());
			else
				fillInput(id, "description", $("#bg_color_image").val());
			
			fillInput(id, "bg_color_image", $("#bg_color_image").val());
			fillInput(id, "isPermanent", 	($("#isPermanent").attr("checked")) ? "true" : "false");
			fillInput(id, "addLink", 		($("#addLink").attr("checked") != null) ? "true" : "false");
			fillInput(id, "window", 		($("#window").attr("checked") != null) ? "true" : "false");
			fillInput(id, "date_start", 	($("#date_start").val() != null) ? $("#date_start").val() : "");
			fillInput(id, "date_end", 		($("#date_end").val() != null) ? $("#date_end").val() : "");
			fillInput(id, "link_type", 		($("input[name='link_type']:checked").val() != null) ? $("input[name='link_type']:checked").val() : "");
			fillInput(id, "external_page", 	($("#external_page").val() != null) ? $("#external_page").val() : "");
			fillInput(id, "page_link", 		($("#page_link").val() != null) ? $("#page_link").val() : "");
					
			// Vider le formulaire
			clearFormEdit(); 
			
			// SI ajout d'une image : ajout vignette + changement nombre d'image + changement ordre
			if( temp_id == null ){			
				$("#image_manage").append("<div class='image'><a href='#' class='image_delete'></a><img class='galerie_image absolute' width='100' height='80' rel='"+id+"' src='"+temp["path_thumb"]+"'/></div>");
				changeNbImage();
				generateOrder();
			}
			// Si edition d'une image : modification vignette
			else {
				$("#image_manage img[rel="+temp_id+"]").attr("src", temp["path_thumb"]);
				if ($("#image2").length > 0)
					$("#image2_manage img[rel="+temp_id+"]").attr("src", temp["path_thumb2"]);
			}
			
			$.fancybox.close();
		}
		
		return false;
	});
	
	/**
	 * ========
	 * Bouton cancel fancybox 
	 * ========
	 */
	$("#cancel_image").on("click", function(){
		$.fancybox.close();
		return false;
	});
	
	/**
	 * ========
	 * FONCTIONS
	 * ========
	 */

	/**
	 * Créer un nouveau formulaire caché pour stocker les infos d'une nouvelle diapo
	 */
	function createNewImageForm(){
		
		var children = $("#form_template").children().clone();
		
		children.each(function(){
			$(this).attr("name", "datas["+incrementDiapo+"]["+$(this).attr("name")+"]");
		});
		
		$("#form_galerie").append(children);
		
		return incrementDiapo++;
	}
	
	/**
	 *  Génère l'ordre des images 
	 */
	function generateOrder(){
		
		order = new Array(); // Remise à zéro du tableau
		$("#image_manage img.galerie_image").each(function(){
			if($(this).attr("rel"))
				order.push($(this).attr("rel")); // Stock l'id de l'élément
		});
		$("#ordre_image").attr("value", order.join(","));
	}

	/**
	 *  Change le nombre d'images 
	 */
	function changeNbImage(){
		$("#nbImage").text(incrementDiapo);
	}
	
	/**
	 *  Nettoie le formulaire 
	 */
	function clearFormEdit()
	{
		$("#image").val("");
		$("#image2").val("");
		imageCancelImage();
		if ($("#image2").length > 0 && typeof window.image2CancelImage == 'function')
			image2CancelImage();
		$("#description").val("");
		$("#bg_color_image").val("");
		$("#isPermanent").attr('checked', true);
		$("#window").attr('checked', false);
		showDate(false);
		$("#date_start").val("");
		$("#date_end").val("");
		$("#external_page").val("");
		$("#link_type-0").attr('checked', true);
		$("#page_link").val("");
		showLinkType(0);
		$("#addLink").attr("checked", false);
		showLink(false);
	}
});