<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="org.reddragonfly.iplsqldevj.bean.CharSet" %>
<%@page import="org.reddragonfly.iplsqldevj.DBUtilities"%>

<%
	String name = CharSet.nullToEmpty(request.getParameter("name"));
	if ("".equals(name)) name="Name";
	String parameters = CharSet.nullToEmpty(request.getParameter("parameters"));
	String tablelist = CharSet.nullToEmpty(request.getParameter("tablelist"));
	String returnType = CharSet.nullToEmpty(request.getParameter("returnType"));
	String objType = CharSet.nullToEmpty(request.getParameter("objType"));
	String statementLevlel = CharSet.nullToEmpty(request.getParameter("statementLevlel"));
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>View</title>
	<link type="text/css" rel="StyleSheet" href="../../css/cb2.css" />
	<link type="text/css" rel="StyleSheet" href="../../css/tab.winclassic.css" />
	<%--<script type="text/javascript" src="../../js/tabpane.js"></script>--%>
	<script type="text/javascript" src="../../js/mootools.js"></script>
	<script type="text/javascript" language="JavaScript1.5"
			src="../../js/ieemu.js"></script>
	<script type="text/javascript" src="../../js/cb2.js"></script>
	<script type="text/javascript" src="../../js/edit_area/edit_area_full.js"></script>
	<script type="text/javascript" src="../../js/others.js"></script>
	<script type="text/javascript" src="../../js/baisworksql.js"></script>
	<!--以下是dwr的必备js  -->
	<script type='text/javascript' src='../../dwr/interface/BaisWorkBean.js'></script>
	<script type='text/javascript' src='../../dwr/engine.js'></script>


</head>
<style>
	html,body {
		background: ButtonFace;
		margin: 0px;
		padding: 0px;
		font-family: 'Verdana', 'Tahoma', 'Helvetica', 'Arial';
		height: 100%;
	}
	.lagerfont{
		font-size: 12px;
	}
	.smallfont{
		font-size: 12px;
	}
	.editorout {
		border-left: 1px ridge #999999;
		border-right: 1px ridge #999999;
		border-top: 1px ridge #999999;
		border-bottom: 1px ridge #999999;
	}
	.editorin {
		border-left: 1px inset #999999;
		border-right: 1px inset #999999;
		border-top: 1px inset #999999;
		border-bottom: 1px inset #999999;
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
		height:100%;
		float: left;
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

    .top{
        /*min-height: calc(100vh - 50px);*/
        min-height: 100%;
    }

	#FunSQLWindowContainer{
		display: flex;
		flex-direction: column;
		height: 99%;
		overflow: no;
		background-color: ButtonFace;
		border: 0px;
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
<body ondragstart="return false" oncontextmenu="return false">
<div id="FunSQLWindowContainer">

			<div class="main">
				<textarea id="myTextarea" class="editor" name="myTextarea_editor">

				</textarea>
			</div>


    <footer id="foot_outputDiv" class="footer">
        <table border="0" id="toolBar_footer" style="background: ButtonFace;"
               cellspacing="1" width="100%">
            <tr align='left'>
                <td class="coolButtonDisabled_my">
                    <img id='execIsRunButton' src="../../images/exec_fun_norun.gif"
                         align="absmiddle">
                </td>
                <td tabIndex="1" onclick="changeAutorefresh('autorefreshButton')">
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

	function editAreaLoaded(id){

        var trRow = parent.parent.leftFrameList.GWINDOWLIST[parent.parent.leftFrameList.getWindowTr()][1].substring(1,2);
        var frame = parent.parent.editorFrame.GGETFRAME;

        // editAreaLoader.execCommand('myTextarea', 'false', !editAreaLoader.execCommand('myTextarea', 'fullscreen'));
		self.setInterval(showPosition(frame, trRow),200);


		if(id=="myTextarea")
		{
			open_newtabforname();

			//open_file2();
			return 0;
		}

		function open_newtabforname()
		{
			var texttmp = "<%=DBUtilities.getReturnObjContent(name, parameters, returnType, objType, request.getRemoteUser(),tablelist, statementLevlel) %>";
			texttmp = texttmp.replace(/<br\/>/g,"\n");
			titlename = '<%=name %>';
            imgPath = "../../tree/dbimages/";
            imgIco = "";
            if ("<%=objType %>" == "function") {
                imgIco = "valid_funs.png";
            } else if ("<%=objType %>" == "procedure") {
                imgIco = "valid_prcs.png";
            } else if ("<%=objType %>" == "package") {
                imgIco = "valid_pkgs.png";
            } else if ("<%=objType %>" == "package_body") {
                imgIco = "valid_pkgs_b.png";
            } else if ("<%=objType %>" == "type") {
                imgIco = "valid_types.png";
            } else if ("<%=objType %>" == "type_body") {
                imgIco = "valid_types_b.png";
            } else if ("<%=objType %>" == "trigger") {
                imgIco = "ena_trigers.png";
            } else if ("<%=objType %>" == "java_source") {
                imgIco = "valid_javas.png";
            } else if ("<%=objType %>" == "view") {
                imgIco = "valid_views.png";
            } else if ("<%=objType %>" == "materialized_view") {
                imgIco = "mat_views.png";
            }

			titlename = '<img src="'+ imgPath + imgIco + '">' + " " + titlename + "&nbsp;&nbsp;";

			var new_file= {id: "funEditorId", text: texttmp, syntax: 'sql', title: titlename};
			editAreaLoader.openFile('myTextarea', new_file);
		}
	}

	function showPosition(f, t) {
	    return function() {
		//self.setInterval("console.log(1)",50);
        var imgName = 'execIsRunButton';

		document.getElementById('positionCurr').innerText = document.getElementById('frame_myTextarea').contentWindow.editArea.last_selection.line_start + ":" +
				document.getElementById('frame_myTextarea').contentWindow.editArea.last_selection.curr_pos;

        document.getElementById('frame_myTextarea').contentWindow.editArea.check_file_changes() == true ? changeEditorFun(true, imgName, f, t) : changeEditorFun(false, imgName, f, t);

        }
	}

	function initViewFootButton() {
		var cells1 = document.getElementById('toolBar_footer').rows[0].cells;
		for (var i = 1; i <= 1; i++)
		{
			createButton(cells1[i]);
			//cells1[i].setAlwaysUp(true)
		}
		cells1[1].setToggle(true);

		cells1[1].setValue(true, true);
	}
	initViewFootButton();
	//setupAllTabs();


	// 文本内容保存到本地
	function winsave() {
		f = "tmp_fun.sql";
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

	function initOnload() {};
	function detectCtrlKey(e) {};
	function hiddenBaisworkMenu(e) {};
	function showBaisworkMenu(t,m,e) {};
	function addMyTextAreaKeyDown(c) {};

</script>
</body>
</html>