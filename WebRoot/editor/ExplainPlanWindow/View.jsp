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



        .footer {
            background-color : ButtonFace;
            overflow: no;
            height: 26px;
            width: 100%;
            margin-top: -26px;
            position: absolute;
        }

        .top{
            /*min-height: calc(100vh - 50px);*/
            min-height: 100%;
        }

		.editor {
			font-family: "Courier New", Courier, mono;
			font-size: 12px;
			overflow: auto;
			background-color: #FFFFFF;
			scrollbar-3dlight-color: threedhighlight;
			scrollbar-darkshadow-color: threedshadow;
			scrollbar-highlight-color: buttonface;
			scrollbar-shadow-color: buttonface;
			width: 100%;
			height: 100%;
			/* float: left; */
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

		.BaisworkM {
			position: absolute;
			display: none;
			overflow: hidden;
			width: 150px;
			background-color: buttonface;
			padding: 1px;
			border: 2px outset;
			z-index: 100;
			font-size: 12px;
			filter: none;
			-moz-opacity: 1;
			font: Menu;
		}

		.BaisworkM ul {
			margin: 1px;
			border-bottom: buttonhighlight 1px solid;
			border-top: buttonshadow 1px solid;
		}

		.BaisworkM a {
			display: block;
			width: 100%;
			padding: 1px 2px 2px 15px;
			cursor: default;
			text-decoration: none;
			color: #000000;
			font: Menu;
		}

		.BaisworkM a:hover {
			background: highlight;
			color: highlighttext;
			font: Menu;
		}
        .even{
            background-color:#FFFFFF;
        }
        .uneven{
            background-color:#E5FFE5;
        }

		#autoCompletion{
			position: absolute;
            background-color: #fff;
			width: 350px;
			height: 96px;
			overflow-y: auto;
			font-size: 12px;
			font-family: "Courier New", Courier, mono;
			z-index: -1;
		}
		#autoCompletion.show{
			border: 2px solid #a0a0a0;
            z-index: 999999;
		}
		#autoCompletion.hide{
			border: none;
		}
        #autoSelector {
            font-size: 12px;
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
        .s16 {
            border-width : 1px;
            border-color : #CCCC99;
            border-style: solid;color:#006699;font-size:8pt;
        }
        .s26 {
            border-width : 1px;
            border-color : #CCCC99;
            border-style: solid;
        }
        .code-string {
            color:#333;
        }
        .code-number {
            color:#cc00cc;
        }
        .code-boolean {
            color:#00ff00;
        }
        .code-null {
            color:#808080;
        }
        .code-key {
            color:#000080;
            font-weight:bold;
        }
        .code-attr {
            color:#3939ff;
        }
        .code-cdata {
            color:#008080;
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
<div id="SQLWindow" style="width: 100%; height: 100%;">
	<div id="BaisworkMenu" name="BaisworkMenu" class="BaisworkM"></div>
    <div class="top">
	<div id="myText"
		 style="border: 2px; overflow: no; background-color: ButtonFace; width: 100%; height: 30%">
		<div id="editortop" class="webfxGrid" style="width: 100%" >
			<%--<div id="myTextarea" class="editor" contentEditable--%>
			<%--onkeydown="detectCtrlKey(event)" onkeyup=""--%>
			<%--onclick='hiddenBaisworkMenu(event)'--%>
			<%--onmouseup='showBaisworkMenu("myTextarea","BaisworkMenu",event)'>--%>
			<%--<!-- onkeyup="doHighlight(event)" -->--%>
			<%--</div>--%>

			<textarea id="myTextarea" class="editor" name="myTextarea_editor"></textarea>
				<div id="autoCompletion" name="autoCompletion"></div>


		</div>
	</div>
	<div id="t_controlDiv"
		 style="border: 1px; overflow: no; background-color: ButtonFace; padding-bottom:26px; height: 70%; width: 100%;">

		<div id="explain_outputDiv"
			 style="overflow: no; background-color : ButtonFace; width: 100%">

			<table border="0" id="toolBar" style="background: ButtonFace;"
				   cellspacing="3">
				<tr>
					<td class="coolButton">
						<span style="font-family: Arial, Courier, mono; font-size: 12px;">Optimizer goal</span>
					</td>
					<td id="planChooseTd">
						<select style="width:85px;font-size:12px;" name="planChoose" id="planChoose" onchange="parent.parent.editorFrame.explain('myTextarea')">
							<option value="choose" >Choose</option>
							<option value="rule" >Rule</option>
							<option value="first_rows" >First rows</option>
							<option value="all_rows" selected>All rows</option>
						</select>
					</td>
					<td class="coolButtonDisabled" id='arLeftAbsTd'
						onclick="arLeftAbs()">
						<img id='arLeftAbsButton' src="../../images/ar_left_abs.png"
							 title="First operation" alt="First operation" align="absmiddle">
					</td>
					<td class="coolButtonDisabled" id='arLeftTd'
						onclick="arLeft()">
						<img id='arLeftButton' src="../../images/ar_left.png"
							 title="Previous operation" alt="Previous operation" align="absmiddle">
					</td>
					<td class="coolButtonDisabled" id='arRightTd'
						onclick="arRight()">
						<img id='arRightButton' src="../../images/ar_right.png"
							 title="Next operation" alt="Next operation" align="absmiddle">
					</td>
					<td class="coolButtonDisabled" id='arRightAbsTd'
						onclick="arRightAbs()">
						<img id='arRightAbsButton' src="../../images/ar_right_abs.png"
							 title="Last operation" alt="Last operation" align="absmiddle">
					</td>
					<td class="coolButtonDisabled" id="preferencesTd"
						onclick="">
						<img id='preferencesButton' src="../../images/compiler_preferences.png"
							 title="Preferences..." alt="Preferences..." align="absmiddle">
					</td>

					<td class="coolButton" width="95%">
						&nbsp;
					</td>
				</tr>

			</table>

		</div>
		<div id="ExplainPlanWindow" style="min-height:100%; _height:100%; border: 2px; overflow: no; background-color: ButtonFace;">
			<div class="tab-pane" id="explainTabPanel" style="height:100px; ">
				<div class="tab-page" id="tabpage_1" style="height:100px; overflow: auto; padding: 0px">
					<h2 class="tab" id="tabTitle_1">
						<img style="border:none" id='objIcoId_1' src='' align='absmiddle' /><span id="tmpImg_1" style="display:none"></span>
						<span id='objTitle_1'>Tree</span>
					</h2>
					<div style="width: 100%; height: 95%; background-color: white"
						 name="outResultDiv" id="outResultDiv"
						 onclick="hiddenBaisworkMenu(event)"
						 onmouseup="hiddenBaisworkMenu(event)">
					</div>
					<div id="outResultMenu" name="outResultMenu" class="BaisworkM"></div>
				</div>
				<div class="tab-page" id="tabpage_2" style="height:100px; overflow: auto;">
					<h2 class="tab" id="tabTitle_2">
						<img style="border:none" id='objIcoId_2' src='' align='absmiddle' /><span id="tmpImg_2" style="display:none"></span>
						<span id='objTitle_2'>HTML</span>
					</h2>
                    <div id="explainHtmlId" style="font-family: Arial, Courier, mono; font-size: 12px;">
                    </div>
				</div>
				<div class="tab-page" id="tabpage_3" style="height:100px; overflow: auto;">
					<h2 class="tab" id="tabTitle_3">
						<img style="border:none" id='objIcoId_3' src='' align='absmiddle' /><span id="tmpImg_3" style="display:none"></span>
						<span id='objTitle_3'>Text</span>
					</h2>

					<div id="explainTextId" style="font-family: Arial, Courier, mono; font-size: 12px; color: #000080;">
					</div>

				</div>
				<div class="tab-page" id="tabpage_4" style="height:100px; overflow: auto;">
					<h2 class="tab" id="tabTitle_4">
						<img style="border:none" id='objIcoId_4' src='' align='absmiddle' /><span id="tmpImg_4" style="display:none"></span>
						<span id='objTitle_4'>XML</span>
					</h2>
                    <div id="explainXMLId" style="font:normal normal 8pt Verdana,Arial; font-size: 12px; color:#000080;"></div>
				</div>
			</div>
		</div>
        <script type="text/javascript">
            var ctHeightObj = parent.parent.editorFrame.GGETFRAME.document.getElementById('ExplainPlanWindow');
            var ctpageObj1 = parent.parent.editorFrame.GGETFRAME.document.getElementById('tabpage_1');
            var ctpageObj2 = parent.parent.editorFrame.GGETFRAME.document.getElementById('tabpage_2');
            var ctpageObj3 = parent.parent.editorFrame.GGETFRAME.document.getElementById('tabpage_3');
            var ctpageObj4 = parent.parent.editorFrame.GGETFRAME.document.getElementById('tabpage_4');


            var deHeight = 53; // footer 26px + tabtitle 25 px + border 2px
            var ctpageHeight = ctHeightObj.clientHeight - deHeight;
            ctpageObj1.style.height = ctpageHeight + "px";
            ctpageObj2.style.height = ctpageHeight + "px";
            ctpageObj3.style.height = ctpageHeight + "px";
            ctpageObj4.style.height = ctpageHeight + "px";


            var commandTabPane = new WebFXTabPane( document.getElementById( "explainTabPanel" ), true );

        </script>




	</div>
    </div>
    <footer id="foot_outputDiv" class="footer">
        <table border="0" id="toolBar_footer" style="background: ButtonFace;"
               cellspacing="1" width="100%">
            <tr align='left'>
                <td class="coolButtonDisabled_my">
                    <img id='execIsRunButton' src="../../images/view_explain.png"
                         align="absmiddle">
                </td>
                <td class="coolButton" onclick="">
                    <img id='autorefreshButton' src="../../images/autorefresh.gif"
                         title="Auto refresh timer (5 sec)"
                         alt="Auto refresh timer (5 sec)" align="absmiddle">
                </td>
                <td class="coolButtonActiveHover" width="5%">
                    <div id="positionCurr" style="font-family: Arial, Courier, mono; font-size: 12px;">1:1</div>

                </td>
                <td class="coolButtonActiveHover" width="95%">
                    <div id="footview" style="font-family: Arial, Courier, mono; font-size: 12px;">
                        &nbsp;
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
</script>

<script>

    var explainPlanDataArray = [];
    var explainDatalink = [];
    var explainDatalinkPoint = 0;  // 初始指向 0 的位置

    // initialisation
	editAreaLoader.init({
		id: "myTextarea"	// id of the textarea to transform
		,start_highlight: true	// if start with highlight
		,allow_resize: "both"
		,allow_toggle: false
		,word_wrap: false
		,language: "en"
		,syntax: "sql"
		,show_line_colors: true
        ,fullscreen: false
		,EA_load_callback: "editAreaLoaded"
        ,save_callback: "winsave"
	});


	function initToolBarButton() {
		var cells = document.getElementById('toolBar').rows[0].cells;
		for (var i = 2; i < cells.length-1; i++)
		{
			createButton(cells[i]);
			cells[i].setEnabled(false);

			//cells1[i].setAlwaysUp(true)
		}

		cells[4].setEnabled(true);
		cells[5].setEnabled(true);
		// cells[6].setEnabled(true);

		// cells[9].setToggle(true);

		var cells1 = document.getElementById('toolBar_footer').rows[0].cells;
		for (var i = 1; i <= 1; i++)
		{
			createButton(cells1[i]);
			//cells1[i].setAlwaysUp(true)

		}

		cells1[1].setToggle(true);
		// cells1[0].setValue(true, true);
	}
	initToolBarButton();

	createBaisWorkMenu('BaisworkMenu');

	function editAreaLoaded(id){

        // editAreaLoader.execCommand('myTextarea', 'false', !editAreaLoader.execCommand('myTextarea', 'fullscreen'));
        self.setInterval("showPosition()",200);


        if(id=="myTextarea")
		{
			//open_file1();
			//open_file2();
			return 0;
		}
	}

	function showPosition() {
        //self.setInterval("console.log(1)",50);
        document.getElementById('positionCurr').innerText = document.getElementById('frame_myTextarea').contentWindow.editArea.last_selection.line_start + ":" +
            document.getElementById('frame_myTextarea').contentWindow.editArea.last_selection.curr_pos;

	}

    // 文本内容保存到本地
    function winsave() {
        f = "explain.sql";
        c = document.getElementById('frame_myTextarea').contentWindow.editArea.last_selection.full_text;
        try {
            save_record(f, c);
        } catch (e) {
            console.log(e);
        }

        function save_record(f, c) {
            if (document.getElementById("downloada")) {
                a = document.getElementById('downloada');
                a.setAttribute('href','data:text/paint;utf-8,'+ c);
                a.click();
            } else {
                var a = document.createElement('a');
                a.setAttribute('href','data:text/paint;utf-8,'+ c);
                a.setAttribute('download',f);
                a.setAttribute('id','downloada');
                //a.setAttribute('target','_blank');
                a.style.display="none";
                document.body.appendChild(a);
                a.click();
            }


            // var ws = window.open();
            // ws.document.open("text/html", "utf-8");
            // ws.document.write(c);
            // ws.document.execCommand("saveas", true, f + ".sql");
            // ws.close();
        }
    }

    function explainInit(s) {
	    var sql = [];
	    var m = parent.parent.editorFrame.GGETFRAME.document.getElementById('planChoose');
        sql[0] = "explain plan for "  + s ;
        sql[1] = "select * from table(dbms_xplan.display())";
        sql[2] = "select id,\n" +
            "       parent_id,\n" +
            "       (case when parent_id is null then\n" +
            "             lpad('　', 2 * (level - 1), '　') || operation || ' ' || options ||', '||'GOAL = '||optimizer \n" +
            "       else \n" +
            "             lpad('　', 2 * (level - 1), '　') || operation || ' ' || options \n" +
            "       end) descr,\n" +
            "       object_owner,\n" +
            "       object_name,\n" +
            "       cost,\n" +
            "       cardinality,\n" +
            "       bytes,\n" +
            "       time,\n" +
            "       other_xml\n" +
            "  from plan_table t\n" +
            " start with parent_id is null\n" +
            "connect by prior id = parent_id";
        m = m.options[m.selectedIndex].value;
        sql[4] = "alter session set optimizer_mode=" + m;

		BaisWorkBean.intOfInsertDelete(sql[4], '');
		BaisWorkBean.intOfInsertDelete(sql[0], explainErrorCallback);
        DbObjectBean.getOther2(sql[1], ['Explain Info'], explainInfoCallback);
        DbObjectBean.getOther2(sql[2], ['Id','Pid','Description','Object owner','Object name', 'Cost', 'Cardinality', 'Bytes', 'Time', 'XML'], explainTreeCallback);

        // 最后回滚
        setTimeout(function(){
            BaisWorkBean.setDbRollback();
        },600);


        function explainErrorCallback(data) {
            if (data != '' || data != null)
                if(data[0].length == 2 && data[0][0] == "ReddragonflyErrorFlag*") {
                    parent.parent.editorFrame.dhtmlx.alert({
                        title: "ERROR",
                        top: dAlertTop,
                        type: "alert-error",
                        text: data[0][1]
                    });
                }
        }

        function explainTreeCallback(data) {
            // console.log(data);
            var mdata = [];
            var xmlf = "";
            explainPlanDataArray = [];

            for (var i = 0; i < data.length; i++) {
                mdata[i] = [], explainPlanDataArray[i] = [];
                for (var j = 2; j < data[0].length-2; j++) {
                    mdata[i][j-2] = data[i][j];
                }
                for (var k = data[0].length-1; k < data[0].length; k++) {
                   (i > 0) ? xmlf += data[i][k] : '';
                }
                explainPlanDataArray[i][0] = data[i][0];
                explainPlanDataArray[i][1] = data[i][1];
            }
            // 第一个 TAB 页 -- Tree
            parent.parent.editorFrame.GGETFRAME.showDataHtmlExplain('outResultDiv', mdata);


            // 第四个 TAB 页 -- XML
            // xmlf = "<xmp>" + xmlf + "</xmp>";
            xmlf = parseXML(xmlf);
            $('explainXMLId').set('html', xmlf);

            // 创建计划执行链路数组
            explainDatalink = getEPLDataLink(explainPlanDataArray);

			// 重置
			explainDatalinkPoint = 0;
			setExplainButton(2, false);
			setExplainButton(3, false);
			setExplainButton(4, true);
			setExplainButton(5, true);
			// 定位到计划表中最开始的位置
			parent.parent.editorFrame.GGETFRAME.explainMygrid.setSelectedRow(parseInt(explainDatalink[explainDatalinkPoint]) + 1);  // grid 中第一行为 title ， 加上跳过



        }


        function explainInfoCallback(data) {
            var s = '';
            var sFlag = 0;
            var sf = 0;
            // 第二个TAB页面 -- HTML
            var tabstyle = "font:normal normal 8pt Verdana,Arial;text-decoration:none;color:#000000; border:0px;";
            var tabhtmlf = '<table style="' + tabstyle + '">';
            for( var i = 1; i < data.length; i++) {
                if ( i == 1 ) {
                    var sh =  data[i].split(":");
                    tabhtmlf += '<tr>' + '<th align="left">' + sh[0] + '</th>';
                    tabhtmlf += '<td>:' + sh[1] + '</td> </tr>';
                    tabhtmlf += '</table>';
                    tabhtmlf += '<br/>';
                    tabhtmlf += '<table bordercolor="#000000" style="font:normal normal 8pt Verdana,Arial; border:0px;">';
                } else if ( i == 4 ) {
                    var st = data[i];
                    if (st.replace(/^-.*$/g, '') != "") {
                        st = data[i].split("|");
                        tabhtmlf += '<tr>';
                        for ( var j = 1; j < st.length - 1; j ++ ) {
                            st[j] = st[j].trim();
                            tabhtmlf += '<th align="left" bgcolor="#CCCC99" class="s16">' + st[j] + '</th>';
                        }
                        tabhtmlf += '</tr>';
                    }
                } else if ( i > 4 && sFlag <= 3) {
                    var std = data[i];
                    if (std.replace(/^-.*$/g, '') != "") {
                        std = data[i].split("|");
                        tabhtmlf += '<tr bgcolor="#F7F777" valign="bottom">';
                        for ( var j = 1; j < std.length - 1; j ++ ) {
                            var alignStr = "right";
                            std[2] = std[2].replace(/ /g, '&nbsp;');
                            ( j == 2 || j == 3 ) ? alignStr = "left" : '';

                            tabhtmlf += '<td class="s26" align="' + alignStr + '">' + std[j] + '</td>';
                        }
                        tabhtmlf += '</tr>';
                    }
                }

                (data[i].replace(/^-.*$/g, '') == "") ? sFlag++ : '';

                (sFlag == 3) ? (sf = i, sFlag++, tabhtmlf += '</table><br/>') : '';

               if ( i > sf && i > 4 && sFlag > 3) {
                   (i == sf + 2) ? tabhtmlf += data[i] : '';
                   (i == sf + 3) ? tabhtmlf += '<hr size="1" width="260" align="left"/>' : '';
                   (i == sf + 4) ? tabhtmlf += '<ul style="font:normal normal 8pt Verdana,Arial; margin:15px; padding: 10px; list-style: inside;">' : '';
                   if (i >= sf + 5 ) {
                       if (data[i] != null) {
                           // 连续多行拼接
                           (data[i].trim().match(/^[0-9].* - /) != null) ? tabhtmlf += '<li>' + data[i] : tabhtmlf += data[i];
                           if (i < data.length -1) (data[i+1].trim().match(/^[0-9].* - /) != null && i < data.length -2) ? tabhtmlf += '</li>' : '';
                           else tabhtmlf += '</li>';
                       }
                   }
                   (i == data.length -1) ? tabhtmlf += '</ul>' : '';
               }

            }
            // tabhtmlf += '</table>';

            $('explainHtmlId').set('html', tabhtmlf);


            // 第三个TAB页面 -- Text
            for( var i = 1; i < data.length; i++) s +=  data[i] + "\n";
            s = "<pre>" + s + "</pre>";
            $('explainTextId').set('html', s);
        }

    }

    // 对 XML 显示格式化
    var parseXML = function(content) {
        var xml_doc = null;
        try {
            xml_doc = (new DOMParser()).parseFromString(content.replace(/[\n\r]/g, ""), 'text/xml');
        } catch (e) {
            return false;
        }
        var flag=0;
        var list = [];
        buildXML(0, list, xml_doc.documentElement);


        function buildXML(index, list, element) {
            var t = []
            for (var i = 0; i < flag; i++) {
                t.push('&nbsp;&nbsp;&nbsp;&nbsp;');
            }
            t = t.join("");
            list.push(t + '&lt;<span class="code-key">'+ element.nodeName +'</span>&gt;<br/>');
            for (var i = 0; i < element.childNodes.length; i++) {
                var nodeName = element.childNodes[i].nodeName;
                var nodeAttr = "";
                if (element.childNodes[i].getAttributeNames().length > 0) {
                    nodeAttr = '&nbsp;' + element.childNodes[i].getAttributeNames()[0] + '=<span class="code-attr">"' + element.childNodes[i].getAttribute(element.childNodes[i].getAttributeNames()[0]) + '"</span>';
                }
                if (element.childNodes[i].childNodes.length===0) {
                    var value_txt =""
                    var item = t + '&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="code-key">' + nodeName +
                        '</span>' + nodeAttr +'&gt;' + value_txt + '&lt;/<span class="code-key">' + nodeName + '</span>&gt;<br/>';
                    list.push(item);
                } else if ( (element.childNodes[i].childNodes.length === 1 && element.childNodes[i].childNodes[0].nodeValue!=null)) {
                    var value = element.childNodes[i].innerHTML;
                    value = value.replace(/\&/g, '&amp;').replace(/\</g,'&lt;').replace(/\>/g,'&gt;').replace(/\"/g, '&quot;');
                    value = value.replace('![CDATA[','<span class="code-cdata">![CDATA[</span>');
                    var value_color = !isNaN(Number(value)) ? 'code-number' : 'code-string';
                    var value_txt = '<span class="'+ value_color +'">' + value + '</span>';
                    var item = t + '&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span class="code-key">' + nodeName +
                        '</span>' + nodeAttr +'&gt;' + value_txt + '&lt;/<span class="code-key">' + nodeName + '</span>&gt;<br/>';
                    list.push(item);

                } else {
                    flag++;
                    buildXML(++index, list, element.childNodes[i]);
                    flag--;
                }
            }
            list.push(t + '&lt;/<span class="code-key">'+ element.nodeName +'</span>&gt;<BR/>');
        }

        return list.join("");
    };

	// 得到某个节点的最末子节点
    // 入参：关系数组，节点ID
	function getEPLFirstChildrenNode(a, id) {
	    var arr = a;
	    var rid = id;
        for ( var i = 0; i < arr.length; i++ ) {
            if ( arr[i][1] == id) id = arr[i][0];
        }
        rid = id;
        return rid;
    }

    // 得到某节点的父节点
    // 入参：关系数组，节点ID
    function getEPLParenetNode(a, id) {
        var arr = a;
        var rid = id;
        for ( var i = 0; i < arr.length; i++ ) {
            if ( arr[i][0] == id) rid = arr[i][1];
        }
        rid == id ? rid = '' : '';
        return rid;
    }

    // 得到某个节点的下一个平级节点
    // 入参：关系数组，节点ID
    function getEPLNextNode(a, id) {
        var arr = a;
        var pid = '';
        var rid = '';
        for ( var i = 0; i < arr.length; i++ ) {
            if ( arr[i][0] == id) {
                pid = arr[i][1];
            }
            // 已经找到 Pid
            if ( pid != '') {
                if (arr[i][1] == pid && arr[i][0] > id) {
                    rid = arr[i][0];
                    break;
                }
            }
        }
        return rid;
    }

    // 得到某节点的下一个步骤节点
    // 执行的先后顺序是从父节点开始找，有子节点先执行子节点，
    // 有多个子节点先执行从上向下的第一个，子节点全部执行完毕再执行父节点
    function getEPLNextStepNode(a, id) {
	    var arr = a;
        var rid = '';
        var rrid = '';
        // 除首节点外的规则
        // 首先找下一个同级
        // 为空，即不存在
        if ( getEPLNextNode(a, id) == '') {
            // 则找上一级
            rrid = getEPLParenetNode(a, id);
        } else {
            // 下一个同级存在
            // 则取该同级的最末节点
            rid = getEPLNextNode(a, id);
            rrid = getEPLFirstChildrenNode(a, parseInt(rid));

        }
        return rrid;
    }

    function getEPLDataLink(a) {
	    var dl = [];
	    // 首先得到起始节点 id
        dl[0] =  getEPLFirstChildrenNode(a, 0);
        // 再次从起始节点开始，逐步得到下一个节点
        for ( var i = 0; i < a.length-1; i++ ) {
            (getEPLNextStepNode(a, parseInt(dl[i])) == "") ? '' : dl[i+1] = getEPLNextStepNode(a, parseInt(dl[i]));
        }
        return dl;
    }

    // 前一步计划步骤 i = 3
    function arLeft() {
		var cells = document.getElementById('toolBar').rows[0].cells;
		var tmygrid = parent.parent.editorFrame.GGETFRAME.explainMygrid;
		if ( cells[3].getEnabled() ) {
			explainDatalinkPoint--;
			setExplainButton(4, true);
			setExplainButton(5, true);
			(explainDatalinkPoint <= 0) ? ( explainDatalinkPoint = 0,
					setExplainButton(2, false),
					setExplainButton(3, false),
					setExplainButton(4, true),
					setExplainButton(5, true) ) : '';
			tmygrid.setSelectedRow(parseInt(explainDatalink[explainDatalinkPoint]) + 1);
			doOnExplainRowSelected(tmygrid.getSelectedId(), 0);
		}

	}

	// 计划步骤开始位置 i = 2
	function arLeftAbs() {
		var cells = document.getElementById('toolBar').rows[0].cells;
		var tmygrid = parent.parent.editorFrame.GGETFRAME.explainMygrid;
		if ( cells[2].getEnabled() ) {
			explainDatalinkPoint = 0;
			setExplainButton(2, false);
			setExplainButton(3, false);
			setExplainButton(4, true);
			setExplainButton(5, true);
			tmygrid.setSelectedRow(parseInt(explainDatalink[explainDatalinkPoint]) + 1);
			doOnExplainRowSelected(tmygrid.getSelectedId(), 0);
		}
	};

	// 后一步计划步骤 i = 4
	function arRight() {
		var cells = document.getElementById('toolBar').rows[0].cells;
		var tmygrid = parent.parent.editorFrame.GGETFRAME.explainMygrid;
		if ( cells[4].getEnabled() ) {
			explainDatalinkPoint++;
			setExplainButton(2, true);
			setExplainButton(3, true);
			(explainDatalinkPoint >= (explainDatalink.length - 1)) ? ( explainDatalinkPoint = explainDatalink.length - 1,
					setExplainButton(2, true),
					setExplainButton(3, true),
					setExplainButton(4, false),
					setExplainButton(5, false) ) : '';
			tmygrid.setSelectedRow(parseInt(explainDatalink[explainDatalinkPoint]) + 1);
			doOnExplainRowSelected(tmygrid.getSelectedId(), 0);
		}
	}

	// 计划步骤结束位置 i = 5
    function arRightAbs() {
		var cells = document.getElementById('toolBar').rows[0].cells;
		var tmygrid = parent.parent.editorFrame.GGETFRAME.explainMygrid;
		if ( cells[4].getEnabled() ) {
			explainDatalinkPoint = explainDatalink.length - 1;
			setExplainButton(2, true);
			setExplainButton(3, true);
			setExplainButton(4, false);
			setExplainButton(5, false);
			tmygrid.setSelectedRow(parseInt(explainDatalink[explainDatalinkPoint]) + 1);
			doOnExplainRowSelected(tmygrid.getSelectedId(), 0);
		}

	}

	// 计划按钮关系设置 [位置, FALSE OR TRUE]
	function setExplainButton(i, f) {
		var cells = document.getElementById('toolBar').rows[0].cells;
		cells[i].setEnabled(f);
	}


</script>
</body>
</html>