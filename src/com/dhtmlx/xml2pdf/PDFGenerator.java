package com.dhtmlx.xml2pdf;

import java.io.IOException;
import java.net.URLDecoder;
import javax.servlet.http.*;



@SuppressWarnings("serial")
public class PDFGenerator extends HttpServlet {
	public void doPost(HttpServletRequest req, HttpServletResponse resp)
	throws IOException {
		String xml;
		xml = req.getParameter("grid_xml");
		xml = URLDecoder.decode(xml, "UTF-8");
		(new PDFWriter()).generate(xml, resp);
	}
}
