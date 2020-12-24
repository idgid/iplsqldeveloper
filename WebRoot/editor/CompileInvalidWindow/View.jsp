<%@ page language="java" contentType="text/html; charset=UTF-8"
		 pageEncoding="UTF-8"%>
<%@ page import="org.reddragonfly.iplsqldevj.Utilities"%>
<%@ page import="org.reddragonfly.iplsqldevj.bean.UserBean"%>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>editor_newjsp</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<link type="text/css" rel="StyleSheet" href="../../css/cb2.css" />
	<link type="text/css" rel="StyleSheet" href="../../css/tab.winclassic.css" />
	<link type="text/css" rel="StyleSheet" href="../../css/grid.css" />
	<link type="text/css" rel="StyleSheet" href="../../css/dhtmlxgrid.css" />
	<script type="text/javascript" src="../../js/others.js"></script>
	<script type="text/javascript" src="../../js/mootools.js"></script>
	<script type="text/javascript" src="../../js/dhtmlxcommon.js"></script>
	<script type="text/javascript" src="../../js/dhtmlxgrid.js"></script>
	<script type="text/javascript" src="../../js/dhtmlxgridcell.js"></script>
	<script type="text/javascript" src="../../js/tabpane.js"></script>
	<script type="text/javascript" language="JavaScript1.5"
			src="../../js/ieemu.js"></script>
	<script type="text/javascript" src="../../js/cb2.js"></script>
	<script type="text/javascript" src="../../js/baisworksql.js"></script>
	<script type="text/javascript" src="../../js/edit_area/edit_area_full.js"></script>
	<!--以下是dwr的必备js  -->
	<script type='text/javascript' src='../../dwr/interface/BaisWorkBean.js'></script>
	<script type='text/javascript' src='../../dwr/interface/DbObjectBean.js'></script>
	<script type='text/javascript' src='../../dwr/engine.js'></script>
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
			font-family: 'Verdana', 'Tahoma', 'Helvetica', 'Arial';
		}

		table {
			border: 2px groove;
		}
		.dynamic-tab-pane-control .tab-page {
            height:	100%;
		}

		.dynamic-tab-pane-control .tab-page .dynamic-tab-pane-control .tab-page {
			height:		100px;
		}
		.dynamic-tab-pane-control h2 {
			text-align:	center;
			width:		auto;
		}

		.dynamic-tab-pane-control h2 a {
			display:	inline;
			width:		auto;
		}

		.dynamic-tab-pane-control a:hover {
			background: transparent;
		}

		p {
			margin: 0px;
		}

		.main{
			flex: 1 0 auto;
		}
		.footer {
			background-color : ButtonFace;
			overflow: no;
			flex: 0 0 auto;
		}

        /*.footer {*/
            /*background-color : ButtonFace;*/
            /*overflow: no;*/
            /*height: 26px;*/
            /*width: 100%;*/
            /*margin-top: -26px;*/
            /*position: absolute;*/
        /*}*/

        .top{
            /*min-height: calc(100vh - 50px);*/
            min-height: 100%;
        }

		#CompileInvalidWindow{
			display: flex;
			flex-direction: column;
			height: 100%;
			overflow: no;
			background-color: ButtonFace;
			border: 0px;
		}


		.functions {
			color: #ff1493;
		}

		.keywords {
			color: blue;
		}

		.operators {
			color: #808080;
		}


        .even{
            background-color:#FFFFFF;
        }
        .uneven{
            background-color:#E5FFE5;
        }


		ul{
			list-style: none;
			margin: 0px; padding: 0px;
		}
		li.mouseOver{
			background-color: #004a7e;
			color: #FFFFFF;
		}
		li.mouseOut{
			background-color: #FFFFFF;
			color: #004a7e;
		}
		#errorInfo {
			flex: 0 0 112px;
			background-color: #fff;
			width: 100%;
			height: 112px;
			overflow-y: auto;
			font-size: 12px;
			bottom: 26px;
			z-index: -1;
		}
		#errorInfo.show {
			border: 2px solid #a0a0a0;
			z-index: 9;
		}
		#errorInfo.hide {
			border: none;
		}
		.footerprogress {
			text-align: left;
			width: 0%;
			background-color: #06b025;
			color: #06b025;
		}

	</style>

	<style disabled="disabled" id="mozGrooveCSS">
		/* Mozilla does not understand disabled stylesheets but
                     * for forward compatibility I'll enabled it using js
                     * below
                     */
		table {
			border: 2px groove ButtonFace;
		}
	</style>
	<script language="JavaScript1.5">
			if (window.moz == true) document.getElementById("mozGrooveCSS").removeAttribute("disabled");

		</script>
	<script type="text/javascript">
		var editorPageTmp = 1;


	</script>

	<script type="text/javascript">

		//var sqlhighlighter = new SQLHighlighter();
		var ctrlKeyDown = false;
		function doHighlight(event){
			if(ctrlKeyDown) return;
			var keyCode = event.keyCode;
			if(keyCode == 16 || keyCode == 35 || keyCode == 36 || keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40 || keyCode == 119) return;
			sqlhighlighter.highlight(document.getElementById('myTextarea'));
		}
		function detectCtrlKey(event){
			if(event.ctrlKey) ctrlKeyDown = true;
			else ctrlKeyDown = false;
			mykeydown(event, 'myTextarea');
		}



	</script>

