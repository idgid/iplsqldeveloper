package com.dhtmlx.xml2excel;
import java.io.*;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.w3c.dom.*;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

public class ExcelXmlParser {
	private Element root;
	private ExcelRow[] rows;
	private int[] widths;
	private Boolean header = false;
	private Boolean footer = false;
	private Boolean without_header = false;
	private String profile = "gray";

	public void setXML(String xml)
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

		String header_text = root.getAttribute("header");
		if ((header_text != null)&&(header_text.equalsIgnoreCase("true") == true)) {
			header = true;
		}
		String footer_text = root.getAttribute("footer");
		if ((footer_text != null)&&(footer_text.equalsIgnoreCase("true") == true)) {
			footer = true;
		}
		String profile_text = root.getAttribute("profile");
		if (profile_text != null) {
			profile = profile_text;
		}
		String w_header = root.getAttribute("without_header");
		if ((w_header != null)&&(w_header.equalsIgnoreCase("true") == true))
			without_header = true;
	}

	public ExcelColumn[][] getColumnsInfo(String mode) {
		ExcelColumn[] colLine = null;
		ExcelColumn[][] columns = null;

		XPathFactory xpathFactory = XPathFactory.newInstance();
		XPath xpath = xpathFactory.newXPath();
		try {
			String path = "/rows/".concat(mode).concat("/columns");
			NodeList n1 = (NodeList) xpath.evaluate(path, root,
			    XPathConstants.NODESET);

			if ((n1 != null)&&(n1.getLength() > 0)) {

				columns = new ExcelColumn[n1.getLength()][];
				for (int i = 0; i < n1.getLength(); i++) {
					Element cols = (Element) n1.item(i);
					NodeList n2 = cols.getElementsByTagName("column");
					if ((n2 != null)&&(n2.getLength() > 0)) {
						colLine = new ExcelColumn[n2.getLength()];
						for (int j = 0; j < n2.getLength(); j++) {
							Element col_xml = (Element) n2.item(j);
							ExcelColumn col = new ExcelColumn();
							col.parse(col_xml);
							colLine[j] = col;
						}
					}
					columns[i] = colLine;
				}
			} else {
				return null;
			}
		} catch (XPathExpressionException e) {
			e.printStackTrace();
		}

		createWidthsArray(columns);
		columns = optimizeColumns(columns);
		return columns;
	}

	private void createWidthsArray(ExcelColumn[][] columns) {
		widths = new int[columns[0].length];
		for (int i = 0; i < columns[0].length; i++) {
			widths[i] = columns[0][i].getWidth();
		}
	}

	private ExcelColumn[][] optimizeColumns(ExcelColumn[][] columns) {
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
		return columns;
	}

	public ExcelRow[] getGridContent() {
		NodeList nodes = root.getElementsByTagName("row");
		if ((nodes != null)&&(nodes.getLength() > 0)) {
			rows = new ExcelRow[nodes.getLength()];
			for (int i = 0; i < nodes.getLength(); i++) {
				rows[i] = new ExcelRow();
				rows[i].parse(nodes.item(i));
			}
		}
		return rows;
	}

	public int[] getWidths() {
		return widths;
	}

	public boolean getHeader() {
		return header;
	}

	public Boolean getFooter() {
		return footer;
	}

	public String getProfile() {
		return profile;
	}
	
	public boolean getWithoutHeader() {
		return without_header;
	}

}