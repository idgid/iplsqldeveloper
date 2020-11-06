package org.reddragonfly.iplsqldevj.bean.dbbean;

import com.opensymphony.xwork2.ActionContext;
import org.apache.struts2.ServletActionContext;
import org.reddragonfly.iplsqldevj.bean.CharSet;
import org.reddragonfly.iplsqldevj.bean.UserBean;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.ResultSet;

public class DbIndexBean extends DbBean {

	public static String TYPE = "index";
	public static String ICON_INVALID = "dbimages/index.png";
	public static String ICON_VALID = "dbimages/index.png";
	public static String ICON_PARAMTER = "dbimages/parameter.png";
	public static String ICON_COLUMN_CHAR = "dbimages/char.png";
	public static String ICON_COLUMN_DATE = "dbimages/date.png";
	public static String ICON_COLUMN_NUMBER = "dbimages/number.png";
	public static String ICON_COLUMN_BLOB = "dbimages/blob.png";
	public static String ICON_COLUMN_OBJ = "dbimages/obj.png";
	public static String ICON_INDEX = "dbimages/index.png";
	public static String ICON_TABLE = "dbimages/valid_queue_tables.png";


	protected static String[] FIELDS =
	    {"Columns","Table"};
	protected static String[] COLUMN_TYPE =
			{"binary_double","binary_float","blob","clob","char","date","interval day to second","interval year to month","long","long raw","nclob","number","nvarchar2","raw","timestamp","timestamp with local time zone","timestamp with time zone","varchar2"};


	protected String name = "";
	public DbIndexBean(String name){
		this.name = name;
	}

