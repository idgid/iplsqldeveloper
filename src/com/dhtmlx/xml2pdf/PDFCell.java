package com.dhtmlx.xml2pdf;

import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.w3c.dom.Element;
import org.w3c.dom.Node;

public class PDFCell {

	private String value = "";
	private String bgColor = "";
	private String textColor = "";
	private String bold = "";
	private String italic = "";
	private String align = "";

	public void parse(Node parent, HttpServletResponse resp) throws IOException {
		value = parent.getFirstChild().getNodeValue();
		Element el = (Element) parent;
		bgColor = (el.hasAttribute("bgColor")) ? el.getAttribute("bgColor") : "";
		textColor = (el.hasAttribute("textColor")) ? el.getAttribute("textColor") : "";
		bold = (el.hasAttribute("bold")) ? el.getAttribute("bold") : "";
		italic = (el.hasAttribute("italic")) ? el.getAttribute("italic") : "";
		align = (el.hasAttribute("align")) ? el.getAttribute("align") : "";
	}

	public String getValue() {
		return value;
	}

	public String getBgColor() {
		return bgColor;
	}

	public String getTextColor() {
		return textColor;
	}

	public Boolean getBold() {
		if (bold.equals("bold"))
			return true;
		else
			return false;
	}
	
	public Boolean getItalic() {
		if (italic.equals("italic"))
			return true;
		else
			return false;
	}
	
	public String getAlign() {
		return align;
	}

}