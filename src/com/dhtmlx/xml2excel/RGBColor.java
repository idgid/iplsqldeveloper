package com.dhtmlx.xml2excel;

import java.util.Hashtable;
import java.util.regex.*;

import jxl.format.Colour;
import jxl.write.WritableWorkbook;

public class RGBColor {
	int colorCounter = 63;
	Hashtable<String, Colour> parsedColors = new Hashtable<String, Colour>();

	public Colour getColor(String color, WritableWorkbook wb) {
		int[] result;
		String original = color;
		if (!parsedColors.containsKey(color)) {
			color = processColorForm(color);
			result = new int[3];
			String r = color.substring(0, 2);
			String g = color.substring(2, 4);
			String b = color.substring(4, 6);
			result[0] = Integer.parseInt(r, 16);
			result[1] = Integer.parseInt(g, 16);
			result[2] = Integer.parseInt(b, 16);
			
			Colour col = new Colour(colorCounter, "custom", result[0], result[1], result[2]);
			wb.setColourRGB(col, (int) result[0], (int) result[1], (int) result[2]);
			parsedColors.put(original, col);
			
			colorCounter--;
			if (colorCounter<32) colorCounter=63;
			
			return col;
		} else {
			return parsedColors.get(color);
		}
	}

	public String processColorForm(String color) {
		if (color.equals("transparent")) {
			return "";
		}

		Pattern p1 = Pattern.compile("#[0-9A-Fa-f]{6}");
		Matcher m1 = p1.matcher(color);
		if (m1.matches()) {
			return color.substring(1);
		}

		Pattern p2 = Pattern.compile("[0-9A-Fa-f]{6}");
		Matcher m2 = p2.matcher(color);
		if (m2.matches()) {
			return color;
		}

		Pattern p3 = Pattern.compile("rgb\\s?\\(\\s?(\\d{1,3})\\s?,\\s?(\\d{1,3})\\s?,\\s?(\\d{1,3})\\s?\\)");
		Matcher m3 = p3.matcher(color);

		if (m3.matches()) {
			color = "";
			String r = m3.group(1);
			String g = m3.group(2);
			String b = m3.group(3);
			r = Integer.toHexString(Integer.parseInt(r));
			r = (r.length() == 1) ? "0" + r : r;
			g = Integer.toHexString(Integer.parseInt(g));
			g = (g.length() == 1) ? "0" + g : g;
			b = Integer.toHexString(Integer.parseInt(b));
			b = (b.length() == 1) ? "0" + b : b;
			color = r + g + b;
			return color;
		}
		return "";
	}
}