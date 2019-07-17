<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="org.reddragonfly.iplsqldevj.bean.UserBean"%>

<%	
    UserBean ub = (UserBean)session.getAttribute("user");
    //phanrider 2009-07-27 改了jeanwendy此处的tree和提交的全局标志在同一个页面，增加了lefttop.jsp
    //更改了显示方式，使页面显示更人性化，超过范围拖动div时，右边工具条不再连上面的下拉框一起滚动
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>tree</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
		<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
		<link rel="stylesheet" type="text/css" href="../js/codebase/fonts/font_roboto/roboto.css"/>
        <link rel="stylesheet" type="text/css" href="../js/skins/terrace/dhtmlx.css"/>
		<script src="../js/codebase/dhtmlx.js"></script>
		<style>
			div.sample_info_here {
				position: relative;
				width: auto;
				margin: 20px;
				font-family: Roboto, Arial, Helvetica;
				font-size: 14px;
				color: #404040;
			}
			div.sample_info_here div.sample_info_title {
				line-height: 18px;
				font-size: 15px;
				color: #3b5e7c;
			}
			div#tree_here {
				position: relative;
				border: 1px solid #dfdfdf;
				box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.09);
				width: 320px;
				height: 400px;
				margin-left: 20px;
				margin-bottom: 20px;
			}
		</style>
		<script>
            var myTreeView;
            function doOnLoad() {
                myTreeView = new dhtmlXTreeView({parent:"tree_here", context_menu: true, skin: "dhx_terrace"});
                myTreeView.loadStruct("showTree1.action?type=root&amp;name=&amp;field=");
            	myTreeView.enableTreeLines(true);
            }
		</script>
	</head>
	<body onload="doOnLoad()">
	<div class="sample_info_here">
		<div class="sample_info_title">init treeview from xml file</div>
	</div>
	<div id="tree_here"></div>
	</body>
</html>
