{*
* CMS Aïdoo
* 
* Copyright (C) 2013  Flamant Bleu Studio
* This program is free software; you can redistribute it and/or
* modify it under the terms of the GNU Lesser General Public
* License as published by the Free Software Foundation; either
* version 2.1 of the License, or (at your option) any later version.
* 
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
* Lesser General Public License for more details.
* 
* You should have received a copy of the GNU Lesser General Public
* License along with this program; if not, write to the Free Software
* Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA
*}
<!DOCTYPE html>
<html lang="{$smarty.const.CURRENT_LANG_CODE}">
	<head>
		<meta charset="utf-8">
		<meta content="width=device-width, initial-scale=1.0" name="viewport">
		
		<link rel="icon" type="image/png" href="{$baseUrl}{$skinUrl}/images/favicon_{$smarty.const.ADMIN_SKIN}.png" />
		
		<script type="text/javascript">
			var baseUrl = "{$baseUrl}";
			var skinUrl = "{$skinUrl}";
			
			var defaultLangId 	= {$smarty.const.DEFAULT_LANG_ID};
			var defaultLangCode = "{$smarty.const.DEFAULT_LANG_CODE}";
			{if isset($ajax_apiKey)}var ajax_apiKey 	= "{$ajax_apiKey}";{/if}
			var commonLibUrl = "{$smarty.const.COMMON_LIB_PATH}";
		</script>

		<!-- JQuery Libs -->
		<script type="text/javascript" src="{$baseUrl}{$skinUrl}/js/jquery/jquery-1.7.1.min.js"></script>
		
		<script type="text/javascript" src="{$smarty.const.COMMON_LIB_PATH}/lib/jquery/jquery-ui-1.9.1.custom.min.js"></script>		
		<link type="text/css" href="{$smarty.const.COMMON_LIB_PATH}/lib/jquery/ui-lightness/jquery-ui-1.9.1.custom.min.css" rel="stylesheet" media="all" />
		
		<script type="text/javascript" src="{$baseUrl}{$skinUrl}/js/jquery/hoverIntent.min.js"></script>
		<script type="text/javascript" src="{$smarty.const.COMMON_LIB_PATH}/lib/bgiframe/jquery.bgiframe.min.js"></script>
		<script type="text/javascript" src="{$baseUrl}{$skinUrl}/js/jquery/jquery.overlabel.min.js"></script>
		<script type="text/javascript" src="{$baseUrl}{$skinUrl}/js/jquery/jquery.scrollTo-min.js"></script>
		<script type="text/javascript" src="{$baseUrl}{$skinUrl}/js/jquery/jquery.localscroll-min.js"></script>
		<script type="text/javascript" src="{$baseUrl}{$skinUrl}/js/jquery/jquery.cycle.all.min.js"></script>
		<script type="text/javascript" src="{$baseUrl}{$skinUrl}/js/jquery/jquery.mousewheel-3.0.4.pack.js"></script>
				
		<script type="text/javascript" src="{$smarty.const.COMMON_LIB_PATH}/lib/ajaxAidoo/script.js"></script>
				
		<!-- Bootstrap twitter -->
		<link type="text/css" href="{$smarty.const.COMMON_LIB_PATH}/lib/bootstrap/v2.2.2/css/bootstrap.min.css" rel="stylesheet" media="all" />
		<script type="text/javascript" src="{$smarty.const.COMMON_LIB_PATH}/lib/bootstrap/v2.2.2/js/bootstrap.min.js"></script>
		
		<!--  Alerts  -->
		<script type="text/javascript" src="{$baseUrl}{$skinUrl}/js/sexyalert/sexyalertbox.v1.2.jquery.js"></script>
		<script type="text/javascript" src="{$baseUrl}{$skinUrl}/js/sexyalert/sexyalert.js"></script>
		<link href="{$baseUrl}{$skinUrl}/js/sexyalert/sexyalertbox.css" media="screen" rel="stylesheet" type="text/css" />
		
		<!--  Drag & drop list  -->
		<script type="text/javascript" src="{$baseUrl}{$skinUrl}/js/dndList/dndList.js"></script>
		
		<!-- fancy box -->
		<script type="text/javascript" src="{$baseUrl}{$skinUrl}/js/fancybox/jquery.fancybox-1.3.4.pack.js"></script>
		<link href="{$baseUrl}{$skinUrl}/js/fancybox/jquery.fancybox-1.3.4.css" type="text/css" rel="stylesheet" media="screen">
		
		<link href="{$baseUrl}{$skinUrl}/css/admin.css" media="screen" rel="stylesheet" type="text/css" />
		
		<!-- 	fragment HTML -->
		<script type="text/javascript" src="{$smarty.const.COMMON_LIB_PATH}/lib/jqueryBBQ/script.js"></script>
		<script type="text/javascript" src="{$smarty.const.COMMON_LIB_PATH}/lib/fragmentHTML/script.js"></script>
		
		<!-- jquery flot -->
		<script type="text/javascript" src="{$baseUrl}{$skinUrl}/js/flot/jquery.flot.js"></script>
				
		{appendFile type="js" src="{$smarty.const.COMMON_LIB_PATH}/lib/datatables/1.9.0/media/js/jquery.dataTables.min.js"}
		{appendFile type="js" src="{$smarty.const.COMMON_LIB_PATH}/lib/datatables/1.9.0/media/js/dataTables.plugins.js"}
		
		{appendFile type="js" src="{$smarty.const.COMMON_LIB_PATH}/lib/langSwitcher/script.js"}
		{appendFile type="css" src="{$smarty.const.COMMON_LIB_PATH}/lib/langSwitcher/styles.css"}
		
		<script type="text/javascript" src="{$smarty.const.COMMON_LIB_PATH}/lib/raptorize/jquery.raptorize.1.0.js"></script>
		
		<script type="text/javascript"> var datatable_lang_file =  "{$smarty.const.COMMON_LIB_PATH}/lib/datatables/1.9.0/media/lang/fr.lang"; </script>	
		{literal}
		<script> 
			$(document).ready(function(){

				$('body').raptorize({
			        'enterOn' : 'konami-code', //timer, konami-code, click
			        'delayTime' : 5000 //time before raptor attacks on timer mode
			   });
				
				// Menu principal admin
				$('.dropdown-toggle').dropdown();

				// Tooltip sur les liens
				$('.show_tooltip a, .show_tooltip').tooltip();

				if(jQuery.isFunction( jQuery.dataTable )){
					$.extend( $.fn.dataTableExt.oStdClasses, {
						"sSortAsc": "header headerSortDown",
						"sSortDesc": "header headerSortUp",
						"sSortable": "header"
					});
				}
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
		</script>		
		{/literal}
		
		{AppendJsFiles}
		{AppendJsScripts}
		
		{AppendCssFiles}
		{AppendCssScripts}
		
	</head>
	
<body>
{if isset($multi_site_select) && ($user->group->id == 1 || $user->group->id == 6 || $user->group->id == 5)}
	<div class="navbar navbar-fixed-top" style="margin-bottom: 40px;">
		<div class="navbar-inner" style="text-align: center;">
			<form action="#">
				<label for="multisites" style="color:#FFF;display:inline;font-weight:bold;font-size:15px;">Multi-sites :</label> 
				<select id="multisites" onChange="location.href = '{routeFull route="admin_changemulti"}/'+this.value" style="display: inline-block;margin-top: 6px;">
					{html_options options=$multi_site_select selected=$smarty.const.MULTI_SITE_ID} 
				</select>
				
				{if {$multi_site_select[$smarty.const.MULTI_SITE_ID]} != $smarty.server.SERVER_NAME}
				<div class="alert" style="display:inline-block;margin-top:5px;margin-bottom:5px;">
				  <strong>{t}Warning!{/t}</strong> {t}You viewing the content of site{/t} <strong>{$multi_site_select[$smarty.const.MULTI_SITE_ID]}</strong>
				</div>
				{/if}
				
			</form>
		</div>
	</div>

	<div style="height: 40px;"></div>
{/if}

	<div id="main" class="container">
		<div id="head">

				<div class="row-fluid">
					
					<div id="bloc_user"  class="span4">
						<a href='{routeFull route="admin"}'><img src="{$baseUrl}{$skinUrl}/images/logo_{$smarty.const.ADMIN_SKIN}.png" /></a>
						<span>{$user->email}<br/>
						Statut : {$user->group->name}</span>
					</div>
					
					<div id="bloc_search" class="span3">
						<form method="post" action="{routeFull route='search_query_back'}" class="form-search">
							<input type="text" name="search" id="search" placeholder="{t}Keywords...{/t}" />
							<button class="btn btn-primary"><i class="icon icon-search icon-white"></i></button>
						</form>
					</div>
					
					<div id="boutons" class="span5">
						
						<a class="btn" id="votre_profil" href='{routeFull route="users_back" action="edit-user" id="{$user->id}"}'>
							<i class="icon-user"></i>
							{t}VOTRE PROFIL{/t}
						</a>
						<a class="btn" id="votre_site" href='{routeFull route="front"}' target='_blank'>
							<i class="icon-home"></i>
							{t}VOTRE SITE{/t}
						</a>
						<a class="btn" id="deconnect" href='{routeFull route="admin_logout"}'>
							<i class="icon-off"></i>
							{t}DECONNEXION{/t}
						</a>
					</div>
					
				</div>

		</div>
			
		<div class="container">
			
			<div id="main_menu"  class="navbar">
				 <div class="navbar-inner">
					<div class="container">
						<ul class="nav nav-pills">
							{foreach from=$adminMenu item=menuItem key=k name=menu}
								{if isset($menuItem['children'])} <!-- au moins 1 children -->
									{if $menuItem['children']|@count > 1} <!-- + de 1 children -->
										<li class="dropdown" id="menu1">
											<a class="dropdown-toggle" data-toggle="dropdown" href="#">{$menuItem.title} <b class="caret"></b> </a>
											<ul class="dropdown-menu">
												{foreach from=$menuItem['children'] item=menuSubItem name=subMenu}
													<li><a href="{routeFull route=$menuSubItem.routeName controller=$menuSubItem.controllerName action=$menuSubItem.actionName}">&nbsp;{$menuSubItem.title}</a></li>
												{/foreach}
											</ul>
										</li>
									{else} <!-- 1 children -->
										<li><a href="{routeFull route=$menuItem['children'][0].routeName controller=$menuItem['children'][0].controllerName action=$menuItem['children'][0].actionName}">{$menuItem.title}</a></li>
									{/if}
								{else} <!-- no children -->
									{if $menuItem.routeName} <!-- Dipose de route -->
										<li><a href="{routeFull route=$menuItem.routeName controller=$menuItem.controllerName action=$menuItem.actionName}">{$menuItem.title}</a></li>
									{/if}
								{/if}
							{/foreach}
						</ul>
					</div>
				</div>
			</div>
			
			{if isset($activeMenu) && isset($adminMenu[$activeMenu]['children']) && ($adminMenu[$activeMenu]['children']|@count) > 1}
			<div id="nav_rubrique">
				<div class="container">				
					<ul class="nav nav-pills">
						{foreach from=$adminMenu[$activeMenu]['children'] item=subMenu name=subMenu2}
							<li {if $subMenu.title == $titleSubMenu}class="active"{/if}>
								<a href="{routeFull route=$subMenu.routeName controller=$subMenu.controllerName action=$subMenu.actionName}">
								{$subMenu.title}
								</a>
							</li>
						{/foreach}
					</ul>
				</div>

			</div>					
			{/if}
			

			<div id="content_body" class="blanc_ombre">
				{dynamic}{messages}{/dynamic}
				
				{$layout->content}
			</div>

			
			<div id="footer">
				<span class="pull-left">
				{if $smarty.const.ADMIN_SKIN == "selectup"}
					Select'Up
				{else}
					Flamant Bleu
				{/if}
				</span>
				<span class="pull-right">
				{if $smarty.const.ADMIN_SKIN == "selectup"}
					CMS AUTO {'Y'|date}
				{else}
					CMS Aïdoo {'Y'|date}
				{/if}
				({$smarty.const.CMS_VERSION})
				</span>
			</div>
		</div>
	</div>
</body>
</html>
