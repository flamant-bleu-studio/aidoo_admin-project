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
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		
		<script type="text/javascript">
			var baseUrl = "{$baseUrl}";
			var skinUrl = "{$skinUrl}";
			var commonLibUrl = "{$smarty.const.COMMON_LIB_PATH}";
			
			var defaultLangId 	= {$smarty.const.DEFAULT_LANG_ID};
			var defaultLangCode = "{$smarty.const.DEFAULT_LANG_CODE}";
			var currentLangCode = "{$smarty.const.CURRENT_LANG_CODE}";
			
			{if isset($ajax_apiKey)}
				var ajax_apiKey = "{$ajax_apiKey}";
			{/if}
		</script>
		
		<!-- JQuery Libs -->
		<script src="{$smarty.const.COMMON_LIB_PATH}/lib/jquery/jquery-1.9.1.min.js"></script>
		<script type="text/javascript" src="{$smarty.const.COMMON_LIB_PATH}/lib/jquery/jquery-ui-1.9.1.custom.min.js"></script>		
		<link type="text/css" href="{$smarty.const.COMMON_LIB_PATH}/lib/jquery/ui-lightness/jquery-ui-1.9.1.custom.min.css" rel="stylesheet" media="all" />
		
		<script type="text/javascript" src="{$smarty.const.COMMON_LIB_PATH}/lib/formValidation/v2.6.1/js/languages/jquery.validationEngine-fr.js"></script>
		<script type="text/javascript" src="{$smarty.const.COMMON_LIB_PATH}/lib/formValidation/v2.6.1/js/jquery.validationEngine.js"></script>
		<script type="text/javascript" src="{$smarty.const.COMMON_LIB_PATH}/lib/formValidation/v2.6.1/js/contrib/other-validations.js"></script>
		<link href="{$smarty.const.COMMON_LIB_PATH}/lib/formValidation/v2.6.1/css/validationEngine.jquery.css" media="screen" rel="stylesheet" type="text/css" />
		
		<!-- Bootstrap twitter -->
		<link type="text/css" href="{$smarty.const.COMMON_LIB_PATH}/lib/bootstrap/v2.3.2/css/bootstrap.min.css" rel="stylesheet" media="all" />
		<script type="text/javascript" src="{$smarty.const.COMMON_LIB_PATH}/lib/bootstrap/v2.3.2/js/bootstrap.min.js"></script>
		
		<!-- Font Awesome -->
		<link rel="stylesheet" href="{$smarty.const.COMMON_LIB_PATH}/lib/font-awesome/v3.2.1/css/font-awesome.min.css">
		
		<!-- Fancybox -->
		<script type="text/javascript" src="{$smarty.const.COMMON_LIB_PATH}/lib/fancybox/2.1.4/jquery.fancybox.pack.js"></script>
		<link rel="stylesheet" href="{$smarty.const.COMMON_LIB_PATH}/lib/fancybox/2.1.4/jquery.fancybox.css">
		
		<!--  Drag & drop list  -->
		<script type="text/javascript" src="{$baseUrl}{$skinUrl}/js/dndList/dndList.js"></script>
		
		<!-- dataTables -->
		<script type="text/javascript" src="{$smarty.const.COMMON_LIB_PATH}/lib/datatables/1.9.0/media/js/jquery.dataTables.min.js"></script>
		<script type="text/javascript" src="{$smarty.const.COMMON_LIB_PATH}/lib/datatables/1.9.0/media/js/dataTables.plugins.js"></script>
		<script type="text/javascript"> var datatable_lang_file =  "{$smarty.const.COMMON_LIB_PATH}/lib/datatables/1.9.0/media/lang/fr.lang"; </script>	
		
		<!-- LangSwitcher -->
		<script type="text/javascript" src="{$smarty.const.COMMON_LIB_PATH}/lib/langSwitcher/script.js"></script>
		<link href="{$smarty.const.COMMON_LIB_PATH}/lib/langSwitcher/styles.css" media="screen" rel="stylesheet" type="text/css" />
		
		<!-- Styles -->
		<link href="{$baseUrl}{$skinUrl}/css/admin.css" media="screen" rel="stylesheet" type="text/css" />
		<link href="{$baseUrl}{$skinUrl}/css/btn.css" media="screen" rel="stylesheet" type="text/css" />
		<link href="{$baseUrl}{$skinUrl}/css/menu_style.css" media="screen" rel="stylesheet" type="text/css" />
		<link href="{$baseUrl}{$skinUrl}/css/diaporama.css" media="screen" rel="stylesheet" type="text/css" />
		
		<!-- Translations JS -->
		<script type="text/javascript" src="{$smarty.const.COMMON_LIB_PATH}/lib/i18n-js/12-07-2013/i18n.js"></script>
		<script type="text/javascript" src="{$baseUrl}{$skinUrl}/js/script.js"></script>
		<script type="text/javascript" src="{$baseUrl}{$skinUrl}/js/i18n/en.js"></script>
		{if $smarty.const.DEFAULT_LANG_CODE != "en"}
			<script type="text/javascript" src="{$baseUrl}{$skinUrl}/js/i18n/{$smarty.const.DEFAULT_LANG_CODE}.js"></script>
		{/if}
		
		<!-- Custom alert -->
		<script type="text/javascript" src="{$smarty.const.COMMON_LIB_PATH}/lib/bootbox/v3.3.0/bootbox.min.js"></script>
		<link href="{$baseUrl}{$skinUrl}/css/bootbox.css" media="screen" rel="stylesheet" type="text/css" />
		
		<!-- Scripts -->
		<script type="text/javascript" src="{$baseUrl}{$skinUrl}/js/menu/script.js"></script>
		<script type="text/javascript" src="{$baseUrl}{$skinUrl}/js/seo/script.js"></script>
		<script type="text/javascript" src="{$baseUrl}{$skinUrl}/js/diaporama/script.js"></script>
		
		{AppendJsFiles}
		{AppendJsScripts}
		
		{AppendCssFiles}
		{AppendCssScripts}
		
	</head>
	
<body>
	<div id="main" style="padding: 10px;">
		
		<div id="content_body" class="blanc_ombre">
			{dynamic}{messages}{/dynamic}
			
			{$layout->content}
		</div>
		
		<script type="text/javascript">
			{literal}
				$(document).ready(function() {
					var input = $("<input>").attr("type", "hidden").attr("name", "format").val("frag");
					$('form').append($(input));
					
				});
			{/literal}
		</script>
		
	</div>
</body>
</html>
