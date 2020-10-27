package com.dhtmlx.xml2pdf;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;


public class PDFRow {

	private PDFCell[] cells;

	public void parse(Node parent, HttpServletResponse resp) throws IOException {
		NodeList nodes = ((Element) parent).getElementsByTagName("cell");
		Node text_node;
		if ((nodes != null)&&(nodes.getLength() > 0)) {
			cells = new PDFCell[nodes.getLength()];
			for (int i = 0; i < nodes.getLength(); i++) {
				PDFCell cell = new PDFCell();
				text_node = nodes.item(i);
				if (text_node != null)
					cell.parse(text_node, resp);
				cells[i] = cell;
			}
		}
	}

	public PDFCell[] getCells() {
		return cells;
	}
}