</head>
<body ondragstart="return false" oncontextmenu="return false" onload="initOnload()">
<div id="CompileInvalidWindow">
	<div id="main"
		 style="border: 2px; overflow: no; background-color: #FFF; width: 100%; height: 100%">

	</div>

		<div id="errorInfo" name="errorInfo" class="show">
		</div>
    <footer id="foot_outputDiv" class="footer">
        <table border="0" id="toolBar_footer" style="background: ButtonFace;"
               cellspacing="1" width="100%">
            <tr align='left'>
                <td class="coolButtonDisabled_my">
                    <img id='execIsRunButton' src="../../images/compile_invalid_object_f.png"
                         align="absmiddle">
                </td>
                <td class="coolButton" onclick="compileInvalidObjectsInit()">
                    <img id='autorefreshButton' src="../../images/compile_refresh.png"
                         title="Refresh object list"
                         alt="Refresh object list" align="absmiddle">
                </td>

                <td class="coolButtonActiveHover" width="100%">
                    <div id="footview" style="font-family: Arial, Courier, mono; font-size: 12px;">
						<div id="footerprogress" class="footerprogress">&nbsp;</div>
                    </div>
                </td>
            </tr>
        </table>

    </footer>
</div>



<script>
	function addMyTextAreaKeyDown(keycode) {

		// $('myTextarea').addEvent('keydown', function(event) {
		// 	mykeydown(event, 'myTextarea');
		// });

		mykeydown(keycode, 'myTextarea');
	}
	//addMyTextAreaKeyDown(keycode);

	function initViewFootButton() {
		var cells1 = document.getElementById('toolBar_footer').rows[0].cells;
		for (var i = 1; i <= 1; i++)
		{
			createButton(cells1[i]);
			//cells1[i].setAlwaysUp(true)
		}
		cells1[1].setToggle(false);

		cells1[1].setValue(false, false);

		// 对上面的 editortoolbar 设置
		setEditortoolbarForCIO();
	}
	initViewFootButton();
</script>

<script>


    function compileInvalidObjectsInit() {
	    var sql = [];
        sql[0] = "select object_name,object_type,last_ddl_time from user_objects where status='INVALID' order by namespace,object_type,object_name asc";

        DbObjectBean.getOther2(sql[0], ['Name','Type','Compiled'], compileInvalidCallback);



        function compileInvalidCallback(data) {
            // console.log(data);

            // 第一个 TAB 页 -- Tree
            parent.parent.editorFrame.GGETFRAME.showDataHtmlCompileInvalid('main', data);


        }
    }

	compileInvalidObjectsInit();



	function doOnCompileInvalidRowSelected(rowID,celInd){
		var objName = "";
		objName =  parent.parent.editorFrame.GGETFRAME.compileInvalidMygrid;
		var errSql = "select line,text from USER_ERRORS where NAME = upper( '" + objName.cells(rowID, 1).getValue() + "' ) order by sequence asc";

		DbObjectBean.getOther2(errSql, ['line','text'], compileInvalidErrorInfoCallback);

		function compileInvalidErrorInfoCallback(intdata) {
			var tcell = intdata[0].length;


			if (tcell == 2 && intdata[0][0] == "ReddragonflyErrorFlag*") {
				errOracleMsg = intdata[0][1];
				parent.parent.editorFrame.dhtmlx.alert({
					title: "ERROR",
					top: dAlertTop,
					type: "alert-error",
					text: intdata[0][1]
				});
			} else {
				var o = parent.parent.parent.editorFrame.GGETFRAME.document.getElementById('errorInfo');
				o.innerHTML = '';
				rows = intdata[0][1];

				// 警告信息显示与定位
				if (intdata.length > 1) {
					var bk = "width: 100%; color: #800000;";
					for (var i = 1; i < intdata.length; i++) {
						// i == 1 ? bk = "width: 100%; background-color: #0078d7; color: #eee;" : bk = "width: 100%; color: #ad0039;";
						o.innerHTML += "<div style='" + bk + "' onclick='parent.parent.parent.editorFrame.GGETFRAME.chcolor(event)'><span style='width: 5%; display: inline-block;'>" + intdata[i][0] + "</span><span style='width: 95%'>" + intdata[i][1] + "</span> </div>";
					}
				}
			}
		}
		// console.log(objName.cells(rowID, 1).getValue());

	}







</script>
</body>
</html>