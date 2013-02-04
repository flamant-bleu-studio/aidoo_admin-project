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
