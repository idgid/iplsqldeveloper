<%@ page language="java" contentType="text/html; charset=UTF-8"
		 pageEncoding="UTF-8"%>
<%@ page import="org.reddragonfly.iplsqldevj.Utilities"%>
<%@ page import="org.reddragonfly.iplsqldevj.bean.UserBean"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>editor</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link type="text/css" rel="StyleSheet" href="../css/cb2.css" />
	<link type="text/css" rel="StyleSheet" href="../css/grid.css" />
	<link type="text/css" rel="stylesheet" href="../js/codebase/dhtmlx.css"/>

	<script type="text/javascript" src="../js/others.js"></script>
	<script type="text/javascript" src="../js/mootools.js"></script>

	<script type="text/javascript" language="JavaScript1.5"	src="../js/ieemu.js"></script>
	<script type="text/javascript" src="../js/cb2.js"></script>
	<script type="text/javascript" src="../js/codebase/dhtmlx.js"></script>
	<script type="text/javascript" src="../js/baisworksql.js"></script>
	<script type="text/javascript" src="../js/jquery-1.3.2.min.js"></script>

	<script type='text/javascript' src='../dwr/interface/BaisWorkBean.js'></script>
	<script type='text/javascript' src='../dwr/engine.js'></script>


	<style>
		* {
			box-sizing: border-box;
			-moz-box-sizing: border-box;
		}

		html {
			height: 100%;
			background: ButtonFace;
		}

		body {
			overflow: auto;
			margin: 0px;
			padding: 0px;
			height: 100%;
			color: ButtonText;
			font: MessageBox;
			border: 0;
		}
	</style>

</head>
<body ondragstart="return false" oncontextmenu="return false">
<%--<button id="b0">SQL 0</button><button id="b1">click 1</button><button id="b2">click 2</button>--%>

<div id="SQLWindow_n0" style="width: 100%; height: 100%; display:none;"></div>
<div id="SQLWindow_n1" style="width: 100%; height: 100%; display:none;"></div>
<div id="SQLWindow_n2" style="width: 100%; height: 100%; display:none;"></div>
<div id="SQLWindow_n3" style="width: 100%; height: 100%; display:none;"></div>
<div id="SQLWindow_n4" style="width: 100%; height: 100%; display:none;"></div>
<div id="SQLWindow_n5" style="width: 100%; height: 100%; display:none;"></div>
<div id="SQLWindow_n6" style="width: 100%; height: 100%; display:none;"></div>
<div id="SQLWindow_n7" style="width: 100%; height: 100%; display:none;"></div>
<div id="SQLWindow_n8" style="width: 100%; height: 100%; display:none;"></div>
<div id="SQLWindow_n9" style="width: 100%; height: 100%; display:none;"></div>
<div id="SQLWindow_n10" style="width: 100%; height: 100%; display:none;"></div>
<div id="SQLWindow_n11" style="width: 100%; height: 100%; display:none;"></div>
<div id="SQLWindow_n12" style="width: 100%; height: 100%; display:none;"></div>
<div id="SQLWindow_n13" style="width: 100%; height: 100%; display:none;"></div>
<div id="SQLWindow_n14" style="width: 100%; height: 100%; display:none;"></div>
<div id="SQLWindow_n15" style="width: 100%; height: 100%; display:none;"></div>
<div id="SQLWindow_n16" style="width: 100%; height: 100%; display:none;"></div>
<div id="SQLWindow_n17" style="width: 100%; height: 100%; display:none;"></div>
<div id="SQLWindow_n18" style="width: 100%; height: 100%; display:none;"></div>
<div id="SQLWindow_n19" style="width: 100%; height: 100%; display:none;"></div>



</body>


<script>
	var url = "../editor/SqlWindow/New.jsp";

	function createSqlForColorText(b_id, url) {
		this.id = b_id;
		// 加入判断，如果存在，则无须再次添加
		this.url = url;

		if($('#SQLWindow_' + this.id + '>iframe').length > 0) {
			console.log(this.id);

		} else {
			// 不存在，先清空
			$('#if_SQLWindow_'+this.id).remove();
			// 再添加
			$( "<iframe/>" ).attr({
				"frameBorder": "0",
				"scrolling": "no",
				"allowTransparency": "true",
				"id": "if_SQLWindow_" + this.id,
				"src": this.url
			}).css({
				"width": "100%",
				"height": "100%"
			}).load( function() {
				var iframe = $( this );
				iframe.height( iframe.contents().find( "body" ).height());
			}).appendTo( $('#SQLWindow_'+this.id) );

		}

		// 最后，显示当前被点击的窗口，其它隐藏
		for ( i = 0; i < GMIXWINDOWS; i++ ) {
			if (this.id == ('n'+i)) {
				$('#SQLWindow_'+ 'n' + i ).css("display","inline");
			} else {
				$('#SQLWindow_'+ 'n' + i ).css("display","none");
			}
		}
	}

	setTimeout(function() {
		createSqlForColorText(parent.leftFrameList.GTDID, url)
		GGETFRAME = document.getElementById("if_SQLWindow_" + parent.leftFrameList.GTDID).contentWindow;
	}, 500);
	//createSqlForColorText(parent.leftFrameList.GTDID, url);



	$(document).ready(function(){
		$("button").click(function(){



		});
	});



</script>
</html>