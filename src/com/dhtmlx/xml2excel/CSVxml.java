package com.dhtmlx.xml2excel;
import java.io.IOException;
import java.io.StringReader;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

public class CSVxml {
	private Document dom;
	private String profile;
	private NodeList header;
	private NodeList rows;
	private NodeList footer;
	private int headerPos;
	private int footerPos;
	private int rowsPos;
	private void parseXmlString(String xml_string){
		//get the factory
		DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();

		try {
			//Using factory get an instance of document builder
			DocumentBuilder db = dbf.newDocumentBuilder();

			//parse using builder to get DOM representation of the XML file
			StringReader reader = new StringReader(xml_string);
			InputSource inputSource = new InputSource(reader);
			inputSource.setEncoding("UTF-8");
			dom = db.parse(inputSource);
			reader.close();
			
			profile = dom.getDocumentElement().getAttribute("profile");
			if (profile == null) profile = "color";
			
			header = dom.getElementsByTagName("head");
			if (header.getLength()>0){
				header = header.item(0).getChildNodes();
				header = removeSettings(header);
			}
			headerPos = 0;
			
			footer = dom.getElementsByTagName("foot");
			if (footer.getLength()>0){
				footer = footer.item(0).getChildNodes();
				footer = removeSettings(footer);
			}
			footerPos = 0;
			
			rows = dom.getElementsByTagName("row");
			rowsPos = 0;
			
		}catch(ParserConfigurationException pce) {
			pce.printStackTrace();
		}catch(SAXException se) {
			se.printStackTrace();
		}catch(IOException ioe) {
			ioe.printStackTrace();
		}
	}
	
	public CSVxml(String xml) {
		parseXmlString(xml);
	}
	
	private String[] getDataArray(Node node){
		NodeList columns = node.getChildNodes();
		String[] data = new String[columns.getLength()];
		for	(int i=columns.getLength()-1; i>=0; i--)
			data[i] = columns.item(i).getTextContent();
		
		return data;
	}
	public String[] getHeader(){
		if (header==null || header.getLength() <= headerPos) return null;
		Node node = header.item(headerPos);
		headerPos += 1;
		
		return getDataArray(node);
	}
	public String[] getFooter(){
		if (footer == null || footer.getLength() <= footerPos) return null;
		Node node = footer.item(footerPos);
		footerPos += 1;
		
		return getDataArray(node);
	}
	public String[] getRow(){
		if (rows == null || rows.getLength() <= rowsPos) return null;
		Node node = rows.item(rowsPos);
		rowsPos += 1;
		
		return getDataArray(node);
	}
	
	private NodeList removeSettings(NodeList header) {
		// remove settings sections
		for (int i = 0; i < header.getLength(); i++) {
			NodeList childs = header.item(i).getChildNodes();
			for (int j = 0; j < childs.getLength(); j++) {
				if (childs.item(j).getNodeType() == 3 || childs.item(j).getNodeName().equals("settings"))
					header.item(i).removeChild(childs.item(j));
			}
		}
		return header;
	}

	public String getProfile() {
		return profile;
	}
}
