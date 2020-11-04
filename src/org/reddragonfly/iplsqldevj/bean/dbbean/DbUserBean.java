package org.reddragonfly.iplsqldevj.bean.dbbean;

import java.sql.ResultSet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.struts2.ServletActionContext;
import org.reddragonfly.iplsqldevj.bean.CharSet;
import org.reddragonfly.iplsqldevj.bean.UserBean;

import com.opensymphony.xwork2.ActionContext;

public class DbUserBean extends DbBean {

	public static String TYPE = "user";
	public static String TYPESUB = "usersub";
	public static String ICON_INVALID = "dbimages/users.png";
	public static String ICON_VALID = "dbimages/users.png";
	public static String ICON_PARAMTER = "dbimages/privilege.png";
	public static String ICON_ROLES = "dbimages/roles.png";
	public static String PRIVILEGE_FLAG = "flag";	//by phanrider add  2010-01-22

	protected static String[] FIELDS =
	    {"Objects","Object privileges","System privileges","Role grants"};
	protected static String FIELDS_PRI = "Privileges"; //by phanrider add  2010-01-22
	protected static String[] OBJ_FIELDS =
		{"Functions","Procedures","Packages","Package bodies","Types","Type bodies",
			"Triggers","Java sources","Queues","Libraries","Tables","Views",
			"Sequences","Synonyms","Database links","Clusters"};

	protected static String[] OBJ_TPYES =
			{"CLUSTER","CONSUMER GROUP","CONTEXT","DATABASE LINK","DESTINATION","DIMENSION","DIRECTORY","EDITION","EVALUATION CONTEXT",
					"FUNCTION","INDEX","INDEX PARTITION","INDEXTYPE","JAVA CLASS","JAVA DATA","JAVA RESOURCE","JAVA SOURCE","JOB","JOB CLASS",
					"LIBRARY","LOB","LOB PARTITION","MATERIALIZED VIEW","OPERATOR","PACKAGE","PACKAGE BODY","PROCEDURE","PROGRAM","QUEUE",
					"RESOURCE PLAN","RULE","RULE SET","SCHEDULE","SCHEDULER GROUP","SEQUENCE","SYNONYM","TABLE","TABLE PARTITION","TRIGGER",
					"TYPE","TYPE BODY","UNDEFINED","VIEW","WINDOW","XML SCHEMA"};

	protected static String[] ICON_A =
			{"dbimages/profiles.png", "dbimages/profiles.png", "dbimages/profiles.png", "dbimages/db_links.png", "dbimages/profiles.png","dbimages/profiles.png","dbimages/valid_directories.png","dbimages/profiles.png","dbimages/profiles.png",
					"dbimages/valid_funs.png", "dbimages/index.png","dbimages/index.png","dbimages/profiles.png","dbimages/java_class.png","dbimages/java_class.png","dbimages/java_class.png","dbimages/java_class.png","dbimages/valid_jobs.png","dbimages/job_class.png",
					"dbimages/valid_libraries.png","dbimages/profiles.png","dbimages/profiles.png","dbimages/valid_views.png","dbimages/profiles.png","dbimages/valid_pkgs.png","dbimages/valid_pkgs_b.png","dbimages/valid_prcs.png","dbimages/program.png","dbimages/valid_queue_tables.png",
					"dbimages/profiles.png","dbimages/profiles.png","dbimages/profiles.png","dbimages/profiles.png","dbimages/profiles.png","dbimages/valid_sequences.png","dbimages/profiles.png","dbimages/valid_queue_tables.png","dbimages/valid_queue_tables.png","dbimages/ena_triggers.png",
					"dbimages/valid_types.png","dbimages/valid_types_b.png","dbimages/valid_funs.png","dbimages/valid_views.png","dbimages/valid_funs.png","dbimages/valid_funs.png",};

	protected String name = "";
	public DbUserBean(String name){
		this.name = name;
	}

