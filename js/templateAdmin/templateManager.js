
;(function($) {

    $.templateManager = function(el, options) {

        // plugin's default options
        var defaults = {
        	tplDatas: '{}',
        	typeIndex: {},
            lastId: 1,
            defaultTpl: null,
            homePageIdTpl: 1,
            urlDeleteTpl: ''
        }

        var plugin = this;
        plugin.settings = {}

        // Template modifié ?
        var tplUpdated = false;
        var tpmDataUpdate = false;
        
        var currentTplId;
        var currentTplType = 'classic';
        
        // Dom object var
        var oBlocsList;
        var oDraggable;
        
        var oTemplate;
        var oPlaceholders;
       
        var oSelectTpl;
        var oSelectTplToDuplicate;
        
        var oSelectType;
        
        var tempTplDatas;

        var init = function() {
        	
            plugin.settings = $.extend({}, defaults, options);
            plugin.el = el;

            plugin.settings.tplDatas = $.parseJSON(plugin.settings.tplDatas);
            
            initDom();
            initIterface();
            initEvents();
            
            currentTplId = oSelectTpl.val();
        }
        
        var initDom = function() {
        	oBlocsList		= $("#liste_bloc");
        	oDraggable 		= oBlocsList.find(".draggable");
        	
        	oTemplate		= $("#template");
        	oPlaceholders 	= oTemplate.find(".droppable");
        	
        	oSelectTpl = $('#select_template');
        	
        	oSelectTplToDuplicate 		= $("#select_template_duplicate");
        	oFormSelectTplToDuplicate 	= $("#form_select_template_duplicate");
        	
        	oSelectType = $('#typeSelect button');
        }
        
        var initIterface = function() {
        	
        	// DRAG
        	oDraggable.draggable({ 
        		handle: '.info',
    			revert: 'invalid',
    			cursor: 'move',
    			helper: function(){
    				// Création d'un élement custom pour le drag&drop
    				return $("<div class='template_item "+$(this).find('.infos .type').text()+"'>"+$(this).find('.infos .title').text()+"</div>");
    			}
    		});
        	
        	// DROP
        	oPlaceholders.droppable({
    			over: function(event, ui) {
    				// test si l'event est déclenché par draggable ou sortable
    				if(event.originalEvent.handleObj.namespace == "draggable"){
    					$(this).addClass("drophover");
    				}
    			},
    			out: function(event, ui) {
    				// test si l'event est déclenché par draggable ou sortable
    				if(event.originalEvent.handleObj.namespace == "draggable"){
    					$(this).removeClass("drophover");
    				}
    			},
    			drop: function(event, ui){
    				// test si l'event est déclenché par draggable ou sortable
    				if(event.originalEvent.handleObj.namespace == "draggable"){
    					// Récupération des infos
    					var type = ui.draggable.find(".infos .type").text();
    					var title = ui.draggable.find(".infos .title").text();
    					var real_id = ui.draggable.find(".infos .id").text();
    					var id = "bloc-"+plugin.settings.lastId++;
    	
    					// Ajout de l'élement au placeholders
    					$(this).find("div.drop_zone").before("<div class='template_item "+type+"' id='"+id+"' title='"+title+"' realid='"+real_id+"'>"+title+"<a href='#' class='deleteBloc'></a><a href='"+baseUrl+"/administration/blocs/edit/"+real_id+"' class='editBloc'></a></div>");
    					$(this).removeClass("drophover");
    	
    					// Le template à été modifié
    					templateUnsaved(true);
    				}
    				else if ( event.originalEvent.handleObj.namespace == "sortable" ){
    					// Le template à été modifié
    					templateUnsaved(true);
    				}
    			}
    		});
        	
        	// SORT
        	oPlaceholders.sortable({
    			cursor: 'move', 
    			connectWith: oPlaceholders,
    			items: 'div.template_item',
    			placeholder: 'ui-sortable-zone',
    			distance: 10,
    			cursorAt: {top:20, left: 30}
    		}).disableSelection(); 
        	
        	// ACCORDEON LISTE BLOC
        	var contentSlide = oBlocsList.find("ul.section-content").hide();
        	oBlocsList.on("click", 'a.section-head', function(e){
    			e.preventDefault();
    			contentSlide.slideUp();
    			$(this).next("ul").stop().slideDown();
    		});
        }
        
        var initEvents = function() {
        	
        	// ========== Placeholders ==========
        	
        	// DELETE bloc
        	oTemplate.on("click", '.deleteBloc', function(e){
        		e.preventDefault();
        		$(this).parent().remove();
        	
        		// template modifié
        		templateUnsaved(true);
        	});
        	
        	// EDIT bloc
        	oTemplate.on("click", ".editBloc", function(e){
        		e.preventDefault();
        		
        		var link = $(this).attr("href");
        		
    			// Si current template a été modifié
    			if( tplUpdated ) {
    				
    				var callback = function(doChange){
    					if(doChange)
    						document.location = link;
    				}
    				
    				preventChangeTpl(callback);
    			}
    			else {
    				document.location = link;
    			}
        	});
        	// ========== Formulaire ==========
        	
    		// CHANGE template
    		oSelectTpl.on("change", function(){

    			// Si current template a été modifié
    			if( tplUpdated ) {
    				
    				var callback = function(doChange){
    					// Volonté de changer de TPL
    					if(doChange){
        					changeTpl();
    					}
    					// Annulation
        				else {
        					oSelectTpl.val(currentTplId);
        				}
    				}
    				
    				preventChangeTpl(callback);
    			}
    			else {
    				changeTpl();
    			}

    		});
    		
    		oSelectType.on("click", function(e){
    			e.preventDefault();

        		switchType($(this).val());
    		});
    		
    		// SAVE TPL
    		$("#submit").on("click", function(e){
    			e.preventDefault();
    			saveTemplate();
    		});
    		
    		// DELETE TPL
    		$("#delete").on("click", function(e){
    			e.preventDefault();
    			
    			if(  plugin.settings.homePageIdTpl && ( plugin.settings.homePageIdTpl == currentTplId) ) {
    				// Impossible de supprimer le template de la home
    				alert("Il est impossible de supprimer le modèle assigné à la page d'accueil.");
    			}
    			else {
    				Sexy.confirm('Êtes-vous sûr de vouloir supprimer ce modèle ?<br/><br/><span style="color:#CE2B2A;font-style:italic;">Attention, les pages et types de pages ayant ce template sélectionné seront modifiés à "par défaut".</span>', { 
    					onComplete: function(returnvalue) { 
    						if(returnvalue) {
    							window.location.href = ""+ plugin.settings.urlDeleteTpl+"/"+currentTplId+"";
    						}
    					},
    					textBoxBtnOk: "Oui",
    					textBoxBtnCancel: "Non"
    				});
    			}
    		});
    		
    		// ========== Création de nouveau template ==========
    		
    		$("#new_form").submit(function(){
    			$(this).attr("action",  $("#new_form").attr("action")+'/'+$(this).find("#type_new").val())
    		});
    		
    		// CREATE
    		$("#new").on("click", function(e){
    			e.preventDefault();
    			
    			// Liste duplication template cachée par défaut
    			showListingTemplate(false);
    			
    			// Fancybox
    			$.fancybox({
    				'width'			: 550,
    				'height'		: 260,
    				'autoScale'		: false,
    				'autoDimensions': false,
    				'scrolling'		: 'no',
    				'titleShow'		: false,
    				'onComplete'	: function(){
    					$('form').validationEngine('hide');
    				},
    				'onCleanup' : function(){
    					$("#formTemplate").validationEngine('hide')
    					$("#title_template").val("");
    					$("#duplicate").attr('checked', false);
    				},
    				'type'			: 'inline',
    				'href' 			: '#form_new_template'
    			});
    		});
    		
    		// CREATE TPL : duplicate
    		$("#duplicate").on("change", function(){
    			showListingTemplate($(this).is(':checked'));
    		});
    		
    		/* Affiche ou cache le choix du template à dupliquer */
    		function showListingTemplate(statut){
    			oFormSelectTplToDuplicate.toggle(statut);
    		}
    		
    		// CREATE TPL : CANCEL
    		$("#cancel_template").on("click", function(){
    			$.fancybox.close();
    			return false;
    		});
    		
    		// CREATE TPL : SUBMIT
    		$("#valid_template").on("click", function(){
    			if ( $("#formTemplate").validationEngine('validate') )
    			{			
    				$.ajax({
    					type: "POST",
    					cache: false,
    					url: baseUrl+'/ajax/blocs/newtemplate',
    					dataType: "json",
    					data: {
    						'title' : $("#title_template").val(),
    						'duplicate': $("#duplicate").is(":checked")?"checked":0,
    						'template_id_duplicate': oSelectTplToDuplicate.val()
    					},
    					error: function(results){
    						alert("Une erreur est survenue ...\nActualisez la page et réessayez.");
    					},
    					success: function(results){
    						if(results["error"] == true || !results["id"]) {
    							if( results["message"] )
    								alert("Une erreur est survenue :\n" + results["message"]);
    							else
    								alert("Une erreur est survenue ...\nActualisez la page et réessayez.");
    						}
    						else {
    							createTpl(results);
    							$.fancybox.close();
    						}
    					}
    				});
    			}
    	
    			return false;
    		});
    		
    		$("#configure_tpl").fancybox({
    			'width':900,
    			'height':600,
				'autoDimensions': true,
				'titleShow'		: false,
				'onComplete'	: function(){
					$('form').validationEngine('hide');
				},
				'onCleanup' : function(){
					$("#formTemplate").validationEngine('hide')
					$("#title_template").val("");
					$("#duplicate").attr('checked', false);
				},
				'type': 'iframe'
			});
    		
    		// ========== Liste des blocs existants ==========
    		
    		oBlocsList.on("click", "a.delete", function(e){
    			e.preventDefault();
    			var lien = $(this).attr("href");
    			
    			Sexy.confirm('Êtes-vous sûr de vouloir supprimer ce bloc ?<br/><br/><span style="color:#CE2B2A;font-style:italic;">Attention, si ce bloc est utilisé par des modèles de disposition, il sera automatiquement supprimé.</span>', { 
    				onComplete: function(returnvalue) { 
    					if(returnvalue)
    						window.location.href = lien;
    				},
    				textBoxBtnOk: "Oui",
    				textBoxBtnCancel: "Non"
    			});
    		});
        }
        
       /*
        * ========== Methodes ==========
        */
        
        var createTpl = function(resultAjax){
        	
        	var newOption = $("<option></option>").attr({ 
        		label: $("#title_template").val(),
        		value: resultAjax["id"]
        	}).text($("#title_template").val());
        	
        	oSelectTplToDuplicate.append(newOption);
        	oSelectTpl.append(newOption);
        	
			if($("#duplicate").attr("checked")){
				plugin.settings.tplDatas[resultAjax["id"]] = plugin.settings.tplDatas[oSelectTplToDuplicate.val()];
			}
			else {
				plugin.settings.tplDatas[resultAjax["id"]] 						= new Object();
				plugin.settings.tplDatas[resultAjax["id"]]['placeholders'] 		= new Object();
				plugin.settings.tplDatas[resultAjax["id"]]['infos'] 			= new Object();
				plugin.settings.tplDatas[resultAjax["id"]]['infos']['theme'] 	= '';
				plugin.settings.tplDatas[resultAjax["id"]]['infos']['classCss'] = '';
				plugin.settings.tplDatas[resultAjax["id"]]['data']				= new Object();
			}
			
			plugin.settings.tplDatas[resultAjax["id"]]['infos']['title'] 	= $("#title_template").val();
			
			// On séléctionne le template créé
			currentTplId = resultAjax["id"];
			oSelectTpl.val(currentTplId);
			
			// On affiche son titre
			$("#title").val($("#title_template").val());
			
			// Chargement du nouveau template						
			clearPlaceholders();
			
			tempTplDatas = undefined;
			preSaveTpl();
			
			populatePlaceholders(tempTplDatas[currentTplType]);
        }
        
        var changeTpl = function(){
        	
        	// Changement du tpl courant
			currentTplId = oSelectTpl.val();
			
			// Changement de l'url de configuration
			var currentUrl = $("#configure_tpl").attr('href');
			var newUrl = currentUrl.substring(0,currentUrl.lastIndexOf('/')) + "/" + oSelectTpl.val();
			$("#configure_tpl").attr('href', newUrl);
			
			
				
			
			
			$("#template").fadeOut(100, function(){
				// Suppression des blocs
				clearPlaceholders();
				
				templateUnsaved(false);
				
				tempTplDatas = undefined;
				preSaveTpl();
				
				// Ajouter les blocs
				populatePlaceholders(tempTplDatas[currentTplType]);
				
				$(this).fadeIn();
			});
			
			
        }
        
        var switchType = function(type){
        	
        	type = type || 'classic';
        	
        	// Stockage en mémoire de l'état du TPL (tout type confondu)
        	preSaveTpl();
        	
        	// Affichage des blocs du type souhaité
			clearPlaceholders();
			populatePlaceholders(tempTplDatas[type]);
			
			// Changement du type courant
			currentTplType = type;
        }
        
        var preSaveTpl = function (){
        	
        	if(typeof tempTplDatas == 'undefined')
        		tempTplDatas = plugin.settings.tplDatas[currentTplId]['data'];
        	
        	if(tplUpdated)
        		tempTplDatas[currentTplType] = getTplData();
		}
        
        /*
         * Vide les placeholders
         */
        var clearPlaceholders = function(){
        	oPlaceholders.find(".template_item").remove();
        }
        
        /*
         * Rempli les placeholders des blocs qu'on passe en paramètre
         */
    	var populatePlaceholders = function(data){
    		
    		var count = 1;
    		
    		if(typeof data != 'undefined'){
	    		$.each(data, function(placeholder, value) {
	
	    			// tous les blocs du placeholder
	    			if(typeof data[placeholder] != 'undefined'){
		    			$.each(data[placeholder], function(id, value) {
		
		    				var blocItem = $('<div></div>').attr({
		    					'id': id,
		    					'title' : data[placeholder][id]['designation'],
		    					'realid' : data[placeholder][id]['id']
		    				}).text(
		    						data[placeholder][id]['designation']
		    				).addClass(
		    					'template_item ' + data[placeholder][id]['type'] + ' index-' + plugin.settings.typeIndex[data[placeholder][id]['type']]
		    				);
		    				
							//if( aclEditTemplate ){
			    				blocItem.append("<a href='"+baseUrl+"/administration/blocs/edit/" + data[placeholder][id]['id']+"' class='editBloc'></a>");
			    				blocItem.append("<a href='#' class='deleteBloc'></a>");
							//}
		
							$("#t_" +placeholder+" div.drop_zone").before(blocItem);
		
							count++;
		    				
		    			});
	    			}
	    		});
    		}

    		plugin.settings.lastId = count;
    	}
    	
    	/*
    	 * Prévient l'utilisateur d'une perte de donnée
    	 */ 
    	var preventChangeTpl = function(callback){

    		Sexy.yesNoCancel("Souhaitez-vous enregistrer les changements de ce modèle ?", { 
				onComplete: function(returnvalue) { 

					if(returnvalue == "yes" || returnvalue == "no") {
						
						// Changement de TPL + volonté d'enregistrer
						if (returnvalue == "yes"){
							if(callback)
								saveTemplate(callback, true);
							else
								saveTemplate();
						}
						// Changement de TPL sans enregistrer
						else {
							if(callback){
								templateUnsaved(false);
								callback(true);
							}
						}
					}
					else {
						if(callback)
							callback(false);
					}

				},
				textBoxBtnYes: "Oui",
				textBoxBtnNo: "Non",
				textBoxBtnCancel: "Annuler"
			});
    	}
    	
    	/*
    	 * Change l'état save/unsave du template courant
    	 */
    	var templateUnsaved = function(state){
    		tplUpdated = state;
    		
    		if(state){
	    		$(window).bind('beforeunload', function(e) {
	    		    return "Attention ! Vous n'avez pas enregistré les changements de ce modèle !";
	    		});
    		}
    		else {
    			$(window).unbind('beforeunload');
    		}
    	}
    	
    	/*
    	 * Récupère la configuration des blocs du template
    	 */
    	var getTplData = function(){ 

    		var toreturn = new Object();
    		var increment = 1;
    		
    		oPlaceholders.each(function(){
    			var ids = $(this).sortable("toArray");
    			var ph = $(this).attr("id").substr(2);
    			
    			if(ids.length > 0){
	    			toreturn[ph] = new Object();
	    			
	    			$.each(ids, function(i, value){
	    				toreturn[ph][increment] = new Object();
	    				
	    				toreturn[ph][increment]["id"] = $("#"+value).attr("realid");
	    				toreturn[ph][increment]["type"] = $("#"+value).attr("class");
	    				toreturn[ph][increment]["designation"] = $("#"+value).attr("title");
	    				
	    				increment++;
	    			});
    			}
    		});
    		
    		return toreturn;
    	}
    	
    	/*
    	 * Enregistrement AJAX du template
    	 */
		var saveTemplate = function (callback, paramCallback){
			
			// Enregistrement local des modifications
			preSaveTpl();
			
			// Récupération des données
			var datas 		= new Object();
			datas['data']	= tempTplDatas;
			
			// Mise à jour de l'index principal
			plugin.settings.tplDatas[currentTplId] = datas;
			templateUnsaved(false);
			$.ajax({
				type: "POST",
				url: baseUrl+'/ajax/blocs/updatetemplate',
				dataType: "json",
				data: {
					'tpl_id' : 	currentTplId,
					'datas': 	datas
				},
				error: function(results){
					alert("Une erreur est survenue ...\nActualisez la page et réessayez.");
					return false;
				},
				success: function(results){
					if(results["error"] == true) {
						if( results["message"] )
							alert("Une erreur est survenue :\n" + results["message"]);
						else
							alert("Une erreur est survenue ...\nActualisez la page et réessayez.");
						
						return false;
					}
					else {
						
						// Mise à jour des listes de TPL
						//oSelectTpl.find('option[value="'+currentTplId+'"]').text(datas['infos']['title']);
						//oSelectTplToDuplicate.find('option[value="'+currentTplId+'"]').text(datas['infos']['title']);

						// Template enregistré
						templateUnsaved(false);
						
						/*
						 * Affichage de la confirmation cliente
						 */
						var mess = $("<div></div>");
						
						mess.text("Vos modifications ont bien été prises en compte").css({
							"display" : "none",
							"position": "fixed",
							"top": "8px",
							"right": "8px",
							"background": "rgba(0,0,0,0.7)",
							"padding": "25px",
							"color": "#fff",
							"border-radius": "8px",
							"box-shadow": "5px 5px 10px rgba(0,0,0,0.8)"
						}).appendTo("body").fadeIn();
						
						setTimeout(function(){
							mess.fadeOut(1000, function(){mess.remove();});
						}, 4000);
						
						// Appel du Callback si présent
						if(callback)
							callback(paramCallback);
					}
				}
			});
		}
    	
    	init();
    }

})(jQuery);