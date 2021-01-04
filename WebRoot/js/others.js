//定义全局redImagePath
if (redImagePath == null)	var redImagePath='images/';
//每页显示条数
if (countPage == null)		var countPage = 20;
//多少页
if (pageNo == null)   	var pageNo = 1;
//上一次执行的FETCH SQL
if (fetchSql == null)	var fetchSql = 0;
//设置fetchFlag标志
if (fetchFlag == null)   	var fetchFlag = 0;
//设置事务处理标志 0 表示自动提交， 1 表示手工提交
if (transactionFlag == null)   	var transactionFlag = 0;

//设置执行标志
if (executeFlag == null)	var executeFlag = 0;

//设置锁定标志，默认为已锁定
if (lockFlag == null) 	var lockFlag = 1;

//设置数据是否改变标志，默认为没有改变
if (postChangeFlag == null) 	var postChangeFlag = 0;

//设置单个数据显示是否改变标志，默认为没有改变
if (singleRecordViewFlag == null) 	var singleRecordViewFlag = 0;

//设置for update标志
if (forUpdateFlag == null) 	var forUpdateFlag = 0;

//设置errOracleMsg
if (errOracleMsg == null) 	var errOracleMsg = "";

//设置queryByExample标志
if (queryByExampleFlag == null) var queryByExampleFlag = 0;

//设置编辑区全局选中SQL
if (baisworkSQL == null) var baisworkSQL="";

//结果集head的备份
if (resultbakHead == null )  var resultbakHead="";

//数据是否存在
if (globaldataFlag == null) var globaldataFlag = false;

//div全局临时变量
if (DestDiv == null ) var DestDiv = "";

//设置是否新创建的标志
if (globalIsNotCreate == null) var globalIsNotCreate = false;

//设置全局变量windowList的tr,pretr,windowType
if (globalTrType == null) var globalTrType = "";

if (globalTrRow == null) var globalTrRow = "";

if (globalSameWindowFlag == null) var globalSameWindowFlag = false;

//全局调用JSP页面地址
if (warname == null) var warname = "iplsqldevJ"; //包名,换包名时需修改该值
if (sqlURL == null) var sqlURL = warname + "/login/editor.jsp";
if (funURL == null) var funURL = "../treeoperate/common/New.jsp";
if (funViewURL == null) var funViewURL = "../treeoperate/common/View.jsp";
if (funEditURL == null) var funEditURL = "../treeoperate/common/Edit.jsp";

//设置全局tree节点变量
if (nodeType == null) var nodeType = "root";

//全局用户对像
if (UserObject == null ) var UserObject;

if (mygrid == null)  var mygrid;

if (explainMygrid == null)  var explainMygrid;

//全局编辑区间textarea名称
if (gMyTextArea == null)  var gMyTextArea='myTextarea';

// 2020-09-16 新的编辑区间 div 全局名称
if (GTDID == null) var GTDID = '';

if (GGETFRAME == null) var GGETFRAME = '';

if (GToggleFullScreen == null) var GToggleFullScreen = true;

if (CLIPBOARDDATA == null) var CLIPBOARDDATA = '';

if (GUPDATERECORD == null) var GUPDATERECORD = [];

if (GSETTIMEOUT == null) var GSETTIMEOUT = 5000;

// 自动刷新
if (GINTERSQLJOB == null) var GINTERSQLJOB = false;

// 最大窗口数
if (GMIXWINDOWS == null) var GMIXWINDOWS = 20;

if (GWINDOWLIST == null) var GWINDOWLIST = []; GWINDOWLIST[GMIXWINDOWS] = [];

// gridcell最大长度
if (GGRIDCELLLENGTH == null) var GGRIDCELLLENGTH = 30;

// gridHeadAttr 属性
if (GGRIDHEADATTR ==  null)  var GGRIDHEADATTR = [];

// 是否显示
if (GtitleShowFlag == null)     var GtitleShowFlag = false;

// 提示信息 TOP
if (dAlertTop == null)     var dAlertTop = 120;

// GERRORPROCINFO 属性
if (GERRORPROCINFO ==  null)  var GERRORPROCINFO = [];

// QueryByExample 标识
if (GQueryByExampleFlag == null) var GQueryByExampleFlag = 0;

// QueryByExample 条件
if (GQueryByExampleArrayStr == null) var GQueryByExampleArrayStr = "";

// 无效编译对象全局 grid
if (compileInvalidMygrid == null)  var compileInvalidMygrid;

//设置 DDL SQL 标志
if (DDLFlag == null) var DDLFlag = 0;

// 设置多SQL数组
if (GMSQL == null) var GMSQL = [];

// 设置当前结果输出 outResultDiv 的 ID
if (GOUTRESULTDIVID == null) var GOUTRESULTDIVID = 1;

// 设置结果集输出 grid 数组
if (GOUTRESULTGRID == null) var GOUTRESULTGRID = [];





//设置提示 --已改
function setFootView(errNo, ename) {
	var strlen = 200;
	if (ename != null) {
        ename = ename.replaceAll("\n", "");
        ename.length > 200 ? ename = ename.substring(0, strlen) + "..." : ename = ename ;
    }
	if (errNo == 0) parent.parent.parent.editorFrame.GGETFRAME.document.getElementById('footview').innerText = 'Initializing...';
	else if (errNo == 1) parent.parent.parent.editorFrame.GGETFRAME.document.getElementById('footview').innerText ='Executing...';
	else if (errNo == 2) parent.parent.parent.editorFrame.GGETFRAME.document.getElementById('footview').innerText = 'Compiling...';
	else if (errNo == 3) parent.parent.parent.editorFrame.GGETFRAME.document.getElementById('footview').innerText = 'Compiled succesfully';
	else if (errNo == 4) parent.parent.parent.editorFrame.GGETFRAME.document.getElementById('footview').innerText = 'Compiled with errors';
	else if (errNo == 5) parent.parent.parent.editorFrame.GGETFRAME.document.getElementById('footview').innerText = 'File is read-only';
	else if (errNo == 6) parent.parent.parent.editorFrame.GGETFRAME.document.getElementById('footview').innerText = 'Edit data unlocked';
	else if (errNo == 7) parent.parent.parent.editorFrame.GGETFRAME.document.getElementById('footview').innerText = 'Edit data locked';
	else if (errNo == 9) parent.parent.parent.editorFrame.GGETFRAME.document.getElementById('footview').innerText = 'Rollbacked';
	else if (errNo == 10) parent.parent.parent.editorFrame.GGETFRAME.document.getElementById('footview').innerText = 'Commited';
	else if (errNo == 9999) parent.parent.parent.editorFrame.GGETFRAME.document.getElementById('footview').innerText = ename;
}



//测试函数
function callBackHello(mydata) {
	alert("hello");
}


//创建新的textarea页面，即按下new按钮 --已改
//phanrider 2009-07-26 改成按下new按钮，不再调用此函数改成调用createNewSql， 留此函数是为了让别的函数调用
function createNew(e) {
	//parent.editorFrame.$(textareaname).set('text','');
    parent.parent.parent.editorFrame.GGETFRAME.editAreaLoader.setValue(gMyTextArea,'');
    execClearResults(e);
    parent.parent.parent.editorFrame.GGETFRAME.document.getElementById('frame_myTextarea').contentWindow.editArea.execCommand('toggle_full_screen');
    parent.parent.parent.editorFrame.GGETFRAME.GToggleFullScreen = true;
    GToggleFullScreen = parent.parent.parent.editorFrame.GGETFRAME.GToggleFullScreen;

}


//页面重载  --不用改 正常
function myreload(){
	parent.leftFrame.location.reload();
	parent.topFrame.location.reload();
}