	public String getTreeXml() {
		// TODO Auto-generated method stub
		StringBuffer sb = new StringBuffer();
		sb.append("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
		sb.append("<tree>");

		for(int i = 0;i < FIELDS.length;i++){
			//客户端脚本已经重写了onmouseover事件，事实上在客户端为onmouseup事件，这是出于鼠标右键的考虑
			if( i == 0 ) {
				TYPE = "root";
				sb.append("<tree text=\""+FIELDS[i]+"\" src=\"showTree.action?type="+TYPE+"&amp;name="+name+"&amp;field="+ "" +"\" onblur=\"hideMenu()\" onmouseover=\"showAppointedMenu('"+TYPE+"','"+name+"','"+FIELDS[i]+"',event)\" />");
			} else {
				TYPE = "user";
				sb.append("<tree text=\""+FIELDS[i]+"\" src=\"showTree.action?type="+TYPE+"&amp;name="+name+"&amp;field="+FIELDS[i]+"\" onblur=\"hideMenu()\" onmouseover=\"showAppointedMenu('"+TYPE+"','"+name+"','"+FIELDS[i]+"',event)\" />");
			}

		}
		sb.append("</tree>");
		return sb.toString();
	}

	public String getTreeXmlN() {
		// TODO Auto-generated method stub
		//StringBuffer sb = new StringBuffer();
		//sb.append("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
		//sb.append("<tree>");
		//for(int i = 0;i < FIELDS.length;i++){
		//	//客户端脚本已经重写了onmouseover事件，事实上在客户端为onmouseup事件，这是出于鼠标右键的考虑
		//	sb.append("<item id=\""+ i +"\" text=\""+FIELDS[i]+"\" src=\"showTree.action?type="+TYPE+"&amp;name="+name+"&amp;field="+FIELDS[i]+"\" onblur=\"hideMenu()\" onmouseover=\"showAppointedMenu('"+TYPE+"','"+name+"','"+FIELDS[i]+"',event)\" />");
		//}
		//sb.append("</tree>");
		//return sb.toString();
		// TODO Auto-generated method stub
		StringBuffer sb = new StringBuffer();
		sb.append("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
		sb.append("<tree>");

		sb.append("<tree text=\""+ FIELDS_PRI +"\" src=\"showTree.action?type="+TYPE+"&amp;name="+name+"&amp;field=" + FIELDS_PRI + "\" onblur=\"hideMenu()\" onmouseover=\"showAppointedMenu('"+TYPE+"','"+name+"','"+FIELDS_PRI+"',event)\"  />");

		sb.append("</tree>");
		return sb.toString();
	}

	public String getFieldTreeXml(String fieldName) {
		// TODO Auto-generated method stub
		String[] field = fieldName.split("\\.",4);
		StringBuffer sb = new StringBuffer();
		sb.append("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
		sb.append("<tree>");
		//System.out.println(name);
		if(fieldName.equals(FIELDS[0])) {
			sb.append("<tree text=\""+FIELDS[0]+"\" src=\"showTree.action?type="+TYPE+"&amp;name="+name+"&amp;field="+FIELDS[0]+"\" onblur=\"hideMenu()\" onmouseover=\"showAppointedMenu('"+TYPE+"','"+name+"','"+FIELDS[0]+"',event)\" />");
		}
		if(fieldName.equals(FIELDS[1])) {
			sb.append(getObjectPrivileges(name));
		}
		if(fieldName.equals(FIELDS[2])) {
			//sb.append(getReferencedBy(name));
			sb.append(getSysPrivileges(name));
		}
		if(fieldName.equals(FIELDS[3])) {
			//sb.append(getSynonym(name));
			sb.append(getRoleGrant(name));

		}

		if (field.length >= 2) {
			if (field.length == 2) {
				String ownerName = field[0];
				String tempFieldName = field[1];
				String TempFieldName = fieldName + "." + PRIVILEGE_FLAG;
				sb.append("<tree text=\""+FIELDS_PRI+"\" src=\"showTree.action?type="+TYPE+"&amp;name="+name+"&amp;field=" + TempFieldName + "\" />");
			}
			if (field.length == 3) {
				if (field[field.length-1].equals(PRIVILEGE_FLAG)) sb.append(getPrivileges(field[1]));
				else  {
					String TempFieldName = fieldName + "." + PRIVILEGE_FLAG;
					sb.append("<tree text=\""+FIELDS_PRI+"\" src=\"showTree.action?type="+TYPE+"&amp;name="+name+"&amp;field=" + TempFieldName + "\" />");
				}
			}
			if (field.length == 4) {
				if (field[field.length-1].equals(PRIVILEGE_FLAG)) sb.append(getPrivileges(field[1] + "." + field[2]));
			}

		} else if (field.length == 1) {
			if (field[0].equals(FIELDS_PRI)) {
				sb.append(getSubPrivileges(name));
			}
		}

		//if(field[0].equals(FIELDS_PRI)) {	//单独加入privilege处理
		//	if (field.length == 2) {
		//		String TempFieldName = fieldName + "." + PRIVILEGE_FLAG;
		//		sb.append("<tree text=\""+FIELDS_PRI+"\" src=\"showTree.action?type="+TYPE+"&amp;name="+name+"&amp;field="+TempFieldName+"\" onblur=\"hideMenu()\" onmouseover=\"showAppointedMenu('"+TYPE+"','"+name+"','"+fieldName+"',event)\" />");
		//	} else 	if (field[2].equals(PRIVILEGE_FLAG)) {
		//		sb.append(getPrivileges(field[1]));
		//	} else {
		//		//sb.append(getSubPrivileges(name));
		//		sb.append("<item id=\""+ 0 +"\" text=\""+ FIELDS_PRI +"\" src=\"showTree.action?type="+TYPE+"&amp;name="+name+"&amp;field=" + FIELDS_PRI + "\"  />");
		//
		//	}
		//
		//}

		sb.append("</tree>");
		return sb.toString();
	}

	public String getMenuScript(){
		StringBuffer returnVal = new StringBuffer();
		returnVal.append("myMenu.width = 200;");
		returnVal.append("myMenu.add(new WFXMI(\"New...\", \"\"));");
		returnVal.append("myMenu.add(new WFXMI(\"Duplicate...\", \"\"));");
		returnVal.append("myMenu.add(new WebFXMenuSeparator());");
		returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
		returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		returnVal.append("myMenu.add(new WebFXMenuSeparator());");
		returnVal.append("myMenu.add(new WFXMI(\"Properties\"));");
		returnVal.append("myMenu.add(new WebFXMenuSeparator());");
		returnVal.append("myMenu.add(new WFXMI(\"View\"));");
		returnVal.append("myMenu.add(new WFXMI(\"Edit\"));");
		returnVal.append("myMenu.add(new WFXMI(\"Drop\",\"javascript:showCommon('"+TYPE+"','"+name+"','','Drop','500px','120px');\"));");
		returnVal.append("myMenu.add(new WFXMI(\"Browse\"));");
		returnVal.append("myMenu.add(new WebFXMenuSeparator());");
		returnVal.append("var sub2 = new WebFXMenu;");
		returnVal.append("sub2.width = 180;");
		returnVal.append("sub2.add(new WFXMI(\"(No user defined folders)\"));");
		returnVal.append("myMenu.add(new WFXMI(\"Add to folder\",null,null,sub2));");
		return returnVal.toString();
	}

	public String getFieldMenuScript(String fieldName){
		StringBuffer returnVal = new StringBuffer();
		if(fieldName.equals(FIELDS[0])){
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else if(fieldName.equals(FIELDS[1])){
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else if(fieldName.equals(FIELDS[2])){
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else if(fieldName.equals(FIELDS[3])){
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else {
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}
		return returnVal.toString();
	}

	//public String getObject(String name) {
	//	StringBuffer sb = new StringBuffer();
	//	ActionContext ctx = ActionContext.getContext();
	//	HttpServletRequest request = (HttpServletRequest)ctx.get(ServletActionContext.HTTP_REQUEST);
	//	HttpSession session = request.getSession();
	//	UserBean ub = (UserBean)session.getAttribute("user");
	//	String sql = null;
	//	ResultSet rs = null;
	//	try{
	//		//String obj = null;
	//		String allObj = "all_tab_privs";
	//		if(ub.getDbglobal()) {
	//			//obj = "all_tab_privs";
	//			sql = "select privilege,grantable from " + allObj + " where table_name='" + name + "' and grantee='" + this.name.toUpperCase() + "' order by privilege";
	//		} else {
	//			sql = "select privilege,grantable from " + allObj + " where table_name='" + name + "' and grantee='" + this.name.toUpperCase() + "' order by privilege";
	//		}
	//		rs = ub.getDb().getRS(sql);
	//		int i = 0;
	//		while(rs.next()){
	//			i = 1;
	//			String grantable = "";
	//			if (CharSet.nullToEmpty(rs.getString(2)).equals("YES")) grantable = "(GRANTABLE)";
	//			sb.append("<tree text=\""+CharSet.nullToEmpty(rs.getString(1)) +  grantable + "\" icon=\""+ ICON_PARAMTER +"\"  openIcon=\""+ ICON_PARAMTER +"\" />");
	//		}
	//		if (i == 0) sb.append("<tree text=\"Nodata\" />");
	//	}catch(Exception e){
	//		throw new RuntimeException(e);
	//	}finally{
	//		if(rs != null) ub.getDb().close(rs);
	//	}
	//	return sb.toString();
	//}

	public String getPrivileges(String name) {
		String[] nameStr = name.split("\\.",3);
		StringBuffer sb = new StringBuffer();
		ActionContext ctx = ActionContext.getContext();
		HttpServletRequest request = (HttpServletRequest)ctx.get(ServletActionContext.HTTP_REQUEST);
		HttpSession session = request.getSession();
		UserBean ub = (UserBean)session.getAttribute("user");
		String sql = null;
		ResultSet rs = null;

		try{
			//String obj = null;
			String allObj = "all_tab_privs";
			if(ub.getDbglobal()) {
				allObj = "all_tab_privs";
				sql = "select privilege,grantable from " + allObj + " where table_name='" + name + "' and grantee='" + this.name.toUpperCase() + "' order by privilege";
			} else {
				allObj = "user_tab_privs";
				sql = "select privilege,grantable from " + allObj + " where table_name='" + name + "' and grantee='" + this.name.toUpperCase() + "' order by privilege";
			}
			if (nameStr.length == 2) {
				sql = "select privilege,grantable from " + allObj + " where table_name='" + nameStr[1] + "'and grantor='" + nameStr[0] + "'  and grantee='" + this.name.toUpperCase()  + "' order by privilege";
			} else {
				sql = "select privilege,grantable from " + allObj + " where table_name='" + name + "' and grantee='" + this.name.toUpperCase() + "' order by privilege";
			}

			rs = ub.getDb().getRS(sql);
			int i = 0;
			while(rs.next()){
				i = 1;
				String grantable = "";
				if (CharSet.nullToEmpty(rs.getString(2)).equals("YES")) grantable = "(GRANTABLE)";
				sb.append("<tree text=\""+CharSet.nullToEmpty(rs.getString(1)) +  grantable + "\"  icon=\""+ ICON_PARAMTER +"\"  openIcon=\""+ ICON_PARAMTER +"\" />");
			}
			if (i == 0) sb.append("<tree text=\"Nodata\" />");
		}catch(Exception e){
			throw new RuntimeException(e);
		}finally{
			if(rs != null) ub.getDb().close(rs);
		}
		return sb.toString();
	}

	public String getSubPrivileges(String name) {
		String[] nameStr = name.split("\\.",3);
		StringBuffer sb = new StringBuffer();
		ActionContext ctx = ActionContext.getContext();
		HttpServletRequest request = (HttpServletRequest)ctx.get(ServletActionContext.HTTP_REQUEST);
		HttpSession session = request.getSession();
		UserBean ub = (UserBean)session.getAttribute("user");
		String sql = null;
		ResultSet rs = null;

		try{
			//String obj = null;
			String allObj = "all_tab_privs";
			if(ub.getDbglobal()) {
				//obj = "all_tab_privs";
				sql = "select privilege,grantable from " + allObj + " where table_schema='" + nameStr[0] + "' and grantee='" + nameStr[2] + "' and table_name='" + nameStr[1] + "' order by privilege asc";
			} else {
				sql = "select privilege,grantable from " + allObj + " where table_schema='" + nameStr[0] + "' and grantee='" + nameStr[2] + "' and table_name='" + nameStr[1] + "' order by privilege asc";
			}
			rs = ub.getDb().getRS(sql);
			int i = 0;
			while(rs.next()){
				i = 1;
				String grantable = "";
				if (CharSet.nullToEmpty(rs.getString(2)).equals("YES")) grantable = " (GRANTABLE)";
				sb.append("<tree text=\""+CharSet.nullToEmpty(rs.getString(1)) +  grantable + "\"  icon=\""+ ICON_PARAMTER +"\"  openIcon=\""+ ICON_PARAMTER +"\" />");
			}
			if (i == 0) sb.append("<tree text=\"Nodata\" />");
		}catch(Exception e){
			throw new RuntimeException(e);
		}finally{
			if(rs != null) ub.getDb().close(rs);
		}
		return sb.toString();
	}

	public String getObjectPrivileges(String name) {
		StringBuffer sb = new StringBuffer();
		ActionContext ctx = ActionContext.getContext();
		HttpServletRequest request = (HttpServletRequest)ctx.get(ServletActionContext.HTTP_REQUEST);
		HttpSession session = request.getSession();
		UserBean ub = (UserBean)session.getAttribute("user");
		String sql = null;
		ResultSet rs = null;

		try{
			//String obj = null;
			String allObj = "dba_objects";
			if(ub.getDbglobal()) {
				//obj = "all_tab_privs";
				sql = "select owner||'.'||object_name object_name,object_type from " + allObj + " where 1=1 " +
						" and owner != '" + this.name.toUpperCase() + "' and object_type !='SYNONYM' and object_type != 'QUEUE' and object_type != 'PACKAGE BODY' and object_type != 'TYPE BODY'" +
						" and object_name in (select table_name from ALL_TAB_PRIVS where grantee = '" + this.name.toUpperCase() + "') " +
						" order by object_type,owner,object_name asc";

			} else {
				sql = "select owner||'.'||object_name object_name,object_type from " + allObj + " where 1=1 " +
						" and owner != '" + this.name.toUpperCase() + "' and object_type !='SYNONYM' and object_type != 'QUEUE' and object_type != 'PACKAGE BODY' and object_type != 'TYPE BODY'" +
						" and object_name in (select table_name from ALL_TAB_PRIVS where grantee = '" + this.name.toUpperCase() + "') " +
						" order by object_type,owner,object_name asc";
			}
			rs = ub.getDb().getRS(sql);
			int i = 0;
			while(rs.next()){
				i = 1;
				String tmpIcon = ICON_PARAMTER;
				String granType = "";
				//if (CharSet.nullToEmpty(rs.getString(2)).equals("YES")) grantable = "(GRANTABLE)";
				for (int j = 0; j < OBJ_TPYES.length; j++ ) {
					if (CharSet.nullToEmpty(rs.getString(2)).equals(OBJ_TPYES[j])) {
						tmpIcon = ICON_A[j];
						granType = rs.getString(1) + "." + this.name.toUpperCase();
						j = OBJ_TPYES.length;
					}
				}
				//sb.append("<tree text=\""+CharSet.nullToEmpty(rs.getString(1))  + "\" icon=\""+ tmpIcon +"\"  openIcon=\""+ tmpIcon +"\" />");
				sb.append("<tree text=\""+ CharSet.nullToEmpty(rs.getString(1)) + "\" src=\"showTree.action?type=" + TYPESUB +"&amp;name="+ granType +"&amp;field="+ "" +"\"  icon=\""+ tmpIcon +"\"  openIcon=\""+ tmpIcon + "\" onblur=\"hideMenu()\" onmouseover=\"showAppointedMenu('"+TYPE+"','"+name+"','"+FIELDS[1]+"',event)\" />");

			}
			if (i == 0) sb.append("<tree text=\"Nodata\" />");
		}catch(Exception e){
			throw new RuntimeException(e);
		}finally{
			if(rs != null) ub.getDb().close(rs);
		}
		return sb.toString();
	}


	public String getSysPrivileges(String name) {
		StringBuffer sb = new StringBuffer();
		ActionContext ctx = ActionContext.getContext();
		HttpServletRequest request = (HttpServletRequest)ctx.get(ServletActionContext.HTTP_REQUEST);
		HttpSession session = request.getSession();
		UserBean ub = (UserBean)session.getAttribute("user");
		String sql = null;
		ResultSet rs = null;

		try{
			//String obj = null;
			String allObj = "dba_sys_privs";
			if(ub.getDbglobal()) {
				//obj = "all_tab_privs";
				//sql = "select privilege,grantable from " + allObj + " where table_name='" + name + "' and grantee='" + this.name.toUpperCase() + "' order by privilege";
				sql = "select privilege, admin_option from " + allObj + " where grantee='" + this.name.toUpperCase() + "' order by privilege asc";

			} else if (!name.equals("")) {
				//sql = "select privilege,grantable from " + allObj + " where table_name='" + name + "' and grantee='" + this.name.toUpperCase() + "' order by privilege";
				sql = "select privilege, admin_option from " + allObj + " where grantee='" + this.name.toUpperCase() + "' order by privilege asc";

			} else {
				allObj = "user_sys_privs";
				sql = "select privilege, admin_option from " + allObj + " order by privilege asc";

			}
			rs = ub.getDb().getRS(sql);
			int i = 0;
			while(rs.next()){
				i = 1;
				String grantable = "";
				//if (CharSet.nullToEmpty(rs.getString(2)).equals("YES")) grantable = "(DEFAULT)";
				sb.append("<tree text=\""+CharSet.nullToEmpty(rs.getString(1)) +  grantable + "\" icon=\""+ ICON_PARAMTER +"\"  openIcon=\""+ ICON_PARAMTER +"\" />");
			}
			if (i == 0) sb.append("<tree text=\"Nodata\" />");
		}catch(Exception e){
			throw new RuntimeException(e);
		}finally{
			if(rs != null) ub.getDb().close(rs);
		}
		return sb.toString();
	}


	public String getRoleGrant(String name) {
		StringBuffer sb = new StringBuffer();
		ActionContext ctx = ActionContext.getContext();
		HttpServletRequest request = (HttpServletRequest)ctx.get(ServletActionContext.HTTP_REQUEST);
		HttpSession session = request.getSession();
		UserBean ub = (UserBean)session.getAttribute("user");
		String sql = null;
		ResultSet rs = null;

		try{
			//String obj = null;
			String allObj = "dba_role_privs";
			if(ub.getDbglobal()) {
				//obj = "all_tab_privs";
				sql = "select granted_role,default_role from " + allObj + " where grantee='" + this.name.toUpperCase() + "' order by granted_role asc";
			} else if (!name.equals("")) {
				sql = "select granted_role,default_role from " + allObj + " where grantee='" + this.name.toUpperCase() + "' order by granted_role asc";
			} else {
				allObj = "user_role_privs";
				sql = "select granted_role,default_role from " + allObj + " order by granted_role asc";
			}
			rs = ub.getDb().getRS(sql);
			int i = 0;
			while(rs.next()){
				i = 1;
				String grantable = "";
				if (CharSet.nullToEmpty(rs.getString(2)).equals("YES")) grantable = " (DEFAULT)";
				sb.append("<tree text=\""+CharSet.nullToEmpty(rs.getString(1)) +  grantable + "\" icon=\""+ ICON_ROLES +"\"  openIcon=\""+ ICON_ROLES +"\" />");
			}
			if (i == 0) sb.append("<tree text=\"Nodata\" />");
		}catch(Exception e){
			throw new RuntimeException(e);
		}finally{
			if(rs != null) ub.getDb().close(rs);
		}
		return sb.toString();
	}

}
