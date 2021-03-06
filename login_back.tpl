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
		<script type="text/javascript">
			var baseUrl = "{$baseUrl}";
			var skinUrl = "{$skinUrl}";
		</script>
		
		<script type="text/javascript" src="{$smarty.const.COMMON_LIB_PATH}/lib/jquery/jquery-1.9.1.min.js"></script>
		<script type="text/javascript" src="{$smarty.const.COMMON_LIB_PATH}/lib/bootstrap/v2.3.2/js/bootstrap.min.js"></script>
		
		<link type="text/css" href="{$smarty.const.COMMON_LIB_PATH}/lib/bootstrap/v2.3.2/css/bootstrap.min.css" rel="stylesheet" media="all" />
		<link rel="stylesheet" href="{$smarty.const.COMMON_LIB_PATH}/lib/font-awesome/v3.2.1/css/font-awesome.min.css">
		<link rel="stylesheet" href="{$baseUrl}{$skinUrl}/css/admin.css" type="text/css" />
				
	</head>
	

<body>
	<div id="login_page">
		{$layout->content} 
	</div>
</body>
</html>