//重新登录 --不用改 正常
function relogon() {
	window.open("./relogin.jsp", "", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width=320,height=260,top=360,left=500");
}

//使执行按钮不可用，同时停止按钮可用 （按下execute按钮） --已改
function executebuttonpress() {

	var executeId = 'executeTd';
	var breakId = 'breakTd';
	var executeObject = parent.parent.editorToolFrame.document.getElementById(executeId);
	var breakObject = parent.parent.editorToolFrame.document.getElementById(breakId);

	if((!getExecuteFlag()) && (!breakObject.getEnabled()) ) {
		parent.parent.editorToolFrame.setExecuteFlag(1);
		if (parent.parent.leftFrameList.getWindowType() == "SQL") {
			changeNextSql("nextSql"); //右侧的向下按钮
		}
		executeObject.setEnabled(false); //执行按钮被按，不可再次被按
		breakObject.setEnabled(true);	//同时中止按钮可用
	}

}


//使停止按钮不可用，同时执行按钮可用 （按下break按钮） --已改
function breakbuttonpress() {

	var executeId = 'executeTd';
	var breakId = 'breakTd';
	var executeObject = parent.parent.editorToolFrame.document.getElementById(executeId);
	var breakObject = parent.parent.editorToolFrame.document.getElementById(breakId);


	if(getExecuteFlag() && breakObject.getEnabled()) {
		parent.parent.editorToolFrame.setExecuteFlag(0);
		executeObject.setEnabled(true); //执行按钮恢复
		breakObject.setEnabled(false);	//同时中止按钮不可用
	}
}

//分页按钮是否可按
//true : 可按
//false : 不可按
function fetchnextbuttonpress(id) {
	var fetchnextId = '';
	 (id == null || id == '' || id == undefined) ?
		fetchnextId = 'fetchNextTd' : fetchnextId = 'fetchNextTd' + id;

	var fetchnextObject = parent.parent.editorFrame.GGETFRAME.$(fetchnextId);

	if (fetchnextObject.getEnabled()) {
		return true;
	} else  {
		return false;
	}
}


//全部分页按钮是否可按
//true : 可按
//false : 不可按
function fetchlastbuttonpress(id) {
	var fetchLastTd = '';
	(id == null || id == '' || id == undefined) ?
		fetchLastTd = 'fetchLastTd' : fetchLastTd = 'fetchLastTd' + id;

	var fetchLastObject = parent.parent.editorFrame.GGETFRAME.$(fetchLastTd);

	if (fetchLastObject.getEnabled()) {
		return true;
	} else  {
		return false;
	}
}

//退出函数 --不用改 正常
function logout() {
	var name="webfx-tree-cookie-persistence";
	var ie = /msie/i.test(navigator.userAgent);
	if (ie) {
	if(confirm(' Are you sure logout? ')){
		//Cookie.remove(name);
		parent.location.replace("./quit.action");

	}
	} else {
		//Cookie.remove(name);
		parent.location.replace("./quit.action");
	}
}



//改变autorefresh图标 --已改
function changeAutorefresh(imagesName) {
	var imagesIcon = '../../images/autorefresh_true.gif';
	var oldImagesIcon = '../../images/autorefresh.gif';
	var oldImagesName = /autorefresh.gif/g;
	var autorefreshTrueImageName = /autorefresh_true.gif/g;
	var Flag = parent.parent.editorFrame.GGETFRAME.document.getElementById(imagesName).src;
	Flag = oldImagesName.test(Flag);



    if (Flag) {
        parent.parent.editorFrame.GGETFRAME.document.getElementById(imagesName).src = imagesIcon;
        parent.parent.editorFrame.GGETFRAME.GINTERSQLJOB = self.setInterval( innerexecuteRun, parent.parent.editorFrame.GGETFRAME.GSETTIMEOUT);
	} else {
        parent.parent.editorFrame.GGETFRAME.document.getElementById(imagesName).src = oldImagesIcon;
        clearInterval(parent.parent.editorFrame.GGETFRAME.GINTERSQLJOB);
	}

    function innerexecuteRun()  {
        // 必须是当前窗口且标识为定时刷新才有效
        var Flag = parent.parent.editorFrame.GGETFRAME.document.getElementById(imagesName).src;
        Flag = autorefreshTrueImageName.test(Flag);
        Flag == true ? parent.parent.editorFrame.GGETFRAME.executeRun(gMyTextArea) : '';
    }

}


//改变save execute图标  --已改
function changeExecNoRun(runFlag,imagesName) {
	var execNoRunIcon = '../../images/exec_norun.gif';
	var execRunningIcon = '../../images/exec_running.gif';

	if (parent.parent.leftFrameList.getWindowType() != "SQL") {
			execNoRunIcon = '../../images/exec_norun.gif';
			execRunningIcon = '../../images/exec_running.gif';
			if (parent.parent.leftFrameList.getWindowType() == "FUN") {
				execNoRunIcon = '../../images/exec_fun_norun.gif';
				execRunningIcon = '../../images/exec_running.gif';
			} else if (parent.parent.leftFrameList.getWindowType() == "EPL") {
                execNoRunIcon = '../../images/view_explain.png';
                execRunningIcon = '../../images/compile_invalid_object_f_r.png';
            } else if (parent.parent.leftFrameList.getWindowType() == "CIO") {
                execNoRunIcon = '../../images/compile_invalid_object_f.png';
                execRunningIcon = '../../images/compile_invalid_object_f_r.png';
            }
	}


	if (runFlag) {
		parent.parent.editorFrame.GGETFRAME.document.getElementById(imagesName).src = execRunningIcon;
	} else {
		parent.parent.editorFrame.GGETFRAME.document.getElementById(imagesName).src = execNoRunIcon;
	}
}

// 改变 FUN 编辑图标
function changeEditorFun(editorFlag, imagesName, frame, trRow) {

	var imgIcon ="../images/no_fun_saved.gif";
	var imgEditorIcon ="../images/no_saved.gif";
	var imgListVauleId = "columnButton" + trRow;
	var execNoEditorIcon = '../../images/exec_fun_norun.gif', execEditorIcon = '../../images/exec_norun.gif';
	var windowType = parent.parent.leftFrameList.getWindowType();
	var currRow = parent.parent.leftFrameList.getWindowTr();

	if ( windowType == "FUN" ||	windowType == "PRO" || windowType == "PAC"
		|| windowType == "PAB" || windowType == "TYP" || windowType == "TYB"
		|| windowType == "TRI" || windowType == "JAV" ) {
		execNoEditorIcon = '../../images/exec_fun_norun.gif';
		execEditorIcon = '../../images/exec_no_compile.gif';
        imgEditorIcon = '../images/no_compile.gif';
	}
    if (currRow == trRow) {
        if (editorFlag) {
            frame.$(imagesName).setProperty('src',execEditorIcon);
            parent.parent.leftFrameList.$(imgListVauleId).setProperty('src', imgEditorIcon);
        } else {
            frame.$(imagesName).setProperty('src',execNoEditorIcon);
            parent.parent.leftFrameList.$(imgListVauleId).setProperty('src', imgIcon);
        }
    }

}



//改变lock 图标 --框架内元素，不用改，正常
function changeLock(imagesName) {

	var lockIcon = '../../images/lock.gif';
	var unlockIcon = '../../images/unlock.gif';
	forUpdateFlag = parent.parent.editorFrame.GGETFRAME.forUpdateFlag;
	lockFlag = parent.parent.editorFrame.GGETFRAME.lockFlag;
    mygrid = parent.parent.editorFrame.GGETFRAME.mygrid;

    if (lockFlag) {
		if (!setWarning(forUpdateFlag)) return;
		$(imagesName).setProperty('src',unlockIcon);
		setLockFlag(0);
		var insertRecordObject = parent.parent.editorFrame.GGETFRAME.$('insertRecordTd');
			insertRecordObject.setEnabled(true);
		var deleteRecordObject = parent.parent.editorFrame.GGETFRAME.$('deleteRecordTd');
			deleteRecordObject.setEnabled(true);
        mygrid.setEditable(true);
        parent.parent.editorFrame.GGETFRAME.DDLFlag = 1;
        setCommit(true);
        setRollback(true);
		setPostChangeFlag(1);	//再次锁定，置数据改变标志为1
		changePostChange();		//使post_change按钮自动有效
		setFootView(6, '');
	} else {
		$(imagesName).setProperty('src',lockIcon);
		setLockFlag(1);
		var insertRecordObject = parent.parent.editorFrame.GGETFRAME.$('insertRecordTd');
			insertRecordObject.setEnabled(false);
		var deleteRecordObject = parent.parent.editorFrame.GGETFRAME.$('deleteRecordTd');
			deleteRecordObject.setEnabled(false);
			setPostChangeFlag(0);	//再次锁定，置数据改变标志为0
			changePostChange();		//使post_change按钮自动失效
        mygrid.setEditable(false);
		setFootView(7, '');
    }
}


//插入数据 2020-10-12 重写
function insertRecord() {

    var insertRecordObject = parent.parent.editorFrame.GGETFRAME.$('insertRecordTd');

	if (insertRecordObject.getEnabled() ) {
		mygrid = parent.parent.editorFrame.GGETFRAME.mygrid;

		mygrid.enableAlterCss("even","uneven");
		mygrid.columnColor = ["#E3E3E3"];
		var colid = '$ID$';

		for( i=1; i < mygrid.getColumnCount(); i++) {
			colid += ",";
			colid += mygrid.getHeaderCol(i) ;
		}

		mygrid.setColumnIds(colid);

		tpmdataarray = [];

		for (i = 0; i< mygrid.getColumnCount(); i++ ) {
			tpmdataarray[i] = '';
		}
		mygrid.addRow((new Date()).valueOf(), tpmdataarray, mygrid.getRowIndex(mygrid.getSelectedId()));
		setPostChangeFlag(1);
		changePostChange();
	}
}



//删除数据 2020-10-13 重写
function deleteRecord() {

	var deleteRecordObject = parent.parent.editorFrame.GGETFRAME.$('deleteRecordTd');

    if (deleteRecordObject.getEnabled() ) {
		mygrid = parent.parent.editorFrame.GGETFRAME.mygrid;
		mygrid.deleteSelectedItem();
		setPostChangeFlag(1);
		changePostChange();
	}

}



//提交改变数据 --2020-10-15 重新实现
function postChangeRecord() {
	var postChangeObject = parent.parent.editorFrame.GGETFRAME.$('postChangesTd');

    if (postChangeObject.getEnabled()) {  //判断本身按钮是否可用

		mygrid = parent.parent.editorFrame.GGETFRAME.mygrid;
		updaterecordtmp = [];


		b = mygrid.getAllRowIds().split(',');
		for (i = 0; i < b.length; i++) {
			// c = Object.values(mygrid.getRowData(b[i])); //ES6
            c = Object.keys(mygrid.getRowData(b[i])).map(function (e) { return mygrid.getRowData(b[i])[e] });  //ES5
			updaterecordtmp[i] = c;
		}

		BaisWorkBean.forUpdateNumber(updaterecordtmp, backInsert);

		setPostChangeFlag(0);
		changePostChange();
	}
}


//改变post_change图标 --暂未使用，需重写方法体
function changePostChange() {
	var postChangeObject = parent.parent.editorFrame.GGETFRAME.$('postChangesTd');
	if (getPostChangeFlag()) {
		postChangeObject.setEnabled(true);
	} else {
		postChangeObject.setEnabled(false);
	}
}


//改变previous sql按钮，使其可用  --已改
function changePreviousSql(tdID) {

	var nextSqlObject = parent.parent.editorFrame.GGETFRAME.$('nextSql');

	if (nextSqlObject.getEnabled() ) {
		var tdObject = parent.parent.editorFrame.GGETFRAME.$(tdID);
		tdObject.setEnabled(true);

		//执行实际操作
		//ExecuteCommand( 'myTextarea', 'Undo' );
		execSysCommand('myTextarea','undo');
	}


}


//改变 querybyExample 按钮
function changeQueryByExample(queryFlag) {
	var queryByExampleObject = parent.parent.editorFrame.GGETFRAME.document.getElementById('queryByExampleTd');
    setQueryByExampleAndClearRecord(false) ;
    if (queryByExampleObject != null && typeof(queryByExampleObject) != "undefined") queryByExampleObject.setEnabled(queryFlag);
}

//改变 singleRecordView 按钮
function changeSingleRecordView(queryFlag) {
	var singleRecordViewObject = parent.parent.editorFrame.GGETFRAME.document.getElementById('singleRecordViewTd');
    if (singleRecordViewObject != null && typeof(singleRecordViewObject) != "undefined") singleRecordViewObject.setEnabled(queryFlag);
}

//改变 exportResultResults 按钮
function changeExportResultResults(queryFlag) {
	var exportResultResultsObject = parent.parent.editorFrame.GGETFRAME.document.getElementById('exportResultResultsTd');
    if (exportResultResultsObject != null && typeof(exportResultResultsObject) != "undefined") exportResultResultsObject.setEnabled(queryFlag);
}


//改变next sql按钮，使其可用 --已改
function changeNextSql(tdID) {

	//var tdObject = parent.editorFrame.document.getElementById(tdID); 2020-09-16
    var tdObject = parent.parent.editorFrame.GGETFRAME.document.getElementById(tdID);
	tdObject.setEnabled(true);

}

//改变next sql 按钮，使其可用  --已改
function execNextSql() {
	var nextSqlObject = parent.parent.editorFrame.GGETFRAME.document.getElementById('nextSql');
	if (nextSqlObject.getEnabled() ) {

		//执行实际操作
		//ExecuteCommand( 'myTextarea', 'Redo' );
		execSysCommand('myTextarea','redo');
	}

}


//改变next_record按钮，使其可用或不可用
function changeRecordView() {

	var nextRecordId = 'nextRecord';
	var previousRecordId = 'previousRecord';
	var nextRecordObject = parent.parent.editorFrame.GGETFRAME.document.getElementById(nextRecordId);
	var previousRecordObject = parent.parent.editorFrame.GGETFRAME.document.getElementById(previousRecordId);
	globaldataFlag = parent.parent.editorFrame.GGETFRAME.globaldataFlag;

	if(!getsingleRecordViewFlag() && globaldataFlag == true ) { //如果按钮外于未被按下状态，则做如下动作，本身按钮显示为按下

		nextRecordObject.setEnabled(true);  //使 nextrecord 按钮可用
		previousRecordObject.setEnabled(true);  //使 previousrecord 按钮可用
		setsingleRecordViewFlag(1); //使 singlerecord 按钮状态改为按下 singleRecordViewFlag = 1

		changeRecordViewInit();	//调用列表功能初始化函数

	} else {	//如果按钮是已按下状态，则做如下动作，本身按钮显示为未按下
		nextRecordObject.setEnabled(false);  //使 nextrecord 按钮不可用
		previousRecordObject.setEnabled(false); //使 previousrecord 按钮不可用
		setsingleRecordViewFlag(0); //使 singlerecord 按钮状态改未按下 singleRecordViewFlag = 0

		changeRecordViewRestore(); //调用列表功能恢复函数
	}
}

function changeRecordViewInit() {
	var nextRecordId = 'nextRecord';
	var previousRecordId = 'previousRecord';
	var nextRecordObject = parent.parent.editorFrame.GGETFRAME.document.getElementById(nextRecordId);
	var previousRecordObject = parent.parent.editorFrame.GGETFRAME.document.getElementById(previousRecordId);
	var c = 'changeOutResultDiv';
	mygrid = parent.parent.editorFrame.GGETFRAME.mygrid;


	var tcObj = parent.parent.editorFrame.GGETFRAME.document.getElementById('t_controlDiv');
	if (tcObj.childElementCount <= 1) {
		c =  c + '1';
		parent.parent.editorFrame.GGETFRAME.$('outResultDiv1').set('style','display:none');
		parent.parent.editorFrame.GGETFRAME.setDivValueNull (c );
	} else {
		var tabObj = parent.parent.editorFrame.GGETFRAME.document.getElementById( "sqlWindowtabPanel");
		var s = tabObj.tabPane.getSelectedIndex() + 1;
		c = c + s.toString();
		parent.parent.editorFrame.GGETFRAME.$('outResultDiv' + s.toString()).set('style','display:none');
		parent.parent.editorFrame.GGETFRAME.setDivValueNull (c);

		mygrid = parent.parent.editorFrame.GGETFRAME.GOUTRESULTGRID[tabObj.tabPane.getSelectedIndex()];
	}


	//setDivValueHtml ('changeOutResultDiv','asdfasdfas');
	//执行显示函数changeNextRecordView
	if( !mygrid.getSelectedId() ) {
		mygrid.setSelectedRow(mygrid.getRowId(0));
	}
	if (mygrid.getSelectedId() == 1) {	//如果为第一行，则向前按钮不可用
			previousRecordObject.setEnabled(false);
	}
	if (mygrid.getSelectedId() == mygrid.getRowsNum()) {  //如果为最后一行，则向后按钮不可用
		nextRecordObject.setEnabled(false);
	}
	if (mygrid.getSelectedId() < mygrid.getRowsNum()) { //如果不为最后一行，则向后按钮改为可用
			if (!nextRecordObject.getEnabled()) {
				nextRecordObject.setEnabled(true);
			}
		}
	if(mygrid.getSelectedId() == null) { //如果没有结果集，则向前、向后按钮都不可用
			previousRecordObject.setEnabled(false);
			nextRecordObject.setEnabled(false);
		}
	changeRecordShowHtml();

	parent.parent.editorFrame.GGETFRAME.$(c).set('style','width:100%;height:100%; background-color:white; display:block');
}

//按下NextRecord按钮执行的功能
function changeNextRecordView() {
	var nextRecordId = 'nextRecord';
	var previousRecordId = 'previousRecord';
	var nextRecordObject = document.getElementById(nextRecordId);
	var previousRecordObject = document.getElementById(previousRecordId);

	mygrid = parent.parent.editorFrame.GGETFRAME.mygrid;

	if (nextRecordObject.getEnabled()) {
		if( !mygrid.getSelectedId() ) {
			mygrid.setSelectedRow(mygrid.getRowId(0));
			previousRecordObject.setEnabled(false);
		} else {
			if (!previousRecordObject.getEnabled()) {
				previousRecordObject.setEnabled(true);
			}
			mygrid.selectRow(mygrid.getSelectedId());
			//alert(mygrid.getSelectedId());
		}
		//如果已移动数组的最后一行，则自己不可再按
		if (mygrid.getSelectedId() == mygrid.getRowsNum()) {
			nextRecordObject.setEnabled(false);
		}
		changeRecordShowHtml();
	}
}

//按下PreviousRecord按钮执行的功能
function changePreviousRecordView() {
	var nextRecordId = 'nextRecord';
	var previousRecordId = 'previousRecord';
	var nextRecordObject = parent.parent.editorFrame.GGETFRAME.document.getElementById(nextRecordId);
	var previousRecordObject = parent.parent.editorFrame.GGETFRAME.document.getElementById(previousRecordId);

	mygrid = parent.parent.editorFrame.GGETFRAME.mygrid;

	if (previousRecordObject.getEnabled()) {
		if (mygrid.getSelectedId() >= 1) {
			mygrid.selectRow(mygrid.getSelectedId()-2);
		}
		if (mygrid.getSelectedId() == 1) { //如果为第一行，则向前按钮不可用
			previousRecordObject.setEnabled(false);
		}
		if (mygrid.getSelectedId() < mygrid.getRowsNum()) { //如果不为最后一行，则向后按钮改为可用
			if (!nextRecordObject.getEnabled()) {
				nextRecordObject.setEnabled(true);
			}
		}
		changeRecordShowHtml();
	}
}

//恢复按钮，使用为初始状态
function controlbuttonReset() {
	var nextRecordId = 'nextRecord';
	var previousRecordId = 'previousRecord';
	var nextRecordObject = parent.parent.editorFrame.GGETFRAME.document.getElementById(nextRecordId);
	var previousRecordObject = parent.parent.editorFrame.GGETFRAME.document.getElementById(previousRecordId);

	if (nextRecordObject != null && typeof(nextRecordObject) != "undefined") nextRecordObject.setEnabled(false);
    if (previousRecordObject != null && typeof(previousRecordObject) != "undefined") previousRecordObject.setEnabled(false);

    if (setFetchNext != null && typeof setFetchNext != undefined) setFetchNext(false, '');
    if (setFetchLast != null && typeof setFetchLast != undefined) setFetchLast(false, '');

}


function changeRecordViewRestore() {

    var styletmp = 'width:100%;height:100%; background-color:white; display:block';
    var styleheighttmp = 'height:' + (parseInt(parent.parent.editorFrame.GGETFRAME.ctpageHeight) - 32) + 'px';
    styletmp = styletmp.replace('height:100%',styleheighttmp);

	var c = 'changeOutResultDiv';
	var o = 'outResultDiv';
	var tcObj = parent.parent.editorFrame.GGETFRAME.document.getElementById('t_controlDiv');
	if (tcObj.childElementCount <= 1) {
		c =  c + '1';
		o = o + '1';
	} else {
		var tabObj = parent.parent.editorFrame.GGETFRAME.document.getElementById( "sqlWindowtabPanel");
		var s = tabObj.tabPane.getSelectedIndex() + 1;
		c = c + s.toString();
		o = o + s.toString();
	}

	// setDivValueNull ('changeOutResultDiv');
	// parent.parent.editorFrame.GGETFRAME.$('changeOutResultDiv').set('style','display:none');
	// parent.parent.editorFrame.GGETFRAME.$('outResultDiv').set('style',styletmp);

	setDivValueNull (c);
	parent.parent.editorFrame.GGETFRAME.$(c).set('style','display:none');
	parent.parent.editorFrame.GGETFRAME.$(o).set('style',styletmp);

    parent.parent.editorFrame.GGETFRAME.$('singleRecordViewTd').setValue(false,true);
}

//改变执行标志
function setExecuteFlag(exFlag) {
    parent.parent.editorFrame.GGETFRAME.executeFlag = exFlag;
	executeFlag = exFlag;
}

//得到执行标志
function getExecuteFlag() {
	return parent.parent.editorFrame.GGETFRAME.executeFlag;
}

//改变锁定标志
function setLockFlag(loFlag) {
	parent.parent.editorFrame.GGETFRAME.lockFlag = loFlag;
	lockFlag = parent.parent.editorFrame.GGETFRAME.lockFlag;
}

//得到锁定标志
function getLockFlag() {
	return parent.parent.editorFrame.GGETFRAME.lockFlag;
}


//改变数据是否改变标志
function setPostChangeFlag(poFlag) {
    parent.parent.editorFrame.GGETFRAME.postChangeFlag = poFlag;
	postChangeFlag = poFlag;
}

//得到数据是否改变标志
function getPostChangeFlag() {
	return parent.parent.editorFrame.GGETFRAME.postChangeFlag;
}

function setsingleRecordViewFlag(siFlag) {
    parent.parent.editorFrame.GGETFRAME.singleRecordViewFlag = siFlag;
	singleRecordViewFlag = siFlag;
}


function getsingleRecordViewFlag() {
    singleRecordViewFlag = parent.parent.editorFrame.GGETFRAME.singleRecordViewFlag;
	return singleRecordViewFlag;
}


//执行系统命令函数 --已改
function execSysCommand(textareaname, commandName) {
	var commandObj = parent.parent.editorFrame.GGETFRAME.document.getElementById('frame_myTextarea');
	commandObj.focus();
	if (commandName == "open") {
        editOnOpen();
    } else if (commandName == "printL" || commandName == "printP" )  {
	    commandPrint(commandName, commandObj);
    } else if (commandName == "search_next")  {
	    var a = commandObj.contentWindow.editArea;
        a.execCommand('show_search'),a.execCommand('area_search'),a.execCommand('hidden_search'),a.focus();
    } else if (commandName == "cut" || commandName == "copy" || commandName == "paste" || commandName == "selectComment" || commandName == "selectUncomment"
                || commandName == "selectIndent" || commandName == "selectUnindent" )  {
        commandTextarea(commandName, commandObj);
    } else {
        commandObj.contentWindow.editArea.execCommand(commandName);
    }
}

function commandTextarea(p, o) {
    var c = parent.parent.editorFrame.GGETFRAME;
    var tmps = c.editAreaLoader.getSelectedText('myTextarea');

    if ( p == 'cut' || p == 'copy') {
        o.contentWindow.document.getElementById('textarea').focus();
        o.contentWindow.document.execCommand(p,false, null);
        parent.parent.editorToolFrame.CLIPBOARDDATA = tmps;
    } else if ( p == 'paste') {
        o.contentWindow.document.getElementById('textarea').focus();
        o.contentWindow.document.execCommand(p,false, null);
        c.editAreaLoader.setSelectedText('myTextarea', parent.parent.editorToolFrame.CLIPBOARDDATA);
        c.editAreaLoader.setSelectionRange('myTextarea', c.editAreaLoader.getSelectionRange('myTextarea').end, c.editAreaLoader.getSelectionRange('myTextarea').end);
    } else if ( p == 'selectComment' ) {
        c.editAreaLoader.insertTags('myTextarea', "/*", "*/");
    } else if ( p == 'selectUncomment' ) {
        c.editAreaLoader.setSelectedText('myTextarea', tmps.replace('/*','').replace('*/',''));
    } else if ( p == 'selectIndent' ) {
        o.contentWindow.editArea.focus();
        o.contentWindow.editArea.tab_selection();
    } else if ( p == 'selectUnindent' ) {
        o.contentWindow.editArea.focus();
        o.contentWindow.editArea.invert_tab_selection();
    }
}

function commandPrint(p, o) {
    if (p == "printL") {
        p = "size: landscape";
    } else {
        p = "size: portrait";
    }
    o.contentWindow.document.styleSheets[1].removeRule('@page', p, 1);
    o.contentWindow.document.styleSheets[1].addRule('@page', p, 1);
    o.contentWindow.print();
    o.contentWindow.document.styleSheets[1].removeRule('@page', p, 1);
}



function editOnFileOpen(i, e) {
    var c = parent.parent.editorFrame.GGETFRAME;
    document.getElementById(i).innerText = e.target.result;
    c.editAreaLoader.setValue('myTextarea', e.target.result);

    // 删除刚刚创建的DOM节点
    document.body.removeChild(document.getElementById('contents'));
    document.body.removeChild(document.getElementById('inputtmp'));

}

function editOnChoseFile(e, fh) {

    if (typeof(window.FileReader) !== 'function')
        throw ("The FileReader API isn't supported on this browser.");
    var input = e.target;

    if (!input)
        throw ("The browser does not properly implement the event object");
    if (!input.files)
        throw ("This browser does not support the `files` property of the file input.");
    if (!input.files[0])
        return undefined;

    var file = input.files[0];
    var fr = new FileReader();
    fr.onload = fh;
    fr.readAsText(file);
}

function editOnOpen() {


    var i = document.createElement('input');
    var c = document.createElement('p');
    i.setAttribute('id','inputtmp');
    i.setAttribute('type','file');
    i.setAttribute('onchange','editOnChoseFile(event, editOnFileOpen.bind(this, "contents"))');
    i.style.display="none";

    c.setAttribute('id','contents');
    c.style.display="none";
    document.body.appendChild(i);
    document.body.appendChild(c);
    i.click();
}


//div值清空
function setDivValueNull (divName) {
    parent.parent.parent.editorFrame.GGETFRAME.$(divName).set('html','');
}

//div赋值html
function setDivValueHtml (divName,htmlvalue) {
    parent.parent.parent.editorFrame.GGETFRAME.$(divName).set('html',htmlvalue);
}

//div赋值Text
function setDivValueText (divName,textvalue) {
	if ( divName == gMyTextArea) {
		setTimeout(innerSetValue, 300);
        //parent.parent.parent.editorFrame.GGETFRAME.editAreaLoader.setValue(divName,textvalue);
    } else {
        $(divName).set('text',textvalue);
    }

	function innerSetValue() {
		parent.parent.parent.editorFrame.GGETFRAME.editAreaLoader.setValue(divName,textvalue);
		parent.parent.parent.editorFrame.GGETFRAME.executeRun(divName);
	}
}


// 监听F2/F8/F9/F10/F12按键事件，正常
function mykeydown(myevent_key,textareaname){
    if(myevent_key == 'f2') {
        //'F6' 按下，和点击图标调用同一个事件处理函数
        if (typeof(parent.parent.editorFrame.GGETFRAME) == 'undefined') {
            parent.parent.parent.editorFrame.GGETFRAME.explain(textareaname);
        } else {
            parent.parent.editorFrame.GGETFRAME.explain(textareaname);
        }
    }
	if(myevent_key == 'f8') {
		//'F8' 按下，和点击图标调用同一个事件处理函数
        parent.parent.editorFrame.GGETFRAME.initExecuteForF8(textareaname);
	}
	if(myevent_key == 'f9') {
		//'F9' 按下，和点击图标调用同一个事件处理函数
		//parent.editorFrame.rollback();
		parent.parent.editorFrame.dhtmlx.alert({
			type:"alert-warning",
			top: dAlertTop,
			text:"coding..."
		});
	}
	if(myevent_key == 'f10') {
		//'F10' 按下，和点击图标调用同一个事件处理函数
        parent.parent.editorFrame.GGETFRAME.commit();
	}
	if(myevent_key == 'f12') {
		//'F12' 按下，和点击图标调用同一个事件处理函数
        parent.parent.editorFrame.GGETFRAME.rollback();
	}


}

//execute执行按钮的function --正常
function executeRun(textareaname) {
    var currWindoType = parent.parent.leftFrameList.getWindowType();

    if (currWindoType != 'CSQ') {
        tempSql = getTextareaContents(textareaname);

        parent.parent.editorFrame.GGETFRAME.GQueryByExampleFlag == 1 ? (parent.parent.editorFrame.GGETFRAME.GQueryByExampleFlag = 0) : (parent.parent.editorFrame.GGETFRAME.GQueryByExampleArrayStr = "", alltmpSql = parent.parent.editorFrame.GGETFRAME.getTextareaContents(textareaname));
        if(tempSql == "") {
            parent.parent.editorFrame.dhtmlx.alert({
                title:"ERROR",
                top: dAlertTop,
                type:"alert-error",
                text:"Error: SQL can not null!"
            });
        } else {

            //调用真正的设置相应按钮状态函数
            executebuttonpress();
            //设置页脚注释 初始化...
            setFootView(0, "");
            //改变左下角执行图标状态
            parent.parent.editorToolFrame.changeExecNoRun(1, "execIsRunButton");
            //by phanrider 2009-08-02 增加左边框架中的windowList的更改与恢复
            parent.parent.leftFrameList.changeWindowListTitle(parent.parent.leftFrameList.getWindowType(),parent.parent.leftFrameList.getWindowTr(),alltmpSql);

            if (currWindoType == "SQL") {
                //初始化一下页面
				var gmsqltmp = getTextareaContents(textareaname).split(';');
				var cgmsqltmp = [];
				var j = 0;
				for ( var i = 0; i <= gmsqltmp.length; i++ ) {
					if ( gmsqltmp[i] != "" && gmsqltmp[i] != null && gmsqltmp[i] != '\n' ) {
						// 去掉换行符号，并且只取前 30 个字符
						cgmsqltmp[j] = gmsqltmp[i].replace('\n','').substr(0,30);
						j++;
					}
				}
				parent.parent.editorFrame.GGETFRAME.createResultTabForSQL(cgmsqltmp.length, 't_controlDiv', cgmsqltmp);
				parent.parent.editorFrame.executeSQL(textareaname);
            } else if (currWindoType == "FUN" || currWindoType == "PRO" || currWindoType == "PAC"
                || currWindoType == "PAB" || currWindoType == "TYP" || currWindoType == "TYB"
                || currWindoType == "TRI" || currWindoType == "JAV" || currWindoType == "VIE"
                || currWindoType == "VIM") {
                parent.parent.editorFrame.executeFUN(alltmpSql, currWindoType);
            } else if (currWindoType == "CIO") {
                // by 2020-12-22
            }
        }
    } else { // command window 多条命令执行入口
        var commandTempSql = [];
        var commandTermObj = parent.parent.editorFrame.GGETFRAME.term;

        // 自动调到 tab1 页
        parent.parent.editorFrame.GGETFRAME.commandTabPane.setSelectedIndex(0);
        // 得到 SQL
        tempSql = getTextareaContents(textareaname);
        // 去除单行注释 --
        tempSql = tempSql.replaceAll(/--.*/g,' ').trim();
        // 去除多行注释 /**/
        tempSql = tempSql.replaceAll(/\n/mg,' ').replaceAll(/\/\*.*?\*\//g,' ').trim();
        // 拆分 SQL 语句，并根据 “;” 分成多条，必须先清除注释中包含的 “;”
        commandTempSql = tempSql.split(';');
        // 空一行后开始
        commandTermObj.echo(commandTermObj.get_prompt());
        // 设置不显示执行的命令
        commandTermObj.settings().echoCommand = false;
        for ( var i = 0; i < commandTempSql.length; i++ ) {
            // 交给原先的执行方式执行即可
            commandTermObj.exec(commandTempSql[i]);
        }
        // 恢复显示执行的命令
        commandTermObj.settings().echoCommand = true;
        // 重新获得焦点
        commandTermObj.focus();

    }

}


//SQL执行控制
function executeSQL(textareaname) {
	tempSql = getTextareaContents(textareaname);
    GMSQL = tempSql.split(';');
    parent.parent.parent.editorFrame.GGETFRAME.GMSQL = GMSQL;
    tempSql = tempSql.trim().replace(/[;]*$/, '');
    parent.parent.parent.editorFrame.GGETFRAME.tempSql = tempSql;

    if (getIfForupdate(textareaname, 0) && getIfSelect(textareaname, 0)) {
		//如果为for update，并且开始为select
		//设置commit、rollback按钮可用

        parent.parent.editorFrame.GGETFRAME.DDLFlag = 1;
		setCommit(true);
		setRollback(true);

		//提交给接口
        // 从窗口最大化恢复，只做一次
        if (parent.parent.parent.editorFrame.GGETFRAME.GToggleFullScreen) {
            parent.parent.parent.editorFrame.GGETFRAME.document.getElementById('frame_myTextarea').contentWindow.editArea.execCommand('toggle_full_screen');
            parent.parent.parent.editorFrame.GGETFRAME.GToggleFullScreen = false;
            GToggleFullScreen = parent.parent.parent.editorFrame.GGETFRAME.GToggleFullScreen;
        }


        tempSql = tempSql.trim().replace(/[;]*$/, '');
        parent.parent.parent.editorFrame.GGETFRAME.tempSql = tempSql;


        //提交给接口
        getResultFromSql(tempSql, 'outResultDiv1');

		//getResultFromSql(tempSql); 有问题
		//alert("oK");
	} else if (getIfDelete(textareaname, 0) || getIfInsertInto(textareaname, 0) || getIfUpdate(textareaname, 0) || !getIfSelect(textareaname, 0)) {

		//提交给接口
		var deleteFlag = 0;
        parent.parent.editorFrame.GGETFRAME.DDLFlag = 1;

		if (getIfInsertInto(textareaname, 0) || getIfUpdate(textareaname, 0) )  {
			setCommit(true);
			setRollback(true);
			deleteFlag = 1;
		} else if (getIfDelete(textareaname, 0)) {
					setCommit(true);
					setRollback(true);
					deleteFlag = 2;
				} else {
					deleteFlag = 3;
					//alert("h");

		}
		if (deleteFlag == 2) {
			var msg = "Are you sure you want to delete all records?";
			var msge = "Don't show this message again";
			if (!getIfwhere(textareaname, 0)) {
				if (confirm(msg,"yes","no")) {
					execResultFromSql(tempSql,deleteFlag, '');
				} else {
					//处理一下点no时的按钮状态
					breakRun("myTextarea");
					setCommit(false);
					setRollback(false);
				}
			} else {
				execResultFromSql(tempSql,deleteFlag, '');
			}
		} else {
			execResultFromSql(tempSql,deleteFlag, '');
 		}
 		//alert("delete or insert");
		} else {
			//其他sql语句
			//设置commit、rollback按钮不可用
			//setCommit(false);
			//setRollback(false);
			//否则为正常select



			// 从窗口最大化恢复，只做一次
			if (parent.parent.parent.editorFrame.GGETFRAME.GToggleFullScreen) {
				parent.parent.parent.editorFrame.GGETFRAME.document.getElementById('frame_myTextarea').contentWindow.editArea.execCommand('toggle_full_screen');
				parent.parent.parent.editorFrame.GGETFRAME.GToggleFullScreen = false;
				GToggleFullScreen = parent.parent.parent.editorFrame.GGETFRAME.GToggleFullScreen;
			}

			// 多SQL处理 2020-12-30
			var jtmp = 0;
			for ( var i = 0; i < GMSQL.length; i++ ) {
				if ( GMSQL[i] != "" && GMSQL[i] != null && GMSQL[i] != '\n' ) {
					var dname = 'outResultDiv';
					GOUTRESULTDIVID = jtmp + 1;
					parent.parent.parent.editorFrame.GGETFRAME.GOUTRESULTDIVID = GOUTRESULTDIVID;
					dname = dname + GOUTRESULTDIVID.toString();

					setFetchNext(false, GOUTRESULTDIVID);
					setFetchLast(false, GOUTRESULTDIVID);

					// 替换到 '\n' 字符
					GMSQL[i] = GMSQL[i].trim().replace('\n', '');
					//提交给接口 select 查询
					getResultFromSql(GMSQL[i], dname);
					jtmp++;
				}
			}
		}


        function callinsertdelback(d) {};

}

//FUN执行控制
function executeFUN(sqlString,currWindowType) {
	//设置TAB页面的Title, 去掉editor标记
	var c = parent.parent.editorFrame.GGETFRAME;
	var tmps = c.editAreaLoader.setFileEditedMode(gMyTextArea, 'funEditorId', false);
	var tmpv = c.editAreaLoader.getValue(gMyTextArea);
	if (currWindowType == "FUN" || currWindowType == "PRO" || currWindowType == "PAC"
		|| currWindowType == "PAB" || currWindowType == "TYP" || currWindowType == "TYB"
        || currWindowType == "TRI" ) {

	     if (currWindowType == "FUN" || currWindowType == "PRO" ) {
             tmpv = tmpv.split('(')[0].trim().split(' ');
             tmpv = tmpv[tmpv.length-1];
         } else if ( currWindowType == "PAC") {
             tmpv = tmpv.match(/package([\s\S]*?)is/i)[1].trim();
         } else if (currWindowType == "PAB") {
             tmpv = tmpv.match(/package[\s]*body([\s\S]*?)is/i)[1].trim();
         } else if ( currWindowType == "TYP") {
             tmpv = tmpv.match(/type([\s\S]*?)as/i)[1].trim();
         } else if (currWindowType == "TYB") {
             tmpv = tmpv.match(/type[\s]*body([\s\S]*?)is/i)[1].trim();
         } else if (currWindowType == "TRI") {
             tmpv = tmpv.match(/trigger [\s]*([\s\S]*?) /i)[1].trim();
         }
	}

	// 从窗口最大化恢复，只做一次
	if (parent.parent.parent.editorFrame.GGETFRAME.GToggleFullScreen) {
		parent.parent.parent.editorFrame.GGETFRAME.document.getElementById('frame_myTextarea').contentWindow.editArea.execCommand('toggle_full_screen');
		parent.parent.parent.editorFrame.GGETFRAME.GToggleFullScreen = false;
		GToggleFullScreen = parent.parent.parent.editorFrame.GGETFRAME.GToggleFullScreen;
	}
    parent.parent.editorToolFrame.execObject(sqlString, tmpv);

    // tmpv = tmpv.split('(')[0].trim().split(' ');
	tmpv += "&nbsp;&nbsp;";

	var t = c.document.getElementById('frame_myTextarea').contentWindow;
	var thtml = t.document.getElementById('tab_file_funEditorId').innerHTML;
	var ttext =  t.document.getElementById('tab_file_funEditorId').innerText.trim();
	ttext += "&nbsp;&nbsp;";

	thtml = thtml.replace(ttext, tmpv);

	t.document.getElementById('tab_file_funEditorId').innerHTML =  thtml;

	//parent.editorFrame.$('objTitle').set('text',getStrFunctionName(sqlString,currWindoType));  //设置TAB页面的Title
}

//取得SQL中的函数名
function getStrFunctionName(sqlString,currWindoType) {
	var strat = "";
	var end = "";
	var tmpStr = "";
	var endStr = "";
	if (currWindoType == "FUN" || currWindoType == "PRO") {
		if (currWindoType == "FUN") {
			tmpStr = "function ";
			endStr = " return";
		} else if (currWindoType == "PRO") {
			tmpStr = "procedure ";
			endStr = " is";
		}
	} else if (currWindoType == "PAC") {
		tmpStr = "package ";
		endStr = " is";
	} else if (currWindoType == "PAB") {
		tmpStr = "package body ";
		endStr = " is";
	} else if (currWindoType == "TYP") {
		tmpStr = "type ";
		endStr = " as";
	} else if (currWindoType == "TYB") {
		tmpStr = "type body ";
		endStr = " is";
	} else if (currWindoType == "TRI") {
		tmpStr = "trigger ";
		endStr = "\n";
	} else if (currWindoType == "JVA") {
		tmpStr = "java source named ";
		endStr = " as";
	} else if (currWindoType == "VIE") {
		tmpStr = "view ";
		endStr = " as";
	} else if (currWindoType == "VIM") {
		tmpStr = "view ";
		endStr = " as";
	}
	start = sqlString.indexOf(tmpStr);
	end = sqlString.indexOf(endStr);
	start = start + tmpStr.length;
	tempStr = sqlString.substring(start,end); //现在字符串类似于：iplsqldeveloper(pin varchar2)
	tempStr = tempStr.trim();
	if (currWindoType == "FUN" || currWindoType == "PRO") {
		return tempStr.substring(0,tempStr.indexOf("(")); //返回 iplsqldeveloper
	} else if (currWindoType == "PAC" || currWindoType == "PAB" || currWindoType == "TYP"
	 			|| currWindoType == "TYB" || currWindoType == "TRI" || currWindoType == "JVA"
	 			|| currWindoType == "VIE" || currWindoType == "VIM") {
		return tempStr;
	}
}

//break中止按钮的function --目前正常
function breakRun(textareaname) {
	//tempSql = getTextareaContents(textareaname);
	//调用真正的得到结果函数
	parent.parent.editorToolFrame.breakbuttonpress();

	//var oracleTitle = "OK";	//这里需要把SQL执行后ORACLE反映出来的提示信息放进变量
	//setFootView(9999, oracleTitle);
	changeExecNoRun(0, "execIsRunButton"); //恢复左下角执行图标状态
    parent.parent.leftFrameList.restoreWindowListImg(parent.parent.leftFrameList.getWindowTr());

}


//得到获取编辑器中选取文字内容div  --已改setColTypes
function getTextareaContents(EditorName) {
	//var Objname = parent.parent.editorFrame.GGETFRAME.document.getElementById(EditorName);
	var myText = "";
	var ie = /msie/i.test(navigator.userAgent);
	if (ie) {
		// var range = Objname.document.selection.createRange();
        var range = parent.parent.editorFrame.GGETFRAME.editAreaLoader.getSelectedText(EditorName);

        if (range.text.length > 0) {
			myText = range.text;
		} else {
            //如果未选中任何文字，则取编辑区所有内容
            myText = parent.parent.editorFrame.GGETFRAME.editAreaLoader.getValue(EditorName);
		}
	} else {


        var range = "";
        // var range = getSelectedText(EditorName) ;

        // var range = parent.editorFrame.editAreaLoader.getSelectedText(EditorName) ;
		range = parent.parent.editorFrame.GGETFRAME.editAreaLoader.getSelectedText(EditorName);


        //	var  range = Objname.value.substr(Objname.selectionStart,Objname.selectionEnd-Objname.selectionStart);
		if (range.length > 0)  {
			myText = range;
		}
		else
		{
			//如果未选中任何文字，则取编辑区所有内容
            //旧的数据取值方法
			//myText = parent.editorFrame.$(EditorName).get('text');
            //myText =  parent.editorFrame.editAreaLoader.getValue(EditorName);
			myText = parent.parent.editorFrame.GGETFRAME.editAreaLoader.getValue(EditorName);
            // myText =  getValue(EditorName);

        }
	}
	// 去除最后的一次或多次‘;’
    // myText = myText.trim().replace(/[;]*$/, '');
	return myText;
}


//得到页面选择的元素 --已改
function getSelectedText() {
	if (parent.editorFrame.window.getSelection) {
		// This technique is the most likely to be standardized.
		// getSelection() returns a Selection object, which we do not document.
		return parent.editorFrame.window.getSelection().toString();
	} else if (parent.editorFrame.document.getSelection) {
		// This is an older, simpler technique that returns a string
		return parent.editorFrame.document.getSelection();
	} else if (parent.editorFrame.document.selection) {
		// This is the IE-specific technique.
		// We do not document the IE selection property or TextRange objects.
		return parent.editorFrame.document.selection.createRange().text;
	}
}


//对选中的文字进行注释
function addComment(EditorName) {
	var Objname = parent.editorFrame.document.getElementById(EditorName);
	var myText = "";
	var ie = /msie/i.test(navigator.userAgent);
	if (ie) {
		var range = parent.editorFrame.Objname.document.selection.createRange();
		if (range.text.length > 0) {
			myText = range.text;
		}
	} else {
           var range = getSelectedText();
    	   myText = range;
	}

	//myText.replace();
	myText = "<font color='red'>/*" + myText + "*/</red>";
	// alert(myText);
	parent.editorFrame.$(EditorName).set('html',myText);
}

//对页面进行重新设置
function resetEditor() {
	//得到footdiv
	var footcorpy = $('foot_outputDiv').clone();
	//删除t_controlDiv及其所有子div
	$('t_controlDiv').dispose();

	footcorpy.injectAfter('myTextToolbar');
}

//对显示结果区的工具条进行重新设置
function resetBaseWorkToolBar(baisWorkFlag) {
    parent.parent.editorFrame.GGETFRAME.globaldataFlag = baisWorkFlag;
	globaldataFlag = baisWorkFlag;
	changeQueryByExample(baisWorkFlag);
    changeSingleRecordView(baisWorkFlag);
    changeExportResultResults(baisWorkFlag);
}

//对树操作的接口方法(该方法的实现已改成由phanrider提供的showTreeOperateOther方法实现,showTreeOperateOther已经去除，改用showCommon)
function showTreeOperate(type,name,field,operate,width,height){
   	console.log("Coding...");
   	/*
   	selectedNote = tree.getSelected();
   	var url = "../treeoperate/"+type+"/";
   	if(field != '') url = url + field + "/";
   	url = url + operate + ".jsp?name="+name+"&type="+type+"&field="+field;
   	window.open(url,"","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,width="+width+"height="+height+",top=360,left=380'");
	*/
}

//表单提交时进行逻辑判断的实用方法
function isEmpty(text){              //是否为空
     var isEmpty = true;
     for(var i = 0;i<text.length;i++){
        if(text.charAt(i) != ' '){
           isEmpty = false;
           break;
        }
     }
     return isEmpty;
}

//表单提交时进行逻辑判断的实用方法
function isGreatZeroInteger(str){     //是否是一个大于或等于0的整数
    if(isEmpty(str)) return false;
	var temp1 = true;
	var temp2 = '0123456789';
	for(var i=0;i<str.length;i++){
		  var c = str.charAt(i);
			if(temp2.indexOf(c)==-1) {
				temp1 = false;
				break;
			}else{
				if(c == '0' && i == 0 && str.length > 1){
					temp1 = false;
					break;
				}
		  }
	}
	return temp1;
}

//表单提交时进行逻辑判断的实用方法
function isGreatZeroFloat(str){       //是否是一个大于或等于0的实数
  if(isEmpty(str)) return false;
  var temp1 = true;
  var temp2 = '0123456789';
  for(var i = 0,j = 0;i < str.length;i++){
     var c = str.charAt(i);
     if(temp2.indexOf(c) != -1 || c == '.'){
        if(c == '.'){
           if(i == 0 || i == str.length-1){
              temp1 = false;
              break;
           }else{
              j = j + 1;
              if(j > 1){
                 temp1 = false;
                 break;
              }
           }
        } else if(c == '0'){
           if(i == 0){
              if(str.length > 1){
                 if(str.charAt(1) != '.'){
                   temp1 = false;
                   break;
                 }
              }
           }
        }
     } else {
        temp1 = false;
        break;
     }
  }
  return temp1;
}


//将展用新的展示方式， 对数据进行动态创建表格
//phanrider 2009-05-21
function showDataHtml(rows,data, id) {

	if (id == '' || id == null || id == '\n') id = 1;
   //mygrid = new dhtmlXGridObject('outResultDiv');
	var odivObj = 'outResultDiv' + id.toString();
    mygrid = new parent.parent.editorFrame.GGETFRAME.dhtmlXGridObject(odivObj);
    GOUTRESULTGRID[id-1] =  mygrid;
    parent.parent.editorFrame.GGETFRAME.mygrid = mygrid;
    parent.parent.editorFrame.GGETFRAME.GOUTRESULTGRID[id-1] = GOUTRESULTGRID[id-1];
	GGRIDHEADATTR = parent.parent.editorFrame.GGETFRAME.GGRIDHEADATTR;

    mygrid.setImagePath("../../js/codebase/imgs/");

	resultbakHead = data[0];    //得到head的备份
    parent.parent.editorFrame.GGETFRAME.resultbakHead = resultbakHead;


    tlow_flag_num = data.length; //表格展示的行数
	if (data.length > 21) {
			//tlow 表格展示的行数
			tlow = data.length - 1;  //去掉最后一个测试标志行
		} else {
			tlow = data.length ;  //无标志行可去
	}
	//alert(data.length);
    tcell = data[0].length; //表格展示的列数
    var strHeader = "";
    var strSort = "";
    var strAlign = "right,";
    var gridRowType = "";
    var gridRowTypeFlag = "ed";
    var strColgn = "";
    var strColgs = "";
    var splitStr = "_$$$_";
    for(var i = 0; i < tcell; i++) {
		GGRIDHEADATTR[i] = data[0][i].split(splitStr);
		GGRIDHEADATTR[i][2] < GGRIDCELLLENGTH ? gridRowTypeFlag = "ed" : gridRowTypeFlag = "txt";
    	if(i == (tcell - 1)) {
    		strHeader = strHeader + GGRIDHEADATTR[i][0].replace(/\,/gi," ");  // 逗号转义成空格
    		strSort = strSort + "str";
			gridRowType = gridRowType + gridRowTypeFlag;
			if (GGRIDHEADATTR[i][1] == "NUMBER") {
				strAlign = strAlign + "right";
			} else {
				strAlign = strAlign + "left";
			}
			if (GGRIDHEADATTR[i][1] == "DATE") {
				strColgn = strColgn + true;
				strColgs = strColgs + "ValidDatetime";

			} else {
				strColgn = strColgn + false;
				strColgs = strColgs + "";

			}

    	} else  {
    		strHeader = strHeader + GGRIDHEADATTR[i][0] + "," ;
    		strSort = strSort + "str" + ",";
			gridRowType = gridRowType + gridRowTypeFlag + ",";
			if (GGRIDHEADATTR[i][1] == "NUMBER") {
				strAlign = strAlign + "right" + ",";
			} else {
				strAlign = strAlign + "left" + ",";
			}
			if (GGRIDHEADATTR[i][1] == "DATE") {
				strColgn = strColgn + true + ",";
				strColgs = strColgs + "ValidDatetime" + ",";

			} else {
				strColgn = strColgn + false + ",";
				strColgs = strColgs + ""  + ",";

			}
    	}
    }


    strHeader = " ," + strHeader; //前面加一个空行
    strSort = "int," + strSort; //前面数字排序
	gridRowType = "ro," + gridRowType;
	strColgn = false + "," + strColgn;
	strColgs = "," + strColgs;

    mygrid.setHeader(strHeader);
    mygrid.setColAlign(strAlign);
	mygrid.setColTypes(gridRowType);
	mygrid.enableValidation(strColgn);
	mygrid.setColValidators(strColgs);
	mygrid.setColSorting(strSort);
	mygrid.attachEvent("onRowSelect",doOnRowSelected);
	mygrid.attachEvent("onKeyPress",onKeyPressed);
	mygrid.enableBlockSelection(); // 设置可选择锁定
	// mygrid.enableAutoWidth(true);  // 宽度自适应


	var strHeaderWidth = "";
	var size = 100;
    var strCelllMax = [];
    var strCellRealMax = [];
    // 定义默认扩展宽度
    var def_wid = 20;



    if(tcell == 2 && data[0][0] == "ReddragonflyErrorFlag*") {
    	errOracleMsg = data[0][1];
		parent.parent.editorFrame.dhtmlx.alert({
			title : "ERROR",
			top: dAlertTop,
			type : "alert-error",
			text : data[0][1]
		});
    } else {

        for(var i = 0; i < tcell; i++) {
            var word = 8; //初定8个单词长度
            strCelllMax[i] = GGRIDHEADATTR[i][2];
            strCellRealMax[i] = [];

            for (var j = 0; j < data.length - 1; j++ ) {
                strCellRealMax[i][j] = strLengthCorE(data[j+1][i]);
            }

            // 从大小到排序，最终第一列为最大值
            strCellRealMax[i].sort(sortNumberDesc);

            strCellRealMax[i] == '' ?  strCellRealMax[i][0] = strCelllMax[i][0] : strCellRealMax[i] = strCellRealMax[i];


            // 如果最大值（某列空值就为0）仍然小于 column name 的长度，取 column name 的长度
            strCellRealMax[i][0] < strLengthCorE(GGRIDHEADATTR[i][0]) ? strCellRealMax[i][0] = strLengthCorE(GGRIDHEADATTR[i][0]) : strCellRealMax[i][0] = strCellRealMax[i][0];

            // 最后 Cell 宽度为 每个字符宽度8 * 当前结果集中字符串的最大长度 + 默认宽度
            size  = word * strCellRealMax[i][0] + def_wid;

            if(i == (tcell - 1)) strHeaderWidth = strHeaderWidth + size;
            else strHeaderWidth = strHeaderWidth + size + "," ;
        }





        var i = tlow;
        var leftwidth = 20;
        if ( i < 99 ) leftwidth = 20;
        else if ( i < 999 && i >= 100 ) leftwidth = 36;
        else if ( i < 9999 && i >= 1000 ) leftwidth = 52;
        else if ( i < 99999 && i >= 10000 ) leftwidth = 68;
        else if ( i < 999999 && i >= 100000 ) leftwidth = 84;

        strHeaderWidth = leftwidth + "," + strHeaderWidth;


        mygrid.setInitWidths(strHeaderWidth); //定义各列的宽度

    	mygrid.init();  //进行初始化
        mygrid.setEditable(false);
		mygrid.enableMultiselect(true);
		parent.parent.editorFrame.GGETFRAME.globaldataFlag = true;

		globaldataFlag = parent.parent.editorFrame.GGETFRAME.globaldataFlag;

    for(var i = 1; i < tlow; i++) {
    	var strRow = "";
    	var trstyle = "";
    	for (var j = 0; j < tcell; j++) {

    		var tmpS = changeHtml(data[i][j]);

    		if(j == (tcell - 1)) strRow = strRow + tmpS;
    		else strRow = strRow + tmpS + "," ;

    		//if(j == (tcell - 1)) strRow = strRow + data[i][j];
    		//else strRow = strRow + data[i][j] + "," ;


    		if (i % 2 != 0) {
    			if (data[i][j] == "")
    				if (j == (tcell - 1)) trstyle = trstyle + "#FFFFE5";  //空值 白淡黄色
    				else trstyle = trstyle + "#FFFFE5" + ",";
				else
					if (j == (tcell - 1)) trstyle = trstyle + "#FFFFFF";  //空值 白色
    				else trstyle = trstyle + "#FFFFFF" + ",";

			} else {
				if (data[i][j] == "")
					if (j == (tcell - 1)) trstyle = trstyle + "#F2FFE5";  //空值 绿淡黄色
    				else trstyle = trstyle + "#F2FFE5" + ",";
				else
					if (j == (tcell - 1)) trstyle = trstyle + "#E5FFE5";  //空值 绿色
    				else trstyle = trstyle + "#E5FFE5" + ",";
			}
    	}
    	//alert(strRow);


    	trstyle="#E3E3E3"+ "," + trstyle;

		mygrid.setColumnColor(trstyle);
		strRow = i + "," + strRow;
    	mygrid.addRow(i,strRow);



    	//mygrid.setRowColor(i,trstyle);
    	//mygrid.setColumnColor(trstyle);
    	}
		if (getsingleRecordViewFlag()) {
			changeRecordViewInit();
		}

    	//最终得到数据，呈现后的其他按钮状态和改变execSysCommand
    	resetBaseWorkToolBar(true);

    }

    function addRow(){
   	var newId = (new Date()).valueOf()
   	mygrid.addRow(newId,"",mygrid.getRowsNum())
  	 mygrid.selectRow(mygrid.getRowIndex(newId),false,false,true);
  	}

  	function removeRow(){
   	var selId = mygrid.getSelectedId()
   	mygrid.deleteRow(selId);
  	}

  	function doOnRowSelected(rowID,celInd){
		setFootView('9999', GGRIDHEADATTR[celInd -1][0].toLowerCase() + "," + GGRIDHEADATTR[celInd -1][1].toLowerCase() + "(" + GGRIDHEADATTR[celInd -1][2] + ")");
  	}

	function onKeyPressed(code, ctrl, shift){
		if( code==67 && ctrl ){
			if (!mygrid._selectionArea && !mygrid.isEditable) {
				return parent.parent.editorFrame.dhtmlx.alert({
					type : "alert-warning",
					top: dAlertTop,
					text : "You need to select a block area first!"
				});
			}
			if (!mygrid.isEditable) {
				mygrid.setCSVDelimiter("\t");
				mygrid.copyBlockToClipboard();
			}

		}
		if( code==86 && ctrl ){
			if (!mygrid.isEditable) {
				mygrid.setCSVDelimiter("\t");
				mygrid.pasteBlockFromClipboard();
			}

		}
		return true;
	}



}

function addDataHtml(rows,data, id) {


    if (id == '' || id == null || id == '\n') id = 1;

    // mygrid = parent.parent.editorFrame.GGETFRAME.mygrid;

    mygrid = parent.parent.editorFrame.GGETFRAME.GOUTRESULTGRID[id-1];


    tlow_flag_num = data.length; //表格展示的行数

	if (data.length > 20) {
			//tlow 表格展示的行数
			tlow = data.length - 1;  //去掉最后一个测试标志行
		} else {
			tlow = data.length ;  //无标志行可去
	}

	tcell = data[0].length; //表格展示的列数
	for(var i = 0; i < tlow; i++) {
    	var strRow = "";
    	var trstyle = "";
    	for (var j = 0; j < tcell; j++) {

    		var tmpS = changeHtml(data[i][j]);
    		if(j == (tcell - 1)) strRow = strRow + tmpS;
    		else strRow = strRow + tmpS + "," ;

    		//if(j == (tcell - 1)) strRow = strRow + data[i][j];
    		//else strRow = strRow + data[i][j] + "," ;


    		if (i % 2 == 0) {
    			if (data[i][j] == "")
    				if (j == (tcell - 1)) trstyle = trstyle + "#FFFFE5";  //空值 白淡黄色
    				else trstyle = trstyle + "#FFFFE5" + ",";
				else
					if (j == (tcell - 1)) trstyle = trstyle + "#FFFFFF";  //空值 白色
    				else trstyle = trstyle + "#FFFFFF" + ",";

			} else {
				if (data[i][j] == "")
					if (j == (tcell - 1)) trstyle = trstyle + "#F2FFE5";  //空值 绿淡黄色
    				else trstyle = trstyle + "#F2FFE5" + ",";
				else
					if (j == (tcell - 1)) trstyle = trstyle + "#E5FFE5";  //空值 绿色
    				else trstyle = trstyle + "#E5FFE5" + ",";
			}
    	}
    	//alert(strRow);


    	trstyle="#E3E3E3"+ "," + trstyle;

		mygrid.setColumnColor(trstyle);
		var ii = i + 1  + (rows - 1) * countPage ;
		strRow = ii + "," + strRow;
    	mygrid.addRow(ii,strRow,mygrid.getRowsNum());
    	//mygrid.setRowColor(i,trstyle);
    	//mygrid.setColumnColor(trstyle);
    	if (getsingleRecordViewFlag()) {
    		changeRecordViewInit();
    	}
    }
}


function addFullDataHtml(rows,data, id) {

    if (id == '' || id == null || id == '\n') id = 1;


    // mygrid = parent.parent.editorFrame.GGETFRAME.mygrid;
    mygrid = parent.parent.editorFrame.GGETFRAME.GOUTRESULTGRID[id-1];



    tlow_flag_num = data.length; //表格展示的行数

	tlow = data.length ;

	tcell = data[0].length; //表格展示的列数
	for(var i = 0; i < tlow; i++) {
    	var strRow = "";
    	var trstyle = "";
    	for (var j = 0; j < tcell; j++) {

    		var tmpS = changeHtml(data[i][j]);
    		if(j == (tcell - 1)) strRow = strRow + tmpS;
    		else strRow = strRow + tmpS + "," ;

    		//if(j == (tcell - 1)) strRow = strRow + data[i][j];
    		//else strRow = strRow + data[i][j] + "," ;


    		if (i % 2 == 0) {
    			if (data[i][j] == "")
    				if (j == (tcell - 1)) trstyle = trstyle + "#FFFFE5";  //空值 白淡黄色
    				else trstyle = trstyle + "#FFFFE5" + ",";
				else
					if (j == (tcell - 1)) trstyle = trstyle + "#FFFFFF";  //空值 白色
    				else trstyle = trstyle + "#FFFFFF" + ",";

			} else {
				if (data[i][j] == "")
					if (j == (tcell - 1)) trstyle = trstyle + "#F2FFE5";  //空值 绿淡黄色
    				else trstyle = trstyle + "#F2FFE5" + ",";
				else
					if (j == (tcell - 1)) trstyle = trstyle + "#E5FFE5";  //空值 绿色
    				else trstyle = trstyle + "#E5FFE5" + ",";
			}
    	}
    	//alert(strRow);


    	trstyle="#E3E3E3"+ "," + trstyle;

		mygrid.setColumnColor(trstyle);
		var ii = i + 1  + (rows - 1) * countPage ;
		strRow = ii + "," + strRow;

		mygrid.addRow(ii,strRow,mygrid.getRowsNum());

		if (getsingleRecordViewFlag()) {
    		changeRecordViewInit();
    	}
    	//mygrid.setRowColor(i,trstyle);
    	//mygrid.setColumnColor(trstyle);
    }
}


//改变记录显示的grid
function changeRecordShowHtml() {

	var c = 'changeOutResultDiv';
	var tcObj = parent.parent.editorFrame.GGETFRAME.document.getElementById('t_controlDiv');
	if (tcObj.childElementCount <= 1) {
		mygrid = parent.parent.editorFrame.GGETFRAME.GOUTRESULTGRID[0];
		c =  c + '1';
	} else {
		var tabObj = parent.parent.editorFrame.GGETFRAME.document.getElementById( "sqlWindowtabPanel");
		var s = tabObj.tabPane.getSelectedIndex();
		mygrid = parent.parent.editorFrame.GGETFRAME.GOUTRESULTGRID[s];
		s = s + 1;
		c =  c + s.toString();
	}

    resultbakHead = parent.parent.editorFrame.GGETFRAME.resultbakHead;
	GGRIDHEADATTR = parent.parent.editorFrame.GGETFRAME.GGRIDHEADATTR;
	var tmprows = mygrid.getSelectedId();
	if (mygrid.getSelectedId() == null) tmprows = "0";

	changemygrid = new parent.parent.editorFrame.GGETFRAME.dhtmlXGridObject(c);

	changemygrid.setImagePath("../imgs/");
    changemygrid.setHeader(" ,Row " + tmprows + ",Fields");
    changemygrid.setInitWidths("20,180,300"); //定义各列的宽度
    changemygrid.setColTypes("ro,ro,ed");
    changemygrid.setColSorting("str,str,str");
    changemygrid.init();
    changemygrid.setEditable(false);
    //得到列的总数
    var mygridlength = mygrid.getColumnCount();

    for (i = 1; i < mygridlength; i++) {
    	var strrow = "";
    	var tmpcol = "";
    	var trstyle = "";

		if (mygrid.getSelectedId() == null) {	//为空，则特殊处理
			tmpcol = " ";
		} else {
    		tmpcol = mygrid.cells(mygrid.getSelectedId(),i).getValue();
    	}
		strRow = " ," + GGRIDHEADATTR[i-1][0] + "," ;
		// strRow = " ," + resultbakHead[i-1] + ",";


		var tmpS = changeHtml(tmpcol);

    	strRow = strRow + tmpS ;

    	if ((mygrid.getSelectedId()-1) % 2 == 0) {
    			if (tmpcol == "")  {
    				trstyle = "#FFFFE5";  //空值 白淡黄色
    			}
			}
		if (mygrid.getSelectedId() % 2 == 0) {
				if (tmpcol == "") {
					trstyle = "#F2FFE5";  //空值 绿淡黄色
    			}
			}
		trstyle = "#E3E3E3,#E3E3E3," + trstyle ;
		changemygrid.setColumnColor(trstyle);
		changemygrid.addRow(i-1,strRow);
		//alert(strRow);
    }
}



//设置分页按钮状态 True 或者 False
function setFetchNext(flag, id) {
	var fetchnextId = '';
	(id == null || id == '' || id == undefined) ?
		fetchnextId = 'fetchNextTd' : fetchnextId = 'fetchNextTd' + id;

	var fetchnextObject = parent.parent.editorFrame.GGETFRAME.$(fetchnextId);

	fetchnextObject.setEnabled(flag);
}

//设置全部分页按钮状态 True 或者 False
function setFetchLast(flag, id) {
	var fetchLastId = '';
	(id == null || id == '' || id == undefined) ?
		fetchLastId = 'fetchLastTd' : fetchLastId = 'fetchLastTd' + id;

	var fetchLastObject = parent.parent.editorFrame.GGETFRAME.$(fetchLastId);

	fetchLastObject.setEnabled(flag);
}

// 设置 Query By Example 与 Clear record 按钮状态 2020-12-11
function setQueryByExampleAndClearRecord(flag) {
    var queryByExampleID = 'queryByExampleTd';
    var clearRecordID = 'clearRecordTd';
    var queryByExampleObject = parent.parent.editorFrame.GGETFRAME.document.getElementById(queryByExampleID);
    var clearRecordObject = parent.parent.editorFrame.GGETFRAME.document.getElementById(clearRecordID);
    if (queryByExampleObject != null)    queryByExampleObject.setValue(flag);
    if (clearRecordObject != null)  clearRecordObject.setEnabled(flag);
}


//按钮Fetch next page按下执行的函数
function getFYSql(id) {
	if ( fetchnextbuttonpress (id) ) {
		//改变相互作用的按钮状态
		executebuttonpress();
		//设置页脚注释 正在执行...
		setFootView(1, "");
		//改变左下角执行图标状态
		changeExecNoRun(1, "execIsRunButton");
		//同时更改左边工具条的状态
		parent.parent.leftFrameList.changeWindowListTitle(parent.parent.leftFrameList.getWindowType(),parent.parent.leftFrameList.getWindowTr(), parent.parent.editorFrame.GGETFRAME.getTextareaContents('myTextarea'));
		//调用真正的分页执行方法 2020-09-23 换成新的方法
		var tempSqli = parent.parent.editorFrame.GGETFRAME.GMSQL[id-1];
        getFYSql_run_New(tempSqli, id);
	}
}


//按钮Fetch last page按下执行的函数
function getFYQSql(id) {
	if( fetchlastbuttonpress(id) ) {
		//改变相互作用的按钮状态
		executebuttonpress();
		//设置页脚注释 正在执行...
		setFootView(1, "");
		//改变左下角执行图标状态
		changeExecNoRun(1, "execIsRunButton");
		//同时更改左边工具条的状态
        parent.parent.leftFrameList.changeWindowListTitle(parent.parent.leftFrameList.getWindowType(), parent.parent.leftFrameList.getWindowTr(), parent.parent.editorFrame.GGETFRAME.getTextareaContents('myTextarea'));
		//调用真正的全部分页执行方法 2020-09-23 换成新的方法
		// getFYQSql_run();
		var tempSqli = parent.parent.editorFrame.GGETFRAME.GMSQL[id-1];
		getFYQSql_run_New(tempSqli, id);

	}
}


//是否显示for update时的警告信息
function setWarning(flag) {
	var lockButtonObject = parent.parent.editorFrame.GGETFRAME.$('lockButtonTd');

	if(flag == 0) {

		errMsg="These query results are not updateable.\nInclude the ROWID to get updateable results.";

		parent.parent.editorFrame.dhtmlx.alert({
			title: "ERROR",
			top: dAlertTop,
			type: "alert-error",
			text: errMsg
		});


		//lockButtonObject.setToggle(false);
		return false;
	} else {
	    // 添加 column id
        var colid = '$ID$';

        mygrid = parent.parent.editorFrame.GGETFRAME.mygrid;

        tcount = mygrid.getRowsNum();

        for( i=1; i < mygrid.getColumnCount(); i++) {
            colid += ",";
            colid += mygrid.getHeaderCol(i) ;
        }

        mygrid.setColumnIds(colid);
        b = mygrid.getAllRowIds().split(',');
        for (i = 0; i < b.length; i++) {
            parent.parent.editorFrame.GGETFRAME.GUPDATERECORD[i] = mygrid.getRowData(b[i]);
        }

		return true;
	}
}

//得到sql语句是否为for update
//返回值： true or false
function getIfForupdate(textareaname, cflag) {
    var tempStr;
    cflag == 0 ? tempStr =  getTextareaContents(textareaname) : tempStr = textareaname;
	var lockButtonObject = parent.parent.editorFrame.GGETFRAME.$('lockButtonTd');
	if (tempStr.trim().test(" for update$","i")) {
		//设置forupdate标志为1
        parent.parent.editorFrame.GGETFRAME.forUpdateFlag = 1;
		//如果为真，设置为固定按钮
        (lockButtonObject == null || lockButtonObject == '') ? (setTimeout(
                function() {
                    lockButtonObject = parent.parent.editorFrame.GGETFRAME.$('lockButtonTd');
                    lockButtonObject.setToggle(true);
                }
            , 300)) :	lockButtonObject.setToggle(true);
		return true;
	} else {
		//设置forupdate标志为0
        parent.parent.editorFrame.GGETFRAME.forUpdateFlag = 0;
		//否则，设置为非固定按钮
        (lockButtonObject == null || lockButtonObject == '') ? (setTimeout(
            function() {
                lockButtonObject = parent.parent.editorFrame.GGETFRAME.$('lockButtonTd');
                lockButtonObject.setToggle(false);
            }
            , 300)) :	lockButtonObject.setToggle(false);
		// lockButtonObject.setToggle(false);
		return false;
	}
}

//得到sql语句是否为select开头
//返回值： true or false
function getIfSelect(textareaname, cflag) {
    var tempStr;
	cflag == 0 ? tempStr =  getTextareaContents(textareaname) : tempStr = textareaname;
	var selectFlag = false;
	if ( tempStr.trim().test("^select ", "i") ) {
		selectFlag = true;
	} else {
		selectFlag = false;
	}
	return selectFlag;
}

//得到sql语句是否为delete开头
//返回值： true or false
function getIfDelete(textareaname, cflag) {
    var tempStr;
	cflag == 0 ? tempStr =  getTextareaContents(textareaname) : tempStr = textareaname;
	var Flag = false;
	if (tempStr.trim().test("^delete ","i")) {
		Flag = true;
	} else {
		Flag = false;
	}
	return Flag;
}

//得到sql语句是否为insert into开头或者 insert 开头
//返回值： true or false
function getIfInsertInto(textareaname, cflag) {
    var tempStr;
	cflag == 0 ? tempStr =  getTextareaContents(textareaname) : tempStr = textareaname;
	var Flag = false;
	if (tempStr.trim().test("^insert into ","i") ||
		tempStr.trim().test("^insert ","i") ) {
		Flag = true;
	} else {
		Flag = false;
	}
	return Flag;
}


//得到sql语句是否为insert into开头或者update开头
//返回值： true or false
function getIfUpdate(textareaname, cflag) {
    var tempStr;
    cflag == 0 ? tempStr =  getTextareaContents(textareaname) : tempStr = textareaname;
    var Flag = false;
    if (tempStr.trim().test("^update ","i") ) {
        Flag = true;
    } else {
        Flag = false;
    }
    return Flag;
}

//得到sql语句是否为alter、drop、create开头
//返回值： true or false
function getIfDDL(textareaname, cflag) {
    var tempStr;
	cflag == 0 ? tempStr =  getTextareaContents(textareaname) : tempStr = textareaname;
	var Flag = false;
	if (tempStr.trim().test("^alter ","i") ||
		tempStr.trim().test("^drop ","i") ||
		tempStr.trim().test("^create ","i") ||
        tempStr.trim().test("^rename ","i") ||
		tempStr.trim().test("^grant ","i") ||
		tempStr.trim().test("^revoke ","i") ) {
		Flag = true;
	} else {
		Flag = false;
	}
	return Flag;
}


//得到sql语句是否为desc, show开头
//返回值： true or false
// 2020-11-21
function getIfDesc(textareaname, cflag) {
    var tempStr;
    cflag == 0 ? tempStr =  getTextareaContents(textareaname) : tempStr = textareaname;
    var Flag = false;
    if (tempStr.trim().test("^desc ","i") || tempStr.trim().test("^describe ","i") ) {
        Flag = true;
    } else {
        Flag = false;
    }
    return Flag;
}

//得到sql语句是否为desc, show开头
//返回值： true or false
// 2020-11-21
function getIfShow(textareaname, cflag) {
    var tempStr;
    cflag == 0 ? tempStr =  getTextareaContents(textareaname) : tempStr = textareaname;
    var Flag = false;
    if (tempStr.trim().test("^show parameter ","i")) {
        Flag = true;
    } else {
        Flag = false;
    }
    return Flag;
}

//得到sql语句是否为 commit
//返回值： true or false
// 2020-11-21
function getIfCommit(textareaname, cflag) {
    var tempStr;
    cflag == 0 ? tempStr =  getTextareaContents(textareaname) : tempStr = textareaname;
    var Flag = false;
    if (tempStr.trim().test("^commit *$","i")  ) {
        Flag = true;
    } else {
        Flag = false;
    }
    return Flag;
}


//得到sql语句是否为 rollback
//返回值： true or false
// 2020-11-21
function getIfRollback(textareaname, cflag) {
    var tempStr;
    cflag == 0 ? tempStr =  getTextareaContents(textareaname) : tempStr = textareaname;
    var Flag = false;
    if (tempStr.trim().test("^rollback *$","i")) {
        Flag = true;
    } else {
        Flag = false;
    }
    return Flag;
}

//得到sql语句是否为 grant or revoke
//返回值： true or false
// 2020-11-24
function getIfGrantOrRevoke(textareaname, cflag) {
	var tempStr;
	cflag == 0 ? tempStr =  getTextareaContents(textareaname) : tempStr = textareaname;
	var Flag = false;
	if (tempStr.trim().test("^grant ","i") ||
		tempStr.trim().test("^revoke ","i") ) {
		Flag = true;
	} else {
		Flag = false;
	}
	return Flag;
}

//得到sql语句是否为 exec
//返回值： true or false
// 2020-11-24
function getIfExec(textareaname, cflag) {
    var tempStr;
    cflag == 0 ? tempStr =  getTextareaContents(textareaname) : tempStr = textareaname;
    var Flag = false;
    if (tempStr.trim().test("^exec ","i") || tempStr.trim().test("^execute ","i")) {
        Flag = true;
    } else {
        Flag = false;
    }
    return Flag;
}


//得到sql语句是否为 view edit
//返回值： true or false
// 2020-12-5
function getIfViewOrEdit(textareaname, cflag) {
    var tempStr;
    cflag == 0 ? tempStr =  getTextareaContents(textareaname) : tempStr = textareaname;
    var Flag = false;
    if (tempStr.trim().test("^view ","i") || tempStr.trim().test("^edit ","i")) {
        Flag = true;
    } else {
        Flag = false;
    }
    return Flag;
}

//得到sql语句是否为 explain plan
//返回值： true or false
// 2020-12-12
function getIfExplainPlan(textareaname, cflag) {
    var tempStr;
    cflag == 0 ? tempStr =  getTextareaContents(textareaname) : tempStr = textareaname;
    var Flag = false;
    if (tempStr.trim().test("^explain plan ","i")) {
        Flag = true;
    } else {
        Flag = false;
    }
    return Flag;
}


//设置commit按钮的可用或不可用
//true: 可用
//false: 不可用
function setCommit(commitFlag) {
	var commitId = 'commitTd';
	var commitObject = parent.parent.editorToolFrame.document.getElementById(commitId);

    var sqlddlImg = "../images/sql_window.png";
    var sqlddlImgT = "../images/sqlforupdate.png";
	var ctrvalue = parent.parent.leftFrameList.getWindowTr();
    ctrvalue = parent.parent.leftFrameList.GWINDOWLIST[ctrvalue][1];
    ctrvalue = ctrvalue.replace(/n/gi, '');
    var sqlddlImgObj = parent.parent.leftFrameList.document.getElementById('columnButtonSql' + ctrvalue);
    if (sqlddlImgObj != null)
        commitFlag == true ? sqlddlImgObj.src = sqlddlImgT : sqlddlImgObj.src = sqlddlImg;

    commitObject.setEnabled(commitFlag);

}

//设置rollback按钮的可用或不可用
//true: 可用
//false: 不可用
function setRollback(rollbackFlag) {
	var rollbackId = 'rollbackTd';
	var rollbackObject = parent.parent.editorToolFrame.document.getElementById(rollbackId);

	rollbackObject.setEnabled(rollbackFlag);

}

function setNoresult(divname,str) {
	setDivValueNull(divname);
	htmlStr = "<table style='height: 100%; width: 100%;'><tr><td align='center' style='font-size: 12px;'>" + str + "</td></tr></table>";
    parent.parent.parent.editorFrame.GGETFRAME.$(divname).set('html',htmlStr);
}

function commit() {
	var commitID = 'commitTd';
	var commitObject = parent.parent.editorToolFrame.document.getElementById(commitID);

	if(commitObject.getEnabled()) {
        parent.parent.editorFrame.GGETFRAME.forUpdateFlag = 0;
        parent.parent.editorFrame.GGETFRAME.DDLFlag = 0;
        BaisWorkBean.setDbCommit();
		setCommit(false);
		setRollback(false);
		setFootView(10, '');

	} else {
		//alert("commit");
	}
}

function rollback() {
	var rollbackID = 'rollbackTd';
	var rollbackObject = parent.parent.editorToolFrame.document.getElementById(rollbackID);

	if(rollbackObject.getEnabled()) {
        parent.parent.editorFrame.GGETFRAME.forUpdateFlag = 0;
        parent.parent.editorFrame.GGETFRAME.DDLFlag = 0;
        BaisWorkBean.setDbRollback();
		setCommit(false);
		setRollback(false);
		setFootView(9, '');
	} else {
		//alert("rollback");
	}
}

//判断是否存在where条件字句
function getIfwhere(textareaname, cflag) {
	var tempStr;
	cflag == 0 ? tempStr =  getTextareaContents(textareaname) : tempStr = textareaname;
	var Flag = false;
	if (tempStr.trim().test(" where ","i")) {
		Flag = true;
	} else {
		Flag = false;
	}
	return Flag;
}


function queryByExample() {
	var queryByExampleID = 'queryByExampleTd';
	var clearRecordID = 'clearRecordTd';
	var queryByExampleObject = parent.parent.editorFrame.GGETFRAME.document.getElementById(queryByExampleID);
	var clearRecordObject = parent.parent.editorFrame.GGETFRAME.document.getElementById(clearRecordID);
	var qmygrid = parent.parent.editorFrame.GGETFRAME.mygrid;
    var colid = '$ID$';
    var queryByExampleId = 99999999;
    var queryByExampleFlag = parent.parent.editorFrame.GGETFRAME.queryByExampleFlag;

    for( i=1; i < qmygrid.getColumnCount(); i++) {
        colid += ",";
        colid += qmygrid.getHeaderCol(i) ;
    }

	if (!clearRecordObject.getEnabled() && queryByExampleFlag == 0 && queryByExampleObject.getEnabled())  {
        // queryByExample 按钮按下
	    clearRecordObject.setEnabled(true);
        parent.parent.editorFrame.GGETFRAME.queryByExampleFlag = 1;
        setFetchNext(false, '');
        setFetchLast(false, '');
        qmygrid.setColumnIds(colid);
		qmygrid.clearAll();
		qmygrid.setEditable(true);
		qmygrid.addRow(queryByExampleId, parent.parent.editorFrame.GGETFRAME.GQueryByExampleArrayStr,'');
	} else  {
	    // queryByExample 按钮弹出
		if (queryByExampleFlag == 1) {
			clearRecordObject.setEnabled(false);
            parent.parent.editorFrame.GGETFRAME.queryByExampleFlag = 0;
			var queryExampleSql = parent.parent.editorFrame.GGETFRAME.alltmpSql;
			var b = qmygrid.getRowData(queryByExampleId);  // object
            var qandl = Object.getOwnPropertyNames(b);
            var qandr = Object.keys(b).map(function (e) { return b[e] });
            var qandSql = "";
            queryExampleSql = queryExampleSql.replace(/;$/i,'');
            parent.parent.editorFrame.GGETFRAME.GQueryByExampleArrayStr = ",";
            for ( var i = 1; i < qandl.length; i++ ) {
                // 条件值不为空才拼接
                if (qandr[i] != "") {
                    (qandSql != "")? qandSql += " and " : qandSql += "";
                    qandSql += qandl[i] + " = " + "'" + qandr[i] + "'";
                    // 不是第一行 最后一行不加 and 条件
                    qandSql += '\n';
                }
                parent.parent.editorFrame.GGETFRAME.GQueryByExampleArrayStr += qandr[i] + ",";
            }
            // 最后拼接成新SQL
            qandSql == "" ?  '' : queryExampleSql = "select * from ("+queryExampleSql+")"+ '\n'+" where 1 = 1 and (" + qandSql + ")";
            // 重写当前编辑区SQL
            parent.parent.editorFrame.GGETFRAME.editAreaLoader.setValue(gMyTextArea, queryExampleSql);
            // 通过此处调用 F8 标志
            parent.parent.editorFrame.GGETFRAME.GQueryByExampleFlag = 1;
            // 调用执行函数 -> 与 F8 一致
            parent.parent.editorFrame.GGETFRAME.executeRun('myTextarea');
		}
	}
}

// 与 QueryByExample 相对，清除查询条件
function clearRecord() {
    var queryByExampleID = 'queryByExampleTd';
    var clearRecordID = 'clearRecordTd';
    var queryByExampleObject = parent.parent.editorFrame.GGETFRAME.document.getElementById(queryByExampleID);
    var clearRecordObject = parent.parent.editorFrame.GGETFRAME.document.getElementById(clearRecordID);
    var queryByExampleId = 99999999;
    var queryExampleSql = parent.parent.editorFrame.GGETFRAME.alltmpSql;
    var qmygrid = parent.parent.editorFrame.GGETFRAME.mygrid;
    if (clearRecordObject.getEnabled()) {
        // 条件重置
        qmygrid.clearAll();
        // 插入固定 ID 的空行
        qmygrid.addRow(queryByExampleId, '','');
        // 编辑区重置
        parent.parent.editorFrame.GGETFRAME.editAreaLoader.setValue(gMyTextArea, queryExampleSql);
    }

}



function showBaisworkMenu(divName,menuname,evt) {

	var isie=document.all;
    var rightnum=isie?event.button:evt.which;
    if ((isie && rightnum==2) || (!isie && rightnum==3)){        //IE or firefox
    	//获取鼠标位置
		var x;
		var y;
		if(evt.pageX || evt.pageY){
			x = evt.pageX;
		    y = evt.pageY;
		} else {
		    x = evt.clientX + document.body.scrollLeft - document.body.clientLeft;
		    y = evt.clientY + document.body.scrollTop - document.body.clientTop;
		}
	if (divName == 'myTextarea') baisworkSQL = getTextareaContents(divName);
	document.getElementById('BaisworkMenu').style.display = "none";
    document.getElementById('outResultMenu').style.display = "none";
	evt = evt || window.event;
	e = document.getElementById(menuname);
	e.style.top = evt.clientY;
	e.style.left = evt.clientX;
	e.style.display = "inline";
	} else {
        hiddenBaisworkMenu(evt);
    }

}


function hiddenBaisworkMenu(evt) {
	var isie=document.all;
    var rightnum=isie?event.button:evt.which;
    if ((isie && rightnum==2) || (!isie && rightnum==3)){        //IE or firefox
    	return true;
    } else {
        document.getElementById('BaisworkMenu').style.display = "none";
        document.getElementById('outResultMenu').style.display = "none";
    	parent.parent.editorFrame.GGETFRAME.document.getElementById('BaisworkMenu').style.display = "none";
        parent.parent.editorFrame.GGETFRAME.document.getElementById('outResultMenu').style.display = "none";
    }
}


//创建编辑区的右键菜单
function createBaisWorkMenu(divname) {
	var stemp ='<a onclick="execExplainPlan(event);" >Explain Plan</a>' +
	'<a onclick="execTest(event)" ><font color="#808080">Test</font></a>' +
	'<ul></ul>' +
	'<a onclick="execPaste(\'myTextarea\',\'paste\',event);" href="#">Paste&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ctrl+V</a>' +
	'<ul></ul>' +
	'<a onclick="execWorkProperties(\'myTextarea\',event)" href="#">Properties</a>' +
	'<a onclick="execWorkDescribe(\'myTextarea\',event)" href="#">Describe</a>' +
	'<ul></ul>' +
	'<a onclick="execWorkView(\'myTextarea\',event)" href="#">View</a>' +
	'<a onclick="execWorkEdit(event)" ><font color="#808080">Edit</font></a>' +
	'<a onclick="execWorkRename(\'myTextarea\',event)" href="#">Rename</a>' +
	'<a onclick="execWorkDrop(\'myTextarea\',event)" href="#">Drop</a>' +
	'<ul></ul>' +
	'<a onclick="execQueryData(\'myTextarea\',event);" href="#">Query data</a>' +
	'<a onclick="execEditDatat(\'myTextarea\',event)" ><font color="#808080">Edit data</font></a>' +
	'<ul></ul>' +
	'<a onclick="execClear(\'myTextarea\',event);" href="#">Clear</a>';

	setDivValueHtml(divname,stemp);
}

//工作编辑区右键Explain Plan命令执行函数
function execExplainPlan(e) {
	hiddenBaisworkMenu(e);
    parent.parent.editorFrame.explain('myTextarea');
}

//工作编辑区右键Test命令执行函数
function execTest(e) {
	hiddenBaisworkMenu(e);
}

//工作编辑区右键Paste命令执行函数
function execPaste(textareaname,command, e) {
	hiddenBaisworkMenu(e);
	execSysCommand(textareaname, command);
}

//工作编辑区右键Properties命令执行函数
function execWorkProperties(e) {
	hiddenBaisworkMenu(e);
	menuShowObjPD('Properties', '1', '500px', '312px');
}

//工作编辑区右键Describe命令执行函数
function execWorkDescribe(e) {
	hiddenBaisworkMenu(e);
	menuShowObjPD('Describe', '1', '500px', '312px');
}

//工作编辑区右键View命令执行函数
function execWorkView(e) {
	hiddenBaisworkMenu(e);
	menuShowObjPD('View', '2', '500px','312px');
}

//工作编辑区右键Edit命令执行函数
function execWorkEdit(e) {
	hiddenBaisworkMenu(e);
}

//工作编辑区右键Rename命令执行函数
function execWorkRename(e) {
	hiddenBaisworkMenu(e);
	menuShowObjPD('Rename', '1', '500px', '140px');
}

//工作编辑区右键Drop命令执行函数
function execWorkDrop(e) {
	hiddenBaisworkMenu(e);
	menuShowObjPD('Drop', '1', '500px', '120px');
}


//工作编辑区右键Query data命令执行函数
function execQueryData(textareaname, e) {
	hiddenBaisworkMenu(e);
	execQueryTable(textareaname, baisworkSQL);
}

//工作编辑区右键Edit data命令执行函数
function execEditData(textareaname, e) {
	hiddenBaisworkMenu(e);
}


//工作编辑区右键Clear命令执行函数
function execClear(textareaname, e) {
	hiddenBaisworkMenu(e);
	createNew(e);
}

//str: 属性或描述字符串
//flag: 1 表示显示属性或描述
//		  2 表示显示视图（view）
//从右键菜单中显示对象的 Properties 和 Describe
function menuShowObjPD (str, flag, strTopX, strTopY) {
	var tmpData = parent.parent.topFrame.UserObject;
	for (i=0; i<tmpData.length; i++) {
		if (baisworkSQL.toLowerCase().trim() == tmpData[i][0]) {
			if (flag == '1') showCommonFormRightMenu(tmpData[i][1], tmpData[i][0],'',str, strTopX, strTopY);
			if (flag == '2') showViewObject(tmpData[i][1], tmpData[i][0],'1',str);  // 1 表示是从右键菜单调用，不需要刷新左边菜单
			i = tmpData.length;
		}
	}
}

//从右键菜单中显示对象的View 和 Edit
//用已有的 showViewObject



//创建结果输出区的右键菜单
function createOutResultMenu(divname) {
	var stemp ='<a onclick="execClearAll(\'myTextarea\',event);" href="#">Clear</a>' +
	'<a onclick="execClearResults(event);" href="#">Clear Results</a>' +
	'<a onclick="execExportResults(\'pdf\',event);"  href="#">Export Results PDF</a>' +  // 当前页面结查生成 pdf
	'<a onclick="execExportResults(\'html\',event);"  href="#">Export Results HTML</a>' +  // 当前页面结查生成 html
	'<a onclick="execExportResults(\'csv\',event);"  href="#">Export Results CSV</a>' +  // 当前页面结查生成 csv
	'<ul></ul>' +
	'<a onclick="execFetchNextPage(event);" href="#">Fetch Next Page</a>' +
	'<a onclick="execFetchLastPage(event);" href="#">Fetch Last Page</a>' +
	'<ul></ul>' +
	'<a onclick="execCopyResults(event);" href="#" >Copy&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ctrl+C</a>' +
	'<a onclick="execExportResults(\'excel\', event);"  href="#">Copy to Excel</a>'; // 当前页面结果集生成 excel

	setDivValueHtml(divname,stemp);
}

//工作结果输出区右键clear命令执行函数
function execClearAll(textareaname, e) {
	execClear(textareaname, e);
	execClearResults(e);
}


//工作结果输出区右键clear result命令执行函数
function execClearResults(e) {
	hiddenBaisworkMenu(e);
	setDivValueText('outResultDiv','');
	setDivValueText('changeOutResultDiv','');
	//按钮恢复成初始状态
	controlbuttonReset();
	//状态栏初始为空
	setFootView(9999, '　');
	//清除结果集后，需重新设置工作结果区的工具条状态
    resetBaseWorkToolBar(false);
    setsingleRecordViewFlag(0);
    changeRecordViewRestore();

}

//工作结果输出区右键Export Results命令执行函数
function execExportResults(oName, e) {
	hiddenBaisworkMenu(e);
	setFootView(9999, 'Exporting. Please wait ...');
	if ( oName == 'pdf') parent.parent.editorFrame.GGETFRAME.mygrid.toPDF('../../pdf/toPDF.action','gray');
	if ( oName == 'excel') 	parent.parent.editorFrame.GGETFRAME.mygrid.toExcel('../../excel/toExcel.action','gray');
	if ( oName == 'html') 	parent.parent.editorFrame.GGETFRAME.mygrid.toPDF('../../excel/toHtml.action','gray');
	if ( oName == 'csv') 	parent.parent.editorFrame.GGETFRAME.mygrid.toExcel('../../excel/toCSV.action','gray');
	setFootView(9999, 'Exporting, Please wait ... done'); // 修改提示语



}

//工作结果输出区右键Fetch Next Page命令执行函数
function execFetchNextPage(e) {
	hiddenBaisworkMenu(e);
	//直接调用fetch next page按钮执行的函数
	var tpan = parent.parent.editorFrame.GGETFRAME.sqlWindowtabPanel;
	(tpan != '' && tpan != null) ? getFYSql(tpan.tabPane.getSelectedIndex() + 1) : getFYSql(1);
}

//工作结果输出区右键Fetch Last Page命令执行函数
function execFetchLastPage(e) {
	hiddenBaisworkMenu(e);
	//直接调用fetch last page按钮执行的函数
	var tpan = parent.parent.editorFrame.GGETFRAME.sqlWindowtabPanel;
	(tpan != '' && tpan != null) ? getFYQSql(tpan.tabPane.getSelectedIndex() + 1) : getFYQSql(1);
}

//工作结果输出区右键Copy命令执行函数
function execCopyResults(e) {
	hiddenBaisworkMenu(e);
	var mygrid = parent.parent.editorFrame.GGETFRAME.mygrid;
	var cc = mygrid.cells(mygrid.getSelectedId(), mygrid.getSelectedCellIndex());

	function copyToClip(content, m) {
		var o = parent.parent.editorFrame.GGETFRAME.document.getElementById('frame_myTextarea').contentWindow;
		var clip = o.document.createElement("input");
		clip.setAttribute("value", content);
		o.document.body.appendChild(clip);
		clip.select();
		o.document.execCommand("copy", false, null);
		o.document.body.removeChild(clip);

		return m;
	}

	copyToClip(cc.getValue());
	// mygrid.setCSVDelimiter("\t");
	// mygrid.copyBlockToClipboard();

}

//工作结果输出区右键Export Results命令执行函数
function execExportResults_bak(e) {
	hiddenBaisworkMenu(e);
}

//Properties phanrider add by 2009-06-17
function showDataHtmlP(data) {

    mygrid = new dhtmlXGridObject('resultdiv');

    mygrid.setImagePath("../../imgs/");

	//alert(data.length);

	tlow_flag_num = data.length; //表格展示的行数

	tlow = data.length ;  //无标志行可去

	//alert(data.length);
    tcell = data[0].length; //表格展示的列数
    var strHeader = "";
    var strSort = "";
    for(var i = 0; i < tcell; i++) {
    	if(i == (tcell - 1)) {
    		strHeader = strHeader + data[0][i];
    		strSort = strSort + "str";
    	} else  {
    		strHeader = strHeader + data[0][i] + "," ;
    		strSort = strSort + "str" + ",";
    	}
    }


    strHeader = " ," + strHeader; //前面加一个空行
    strSort = "int," + strSort; //前面数字排序
    mygrid.setHeader(strHeader);
    mygrid.setColAlign("right");
	//mygrid.setColTypes("ro,ed");
	mygrid.setColSorting(strSort);


	var strHeaderWidth = "";
	var size = 150;
	for(var i = 0; i < tcell; i++) {
		var word = 8; //初定8个单词长度
	    for( var ii = 0; ii < tlow ;  ii++) {
	    	if ( data[ii][i].length > word ) word = data[ii][i].length;
	    }

	    if (word > 8 && word <= 15 ) size = 190;
					else if  (word > 15 && word <= 20 ) size = 220;
					else if  (word > 20 && word <= 30 ) size = 260;
					else if  (word > 30 ) size = 320;
    	if(i == (tcell - 1)) strHeaderWidth = strHeaderWidth + size;
    	else strHeaderWidth = strHeaderWidth + size + "," ;
    }

    var i = tlow;
    var leftwidth = 20;
    if ( i < 99 ) leftwidth = 30;
    else if ( i < 999 && i >= 100 ) leftwidth = 40;
    else if ( i < 9999 && i >= 1000 ) leftwidth = 50;
    else if ( i < 99999 && i >= 10000 ) leftwidth = 60;
    else if ( i < 999999 && i >= 100000 ) leftwidth = 70;

    strHeaderWidth = leftwidth + "," + strHeaderWidth;


	mygrid.setInitWidths(strHeaderWidth); //定义各列的宽度

    if(tcell == 2 && data[0][0] == "ReddragonflyErrorFlag*") {
    	errOracleMsg = data[0][1];
		parent.parent.editorFrame.dhtmlx.alert({
			title : "ERROR",
			top: dAlertTop,
			type : "alert-error",
			text : data[0][1]
		});
    } else {
    	mygrid.enableAutoHeigth(true);

    	mygrid.init();  //进行初始化
        mygrid.setEditable(false);


    for(var i = 1; i < tlow; i++) {
    	var strRow = "";
    	var trstyle = "";
    	for (var j = 0; j < tcell; j++) {

    		var tmpS = changeHtml(data[i][j]);
    		if(j == (tcell - 1)) strRow = strRow + tmpS;
    		else strRow = strRow + tmpS + "," ;

    		//if(j == (tcell - 1)) strRow = strRow + data[i][j];
    		//else strRow = strRow + data[i][j] + "," ;
    	}
    	trstyle="#E3E3E3"+ "," + trstyle;

		mygrid.setColumnColor(trstyle);
		strRow = i + "," + strRow;
    	mygrid.addRow(i,strRow);
    	}
    }

}

//Describe phanrider add by 2009-06-17
function showDataHtmlD(data) {

    mygrid = new dhtmlXGridObject('resultdiv');

    mygrid.setImagePath("../../imgs/");

	//alert(data.length);

	tlow_flag_num = data.length; //表格展示的行数
	tlow = data.length ;  //无标志行可去

	//alert(data.length);
    tcell = data[0].length; //表格展示的列数
    var strHeader = "";
    var strSort = "";
    for(var i = 0; i < tcell; i++) {
    	if(i == (tcell - 1)) {
    		strHeader = strHeader + data[0][i];
    		strSort = strSort + "str";
    	} else  {
    		strHeader = strHeader + data[0][i] + "," ;
    		strSort = strSort + "str" + ",";
    	}
    }


    strHeader = " ," + strHeader; //前面加一个空行
    strSort = "int," + strSort; //前面数字排序
    mygrid.setHeader(strHeader);
    mygrid.setColAlign("right");
	//mygrid.setColTypes("ro,ed");

	mygrid.setColSorting(strSort);


	var strHeaderWidth = "";
	var size = 50;
	for(var i = 0; i < tcell; i++) {
		var word = 8; //初定8个单词长度
	    for( var ii = 0; ii < tlow ;  ii++) {
	    	if ( data[ii][i].length > word ) word = data[ii][i].length;
	    }

	    if (word > 8 && word <= 15 ) size = 115;
					else if  (word > 15 && word <= 20 ) size = 150;
					else if  (word > 20 ) size = 200;
    	if(i == (tcell - 1)) strHeaderWidth = strHeaderWidth + size;
    	else strHeaderWidth = strHeaderWidth + size + "," ;
    }

    var i = tlow;
    var leftwidth = 20;
    if ( i < 99 ) leftwidth = 20;
    else if ( i < 999 && i >= 100 ) leftwidth = 30;
    else if ( i < 9999 && i >= 1000 ) leftwidth = 40;
    else if ( i < 99999 && i >= 10000 ) leftwidth = 50;
    else if ( i < 999999 && i >= 100000 ) leftwidth = 60;

    strHeaderWidth = leftwidth + "," + strHeaderWidth;


	mygrid.setInitWidths(strHeaderWidth); //定义各列的宽度

    if(tcell == 2 && data[0][0] == "ReddragonflyErrorFlag*") {
    	errOracleMsg = data[0][1];
		parent.parent.editorFrame.dhtmlx.alert({
			title : "ERROR",
			top: dAlertTop,
			type : "alert-error",
			text : data[0][1]
		});
    } else {

    	//mygrid.enableAutoHeigth(true,380);

    	mygrid.init();  //进行初始化
        mygrid.setEditable(false);

    for(var i = 1; i < tlow; i++) {
    	var strRow = "";
    	var trstyle = "";
    	for (var j = 0; j < tcell; j++) {

    		var tmpS = changeHtml(data[i][j]);
    		if(j == (tcell - 1)) strRow = strRow + tmpS;
    		else strRow = strRow + tmpS + "," ;

    		//if(j == (tcell - 1)) strRow = strRow + data[i][j];
    		//else strRow = strRow + data[i][j] + "," ;
    	}
    	trstyle="#E3E3E3"+ "," + trstyle;
    	mygrid.setColumnColor(trstyle);
		strRow = i + "," + strRow;
    	mygrid.addRow(i,strRow);
    	}
    }
}

// phanrider add by 2020-12-15
// 展示执行计划的 grid
function showDataHtmlExplain(s,data) {

    explainMygrid = new dhtmlXGridObject(s);

    explainMygrid.setImagePath("../../imgs/");

    tlow_flag_num = data.length; //表格展示的行数
    tlow = data.length ;  //无标志行可去

    //alert(data.length);
    tcell = data[0].length; //表格展示的列数
    var strHeader = "";
    var strSort = "";
    for(var i = 0; i < tcell; i++) {
        if(i == (tcell - 1)) {
            strHeader = strHeader + data[0][i];
            strSort = strSort + "str";
        } else  {
            strHeader = strHeader + data[0][i] + "," ;
            strSort = strSort + "str" + ",";
        }
    }


    explainMygrid.setHeader(strHeader);
    explainMygrid.setStyle("background-color: #FFF;text-align:left;",null,null,null);

    explainMygrid.setColAlign("left");

    explainMygrid.setColSorting(strSort);
    explainMygrid.attachEvent("onRowSelect",doOnExplainRowSelected);



    var strHeaderWidth = "";
    var size = 70;
    for(var i = 0; i < tcell; i++) {
        var word = 8; //初定8个单词长度
        for( var ii = 0; ii < tlow ;  ii++) {
            if ( data[ii][i].length > word ) word = data[ii][i].length;
        }

        if (word > 8 && word <= 15 ) size = 130;
        else if  (word > 15 && word <= 20 ) size = 180;
        else if  (word > 20 ) size = 300;
        if(i == (tcell - 1)) strHeaderWidth = strHeaderWidth + size;
        else strHeaderWidth = strHeaderWidth + size + "," ;
    }

    var i = tlow;


    strHeaderWidth =  strHeaderWidth;


    explainMygrid.setInitWidths(strHeaderWidth); //定义各列的宽度

    if(tcell == 2 && data[0][0] == "ReddragonflyErrorFlag*") {
        errOracleMsg = data[0][1];
        parent.parent.editorFrame.dhtmlx.alert({
            title : "ERROR",
            top: dAlertTop,
            type : "alert-error",
            text : data[0][1]
        });
    } else {


        explainMygrid.init();  //进行初始化
        explainMygrid.setEditable(false);

        for(var i = 1; i < tlow; i++) {
            var strRow = "";
            var trstyle = "";
            for (var j = 0; j < tcell; j++) {

                var tmpS = changeHtml(data[i][j]);
                if(j == (tcell - 1)) strRow = strRow + tmpS;
                else strRow = strRow + tmpS + "," ;

            }
            // trstyle="#E3E3E3"+ "," + trstyle;
            explainMygrid.setColumnColor(trstyle);
            // strRow = i + "," + strRow;
            explainMygrid.addRow(i,strRow);
        }
    }
}


// phanrider add by 2020-12-23
// 展示无效对象编译的 grid
function showDataHtmlCompileInvalid(s,data) {

	compileInvalidMygrid = new dhtmlXGridObject(s);

	compileInvalidMygrid.setImagePath("../../imgs/");

	var tlow_flag_num = data.length; //表格展示的行数
	var tlow = data.length ;  //无标志行可去

	//alert(data.length);
	var tcell = data[0].length; //表格展示的列数
	var strHeader = "";
	var strSort = "";
	var gridRowType = "";
	for(var i = 0; i < tcell; i++) {
		if(i == (tcell - 1)) {
			strHeader = strHeader + data[0][i];
			strSort = strSort + "str";
			gridRowType += "ro";
		} else  {
			strHeader = strHeader + data[0][i] + "," ;
			strSort = strSort + "str" + ",";
			gridRowType += "ro,";

		}
	}

	strHeader = " ," + strHeader;
	strSort = "str," + strSort;
	gridRowType = "img," + gridRowType;



	compileInvalidMygrid.setHeader(strHeader);
	compileInvalidMygrid.setStyle("text-align:left;",null,null,null);

	compileInvalidMygrid.setColAlign("left");

	compileInvalidMygrid.setColSorting(strSort);
	compileInvalidMygrid.attachEvent("onRowSelect",doOnCompileInvalidRowSelected);
	compileInvalidMygrid.setColTypes(gridRowType);



	var strHeaderWidth = "";


	strHeaderWidth =  "25,240,120,*";


	compileInvalidMygrid.setInitWidths(strHeaderWidth); //定义各列的宽度
	compileInvalidMygrid.enableAutoWidth(true);


	if(tcell == 2 && data[0][0] == "ReddragonflyErrorFlag*") {
		errOracleMsg = data[0][1];
		parent.parent.editorFrame.dhtmlx.alert({
			title : "ERROR",
			top: dAlertTop,
			type : "alert-error",
			text : data[0][1]
		});
	} else {

		compileInvalidMygrid.init();  //进行初始化
		compileInvalidMygrid.setEditable(false);

		for(var i = 1; i < tlow; i++) {
			var strRow = "";
			var trstyle = "";
			var strImg = "../../tree/dbimages/";
			for (var j = 0; j < tcell; j++) {

				var tmpS = changeHtml(data[i][j]);
				if(j == (tcell - 1)) strRow = strRow + tmpS;
				else strRow = strRow + tmpS + "," ;

			}
			// trstyle="#E3E3E3"+ "," + trstyle;
			compileInvalidMygrid.setColumnColor(trstyle);
			if (data[i][1] == "FUNCTION") strImg += "invalid_funs.png";
			else if (data[i][1] == "PROCEDURE") strImg += "invalid_prcs.png";
			else if (data[i][1] == "PACKAGE") strImg += "invalid_pkgs.png";
			else if (data[i][1] == "PACKAGE BODY") strImg += "invalid_pkgs_b.png";
			else if (data[i][1] == "TYPE") strImg += "invalid_types.png";
			else if (data[i][1] == "TYPE BODY") strImg += "invalid_types_b.png";
			else if (data[i][1] == "VIEW" || data[i][1] == "MATERIALIZED VIEW" ) strImg += "invalid_views.png";
			else if (data[i][1] == "JAVA CLASS" || data[i][1] == "JAVA DATA" || data[i][1] == "JAVA RESOURCE" || data[i][1] == "JAVA SOURCE" ) strImg += "invalid_views.png";
			else if (data[i][1] == "TRIGGER") strImg += "err_triggers.png";
			else strImg += "notype.png";

			strRow = strImg + "^" + i + "," + strRow;
			compileInvalidMygrid.addRow(i,strRow);
		}

		// error_info 框内容
        var o = parent.parent.parent.editorFrame.GGETFRAME.document.getElementById('errorInfo');
        o.innerHTML = '';
        var bk = "width: 100%; color: #800000;";
        var intdata = [];
        parseInt(tlow) > 0 ? intdata[0] = (parseInt(tlow) - 1) + " invalid object(s) found" : intdata[0] = "0 invalid object(s) found";
        intdata[1] = "Press the Execute button to compile these objects";
         for (var i = 0; i < 2; i++) {
            o.innerHTML += "<div style='" + bk + "' onclick='parent.parent.parent.editorFrame.GGETFRAME.chcolor(event)'><span style='width: 100%; display: inline-block;'>" + intdata[i] + "</span></div>";
        }
	}
}

// phanrider add by 2011-04-12
// View Table 调用每个DIV调用的回调函数，会带上本地DIV名称调用真正显示函数 showDataHtmlReal
function showDataHtmlKeys(data) {
	var keydivname = 'resultdiv_keys';
	showDataHtmlReal(data, keydivname);
}

function showDataHtmlChecks(data) {
	var keydivname = 'resultdiv_checks';
	showDataHtmlReal(data, keydivname);
}

function showDataHtmlIndexs(data) {
	var keydivname = 'resultdiv_indexs';
	showDataHtmlReal(data, keydivname);
}

function showDataHtmlPrivileges(data) {
	var keydivname = 'resultdiv_privileges';
	showDataHtmlReal(data, keydivname);
}

function showDataHtmlTriggers(data) {
	var keydivname = 'resultdiv_triggers';
	showDataHtmlReal(data, keydivname);
}

//真正调用本地及服务器参数的回调函数
//data： 服务器返回的数据
//divname：本地参数，各个DIV名称或ID
function showDataHtmlReal(data, divname)
{
	mygrid = new dhtmlXGridObject(divname);
	mygrid.setImagePath("../../imgs/");
	tlow_flag_num = data.length; //表格展示的行数
	tlow = data.length ;  //无标志行可去

	//alert(data.length);
    tcell = data[0].length; //表格展示的列数
    var strHeader = "";
    var strSort = "";
    for(var i = 0; i < tcell; i++) {
    	if(i == (tcell - 1)) {
    		strHeader = strHeader + data[0][i];
    		strSort = strSort + "str";
    	} else  {
    		strHeader = strHeader + data[0][i] + "," ;
    		strSort = strSort + "str" + ",";
    	}
    }


    strHeader = " ," + strHeader; //前面加一个空行
    strSort = "int," + strSort; //前面数字排序
    mygrid.setHeader(strHeader);
    mygrid.setColAlign("right");
	//mygrid.setColTypes("ro,ed");

	mygrid.setColSorting(strSort);


	var strHeaderWidth = "";
	var size = 50;
	for(var i = 0; i < tcell; i++) {
		var word = 8; //初定8个单词长度
	    for( var ii = 0; ii < tlow ;  ii++) {
	    	if ( data[ii][i].length > word ) word = data[ii][i].length;
	    }

	    if (word > 8 && word <= 15 ) size = 115;
					else if  (word > 15 && word <= 20 ) size = 150;
					else if  (word > 20 ) size = 200;
    	if(i == (tcell - 1)) strHeaderWidth = strHeaderWidth + size;
    	else strHeaderWidth = strHeaderWidth + size + "," ;
    }

    var i = tlow;
    var leftwidth = 20;
    if ( i < 99 ) leftwidth = 20;
    else if ( i < 999 && i >= 100 ) leftwidth = 30;
    else if ( i < 9999 && i >= 1000 ) leftwidth = 40;
    else if ( i < 99999 && i >= 10000 ) leftwidth = 50;
    else if ( i < 999999 && i >= 100000 ) leftwidth = 60;

    strHeaderWidth = leftwidth + "," + strHeaderWidth;


	mygrid.setInitWidths(strHeaderWidth); //定义各列的宽度

    if(tcell == 2 && data[0][0] == "ReddragonflyErrorFlag*") {
    	errOracleMsg = data[0][1];
		parent.parent.editorFrame.dhtmlx.alert({
			title : "ERROR",
			top: dAlertTop,
			type : "alert-error",
			text : data[0][1]
		});
    } else {

    	//mygrid.enableAutoHeigth(true,380);

    	mygrid.init();  //进行初始化
        mygrid.setEditable(false);

    for(var i = 1; i < tlow; i++) {
    	var strRow = "";
    	var trstyle = "";
    	for (var j = 0; j < tcell; j++) {

    		var tmpS = changeHtml(data[i][j]);
    		if(j == (tcell - 1)) strRow = strRow + tmpS;
    		else strRow = strRow + tmpS + "," ;

    		//if(j == (tcell - 1)) strRow = strRow + data[i][j];
    		//else strRow = strRow + data[i][j] + "," ;
    	}
    	trstyle="#E3E3E3"+ "," + trstyle;
    	mygrid.setColumnColor(trstyle);
		strRow = i + "," + strRow;
    	mygrid.addRow(i,strRow);
    	}
    }
}


function showCommon(type,name,field,operate,width,height){
	selectedNote = tree.getSelected();
    var url = "../treeoperate/common/";
	//if(field != '') url = url + field + "/";
    url = url + operate + ".jsp?name="+name+"&type="+type+"&field="+field;
    //window.showModalDialog(url,"","dialogWidth:"+width+";dialogHeight:"+height+";center:yes;resizable:yes");
    window.open(url,"","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=auto,resizable=yes,copyhistory=no,width="+width+",height="+height+",top=360,left=500");
}

function showCommonFormRightMenu(type,name,field,operate,width,height){
	var url = "../../treeoperate/common/";
	url = url + operate + ".jsp?name="+name+"&type="+type+"&field="+field;
    window.open(url,"","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=auto,resizable=yes,copyhistory=no,width="+width+",height="+height+",top=360,left=500");
}

function showRoot(type,name,field,operate,width,height){
	selectedNote = tree.getSelected();
	field = field.replace(/ /gi,"_");  //转换" "空格为"_"下划线
    var url = "../treeoperate/root/" + field + "/";
	//if(field != '') url = url + field + "/";
    url = url + operate + ".jsp?name="+name+"&type="+type+"&field="+field;
    //window.showModalDialog(url,"","dialogWidth:"+width+";dialogHeight:"+height+";center:yes;resizable:yes");
    window.open(url,"","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=auto,resizable=yes,copyhistory=no,width="+width+",height="+height+",top=360,left=500");
}

function showNewObject(type,name,parameters,returnType,operate,nodetype,tablelist,statementLevlel) {
	selectedNote = tree.getSelected();
	var url = "../editor/CommandWindow/";
	url = url + operate + ".jsp" + "?name=" + name + "&parameters=" + parameters + "&returnType=" + returnType + "&objType=" + type + "&tablelist=" + tablelist + "&statementLevlel=" + statementLevlel;
	tmptype = "SQL";
	if(type == "function") {
		tmptype = "FUN";
	} else if(type == "procedure") {
		tmptype = "PRO";
	} else if(type == "package") {
		tmptype = "PAC";
	} else if(type == "package_body") {
		tmptype = "PAB";
	} else if(type == "type") {
		tmptype = "TYP";
	} else if(type == "type_body") {
		tmptype = "TYB";
	} else if(type == "trigger") {
		tmptype = "TRI";
	} else if(type == "java_source") {
		tmptype = "JAV";
	} else if(type == "view") {
		tmptype = "VIE";
	} else if(type == "materialized_view") {
		tmptype = "VIM";
	} else if(type == "table") {
		tmptype = "TAB";
	}
	//alert(url);
	parent.editorToolFrame.nodeType = nodetype;

    parent.leftFrameList.createNewSql(tmptype, url);

}


//type: 用户对象的类型
//name: 用户对象的名称
//field: 1 为 右键菜单 调用，其他调用为空   by  phanrider 2011-4-21
//operate: 用户对象的操作，即View、Edit
function showViewObject(type,name,field,operate) {

	// if (field == '') selectedNote = tree.getSelected();

    // this.id = parent.parent.leftFrameList.GTDID

	var url = "../editor/ViewWindow/";
	url = url + operate + ".jsp" + "?name=" + name + "&type=" + type ;
	tmptype = "SQL";
	if(type == "function") {
		tmptype = "FUN";
	} else if(type == "procedure") {
		tmptype = "PRO";
	} else if(type == "package") {
		tmptype = "PAC";
	} else if(type == "package body") {
		tmptype = "PAB";
	} else if(type == "type") {
		tmptype = "TYP";
	} else if(type == "type body") {
		tmptype = "TYB";
	} else if(type == "trigger") {
		tmptype = "TRI";
	} else if(type == "java source") {
		tmptype = "JAV";
	} else if(type == "view") {
		tmptype = "VIE";
	} else if(type == "materialized view") {
		tmptype = "VIM";
	} else if(type == "table") {
		tmptype = "TAB";
	}

	parent.parent.leftFrameList.createNewSql(tmptype, url);

	//parent.editorFrame.location.replace(url);
}



//type: 用户对象的类型
//name: 用户对象的名称
//field: 传过来对象类型，即Funtions，作为树判断是否为根节点的依据
//operate: 用户对象的操作，即View、Edit
function showEditObject(type,name,field,operate) {
	selectedNote = tree.getSelected();
	var url = "../editor/CommandWindow/";
	url = url + operate + ".jsp" + "?name=" + name + "&type=" + type ;
	tmptype = "SQL";
	if(type == "function") {
		tmptype = "FUN";
	} else if(type == "procedure") {
		tmptype = "PRO";
	} else if(type == "package") {
		tmptype = "PAC";
	} else if(type == "package body") {
		tmptype = "PAB";
	} else if(type == "type") {
		tmptype = "TYP";
	} else if(type == "type body") {
		tmptype = "TYB";
	} else if(type == "trigger") {
		tmptype = "TRI";
	} else if(type == "java_source") {
		tmptype = "JAV";
	} else if(type == "view") {
		tmptype = "VIE";
	} else if(type == "materialized_view") {
		tmptype = "VIM";
	} else if(type == "table") {
		tmptype = "TAB";
	}
	parent.editorToolFrame.nodeType = field;
	parent.parent.leftFrameList.createNewSql(tmptype, url);
}

function recompile(objectType, objectName, debugFlag) {

	//真正通过dwr调用相应的Bean
	parent.editorToolFrame.BaisWorkBean.execObjectCompile(objectType, objectName, debugFlag, callexecobjectback);

	function callexecobjectback(intdata){

	var oracleTitle = "";
	var insertordel = "";
	var rows="";
	var tcell = intdata[0].length;

	if(tcell == 2 && intdata[0][0] == "ReddragonflyErrorFlag*") {
		errOracleMsg = intdata[0][1];
		parent.parent.editorFrame.dhtmlx.alert({
			title : "ERROR",
			top: dAlertTop,
			type : "alert-error",
			text : intdata[0][1]
		});
	} else if(tcell == 2 && intdata[0][0] == "ReddragonflySuccessFlag*") {
		rows = intdata[0][1];
	}

	if ( errOracleMsg != "") {
	 	oracleTitle = errOracleMsg;
	 	//出错处理

	 	//重新设置为空
	 	errOracleMsg = "";
	} else  {
			oracleTitle = objectName + " " + rows ;	//这里需要把SQL执行后ORACLE反映出来的提示信息放进变量
	}

	//左边树的选中节点重新加载，只有执行成功才重新加载
	if(tcell == 2 && intdata[0][0] == "ReddragonflySuccessFlag*") {
	        if (rows != "")
                parent.parent.editorFrame.dhtmlx.alert({
                    type: "alert-warning",
                    top: dAlertTop,
                    text: oracleTitle
                });
			parent.leftFrame.tree.getSelected().getParent().reload();  //父节点刷新
		}
	}
}

function changeHtml(str) {
	var tmp = str.replace(/,/gi,"&#44;"); //转换","
	tmp = tmp.replace(/</gi,"&lt;"); //转换"<"
	tmp = tmp.replace(/>/gi,"&gt;"); //转换">"
	return tmp;
}


//创建windowlist工具条，通用新创建工具条方法
function createWindowList(windowType, str, eFlag) {

	var initStr = "";
	var newStr = "";
	var endStr = "";
	var img = "../images/no_saved.gif";
	var sqlImg = "../images/sql_window.png";
	var maxAltLength = 36; //字符串最大长度
	var oname = "";
    var sqlImage = "";
    var eplimg = "../images/view_table.png";
    var cioimg = "../images/compile_invalid_object.png"


	eFlag == true ? eFlagStr = 'Edit' : eFlagStr = 'View';

	//此处为接口，不同的窗口类型，定义不同的windowType即可，如果新增不同窗口类型，此处需添加针对该窗口类型的方法
	if(windowType == "SQL") {
		initStr = "SQL Window - ";
		newStr = "New";
	} else if (windowType == "FUN") {
		initStr = "Program Window - ";
		newStr = eFlagStr + " source of function ";
		oname = str.split('=')[1].split('&')[0];
		newStr += oname;
		img = "../images/no_fun_saved.gif";
	} else if (windowType == "PRO") {
		initStr = "Program Window - ";
		newStr = eFlagStr + " source of procedure ";
		oname = str.split('=')[1].split('&')[0];
		newStr += oname;
		img = "../images/no_fun_saved.gif";
	} else if (windowType == "PAC") {
		initStr = "Program Window - ";
		newStr = eFlagStr + " source of package ";
		oname = str.split('=')[1].split('&')[0];
		newStr += oname;
		img = "../images/no_fun_saved.gif";
	} else if (windowType == "PAB") {
		initStr = "Program Window - ";
		newStr = eFlagStr + " source of package body ";
		oname = str.split('=')[1].split('&')[0];
		newStr += oname;
		img = "../images/no_fun_saved.gif";
	} else if (windowType == "TYP") {
		initStr = "Program Window - ";
		newStr = eFlagStr + " source of type ";
		oname = str.split('=')[1].split('&')[0];
		newStr += oname;
		img = "../images/no_fun_saved.gif";
	} else if (windowType == "TYB") {
		initStr = "Program Window - ";
		newStr = eFlagStr + " source of type body ";
		oname = str.split('=')[1].split('&')[0];
		newStr += oname;
		img = "../images/no_fun_saved.gif";
	} else if (windowType == "TRI") {
		initStr = "Program Window - ";
		newStr = eFlagStr + " source of trigger ";
		oname = str.split('=')[1].split('&')[0];
		newStr += oname;
		img = "../images/no_fun_saved.gif";
	} else if (windowType == "JAV") {
		initStr = "Program Window - ";
		newStr = eFlagStr + " source of java source ";
		oname = str.split('=')[1].split('&')[0];
		newStr += oname;
		img = "../images/no_fun_saved.gif";
	} else if (windowType == "VIE") {
		initStr = "SQL Window - ";
		newStr = "New";
	} else if (windowType == "VIM") {
		initStr = "SQL Window - ";
		newStr = "New";
	} else if (windowType == "TAB") {
		initStr = "View table ";
		newStr = str.split('=')[1].split('&')[0];
        img = "../images/view_table.png";
    } else if (windowType == "CSQ") {
		initStr = "Command Window - ";
		newStr = "New";
	} else if (windowType == "EPL") {
        initStr = "Explain Plan Window - ";
        newStr = "";
        img = eplimg;
    } else if (windowType == "CIO") {
        initStr = "Compile Invalid Objects";
        newStr = "";
        img = cioimg;
    }

	endStr = initStr + newStr;


	//得到已有表格对象
	var tableObject=parent.parent.leftFrameList.$("windowListBar");


	//判断已经存在的行的最大值
	var introws = tableObject.rows.length;


	if (introws > GMIXWINDOWS - 1) {
		//超过20个弹出提示
		parent.parent.editorFrame.dhtmlx.alert({
			type : "alert-warning",
			top: dAlertTop,
			text : "Has exceeded the maximum window can be created!"
		});

	} else {
		var newTr = tableObject.insertRow(introws);
		var newTd = newTr.insertCell(0);
        GWINDOWLIST =  parent.parent.leftFrameList.GWINDOWLIST;

        if (str == "initnew") {
			newTd.setAttribute("class","coolButtonActive");
		} else {
			newTd.setAttribute("class","coolButton");
		}
		var sType = windowType;
		var introwstmp = introws; // 为TR计算，真正要插入的逻辑行
		var TdId = sType + "NewTd" + introws; //后面代码中已重新赋值
		GTDID = "n" + introws;      //后面代码中已重新赋值

		for ( i = 0; i < GMIXWINDOWS; i++ ) {

            tmptdidflag = false;
            tmptdid = "n" + i;

            for ( j=0; j<=introws; j++) {

                if (GWINDOWLIST.hasOwnProperty([j])) {
                    if (GWINDOWLIST[j][1] == tmptdid) {
                        tmptdidflag = true;
                        j = introws + 1;
                        break;
                    }
                }
            }

            if (!tmptdidflag) {
                GWINDOWLIST[introws] = [];
                GWINDOWLIST[introws][0] = introws;
                GWINDOWLIST[introws][1] = tmptdid;
                TdId = sType + "NewTd" + tmptdid;
                GTDID = tmptdid;
                introws = i;

                i = GMIXWINDOWS;
                break;
            }

        }

		//if (GWINDOWLIST[introws] == 0)  GWINDOWLIST[introws] = GTDID;


        newTd.setAttribute("id",TdId);
		newTd.setAttribute("width","98%");
		newTd.setAttribute("align","left");
		//newTd.setAttribute("onclick","test1()");
		newTd.onclick= function(e) {


			//alert(introws);
			//只有这样，才可以带参数
			//alert(introws);
			//alert(parent.leftFrameList.$('windowListBar').get('html'));
			windowListTdOnclick(windowType,e);
		};
		//alert(newTd.onclick);

		var spanId = "WindowListValue" + introws;
		var imgId = "columnButton" + introws;

        var sqlImageId = "columnButtonSql" + introws;
        if (windowType == "SQL" || windowType == "VIE" || windowType == "VIM" || windowType == "CSQ")  sqlImage = "<img id=" + sqlImageId + " src='" + sqlImg + "' align='absmiddle'>";


        var htmlTemp = "<img id=" + imgId + " src='" + img + "' align='absmiddle'>" + sqlImage +
							"<span id='" + spanId + "' style=' vertical-align: middle; overflow: no;'  title='" + endStr + "' alt='" + endStr + "'></span>";
		endStr = initStr + newStr;
		//如果字符串超出定义长度，则截断
		if(endStr.length > maxAltLength) {
			endStr = endStr.substr(0, maxAltLength) + " ... ";
		}
		//alert(spanId);

		//为新列增加HTML
		newTd.innerHTML = htmlTemp;
		divname = spanId;
		$(divname).set('text',endStr);


		if (windowType == "SQL") {
			//如果为初始登录，则不创建按钮
			if (str != "initnew") {

				//新建一个新窗口时再保存当前已被按下的窗口的内容
				var i = getWindowTr();
				var SQLWindowString = "SQLWindow" + i;
				saveDivValue("SQLWindow",SQLWindowString, getWindowType(), i);
				initWindwoListButton(introwstmp);


			} else {
				initWindwoListButton(introwstmp);

            }
		} else if (windowType == "FUN" || windowType == "PRO" || windowType == "PAC"
					|| windowType == "PAB" || windowType == "TYP" || windowType == "TYB"
					|| windowType == "TRI" || windowType == "JAV" || windowType == "VIE"
					|| windowType == "VIM" || windowType == "TAB") {
				var i = getWindowTr();
				var SQLWindowString = "SQLWindow" + i;
				//alert(getWindowType());
				//alert(SQLWindowString);
				saveDivValue("SQLWindow",SQLWindowString, getWindowType(), i);
				initWindwoListButton(introws);
		}  else if (windowType == "JAVA") {
				var i = getWindowTr();
				var SQLWindowString = "SQLWindow" + i;

				saveDivValue("SQLWindow",SQLWindowString, getWindowType(), i);
				initWindwoListButton(introws);
		} else if (windowType == "CSQ")  {

			var i = getWindowTr();
			var SQLWindowString = "SQLWindow" + i;
			saveDivValue("SQLWindow",SQLWindowString, getWindowType(), i);
			initWindwoListButton(introws);
		} else if (windowType == "EPL")  {

            var i = getWindowTr();
            var SQLWindowString = "SQLWindow" + i;
            //saveDivValue("SQLWindow",SQLWindowString, getWindowType(), i);
            initWindwoListButton(introws);
        } else if (windowType == "CIO")  {
            var i = getWindowTr();
            var SQLWindowString = "SQLWindow" + i;
            //saveDivValue("SQLWindow",SQLWindowString, getWindowType(), i);
            initWindwoListButton(introws);
        }

	}
}

//得到已按下窗口的TR
function getWindowTr() {
	//得到已有表格对象
	var tableObject=document.getElementById("windowListBar");

	//判断已经存在的行的最大值
	var introws = tableObject.rows.length;

	for (var i = 0; i < introws; i++) {
		var windowlistcell = document.getElementById('windowListBar').rows[i].cells;
		if (windowlistcell[0].getValue()) {
				return i;
		}
	}
	return -1;
}

//得到已按下窗口的类型，首先取得按下窗口的TR的rowid
function getWindowType() {
	var i = getWindowTr();
	var returnStr="";
	if (i > -1) {
		var windowlistcell = document.getElementById('windowListBar').rows[i].cells;
		returnStr = $(windowlistcell[0]).get('id').trim().substr(0,3);
	}
	return returnStr;
}

//初始化一个windowList
function initWindwoListButton(rowid) {
	var windowlistcell = document.getElementById('windowListBar').rows[rowid].cells;

	var rowlength = document.getElementById('windowListBar').rows.length;
	for(var j = 0; j < rowlength; j++) {
		var celltmp = document.getElementById('windowListBar').rows[j].cells;
		for( var k = 0; k < celltmp.length; k++) {
			createButton(celltmp[k]);
			celltmp[k].setAlwaysUp(true);
			celltmp[k].setValue(false, false);
			//alert(celltmp[k]);
		}
	}

	for (var i = 0; i < windowlistcell.length; i++)
	{
			createButton(windowlistcell[i]);
			windowlistcell[i].setAlwaysUp(true);
			windowlistcell[i].setToggle(true);
	 		windowlistcell[i].setValue(true, true);
	}



}

//功能：保存旧SQL窗口内容，并新建SQL窗口，并在windowlistFrame中显示
//创建每个SQL窗口时，会调到此函数
function createNewSql(windowType, textareaname) {
	//先要保存原始的div中的数据
	//得到输入框中的所有文本，以下div的name都已写固定
	//var getText = parent.editorFrame.$('myTextarea').get('html');
	//var getExecValue = parent.editorFrame.$('outResultDiv').get('html');
	//var getChangeExecValue = parent.editorFrame.$('changeOutResultDiv').get('html');
	// console.log("click.this.createNewSql");

	var f =  false;
	// 是否为查看
	textareaname.search('View.jsp') > 0 ? f = false :
		textareaname.search('Edit.jsp') > 0 ? f = true :
			textareaname.search('New.jsp') > 0 ? f = true : f = false ;



	// var prevWindowType = getWindowType();
	setIsNotCreate(false);

	if (windowType == "SQL" ) {
		//创建windowlist工具条
		parent.parent.leftFrameList.createWindowList(windowType, "new", f);

		clearSQLWindow(windowType);

	} else if (windowType == "FUN" || windowType == "PRO" || windowType == "PAC"
					|| windowType == "PAB" || windowType == "TYP" || windowType == "TYB"
					|| windowType == "TRI" || windowType == "JAV" || windowType == "VIE"
					|| windowType == "VIM" || windowType == "TAB") {

	    this.url = textareaname;
		//创建windowlist工具条
		parent.parent.leftFrameList.createWindowList(windowType, this.url, f);
		//更改右边工作区的内容
        clearOtherWindow(windowType, this.url);


	} else if (windowType == "JAVA" ) {

		//创建windowlist工具条
		parent.parent.leftFrameList.createWindowList(windowType, "new", f);

	} else if (windowType == "CSQ") {

		this.url = textareaname;
		//创建windowlist工具条
		parent.parent.leftFrameList.createWindowList(windowType, this.url, f);
		//更改右边工作区的内容
		clearSQLWindow(windowType);
	} else if (windowType == "EPL") {
	    this.url = textareaname;
        //创建windowlist工具条
	    parent.parent.leftFrameList.createWindowList(windowType, this.url, f);
        //更改右边工作区的内容
	    clearSQLWindow(windowType);

    } else if (windowType == "CIO") {
        this.url = textareaname;
        //创建windowlist工具条
        parent.parent.leftFrameList.createWindowList(windowType, this.url, f);
        //更改右边工作区的内容，并加载定义的页面 jsp 文件
        clearSQLWindow(windowType);

    }
}

// 每次实时切换窗口，实际上是保存上一行的内容，并且切换到当前行
// 已弃用, 采用 doRadioNew  2020-09-23
function doRadio(_trType, _prevTrType, _trRow) {
		var sameWindowFlag = false;
		//alert(_trType);
		//得到当前已按行的trRow
		var i = getWindowTr();
		var SQLWindowString = "SQLWindow" + i;
		//每次都得保存原窗口内容
		saveDivValue("SQLWindow",SQLWindowString, _prevTrType, i);
		//调用恢复窗口内容的函数,_trRow为被点击行的trRow
		if( _trType != _prevTrType ) {
			//不同窗口，统一置为false
			parent.editorFrame.globalOnLoadFlag = false;
			//如果上一个窗口与当前窗口类型不一致，则需要重新加载
			//并且按照当前点击窗口的类型，加截不同的页面
			//先设置一下全局变量
			setGlobal(_trType, _trRow, sameWindowFlag);
			//不是从新建窗口进入的
			setIsNotCreate(true);
			if(_trType == "SQL") {
				parent.parent.editorFrame.location.replace(sqlURL);
			} else if (_trType == "FUN" || _trType == "PRO" || _trType == "PAC"
					|| _trType == "PAB" || _trType == "TYP" || _trType == "TYB"
					|| _trType == "TRI" || _trType == "JAV" || _trType == "VIE"
					|| _trType == "VIM" || _trType == "TAB") {
				//alert(funURL);
				parent.parent.editorFrame.location.replace(funURL);
			} else if (_trType == "JAVA") {
				parent.parent.editorFrame.location.replace(funURL);
			}
			sameWindowFlag = false;
			//restoreDivValue(_trType, _trRow, sameWindowFlag);
		} else {
			//如果窗口类型相同，则直接赋值
			sameWindowFlag = true;
			restoreDivValue(_trType, _trRow, sameWindowFlag);
		}

	//得到当前行的所有列
	var windowlistcell = document.getElementById('windowListBar').rows[_trRow].cells;
	//设置除了本行外所有行的列为按钮按起状态
	var rowlength = document.getElementById('windowListBar').rows.length;
	for(var j = 0; j < rowlength; j++) {
		var celltmp = document.getElementById('windowListBar').rows[j].cells;
		for( var k = 0; k < celltmp.length; k++) {
			createButton(celltmp[k]);
			celltmp[k].setAlwaysUp(true);
			celltmp[k].setValue(false, false);
			//alert(celltmp[k]);
		}
	}

	for (var i = 0; i < windowlistcell.length; i++) {
			windowlistcell[i].setAlwaysUp(true);
			windowlistcell[i].setToggle(true);
			windowlistcell[i].setValue(true,true);
		}
	//parent.parent.editorFrame.location.replace("./editor.jsp");
}

//每次实时切换窗口，实际上是切换DIV隐藏和显示  2020-09-23
function doRadioNew(_trType, _prevTrType, _trRow) {
    var sameWindowFlag = false;
    //alert(_trType);
    //得到当前已按行的trRow
    var i = getWindowTr();
    var SQLWindowString = "SQLWindow" + i;



    parent.leftFrameList.GTDID = parent.leftFrameList.GWINDOWLIST[_trRow][1];

    GTDID = parent.leftFrameList.GTDID;
    parent.editorFrame.GGETFRAME = parent.editorFrame.document.getElementById("if_SQLWindow_" + parent.leftFrameList.GTDID).contentWindow;

    GGETFRAME = parent.editorFrame.GGETFRAME;


    //调用恢复窗口内容的函数,_trRow为被点击行的trRow

        //不同窗口，统一置为false
        parent.editorFrame.globalOnLoadFlag = false;
        //如果上一个窗口与当前窗口类型不一致，则需要重新加载
        //并且按照当前点击窗口的类型，加截不同的页面
        //先设置一下全局变量
        setGlobal(_trType, _trRow, sameWindowFlag);
        //不是从新建窗口进入的
        setIsNotCreate(true);

        sameWindowFlag = false;
        restoreDivValue(_trType, _trRow, sameWindowFlag);

        //如果窗口类型相同，则直接赋值
        // restoreDivValue(_trType, _trRow, sameWindowFlag);


    //得到当前行的所有列
    var windowlistcell = document.getElementById('windowListBar').rows[_trRow].cells;
    //设置除了本行外所有行的列为按钮按起状态
    var rowlength = document.getElementById('windowListBar').rows.length;
    for(var j = 0; j < rowlength; j++) {
        var celltmp = document.getElementById('windowListBar').rows[j].cells;
        for( var k = 0; k < celltmp.length; k++) {
            createButton(celltmp[k]);
            celltmp[k].setAlwaysUp(true);
            celltmp[k].setValue(false, false);
            //alert(celltmp[k]);
        }
    }

    for (var i = 0; i < windowlistcell.length; i++) {
        windowlistcell[i].setAlwaysUp(true);
        windowlistcell[i].setToggle(true);
        windowlistcell[i].setValue(true,true);
    }
    //parent.parent.editorFrame.location.replace("./editor.jsp");

	setNavigateButton(_trRow, rowlength);


}


function windowListTdOnclick(trType, e) {
    var e = e || window.event;
    var target = e.target || e.srcElement;

    var trRow = target.parentNode.rowIndex;
    if (typeof (trRow) == "undefined") {
        trRow = target.parentNode.parentNode.rowIndex;
    }
	// alert(trRow);
	var windowlistcell = parent.leftFrameList.document.getElementById('windowListBar').rows[trRow].cells;

	//只取窗口类型的前三位 *********
	tmpWindowtype = $(windowlistcell[0]).get('id').trim().substr(0,3);

	//alert("tmpWindowtype:"+tmpWindowtype);
	//alert("trType:"+trType);
	//alert("getwin:"+getWindowType());
	//alert(windowlistcell[0].getValue());
	//如果按钮是未按下状态
	if (!windowlistcell[0].getValue()) {
		//则执行一系列动作
		//doRadio(tmpWindowtype,getWindowType(),trRow);
		//采用新的切换功能
        doRadioNew(tmpWindowtype,getWindowType(),trRow);

    }
}


//新建SQLWindow时，调用此函数
function clearSQLWindow(windowType) {
	//清空编辑输入区--SQL窗口
	// createNew('myTextarea');  换成 editAreaLoader.setValue("example_1", "new_value");
	//editAreaLoader.setValue("myTextarea", "");

	//清空输出结果区--SQL窗口
	if (windowType == "SQL") {
		//parent.editorFrame.$('outResultDiv').set('text','');   2020-09-16
		//parent.editorFrame.$('changeOutResultDiv').set('text','');    2020-09-16
		var url = "../editor/SqlWindow/New.jsp";
        parent.editorFrame.createSqlForColorText(parent.leftFrameList.GTDID, url);

        parent.editorFrame.GGETFRAME = parent.editorFrame.document.getElementById("if_SQLWindow_" + parent.leftFrameList.GTDID).contentWindow;

        GGETFRAME = parent.editorFrame.GGETFRAME;

        //按钮恢复成初始状态
		// controlbuttonReset();
		//清除结果集后，需重新设置工作结果区的工具条状态
		resetBaseWorkToolBar(false);

	} else if (windowType == "FUN" || windowType == "PRO" || windowType == "PAC"
        || windowType == "PAB" || windowType == "TYP" || windowType == "TYB"
        || windowType == "TRI" || windowType == "JAV" || windowType == "VIE"
        || windowType == "VIM" || windowType == "TAB") {

        parent.editorFrame.createSqlForColorText(parent.leftFrameList.GTDID, url);
        parent.editorFrame.GGETFRAME = parent.editorFrame.document.getElementById("if_SQLWindow_" + parent.leftFrameList.GTDID).contentWindow;

        GGETFRAME = parent.editorFrame.GGETFRAME;

        //按钮恢复成初始状态
        // controlbuttonReset();
        //清除结果集后，需重新设置工作结果区的工具条状态
        resetBaseWorkToolBar(false);

    } else if (windowType == "CSQ") {
		var url = "../editor/CommandWindow/CommandNew.jsp";
		parent.editorFrame.createSqlForColorText(parent.leftFrameList.GTDID, url);
		parent.editorFrame.GGETFRAME = parent.editorFrame.document.getElementById("if_SQLWindow_" + parent.leftFrameList.GTDID).contentWindow;

		GGETFRAME = parent.editorFrame.GGETFRAME;
		// resetBaseWorkToolBar(false);

	} else if (windowType == "EPL") {
        var url = "../editor/ExplainPlanWindow/View.jsp";
        parent.editorFrame.createSqlForColorText(parent.leftFrameList.GTDID, url);
        parent.editorFrame.GGETFRAME = parent.editorFrame.document.getElementById("if_SQLWindow_" + parent.leftFrameList.GTDID).contentWindow;

        GGETFRAME = parent.editorFrame.GGETFRAME;
        // resetBaseWorkToolBar(false);

    } else if (windowType == "CIO") {
        var url = "../editor/CompileInvalidWindow/View.jsp";
        parent.editorFrame.createSqlForColorText(parent.leftFrameList.GTDID, url);
        parent.editorFrame.GGETFRAME = parent.editorFrame.document.getElementById("if_SQLWindow_" + parent.leftFrameList.GTDID).contentWindow;

        GGETFRAME = parent.editorFrame.GGETFRAME;
        // resetBaseWorkToolBar(false);

    }

	//状态栏初始为空
	//setFootView(9999, '　');

}




function clearOtherWindow(windowtype,url) {
    //清空编辑输入区--SQL窗口
    // createNew('myTextarea');  换成 editAreaLoader.setValue("example_1", "new_value");
    //editAreaLoader.setValue("myTextarea", "");


        parent.editorFrame.createSqlForColorText(parent.leftFrameList.GTDID, url);
        parent.editorFrame.GGETFRAME = parent.editorFrame.document.getElementById("if_SQLWindow_" + parent.leftFrameList.GTDID).contentWindow;

        GGETFRAME = parent.editorFrame.GGETFRAME;

        //按钮恢复成初始状态
        // controlbuttonReset();
        //清除结果集后，需重新设置工作结果区的工具条状态
        resetBaseWorkToolBar(false);



    //状态栏初始为空
    //setFootView(9999, '　');

}

// 保存原先的DIV内容，有bug,如果按了工具条的按钮，按钮的效果将会在新窗口中体现
// 而工具条一旦被克隆，则所有JS及CSS失效，待解决！！！
// V2.0.0 后不再使用
function saveDivValue(DivSource, DivDest, windowType, trRow) {
	//复制元素并复制下所有的事件
	//var divObject = parent.parent.editorFrame.$(DivSource);
	// $(DivDest).append(divObject.clone(true));
	//alert(divObject.get('html'));

	//此处为接口，可为多个窗口类型
	if (windowType == "SQL") {
		// var destMyTextarea = "myTextarea" + trRow;
		var destOutResultDiv = "outResultDiv" + trRow;
		var destChangeOutResultDiv = "changeOutResultDiv" + trRow;
		var destFootview = "footview" + trRow;
		//更改一下每个DIV中的ID，不然ID会重复

		// 这个地方先不要换ID
		// $('myTextarea').set('id',destMyTextarea);
		// $('outResultDiv').set('id',destOutResultDiv);
		// $('changeOutResultDiv').set('id',destChangeOutResultDiv);
		// $('footview').set('id',destFootview);
		//alert($(destMyTextarea).get('id'));
	} else if (windowType == "JAVA") {
		var destMyTextarea = "myTextarea" + trRow;
		var destProTitle = "objTitle" + trRow;
		//更改一下每个DIV中的ID，不然ID会重复
		$('myTextarea').set('id',destMyTextarea);
		$('proTitle').set('id',destProTitle);
		//alert($(destMyTextarea).get('id'));
	}

	//alert($('hiddenDiv').get('text'));
}


//恢复对应窗口的内容
function restoreDivValue(windowType, trRow, sameWindow) {
	if (windowType == "SQL") {

        var destMyTextarea = "myTextarea" + trRow;
		var destOutResultDiv = "outResultDiv" + trRow;
		var destChangeOutResultDiv = "changeOutResultDiv" + trRow;
		var destFootview = "footview" + trRow;
		//恢复编辑区内容--SQL窗口
		//alert(parent.leftFrameList.$('SQLWindow0').get('html'));

		//parent.editorFrame.$('myTextarea').set('html',$(destMyTextarea).get('html'));

        for ( i = 0; i < GMIXWINDOWS ; i++ ) {
                parent.parent.editorFrame.$('#SQLWindow_'+ 'n' + i ).css("display","none");
        }
        parent.parent.editorFrame.$('#SQLWindow_'+ parent.parent.leftFrameList.GWINDOWLIST[trRow][1] ).css("display","inline");

        // 恢复 editortoolbar
        setEditortoolbarReset();

	} else if (windowType == "FUN" || windowType == "PRO" || windowType == "PAC"
					|| windowType == "PAB" || windowType == "TYP" || windowType == "TYB"
					|| windowType == "TRI" || windowType == "JAV" || windowType == "VIE"
					|| windowType == "VIM" || windowType == "TAB" || windowType == "CSQ"
                    || windowType == "EPL"  ) {
		var destMyTextarea = "myTextarea" + trRow;
		var destobjTitle = "objTitle" + trRow;
		var desttmpImg = "tmpImg" + trRow;
		var destobjIcoId = "objIcoId" + trRow;
		var destFootview = "footview" + trRow;
		var SQLWindowobj = 'SQLWindow' + trRow;
		//alert("h:" + parent.leftFrameList.$(SQLWindowobj).get('html'));
		//alert(parent.leftFrameList.$(destobjIcoId).get('src').substr(parent.leftFrameList.$(destobjIcoId).get('src').lastIndexOf("/")));



            for (i = 0; i < GMIXWINDOWS; i++) {
                parent.parent.editorFrame.$('#SQLWindow_' + 'n' + i).css("display", "none");
            }
            parent.parent.editorFrame.$('#SQLWindow_' + parent.parent.leftFrameList.GWINDOWLIST[trRow][1]).css("display", "inline");
        // 恢复 editortoolbar
        setEditortoolbarReset();

	} else if (windowType == "JAVA") {
		var destMyTextarea = "myTextarea" + trRow;
		//alert(destMyTextarea);
		parent.editorFrame.$('myTextarea').set('html',$(destMyTextarea).get('html'));
	} else if (windowType == "CIO") {

        for (i = 0; i < GMIXWINDOWS; i++) {
            parent.parent.editorFrame.$('#SQLWindow_' + 'n' + i).css("display", "none");
        }
        parent.parent.editorFrame.$('#SQLWindow_' + parent.parent.leftFrameList.GWINDOWLIST[trRow][1]).css("display", "inline");

        // 重置 editortoolbar 按钮状态 -- for compile invalid objects
        setEditortoolbarForCIO();
    }

}

//更改windowList的提示语
function changeWindowListTitle(windowType,trRow,titleStr) {
    trRow = parent.parent.leftFrameList.GWINDOWLIST[trRow][1].substring(1);
	var spanListVauleId = "WindowListValue" + trRow;
	var imgListVauleId = "columnButton" + trRow;
	var initStr = "";
	var tmpStr = "";
	var imgIcon = "../images/windowlist_running.gif";
	var maxLength = 36; //设置左边工具条最大显示的字符数
	var maxAltLength = 200; //设置鼠标放在上面提示的最大字符数
	var eplimg = "../images/view_table_e_r.png";
	var cioimg = "../images/compile_invalid_object_r.png";


	if(windowType == "SQL") {
		initStr = "SQL Window - ";
		tmpStr = initStr + titleStr;
		tmpStrA = initStr + titleStr;
	} else if (windowType == "CSQ") {
        initStr = "Command Window - ";
        tmpStr = initStr + titleStr;
        tmpStrA = initStr + titleStr;
    } else if (windowType == "EPL") {
        initStr = "Explain Plan Window - ";
        tmpStr = initStr + titleStr;
        tmpStrA = initStr + titleStr;
        imgIcon = eplimg;
    } else if (windowType == "CIO") {
        initStr = "Compile Invalid Objects";
        tmpStr = initStr + titleStr;
        tmpStrA = initStr + titleStr;
        imgIcon = cioimg;
    } else if (windowType == "FUN" || windowType == "PRO" || windowType == "PAC"
					|| windowType == "PAB" || windowType == "TYP" || windowType == "TYB"
					|| windowType == "TRI" || windowType == "JAV" || windowType == "VIE"
					|| windowType == "VIM" || windowType == "TAB") {
		strTmp = "";
		if  (windowType == "FUN") {
			strTmp = "function ";
		} else if (windowType == "PRO") {
			strTmp = "procedure ";
		} else if (windowType == "PAC") {
			strTmp = "package ";
		} else if (windowType == "PAB") {
			strTmp = "package body ";
		} else if (windowType == "TYP") {
			strTmp = "type ";
		} else if (windowType == "TYB") {
			strTmp = "type body ";
		} else if (windowType == "TRI") {
			strTmp = "trigger ";
		} else if (windowType == "JAV") {
			strTmp = "java source ";
		} else if (windowType == "VIE" || windowType == "VIM") {
			strTmp = "New";
		}  else if (windowType == "TAB") {
			strTmp = "table";
		}
		if (windowType == "VIE" || windowType == "VIM") {
			initStr = "SQL Window - " + strTmp;
			tmpStr = initStr + titleStr;
			tmpStrA = initStr + titleStr;

		} else if (windowType == "TAB"){
			initStr = "View" + strTmp;
			tmpStr = initStr + titleStr;
			tmpStrA = initStr + titleStr;

		} else {
			var tmpv = "";
			var eFlagStr = "";
			if (windowType == "FUN" || windowType == "PRO" || windowType == "PAC"
				|| windowType == "PAB" || windowType == "TYP" || windowType == "TYB"
                || windowType == "TRI") {
				tmpv = titleStr.split('(')[0].trim().split(' ');
                eFlagStr = parent.parent.parent.editorFrame.GGETFRAME.document.getElementById('frame_myTextarea').contentWindow.editArea.is_editable;
            }
			// tmpv = titleStr.split('(')[0].trim().split(' ');
			tmpv = tmpv[tmpv.length-1];
            eFlagStr == true ? eFlagStr = "Edit" : eFlagStr = "View";
			initStr = "Program Window - " + eFlagStr + " source of " + strTmp + tmpv;
			tmpStr = initStr;
			tmpStrA = initStr;


		}
	}

	titleTmp = "";


	if(tmpStr.length > maxLength) {
		tmpStr = tmpStr.substr(0, maxLength) + " ... ";
	}

	if(tmpStrA.length > maxAltLength) {
		tmpStrA = tmpStr.substr(0, maxAltLength) + " ... ";
	}

	$(spanListVauleId).set('text', tmpStr);
	$(spanListVauleId).set('title', tmpStrA);
	$(spanListVauleId).set('alt', tmpStrA);
	$(imgListVauleId).set('src', imgIcon);

}

//恢复当前windowList窗口的图片
function restoreWindowListImg(trRow) {
    trRow = parent.parent.leftFrameList.GWINDOWLIST[trRow][1].substring(1);

    var imgListVauleId = "columnButton" + trRow;
	var imgIcon = "../images/no_saved.gif";

	var tmpCurrWindowType = parent.parent.leftFrameList.getWindowType();

	if (tmpCurrWindowType == "FUN" ||	tmpCurrWindowType == "PRO" || tmpCurrWindowType == "PAC"
	|| tmpCurrWindowType == "PAB" || tmpCurrWindowType == "TYP" || tmpCurrWindowType == "TYB"
	|| tmpCurrWindowType == "TRI" || tmpCurrWindowType == "JAV" ) {
		imgIcon = "../images/no_fun_saved.gif";
	} else if (tmpCurrWindowType == "EPL") {
        imgIcon = "../images/view_table.png";
    } else if (tmpCurrWindowType == "CIO") {
        imgIcon = "../images/compile_invalid_object.png";
    }

    $(imgListVauleId) == null ?  parent.parent.leftFrameList.document.getElementById(imgListVauleId).src = imgIcon : $(imgListVauleId).set('src', imgIcon);

}

//睡眠函数：毫秒
function sleep(millisec) {
	var dt_old = new Date();
	for (;;) {
		var dt_new = new Date();
		if ( (dt_new.getTime() - dt_old.getTime()) >= millisec ) break;
	}
}


//设置是否新建窗口标志
function setIsNotCreate(flag) {
	parent.leftFrameList.globalIsNotCreate = flag;
}

//页面载入后的初始化函数
function initOnload() {
	//如果不是新建的窗口，则调用恢复内容的函数


    if (typeof(parent.parent.leftFrameList.globalIsNotCreate) == 'undefined') {
        if(globalIsNotCreate) {
            restoreDivValue(globalTrType, globalTrRow, globalSameWindowFlag);
        }
    }
	else if (parent.parent.leftFrameList.globalIsNotCreate) {
		//alert(parent.leftFrameList.globalTrType);
		//alert(parent.leftFrameList.globalTrRow);
		//alert(parent.leftFrameList.globalSameWindowFlag);
		parent.parent.leftFrameList.restoreDivValue(parent.parent.leftFrameList.globalTrType, parent.parent.leftFrameList.globalTrRow, parent.parent.leftFrameList.globalSameWindowFlag);
	}
}

//设置全局变量，当前窗口类型及当前行
function setGlobal(trType, trRow, WindowFlag) {
    parent.parent.leftFrameList.globalTrType = trType;
    parent.parent.leftFrameList.globalTrRow = trRow;
    parent.parent.leftFrameList.globalSameWindowFlag = WindowFlag;
}

//删除一个window list
function deleteWindowList() {
	//得到当前已按下的window list
	var currTrRown = parent.leftFrameList.getWindowTr();
	var currWindowFlag = parent.leftFrameList.getWindowType();

	//得到已有表格对象
	var tableObject=parent.leftFrameList.document.getElementById("windowListBar");

	//判断已经存在的行的最大值
	var introws = tableObject.rows.length;

	if (introws == 1 ) {
		//最后一个弹出提示，不可以删除
		parent.parent.editorFrame.dhtmlx.alert({
			type:"alert-warning",
			top: dAlertTop,
			text:"Do not delete last window!"
		});
	} else {
		//清空leftFrameList中当前的div值
		parent.leftFrameList.deleteWindowListDiv(currTrRown);

		//开始删除当前行
		tableObject.deleteRow(currTrRown);

		var currRow = currTrRown;
		//eftFrameList其他div值依次调整，并且返回最大的TrRow
		var maxRow = parent.leftFrameList.adjustmentWindowListDiv(currRow);

		//如果最大行大于0，则减1
		if (maxRow > 0)	maxRow--;

		//当前最大的row设为活动窗口
		parent.leftFrameList.setRowWindowList(maxRow);

		//恢复右边工作区数据
		parent.leftFrameList.recoverPage_New(parent.leftFrameList.getWindowType(), currRow, false);


		//当前窗口内容清空
        parent.parent.editorFrame.$('#SQLWindow_'+ parent.leftFrameList.GWINDOWLIST[currRow][1] ).html('');

        // 隐藏右边编辑区
        parent.parent.editorFrame.$('#SQLWindow_'+ parent.leftFrameList.GWINDOWLIST[currRow][1] ).css("display","none");
        //从全局数组变量中删除当前对应数据
        parent.parent.leftFrameList.GWINDOWLIST.splice(currRow,1);



        // 当前Tr最大值设为活动窗口
        parent.leftFrameList.GTDID = parent.leftFrameList.GWINDOWLIST[maxRow][1];
        // 显示右边编辑区
        parent.parent.editorFrame.$('#SQLWindow_'+ parent.leftFrameList.GWINDOWLIST[maxRow][1] ).css("display","inline");


        GTDID = parent.leftFrameList.GTDID;
        parent.editorFrame.GGETFRAME = parent.editorFrame.document.getElementById("if_SQLWindow_" + parent.leftFrameList.GTDID).contentWindow;

        GGETFRAME = parent.editorFrame.GGETFRAME;

        (parent.parent.leftFrameList.getWindowType() == 'CIO') ? setEditortoolbarForCIO() : setEditortoolbarReset();


	}
}

//删除当前活动窗口的div中的值
function deleteWindowListDiv(currTrRown) {
	var windowDiv = "SQLWindow" + currTrRown;
	parent.leftFrameList.$(windowDiv).set('html','');
}

//依次调整各个DIV的值 2020-10-02 修改为恢复各种状态，现无须依次调整各个DIV值
function adjustmentWindowListDiv(trRow) {
	//首先得到当前活动窗口的trRow
	var currTrRown = trRow;

	//得到已有表格对象
	var tableObject=parent.leftFrameList.document.getElementById("windowListBar");

	//判断已经存在的行的最大值
	var maxrows = tableObject.rows.length;
	var maxRow = maxrows;

    //当前窗口设置为不可见
    //parent.parent.editorFrame.$('#SQLWindow_'+ parent.leftFrameList.GWINDOWLIST[currTrRown][1] ).css("display","none");

    //已存在行的最大值对应的窗口设置为可见
    //if (maxRow > 0)	maxRow--;
    //parent.parent.editorFrame.$('#SQLWindow_'+ parent.leftFrameList.GWINDOWLIST[maxRow][1] ).css("display","inline");



    for (i = currTrRown + 1; i <= maxrows ; i++) {

		var old = i - 1;
		//得到前一个窗口的div的ID
		var oldWindowDiv = "SQLWindow" + old;
		//得到被删除窗口的下一个窗口的div的	ID
		var windowDiv = "SQLWindow" + i;


		//重新把每个tr中的ID改过来
		var windowlistcell = document.getElementById('windowListBar').rows[old].cells;

		tmplength = $(windowlistcell[0]).get('id').length;
		tmpTdId = $(windowlistcell[0]).get('id').trim().substr(0,tmplength-1);
		tmpWindowtype = $(windowlistcell[0]).get('id').trim().substr(0,3);


		//为各个不同窗口类型更改ID，可为多种窗口类型
		if (tmpWindowtype == "SQL") {
			var destMyTextarea = "myTextarea" + i;
			var destOutResultDiv = "outResultDiv" + i;
			var destChangeOutResultDiv = "changeOutResultDiv" + i;
			var destFootview = "footview" + i;

			var oldMyTextarea = "myTextarea" + old;
			var oldOutResultDiv = "outResultDiv" + old;
			var oldChangeOutResultDiv = "changeOutResultDiv" + old;
			var oldFootview = "footview" + old;

			//更改一下每个DIV中的ID，不然ID会重复  于 2020-09-24 被注释
			// parent.leftFrameList.$(destMyTextarea).set('id',oldMyTextarea);
			// parent.leftFrameList.$(destOutResultDiv).set('id',oldOutResultDiv);
			// parent.leftFrameList.$(destChangeOutResultDiv).set('id',oldChangeOutResultDiv);
			// parent.leftFrameList.$(destFootview).set('id',oldFootview);

		} else if (tmpWindowtype == "FUN" || tmpWindowtype == "PRO" || tmpWindowtype == "PAC"
					|| tmpWindowtype == "PAB" || tmpWindowtype == "TYP" || tmpWindowtype == "TYB"
					|| tmpWindowtype == "TRI" || tmpWindowtype == "JAV" || tmpWindowtype == "VIE"
					|| tmpWindowtype == "VIM" || tmpWindowtype == "TAB") {
			var destMyTextarea = "myTextarea" + i;
			var destObjTitle = "objTitle" + i;
			var destObjIcoId = "objIcoId" + i;
			var destFootview = "footview" + i;

			var oldMyTextarea = "myTextarea" + old;
			var oldObjTitle = "objTitle" + old;
			var oldObjIcoId = "objIcoId" + old;
			var oldFootview = "footview" + old;
			//更改一下每个DIV中的ID，不然ID会重复
			// parent.leftFrameList.$(destMyTextarea).set('id',oldMyTextarea);
			// parent.leftFrameList.$(destObjTitle).set('id',oldObjTitle);
			// parent.leftFrameList.$(destObjIcoId).set('id',oldObjIcoId);
			// parent.leftFrameList.$(destFootview).set('id',oldFootview);

			//alert($(destMyTextarea).get('id'));
		} else if (tmpWindowtype == "JAVA") {
			var destMyTextarea = "myTextarea" + i;
			var oldMyTextarea = "myTextarea" + old;
			//更改一下每个DIV中的ID，不然ID会重复
			parent.leftFrameList.$(destMyTextarea).set('id',oldMyTextarea);
			//alert($(destMyTextarea).get('id'));
		}

		//依次把当前窗口的内容重新赋值给上一个窗口
		// parent.leftFrameList.$(oldWindowDiv).set('html',parent.leftFrameList.$(windowDiv).get('html'));
		// parent.leftFrameList.$(windowDiv).set('html','');


		var oldTdId = tmpTdId + old;
		var oldSpanId = "WindowListValue" + old;
		var oldImgId = "columnButton" + old;
		var newTdId = tmpTdId + i;
		var newSpanId = "WindowListValue" + i;
		var newImgId = "columnButton" + i;

		// 2020-09-27 start
		// parent.leftFrameList.$(newTdId).set('id',oldTdId);
		// parent.leftFrameList.$(newSpanId).set('id',oldSpanId);
		// parent.leftFrameList.$(newImgId).set('id',oldImgId);
		// windowlistcell[0].onclick = '';
		// windowlistcell[0].onclick = function () {
		// 	//alert(tmpWindowtype);
		// 	//不同Frame的onclick事件，参数tmpWindowtype此处没有被实时转换，估
		// 	//windowListTdOnclick函数已重写，参数tmpWindowtype已不用
		// windowListTdOnclick(tmpWindowtype,this.parentNode.rowIndex);
		// };
        // 2020-09-27 end


        //alert($(windowlistcell[0]).get('onclick'));

	}
	return maxrows;

}
//设置指定行的窗口为活动窗口
function setRowWindowList(Row) {
	//得到当前行的所有列
	var windowlistcell = parent.leftFrameList.document.getElementById('windowListBar').rows[Row].cells;
	//设置除了本行外所有行的列为按钮按起状态
	var rowlength = parent.leftFrameList.document.getElementById('windowListBar').rows.length;
	for(var j = 0; j < rowlength; j++) {
		var celltmp = parent.leftFrameList.document.getElementById('windowListBar').rows[j].cells;
		for( var k = 0; k < celltmp.length; k++) {
			createButton(celltmp[k]);
			celltmp[k].setAlwaysUp(true);
			celltmp[k].setValue(false, false);
		}
	}

	for (var i = 0; i < windowlistcell.length; i++) {
			windowlistcell[i].setAlwaysUp(true);
			windowlistcell[i].setToggle(true);
			windowlistcell[i].setValue(true,true);
		}
}

//恢复右边工作区页面中的数据，关闭前一个窗口时最后调用此函数
function recoverPage(_trType, _trRow, sameWindowFlag) {

	parent.editorFrame.globalOnLoadFlag = false;

	//alert(_trType);
	//alert(_trRow);
	//alert(sameWindowFlag);

	setGlobal(_trType, _trRow, sameWindowFlag);

	//如果上一个窗口与当前窗口类型不一致，则需要重新加载
	//并且按照当前点击窗口的类型，加截不同的页面
	//先设置一下全局变量
	setIsNotCreate(true);
	if(_trType == "SQL") {
		parent.parent.editorFrame.location.replace(sqlURL);
	} else if (_trType == "FUN" || _trType == "PRO" || _trType == "PAC"
					|| _trType == "PAB" || _trType == "TYP" || _trType == "TYB"
					|| _trType == "TRI" || _trType == "JAV" || _trType == "VIE"
					|| _trType == "VIM" || _trType == "TAB") {
		parent.parent.editorFrame.location.replace(funURL);
	} else if (_trType == "JAVA") {
		parent.parent.editorFrame.location.replace(funURL);
	}
	parent.leftFrameList.sameWindowFlag = false;
}

function recoverPage_New(_trType, _trRow, sameWindowFlag) {

    parent.editorFrame.globalOnLoadFlag = false;

    //alert(_trType);
    //alert(_trRow);
    //alert(sameWindowFlag);

    setGlobal(_trType, _trRow, sameWindowFlag);

    //如果上一个窗口与当前窗口类型不一致，则需要重新加载
    //并且按照当前点击窗口的类型，加截不同的页面
    //先设置一下全局变量
    setIsNotCreate(true);

    // if(_trType == "SQL") {
    //     parent.parent.editorFrame.location.replace(sqlURL);
    // } else if (_trType == "FUN" || _trType == "PRO" || _trType == "PAC"
    //     || _trType == "PAB" || _trType == "TYP" || _trType == "TYB"
    //     || _trType == "TRI" || _trType == "JAV" || _trType == "VIE"
    //     || _trType == "VIM" || _trType == "TAB") {
    //     parent.parent.editorFrame.location.replace(funURL);
    // } else if (_trType == "JAVA") {
    //     parent.parent.editorFrame.location.replace(funURL);
    // }


    parent.leftFrameList.sameWindowFlag = false;
}


//关闭窗口
function closeWindowList() {

	parent.parent.leftFrameList.deleteWindowList();

}

//改边关闭按钮样式，鼠标左键按下时调用此函数
function changeWindowListClassDown(imgId,evt) {
	var isie=document.all;
    var leftnum=isie?event.button:evt.which;
    if (leftnum == 1){        //IE or firefox
		imgPath = "../images/close_window_down.gif";
		$(imgId).setProperty('src',imgPath);
	}
}


//改边关闭按钮样式，鼠标左键恢复时调用此函数
function changeWindowListClassUp(imgId,evt) {
	var isie=document.all;
    var leftnum=isie?event.button:evt.which;
    if (leftnum == 1){        //IE or firefox
		imgPath = "../images/close_window.gif";
		$(imgId).setProperty('src',imgPath);
	}
}

//关闭左则Window List
function closeWindow(imgId,evt) {

	//关闭当前窗口
	closeWindowList();
	//最后恢复按钮样式
	changeWindowListClassUp(imgId,evt);
}

function execQueryObjData(textareaname,objname) {
	var texttmp = "select * from " + objname + " t";
	parent.parent.leftFrameList.createNewSql('SQL','myTextarea');
	parent.parent.editorFrame.setDivValueText (textareaname,texttmp);
	setTimeout(function() {
	    // 等待 editarea 初始化完成
        parent.parent.editorToolFrame.executeRun(textareaname);
    },500);

}

function execQueryTable(textareaname, tablename) {
	var texttmp = "select * from " + tablename + " t";
	parent.parent.editorToolFrame.createNewSql('SQL','myTextarea');
	parent.parent.editorFrame.setDivValueText (textareaname,texttmp);
    setTimeout(function() {
        // 等待 editarea 初始化完成
        parent.parent.editorToolFrame.executeRun(textareaname);
    },500);
}

function getUserObject(data) {
	UserObject = data;
	//alert(UserObject[1][0]);
}

// 本函数由 edit_area_full.js 中的 keyDown 函数中调用
// 返回值 e.returnValue   true: 原调用函数继续执行   false: 原调用函数直接退出
// 自动补全功能的入口  2020-11-1 by phanrider
function keyDownInterface(e) {

	var s = '';
	var titleUserObject = parent.parent.parent.topFrame.UserObject;
	var autoUl = document.getElementById("auto_ul");
	var regE = RegExp('^' + "", "i");
	var autoCompletionObj = document.getElementById("autoCompletion");
    var tmpstr = parent.parent.parent.editorFrame.GGETFRAME.document.getElementById('frame_myTextarea').contentWindow.editArea;
    var commandEditorObj = parent.parent.parent.editorFrame.GGETFRAME.document.getElementsByName('myTextarea_command_editor');
    var currstr = tmpstr.last_selection.curr_line;
    var currstrpos = tmpstr.last_selection.curr_pos;
    var currline = tmpstr.last_selection.line_start;
    var stmp = [];
    var s_after = '';
    var s_before = '';
    var gs_after = '';
    var titlegrid = '';
    var currentA = 0;
    var aArray = [];
    var autoElemCss={ focus:{'color':'#fff','background':'#0078d7', '-moz-outline-style': 'none', 'outline': 'none' }, blur:{'color':'#000','background':'#fff'} };
    var startX = 45;
    var startY = 0;
    var cNumHeight = 16;
    var cNumWidth = 7.35;
	// textarea 滚动计算
	var tclientHeight = tmpstr.result.clientHeight;  // 当前可视域的高度
	var tScrollTop = tmpstr.result.scrollTop;	// 滚动了多少px
	var tScrollHeight = tmpstr.result.scrollHeight; // 当前 textarea 最大高度，含不可见视域
	var tHeight = 15;  // 行高
	var tScrollRow = Math.round(tScrollTop / tHeight);
	var tabPageHeight = 23; // command 窗口 tab title padding 高度 23px
	currline =  currline - tScrollRow;

    // 测试数据
    // titleUserObject = [['abc','table'],['abcd','table'],['abce','view'],['bbcc','table']];

    if ( commandEditorObj.length > 0 ) startY = tabPageHeight;

	GtitleShowFlag = parent.parent.parent.editorFrame.GGETFRAME.GtitleShowFlag;

    // 大写转小写
	for( var i = 0; i < titleUserObject.length; i++ ){
		titleUserObject[i][0] = titleUserObject[i][0].toLowerCase();
		titleUserObject[i][1] = titleUserObject[i][1].toLowerCase();
	}

    if ( e.keyCode == 9 || e.keyCode == 27 || e.keyCode == 38 || e.keyCode == 40 || e.keyCode == 13 || e.keyCode == 119 || e.keyCode == 120 || e.keyCode == 121 || e.keyCode == 122 ) {
        getTmpStr();
    } else {
        setTimeout(getTmpStr,50);
    }


	function getTmpStr() {
        currstr = tmpstr.last_selection.curr_line;
        currstrpos = tmpstr.last_selection.curr_pos;
		s_before = currstr.substr(currstrpos-2, 1);
		s_after = currstr.substr(currstrpos-1, 1);
		stmp = currstr.substr(0, currstrpos-1).trim().split(" ");
		if ((s_after == "" || s_after == " ") && e.keyCode != 32 && s_before != " " ) {
			s = stmp[stmp.length - 1].trim();
			// s = s.replaceAll('\$', '\\$');
            s = s.replace(/(\.|\?|\*|\+|\\|\(|\)|\[|\]|\}|\{|\$|\^|\|)/g, "\\$1");
			if ( e.keyCode != 38 && e.keyCode != 40 && e.keyCode != 13  && e.keyCode != 16  && e.keyCode != 17 && e.keyCode != 18 && e.keyCode != 19  ) {
				if (e.keyCode >= 112 && e.keyCode <= 123) {
                    clearAutoCompletion();
                    return e;
				} else {
					// 当前输入超过 2 个字符才开始提示
					if ( s != "*" && s.length > 2) {
						regE = RegExp('^' + s, "i");
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
					autoCompletionObj.getElementsByTagName('a')[1].focus();
				} else {
					tmpstr.focus();
				}
				e.returnValue = false;
			}
			// up key
			else if ( e.keyCode == 38 ) {

				if(autoCompletionObj.style.display == ""){
					aClear(0);
					autoCompletionObj.getElementsByTagName('a')[autoCompletionObj.getElementsByTagName('a').length-1].focus();
				}else{     //如果“提示”列表未显示,则把焦点依旧留在文本框中
					tmpstr.focus();
				}
				e.returnValue = false;
			}
			// tab key
			else if ( e.keyCode == 9 ) {
				clearAutoCompletion();
				e.returnValue = false;

			} else if ( e.keyCode == 27  || e.keyCode == 8 || e.keyCode== 32 ) {  // ESC or F8 - F12
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

            //创建 table 中的提示内容
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
				tmpTopHeight < 0 ? tmpTopHeight = cNumHeight : tmpTopHeight;
                tmpTopHeight += startY;
            	autoCompletionObj.style.left = startX + (currstrpos - 1)* cNumWidth + "px";
				autoCompletionObj.style.top = tmpTopHeight + "px";
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

        tmpstr.focus();


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

        tmpstr.focus();
	}

    // 在当前光标位置插入关键词的后几个字符串（按键或当前 A 标签点击）
	function replaceCurrPostionStr(rstr) {
        gs_after = rstr.substr(s.length);
        parent.parent.parent.editorFrame.GGETFRAME.editAreaLoader.insertTags(gMyTextArea, gs_after, "");

    }

    // 在当前光标位置插入关键词的后几个字符串（当前 Tr 位置点击）
    function replaceCurrPostionStrFromTr() {
        gs_after = this.childNodes[0].childNodes[0].childNodes[0].data.substr(s.length);
        parent.parent.parent.editorFrame.GGETFRAME.editAreaLoader.insertTags(gMyTextArea, gs_after, "");
        clearAutoCompletion();
    }



    function aClick() {
        replaceCurrPostionStr( this.childNodes[0].data );
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
            tmpstr.focus();
        }
        //如果按了down键
        else if (e.keyCode == 40){
            //向下移动，准备移动焦点
            currentA ++;
            //如果当前焦点在最后一个数据项上，用户用按了down键，则循环向上，回到文本框上
            if(currentA > aArray.length - 1){
                tmpstr.focus();
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
                tmpstr.focus();
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


function chcolor(e) {
    var thisbk = "width: 100%; background-color: #0078d7; color: #eee;";
    var thatbk = "width: 100%; color: #ad0039;";
    var o = e.currentTarget.parentElement;
    var eobj = parent.parent.parent.editorFrame.GGETFRAME.document.getElementById('frame_myTextarea').contentWindow.editArea;

    for ( var i = 0; i < o.childElementCount ; i++ ) {
        o.children[i].style = thatbk;
    }
    e.currentTarget.style = thisbk;
    eobj.go_to_line(e.currentTarget.children[0].innerText);
	eobj.selection_field.setAttribute('class','show_colors_e');
	eobj.focus();
    // console.log(e);
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


// 增加 Explain Plan 功能 2020-12-13
function explain(a) {
    var tempSql = getTextareaContents(a);
    // 过滤最后的 ';' 符号
    tempSql = tempSql.trim().replace(/[;]*$/, '');
    // 是否是原计划执行窗口
    if (parent.parent.leftFrameList.getWindowType() == 'EPL') {
        // 修改左侧窗口提示信息
        parent.parent.leftFrameList.changeWindowListTitle(parent.parent.leftFrameList.getWindowType(),parent.parent.leftFrameList.getWindowTr(), tempSql);
        // 执行计划页面和数据初始化
        parent.parent.parent.editorFrame.GGETFRAME.explainInit(tempSql);
    } else {
        // 否则，当前窗口是否为 SQL 窗口，即从 SQL 窗口才能打开
        if (parent.parent.leftFrameList.getWindowType() == 'SQL') {
            // 新创建计划执行窗口
            parent.parent.leftFrameList.createNewSql('EPL','View.jsp');
            // 等待 editarea 初始化完成后执行
            setTimeout(function() {
                // 设定新开窗口 editarea 编辑区中的 text 内容
                parent.parent.parent.editorFrame.GGETFRAME.editAreaLoader.setValue(gMyTextArea, tempSql);
                // 修改左侧窗口提示信息
                parent.parent.leftFrameList.changeWindowListTitle(parent.parent.leftFrameList.getWindowType(),parent.parent.leftFrameList.getWindowTr(), tempSql);
                // 执行计划页面和数据初始化
                parent.parent.parent.editorFrame.GGETFRAME.explainInit(tempSql);
                // 延时 500 ms
            }, 500);
        }
    }
}

// F8按键与点击事件一致调用函数
function initExecuteForF8(textareaname) {
    if (parent.parent.leftFrameList.getWindowType() == 'EPL') {
        if (typeof(parent.parent.editorFrame.GGETFRAME) == 'undefined') {
            parent.parent.parent.editorFrame.GGETFRAME.explain(textareaname);
        } else {
            parent.parent.editorFrame.GGETFRAME.explain(textareaname);
        }
    } else if (parent.parent.leftFrameList.getWindowType() == 'CIO') {
        if (typeof(parent.parent.editorFrame.GGETFRAME) == 'undefined') {
            parent.parent.editorFrame.GGETFRAME.execCompileInObj();
        } else {
            parent.parent.editorFrame.GGETFRAME.execCompileInObj();
        }
    } else {
		if (typeof(parent.parent.editorFrame.GGETFRAME) == 'undefined') {
			parent.parent.parent.editorFrame.GGETFRAME.executeRun(textareaname);
		} else {
			parent.parent.editorFrame.GGETFRAME.executeRun(textareaname);
		}
	}
}


function doOnExplainRowSelected(rowID,celInd){
    var tmpStr = parent.parent.editorFrame.GGETFRAME.explainMygrid.cells(rowID, 0).getValue();
    var footStr = '';
    tmpStr = tmpStr.trim();
    if ( tmpStr == "TABLE ACCESS FULL") footStr = 'Return all rows from a table';
    if ( tmpStr == "VIEW") footStr = 'Resolve view and return the results';
	if ( tmpStr == "FILTER") footStr = 'Test WHERE clause condition without using an index';
	if ( tmpStr == "NESTED LOOPS") footStr = 'Join two tables where at least one index is used';
	if ( tmpStr == "UNION-ALL") footStr = 'Concatenate result sets without eliminating duplicates';
	if ( tmpStr == "SORT GROUP BY") footStr = 'Sort a result set for a GROUP BY clause';
	if ( tmpStr == "SORT ORDER BY") footStr = 'Sort a result set for an ORDER BY clause';
	if ( tmpStr == "SORT AGGREGATE") footStr = 'Sort a result set for an aggregation function (MIN, MAX, ...)';
    if ( tmpStr == "SORT JOIN") footStr = 'Sort a set of records for a MERGE JOIN operation';
    if ( tmpStr == "MERGE JOIN OUTER" || tmpStr == "MERGE JOIN") footStr = 'Join tables by merging sorted lists of records from each table';
    if ( tmpStr == "HASH JOIN") footStr = 'Join one in-memory table to another table using a hash key';
    if ( tmpStr == "INDEX UNIQUE SCAN") footStr = 'Select a unique value from a unique index';
	if ( tmpStr == "INDEX FULL SCAN") footStr = 'Select all values from an index';
	if ( tmpStr == "INDEX RANGE SCAN") footStr = 'Select a range of values from an index in ascending order';
	if ( tmpStr == "TABLE ACCESS BY INDEX ROWID") footStr = 'Return a single row based on its ROWID';


	setFootView('9999', footStr);

    if ( (parseInt(explainDatalink[0]) + 1) == rowID ) {
        setExplainButton(2, false);
        setExplainButton(3, false);
        setExplainButton(4, true);
        setExplainButton(5, true);
    } else if ( (parseInt(explainDatalink[explainDatalink.length -1]) + 1) == rowID ) {
        setExplainButton(2, true);
        setExplainButton(3, true);
        setExplainButton(4, false);
        setExplainButton(5, false);
    } else {
        setExplainButton(2, true);
        setExplainButton(3, true);
        setExplainButton(4, true);
        setExplainButton(5, true);
    }
}


function compileInvalid(t) {
    if (parent.parent.leftFrameList.getWindowType() == 'CIO') {
        return 0;
    } else {
        // 新创建计划执行窗口
        parent.parent.leftFrameList.createNewSql('CIO','View.jsp');
    }

}

// 重置 editortoolbar 按钮状态 -- for compile invalid objects
function setEditortoolbarForCIO() {
    // 第一行
    var toprightcells0 = parent.parent.editorToolFrame.document.getElementById('topToolBar').rows[0].cells;
    // 第二行
    var toprightcells = parent.parent.editorToolFrame.document.getElementById('topToolBar').rows[1].cells;
	var leftTr = parent.parent.leftFrameList.getWindowTr();
	var cellMax = parent.parent.leftFrameList.document.getElementById('windowListBar').rows.length;


	for (var i = 2; i < toprightcells0.length - 1; i++)
    {
        toprightcells0[i].setEnabled(false);
		// 特殊处理
		if (i == toprightcells0.length - 6 || i == toprightcells0.length - 7)  toprightcells0[i].setEnabled(true);
		setNavigateButton(leftTr, cellMax);

	}

    for (var i = 2; i < toprightcells.length - 3; i++)
    {
        toprightcells[i].setEnabled(false);
    }


}


// editortoolbar 按钮状态 初始设置
function setEditortoolbarReset() {
    // 第一行
    var toprightcells0 = parent.parent.editorToolFrame.document.getElementById('topToolBar').rows[0].cells;
    // 第二行
    var toprightcells = parent.parent.editorToolFrame.document.getElementById('topToolBar').rows[1].cells;
	var leftTr = parent.parent.leftFrameList.getWindowTr();
	var cellMax = parent.parent.leftFrameList.document.getElementById('windowListBar').rows.length;

	for (var i = 2; i < toprightcells0.length - 1; i++)
    {
        toprightcells0[i].setEnabled(true);
		setNavigateButton(leftTr, cellMax);
	}

    for (var i = toprightcells.length - 5; i < toprightcells.length - 3; i++)
    {
        toprightcells[i].setEnabled(true);
    }

    // 提交和回滚按钮状态
    (parent.parent.editorFrame.GGETFRAME.DDLFlag == 1) ? (toprightcells[3].setEnabled(true),toprightcells[4].setEnabled(true))
        : (toprightcells[3].setEnabled(false),toprightcells[4].setEnabled(false));

}


function execCompileInObj() {
    compileInvalidMygrid = parent.parent.editorFrame.GGETFRAME.compileInvalidMygrid;
    var rowsnum = compileInvalidMygrid.getRowsNum();
    var footerprogressObj =  parent.parent.editorFrame.GGETFRAME.document.getElementById('footerprogress');
    var inValidObjName = '';
    var inValidObjType = '';
    var debugFlag = 0;
    rowsnum = parseInt(rowsnum);



    // 初始化
    footerprogressObj.style.color = "#333333";
    footerprogressObj.innerText = 'Initializing...';
    // 设置左边 windowList 运行状态
    parent.parent.leftFrameList.changeWindowListTitle('CIO',parent.parent.leftFrameList.getWindowTr(), '');

    // 设置下边 footer 运行状态
    parent.parent.editorToolFrame.changeExecNoRun(1, "execIsRunButton");

    // 从 grid 中取得 object 名称和类型
    for ( var i = 0; i < rowsnum; i++ ) {
        // 得到 object 的名称
        inValidObjName = compileInvalidMygrid.cells(compileInvalidMygrid.getRowId(i), 1).getValue();
        inValidObjType = compileInvalidMygrid.cells(compileInvalidMygrid.getRowId(i), 2).getValue();


        if ( inValidObjType == 'FUNCTION' || inValidObjType == 'PROCEDURE' || inValidObjType == 'PACKAGE'
            || inValidObjType == 'PACKAGE BODY' || inValidObjType == 'TYPE' || inValidObjType == 'TYPE BODY'
            || inValidObjType == 'TRIGGER' ) {
            inValidObjType == 'TRIGGER' ?  debugFlag = 2 : debugFlag = 0;
            inValidObjType = inValidObjType.toLowerCase();
            parent.parent.editorToolFrame.BaisWorkBean.execObjectCompile(inValidObjType, inValidObjName, debugFlag, callexecInvalidObjectback);
        }

        function callexecInvalidObjectback(intdata){
            // 执行刷新操作
            compileInvalidObjectsInit();
            // 设置 footer 进度条
            setTimeout(function() {
                footerprogressObj.innerText = '.';
                footerprogressObj.style.color = "#06b025";
                footerprogressObj.style.width = (parseInt((i + 1)/rowsnum) * 100) + '%';
            }, 100);
        }

    }

    // 恢复下边 footer 非运行状态
    parent.parent.editorToolFrame.changeExecNoRun(0, "execIsRunButton");
    // 恢复左边 windowList 非运行状态
    parent.parent.leftFrameList.restoreWindowListImg(parent.parent.leftFrameList.getWindowTr());

}


// navigate back
function navigateBack(listbarname) {
	var leftTr = parent.parent.leftFrameList.getWindowTr();
	var cellMax = parent.parent.leftFrameList.document.getElementById(listbarname).rows.length;

	if ( parseInt(leftTr) > 0 ) {
		leftTr --;
		parent.parent.leftFrameList.document.getElementById(
			parent.parent.leftFrameList.document.getElementById(listbarname).rows[leftTr].cells[0].id
		).click();
	}

}

// navigate forward
function navigateForward(listbarname) {
	var leftTr = parent.parent.leftFrameList.getWindowTr();
	var cellMax = parent.parent.leftFrameList.document.getElementById(listbarname).rows.length;
	if ( parseInt(leftTr) < cellMax ) {
		leftTr ++;
		parent.parent.leftFrameList.document.getElementById(
			parent.parent.leftFrameList.document.getElementById(listbarname).rows[leftTr].cells[0].id
		).click();
	}
}


// ctr 当前窗口序号 getWindowTr() 得到
// cmax 左边窗口总数 rows.cell
function setNavigateButton(ctr, cmax) {
	var toprightcells0 = parent.parent.editorToolFrame.document.getElementById('topToolBar').rows[0].cells;
	if (cmax == 1) {
		  toprightcells0[toprightcells0.length - 6].setEnabled(true);
		  toprightcells0[toprightcells0.length - 7].setEnabled(false);
	} else if (cmax > 1) {
		if ( ctr > 0 ) {
			if ( ctr != cmax - 1) {
				toprightcells0[toprightcells0.length - 6].setEnabled(true);
				toprightcells0[toprightcells0.length - 7].setEnabled(true);
			} else {
				toprightcells0[toprightcells0.length - 6].setEnabled(false);
				toprightcells0[toprightcells0.length - 7].setEnabled(true);
			}
		} else {
			toprightcells0[toprightcells0.length - 6].setEnabled(true);
			toprightcells0[toprightcells0.length - 7].setEnabled(false);
		}
	}
}


// Type = SQL 窗口创建结果分 tab
// n = 窗口数  dn = divname s = [] tab页面的名称数组
function createResultTabForSQL(n, dn, s) {
    var crts = "";
    var tabDivObj = parent.parent.editorFrame.GGETFRAME.document.getElementById(dn);
    var tid = "foot_outputDiv";
    var tdiv = "";
    var resultBarFetchNextTd = 'fetchNextTd1';
	var resultBarFetchNextImg = 'fetchNextButton1';
	var resultBarFetchLastTd = 'fetchLastTd1';
	var resultBarFetchLastImg = 'fetchLastButton1';

	var resultBartmp = '<table border="0" id="toolBar" style="background: ButtonFace;"\n' +
        '\t\t\t\t\t\t\t   cellspacing="3">\n' +
        '\t\t\t\t\t\t\t<tr>\n' +
        '\t\t\t\t\t\t\t\t<td class="coolButton">\n' +
        '\t\t\t\t\t\t\t\t\t<img id="columnButton" src="../../images/column.gif"\n' +
        '\t\t\t\t\t\t\t\t\t\t align="absmiddle">\n' +
        '\t\t\t\t\t\t\t\t</td>\n' +
        '\t\t\t\t\t\t\t\t<td onclick="changeLock(\'lockButton\')" id="lockButtonTd">\n' +
        '\t\t\t\t\t\t\t\t\t<img id="lockButton" src="../../images/lock.gif" title="Edit data"\n' +
        '\t\t\t\t\t\t\t\t\t\t alt="Edit data" align="absmiddle">\n' +
        '\t\t\t\t\t\t\t\t</td>\n' +
        '\t\t\t\t\t\t\t\t<td class="coolButtonDisabled" id="insertRecordTd"\n' +
        '\t\t\t\t\t\t\t\t\tonclick="insertRecord()">\n' +
        '\t\t\t\t\t\t\t\t\t<img id="insertRecordButton" src="../../images/insert_record.gif"\n' +
        '\t\t\t\t\t\t\t\t\t\t title="Insert record" alt="Insert record" align="absmiddle">\n' +
        '\t\t\t\t\t\t\t\t</td>\n' +
        '\t\t\t\t\t\t\t\t<td class="coolButtonDisabled" id="deleteRecordTd"\n' +
        '\t\t\t\t\t\t\t\t\tonclick="deleteRecord()">\n' +
        '\t\t\t\t\t\t\t\t\t<img id="deleteRecordButton" src="../../images/delete_record.gif"\n' +
        '\t\t\t\t\t\t\t\t\t\t title="Delete record" alt="Delete record" align="absmiddle">\n' +
        '\t\t\t\t\t\t\t\t</td>\n' +
        '\t\t\t\t\t\t\t\t<td class="coolButtonDisabled" id="postChangesTd"\n' +
        '\t\t\t\t\t\t\t\t\tonclick="postChangeRecord()">\n' +
        '\t\t\t\t\t\t\t\t\t<img id="postChangesButton" src="../../images/post_changes.gif"\n' +
        '\t\t\t\t\t\t\t\t\t\t title="Post changes" alt="Post changes" align="absmiddle">\n' +
        '\t\t\t\t\t\t\t\t</td>\n' +
        '\t\t\t\t\t\t\t\t<td class="coolButtonDisabled" id="' + resultBarFetchNextTd + '"\n' +
        '\t\t\t\t\t\t\t\t\tonclick="getFYSql(1)">\n' +
        '\t\t\t\t\t\t\t\t\t<img id="' + resultBarFetchNextImg + '" src="../../images/fetch_next.gif"\n' +
        '\t\t\t\t\t\t\t\t\t\t title="Fetch next page" alt="Fetch next page" align="absmiddle">\n' +
        '\t\t\t\t\t\t\t\t</td>\n' +
        '\t\t\t\t\t\t\t\t<td class="coolButtonDisabled" id="' + resultBarFetchLastTd + '"\n' +
        '\t\t\t\t\t\t\t\t\tonclick="getFYQSql(1)">\n' +
        '\t\t\t\t\t\t\t\t\t<img id="' + resultBarFetchLastImg + '" src="../../images/fetch_last.gif"\n' +
        '\t\t\t\t\t\t\t\t\t\t title="Fetch last page" alt="Fetch last page" align="absmiddle">\n' +
        '\t\t\t\t\t\t\t\t</td>\n' +
        '\t\t\t\t\t\t\t\t<td class="coolButtonDisabled" id="queryByExampleTd"\n' +
        '\t\t\t\t\t\t\t\t\tonclick="queryByExample()">\n' +
        '\t\t\t\t\t\t\t\t\t<img id="queryByExampleButton"\n' +
        '\t\t\t\t\t\t\t\t\t\t src="../../images/query_by_example.gif" title="Query By Example"\n' +
        '\t\t\t\t\t\t\t\t\t\t alt="Query By Example" align="absmiddle">\n' +
        '\t\t\t\t\t\t\t\t</td>\n' +
        '\t\t\t\t\t\t\t\t<td class="coolButtonDisabled" id="clearRecordTd"\n' +
        '\t\t\t\t\t\t\t\t\tonclick="clearRecord()">\n' +
        '\t\t\t\t\t\t\t\t\t<img id="clearRecordButton" src="../../images/clear_record.gif"\n' +
        '\t\t\t\t\t\t\t\t\t\t title="Clear record" alt="Clear record" align="absmiddle">\n' +
        '\t\t\t\t\t\t\t\t</td>\n' +
        '\t\t\t\t\t\t\t\t<td class="coolButtonDisabled" id="singleRecordViewTd"\n' +
        '\t\t\t\t\t\t\t\t\tonclick="changeRecordView()">\n' +
        '\t\t\t\t\t\t\t\t\t<img id="singleRecordViewButton"\n' +
        '\t\t\t\t\t\t\t\t\t\t src="../../images/single_record_view.gif"\n' +
        '\t\t\t\t\t\t\t\t\t\t title="Single Record View" alt="Single Record View"\n' +
        '\t\t\t\t\t\t\t\t\t\t align="absmiddle">\n' +
        '\t\t\t\t\t\t\t\t</td>\n' +
        '\t\t\t\t\t\t\t\t<td class="coolButtonDisabled" id="nextRecord"\n' +
        '\t\t\t\t\t\t\t\t\tonclick="changeNextRecordView()">\n' +
        '\t\t\t\t\t\t\t\t\t<img id="nextRecordButton" src="../../images/next_record.gif"\n' +
        '\t\t\t\t\t\t\t\t\t\t title="Next record" alt="Next record" align="absmiddle">\n' +
        '\t\t\t\t\t\t\t\t</td>\n' +
        '\t\t\t\t\t\t\t\t<td class="coolButtonDisabled" id="previousRecord"\n' +
        '\t\t\t\t\t\t\t\t\tonclick="changePreviousRecordView()">\n' +
        '\t\t\t\t\t\t\t\t\t<img id="previousRecordButton"\n' +
        '\t\t\t\t\t\t\t\t\t\t src="../../images/previous_record.gif" title="Previous record"\n' +
        '\t\t\t\t\t\t\t\t\t\t alt="Previous record" align="absmiddle">\n' +
        '\t\t\t\t\t\t\t\t</td>\n' +
        '\t\t\t\t\t\t\t\t<td class="coolButtonDisabled" id="exportResultResultsTd"\n' +
        '\t\t\t\t\t\t\t\t\tonclick="execExportResults(\'excel\',event);">\n' +
        '\t\t\t\t\t\t\t\t\t<img id="exportResultResultsButton"\n' +
        '\t\t\t\t\t\t\t\t\t\t src="../../images/export_query_results.gif"\n' +
        '\t\t\t\t\t\t\t\t\t\t title="Export Query Results..." alt="Export Query Results..."\n' +
        '\t\t\t\t\t\t\t\t\t\t align="absmiddle">\n' +
        '\t\t\t\t\t\t\t\t</td>\n' +
        '\t\t\t\t\t\t\t\t<td class="coolButton" width="95%">\n' +
        '\t\t\t\t\t\t\t\t\t&nbsp;\n' +
        '\t\t\t\t\t\t\t\t</td>\n' +
        '\t\t\t\t\t\t\t</tr>\n' +
        '\n' +
        '\t\t\t\t\t\t</table>';
    var ordtmp = '<div style="width: 100%; height: 100px; background-color: white"\n' +
        '\t\t\t\t\t\t name="outResultDiv" id="outResultDiv"\n' +
        '\t\t\t\t\t\t onclick="hiddenBaisworkMenu(event)"\n' +
        '\t\t\t\t\t\t onmouseup="showBaisworkMenu(\'outResultDiv\',\'outResultMenu\',event)">\n' +
        '\t\t\t\t\t</div>';
    var cordtmp = '<div\n' +
        '\t\t\t\t\t\t\tstyle="width: 100%; height: 90%; background-color: white; display: none;"\n' +
        '\t\t\t\t\t\t\tname="changeOutResultDiv" id="changeOutResultDiv"\n' +
        '\t\t\t\t\t\t\tonclick="hiddenBaisworkMenu(event)"\n' +
        '\t\t\t\t\t\t\tonmouseup="showBaisworkMenu(\'outResultDiv\',\'outResultMenu\',event)">\n' +
        '\t\t\t\t\t</div>';

    var orddiv = '';
    var corddiv = '';
    var ordtivTmpid = 'outResultDiv1';
    var cordtivTmpid = 'changeOutResultDiv1';
    var ormenudiv = '';
    var ormenuid = 'outResultMenu';


    if (n <= 1) {
        // 构造 无 Tab 页页面
        tid = tid + n.toString();
        tdiv = document.createElement('div');
        tdiv.id = tid;
        tdiv.style.overflow = 'no';
        tdiv.style.backgroundColor = 'ButtonFace';
        tdiv.style.width = '100%';
        tdiv.innerHTML = resultBartmp;

        orddiv = document.createElement('div');
        orddiv.id = ordtivTmpid;
        orddiv.name = ordtivTmpid;
        orddiv.style.width = '100%';
        orddiv.style.height = '95%';
        orddiv.style.backgroundColor = 'white';
		orddiv.setAttribute('onclik', 'hiddenBaisworkMenu(event)');
		orddiv.setAttribute('onmouseup', 'showBaisworkMenu(\''+ordtivTmpid+'\',\'outResultMenu\',event)');

        corddiv = document.createElement('div');
        corddiv.id = cordtivTmpid;
        corddiv.name = cordtivTmpid;
        corddiv.style.width = '100%';
        corddiv.style.height = '90%';
        corddiv.style.backgroundColor = 'white';
        corddiv.style.display = 'none';
        corddiv.setAttribute('onclik', 'hiddenBaisworkMenu(event)');
		corddiv.setAttribute('onmouseup', 'showBaisworkMenu(\''+ordtivTmpid+'\',\'outResultMenu\',event)');

        // menu div
        ormenudiv = document.createElement('div');
        ormenudiv.id = ormenuid;
        ormenudiv.className = 'BaisworkM';


        tdiv.appendChild(orddiv);
        tdiv.appendChild(corddiv);
        tdiv.appendChild(ormenudiv);

		tabDivObj.innerHTML = '';
        tabDivObj.appendChild(tdiv);

        createOutResultMenu('outResultMenu');
        createBaisWorkMenu('BaisworkMenu');
        initToolBarButton();

    } else {
        // 构造 N 多个 Tab 页页面
        var tabpanid = "sqlWindowtabPanel";
        var tabpanObj = '';

        // 创建最外层的 tab-pan
        tabpanObj = document.createElement('div');
        tabpanObj.className = 'tab-pane';
        tabpanObj.id = tabpanid;
        tabpanObj.style.height = '100px';

        // 清空
        tabDivObj.innerHTML = '';
        // 添加为子节点
        tabDivObj.appendChild(tabpanObj);

        var ctHeightObj = tabDivObj;
        var deHeight = 49; // footer 26px + tabtitle 23 px
        var deGridHeight = 32; // 32 px
        var ctpageHeight = ctHeightObj.clientHeight - deHeight;

        for ( var i = 1; i <= n; i++ ) {
            var tabpageid = "tabpage_";
            var tabpagetitleid = "tabTitle_";
            var tabpagetitleimgid = "objIcoId_";
            var tabpagetitleimgspanid = "tmpImg_";
            var tabpagetitleimgspantextid = "objTitle_";

            var tabpageObj = '';
            var tabpagetitleObj = '';
            var tabpagetitleimgObj = '';
            var tabpagetitleimgspanObj = '';
            var tabpagetitleimgspantextObj = '';

			resultBarFetchNextTd = 'fetchNextTd';
			resultBarFetchNextImg = 'fetchNextButton';
			resultBarFetchLastTd = 'fetchLastTd';
			resultBarFetchLastImg = 'fetchLastButton';

            tid = "foot_outputDiv";
			ordtivTmpid = 'outResultDiv';
			cordtivTmpid = 'changeOutResultDiv';


            // 设置动态 id
            // <div class="tab-page" id="tabpage_1" style=" height:100px;">
            tabpageid = tabpageid + i.toString();
            tabpageObj = document.createElement('div');
            tabpageObj.className = 'tab-page';
            tabpageObj.id = tabpageid;
            tabpageObj.style.height = ctpageHeight + "px";
            tabpanObj.appendChild(tabpageObj);

            // <h2 class="tab" id="tabTitle_1">
            tabpagetitleid = tabpagetitleid + i.toString();
            tabpagetitleObj = document.createElement('h2');
            tabpagetitleObj.className = 'tab';
            tabpagetitleObj.id = tabpagetitleid;
            tabpageObj.appendChild(tabpagetitleObj);

            // <img style="border:none" id='objIcoId_1' src='' align='absmiddle' />
            tabpagetitleimgid = tabpagetitleimgid + i.toString();
            tabpagetitleimgObj = document.createElement('img');
            tabpagetitleimgObj.id = tabpagetitleimgid;
            tabpagetitleimgObj.style.border = 'none';
            tabpagetitleimgObj.src = '';
            tabpagetitleimgObj.align = 'absmiddle';
            tabpagetitleObj.appendChild(tabpagetitleimgObj);

            // <span id="tmpImg_1" style="display:none"></span>
            tabpagetitleimgspanid = tabpagetitleimgspanid + i.toString();
            tabpagetitleimgspanObj = document.createElement('span');
            tabpagetitleimgspanObj.id = tabpagetitleimgspanid;
            tabpagetitleimgspanObj.style.display = 'none';
            tabpagetitleObj.appendChild(tabpagetitleimgspanObj);

            // <span id='objTitle_1'>SQL1</span>
            tabpagetitleimgspantextid = tabpagetitleimgspantextid + i.toString();
            tabpagetitleimgspantextObj = document.createElement('span');
            tabpagetitleimgspantextObj.id = tabpagetitleimgspantextid;
            tabpagetitleimgspantextObj.innerText = s[i-1];
            tabpagetitleObj.appendChild(tabpagetitleimgspantextObj);

            // 添加子 tab 页面中的内容
			resultBarFetchNextTd = resultBarFetchNextTd + i.toString();
			resultBarFetchNextImg = resultBarFetchNextImg + i.toString();
			resultBarFetchLastTd = resultBarFetchLastTd + i.toString();
			resultBarFetchLastImg = resultBarFetchLastImg + i.toString();
			resultBartmp = '<table border="0" id="toolBar' + i.toString() + '" style="background: ButtonFace;"\n' +
				'\t\t\t\t\t\t\t   cellspacing="3">\n' +
				'\t\t\t\t\t\t\t<tr>\n' +
				'\t\t\t\t\t\t\t\t<td class="coolButton">\n' +
				'\t\t\t\t\t\t\t\t\t<img id="columnButton" src="../../images/column.gif"\n' +
				'\t\t\t\t\t\t\t\t\t\t align="absmiddle">\n' +
				'\t\t\t\t\t\t\t\t</td>\n' +
				'\t\t\t\t\t\t\t\t<td onclick="changeLock(\'lockButton\')" id="lockButtonTd">\n' +
				'\t\t\t\t\t\t\t\t\t<img id="lockButton" src="../../images/lock.gif" title="Edit data"\n' +
				'\t\t\t\t\t\t\t\t\t\t alt="Edit data" align="absmiddle">\n' +
				'\t\t\t\t\t\t\t\t</td>\n' +
				'\t\t\t\t\t\t\t\t<td class="coolButtonDisabled" id="insertRecordTd"\n' +
				'\t\t\t\t\t\t\t\t\tonclick="insertRecord()">\n' +
				'\t\t\t\t\t\t\t\t\t<img id="insertRecordButton" src="../../images/insert_record.gif"\n' +
				'\t\t\t\t\t\t\t\t\t\t title="Insert record" alt="Insert record" align="absmiddle">\n' +
				'\t\t\t\t\t\t\t\t</td>\n' +
				'\t\t\t\t\t\t\t\t<td class="coolButtonDisabled" id="deleteRecordTd"\n' +
				'\t\t\t\t\t\t\t\t\tonclick="deleteRecord()">\n' +
				'\t\t\t\t\t\t\t\t\t<img id="deleteRecordButton" src="../../images/delete_record.gif"\n' +
				'\t\t\t\t\t\t\t\t\t\t title="Delete record" alt="Delete record" align="absmiddle">\n' +
				'\t\t\t\t\t\t\t\t</td>\n' +
				'\t\t\t\t\t\t\t\t<td class="coolButtonDisabled" id="postChangesTd"\n' +
				'\t\t\t\t\t\t\t\t\tonclick="postChangeRecord()">\n' +
				'\t\t\t\t\t\t\t\t\t<img id="postChangesButton" src="../../images/post_changes.gif"\n' +
				'\t\t\t\t\t\t\t\t\t\t title="Post changes" alt="Post changes" align="absmiddle">\n' +
				'\t\t\t\t\t\t\t\t</td>\n' +
				'\t\t\t\t\t\t\t\t<td class="coolButtonDisabled" id="' + resultBarFetchNextTd + '"\n' +
				'\t\t\t\t\t\t\t\t\tonclick="getFYSql(' + i + ')">\n' +
				'\t\t\t\t\t\t\t\t\t<img id="' + resultBarFetchNextImg + '" src="../../images/fetch_next.gif"\n' +
				'\t\t\t\t\t\t\t\t\t\t title="Fetch next page" alt="Fetch next page" align="absmiddle">\n' +
				'\t\t\t\t\t\t\t\t</td>\n' +
				'\t\t\t\t\t\t\t\t<td class="coolButtonDisabled" id="' + resultBarFetchLastTd + '"\n' +
				'\t\t\t\t\t\t\t\t\tonclick="getFYQSql(' + i + ')">\n' +
				'\t\t\t\t\t\t\t\t\t<img id="' + resultBarFetchLastImg + '" src="../../images/fetch_last.gif"\n' +
				'\t\t\t\t\t\t\t\t\t\t title="Fetch last page" alt="Fetch last page" align="absmiddle">\n' +
				'\t\t\t\t\t\t\t\t</td>\n' +
				'\t\t\t\t\t\t\t\t<td class="coolButtonDisabled" id="queryByExampleTd"\n' +
				'\t\t\t\t\t\t\t\t\tonclick="queryByExample()">\n' +
				'\t\t\t\t\t\t\t\t\t<img id="queryByExampleButton"\n' +
				'\t\t\t\t\t\t\t\t\t\t src="../../images/query_by_example.gif" title="Query By Example"\n' +
				'\t\t\t\t\t\t\t\t\t\t alt="Query By Example" align="absmiddle">\n' +
				'\t\t\t\t\t\t\t\t</td>\n' +
				'\t\t\t\t\t\t\t\t<td class="coolButtonDisabled" id="clearRecordTd"\n' +
				'\t\t\t\t\t\t\t\t\tonclick="clearRecord()">\n' +
				'\t\t\t\t\t\t\t\t\t<img id="clearRecordButton" src="../../images/clear_record.gif"\n' +
				'\t\t\t\t\t\t\t\t\t\t title="Clear record" alt="Clear record" align="absmiddle">\n' +
				'\t\t\t\t\t\t\t\t</td>\n' +
				'\t\t\t\t\t\t\t\t<td class="coolButtonDisabled" id="singleRecordViewTd"\n' +
				'\t\t\t\t\t\t\t\t\tonclick="changeRecordView()">\n' +
				'\t\t\t\t\t\t\t\t\t<img id="singleRecordViewButton"\n' +
				'\t\t\t\t\t\t\t\t\t\t src="../../images/single_record_view.gif"\n' +
				'\t\t\t\t\t\t\t\t\t\t title="Single Record View" alt="Single Record View"\n' +
				'\t\t\t\t\t\t\t\t\t\t align="absmiddle">\n' +
				'\t\t\t\t\t\t\t\t</td>\n' +
				'\t\t\t\t\t\t\t\t<td class="coolButtonDisabled" id="nextRecord"\n' +
				'\t\t\t\t\t\t\t\t\tonclick="changeNextRecordView()">\n' +
				'\t\t\t\t\t\t\t\t\t<img id="nextRecordButton" src="../../images/next_record.gif"\n' +
				'\t\t\t\t\t\t\t\t\t\t title="Next record" alt="Next record" align="absmiddle">\n' +
				'\t\t\t\t\t\t\t\t</td>\n' +
				'\t\t\t\t\t\t\t\t<td class="coolButtonDisabled" id="previousRecord"\n' +
				'\t\t\t\t\t\t\t\t\tonclick="changePreviousRecordView()">\n' +
				'\t\t\t\t\t\t\t\t\t<img id="previousRecordButton"\n' +
				'\t\t\t\t\t\t\t\t\t\t src="../../images/previous_record.gif" title="Previous record"\n' +
				'\t\t\t\t\t\t\t\t\t\t alt="Previous record" align="absmiddle">\n' +
				'\t\t\t\t\t\t\t\t</td>\n' +
				'\t\t\t\t\t\t\t\t<td class="coolButtonDisabled" id="exportResultResultsTd"\n' +
				'\t\t\t\t\t\t\t\t\tonclick="execExportResults(\'excel\',event);">\n' +
				'\t\t\t\t\t\t\t\t\t<img id="exportResultResultsButton"\n' +
				'\t\t\t\t\t\t\t\t\t\t src="../../images/export_query_results.gif"\n' +
				'\t\t\t\t\t\t\t\t\t\t title="Export Query Results..." alt="Export Query Results..."\n' +
				'\t\t\t\t\t\t\t\t\t\t align="absmiddle">\n' +
				'\t\t\t\t\t\t\t\t</td>\n' +
				'\t\t\t\t\t\t\t\t<td class="coolButton" width="95%">\n' +
				'\t\t\t\t\t\t\t\t\t&nbsp;\n' +
				'\t\t\t\t\t\t\t\t</td>\n' +
				'\t\t\t\t\t\t\t</tr>\n' +
				'\n' +
				'\t\t\t\t\t\t</table>';

            tid = tid + i.toString();
            tdiv = document.createElement('div');
            tdiv.id = tid;
            tdiv.style.overflow = 'no';
            tdiv.style.backgroundColor = 'ButtonFace';
            tdiv.style.width = '100%';
            tdiv.innerHTML = resultBartmp;


            //<div style="width: 100%; height: 100px; background-color: white"
            // 						 name="outResultDiv" id="outResultDiv"
            // 						 onclick="hiddenBaisworkMenu(event)"
            // 						 onmouseup="showBaisworkMenu('outResultDiv','outResultMenu',event)">
            // 					</div>
            ordtivTmpid = ordtivTmpid + i.toString();
            orddiv = document.createElement('div');
            orddiv.id = ordtivTmpid;
            orddiv.name = ordtivTmpid;
            orddiv.style.width = '100%';
            orddiv.style.height = (parseInt(ctpageHeight) -  32) + "px";;
            orddiv.style.backgroundColor = 'white';
            orddiv.setAttribute('onclik', 'hiddenBaisworkMenu(event)');
            orddiv.setAttribute('onmouseup', 'showBaisworkMenu(\''+ordtivTmpid+'\',\'outResultMenu\',event)');

            //<div
            // 							style="width: 100%; height: 90%; background-color: white; display: none;"
            // 							name="changeOutResultDiv" id="changeOutResultDiv"
            // 							onclick="hiddenBaisworkMenu(event)"
            // 							onmouseup="showBaisworkMenu('outResultDiv','outResultMenu',event)">
            // 					</div>
            cordtivTmpid = cordtivTmpid + i.toString();
            corddiv = document.createElement('div');
            corddiv.id = cordtivTmpid;
            corddiv.name = cordtivTmpid;
            corddiv.style.width = '100%';
            corddiv.style.height = '90%';
            corddiv.style.backgroundColor = 'white';
            corddiv.style.display = 'none';
            corddiv.setAttribute('onclik', 'hiddenBaisworkMenu(event)');
            corddiv.setAttribute('onmouseup', 'showBaisworkMenu(\''+ordtivTmpid+'\',\'outResultMenu\',event)');

            // menu div
            // <div id="outResultMenu" name="outResultMenu" class="BaisworkM"></div>
            ormenudiv = document.createElement('div');
            ormenudiv.id = ormenuid;
            ormenudiv.className = 'BaisworkM';

            tabpageObj.appendChild(tdiv);
            tabpageObj.appendChild(orddiv);
            tabpageObj.appendChild(corddiv);
			initToolBarButton(i);


        }

        // 结果输出区统一右键菜单
        tabDivObj.appendChild(ormenudiv);

        createOutResultMenu('outResultMenu');
        createBaisWorkMenu('BaisworkMenu');

        var sqlWindowTabPane = new WebFXTabPane( document.getElementById( "sqlWindowtabPanel" ), true );
		// 调整到第一个 tab 页面
        sqlWindowTabPane.setSelectedIndex(0);
		// 调整到第一行 sql 语句
		var eobj = parent.parent.parent.editorFrame.GGETFRAME.document.getElementById('frame_myTextarea').contentWindow.editArea;
		eobj.go_to_line( "1" );
		eobj.focus();

	}

}


// tabpane.js 中 onclick() 调用接口 2021-1-4
function Gselect(o) {
	if (parent.parent.leftFrameList.getWindowType() == 'SQL') {
		// console.log(o);
		if ( o == undefined || o == null || o == '') ( o = Object, o.index = 0);
		var eobj = parent.parent.parent.editorFrame.GGETFRAME.document.getElementById('frame_myTextarea').contentWindow.editArea;
		eobj.go_to_line( (o.index + 1).toString() );
		eobj.focus();

	}
}

//关于我们团队
function aboutUS() {
	url = "../login/about.jsp";
	window.open(url,"","toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=auto,resizable=yes,copyhistory=no,width=500,height=300,top=360,left=500");
}