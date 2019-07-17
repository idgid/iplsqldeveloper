package com.dhtmlx.xml2excel;
import java.io.IOException;
import java.net.URLDecoder;
import javax.servlet.http.*;


@SuppressWarnings("serial")
public class ExcelGenerator extends HttpServlet {
	private String mode = "csv";
	public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
		String xml = req.getParameter("grid_xml");
		xml = URLDecoder.decode(xml, "UTF-8");
		(new ExcelWriter()).generate(xml, resp);
	}

}