	public String getTreeXml() {
		// TODO Auto-generated method stub
		StringBuffer sb = new StringBuffer();
		sb.append("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
		sb.append("<tree>");
		for(int i = 0;i < FIELDS.length;i++){
			//客户端脚本已经重写了onmouseover事件，事实上在客户端为onmouseup事件，这是出于鼠标右键的考虑
			sb.append("<tree text=\""+FIELDS[i]+"\" src=\"showTree.action?type="+TYPE+"&amp;name="+name.replaceAll("#","%23")+"&amp;field="+FIELDS[i]+"\" onblur=\"hideMenu()\" onmouseover=\"showAppointedMenu('"+TYPE+"','"+name+"','"+FIELDS[i]+"',event)\" />");
		}
		sb.append("</tree>");
		return sb.toString();
	}

	public String getTreeXmlN() {
		// TODO Auto-generated method stub
		StringBuffer sb = new StringBuffer();
		sb.append("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
		sb.append("<tree>");
		for(int i = 0;i < FIELDS.length;i++){
			//客户端脚本已经重写了onmouseover事件，事实上在客户端为onmouseup事件，这是出于鼠标右键的考虑
			sb.append("<item id=\""+ i +"\" text=\""+FIELDS[i]+"\" src=\"showTree.action?type="+TYPE+"&amp;name="+name+"&amp;field="+FIELDS[i]+"\" onblur=\"hideMenu()\" onmouseover=\"showAppointedMenu('"+TYPE+"','"+name+"','"+FIELDS[i]+"',event)\" />");
		}
		sb.append("</tree>");
		return sb.toString();
	}

	public String getFieldTreeXml(String fieldName) {
		// TODO Auto-generated method stub
		StringBuffer sb = new StringBuffer();
		sb.append("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
		sb.append("<tree>");
		//System.out.println(name);
		if(fieldName.equals(FIELDS[0])) {
			sb.append(getColumns(name));
		}
		if(fieldName.equals(FIELDS[1])) {
			sb.append(getTable(name));
		}
		sb.append("</tree>");
		return sb.toString();
	}

	public String getMenuScript(){
		StringBuffer returnVal = new StringBuffer();
		returnVal.append("myMenu.width = 200;");
		returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
		returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		returnVal.append("myMenu.add(new WebFXMenuSeparator());");
		returnVal.append("myMenu.add(new WFXMI(\"Properties\"));");
		returnVal.append("myMenu.add(new WebFXMenuSeparator());");
		returnVal.append("myMenu.add(new WFXMI(\"View\"));");
		returnVal.append("myMenu.add(new WFXMI(\"Edit\"));");
		returnVal.append("myMenu.add(new WFXMI(\"Rename\"));");
		returnVal.append("myMenu.add(new WFXMI(\"Drop\",\"javascript:showCommon('"+TYPE+"','"+name+"','','Drop','500px','120px');\"));");
		returnVal.append("myMenu.add(new WFXMI(\"Browse\"));");

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
		}
		return returnVal.toString();
	}

	public String getColumns(String name) {
		StringBuffer sb = new StringBuffer();
		ActionContext ctx = ActionContext.getContext();
		HttpServletRequest request = (HttpServletRequest)ctx.get(ServletActionContext.HTTP_REQUEST);
		HttpSession session = request.getSession();
		UserBean ub = (UserBean)session.getAttribute("user");
		String sql = null;
		ResultSet rs = null;

		try{
			String obj = null;
			String columnIcon = ICON_COLUMN_CHAR;
			String foreignTable = "";
			if(ub.getDbglobal()) {
				obj = "all_ind_columns";
			} else {
				obj = "all_ind_columns";
			}
			String[] field = name.split("\\.",2);
			if(field[0].equals(name)) {
				sql = "select utc.column_name,utc.data_type, " +
						"(select ucons.table_name from user_constraints ucons where (ucons.owner,ucons.constraint_name) in " +
						"(select cons.r_owner,cons.r_constraint_name  from user_constraints cons where cons.owner=ucc.index_owner and constraint_name=ucc.index_name)) foreigntable " +
						"from " + obj + " ucc, all_tab_columns utc where ucc.index_owner='" + ub.getUsername().toUpperCase() + "' and ucc.index_name='" + name + "' " +
						"and ucc.table_name = utc.table_name and ucc.column_name = utc.column_name and utc.owner = ucc.index_owner";


			} else {
				sql = "select utc.column_name,utc.data_type, " +
						"(select ucons.table_name from user_constraints ucons where (ucons.owner,ucons.constraint_name) in " +
						"(select cons.r_owner,cons.r_constraint_name  from user_constraints cons where cons.owner=ucc.index_owner and constraint_name=ucc.index_name)) foreigntable " +
						"from " + obj + " ucc, all_tab_columns utc where ucc.index_owner='" + field[0] + "' and ucc.index_name='" + field[1] + "' " +
						"and ucc.table_name = utc.table_name and ucc.column_name = utc.column_name and utc.owner = ucc.index_owner";
			}
			rs = ub.getDb().getRS(sql);
			int i = 0;
			while(rs.next()){
				i = 1;
				columnIcon = getColumnTypeIcon(CharSet.nullToEmpty(rs.getString(2)));
				if(CharSet.nullToEmpty(rs.getString(3)).equals("")) foreignTable = "";
				else foreignTable = "(" + CharSet.nullToEmpty(rs.getString(3)) + ")";
				sb.append("<tree text=\"" + CharSet.nullToEmpty(rs.getString(1)) + foreignTable + "\" icon=\""+ columnIcon +"\"  openIcon=\""+ columnIcon +"\" />");
			}
			if (i == 0) sb.append("<tree text=\"Nodata\" />");
		}catch(Exception e){
			throw new RuntimeException(e);
		}finally{
			if(rs != null) ub.getDb().close(rs);
		}
		return sb.toString();
	}

	public String getTable(String name) {
		StringBuffer sb = new StringBuffer();
		ActionContext ctx = ActionContext.getContext();
		HttpServletRequest request = (HttpServletRequest)ctx.get(ServletActionContext.HTTP_REQUEST);
		HttpSession session = request.getSession();
		UserBean ub = (UserBean)session.getAttribute("user");
		String sql = null;
		ResultSet rs = null;

		try{
			String obj = null;
			String columnIcon = ICON_COLUMN_CHAR;
			String subType = "table";
			String foreignTable = "";
			if(ub.getDbglobal()) {
				obj = "all_ind_columns";
			} else {
				obj = "all_ind_columns";
			}
			String[] field = name.split("\\.",2);
			if(field[0].equals(name)) {
				sql = "select distinct ucc.table_owner,utc.table_name, " +
						"(select ucons.table_name from user_constraints ucons where (ucons.owner,ucons.constraint_name) in " +
						"(select cons.r_owner,cons.r_constraint_name  from user_constraints cons where cons.owner=ucc.index_owner and constraint_name=ucc.index_name)) foreigntable " +
						"from " + obj + " ucc, all_tab_columns utc where ucc.index_owner='" + ub.getUsername().toUpperCase() + "' and ucc.index_name='" + name + "' " +
						"and ucc.table_name = utc.table_name and ucc.column_name = utc.column_name and utc.owner = ucc.index_owner";
			} else {
				sql = "select distinct ucc.table_owner,utc.table_name, " +
						"(select ucons.table_name from user_constraints ucons where (ucons.owner,ucons.constraint_name) in " +
						"(select cons.r_owner,cons.r_constraint_name  from user_constraints cons where cons.owner=ucc.index_owner and constraint_name=ucc.index_name)) foreigntable " +
						"from " + obj + " ucc, all_tab_columns utc where ucc.index_owner='" + field[0] + "' and ucc.index_name='" + field[1] + "' " +
						"and ucc.table_name = utc.table_name and ucc.column_name = utc.column_name and utc.owner = ucc.index_owner";
			}
			rs = ub.getDb().getRS(sql);
			int i = 0;
			while(rs.next()){
				i = 1;
				String objectName = "";
				columnIcon = ICON_TABLE;
				//if(CharSet.nullToEmpty(rs.getString(3)).equals("")) foreignTable = "";
				//else foreignTable = "(" + CharSet.nullToEmpty(rs.getString(3)) + ")";

				if (CharSet.nullToEmpty(rs.getString(1)).equals(ub.getUsername().toUpperCase())) objectName = CharSet.nullToEmpty(rs.getString(2));
				else objectName = CharSet.nullToEmpty(rs.getString(1)) + "." + CharSet.nullToEmpty(rs.getString(2));

				//sb.append("<tree text=\"" + objectName + foreignTable + "\" icon=\""+ columnIcon +"\"  openIcon=\""+ columnIcon +"\" 	/>");
				sb.append("<tree text=\""+ objectName +"\" src=\"showTree.action?type="+subType+"&amp;name="+objectName.replaceAll("#","%23")+"&amp;field=\" icon=\""+ columnIcon +"\"  openIcon=\""+ columnIcon +"\" onblur=\"hideMenu()\" onmouseover=\"showAppointedMenu('"+subType+"','"+objectName+"','',event)\" />");

			}
			if (i == 0) sb.append("<tree text=\"Nodata\" />");
		}catch(Exception e){
			throw new RuntimeException(e);
		}finally{
			if(rs != null) ub.getDb().close(rs);
		}
		return sb.toString();
	}

	public static String getColumnTypeIcon(String columnDataType) {
		String columnIcon=ICON_COLUMN_CHAR;
		if (columnDataType.equals(COLUMN_TYPE[0].toUpperCase()) || columnDataType.equals(COLUMN_TYPE[1].toUpperCase())
				|| columnDataType.equals(COLUMN_TYPE[2].toUpperCase()) || columnDataType.equals(COLUMN_TYPE[9].toUpperCase())
				|| columnDataType.equals(COLUMN_TYPE[13].toUpperCase())) {
			columnIcon = ICON_COLUMN_BLOB;
		} else if (columnDataType.equals(COLUMN_TYPE[3].toUpperCase()) || columnDataType.equals(COLUMN_TYPE[4].toUpperCase())
				|| columnDataType.equals(COLUMN_TYPE[8].toUpperCase()) || columnDataType.equals(COLUMN_TYPE[12].toUpperCase())
				|| columnDataType.equals(COLUMN_TYPE[17].toUpperCase())) {
			columnIcon = ICON_COLUMN_CHAR;
		} else if (columnDataType.equals(COLUMN_TYPE[11].toUpperCase())) {
			columnIcon = ICON_COLUMN_NUMBER;
		} else if (columnDataType.equals(COLUMN_TYPE[10].toUpperCase())) {
			columnIcon = ICON_COLUMN_OBJ;
		} else {
			columnIcon = ICON_COLUMN_DATE;
		}
		return columnIcon;
	}

}
