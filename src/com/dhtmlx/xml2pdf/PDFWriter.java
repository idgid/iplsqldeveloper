package com.dhtmlx.xml2pdf;

import com.pdfjet.*;

import java.io.FileInputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Iterator;

import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.DOMException;
import org.xml.sax.SAXException;

public class PDFWriter {
	private PDFXMLParser parser;
	private PDF pdf;
	private Page page;
	private ArrayList<Page> pages;

	private double[] widths;
	private double widthSum = 0;
	private double headerHeight = 0;
	private double pageWidth = 0;
	private double pageHeight = 0;

	public double offsetTop = 30;
	public double offsetBottom = 30;
	public double offsetLeft = 30;
	public double offsetRight = 30;
	public double lineHeight = 20;
	public double cellOffset = 3;
	public String pathToImgs = "";
	public double headerImgHeight = 100;
	public double footerImgHeight = 100;

	public double fontSize = 10;

	private String bgColor;
	private String lineColor;
	private String headerTextColor;
	private String scaleOneColor;
	private String scaleTwoColor;
	private String gridTextColor;
	private String pageTextColor;
	private String chBg1;
	private String chBg2;
	private String chBg3;
	private String chBg4;
	private String chMarker;
	private String raBg;
	private String watermarkTextColor;

	public double headerLineHeight = 30;
	public String pageNumTemplate = "Page {pageNum}/{allNum}";
	public String watermark = null;

	private PDFColumn[][] cols = null;

	private Font f1 = null;
	private Font f2 = null;
	private Font f3 = null;
	private Font f4 = null;

	private boolean firstPage = false;
	private double footerHeight = 0;
	private int cols_stat;
	private int rows_stat;

	public void generate(String xml, HttpServletResponse resp){
		parser = new PDFXMLParser();
		try {
			parser.setXML(xml, resp);

			createPDF();
			setColorProfile();
			headerPrint();
			printRows(resp);
			printFooter();
			printPageNumbers();
			outputPDF(resp);

		} catch (DOMException e) {
			e.printStackTrace();
		} catch (ParserConfigurationException e) {
			e.printStackTrace();
		} catch (SAXException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} catch (Throwable e) {
			e.printStackTrace();
		}
	}


	private void createPDF() throws Exception {
		pdf = new PDF();
		f1 = new Font(pdf, "Helvetica");
		f1.setSize(fontSize);

		pages = new ArrayList<Page>();
		page = new Page(pdf, parser.getOrientation());
		pages.add(page);
		double[] sizes = parser.getOrientation();
		pageWidth = sizes[0] - offsetLeft - offsetRight;
		pageHeight = sizes[1] - offsetTop - offsetBottom;
		printHeader();

	}

	private void headerPrint() throws Exception {
		f1.setSize(fontSize);
		if (cols == null) {
			cols = parser.getHeaderInfo();
			widths = parser.getWidths();
			for (int i = 0; i < cols[0].length; i++) {
				widthSum += cols[0][i].getWidth();
			}
		}

		cols_stat = cols.length;

		double[] bg = RGBColor.getColor(bgColor);
		double[] border = RGBColor.getColor(lineColor);
		double x = offsetLeft;
		double y = offsetTop;
		int lines = 0;

		for (int i = 0; i < cols.length; i++) {
			x = offsetLeft;
			if (cols[i][0].isFooter()) continue;
			for (int j = 0; j < cols[i].length; j++) {
				PDFColumn column = cols[i][j];

				x += printColumn(column, bg, border, x, y);
			}
			y += headerLineHeight;
			lines++;
		}

		headerHeight = lines*headerLineHeight;
		footerHeight = (cols.length - lines)*headerLineHeight;
		y = pageHeight-headerHeight-footerHeight;
		y = Math.floor(y/lineHeight)*lineHeight+offsetTop+headerHeight;

		for (int i = 0; i < cols.length; i++) {
			if (!cols[i][0].isFooter()) continue;
			x = offsetLeft;
			for (int j = 0; j < cols[i].length; j++) {
				PDFColumn column = cols[i][j];
				x += printColumn(column, bg, border, x, y);
			}
			y += headerLineHeight;
		}
	}

