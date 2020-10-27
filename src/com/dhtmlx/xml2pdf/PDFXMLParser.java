package com.dhtmlx.xml2pdf;

import java.io.*;

import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.ParserConfigurationException;
import org.w3c.dom.*;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

import com.pdfjet.A4;
import com.pdfjet.Letter;


public class PDFXMLParser {
	Element root;
	PDFColumn[][] columns;
	PDFRow[] rows;
	double[] widths;
	private Boolean header = false;
	private Boolean footer = false;
	private Boolean without_header = false;
	private String profile = "gray";
	private double[] orientation = null;

	public void setXML(String xml, HttpServletResponse resp)
	throws IOException, DOMException, ParserConfigurationException, SAXException {
		DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance ();
		DocumentBuilder db = dbf.newDocumentBuilder();

		Document dom = null;
		try {
			dom = db.parse(new InputSource(new StringReader(xml)));
		}catch(SAXException se) {
			se.printStackTrace();
		}catch(IOException ioe) {
			ioe.printStackTrace();
		}
		root = dom.getDocumentElement();

		String header_string = root.getAttribute("header");
		if ((header_string != null)&&(header_string.equalsIgnoreCase("true") == true)) {
			header = true;
		}
		String footer_string = root.getAttribute("footer");
		if ((footer_string != null)&&(footer_string.equalsIgnoreCase("true") == true)) {
			footer = true;
		}
		String profile_string = root.getAttribute("profile");
		if (profile_string != null) {
			profile = profile_string;
		}

		String orientation_string = root.getAttribute("orientation");
		getHeaderInfo();
		if (orientation_string != "") {
			if (orientation_string.equalsIgnoreCase("landscape")) {
				orientation = A4.LANDSCAPE;
			} else {
				orientation = A4.PORTRAIT;
			}
		} else {
			double sum_width = 0;
			for (int i = 0; i < widths.length; i++)
				sum_width += widths[i];
			if (sum_width/widths.length < 80)
				orientation = Letter.LANDSCAPE;
			else
				orientation = Letter.PORTRAIT;
		}
		String w_header = root.getAttribute("without_header");
		if ((w_header != null)&&(w_header.equalsIgnoreCase("true") == true))
			without_header = true;
	}
	public PDFColumn[][] getHeaderInfo() {
		PDFColumn[] colLine = null;
		NodeList n1 = root.getElementsByTagName("columns");
		if ((n1 != null)&&(n1.getLength() > 0)) {
			columns = new PDFColumn[n1.getLength()][];
			for (int i = 0; i < n1.getLength(); i++) {
				Element cols = (Element) n1.item(i);
				NodeList n2 = cols.getElementsByTagName("column");
				if ((n2 != null)&&(n2.getLength() > 0)) {
					colLine = new PDFColumn[n2.getLength()];
					for (int j = 0; j < n2.getLength(); j++) {
						Element col_xml = (Element) n2.item(j);
						PDFColumn col = new PDFColumn();
						col.parse(col_xml);
						colLine[j] = col;
					}
				}
				columns[i] = colLine;
			}
		}
		createWidthsArray();
		optimizeColumns();
		return columns;
	}

	private void createWidthsArray() {
		widths = new double[columns[0].length];
		for (int i = 0; i < columns[0].length; i++) {
			widths[i] = columns[0][i].getWidth();
		}
	}

	private void optimizeColumns() {
		for (int i = 1; i < columns.length; i++) {
			for (int j = 0; j < columns[i].length; j++) {
				columns[i][j].setWidth(columns[0][j].getWidth());
			}
		}
		for (int i = 0; i < columns.length; i++) {
			for (int j = 0; j < columns[i].length; j++) {
				if (columns[i][j].getColspan() > 0) {
					for (int k = j + 1; k < j + columns[i][j].getColspan(); k++) {
						columns[i][j].setWidth(columns[i][j].getWidth() + columns[i][k].getWidth());
						columns[i][k].setWidth(0);
					}
				}
				if (columns[i][j].getRowspan() > 0) {
					for (int k = i + 1; k < i + columns[i][j].getRowspan(); k++) {
						columns[i][j].setHeight(columns[i][j].getHeight() + 1);
						columns[k][j].setHeight(0);
					}
				}
			}
		}
	}

	public PDFRow[] getGridContent(HttpServletResponse resp) throws IOException {
		NodeList nodes = root.getElementsByTagName("row");
		if ((nodes != null)&&(nodes.getLength() > 0)) {
			rows = new PDFRow[nodes.getLength()];
			for (int i = 0; i < nodes.getLength(); i++) {
				rows[i] = new PDFRow();
				rows[i].parse(nodes.item(i), resp);
			}
		}
		return rows;

	}

	public double[] getWidths() {
		return widths;
	}

	public boolean getHeader() {
		return header;
	}

	public Boolean getFooter() {
		return footer;
	}

	public double[] getOrientation() {
		return orientation;
	}

	public String getProfile() {
		return profile;
	}

	public boolean getWithoutHeader() {
		return without_header;
	}

}