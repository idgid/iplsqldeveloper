<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="org.reddragonfly.iplsqldevj.bean.CharSet" %>
<%@ page import="org.reddragonfly.iplsqldevj.DBUtilities"%>

<%
	String type = CharSet.nullToEmpty(request.getParameter("type")).toUpperCase();
	String typelow = CharSet.nullToEmpty(request.getParameter("type")).toLowerCase();
	String name = CharSet.nullToEmpty(request.getParameter("name")).toUpperCase();
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
	    <title>View</title>
	    <link type="text/css" rel="StyleSheet" href="../../css/cb2.css" />
	    <link type="text/css" rel="StyleSheet" href="../../css/tab.winclassic.css" />
	    <script type="text/javascript" src="../../js/tabpane.js"></script>
	    <script type="text/javascript" src="../../js/others.js"></script>
	    <script type="text/javascript" src="../../js/mootools.js"></script>
	    <script type="text/javascript" language="JavaScript1.5"
			src="../../js/ieemu.js"></script>
		<script type="text/javascript" src="../../js/cb2.js"></script>
		<script type="text/javascript" src="../../js/edit_area/edit_area_full.js"></script>

	</head>
	<style>
        * {
            box-sizing: border-box;
            -moz-box-sizing: border-box;
        }
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
			text-align: right;
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
			/*float: left;*/

		}
		.dynamic-tab-pane-control .tab-page {
			height:			100%;
			min-height:		800px;

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
		#errorInfo{
			flex: 0 0 112px;
			background-color: #fff;
			width: 100%;
			height: 112px;
			overflow-y: auto;
			font-size: 12px;
			font-family: "Courier New", Courier, mono;
			bottom: 26px;
			z-index: -1;
		}
		#errorInfo.show{
			border: 2px solid #a0a0a0;
			z-index: 9;
		}
		#errorInfo.hide{
			border: none;
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
	<body ondragstart="return false" oncontextmenu="return false" onload="initOnload()">


		<div id="FunSQLWindowContainer">

			<div class="main">
						<textarea id="myTextarea" class="editor" name="myTextarea_editor"></textarea>
                            <div id="autoCompletion" name="autoCompletion"></div>


            </div>
			<div id="errorInfo" name="errorInfo" class="show">
			</div>
			<footer id="foot_outputDiv" class="footer">

				<table border="0" id="toolBar_footer" style="background: ButtonFace;"
					   cellspacing="1" width="100%">
					<tr align='left'>
						<td class="coolButtonDisabled_my">
							<img id='execIsRunButton' src="../../images/exec_fun_norun.gif"
								 align="absmiddle">
						</td>
						<td class="coolButton" onclick="">
							<img id='autorefreshButton' src="../../images/compiler_preferences.png"
								 title="compiler preferences..."
								 alt="compiler preferences..." align="absmiddle">
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
				,fullscreen: true
				,EA_load_callback: "editAreaLoaded"
				,save_callback: "winsave"
			});

			function editAreaLoaded(id){

				var trRow = parent.parent.leftFrameList.GWINDOWLIST[parent.parent.leftFrameList.getWindowTr()][1].substring(1,2);
				var frame = parent.parent.editorFrame.GGETFRAME;
				var editorFlag = true;

				// editAreaLoader.execCommand('myTextarea', 'false', !editAreaLoader.execCommand('myTextarea', 'fullscreen'));
				//self.setInterval(showPosition(frame, trRow),200);
				if (!editorFlag ) {
					editAreaLoader.execCommand('myTextarea','set_editable',editorFlag);
				} else {
					editAreaLoader.execCommand('myTextarea','set_editable',editorFlag);
					self.setInterval(showPosition(frame, trRow),200);
				}

				if(id=="myTextarea")
				{
					open_newtabforname();

					//open_file2();
					return 0;
				}


				function open_newtabforname()
				{
					var texttmp = "<%=DBUtilities.showObjectView(request.getSession(), type, name).toString().replaceAll("[\\n]","").replaceAll("\"","\\\\\"")%>";
					texttmp = texttmp.replace(/<br\/>/g,"\n");
					titlename = '<%=name %>';
					imgPath = "../../tree/dbimages/";
					imgIco = "";
					if ("<%=typelow %>" == "function") {
						imgIco = "valid_funs.png";
					} else if ("<%=typelow %>" == "procedure") {
						imgIco = "valid_prcs.png";
					} else if ("<%=typelow %>" == "package") {
						imgIco = "valid_pkgs.png";
					} else if ("<%=typelow %>" == "package body") {
						imgIco = "valid_pkgs_b.png";
					} else if ("<%=typelow %>" == "type") {
						imgIco = "valid_types.png";
					} else if ("<%=typelow %>" == "type body") {
						imgIco = "valid_types_b.png";
					} else if ("<%=typelow %>" == "trigger") {
						imgIco = "ena_triggers.png";
					} else if ("<%=typelow %>" == "java source") {
						imgIco = "valid_javas.png";
					} else if ("<%=typelow %>" == "view") {
						imgIco = "valid_views.png";
					} else if ("<%=typelow %>" == "materialized view") {
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
				cells1[1].setToggle(false);

				cells1[1].setValue(false, false);
			}
			initViewFootButton();

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

			function addMyTextAreaKeyDown(keycode) {
				mykeydown(keycode, 'myTextarea');
			}

			function initOnload() {};
			function detectCtrlKey(e) {};
			function hiddenBaisworkMenu(e) {};
			function showBaisworkMenu(t,m,e) {};

		</script>
	</body>
</html>