<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="org.reddragonfly.iplsqldevj.bean.CharSet" %>
<%@page import="org.reddragonfly.iplsqldevj.DBUtilities"%>
<%@ page import="org.reddragonfly.iplsqldevj.bean.UserBean"%>
<%
	String name = CharSet.nullToEmpty(request.getParameter("name"));
	if ("".equals(name)) name="Name";
	String parameters = CharSet.nullToEmpty(request.getParameter("parameters"));
	String tablelist = CharSet.nullToEmpty(request.getParameter("tablelist"));
	String returnType = CharSet.nullToEmpty(request.getParameter("returnType"));
	String objType = CharSet.nullToEmpty(request.getParameter("objType"));
	String statementLevlel = CharSet.nullToEmpty(request.getParameter("statementLevlel"));
	UserBean ub = (UserBean) session.getAttribute("user");

%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
	<title>View</title>
	<link type="text/css" rel="StyleSheet" href="../../css/cb2.css" />
	<link type="text/css" rel="StyleSheet" href="../../css/tab.winclassic.css" />
	<link type="text/css" rel="StyleSheet" href="../../css/jsterm/jquery.terminal.css" />

	<script type="text/javascript" src="../../js/cb2.js"></script>
	<script type="text/javascript" src="../../js/others.js"></script>
	<script type="text/javascript" src="../../js/baisworksql.js"></script>
	<script type="text/javascript" src="../../js/jsterm/jquery-1.7.1.min.js"></script>
	<script type="text/javascript" src="../../js/jsterm/jquery.terminal.min.js"></script>
	<script type="text/javascript" src="../../js/jsterm/jquery.mousewheel-min.js"></script>
	<script type="text/javascript" src="../../js/jsterm/keyboard.js"></script>



	<!--以下是dwr的必备js  -->
	<script type='text/javascript' src='../../dwr/interface/BaisWorkBean.js'></script>
    <script type='text/javascript' src='../../dwr/interface/DbObjectBean.js'></script>
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
		/*flex: 1 0 auto;*/
        padding-bottom: 0px;
	}
    .main::after {
        display: block;
        height: 16px;
        content:'';
        visibility: hidden;
    }
    .footer {
        /*background-color : ButtonFace;*/
        /*overflow: no;*/
		/*flex: 0 0 auto;*/

        position: fixed;
        left: 0px;
        bottom: 0px;
        width: 100%;
        height: 26px;
        z-index: 9999;
	}

    .top{
        /*min-height: calc(100vh - 50px);*/
        min-height: 100%;
    }

	#CommandSQLWindowContainer{
		display: flex;
		flex-direction: column;
		height: 99%;
		overflow: no;
		background-color: #FFF;
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
<div id="CommandSQLWindowContainer">

			<div class="main" id="commandTerm" name="commandTerm">	</div>
            <div id="autoCompletion" name="autoCompletion"></div>


    <footer id="foot_outputDiv" class="footer">
        <table border="0" id="toolBar_footer" style="background: ButtonFace;"
               cellspacing="1" width="100%">
            <tr align='left'>
                <td class="coolButtonDisabled_my">
                    <img id='execIsRunButton' src="../../images/exec_norun.gif"
                         align="absmiddle">
                </td>
                <td tabIndex="1" onclick="">
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



	var term;
	var greetingsTitle = "Connected to <%=ub.getDbversion()%> " + "\n" + "Connected as <%=ub.getUsername()%>@<%=ub.getServername()%>\n";
	var defaultClobLen = 100;
    var titleUserObject = parent.parent.parent.topFrame.UserObject;
    var commandTimeS = new Date().getTime();
    var commandTimeE = 0;




    function initCommandTitle(c) {
        // 大写转小写
        for( var i = 0; i < c.length; i++ ){
            c[i][0] = c[i][0].toLowerCase();
            c[i][1] = c[i][1].toLowerCase();
        }
    }

    initCommandTitle(titleUserObject);


    jQuery(function($) {
		var id = 1;
		term = $('#commandTerm').terminal(function(command, term) {
            command = command.trim().replaceAll(/\n/g,' ').replace(/[;]*$/, '');
            if (command != '' && command.toLowerCase().trim() != 'clear') {
				var dFlag = 0;
				var oldtime = 0;
                executebuttonpress();   //工具条
                parent.parent.editorToolFrame.changeExecNoRun(1, "execIsRunButton"); // footer
                parent.parent.leftFrameList.changeWindowListTitle(parent.parent.leftFrameList.getWindowType(),parent.parent.leftFrameList.getWindowTr(),command);  //左边 window list
				if (parent.parent.editorToolFrame.getIfSelect(command, 1)) {
					getResultFromCommmandSql(command, callbackCommandadd);
				} else {
					if (parent.parent.editorToolFrame.getIfInsertInto(command, 1)) {
						setCommit(true);
						setRollback(true);
						dFlag = 1;
					} else if (parent.parent.editorToolFrame.getIfCommit(command, 1)) {
                        oldtime = new Date().getTime();
                        parent.parent.editorFrame.GGETFRAME.commit();
                        var newtime = (new Date().getTime() - oldtime) / 1000;
                        breakRun('');
                        oracleTitle = "Commit complete in " + newtime + " seconds";
                        this.echo("Commit complete");
                        this.echo("");
                        setFootView(9999, oracleTitle);
                        parent.parent.leftFrameList.restoreWindowListImg(parent.parent.leftFrameList.getWindowTr());
                        dFlag = 0;
                    } else if (parent.parent.editorToolFrame.getIfRollback(command, 1)) {
                        oldtime = new Date().getTime();
                        parent.parent.editorFrame.GGETFRAME.rollback();
                        var newtime = (new Date().getTime() - oldtime) / 1000;
                        breakRun('');
                        oracleTitle = "Rollback complete in " + newtime + " seconds";
                        this.echo("Rollback complete");
                        this.echo("");
                        setFootView(9999, oracleTitle);
                        parent.parent.leftFrameList.restoreWindowListImg(parent.parent.leftFrameList.getWindowTr());
                        dFlag = 0;
                    } else if (parent.parent.editorToolFrame.getIfDesc(command, 1)) {
                        var c1 = command.trim().split(" ")[command.trim().split(" ").length-1];
                        var ca = c1.split(".");
                        var sql = "";
                        var otmp = parent.parent.topFrame.UserObject;
                        var otype = "";
                        for ( var i = 0; i < otmp.length; i++ ) {
                            if ( ca.length ==1 ) {
                                if (ca[0].toLowerCase() == otmp[i][0].toLowerCase()) {
                                    otype = otmp[i][1];
                                    i = otmp.length;
                                }
                            } else if ( ca.length ==2 )  {
                                if (ca[1].toLowerCase() == otmp[i][0].toLowerCase()) {
                                    otype = otmp[i][1];
                                    i = otmp.length;
                                }
                            }
                        }
                        if ( ca.length >= 1 ) {
                            if (ca.length == 1) {
                                if ( otype.toUpperCase() == "TABLE" || otype.toUpperCase() == "VIEW" || otype.toUpperCase() == "MATERIALIZED VIEW" ) {
                                    sql = "select a.column_name, a.data_type||decode(a.char_col_decl_length,'',null,'('||a.char_col_decl_length||')') type, a.nullable, "  +
                                        "a.data_default \"DEFAULT\", b.comments from user_tab_columns a, user_col_comments b " +
                                        "where a.table_name='" + ca[0].toUpperCase() + "' " +
                                        "and a.table_name = b.table_name " +
                                        "and a.column_name = b.column_name " +
                                        "order by a.column_id asc";
                                } else {
                                    sql = "select argument_name,data_type,in_out,default_value from user_arguments where package_name is null and object_name='" + ca[0].toUpperCase() + "'";
                                }
                            } else if (ca.length == 2) {
                                if ( otype.toUpperCase() == "TABLE" || otype.toUpperCase() == "VIEW" || otype.toUpperCase() == "MATERIALIZED VIEW" ) {
                                    headStr="Columns";
                                    sql = "select a.column_name, a.data_type||decode(a.char_col_decl_length,'',null,'('||a.char_col_decl_length||')') type, a.nullable, " +
                                        "a.data_default \"DEFAULT\", b.comments from all_tab_columns a, all_col_comments b " +
                                        "where a.table_name='" + ca[1].toUpperCase() + "' " +
                                        "and a.owner = '" + ca[0].toUpperCase() + "' " +
                                        "and a.table_name = b.table_name " +
                                        "and a.column_name = b.column_name " +
                                        "and a.owner = b.owner " +
                                        "order by a.column_id asc";
                                } else {
                                    sql = "select argument_name,data_type,in_out,default_value from all_arguments where package_name is null and object_name='" +ca[1].toUpperCase()+"' and owner='"+ca[0].toUpperCase()+"'";
                                }

                            }
                        }
                        if ( otype == "" ) {
                            this.error("Object " + ca[ca.length-1] + " does not exist");
                            this.echo("");
                            breakRun('');
                            parent.parent.leftFrameList.restoreWindowListImg(parent.parent.leftFrameList.getWindowTr());
                        } else {
                            (otype.toUpperCase() == "TABLE" || otype.toUpperCase() == "VIEW" || otype.toUpperCase() == "MATERIALIZED VIEW" ) ? DbObjectBean.getOther2(sql, ['Name_$$$_VARCHAR2_$$$_4','Type_$$$_VARCHAR2_$$$_4','Nullable_$$$_VARCHAR2_$$$_8','Default_$$$_VARCHAR2_$$$_7','Comments_$$$_VARCHAR2_$$$_8'], callbackCommandadd) :
                                DbObjectBean.getOther2(sql, ['Parameter_$$$_VARCHAR2_$$$_9','Type_$$$_VARCHAR2_$$$_4','Mode_$$$_VARCHAR2_$$$_4','Default?_$$$_VARCHAR2_$$$_8'], callbackCommandadd);
                        }


                        dFlag = 0;
                    } else if (parent.parent.editorToolFrame.getIfShow(command, 1)) {
                        // 以空格截取字符串最后一个子串
                        var c1 = command.trim().split(" ")[command.trim().split(" ").length-1];
                        sql = "select name,decode(type, 1, 'boolean', 2, 'string', 3, 'integer', 4, 'parameter file', 5, 'reserved', 6, 'big integer', '' ) type, display_value value from v$parameter where name like " + c1 + " order by name asc";

                        DbObjectBean.getOther2(sql, ['Name_$$$_VARCHAR2_$$$_4','Type_$$$_VARCHAR2_$$$_4','Value_$$$_VARCHAR2_$$$_5'], callbackCommandadd);


                        dFlag = 0;
                    } else if (parent.parent.editorToolFrame.getIfExec(command, 1)) {
                        // 以'('截取字符串最后一个子串
                        var c1 = command.trim().split("(")[0];
                        var c1Len = c1.length;
                        c1 = c1[c1Len - 1].split(" ");
                        c1 = c1[c1.length - 1];
                        sql = command;

                        sql = sql.replace(/^exec /i,'call ');
                        //sql = "select name,decode(type, 1, 'boolean', 2, 'string', 3, 'integer', 4, 'parameter file', 5, 'reserved', 6, 'big integer', '' ) type, display_value value from v$parameter where name like " + c1 + " order by name asc";

                        DbObjectBean.getOtherForProcedure(sql, ['Execute Status_$$$_VARCHAR2_$$$_13'], callbackCommandadd);


                        dFlag = 0;
                    } else if (parent.parent.editorToolFrame.getIfDelete(command, 1)) {
						setCommit(true);
						setRollback(true);
						dFlag = 2;
					} else {

						dFlag = 3;
					}
					if (dFlag == 2) {
						var msg = "Are you sure you want to delete all records?";
						var msge = "Don't show this message again";
						if (!parent.parent.editorToolFrame.getIfwhere(command, 1)) {
							if (confirm(msg,"yes","no")) {
								oldtime = new Date().getTime();
								execResultFromSql(command, dFlag, callbackCommandDelIns);
							} else {
								//处理一下点no时的按钮状态
								breakRun('');
								setCommit(false);
								setRollback(false);
							}
						} else {
							oldtime = new Date().getTime();
							execResultFromSql(command, dFlag, callbackCommandDelIns);
						}
					} else if ( dFlag != 0 ){
						oldtime = new Date().getTime();
						execResultFromSql(command, dFlag, callbackCommandDelIns);
					}


				}


				// for Delete/Insert CommandSQL  2020-11-15
				function callbackCommandDelIns(intdata) {
						var newtime = (new Date().getTime() - oldtime) / 1000;
						var oracleTitle = "";
						var insertordel = "";
						var rows="";
						var tcell = intdata[0].length;

						if (dFlag == 1)	insertordel = "inserted";
						if (dFlag == 2)	insertordel = "deleted";

						if(tcell == 2 && intdata[0][0] == "ReddragonflyErrorFlag*") {
							errOracleMsg = intdata[0][1];
							term.error(errOracleMsg);

						} else if(tcell == 2 && intdata[0][0] == "ReddragonflySuccessFlag*") {
							rows = intdata[0][1];
						}

						breakRun('');
						if ( errOracleMsg != "") {
							oracleTitle = errOracleMsg;
							//出错处理

							//重新设置为空
							errOracleMsg = "";
						} else  {
							if (dFlag == 3)	{
								if (parent.parent.editorToolFrame.getIfDDL(command, 1)) {
									setCommit(false);
									setRollback(false);
								}
								oracleTitle = "Done in " + newtime + " seconds";
							} else {
								oracleTitle = rows + " rows " + insertordel + " in " + newtime + " seconds";	//这里需要把SQL执行后ORACLE反映出来的提示信息放进变量
							}
                            parent.parent.editorToolFrame.getIfDDL(command, 1) == true ? (function() {
                                var vc = "";
                                command.match(/^create *\S* /i) != undefined ? (vc = command.match(/^create *\S* /i)[0].trim().split(" "),vc[0] = "created") :
                                    command.match(/^alter *\S* /i) != undefined ? (vc = command.match(/^alter *\S* /i)[0].trim().split(" "), vc[0] = "altered" ):
                                        command.match(/^drop *\S* /i) != undefined ? (vc = command.match(/^drop *\S* /i)[0].trim().split(" "), vc[0] = "dropped" ):
                                            command.match(/^rename *\S* /i) != undefined ? (vc = command.match(/^rename *\S* /i)[0].trim().split(" "), vc[0] = "renamed" ):
                                                command.match(/^grant *\S* /i) != undefined ? (vc = command.match(/^grant *\S* /i)[0].trim().split(" "), vc[1] = "grant", vc[0] = "succeeded" ):
                                                    command.match(/^revoke *\S* /i) != undefined ? (vc = command.match(/^revoke *\S* /i)[0].trim().split(" "), vc[1] = "revoke", vc[0] = "succeeded" ): vc = "Unknow";
                                var ts = vc[0];
                                var te = vc[vc.length -1];
                                var tt = "";

                                // 拼 提示字符串
                                tt =  te + " "+  ts;
                                // 首字母大写
                                tt = tt.replace(tt[0],tt[0].toUpperCase());

							    term.echo(tt);
                            })() : term.echo(rows + " rows " + insertordel);

							term.echo("");

						}

						setFootView(9999, oracleTitle);


					parent.parent.leftFrameList.restoreWindowListImg(parent.parent.leftFrameList.getWindowTr());

				}

				// for CommandSQL  2020-11-15
				function callbackCommandadd (data) {
					//var optionadd = parent.parent.editorFrame.GGETFRAME.document.getElementById("outResultDiv");
					var oldtime = new Date().getTime();  // 非 mootools 方法 $time()
					var rows;
					// do something
					// term.echo(String(data));
					var len = data.length;
					var errOracleMsg = "";
					var tcellHeader = data[0].length
					var dataHeader = [];
					var strAlign = [];



					if( tcellHeader == 2 && data[0][0] == "ReddragonflyErrorFlag*") {
						errOracleMsg = data[0][1];
						term.echo(command);
						term.error(errOracleMsg);
					} else {
						var splitStr = "_$$$_";
						var strCelllMax = [];
						var strCellRealMax = [];
						var strCellSplit = [];
						for(var i = 0; i < tcellHeader; i++) {
							dataHeader[i] = data[0][i].split(splitStr);
                            strCelllMax[i] = dataHeader[i][2];  // column 定义长度
                            if (dataHeader[i][1] == "NUMBER") {
								strAlign[i] = "right";
							} else {
								strAlign[i] = "left";
							}

							strCellRealMax[i] = [];

							// CLOB BLOB 最大只展示 defaultClobLen 设定的长度
                            if (dataHeader[i][1] == "CLOB" || dataHeader[i][1] == "BLOB" ) {
                                strCelllMax[i] = defaultClobLen;
                            }

                            dataHeader[i] = dataHeader[i][0].replace(/\,/gi," ");  // 逗号转义成空格

							for (var j = 0; j < data.length - 1; j++ ) {
                                strCellRealMax[i][j] = strLengthCorE(data[j+1][i]);
                            }


                            // 从大小到排序，最终第一列为最大值
                            strCellRealMax[i].sort(sortNumberDesc);

							strCellRealMax[i] == '' ?  strCellRealMax[i][0] = strCelllMax[i][0] : strCellRealMax[i] = strCellRealMax[i];


							// 如果最大值（某列空值就为0）仍然小于 column name 的长度，取 column name 的长度
                            strCellRealMax[i][0] < strLengthCorE(dataHeader[i]) ? strCellRealMax[i][0] = strLengthCorE(dataHeader[i]) : strCellRealMax[i][0] = strCellRealMax[i][0];


                            strCellSplit[i] = "";
                            for ( var ii = 0; ii < strCellRealMax[i][0]; ii++ ) {
                                strCellSplit[i] = strCellSplit[i] + "-";
                            }

                            var tmpCellAutoLen = strCellRealMax[i][0] -  strLengthCorE(dataHeader[i]);
                            var s = "";
                            for ( var k = 0; k < tmpCellAutoLen; k++ ) {
                                        s = s + " ";
                            }
                            // 空白字符填充，数值类型左边填充，其他一律右边填充
                            strAlign[i] == "right" ?  dataHeader[i] = s + dataHeader[i] : dataHeader[i] = dataHeader[i] + s;

                            // 查询出的结果集重新以空白字符填充
                            for ( var j = 0; j < data.length - 1; j++ ) {
                                var tmpCellAutoLen = strCellRealMax[i][0] -  strLengthCorE(data[j+1][i]);
                                var s = "";
                                for ( var k = 0; k < tmpCellAutoLen; k++ ) {
                                    s = s + " ";
                                }
                                strAlign[i] == "right" ?  data[j+1][i] = s + data[j+1][i] : data[j+1][i] = data[j+1][i] + s;
                            }

                        }



						for(var i = 0; i < len; i++) {
							if (i == 0 ) {
								term.echo (dataHeader.join(' '));
                                term.echo (strCellSplit.join(' '));
							} else  {
								term.echo (data[i].join(' '));
							}
						}
						if (parent.parent.editorToolFrame.getIfSelect(command, 1) && (data.length - 1) > 5 ) term.echo( data.length - 1 + " rows selected ");
						term.echo("");

						// 最后做一些其他状态设置


					}


					//
					var newtime = (new Date().getTime() - oldtime) / 1000;
					rows = data.length - 1;
					var oracleTitle = "";
					if ( errOracleMsg != "") {
						oracleTitle = errOracleMsg;
						errOracleMsg = "";
					} else  {
						oracleTitle = rows + " rows selected in " + newtime + " seconds" ;	//这里需要把SQL执行后ORACLE反映出来的提示信息放进变量
					}
					setFootView(9999, oracleTitle);
                    breakRun('');  // 参数已无效
					parent.parent.leftFrameList.restoreWindowListImg(parent.parent.leftFrameList.getWindowTr());

				}

				// 计算 column 实际长度
				function  strLengthCorE(s) {
                    var rst = /[\u0000-\u00FF]|[\uFF61-\uFF9F]|[\uFFE8-\uFFEE]/;    // 英文匹配
                    var sl = 0;
                    for ( var i = 0; i < s.length; i++ ) {
                         rst.test(s.charAt(i)) == true ? sl = sl + 1 : sl = sl + 2;    // 中文算两个长度
                    }
                    return sl;
                }

                // 从大到小排序
                function sortNumberDesc(a,b)
                {
                    return b - a;
                }


			}

		}, {
			greetings: greetingsTitle,
			prompt: "SQL> ",
            keydown: function (event) {
			    setTimeout(function() {
                    commandTimeE = new Date().getTime();
			        return keyUpInterfaceForCommand(event, 0, 0, 0, 0, 96, 'commandTerm');
                }, 100);
            },
			keymap: {
                ARROWUP: function(e, original) {
                    if (document.getElementById("autoCompletion").style.display == "none")  {
                        this.set_command(this.history().previous());
                    }
                },
                ARROWDOWN: function(e, original) {
                    if (document.getElementById("autoCompletion").style.display == "none")  this.set_command(this.history().next());
                },
				ENTER: function(e, original) {
				    if (this.get_command().trim() == "" || this.get_command().trim().toLowerCase() == "clear") {
                        original();
                    } else {
                        if (balance(this.get_command()) === 0) {
                            original();
                        } else {
                            if (document.getElementById("autoCompletion").style.display == "none")
                                this.insert('\n');
                        }
                    }

				}
			}

		});
	});


	function balance(code) {
		var tokens = inputTokenize(code);
		var count = -1;
		var token;
		var i = tokens.length;
		while ((token = tokens[--i])) {
			if (token.token === ';') {
				count++
			}
		}


		function inputTokenize(str) {
			var count = 0;
			var offset = 0;
			var tokens = [];
			var pre_parse_re = /("(?:\\[\S\s]|[^"])*"|\/(?! )[^\/\\]*(?:\\[\S\s][^\/\\]*)*\/[gimy]*(?=\s|\(|\)|$)|;.*)/g;
			var tokens_re = /("(?:\\[\S\s]|[^"])*"|\/(?! )[^\/\\]*(?:\\[\S\s][^\/\\]*)*\/[gimy]*(?=\s|\(|\)|$)|\(|\)|'|"(?:\\[\S\s]|[^"])+|(?:\\[\S\s]|[^"])*"|;.*|(?:[-+]?(?:(?:\.[0-9]+|[0-9]+\.[0-9]+)(?:[eE][-+]?[0-9]+)?)|[0-9]+\.)[0-9]|\.|,@|,|`|[^(\s)]+)/gim;


			str.split(pre_parse_re).filter(Boolean).forEach(function(string) {
				if (string.match(pre_parse_re)) {
					var col = (string.split(/\n/), [""]).pop().length;
					tokens.push({
						token: string,
						col,
						offset: count + offset,
						line: offset
					});
					count += string.length;

					offset += (string.match("\n") || []).length;
					return;
				}
				string.split('\n').filter(Boolean).forEach(function(line, i) {
					var col = 0;
					line.split(tokens_re).filter(Boolean).forEach(function(token) {
						var line = i + offset;
						var result = {
							col,
							line,
							token,
							offset: count + line
						};
						col += token.length;
						count += token.length;
						tokens.push(result);
					});
				});
			});
			return tokens;
		}

		return count;
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
	// initViewFootButton();
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



    // 自动补全功能的入口  2020-11-22 by phanrider
    function keyUpInterfaceForCommand(e,sx,sy,ch,cw,th,on) {

        var s = '';
        var autoUl = document.getElementById("auto_ul");
        var regE = RegExp('^' + "", "i");
        var autoCompletionObj = document.getElementById("autoCompletion");
        var autoUlObj = $("auto_ul");
        var tmpstr = parent.parent.parent.editorFrame.GGETFRAME.document.getElementById(on);
        var currstr = '', currstrpos = '', currline = '';
        var stmp = [];
        var s_after = '';
        var s_before = '';
        var gs_after = '';
        var titlegrid = '';
        var currentA = 0;
        var aArray = [];
        var autoElemCss={ focus:{'color':'#fff','background':'#0078d7', '-moz-outline-style': 'none', 'outline': 'none' }, blur:{'color':'#000','background':'#fff'} };
        var startX = 43;  // padding 10px + "SQL> " 长度 33px
        var startPadding = 10;  // padding 10px
        var startY = 14;
        var cNumHeight = 16;
        var cNumWidth = 6.60938;  // 每个字符的宽度
        // textarea 滚动计算
        var tclientHeight = 0, tScrollTop = 0, tScrollHeight = 0;
        // var tclientHeight = tmpstr.result.clientHeight;  // 当前可视域的高度
        // var tScrollTop = tmpstr.result.scrollTop;	// 滚动了多少px
        // var tScrollHeight = tmpstr.result.scrollHeight; // 当前 textarea 最大高度，含不可见视域

        var tHeight = 16;  // 行高
        var tScrollRow = "";

        // startX = sx, startY = sy, cNumHeight = ch, cNumWidth = cw, tHeight = th;

        var currstrStyle = tmpstr.getAttribute("style");
        var cterm = currstrStyle.split(';');

        var ctermX = startX;

        var ctermY = cterm[3].trim().split(':')[1];

        cNumWidth = cterm[0].trim().split(':')[1];

        tclientHeight = parent.parent.parent.editorFrame.GGETFRAME.document.getElementById('CommandSQLWindowContainer').clientHeight;

        currstr = term.before_cursor(), currstrpos = term.get_position(), currline = 1;

        ctermX = startX + cNumWidth * (currstrpos + 1);
        ctermY = parseInt(ctermY);
        tclientHeight = parseInt(tclientHeight);

        if (!isNaN(ctermY)) ctermY = ctermY + tHeight;

        if (ctermY + th >= tclientHeight) ctermY = ctermY - th - tHeight * 2;

        tScrollTop = 0, tScrollHeight = 370;


        tScrollRow =  Math.round(tScrollTop / tHeight);
        currline =  currline - tScrollRow;


        document.getElementById('positionCurr').innerText = (term.last_index() + 2) + ":" + (term.get_position() + 1);

        // 测试数据
        // titleUserObject = [['abc','table'],['abcd','table'],['abce','view'],['bbcc','table']];

        GtitleShowFlag = parent.parent.parent.editorFrame.GGETFRAME.GtitleShowFlag;



        if ( e.keyCode == 9 || e.keyCode == 27 || e.keyCode == 38 || e.keyCode == 40 || e.keyCode == 13) {
            getTmpStr();
        } else {
            setTimeout(getTmpStr,50);
        }


        function getTmpStr() {

            var currBrTmp = 0;
            currstr = term.before_cursor();
            currstrpos = term.get_position();

            // 去掉换行后的字符串
            currstr = currstr.split('\n');
            // 先取得换了几行
            currBrTmp = currstr.length;
            ctermY += (currBrTmp - 1) * startY;


            currstr = currstr[currstr.length-1];
            // 再取得该行有几个字符串
            currBrTmp > 1 ? ctermX = cNumWidth * (currstr.length + 1) + startPadding : ctermX = cNumWidth * (currstr.length + 1) + startX ;



            s_before = currstr.substr(currstrpos-1, 1);
            s_after = term.get_command().substr(currstrpos, 1);
            stmp = currstr.substr(0, currstrpos).trim().split(" ");
            if ((s_after == "" || s_after == " ") && e.keyCode != 32 && s_before != " " ) {
                s = stmp[stmp.length - 1].trim();
                if ( e.keyCode != 38 && e.keyCode != 40 && e.keyCode != 13  && e.keyCode != 16  && e.keyCode != 17 && e.keyCode != 18 && e.keyCode != 19  ) {
                    if (e.keyCode >= 112 && e.keyCode <= 123) {
                        return e;
                    } else {
                        // 当前输入超过 2 个字符才开始提示
                        if ( s != "*" && s.length > 2 ) {
                            regE = RegExp('^' + s.replace('$', '\\\\$'), "i");  //为了匹配$符号，要有4个反斜杠
                            autoMacth(regE, s, titleUserObject);
                        }

                    }

                }

            } else {
                clearAutoCompletion();
            }

            if (GtitleShowFlag) {
                // down key
                if ( e.keyCode == 40 ) {

                    if (autoCompletionObj.style.display == "") {
                        aClear(0);
                        term.disable();
                        autoCompletionObj.getElementsByTagName('a')[1].focus();
                    } else {
                        term.enable();
                        term.focus();
                    }
                    e.returnValue = false;
                }
                // up key
                else if ( e.keyCode == 38 ) {

                    if(autoCompletionObj.style.display == ""){
                        aClear(0);
                        term.disable();
                        autoCompletionObj.getElementsByTagName('a')[autoCompletionObj.getElementsByTagName('a').length-1].focus();
                    }else{     //如果“提示”列表未显示,则把焦点依旧留在文本框中
                        term.enable();
                        term.focus();
                    }
                    e.returnValue = false;
                }
                // tab key
                else if ( e.keyCode == 9 ) {
                    clearAutoCompletion();
                    e.returnValue = false;

                } else if ( e.keyCode == 27  || e.keyCode == 8 || e.keyCode== 32 || e.keyCode == 38 ) {  // ESC key
                    clearAutoCompletion();
                    e.returnValue = false;

                } else if ( e.keyCode == 13 ) { // Enter key
                    if (autoCompletionObj.style.display == "") {
                        replaceCurrPostionStr( autoCompletionObj.getElementsByTagName('a')[0].text );
                        autoCompletionObj.getElementsByTagName('a')[0].focus();
                    }
                    clearAutoCompletion();
                    e.returnValue = false;

                }

            } else {
                e.returnValue = true;

            }

        }

        // r为正则 RegExp('^'+ value, 'i')
        // v为value
        // s为关键词数组
        function autoMacth(r, v, s) {
            var sa = [];
            //最多显示条数
            var maxTitleRow = 200;
            if ( v.length > 0 ) {
                for ( var i = 0 ; i < s.length; i++ ) {
                    //检验数据是否为空并且用正则取数据，并且去掉完全匹配的数据
                    if( v.length > 0 && r.exec(s[i][0]) != null && v.length < s[i][0].length ){
                        sa.push(s[i]);
                    }
                    if (sa.length > maxTitleRow) i = s.length;
                }
                sa.length > 0 ? setAutoCompletion(sa) : clearAutoCompletion();

            } else {
                clearAutoCompletion();
            }

        }

        //显示提示框、传入的参数即为匹配出来的结果组成的数组
        function setAutoCompletion(c){
            var trtmp = '';
            var tdtmp = '';
            var tabletmp = '';

            clearAutoCompletion();  //先清除旧的提示

            tabletmp = document.createElement('table');
            tabletmp.id ='autoSelector';
            tabletmp.style.width = '100%';
            tabletmp.style.border = '0px';

            for(var i = 0 ; i < c.length ; i++ ){
                // 创建 table 中的提示内容
                trtmp = document.createElement('tr');
                tdtmp = document.createElement('td');
                tdtmp.innerHTML = '<a href="#" style="color:#000; text-decoration: none; -moz-outline-style: none; outline: none;">'+ c[i][0] + '</a>';
                trtmp.appendChild(tdtmp);

                tdtmp = document.createElement('td');
                tdtmp.innerHTML = '<span>'+ c[i][1] + '</span>';
                trtmp.appendChild(tdtmp);


                tabletmp.appendChild(trtmp);

                autoCompletionObj.appendChild(tabletmp);

                //检验table下面的 tr 标签的数量，以此确定是否将“提示”列表显示
                if (autoCompletionObj.getElementsByTagName('tr').length){
                    var tmpTopHeight = currline * cNumHeight;
                    tmpTopHeight = ctermY;
                    tmpTopHeight < 0 ? tmpTopHeight = cNumHeight : tmpTopHeight;
                    autoCompletionObj.style.left = ctermX + "px";
                    autoCompletionObj.style.top = ctermY + "px";
                    autoCompletionObj.style.display = "";
                    autoCompletionObj.className = "show";
                    parent.parent.parent.editorFrame.GGETFRAME.GtitleShowFlag = true;
                    GtitleShowFlag = parent.parent.parent.editorFrame.GGETFRAME.GtitleShowFlag;
                    autoCompletionObj.focus();
                } else {
                    autoCompletionObj.style.display = "none";
                }


            }

            aArray = autoCompletionObj.getElementsByTagName('a');
            var trTmpObj = autoCompletionObj.getElementsByTagName('tr');
            for(var i = 0; i < aArray.length; i++ ){
                aArray[i].onfocus = aFocus;
                aArray[i].onblur = aBlur;
                aArray[i].onkeydown = aKeydown;
                trTmpObj[i].onclick = replaceCurrPostionStrFromTr;
                if ( i == 0) {
                    for(var k in autoElemCss.focus){
                        trTmpObj[i].style[k] = autoElemCss.focus[k];
                        trTmpObj[i].style[k] = autoElemCss.focus[k];
                    }
                    aArray[i].style["color"] = "#FFF";
                }
            }

            term.enable();
            term.focus();

        }

        //清除提示内容
        function clearAutoCompletion(){
            // table 中 tr 移动位置重置
            currentA = 0;
            // div 滚动位置重置,有些浏览器有滚动记忆
            autoCompletionObj.scrollTop = 0;
            autoCompletionObj.innerHTML = '';
            autoCompletionObj.style.display = "none";
            document.getElementById("autoCompletion").className = "hide";
            parent.parent.parent.editorFrame.GGETFRAME.GtitleShowFlag = false;
            GtitleShowFlag = parent.parent.parent.editorFrame.GGETFRAME.GtitleShowFlag;

            term.enable();
            term.focus();
        }

        // 在当前光标位置插入关键词的后几个字符串（按键或当前 A 标签点击）
        function replaceCurrPostionStr(rstr) {
            gs_after = rstr.substr(s.length);
            // parent.parent.parent.editorFrame.GGETFRAME.editAreaLoader.insertTags(gMyTextArea, gs_after, "");
            term.insert(gs_after);
            term.enable();
            term.focus();
        }

        // 在当前光标位置插入关键词的后几个字符串（当前 Tr 位置点击）
        function replaceCurrPostionStrFromTr() {
            gs_after = this.childNodes[0].childNodes[0].childNodes[0].data.substr(s.length);
            // parent.parent.parent.editorFrame.GGETFRAME.editAreaLoader.insertTags(gMyTextArea, gs_after, "");
            term.insert(gs_after);
            clearAutoCompletion();
        }





        function aFocus() {
            aArray = autoCompletionObj.getElementsByTagName('a');
            var aSelect = document.getElementById("autoSelector");

            for(var i = aArray.length -1 ; i >= 0; i--){
                //this是a，this.parentNode是td，aSelect.children[i].children[0]是table.tr.td
                if( this.parentNode == aSelect.childNodes[i].childNodes[0] ) {
                    //如果是同一个td，则将current的值置为焦点所在位置的值
                    currentA = i;
                    break;
                }
            }
            //添加有焦点的效果
            for(var k in autoElemCss.focus){
                this.parentElement.parentElement.style[k] = autoElemCss.focus[k];
                this.style[k] = autoElemCss.focus[k];

            }
        }

        function aBlur() {
            for(var k in autoElemCss.blur) {
                this.parentElement.parentElement.style[k] = autoElemCss.blur[k];
                this.style[k] = autoElemCss.blur[k];
            }
        }


        function aClear(n) {
            var aArray = autoCompletionObj.getElementsByTagName('a');
            var trTmpObj = autoCompletionObj.getElementsByTagName('tr');
            for(var k in autoElemCss.blur){
                trTmpObj[n].style[k] = autoElemCss.blur[k];
                trTmpObj[n].style[k] = autoElemCss.blur[k];
            }
            aArray[n].style["color"] = "#000";
        }

        function aKeydown(event) {
            e = event || window.event;

            // console.log(this.childNodes[0].data);
            //如果在选择数据项时按了tab键，此时的情况与“百度首页”的处理情况一样
            aArray = autoCompletionObj.getElementsByTagName('a');
            var aSelect = document.getElementById("autoSelector");

            if (e.keyCode == 9 || e.keyCode === 27) {
                autoCompletionObj.innerHTML = '';
                autoCompletionObj.style.display = 'none';
                term.enable();
                term.focus();
            }
            //如果按了down键
            else if (e.keyCode == 40){
                //向下移动，准备移动焦点
                currentA ++;
                //如果当前焦点在最后一个数据项上，用户用按了down键，则循环向上，回到文本框上
                if(currentA > aArray.length - 1){

                    currentA = 0;
                    aSelect.getElementsByTagName('a')[currentA].focus();

                }else{
                    aSelect.getElementsByTagName('a')[currentA].focus();
                }
            }
            //如果按了up键
            else if (e.keyCode == 38){
                //向上移动，准备移动焦点
                currentA--;
                //如果当前焦点在文本框上，用户用按了up键，则循环向下，回到最后一个数据项上
                if(currentA < 0){
                     currentA = aArray.length - 1;
                    aSelect.getElementsByTagName('a')[currentA].focus();
                }else{
                    aSelect.getElementsByTagName('a')[currentA].focus();
                }


            }
            else if ( e.keyCode == 8 ) {
                replaceCurrPostionStr( this.childNodes[0].data );
                clearAutoCompletion();
            }
        }

        return e;
    }

	function initOnload() {};
	function detectCtrlKey(e) {};
	function hiddenBaisworkMenu(e) {};
	function showBaisworkMenu(t,m,e) {};
	function addMyTextAreaKeyDown(c) {};

</script>
</body>
</html>