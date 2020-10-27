package org.reddragonfly.iplsqldevj.action.excel;

import com.dhtmlx.xml2excel.HTMLWriter;
import com.opensymphony.xwork2.ActionContext;
import org.apache.struts2.ServletActionContext;
import org.reddragonfly.iplsqldevj.action.BaseAction;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLDecoder;

@SuppressWarnings("serial")
public class HTMLGeneratorAction extends BaseAction {
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
        String xml = req.getParameter("grid_xml");
        xml = URLDecoder.decode(xml, "UTF-8");
        HTMLWriter writer = new HTMLWriter();
        writer.generate(xml, resp);
        return xml;
    }
}