	private double printColumn(PDFColumn column, double[] bg, double[] border, double x, double y) throws Exception {
		double width = column.getWidth()*pageWidth/widthSum;
		double height = column.getHeight()*headerLineHeight;
		if (height > 0) {
			Box cell = new Box();
			cell.setPosition(x, y);
			cell.setSize(width, height);
			cell.setColor(border);
			Box cellIn = new Box();
			cellIn.setPosition(0, 0);
			cellIn.setSize(width, height);
			cellIn.placeIn(cell, 0, 0);
			cellIn.setFillShape(true);
			cellIn.setColor(bg);
			cellIn.drawOn(page);
			String label = textWrap(column.getName(), width - 2*cellOffset, f1);
			TextLine text = new TextLine(f1, label);
			double text_x = (width - f1.stringWidth(label))/2;
			double text_y = (height + f1.getSize())/2;
			text.setPosition(text_x, text_y);
			text.placeIn(cellIn);
			text.setColor(RGBColor.getColor(headerTextColor));
			text.drawOn(page);
			cell.drawOn(page);
		}
		return width;
	}


	private void printRows(HttpServletResponse resp) throws Exception {
		PDFRow[] rows = parser.getGridContent(resp);
		rows_stat = rows.length;
		double[] rowColor;
		double[] border = RGBColor.getColor(lineColor);
		double y = offsetTop + headerHeight;

		Font cf;

		for (int i = 0; i < rows.length; i++) {
			double x = offsetLeft;
			PDFCell[] cells = rows[i].getCells();
			if (i%2 == 0) {
				rowColor = RGBColor.getColor(scaleOneColor);
			} else {
				rowColor = RGBColor.getColor(scaleTwoColor);
			}
			for (int j = 0; j < cells.length; j++) {
				double width = widths[j]*pageWidth/widthSum;
				String al = cells[j].getAlign();
				if (al.equalsIgnoreCase(""))
					al = cols[0][j].getAlign();
				String tp = cols[0][j].getType();
				Box cell = new Box();
				cell.setPosition(x, y);
				cell.setSize(width, lineHeight);
				cell.setColor(border);
				Box cellIn = new Box();
				cellIn.setPosition(0, 0);
				cellIn.setSize(width, lineHeight);
				cellIn.placeIn(cell, 0, 0);
				cellIn.setFillShape(true);
				cellIn.setColor( ( (!cells[j].getBgColor().equals("")) && (parser.getProfile().equals("full_color")) ) ? RGBColor.getColor(cells[j].getBgColor()) : rowColor);
				cellIn.drawOn(page);

				if (cells[j].getBold()){
					if (cells[j].getItalic()){
						if (f4 == null){
							f4 = new Font(pdf, "Helvetica-BoldOblique");
							f4.setSize(10);
						}
						cf = f4;
					} else {
						if (f2 == null){
							f2 = new Font(pdf, "Helvetica-Bold");
							f2.setSize(10);
						}
						cf = f2;
					}
				} else if (cells[j].getItalic()){
					if (f3==null){
						f3 = new Font(pdf, "Helvetica-Oblique");
						f3.setSize(10);
					}
					cf = f3;
				} else {
					cf = f1;
				}

				TextLine text = new TextLine(cf, textWrap(cells[j].getValue(), width - 2*cellOffset, cf));
				double text_x = 0;
				if (al.equalsIgnoreCase("left") == true) {
					text_x = cellOffset;
				} else {
					if (al.equalsIgnoreCase("right") == true) {
						text_x = width - cf.stringWidth(text.getText()) - cellOffset;
					} else {
						text_x = (width - cf.stringWidth(text.getText()))/2;
					}
				}
				cell.drawOn(page);
				if (tp.equalsIgnoreCase("ch")) {
					double ch_x = width/2;
					double ch_y = lineHeight/2;
					if (text.getText().equalsIgnoreCase("1") == true) {
						drawCheckbox(true, ch_x, ch_y, cellIn);
					} else {
						drawCheckbox(false, ch_x, ch_y, cellIn);
					}
				} else {
					if (tp.equalsIgnoreCase("ra")) {
						double ch_x = width/2;
						double ch_y = lineHeight/2;
						if (text.getText().equalsIgnoreCase("1") == true) {
							drawRadio(true, ch_x, ch_y, cellIn);
						} else {
							drawRadio(false, ch_x, ch_y, cellIn);
						}
					} else {
						double text_y = (lineHeight + f1.getSize())/2;
						text.setPosition(text_x, text_y);
						text.placeIn(cellIn);
						double[] textColor = (!cells[j].getTextColor().equals("") && parser.getProfile().equals("full_color")) ? RGBColor.getColor(cells[j].getTextColor()) : RGBColor.getColor(gridTextColor);
						text.setColor(textColor);
						text.drawOn(page);
					}
				}
				x += width;
			}
			y += lineHeight;
			if (y + lineHeight - offsetTop + footerHeight>= pageHeight) {
				page = new Page(pdf, parser.getOrientation());
				pages.add(page);
				if (firstPage == true) {
					pageHeight += headerImgHeight;
					offsetTop -= headerImgHeight;
					firstPage = false;
				}
				headerPrint();
				y = offsetTop + headerHeight;
			}
			x = offsetLeft;
		}
		f1 = new Font(pdf, "Helvetica");
	}

