/*
 * @author nanking
 * @version 1.0, 2009-3-23
 *
 * @source: BaisWorkBean.java Create on 2009-03-23
 */
package org.reddragonfly.iplsqldevj.bean;

import java.io.*;
import java.lang.reflect.Proxy;
import java.sql.Clob;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.sql.rowset.serial.SerialClob;

import dm.jdbc.util.StringUtil;
import oracle.sql.BLOB;
import oracle.sql.CLOB;
import org.apache.struts2.ServletActionContext;
import org.directwebremoting.WebContextFactory;


import com.opensymphony.xwork2.ActionContext;
import org.reddragonfly.iplsqldevj.DateUtilities;

public class BaisWorkBean {
	// 当前起始
	int pageNo = 0;

	// 结束
	int countPage = 20;

	// 执行SQL
	String sql = null;

	Boolean sqlForUpdate = false;

	// 总页数
	int pageCount = 0;

	// 总记录数
	int recordCount = 0;

	// 显示字段名
	String columnName = null;

	String columnNameCn[] = null;

	private String getResultHtml = null;

	private int readonly = 0;

	int getColumnCount = 0;// 执行SQL的行数2009-zxd

	static String TableName = "";

	// 返回插入数据操作的结果
	String insertResult = "0505";


    // phanrider 2009-05-15 add
	private List list = new ArrayList();
	private List errList = new ArrayList();
	private List insertDeleteList = new ArrayList();
	private List execObjectList = new ArrayList();

	private String spectStr = "_$$$_";  // 分隔符

	/**
	 *
	 * @param startPage
	 * @param endPage
	 * @param countPage
	 * @param sql
	 */
	public String initBean(String[] sqlNum) {
		TableName = "";
		String[] sqlnum = new String[sqlNum.length];
		sqlnum = sqlNum;// 得到插入数据的数组
		this.sql = sqlnum[0];
		int rows = Integer.valueOf(sqlnum[1]).intValue();

		// 判断sql去掉for update 并且给个标记readonly=1
		Database db = null;
		ResultSet rs = null;
		pageNo = 20 * (rows - 1);
		countPage = 20 * rows;

		//修改此处，增加 2018-9-5 20:59:36 smalle 替换不间断空格(non-breaking space) https://blog.csdn.net/lewky_liu/article/details/79353151
		this.sql = this.sql.replaceAll("\\u00A0+", " ");

		String sqlCount = "select count(*) from (" + this.sql + ")";
		if (sqlnum.length >= 3 && sqlnum[2].equals("Q")) {
//			sql = "SELECT A.* FROM (" + this.sql + " ) A" + " minus "
//					+ "SELECT A.* FROM (" + this.sql + " ) A	WHERE ROWNUM <= "
//					+ pageNo;
			sql = "SELECT * FROM (" + "SELECT A.*, ROWNUM RN FROM (" + this.sql
			+ ") A	WHERE ROWNUM <= " + pageNo + ")	WHERE RN >"
			+ 0;
		} else {
//			sql = "SELECT A.* FROM (" + this.sql + " ) A WHERE ROWNUM <= "
//					+ countPage + " minus " + "SELECT A.* FROM (" + this.sql
//					+ " ) A	WHERE ROWNUM <= " + pageNo;
			sql = "SELECT * FROM (" + "SELECT A.*, ROWNUM RN FROM (" + this.sql
			+ ") A	WHERE ROWNUM <= " + pageNo + ")	WHERE RN >"
			+   countPage;
		}
		System.out.println("sql=" + sql);
		try {
			HttpServletRequest request = WebContextFactory.get()
					.getHttpServletRequest();
			HttpSession session = request.getSession();
			UserBean ub = (UserBean) session.getAttribute("user");
			db = ub.getDb();
			rs = db.getRS(sql);
			this.columnNameCn = null;
			ResultSetMetaData rsNb = rs.getMetaData();// 得到列表显示的列数
			this.getColumnCount = rsNb.getColumnCount();// 得到列表显示的列数
			String[] columnName = new String[getColumnCount];
			for (int j = 0; j < getColumnCount; j++) {
				columnName[j] = rsNb.getColumnName(j + 1);
			}
			this.getResultHtml = "<table cellSpacing=\"0\">";
			this.getResultHtml += "<colgroup span=\"4\">";
			for (int cg = 1; cg < getColumnCount + 2; cg++) {
				if (cg == 1)
					this.getResultHtml += "<col style=\"WIDTH: 15px\">";
				else if (cg == 2)
					this.getResultHtml += "<col style=\"WIDTH: 25px\">";
				else
					this.getResultHtml += "<col style=\"WIDTH: 100px\">";
			}
			this.getResultHtml += "</colgroup>";
			if (rows == 1) {
				this.getResultHtml += "<tr>";
				this.getResultHtml += "<td class='c'>&nbsp;&nbsp;</td><td class='c'>&nbsp;&nbsp;</td>";
				for (int i = 0; i < columnName.length; i++) {
					this.getResultHtml += "<td>" + columnName[i] + "</td>";

				}
				this.getResultHtml += "</tr>";
			}
			int h = 0;
			while (rs.next()) {
				h++;
				this.getResultHtml += "<tr" + h
						+ " ><td class='c'>&nbsp;&nbsp;</td><td>"
						+ (h + 20 * (rows - 1)) + "</td>";
				for (int j = 1; j <= getColumnCount; j++) {
					this.getResultHtml += "<td>" + rs.getString(j) + "</td>";
				}
				this.getResultHtml += "</tr>";

			}
			this.getResultHtml += "</table>";
			System.out.println("001=" + getResultHtml);
		} catch (Exception e) {
			e.printStackTrace();
			//System.out.println("00e=" + e.toString());
		} finally {
			if (rs != null) {
				db.close(rs);
			}
			if (db != null) {
				// db.cleanup();
			}
		}
		return getResultHtml;

	}

