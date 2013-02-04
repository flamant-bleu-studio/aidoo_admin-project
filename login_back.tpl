<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta content="width=device-width, initial-scale=1.0" name="viewport">
		<script type="text/javascript">
			var baseUrl = "{$baseUrl}";
			var skinUrl = "{$skinUrl}";
		</script>
		
		{$headTitle}
		
				<!-- Bootstrap twitter -->
		<link type="text/css" href="{$smarty.const.COMMON_LIB_PATH}/lib/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="all" />
		<link type="text/css" href="{$smarty.const.COMMON_LIB_PATH}/lib/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet" media="all" />
		<script type="text/javascript" src="{$smarty.const.COMMON_LIB_PATH}/lib/bootstrap/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="{$baseUrl}{$skinUrl}/js/jquery/jquery-1.7.1.min.js"></script>
		<script type="text/javascript" src="{$baseUrl}{$skinUrl}/js/jquery/jquery-ui-1.8.13.custom.min.js"></script>
		
		<link href="{$baseUrl}{$skinUrl}/css/admin.css" media="screen" rel="stylesheet" type="text/css" />
				
	</head>
	

<body>

	<div id="login_bandeau">
		<img src="{$baseUrl}{$skinUrl}/images/logo_{$smarty.const.ADMIN_SKIN}.png" />
		<h1>Connexion à l'administration</h1>
	</div>
	
	<div class="container">
	
		<div id="login_content" class="blanc_ombre">

			<div id="login_body">
				{dynamic}{messages}{/dynamic}
				{$layout->content}
			</div>

		</div>

	</div>
</body>
</html>
