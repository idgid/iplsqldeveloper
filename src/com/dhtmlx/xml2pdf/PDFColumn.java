package com.dhtmlx.xml2pdf;

import org.w3c.dom.Element;
import org.w3c.dom.Node;

public class PDFColumn {
	
	private String colName;
	private String type;
	private String align;
	private int colspan;
	private int rowspan;
	private double width = 0;
	private int height = 1;
	private boolean is_footer = false;

	public void parse(Element parent) {
		is_footer = parent.getParentNode().getParentNode().getNodeName().equals("foot");
		
		Node text_node = parent.getFirstChild();
		if (text_node != null)
			colName = text_node.getNodeValue();
		else
			colName = "";
		
		String width_string = parent.getAttribute("width");
		
		if (width_string.length() > 0) {
			width = Integer.parseInt(width_string);
		}
		type = parent.getAttribute("type");
		align = parent.getAttribute("align");
		String colspan_string = parent.getAttribute("colspan");
		if (colspan_string.length() > 0) {
			colspan = Integer.parseInt(colspan_string);
		}
		String rowspan_string = parent.getAttribute("rowspan");
		if (rowspan_string.length() > 0) {
			rowspan= Integer.parseInt(rowspan_string);
		}
	}
	
	public boolean isFooter(){
		return is_footer;
	}
	
	public double getWidth() {
		return width;
	}
	
	public void setWidth(double width) {
		this.width = width;
	}
	
	public int getColspan() {
		return colspan;
	}
	
	public int getRowspan() {
		return rowspan;
	}
	
	public int getHeight() {
		return height;
	}
	
	public void setHeight(int height) {
		this.height = height;
	}
	
	public String getName() {
		return colName;
	}
	
	public String getAlign() {
		return align;
	}
	
	public String getType() {
		return type;
	}
}
