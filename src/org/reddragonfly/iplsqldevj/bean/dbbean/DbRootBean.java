package org.reddragonfly.iplsqldevj.bean.dbbean;

import java.sql.ResultSet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import jxl.biff.drawing.Chart;
import org.apache.struts2.ServletActionContext;
import org.reddragonfly.iplsqldevj.bean.CharSet;
import org.reddragonfly.iplsqldevj.bean.UserBean;
import com.opensymphony.xwork2.ActionContext;

public class DbRootBean extends DbBean{

	public static String TYPE = "root";

	protected static String[] FIELDS =
	    {"Recent objects","Recycle bin","Functions","Procedures","Packages","Package bodies","Types","Type bodies",
		"Triggers","Java sources","Jobs","Queues","Queue tables","Libraries","Directories","Tables","Indexes","Constraints","Views","Materialized views",
		"Sequences","Users","Profiles","Roles","Synonyms","Database links","Tablespaces","Clusters"};
	protected static String[] USERFIELDS =
			{"Functions","Procedures","Packages","Package bodies","Types","Type bodies",
					"Triggers","Java sources","Jobs","Queues","Queue tables","Libraries","Directories","Tables","Indexes","Constraints","Views","Materialized views",
					"Sequences","Synonyms","Database links","Tablespaces","Clusters"};

	protected String name = "";
	public DbRootBean(String name){
		this.name = name;
	}