	//phanrider 2009-05-26
	//新增返回数组
	public List GetResultList(String[] sqlNum) {
		String[] sqlnum = new String[sqlNum.length];
		sqlnum = sqlNum;// 得到插入数据的数组
		this.sql = sqlnum[0];
		this.sqlForUpdate = false;
		String st = " for update";
		String sqlCount = "select count(*) from (" + this.sql + ")";

        int rows = Integer.valueOf(sqlnum[1]).intValue();
        // System.out.println("111="+rows);
        // 判断sql去掉for update 并且给个标记readonly=1
        Database db = null;
        ResultSet rs = null;
        pageNo = 20 * (rows - 1) ;
        countPage = 20 * rows + 1;

		if (this.sql.trim().toLowerCase().endsWith(st)) {
		    //  for update
            this.sqlForUpdate = true;
			//this.sql = replaceLast(this.sql.trim().toLowerCase(), st, "");
			//sqlCount = "select count(*) from (" + this.sql + ")";
            sql = this.sql;
		} else {
		    // 一般的 select
            if (sqlnum.length >= 3 && sqlnum[2].equals("Q")) {
                sql = "SELECT * FROM (" + "SELECT A.*, ROWNUM RN FROM (" + this.sql
                        + ") A	)	WHERE RN >"
                        + pageNo;
            } else {
                sql = "SELECT * FROM (" + "SELECT A.*, ROWNUM RN FROM (" + this.sql
                        + ") A	WHERE ROWNUM <= " + countPage + ")	WHERE RN >"
                        + pageNo;
            }
        }


		try {
			HttpServletRequest request = WebContextFactory.get()
					.getHttpServletRequest();
			HttpSession session = request.getSession();
			UserBean ub = (UserBean) session.getAttribute("user");
			db = ub.getDb();

			if (this.sqlForUpdate) {
			    rs = db.execSqlForUpdate(sql);
			    ub.setgRs(rs);
            } else {
                rs = db.getRS(sql);

            }

			this.columnNameCn = null;
			ResultSetMetaData rsNb = rs.getMetaData();// 得到列表显示的列数
            if (this.sqlForUpdate) {
                this.getColumnCount = rsNb.getColumnCount();    // 得到列表显示的列数
            } else {
                this.getColumnCount = rsNb.getColumnCount()-1;  // 得到列表显示的列数
            }

			String[] columnName = new String[getColumnCount];
			for (int j = 0; j < getColumnCount; j++) {
				columnName[j] = rsNb.getColumnName(j + 1) + spectStr + rsNb.getColumnTypeName(j + 1) + spectStr + rsNb.getColumnDisplaySize(j + 1);
			}

			Vector vColumn = new Vector();
			if (rows == 1) {

				//this.getResultHtml += "<tr>";
				//this.getResultHtml += "<td class='c'>&nbsp;&nbsp;</td><td class='c'>&nbsp;&nbsp;</td>";
				for (int i = 0; i < columnName.length; i++) {
					//this.getResultHtml += "<td>" + columnName[i] + "</td>";
					vColumn.add(columnName[i]);
				}
				//this.getResultHtml += "</tr>";
				list.add(vColumn);
			}
			int h = 0;
			while (rs.next()) {
				Vector v = new Vector();
				h++;
//				this.getResultHtml += "<tr" + h
//						+ " ><td class='c'>&nbsp;&nbsp;</td><td>"
//						+ (h + 20 * (rows - 1)) + "</td>";
				for (int j = 1; j <= getColumnCount; j++) {
					//this.getResultHtml += "<td>" + rs.getString(j) + "</td>";
					String value = null;
					//this.columnNameCn[j] = rs.getString(j);

					//2007-11-4由phanrider加入对"BLOB"或者"CLOB"类型的过滤
					//如果字段类型是"BLOB"或者"CLOB"类型，则打出"<long>"
					if ("BLOB".equals(rs.getMetaData().getCatalogName(j)) ||
							"CLOB".equals( rs.getMetaData().getColumnTypeName(j))
						||"BLOB".equals( rs.getMetaData().getColumnTypeName(j)) ) {

						if ("CLOB".equals( rs.getMetaData().getColumnTypeName(j)))  {
							value = CharSet.nullToEmpty(db.getClob(rs, j));
						}

						if ( "BLOB".equals(rs.getMetaData().getCatalogName(j)) ||"BLOB".equals( rs.getMetaData().getColumnTypeName(j))  ) {
							byte[] blobTmp = db.getBlob(rs , j );
							if (blobTmp.length == 0) value="<BLOB>";
							else {
								value = new String(blobTmp);  // 暂时测试string
							}
						}

					} else if ( "LONG".equals( rs.getMetaData().getColumnTypeName(j)) ) {
						value = db.getLong(rs, j);
						//value = "&lt;long&gt;";
					}
					else  value = CharSet.nullToEmpty(rs.getString(j));

					//value = CharSet.nullToEmpty(rs
					//getString(columnName[i]));

					int index = value.indexOf("00:00:00");
					if (index != -1) {
						value = value.substring(0, index);
					}

					v.add(value);
				}
				//this.getResultHtml += "</tr>";
				list.add(v);
			}
			//this.getResultHtml += "</table>";
			//System.out.println("001=" + getResultHtml);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("00e=" + e.getMessage());
			Vector v = new Vector();
			v.add("ReddragonflyErrorFlag*");
			v.add(e.getMessage());
			errList.add(v);
		} finally {
			if (rs != null) {
                if (!this.sqlForUpdate) {
                    db.close(rs);
                }
			}
			if (db != null) {
				// db.cleanup();
			}
		}
		if (errList.isEmpty()) {
			return list;
		} else {
			return errList;
		}
	}