	private void printPageNumbers() throws Exception {
		Iterator<Page> itr = pages.iterator();
		int i = 1;
		while (itr.hasNext()) {
			Page page = itr.next();
			String str = pageNumTemplate;
			str = str.replace("{pageNum}", Integer.toString(i));
			str = str.replace("{allNum}", Integer.toString(pages.size()));
			TextLine text = new TextLine(f1, str);
			text.setColor(RGBColor.getColor(pageTextColor));
			double x = pageWidth + offsetLeft - f1.stringWidth(str);
			double y = pageHeight + offsetTop + f1.getSize();
			text.setPosition(x, y);
			text.drawOn(page);
			printWatermark(page);
			i++;
		}
	}

	private void printWatermark(Page currentPage) throws Exception {
		TextLine text = new TextLine(f1, watermark);
		text.setColor(RGBColor.getColor(watermarkTextColor));
		double x = offsetLeft;
		double y = pageHeight + offsetTop + f1.getSize();
		text.setPosition(x, y);
		text.drawOn(currentPage);
	}

	private void printHeader() throws Exception {
		Boolean header = parser.getHeader();
		if (header == true) {
			String fileName = pathToImgs + "/header.jpg";
	        FileInputStream fis = new FileInputStream(fileName);
			Image im = new Image(pdf, fis, ImageType.JPEG);
			im.setPosition(offsetLeft, offsetTop);
			im.scaleBy(1);
			im.drawOn(page);
			pageHeight -= headerImgHeight;
			offsetTop += headerImgHeight;
			firstPage = true;
		}
	}

	private void printFooter() throws Exception {
		Boolean footer = parser.getFooter();
		if (footer == true) {
			String fileName = pathToImgs + "/footer.jpg";
			FileInputStream fis = new FileInputStream(fileName);
			Image im = new Image(pdf, fis, ImageType.JPEG);
			im.setPosition(offsetLeft, pageHeight + offsetTop - footerImgHeight);
			im.scaleBy(1);
			im.drawOn(page);
			pageHeight -= footerImgHeight;
			offsetTop += footerImgHeight;
			firstPage = true;
		}
	}

	private void outputPDF(HttpServletResponse resp) throws Throwable {
		pdf.wrap();
        resp.setContentType("application/pdf");
		OutputStream ot =  resp.getOutputStream();
		ot.flush();
        pdf.getData().writeTo(ot);
	}

	private String textWrap(String text, double width, Font f) {
		if ((f.stringWidth(text) <= width)||(text.length() == 0)) {
			return text;
		}
		while ((f.stringWidth(text + "...") > width)&&(text.length() > 0)) {
			text = text.substring(0, text.length() - 1);
		}
		return text + "...";
	}


	private void drawRadio(boolean value, double x, double y, Box cellIn) throws Exception {
		double[] bg1 = RGBColor.getColor(chMarker);
		Point r1 = new Point(x, y);
		r1.setRadius(3.5);
		r1.setColor(bg1);
		r1.setFillShape(true);
		r1.placeIn(cellIn, 0, 0);
		r1.drawOn(page);

		double[] bg2 = RGBColor.getColor(raBg);
		Point r2 = new Point(x, y);
		r2.setRadius(2.8);
		r2.setColor(bg2);
		r2.setFillShape(true);
		r2.placeIn(cellIn, 0, 0);
		r2.drawOn(page);

		if (value == true) {
			double[] bg3 = RGBColor.getColor(chMarker);
			Point r3 = new Point(x, y);
			r3.setRadius(1.5);
			r3.setColor(bg3);
			r3.setFillShape(true);
			r3.placeIn(cellIn, 0, 0);
			r3.drawOn(page);
		}
	}