	public String getTreeXml(){
		StringBuffer sb = new StringBuffer();
		sb.append("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
		sb.append("<tree>");
		if (name.equals("") || name.equals(null)) {
			sb.append("<tree text=\""+FIELDS[0]+"\" />");
			sb.append("<tree text=\""+FIELDS[1]+"\" />");
			for(int i = 2;i < FIELDS.length;i++){
				//客户端脚本已经重写了onmouseover事件，事实上在客户端为onmouseup事件，这是出于鼠标右键的考虑
				sb.append("<tree text=\""+FIELDS[i]+"\" src=\"showTree.action?type="+TYPE+"&amp;name="+name.replaceAll("#","%23")+"&amp;field="+FIELDS[i]+"\" onblur=\"hideMenu()\" onmouseover=\"showAppointedMenu('"+TYPE+"','"+name+"','"+FIELDS[i]+"',event)\" />");
			}
		} else {
			for(int i = 0;i < USERFIELDS.length;i++){
				//客户端脚本已经重写了onmouseover事件，事实上在客户端为onmouseup事件，这是出于鼠标右键的考虑
				sb.append("<tree text=\""+USERFIELDS[i]+"\" src=\"showTree.action?type="+TYPE+"&amp;name="+name.replaceAll("#","%23")+"&amp;field="+USERFIELDS[i]+"\" onblur=\"hideMenu()\" onmouseover=\"showAppointedMenu('"+TYPE+"','"+name+"','"+USERFIELDS[i]+"',event)\" />");
			}
		}

		sb.append("</tree>");
		return sb.toString();
	}

	public String getTreeXmlN(){
		StringBuffer sb = new StringBuffer();
		sb.append("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
		sb.append("<tree>");
		sb.append("<item id=\"1\" text=\""+FIELDS[0]+"\" > <userdata type=\"folder\"/></item>");
		sb.append("<item id=\"2\" text=\""+FIELDS[1]+"\" > <userdata type=\"folder\"/></item>");
		for(int i = 3;i < FIELDS.length;i++){
			//客户端脚本已经重写了onmouseover事件，事实上在客户端为onmouseup事件，这是出于鼠标右键的考虑
			sb.append("<item id=\""+ i +"\" text=\""+FIELDS[i]+"\" src=\"showTree.action?type="+TYPE+"&amp;name="+name+"&amp;field="+FIELDS[i]+"\" onblur=\"hideMenu()\" onmouseover=\"showAppointedMenu('"+TYPE+"','"+name+"','"+FIELDS[i]+"',event)\" kids=\"true\">");
			//sb.append("<userdata type=\"folder\"/>");
            sb.append("</item>");
		}
		sb.append("</tree>");
		return sb.toString();
	}

	public String getFieldTreeXml(String fieldName){
		StringBuffer sb = new StringBuffer();
		sb.append("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
		sb.append("<tree>");
		ActionContext ctx = ActionContext.getContext();
		HttpServletRequest request = (HttpServletRequest)ctx.get(ServletActionContext.HTTP_REQUEST);
		HttpSession session = request.getSession();
		UserBean ub = (UserBean)session.getAttribute("user");
		String sql = null;
		String validIcon = null;
		String inValidIcon = null;
		String validIconDisable = null;
		String inValidIconDisable = null;
		String subType = null;
		//phanrider 修改 object_name 由owner||'.'||object_name组成，这样properties与describe处理ALL OBJECTS时才能正常显示 2009-07-20
		//对于as sysoper 这一问题有bug

		String ubname = ub.getUsername().toUpperCase();
		String[] ownerName=ubname.split("\\ ",2);
		ubname = ownerName[0];
		if(fieldName.equals(FIELDS[2])){    //Functions
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'FUNCTION' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'FUNCTION' and owner != '"+ubname+"' order by object_name asc)";
			else if (!name.equals("")) {
				sql = "select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'FUNCTION' and owner = '" + name + "' order by object_name asc) ";
			} else {
				sql = "select object_name,status from user_objects where object_type = 'FUNCTION' order by object_name asc";
			}
			validIcon = DbFunctionBean.ICON_VALID;
			inValidIcon = DbFunctionBean.ICON_INVALID;
			subType = DbFunctionBean.TYPE;
		}else if(fieldName.equals(FIELDS[3])){   //Procedures
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'PROCEDURE' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'PROCEDURE' and owner != '"+ubname+"' order by object_name asc)";
			else if (!name.equals("")) {
				sql = "select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'PROCEDURE' and owner = '"+name+"' order by object_name asc)";
			} else sql = "select object_name,status from user_objects where object_type = 'PROCEDURE' order by object_name asc";
			validIcon = DbProcedureBean.ICON_VALID;
			inValidIcon = DbProcedureBean.ICON_INVALID;
			subType = DbProcedureBean.TYPE;
		}else if(fieldName.equals(FIELDS[4])){   //Packages
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'PACKAGE' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'PACKAGE' and owner != '"+ubname+"' order by object_name asc)";
			else if (!name.equals("")) {
				sql = "select * from (select owner||'.'||object_name object_name,status from dba_objects where object_type = 'PACKAGE' and owner = '"+name+"' order by object_name asc)";
			}else sql = "select object_name,status from user_objects where object_type = 'PACKAGE' order by object_name asc";
			validIcon = DbPackageBean.ICON_VALID;
			inValidIcon = DbPackageBean.ICON_INVALID;
			subType = DbPackageBean.TYPE;
		}else if(fieldName.equals(FIELDS[5])){   //Package bodies
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'PACKAGE BODY' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'PACKAGE BODY' and owner != '"+ubname+"' order by object_name asc)";
			else if (!name.equals("")) {
				sql = "select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'PACKAGE BODY' and owner = '"+name+"' order by object_name asc)";
			}else sql = "select object_name,status from user_objects where object_type = 'PACKAGE BODY' order by object_name asc";
			validIcon = DbPackagebodyBean.ICON_VALID;
			inValidIcon = DbPackagebodyBean.ICON_INVALID;
			subType = DbPackagebodyBean.TYPE;
		}else if(fieldName.equals(FIELDS[6])){   //Types
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'TYPE' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'TYPE' and owner != '"+ubname+"' order by object_name asc)";
			else if (!name.equals("")) {
				sql = "select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'TYPE' and owner = '"+name+"' order by object_name asc)";
			}else sql = "select object_name,status from user_objects where object_type = 'TYPE' order by object_name asc";
			validIcon = DbTypeBean.ICON_VALID;
			inValidIcon = DbTypeBean.ICON_INVALID;
			subType = DbTypeBean.TYPE;
		}else if(fieldName.equals(FIELDS[7])){   //Type bodies
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'TYPE BODY' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'TYPE BODY' and owner != '"+ubname+"' order by object_name asc)";
			else if (!name.equals("")) {
				sql = "select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'TYPE BODY' and owner = '"+name+"' order by object_name asc)";
			}else sql = "select object_name,status from user_objects where object_type = 'TYPE BODY' order by object_name asc";
			validIcon = DbTypebodyBean.ICON_VALID;
			inValidIcon = DbTypebodyBean.ICON_INVALID;
			subType = DbTypebodyBean.TYPE;
		}else if(fieldName.equals(FIELDS[8])){   //Triggers
			if(ub.getDbglobal()) sql = "select * from (select object_name,status,(select status from user_triggers utr where utr.trigger_name=uob.object_name and rownum=1) isenable  from user_objects uob where object_type = 'TRIGGER' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status,(select status from all_triggers atr where atr.trigger_name=aob.object_name and atr.owner = aob.owner and rownum=1) isenable from all_objects aob where object_type = 'TRIGGER' and owner != '"+ubname+"' order by object_name asc)";
			else if (!name.equals("")) {
				sql = "select * from (select owner||'.'||object_name object_name,status,(select status from all_triggers atr where atr.trigger_name=aob.object_name and atr.owner = aob.owner and rownum=1) isenable from all_objects aob where object_type = 'TRIGGER' and owner != '"+name+"' order by object_name asc)";
			}else sql = "select object_name,status,(select status from user_triggers utr where utr.trigger_name=uob.object_name and rownum=1) isenable  from user_objects uob where object_type = 'TRIGGER' order by object_name asc";
			validIcon = DbTriggerBean.ICON_VALID;
			inValidIcon = DbTriggerBean.ICON_INVALID;
			validIconDisable = DbTriggerBean.ICON_VALID_DISABLE;
			inValidIconDisable = DbTriggerBean.ICON_INVALID_DISABLE;
			subType = DbTriggerBean.TYPE;
		}else if(fieldName.equals(FIELDS[9])){   //Java sources
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'JAVA SOURCE' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'JAVA SOURCE' and owner != '"+ubname+"' order by object_name asc)";
			else if (!name.equals("")) {
				sql = "select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'JAVA SOURCE' and owner = '"+name+"' order by object_name asc)";
			}else sql = "select object_name,status from user_objects where object_type = 'JAVA SOURCE' order by object_name asc";
			validIcon = DbJavaSourceBean.ICON_VALID;
			inValidIcon = DbJavaSourceBean.ICON_INVALID;
			subType = DbJavaSourceBean.TYPE;
		}else if(fieldName.equals(FIELDS[10])){  //Jobs
			if(ub.getDbglobal()) sql = "select job,'VALID' from all_jobs order by job asc";
			else if (!name.equals("")) {
				sql = "select * from (select priv_user||'.'||job,'VALID' from all_jobs where 1=1 and priv_user = '"+name+"' order by job asc)";
			}else sql = "select job,'VALID' from user_jobs order by job asc";
			validIcon = DbJobBean.ICON_VALID;
			inValidIcon = DbJobBean.ICON_INVALID;
			subType = DbJobBean.TYPE;
		}else if(fieldName.equals(FIELDS[11])){  //Queues
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'QUEUE' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'QUEUE' and owner != '"+ubname+"' order by object_name asc)";
			else if (!name.equals("")) {
				sql = "select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'QUEUE' and owner = '"+name+"' order by object_name asc)";
			}else sql = "select object_name,status from user_objects where object_type = 'QUEUE' order by object_name asc";
			validIcon = DbQueueBean.ICON_VALID;
			inValidIcon = DbQueueBean.ICON_INVALID;
			subType = DbQueueBean.TYPE;
		}else if(fieldName.equals(FIELDS[12])){  //Queue tables
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'QUEUE TABLE' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'QUEUE TABLE' and owner != '"+ubname+"' order by object_name asc)";
			else if (!name.equals("")) {
				sql = "select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'QUEUE TABLE' and owner = '"+name+"' order by object_name asc)";
			}else sql = "select object_name,status from user_objects where object_type = 'QUEUE TABLE' order by object_name asc";
			validIcon = DbQueueTableBean.ICON_VALID;
			inValidIcon = DbQueueTableBean.ICON_INVALID;
			subType = DbQueueTableBean.TYPE;
		}else if(fieldName.equals(FIELDS[13])){  //Libraries
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'LIBRARY' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'LIBRARY' and owner != '"+ubname+"' order by object_name asc)";
			else if (!name.equals("")) {
				sql = "select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'LIBRARY' and owner = '"+name+"' order by object_name asc)";
			}else sql = "select object_name,status from user_objects where object_type = 'LIBRARY' order by object_name asc";
			validIcon = DbLibraryBean.ICON_VALID;
			inValidIcon = DbLibraryBean.ICON_INVALID;
			subType = DbLibraryBean.TYPE;
		}else if(fieldName.equals(FIELDS[14])){  //Directories
			if(ub.getDbglobal()) sql = "select object_name,status from all_objects where object_type = 'DIRECTORY' order by object_name asc";
			else if (!name.equals("")) {
				sql = "select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'DIRECTORY' and owner = '"+name+"' order by object_name asc)";
			}else sql = "select * from (select object_name,status from user_objects where object_type = 'DIRECTORY' order by object_name asc) " +
					"union all " +
					"select * from (select object_name,status from all_objects where object_type = 'DIRECTORY' order by object_name asc)";
			validIcon = DbDirectoryBean.ICON_VALID;
			inValidIcon = DbDirectoryBean.ICON_INVALID;
			subType = DbDirectoryBean.TYPE;
		}else if(fieldName.equals(FIELDS[15])){  //Tables
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from all_objects where object_type = 'TABLE' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'TABLE' and owner != '"+ubname+"' order by object_name asc)";
			else if (!name.equals("")) {
				sql = "select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'TABLE' and owner = '"+name+"' order by owner asc, object_name asc)";
			}else sql = "select object_name,status from user_objects where object_type = 'TABLE' order by object_name asc";
			validIcon = DbTableBean.ICON_VALID;
			inValidIcon = DbTableBean.ICON_INVALID;
			subType = DbTableBean.TYPE;
		}else if(fieldName.equals(FIELDS[16])){  //Indexes
			if(ub.getDbglobal()) sql = "select * from (select index_name,status from user_indexes where index_type != 'LOB' order by index_name asc) " +
					"union all " +
					"select * from (select owner||'.'||index_name, status from all_indexes where index_type != 'LOB' and owner != '"+ubname+"' order by owner asc, index_name asc)";
			else if (!name.equals("")) {
				sql = "select * from (select owner||'.'||index_name, status from all_indexes where index_type != 'LOB' and owner = '"+name+"' order by index_name asc)";
			}else sql = "select index_name,status from user_indexes where index_type != 'LOB' order by index_name asc";
			validIcon = DbIndexBean.ICON_VALID;
			inValidIcon = DbIndexBean.ICON_INVALID;
			subType = DbIndexBean.TYPE;
		}else if(fieldName.equals(FIELDS[17])){  //Constraints
			if(ub.getDbglobal()) sql = "select * from (select constraint_name, decode(status,'DISABLED','INVALID',status) status from user_constraints where constraint_name not like 'BIN$%==$0' order by constraint_name asc) " +
					"union all " +
					"select * from (select owner||'.'||constraint_name, decode(status,'DISABLED','INVALID',status) status from all_constraints where constraint_name not like 'BIN$%==$0' and owner != '"+ubname+"' order by owner asc, constraint_name asc)";
			else if (!name.equals("")) {
				sql = "select * from (select owner||'.'||constraint_name, decode(status,'DISABLED','INVALID',status) status from all_constraints where constraint_name not like 'BIN$%==$0' and owner = '"+name+"' order by constraint_name asc)";
			}else sql = "select constraint_name, decode(status,'DISABLED','INVALID',status) status from user_constraints where constraint_name not like 'BIN$%==$0' order by constraint_name asc";
			validIcon = DbConstraintBean.ICON_VALID;
			inValidIcon = DbConstraintBean.ICON_INVALID;
			subType = DbConstraintBean.TYPE;
		}else if(fieldName.equals(FIELDS[18])){  //Views
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'VIEW' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'VIEW' and owner != '"+ubname+"' order by object_name asc)";
			else if (!name.equals("")) {
				sql = "select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'VIEW' and owner = '"+name+"' order by object_name asc)";
			}else sql = "select object_name,status from user_objects where object_type = 'VIEW' order by object_name asc";
			validIcon = DbViewBean.ICON_VALID;
			inValidIcon = DbViewBean.ICON_INVALID;
			subType = DbViewBean.TYPE;
		}else if(fieldName.equals(FIELDS[19])){  //Materialized views
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'MATERIALIZED VIEW' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'MATERIALIZED VIEW' and owner != '"+ubname+"' order by object_name asc)";
			else if (!name.equals("")) {
				sql = "select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'MATERIALIZED VIEW' and owner = '"+name+"' order by object_name asc)";
			}else sql = "select object_name,status from user_objects where object_type = 'MATERIALIZED VIEW' order by object_name asc";
			validIcon = DbMaterializedViewBean.ICON_VALID;
			inValidIcon = DbMaterializedViewBean.ICON_INVALID;
			subType = DbMaterializedViewBean.TYPE;
		}else if(fieldName.equals(FIELDS[20])){  //Sequences
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'SEQUENCE' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'SEQUENCE' and owner != '"+ubname+"' order by object_name asc)";
			else if (!name.equals("")) {
				sql = "select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'SEQUENCE' and owner = '"+name+"' order by object_name asc)";
			}else sql = "select object_name,status from user_objects where object_type = 'SEQUENCE' order by object_name asc";
			validIcon = DbSequenceBean.ICON_VALID;
			inValidIcon = DbSequenceBean.ICON_INVALID;
			subType = DbSequenceBean.TYPE;
		}else if(fieldName.equals(FIELDS[21])){  //Users
			sql = "select * from ( " +
                    "select username,'VALID' VALID from all_users  " +
                    "union  " +
                    "select 'PUBLIC' username, 'VALID'  VALID from dual " +
                    ") order by username asc";
			validIcon = DbUserBean.ICON_VALID;
			inValidIcon = DbUserBean.ICON_INVALID;
			subType = DbUserBean.TYPE;
		}else if(fieldName.equals(FIELDS[22])){  //Profiles
			sql = "select profile,'VALID' from dba_profiles group by profile";
			validIcon = DbProfileBean.ICON_VALID;
			inValidIcon = DbProfileBean.ICON_INVALID;
			subType = DbProfileBean.TYPE;
		}else if(fieldName.equals(FIELDS[23])){  //Roles
			sql = "select role,'VALID' from session_roles";
			validIcon = DbRoleBean.ICON_VALID;
			inValidIcon = DbRoleBean.ICON_INVALID;
			subType = DbRoleBean.TYPE;
		}else if(fieldName.equals(FIELDS[24])){  //Synonyms
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'SYNONYM' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'SYNONYM' and owner != '"+ubname+"' order by object_name asc)";
			else if (!name.equals("")) {
				sql = "select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'SYNONYM' and owner = '"+name+"' order by object_name asc)";
			}else sql = "select object_name,status from user_objects where object_type = 'SYNONYM' order by object_name asc";
			validIcon = DbSynonymBean.ICON_VALID;
			inValidIcon = DbSynonymBean.ICON_INVALID;
			subType = DbSynonymBean.TYPE;
		}else if(fieldName.equals(FIELDS[25])){  //Database links
			if(ub.getDbglobal()) sql = "select db_link,'VALID' from all_db_links order by db_link asc";
			else if (!name.equals("")) {
				sql = "select * from (select owner||'.'||db_link,'VALID' from all_db_links where owner = '"+name+"' order by db_link asc)";
			}else sql = "select db_link,'VALID' from user_db_links order by db_link asc";
			validIcon = DbDatabaseLinkBean.ICON_VALID;
			inValidIcon = DbDatabaseLinkBean.ICON_INVALID;
			subType = DbDatabaseLinkBean.TYPE;
		}else if(fieldName.equals(FIELDS[26])){  //Tablespaces
			sql = "select tablespace_name,'VALID' from user_tablespaces order by tablespace_name asc";
			validIcon = DbTablespaceBean.ICON_VALID;
			inValidIcon = DbTablespaceBean.ICON_INVALID;
			subType = DbTablespaceBean.TYPE;
		}else if(fieldName.equals(FIELDS[27])){  //Clusters
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'CLUSTER' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'CLUSTER' and owner != '"+ubname+"' order by object_name asc)";
			else if (!name.equals("")) {
				sql = "select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'CLUSTER' and owner = '"+name+"' order by object_name asc)";
			}else sql = "select object_name,status from user_objects where object_type = 'CLUSTER' order by object_name asc";
			validIcon = DbClusterBean.ICON_VALID;
			inValidIcon = DbClusterBean.ICON_INVALID;
			subType = DbClusterBean.TYPE;
		}
		if(sql == null) sb.append("<tree text=\"Nodata\" />");
		else{
			ResultSet rs = null;
			try{
				rs = ub.getDb().getRS(sql);
				int i = 0;
				while(rs.next()){
					i = 1;
					String objectName =  CharSet.nullToEmpty(rs.getString(1));
					String status =  CharSet.nullToEmpty(rs.getString(2));
					String icon = validIcon;
					if("INVALID".equals(status)) icon = inValidIcon;

					// 2020-12-6 增加对 trigger 的 disabled/enabled 的图标显示处理
					if (fieldName.equals(FIELDS[8])) {
						String disFlag =  CharSet.nullToEmpty(rs.getString(3));
						if (disFlag.equals("DISABLED")) {
							if("INVALID".equals(status)) icon = inValidIconDisable;
							else icon = validIconDisable;
						}
					}
					//客户端脚本已经重写了onmouseover事件，事实上在客户端为onmouseup事件，这是出于鼠标右键的考虑
					sb.append("<tree text=\"" + objectName + "\" src=\"showTree.action?type="+subType+"&amp;name="+objectName.replaceAll("#","%23")+"&amp;field=\" icon=\""+ icon +"\" openIcon=\""+ icon +"\" onblur=\"hideMenu()\" onmouseover=\"showAppointedMenu('"+subType+"','"+objectName.replaceAll("#","%23")+"','',event)\"/>");
				}
				if(i == 0) sb.append("<tree text=\"Nodata\" />");
			}catch(Exception e){
				sb.append("<tree text=\"Nodata\" />");
				sb.append("</tree>");
				return sb.toString();
				//throw new RuntimeException(e);
			}finally{
				if(rs != null) ub.getDb().close(rs);
			}
		}
		sb.append("</tree>");
		return sb.toString();
	}

	public String getFieldTreeXml(String name,String fieldName){
		StringBuffer sb = new StringBuffer();
		sb.append("<?xml version=\"1.0\" encoding=\"utf-8\"?>");
		sb.append("<tree>");
		ActionContext ctx = ActionContext.getContext();
		HttpServletRequest request = (HttpServletRequest)ctx.get(ServletActionContext.HTTP_REQUEST);
		HttpSession session = request.getSession();
		UserBean ub = (UserBean)session.getAttribute("user");
		String sql = null;
		String validIcon = null;
		String inValidIcon = null;
		String validIconDisable = null;
		String inValidIconDisable = null;
		String subType = null;
		//phanrider 修改 object_name 由owner||'.'||object_name组成，这样properties与describe处理ALL OBJECTS时才能正常显示 2009-07-20
		//对于as sysoper 这一问题有bug
		String ubname = ub.getUsername().toUpperCase();
		String[] ownerName=ubname.split("\\ ",2);
		ubname = ownerName[0];
		if(fieldName.equals(FIELDS[2])){    //Functions
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'FUNCTION' and object_name = '" + name + "' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'FUNCTION' and owner != '"+ubname+"' and object_name = '" + name + "' order by object_name asc)";
			else sql = "select object_name,status from user_objects where object_type = 'FUNCTION' order by object_name asc";
			validIcon = DbFunctionBean.ICON_VALID;
			inValidIcon = DbFunctionBean.ICON_INVALID;
			subType = DbFunctionBean.TYPE;
		}else if(fieldName.equals(FIELDS[3])){   //Procedures
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'PROCEDURE' and object_name = '" + name + "' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'PROCEDURE' and owner != '"+ubname+"' and object_name = '" + name + "' order by object_name asc)";
			else sql = "select object_name,status from user_objects where object_type = 'PROCEDURE' order by object_name asc";
			validIcon = DbProcedureBean.ICON_VALID;
			inValidIcon = DbProcedureBean.ICON_INVALID;
			subType = DbProcedureBean.TYPE;
		}else if(fieldName.equals(FIELDS[4])){   //Packages
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'PACKAGE' and object_name = '" + name + "' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'PACKAGE' and owner != '"+ubname+"' and object_name = '" + name + "' order by object_name asc)";
			else sql = "select object_name,status from user_objects where object_type = 'PACKAGE' order by object_name asc";
			validIcon = DbPackageBean.ICON_VALID;
			inValidIcon = DbPackageBean.ICON_INVALID;
			subType = DbPackageBean.TYPE;
		}else if(fieldName.equals(FIELDS[5])){   //Package bodies
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'PACKAGE BODY' and object_name = '" + name + "' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'PACKAGE BODY' and owner != '"+ubname+"' and object_name = '" + name + "' order by object_name asc)";
			else sql = "select object_name,status from user_objects where object_type = 'PACKAGE BODY' order by object_name asc";
			validIcon = DbPackagebodyBean.ICON_VALID;
			inValidIcon = DbPackagebodyBean.ICON_INVALID;
			subType = DbPackagebodyBean.TYPE;
		}else if(fieldName.equals(FIELDS[6])){   //Types
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'TYPE' and object_name = '" + name + "' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'TYPE' and owner != '"+ubname+"' and object_name = '" + name + "' order by object_name asc)";
			else sql = "select object_name,status from user_objects where object_type = 'TYPE' order by object_name asc";
			validIcon = DbTypeBean.ICON_VALID;
			inValidIcon = DbTypeBean.ICON_INVALID;
			subType = DbTypeBean.TYPE;
		}else if(fieldName.equals(FIELDS[7])){   //Type bodies
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'TYPE BODY' and object_name = '" + name + "' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'TYPE BODY' and owner != '"+ubname+"' and object_name = '" + name + "' order by object_name asc)";
			else sql = "select object_name,status from user_objects where object_type = 'TYPE BODY' order by object_name asc";
			validIcon = DbTypebodyBean.ICON_VALID;
			inValidIcon = DbTypebodyBean.ICON_INVALID;
			subType = DbTypebodyBean.TYPE;
		}else if(fieldName.equals(FIELDS[8])){   //Triggers
			if(ub.getDbglobal()) sql = "select * from (select object_name,status,(select status from user_triggers utr where utr.trigger_name=uob.object_name and rownum=1) isenable  from user_objects uob where object_type = 'TRIGGER' and object_name = '" + name + "' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status,(select status from all_triggers atr where atr.trigger_name=aob.object_name and atr.owner = aob.owner and rownum=1) isenable from all_objects aob where object_type = 'TRIGGER' and owner != '"+ubname+"' and object_name = '" + name + "' order by object_name asc)";
			else sql = "select object_name,status,(select status from user_triggers utr where utr.trigger_name=uob.object_name and rownum=1) isenable  from user_objects uob where object_type = 'TRIGGER' order by object_name asc";
			validIcon = DbTriggerBean.ICON_VALID;
			inValidIcon = DbTriggerBean.ICON_INVALID;
			validIconDisable = DbTriggerBean.ICON_VALID_DISABLE;
			inValidIconDisable = DbTriggerBean.ICON_INVALID_DISABLE;
			subType = DbTriggerBean.TYPE;
		}else if(fieldName.equals(FIELDS[9])){   //Java sources
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'JAVA SOURCE' and object_name = '" + name + "' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'JAVA SOURCE' and owner != '"+ubname+"' and object_name = '" + name + "' order by object_name asc)";
			else sql = "select object_name,status from user_objects where object_type = 'JAVA SOURCE' order by object_name asc";
			validIcon = DbJavaSourceBean.ICON_VALID;
			inValidIcon = DbJavaSourceBean.ICON_INVALID;
			subType = DbJavaSourceBean.TYPE;
		}else if(fieldName.equals(FIELDS[10])){  //Jobs
			if(ub.getDbglobal()) sql = "select job,'VALID' from all_jobs";
			else sql = "select job,'VALID' from user_jobs";
			validIcon = DbJobBean.ICON_VALID;
			inValidIcon = DbJobBean.ICON_INVALID;
			subType = DbJobBean.TYPE;
		}else if(fieldName.equals(FIELDS[11])){  //Queues
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'QUEUE' and object_name = '" + name + "' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'QUEUE' and owner != '"+ubname+"' and object_name = '" + name + "' order by object_name asc)";
			else sql = "select object_name,status from user_objects where object_type = 'QUEUE' order by object_name asc";
			validIcon = DbQueueBean.ICON_VALID;
			inValidIcon = DbQueueBean.ICON_INVALID;
			subType = DbQueueBean.TYPE;
		}else if(fieldName.equals(FIELDS[12])){  //Queue tables
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'QUEUE TABLE' and object_name = '" + name + "' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'QUEUE TABLE' and owner != '"+ubname+"' and object_name = '" + name + "' order by object_name asc)";
			else sql = "select object_name,status from user_objects where object_type = 'QUEUE TABLE' order by object_name asc";
			validIcon = DbQueueTableBean.ICON_VALID;
			inValidIcon = DbQueueTableBean.ICON_INVALID;
			subType = DbQueueTableBean.TYPE;
		}else if(fieldName.equals(FIELDS[13])){  //Libraries
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'LIBRARY' and object_name = '" + name + "' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'LIBRARY' and owner != '"+ubname+"' and object_name = '" + name + "' order by object_name asc)";
			else sql = "select object_name,status from user_objects where object_type = 'LIBRARY' order by object_name asc";
			validIcon = DbLibraryBean.ICON_VALID;
			inValidIcon = DbLibraryBean.ICON_INVALID;
			subType = DbLibraryBean.TYPE;
		}else if(fieldName.equals(FIELDS[14])){  //Directories
			if(ub.getDbglobal()) sql = "select object_name,status from all_objects where object_type = 'DIRECTORY' order by object_name asc";
			else sql = "select * from (select object_name,status from user_objects where object_type = 'DIRECTORY' order by object_name asc) " +
					"union all " +
					"select * from (select object_name,status from all_objects where object_type = 'DIRECTORY' order by object_name asc)";
			validIcon = DbDirectoryBean.ICON_VALID;
			inValidIcon = DbDirectoryBean.ICON_INVALID;
			subType = DbDirectoryBean.TYPE;
		}else if(fieldName.equals(FIELDS[15])){  //Tables
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'TABLE' and object_name = '" + name + "' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'TABLE' and owner != '"+ubname+"' and object_name = '" + name + "' order by object_name asc)";
			else sql = "select object_name,status from user_objects where object_type = 'TABLE' order by object_name asc";
			validIcon = DbTableBean.ICON_VALID;
			inValidIcon = DbTableBean.ICON_INVALID;
			subType = DbTableBean.TYPE;
		}else if(fieldName.equals(FIELDS[16])){  //Views
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'VIEW' and object_name = '" + name + "' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'VIEW' and owner != '"+ubname+"' and object_name = '" + name + "' order by object_name asc)";
			else sql = "select object_name,status from user_objects where object_type = 'VIEW' order by object_name asc";
			validIcon = DbViewBean.ICON_VALID;
			inValidIcon = DbViewBean.ICON_INVALID;
			subType = DbViewBean.TYPE;
		}else if(fieldName.equals(FIELDS[17])){  //Materialized views
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'MATERIALIZED VIEW' and object_name = '" + name + "' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'MATERIALIZED VIEW' and owner != '"+ubname+"' and object_name = '" + name + "' order by object_name asc)";
			else sql = "select object_name,status from user_objects where object_type = 'MATERIALIZED VIEW' order by object_name asc";
			validIcon = DbMaterializedViewBean.ICON_VALID;
			inValidIcon = DbMaterializedViewBean.ICON_INVALID;
			subType = DbMaterializedViewBean.TYPE;
		}else if(fieldName.equals(FIELDS[18])){  //Sequences
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'SEQUENCE' and object_name = '" + name + "' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'SEQUENCE' and owner != '"+ubname+"' and object_name = '" + name + "' order by object_name asc)";
			else sql = "select object_name,status from user_objects where object_type = 'SEQUENCE' order by object_name asc";
			validIcon = DbSequenceBean.ICON_VALID;
			inValidIcon = DbSequenceBean.ICON_INVALID;
			subType = DbSequenceBean.TYPE;
		}else if(fieldName.equals(FIELDS[19])){  //Users
			sql = "select username,'VALID' from all_users order by username asc";
			validIcon = DbUserBean.ICON_VALID;
			inValidIcon = DbUserBean.ICON_INVALID;
			subType = DbUserBean.TYPE;
		}else if(fieldName.equals(FIELDS[20])){  //Profiles
			sql = "select profile,'VALID' from dba_profiles group by profile";
			validIcon = DbProfileBean.ICON_VALID;
			inValidIcon = DbProfileBean.ICON_INVALID;
			subType = DbProfileBean.TYPE;
		}else if(fieldName.equals(FIELDS[21])){  //Roles
			sql = "select role,'VALID' from session_roles";
			validIcon = DbRoleBean.ICON_VALID;
			inValidIcon = DbRoleBean.ICON_INVALID;
			subType = DbRoleBean.TYPE;
		}else if(fieldName.equals(FIELDS[22])){  //Synonyms
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'SYNONYM' and object_name = '" + name + "' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'SYNONYM' and owner != '"+ubname+"' and object_name = '" + name + "' order by object_name asc)";
			else sql = "select object_name,status from user_objects where object_type = 'SYNONYM' order by object_name asc";
			validIcon = DbSynonymBean.ICON_VALID;
			inValidIcon = DbSynonymBean.ICON_INVALID;
			subType = DbSynonymBean.TYPE;
		}else if(fieldName.equals(FIELDS[23])){  //Database links
			if(ub.getDbglobal()) sql = "select db_link,'VALID' from dba_db_links order by db_link asc";
			else sql = "select db_link,'VALID' from user_db_links order by db_link asc";
			validIcon = DbDatabaseLinkBean.ICON_VALID;
			inValidIcon = DbDatabaseLinkBean.ICON_INVALID;
			subType = DbDatabaseLinkBean.TYPE;
		}else if(fieldName.equals(FIELDS[24])){  //Tablespaces
			sql = "select tablespace_name,'VALID' from user_tablespaces order by tablespace_name asc";
			validIcon = DbTablespaceBean.ICON_VALID;
			inValidIcon = DbTablespaceBean.ICON_INVALID;
			subType = DbTablespaceBean.TYPE;
		}else if(fieldName.equals(FIELDS[25])){  //Clusters
			if(ub.getDbglobal()) sql = "select * from (select object_name,status from user_objects where object_type = 'CLUSTER' and object_name = '" + name + "' order by object_name asc) " +
					"union all " +
					"select * from (select owner||'.'||object_name object_name,status from all_objects where object_type = 'CLUSTER' and owner != '"+ubname+"' and object_name = '" + name + "' order by object_name asc)";
			else sql = "select object_name,status from user_objects where object_type = 'CLUSTER' order by object_name asc";
			validIcon = DbClusterBean.ICON_VALID;
			inValidIcon = DbClusterBean.ICON_INVALID;
			subType = DbClusterBean.TYPE;
		}
		if(sql == null) sb.append("<tree text=\"Nodata\" />");
		else{
			ResultSet rs = null;
			try{
				rs = ub.getDb().getRS(sql);
				int i = 0;
				while(rs.next()){
					i = 1;
					String objectName = rs.getString(1);
					String status = rs.getString(2);
					String icon = validIcon;
					if("INVALID".equals(status)) icon = inValidIcon;
					// 2020-12-6 增加对 trigger 的 disabled/enabled 的图标显示处理
					if (fieldName.equals(FIELDS[8])) {
						String disFlag =  CharSet.nullToEmpty(rs.getString(3));
						if (disFlag.equals("DISABLED")) {
							if("INVALID".equals(status)) icon = inValidIconDisable;
							else icon = validIconDisable;
						}
					}
					//客户端脚本已经重写了onmouseover事件，事实上在客户端为onmouseup事件，这是出于鼠标右键的考虑
					sb.append("<tree text=\"" + objectName + "\" src=\"showTree.action?type="+subType+"&amp;name="+objectName.replaceAll("#","%23")+"&amp;field=\" icon=\""+ icon +"\" openIcon=\""+ icon +"\" onblur=\"hideMenu()\" onmouseover=\"showAppointedMenu('"+subType+"','"+objectName+"','',event)\"/>");
				}
				if(i == 0) sb.append("<tree text=\"Nodata\" />");
			}catch(Exception e){
				throw new RuntimeException(e);
			}finally{
				if(rs != null) ub.getDb().close(rs);
			}
		}
		sb.append("</tree>");
		return sb.toString();
	}

	public String getMenuScript(){
		StringBuffer returnVal = new StringBuffer();
		return returnVal.toString();
	}

	public String getFieldMenuScript(String fieldName){
		StringBuffer returnVal = new StringBuffer();
		if(fieldName.equals(FIELDS[2])){    //Functions
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"New...\", \"javascript:showRoot('"+TYPE+"','"+name+"','"+FIELDS[2]+"','New...','550px','300px');\"));");
			returnVal.append("myMenu.add(new WebFXMenuSeparator());");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else if(fieldName.equals(FIELDS[3])){   //Procedures
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"New...\", \"javascript:showRoot('"+TYPE+"','"+name+"','"+FIELDS[3]+"','New...','550px','300px');\"));");
			returnVal.append("myMenu.add(new WebFXMenuSeparator());");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else if(fieldName.equals(FIELDS[4])){   //Packages
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"New...\", \"javascript:showRoot('"+TYPE+"','"+name+"','"+FIELDS[4]+"','New...','550px','300px');\"));");
			returnVal.append("myMenu.add(new WebFXMenuSeparator());");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else if(fieldName.equals(FIELDS[5])){   //Package bodies
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"New...\", \"javascript:showRoot('"+TYPE+"','"+name+"','"+FIELDS[5]+"','New...','550px','300px');\"));");
			returnVal.append("myMenu.add(new WebFXMenuSeparator());");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else if(fieldName.equals(FIELDS[6])){   //Types
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"New...\", \"javascript:showRoot('"+TYPE+"','"+name+"','"+FIELDS[6]+"','New...','550px','300px');\"));");
			returnVal.append("myMenu.add(new WebFXMenuSeparator());");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else if(fieldName.equals(FIELDS[7])){   //Type bodies
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"New...\", \"javascript:showRoot('"+TYPE+"','"+name+"','"+FIELDS[7]+"','New...','550px','300px');\"));");
			returnVal.append("myMenu.add(new WebFXMenuSeparator());");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else if(fieldName.equals(FIELDS[8])){   //Triggers
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"New...\", \"javascript:showRoot('"+TYPE+"','"+name+"','"+FIELDS[8]+"','New...','550px','300px');\"));");
			returnVal.append("myMenu.add(new WebFXMenuSeparator());");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else if(fieldName.equals(FIELDS[9])){   //Java sources
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"New...\", \"javascript:showRoot('"+TYPE+"','"+name+"','"+FIELDS[9]+"','New...','550px','300px');\"));");
			returnVal.append("myMenu.add(new WebFXMenuSeparator());");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else if(fieldName.equals(FIELDS[10])){  //Jobs
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"New...\", \"javascript:showRoot('"+TYPE+"','"+name+"','"+FIELDS[10]+"','New...','700px','450px');\"));");
			returnVal.append("myMenu.add(new WebFXMenuSeparator());");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else if(fieldName.equals(FIELDS[11])){  //Queues
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"New...\", \"javascript:showTreeOperate('"+TYPE+"','"+name+"','"+FIELDS[11]+"','New...','500px','200px');\"));");
			returnVal.append("myMenu.add(new WebFXMenuSeparator());");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else if(fieldName.equals(FIELDS[12])){  //Queue tables
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"New...\", \"javascript:showTreeOperate('"+TYPE+"','"+name+"','"+FIELDS[12]+"','New...','500px','200px');\"));");
			returnVal.append("myMenu.add(new WebFXMenuSeparator());");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else if(fieldName.equals(FIELDS[13])){  //Libraries
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"New...\", \"javascript:showRoot('"+TYPE+"','"+name+"','"+FIELDS[13]+"','New...','550px','300px');\"));");
			returnVal.append("myMenu.add(new WebFXMenuSeparator());");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else if(fieldName.equals(FIELDS[14])){  //Directories
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"New...\", \"javascript:showTreeOperate('"+TYPE+"','"+name+"','"+FIELDS[14]+"','New...','500px','200px');\"));");
			returnVal.append("myMenu.add(new WebFXMenuSeparator());");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else if(fieldName.equals(FIELDS[15])){  //Tables
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"New...\", \"javascript:showTreeOperate('"+TYPE+"','"+name+"','"+FIELDS[15]+"','New...','500px','200px');\"));");
			returnVal.append("myMenu.add(new WebFXMenuSeparator());");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else if(fieldName.equals(FIELDS[16])){  //Indexes
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else if(fieldName.equals(FIELDS[17])){  //Constraints
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else if(fieldName.equals(FIELDS[18])){  //Views
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"New...\", \"javascript:showRoot('"+TYPE+"','"+name+"','"+FIELDS[18]+"','New...','550px','300px');\"));");
			returnVal.append("myMenu.add(new WebFXMenuSeparator());");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else if(fieldName.equals(FIELDS[19])){  //Materialized views
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"New...\", \"javascript:showTreeOperate('"+TYPE+"','"+name+"','"+FIELDS[19]+"','New...','500px','200px');\"));");
			returnVal.append("myMenu.add(new WebFXMenuSeparator());");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else if(fieldName.equals(FIELDS[20])){  //Sequences
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"New...\", \"javascript:showTreeOperate('"+TYPE+"','"+name+"','"+FIELDS[20]+"','New...','500px','200px');\"));");
			returnVal.append("myMenu.add(new WebFXMenuSeparator());");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else if(fieldName.equals(FIELDS[21])){  //Users
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"New...\", \"javascript:showTreeOperate('"+TYPE+"','"+name+"','"+FIELDS[21]+"','New...','500px','200px');\"));");
			returnVal.append("myMenu.add(new WebFXMenuSeparator());");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else if(fieldName.equals(FIELDS[22])){  //Profiles
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"New...\", \"javascript:showTreeOperate('"+TYPE+"','"+name+"','"+FIELDS[22]+"','New...','500px','200px');\"));");
			returnVal.append("myMenu.add(new WebFXMenuSeparator());");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else if(fieldName.equals(FIELDS[23])){  //Roles
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"New...\", \"javascript:showTreeOperate('"+TYPE+"','"+name+"','"+FIELDS[23]+"','New...','500px','200px');\"));");
			returnVal.append("myMenu.add(new WebFXMenuSeparator());");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else if(fieldName.equals(FIELDS[24])){  //Synonyms
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else if(fieldName.equals(FIELDS[25])){  //Database links
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else if(fieldName.equals(FIELDS[26])){  //Tablespaces
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}else if(fieldName.equals(FIELDS[27])){  //Clusters
			returnVal.append("myMenu.width = 150;");
			returnVal.append("myMenu.add(new WFXMI(\"Refresh\", \"javascript:tree.getSelected().reload();\"));");
			returnVal.append("myMenu.add(new WFXMI(\"Copy comma separated\"));");
		}
		return returnVal.toString();
	}

}