	// 更新、删除、插入 数据 by phanrider 2020-10-6
    public List forUpdateNumber(String[] addvalues[]) {
        ResultSet rs = null;
        String[] addValues[] = new String[addvalues.length][];
        addValues = addvalues;

        HttpServletRequest request = WebContextFactory.get()
                .getHttpServletRequest();
        HttpSession session = request.getSession();
        UserBean ub = (UserBean) session.getAttribute("user");
        rs = ub.getgRs();

        try {
            rs.last();

            int rowCount = rs.getRow();         // 原先结果集 rows
            int nRowCount = addValues.length;   // 浏览器传过来的新的结果集 rows
            int colNum = addValues[0].length;   // 列数
            int uNum = 0;
            int iNum = 0;
            int dNum = 0;

            // 1, 先更新数据集
            for( int i = 0; i < nRowCount; i++ ) {
                for ( int j = 1; j <= rowCount; j ++ ) {
                    if ( addValues[i][0].equals(Integer.toString(j))) {
                        rs.absolute(j);
                        // 更新该行的所有列
	                        for( int k = 1; k < colNum; k++ ) {
                        	if (rs.getMetaData().getColumnTypeName(k).equals("TIMESTAMP")) {
								Timestamp ts = Timestamp.valueOf(addValues[i][k]);
								rs.updateTimestamp(k, ts);
							} else if (rs.getMetaData().getColumnTypeName(k).equals("DATE")) {
								Date da = DateUtilities.getParseDateString(addValues[i][k], "yyyy-MM-dd HH:mm:ss");
								rs.updateDate(k, new java.sql.Date(da.getTime()));
							} else if ("CLOB".equals( rs.getMetaData().getColumnTypeName(k)))  {
								char[] c = addValues[i][k].toCharArray();
								oracle.sql.CLOB clob = (CLOB) rs.getClob(k);
								if( clob == null) {
									oracle.sql.CLOB cl = oracle.sql.CLOB.createTemporary(rs.getStatement().getConnection(), false, CLOB.DURATION_SESSION);
									cl.putString(1, addvalues[i][k]);
									rs.updateClob(k, cl);

								} else {
									Writer outStream = clob.getCharacterOutputStream();
									outStream.write(c, 0, c.length);
									outStream.flush();
								}

							} else if ( "BLOB".equals(rs.getMetaData().getCatalogName(k)) ||"BLOB".equals( rs.getMetaData().getColumnTypeName(k))  ) {
								byte[] c = addValues[i][k].getBytes();
								oracle.sql.BLOB blob = (BLOB) rs.getBlob(k);
								if( blob == null) {
									oracle.sql.BLOB bl = oracle.sql.BLOB.createTemporary(rs.getStatement().getConnection(), false, BLOB.DURATION_SESSION);
									bl.putBytes(1, c);
									rs.updateBlob(k, bl);
								} else {
									OutputStream outStream = blob.getBinaryOutputStream();
									outStream.write(c, 0, c.length);
									outStream.flush();
								}

							} else if (rs.getMetaData().getColumnTypeName(k).equals("NUMBER")) {
								rs.updateLong(k, Long.parseLong(addValues[i][k]));
							} else {
								rs.updateString(k, addValues[i][k]);
							}

						}
                        rs.updateRow();
                        uNum++;
                    }
                }
            }

            // 2, 删除旧结果集中的数据
            for( int i = 1; i <= rowCount; i++ ) {
                boolean dFlag = true;
                for ( int j = 0; j < nRowCount; j++) {
                   if (addValues[j][0].equals(Integer.toString(i))) {
                       j = nRowCount;
                       dFlag = false;
                       break;
                   }
                }
                if (dFlag) {
                    rs.absolute(i);
                    rs.deleteRow();
                    dNum++;
                }
            }

            // 3, 插入新数据
            for( int i = 0; i < nRowCount; i++ ) {
                for ( int j = 1; j <= rowCount; j ++ ) {
                    if ( addValues[i][0].equals(Integer.toString(j))) {
                       break;
                    } else {
                        if ( j == rowCount ) {
                            rs.moveToInsertRow();
                            for( int k = 1; k < colNum; k++ ) {

								if (rs.getMetaData().getColumnTypeName(k).equals("TIMESTAMP")) {
									Timestamp ts = Timestamp.valueOf(addValues[i][k]);
									rs.updateTimestamp(k, ts);
								} else if (rs.getMetaData().getColumnTypeName(k).equals("DATE")) {
									Date da = DateUtilities.getParseDateString(addValues[i][k], "yyyy-MM-dd HH:mm:ss");
									rs.updateDate(k, new java.sql.Date(da.getTime()));
								} else if ("CLOB".equals( rs.getMetaData().getColumnTypeName(k)))  {
									char[] c = addValues[i][k].toCharArray();
									oracle.sql.CLOB clob = (CLOB) rs.getClob(k);
									if( clob == null) {
										oracle.sql.CLOB cl = oracle.sql.CLOB.createTemporary(rs.getStatement().getConnection(), false, CLOB.DURATION_SESSION);
										cl.putString(1, addvalues[i][k]);
										rs.updateClob(k, cl);
									} else {
										clob = (oracle.sql.CLOB) rs.getClob(k);
										Writer outStream = clob.getCharacterOutputStream();
										outStream.write(c, 0, c.length);
										outStream.flush();
									}

								} else if ( "BLOB".equals(rs.getMetaData().getCatalogName(k)) ||"BLOB".equals( rs.getMetaData().getColumnTypeName(k))  ) {
                                    byte[] c = addValues[i][k].getBytes();
                                    oracle.sql.BLOB blob = (BLOB) rs.getBlob(k);
                                    if( blob == null) {
                                        oracle.sql.BLOB bl = oracle.sql.BLOB.createTemporary(rs.getStatement().getConnection(), false, BLOB.DURATION_SESSION);
                                        bl.putBytes(1, c);
                                        rs.updateBlob(k, bl);
                                    } else {
                                        OutputStream outStream = blob.getBinaryOutputStream();
                                        outStream.write(c, 0, c.length);
                                        outStream.flush();
                                    }
								} else if (rs.getMetaData().getColumnTypeName(k).equals("NUMBER")) {
									if ( !(CharSet.nullToEmpty(addValues[i][k])).equals("") )
										rs.updateLong(k, Long.parseLong(addValues[i][k]));
								} else {
									rs.updateString(k, addValues[i][k]);

								}
                            	//   rs.updateString(k, addValues[i][k]);
							}
                            rs.insertRow();
                            iNum++;
                        }
                    }
                }
            }

            insertResult = uNum + "," + iNum + "," + dNum;

            Vector v = new Vector();
            v.add("ReddragonflySuccessFlag*");
            v.add(insertResult);
            insertDeleteList.add(v);
        } catch (Exception e) {
            e.printStackTrace();
            Vector v = new Vector();
            v.add("ReddragonflyErrorFlag*");
            v.add(e.getMessage());
            insertDeleteList.add(v);
        }

        return insertDeleteList;
    }


