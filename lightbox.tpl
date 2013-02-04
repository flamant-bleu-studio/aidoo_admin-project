<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		
		<script type="text/javascript">
			var baseUrl = "{$baseUrl}";
			var skinUrl = "{$skinUrl}";
			
			var defaultLangId 	= {$smarty.const.DEFAULT_LANG_ID};
			var defaultLangCode = "{$smarty.const.DEFAULT_LANG_CODE}";
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
		
		<!-- Bootstrap twitter -->
		<link type="text/css" href="{$smarty.const.COMMON_LIB_PATH}/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="all" />
		<link type="text/css" href="{$smarty.const.COMMON_LIB_PATH}/lib/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet" media="all" />
		<script type="text/javascript" src="{$smarty.const.COMMON_LIB_PATH}/lib/bootstrap/js/bootstrap.min.js"></script>
		
		<link href="{$baseUrl}{$skinUrl}/css/admin.css" media="screen" rel="stylesheet" type="text/css" />

	 
	 	{appendFile type="js" src="{$smarty.const.COMMON_LIB_PATH}/lib/datatables/1.9.0/media/js/jquery.dataTables.min.js"}
		{appendFile type="js" src="{$smarty.const.COMMON_LIB_PATH}/lib/datatables/1.9.0/media/js/dataTables.plugins.js"}
		{appendFile type="css" src="{$smarty.const.COMMON_LIB_PATH}/lib/datatables/1.9.0/media/css/demo_table_jui.css"}
		
		{appendFile type="js" src="{$smarty.const.COMMON_LIB_PATH}/lib/langSwitcher/script.js"}
		{appendFile type="css" src="{$smarty.const.COMMON_LIB_PATH}/lib/langSwitcher/styles.css"}

		<script> var datatable_lang_file =  "{$smarty.const.COMMON_LIB_PATH}/lib/datatables/1.9.0/media/lang/fr.lang"; </script>	
		
		<!-- TinyMCE -->
		{$AppendTinyMCE}
		<!-- ImageManager -->
		{$AppendImageManager}
	
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
