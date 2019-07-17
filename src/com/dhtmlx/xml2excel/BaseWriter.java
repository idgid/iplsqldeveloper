package com.dhtmlx.xml2excel;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

public abstract class BaseWriter {
	public abstract void generate(String xml, HttpServletResponse resp) throws IOException;	
	public abstract int getColsStat();
	public abstract int getRowsStat();
	public abstract void setWatermark(String watermark);
	public abstract void setFontSize(int fontsize);
}