	public String insertNumber(String[] addvalues) {
		try {
			String[] addValues = new String[addvalues.length];
			addValues = addvalues;// 得到插入数据的数组
			Database db = null;
			int rs = 0;
			ActionContext ctx = ActionContext.getContext();
			HttpServletRequest request = (HttpServletRequest) ctx
					.get(ServletActionContext.HTTP_REQUEST);
			HttpSession session = request.getSession();
			UserBean ub = (UserBean) session.getAttribute("user");
			db = ub.getDb();
			for (int i = 0; i < addValues.length; i++) {
				StringBuffer[] value = new StringBuffer[addValues[i].length() / 2 + 1];// 存放处理后的字符串
				String[] valestring = new String[addValues[i].length() / 2 + 1];// 定义一个字符串数组用来存放,一条数据中的每个数据项
				String values = "";
				for (int j = 0; j < valestring.length; j++) {
					if (valestring[j] != "") {
						value[j] = new StringBuffer("'" + valestring[j] + "'");
					} else {
						value[j] = new StringBuffer("null");
					}
					if (j == valestring.length - 1) {// 如果是最后一个数据项就不加,号
						values += value[j].toString();
					} else {
						values += value[j].toString() + ",";
					}
				}
				// 得到一条数据就插一条记录
				values = "(" + values + ")";
				String sql = "insert into" + TableName + "values" + values;
				rs = db.execSqlUpdate(sql);
			}
			insertResult = Integer.toString(rs);
		} catch (Exception e) {
			insertResult = e.toString();
		}

		// String[] addValues=
		return insertResult;
	}


