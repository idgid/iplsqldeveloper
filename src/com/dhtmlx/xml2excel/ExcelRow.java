package com.dhtmlx.xml2excel;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;


public class ExcelRow {

	private ExcelCell[] cells;
	
	public void parse(Node parent) {
		NodeList nodes = ((Element) parent).getElementsByTagName("cell");
		Node text_node;
		if ((nodes != null)&&(nodes.getLength() > 0)) {
			//(REV) do we really need them?
			cells = new ExcelCell[nodes.getLength()];
			for (int i = 0; i < nodes.getLength(); i++) {
				text_node = nodes.item(i);
				ExcelCell cell = new ExcelCell();
				if (text_node != null)
					cell.parse(text_node);
				cells[i] = cell;
			}
		}
	}
	
	public ExcelCell[] getCells() {
		return cells;
	}
}
