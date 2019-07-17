package com.dhtmlx.xml2excel;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

public class HTMLWriter extends BaseWriter{
	int rows = 0;
	int cols = 0;
	int fontSize = -1;
	String watermark = null;

	public void generate(String xml, HttpServletResponse resp) throws IOException {
		CSVxml data = new CSVxml(xml);
		
		resp.setCharacterEncoding("UTF-8");
		resp.setContentType("application/vnd.ms-excel");
		resp.setCharacterEncoding("UTF-8");
		resp.setHeader("Content-Disposition", "attachment;filename=grid.xls");
		resp.setHeader("Cache-Control", "max-age=0");
	
		String[] csv;
		int colsnum = 0;
		PrintWriter writer = resp.getWriter();

		Colors colors = getColors(data);
		startHTML(writer, colors);
		csv = data.getHeader();
		if (csv != null)colsnum = csv.length;
		while(csv != null){			
			writer.append(dataAsString(csv, "header"));
			csv = data.getHeader();
		}
		
		csv = data.getRow();
		if (csv != null){
			colsnum = csv.length;
			cols = csv.length;
		}
		while(csv != null){
			String className = rows%2 == 0 ? "cell_odd" : "cell_even";
			writer.append(dataAsString(csv, className));
			csv = data.getRow();
			rows +=1;
		}
		
		csv = data.getFooter();
		if (csv != null)colsnum = csv.length;
		while(csv != null){			
			writer.append(dataAsString(csv, "footer"));
			writer.flush();
			csv = data.getFooter();
		}
		drawWatermark(writer, colsnum);
		endHTML(writer);
		
		writer.flush();
		writer.close();
	}

	private void drawWatermark(PrintWriter writer, int colsnum) {
		if (watermark != null)
			writer.append("<tr><td colspan='" + colsnum + "'>" + watermark + "</td></tr>");
	}

	private void endHTML(PrintWriter writer) {
		writer.append("</table></body></html>");
	}

	private void startHTML(PrintWriter writer, Colors colors) {
		writer.append("<html><meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\"><body>");
		writer.append("<style>");

		String fontsize = (fontSize == -1) ? "" : "font-size: " + fontSize + "pt";
		String header_css = "background-color: #" + colors.bgColor + "; border:.5pt solid #" + colors.lineColor + ";" + fontsize;
		String cell_odd_css = "background-color: #" + colors.scaleOneColor + "; border:.5pt solid #" + colors.lineColor + ";" + fontsize;
		String cell_even_css = "background-color: #" + colors.scaleTwoColor + "; border:.5pt solid #" + colors.lineColor + ";" + fontsize;
		String footer_css = "background-color: #" + colors.bgColor + "; border:.5pt solid #" + colors.lineColor + ";" + fontsize;

		writer.append(".header { height: 30pt; vertical-align: middle; text-align: center; " + header_css + " }");
		writer.append(".cell_odd { height: 20pt; vertical-align: middle; " + cell_odd_css + " }");
		writer.append(".cell_even { height: 20pt; vertical-align: middle; " + cell_even_css + "}");
		writer.append(".footer { height: 30pt; vertical-align: middle; text-align: center; " + footer_css + " }");
		writer.append("</style>");
		if (fontSize != -1)
			writer.append("<style>.format { font-size: " + fontSize + "pt; }</style>");
		writer.append("<table>");
	}


	private String dataAsString(String[] csv, String className) {
		if (csv.length == 0) return "";
		
		StringBuffer buff = new StringBuffer();
		buff.append("<tr>");
		for ( int i=0; i<csv.length; i++){
			buff.append("<td class=\"" + className + "\">");
			buff.append(csv[i].replace("&", "&amp;").replace(">", "&gt;").replace("<", "&lt;"));
			buff.append("</td>");
		}	
		buff.append("</tr>\n");
		return buff.toString();
	}

	public int getColsStat() {
		return cols;
	}

	public int getRowsStat() {
		return rows;
	}
	
	public void setFontSize(int fontsize) {
		this.fontSize = fontsize;
	}

	public void setWatermark(String watermark) {
		this.watermark = watermark;
	}
	
	private Colors getColors(CSVxml data) {
		String profile = data.getProfile();
		Colors colors = new Colors();
		colors.setColorProfile(profile);
		return colors;
	}
}