	//phanrider 2009-06-04
	//新增insert、delete是否成功方法
	public List intOfInsertDelete(String sqlNum) {
		this.sql = sqlNum;
		Database db = null;
		int rs = 0;

		try {
			HttpServletRequest request = WebContextFactory.get()
			.getHttpServletRequest();
			HttpSession session = request.getSession();
			UserBean ub = (UserBean) session.getAttribute("user");
			db = ub.getDb();
			rs = db.execSqlUpdate(sql);
			Vector v = new Vector();
			v.add("ReddragonflySuccessFlag*");
			v.add(rs);
			insertDeleteList.add(v);
		} catch (Exception e) {
			e.printStackTrace();
			Vector v = new Vector();
			v.add("ReddragonflyErrorFlag*");
			v.add(e.getMessage());
			errList.add(v);
		} finally {
			if (rs != 0) {
				//db.close(rs);
			}
			if (db != null) {
				// db.cleanup();
			}
		}
		if (errList.isEmpty()) {
			return insertDeleteList;
		} else {
			return errList;
		}
	}

	//phanrider 2009-11-25
	//新增统一执行OBJECT是否成功方法
	public List execObject(String sqlNum, String objName) {
		String success = "Compiled successfully";
		this.sql = sqlNum;
		Database db = null;
		ResultSet rs = null;
		sql = sql.replaceAll("\r\n", "\n"); //不作替换编译会报错
		sql = sql.replaceAll("\r", "\n");
		//System.out.println(sql);
		try {
			HttpServletRequest request = WebContextFactory.get()
			.getHttpServletRequest();
			HttpSession session = request.getSession();
			UserBean ub = (UserBean) session.getAttribute("user");
			db = ub.getDb();
			rs = db.getRS(sql);
			Vector v = new Vector();
			v.add("ReddragonflySuccessFlag*");
			if(rs.getStatement().getWarnings() != null) {
				v.add(rs.getStatement().getWarnings().getMessage().replaceAll("java.sql.SQLWarning: ", ""));
				execObjectList.add(v);
				if (!objName.equals("")) {
					String errSql = "select line,text from USER_ERRORS where NAME = upper('" + objName + "') order by sequence asc";
					ResultSet rsE =  db.getRS(errSql);
					while (rsE.next()) {
						Vector ve = new Vector();
						for (int j = 1; j <= rsE.getMetaData().getColumnCount(); j++) {
							String value = null;
							value = CharSet.nullToEmpty(rsE.getString(j));
							ve.add(value);
						}
						execObjectList.add(ve);
					}
				}


			} else {
				v.add(success);
				execObjectList.add(v);
			}
		} catch (Exception e) {
			e.printStackTrace();
			Vector v = new Vector();
			v.add("ReddragonflyErrorFlag*");
			v.add(e.getMessage());
			errList.add(v);
		} finally {
			if (rs != null) {
				//db.close(rs);
			}
			if (db != null) {
				// db.cleanup();
			}
		}
		if (errList.isEmpty()) {
			return execObjectList;
		} else {
			return errList;
		}
	}

