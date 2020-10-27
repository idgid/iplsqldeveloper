package com.dhtmlx.xml2pdf;
import java.util.Hashtable;
import java.util.regex.*;



public class RGBColor {
	static Hashtable<String, double[]> parsedColors = new Hashtable<String, double[]>();

	public static double[] getColor(String color) {
		if (parsedColors.containsKey(color))
			return (double[]) parsedColors.get(color);
		String original = color;
		color = RGBColor.processColorForm(color);
		double[] result = new double[3];
		String r = color.substring(0, 2);
		String g = color.substring(2, 4);
		String b = color.substring(4, 6);
		result[0] = Integer.parseInt(r, 16)/255.0;
		result[1] = Integer.parseInt(g, 16)/255.0;
		result[2] = Integer.parseInt(b, 16)/255.0;
		parsedColors.put(original, result);
		return result;
	}

	public static String processColorForm(String color) {
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