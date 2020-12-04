package org.reddragonfly.iplsqldevj.action.pdf;

import java.io.IOException;
import java.net.URLDecoder;
import javax.servlet.http.*;

import com.dhtmlx.xml2pdf.PDFWriter;
import com.opensymphony.xwork2.ActionContext;
import org.apache.struts2.ServletActionContext;
import org.reddragonfly.iplsqldevj.action.BaseAction;


@SuppressWarnings("serial")

public class PDFGeneratorAction extends BaseAction {

    private String grid_xml;

    public String getGrid_xml() {
        return grid_xml;
    }

    public void setGrid_xml(String grid_xml) {
        this.grid_xml = grid_xml;
    }

    public String execute() throws Exception {
        ActionContext ctx = ActionContext.getContext();
        HttpServletResponse resp = (HttpServletResponse)ctx.get(ServletActionContext.HTTP_RESPONSE);
        HttpServletRequest req = (HttpServletRequest)ctx.get(ServletActionContext.HTTP_REQUEST);
        String xml;
        xml = req.getParameter("grid_xml");
        xml = URLDecoder.decode(xml, "UTF-8");
        (new PDFWriter()).generate(xml, resp);
        return null;
    }
}
