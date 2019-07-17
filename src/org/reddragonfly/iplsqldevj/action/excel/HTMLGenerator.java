package org.reddragonfly.iplsqldevj.action.excel;

import java.io.IOException;
import java.net.URLDecoder;
import javax.servlet.http.*;

import com.dhtmlx.xml2excel.HTMLWriter;

public class HTMLGenerator extends HttpServlet {

		public void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
			req.setCharacterEncoding("UTF-8");
			String xml = req.getParameter("grid_xml");
			xml = URLDecoder.decode(xml, "UTF-8");
			HTMLWriter writer = new HTMLWriter();
			writer.generate(xml, resp);
		}
}