	private void drawCheckbox(boolean value, double x, double y, Box cellIn) throws Exception {
		double[] bg1 = RGBColor.getColor(chBg1);
		Box b1 = new Box();
		b1.setSize(8, 8);
		b1.setPosition(x - 4, y - 4);
		b1.setColor(bg1);
		b1.setFillShape(true);
		b1.placeIn(cellIn, x - 4, y - 4);
		b1.drawOn(page);

		double[] bg2 = RGBColor.getColor(chBg2);
		Box b2 = new Box();
		b2.setSize(7, 7);
		b2.setPosition(1, 1);
		b2.setColor(bg2);
		b2.setFillShape(true);
		b2.placeIn(b1, 1, 1);
		b2.drawOn(page);

		double[] bg3 = RGBColor.getColor(chBg3);
		Box b3 = new Box();
		b3.setSize(6, 6);
		b3.setPosition(0, 0);
		b3.setColor(bg3);
		b3.setFillShape(true);
		b3.placeIn(b2, 0, 0);
		b3.drawOn(page);

		double[] bg4 = RGBColor.getColor(chBg4);
		Box b4 = new Box();
		b4.setSize(5, 5);
		b4.setPosition(1, 1);
		b4.setColor(bg4);
		b4.setFillShape(true);
		b4.placeIn(b3, 1, 1);
		b4.drawOn(page);

		if (value == true) {
			double[] lineColor = RGBColor.getColor(chMarker);
			Line l1 = new Line(0.5, 2, 2, 4);
			l1.setColor(lineColor);
			l1.placeIn(b4);
			l1.setWidth(1);
			l1.drawOn(page);

			Line l2 = new Line(2, 4.5, 4, 1);
			l2.setColor(lineColor);
			l2.placeIn(b4);
			l2.setWidth(1);
			l2.drawOn(page);
		}
	}

	private void setColorProfile() {
		String profile = parser.getProfile();
		if ((profile.equalsIgnoreCase("color"))||profile.equalsIgnoreCase("full_color")) {
			bgColor = "D1E5FE";
			lineColor = "A4BED4";
			headerTextColor = "000000";
			scaleOneColor = "FFFFFF";
			scaleTwoColor = "E3EFFF";
			gridTextColor = "000000";
			pageTextColor = "000000";
			chBg1 = "1d76e4";
			chBg2 = "a8caf5";
			chBg3 = "0e3b72";
			chBg4 = "ffffff";
			chMarker = "245684";
			raBg = "fcfefc";
			watermarkTextColor = "8b8b8b";
		} else {
			if (profile.equalsIgnoreCase("gray")) {
				bgColor = "E3E3E3";
				lineColor = "B8B8B8";
				headerTextColor = "000000";
				scaleOneColor = "FFFFFF";
				scaleTwoColor = "EDEDED";
				gridTextColor = "000000";
				pageTextColor = "000000";
				chBg1 = "676767";
				chBg2 = "c4c4c4";
				chBg3 = "333333";
				chBg4 = "ffffff";
				chMarker = "222222";
				raBg = "fcfefc";
				watermarkTextColor = "8b8b8b";
			} else {
				bgColor = "FFFFFF";
				lineColor = "000000";
				headerTextColor = "000000";
				scaleOneColor = "FFFFFF";
				scaleTwoColor = "FFFFFF";
				gridTextColor = "000000";
				pageTextColor = "000000";
				chBg1 = "000000";
				chBg2 = "000000";
				chBg3 = "ffffff";
				chBg4 = "ffffff";
				chMarker = "000000";
				raBg = "ffffff";
				watermarkTextColor = "000000";
			}
		}
	}


	public int getColsStat() {
		return this.cols_stat;
	}

	public int getRowsStat() {
		return this.rows_stat;
	}

	public void setWatermark(String mark) {
		watermark = mark;
	}

	public void setFontSize(Double fontsize) {
		this.fontSize = fontsize;
	}


	public void setFontSize(int fontsize) {
		fontSize = fontsize;
	}
}