	public List execObjectCompile(String objectType, String objectName, int debugFlag) {
		String success = "";
		if (debugFlag == 0) { // recompile
			this.sql = "ALTER " + objectType + " " + objectName + " COMPILE";
			if (objectType.equals("package body"))
				this.sql = "ALTER PACKAGE " + objectName + " COMPILE BODY";
			if (objectType.equals("type body"))
				this.sql = "ALTER TYPE " + objectName + " COMPILE BODY";
			success = "Compiled succesfully";
		} else if (debugFlag == 1){ // add debug info
			this.sql = "ALTER " + objectType + " " + objectName + " COMPILE DEBUG";
			if (objectType.equals("package body"))
				this.sql = "ALTER PACKAGE " + objectName + " COMPILE DEBUG BODY";
			if (objectType.equals("type body"))
				this.sql = "ALTER TYPE " + objectName + " COMPILE DEBUG BODY";
			success = "Debug information added";
		} else if (debugFlag == 2){ // // trigger enable
			this.sql = "ALTER " + objectType + " " + objectName + " ENABLE";
		} else if (debugFlag == 3){ // // trigger disable
			this.sql = "ALTER " + objectType + " " + objectName + " DISABLE";
		} else { // old recompile
			this.sql = "ALTER " + objectType + " " + objectName + " COMPILE";
			if (objectType.equals("package body"))
				this.sql = "ALTER PACKAGE " + objectName + " COMPILE BODY";
			if (objectType.equals("type body"))
				this.sql = "ALTER TYPE " + objectName + " COMPILE BODY";
			success = "Compiled succesfully";
		}
		Database db = null;
		ResultSet rs = null;
		sql = sql.replaceAll("\r\n", "\n"); //不作替换编译会报错
		sql = sql.replaceAll("\r", "\n");
		//System.out.println(sql);
		try {
			HttpServletRequest request = WebContextFactory.get()
			.getHttpServletRequest();
			HttpSession session = request.getSession();
			UserBean ub = (UserBean) session.getAttribute("user");
			db = ub.getDb();
			rs = db.getRS(sql);
			Vector v = new Vector();
			v.add("ReddragonflySuccessFlag*");
			if(rs.getStatement().getWarnings() != null) {
				v.add(rs.getStatement().getWarnings().getMessage().replaceAll("java.sql.SQLWarning: ", ""));
			} else {
				v.add(success);
			}
			execObjectList.add(v);
		} catch (Exception e) {
			e.printStackTrace();
			Vector v = new Vector();
			v.add("ReddragonflyErrorFlag*");
			v.add(e.getMessage());
			errList.add(v);
		} finally {
			if (rs != null) {
				//db.close(rs);
			}
			if (db != null) {
				// db.cleanup();
			}
		}
		if (errList.isEmpty()) {
			return execObjectList;
		} else {
			return errList;
		}
	}

	public List getInstanceUser() {
		Database db = null;
		ResultSet rs = null;
		List list = new ArrayList();
		String sql = "select username from dba_users order by username asc";
		String str = "";
		try {
			HttpServletRequest request = WebContextFactory.get()
			.getHttpServletRequest();
			HttpSession session = request.getSession();
			UserBean ub = (UserBean) session.getAttribute("user");
			db = ub.getDb();
			rs = db.getRS(sql);
			while (rs.next()) {
				Vector v = new Vector();
				if (CharSet.nullToEmpty(rs.getString("username")).equals(ub.getUsername().toUpperCase())) {
					str = "selected";
				} else {
					str = "";
				}
				v.add("<option value=\""+ CharSet.nullToEmpty(rs.getString("username")) + "\" " + str + ">" + CharSet.nullToEmpty(rs.getString("username")) + "</option>");
				list.add(v);
			}
		} catch (Exception e) {
			e.printStackTrace();

		} finally {
			if (rs != null) {
				//db.close(rs);
			}
			if (db != null) {
				// db.cleanup();
			}
		}
		return list;

	}

	public List getInstanceTableAndView() {
		Database db = null;
		ResultSet rs = null;
		List list = new ArrayList();
		String sql = "select tname from tab where tabtype='TABLE' union all select tname from tab where tabtype='VIEW'";
		String str = "";
		try {
			HttpServletRequest request = WebContextFactory.get()
			.getHttpServletRequest();
			HttpSession session = request.getSession();
			UserBean ub = (UserBean) session.getAttribute("user");
			db = ub.getDb();
			rs = db.getRS(sql);
			while (rs.next()) {
				Vector v = new Vector();
				if (CharSet.nullToEmpty(rs.getString("tname")).equals(ub.getUsername().toUpperCase())) {
					str = "selected";
				} else {
					str = "";
				}
				v.add("<option value=\""+ CharSet.nullToEmpty(rs.getString("tname")) + "\" " + str + ">" + CharSet.nullToEmpty(rs.getString("tname")) + "</option>");
				list.add(v);
			}
		} catch (Exception e) {
			e.printStackTrace();

		} finally {
			if (rs != null) {
				//db.close(rs);
			}
			if (db != null) {
				// db.cleanup();
			}
		}
		return list;

	}

	public boolean setDbCommit() {
		Database db = null;
		try {
			HttpServletRequest request = WebContextFactory.get()
			.getHttpServletRequest();
			HttpSession session = request.getSession();
			UserBean ub = (UserBean) session.getAttribute("user");
			db = ub.getDb();
			db.commit();
		} catch (Exception e) {
			e.printStackTrace();
			Vector v = new Vector();
			v.add("ReddragonflyErrorFlag*");
			v.add(e.getMessage());
			errList.add(v);
		} finally {
		}
		if (errList.isEmpty()) {
			return true;
		} else {
			return false;
		}

	}

	public boolean setDbRollback() {
		Database db = null;
		try {
			HttpServletRequest request = WebContextFactory.get()
			.getHttpServletRequest();
			HttpSession session = request.getSession();
			UserBean ub = (UserBean) session.getAttribute("user");
			db = ub.getDb();
			db.rollback();
		} catch (Exception e) {
			e.printStackTrace();
			Vector v = new Vector();
			v.add("ReddragonflyErrorFlag*");
			v.add(e.getMessage());
			errList.add(v);
		} finally {
		}
		if (errList.isEmpty()) {
			return true;
		} else {
			return false;
		}
	}

	public static String replaceLast(String text, String strToReplace, String replaceWithThis) {
		return text.replaceFirst("(?s)" + strToReplace + "(?!.*?" + strToReplace + ")", replaceWithThis);
	}

	public void setCountPage(int countPage) {
		this.countPage = countPage;
	}

	public int getPageCount() {
		return pageCount;
	}

	public void setPageCount(int pageCount) {
		this.pageCount = pageCount;
	}

	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public int getRecordCount() {
		return recordCount;
	}

	public void setRecordCount(int recordCount) {
		this.recordCount = recordCount;

	}

	public String[] getColumnNameCn() {
		return columnNameCn;
	}

	public String getGetResultHtml() {
		return getResultHtml;
	}

	public void setGetResultHtml(String getResultHtml) {
		this.getResultHtml = getResultHtml;
	}

	public int getReadonly() {
		return readonly;
	}

	public void setReadonly(int readonly) {
		this.readonly = readonly;
	}

	// zxd
	public int getgetColumnCount() {
		// System.out.println("=="+this.getColumnCount);
		return this.getColumnCount;

	}

}
