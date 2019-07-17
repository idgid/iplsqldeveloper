package com.dhtmlx.xml2excel;

public class Colors {

	public String bgColor = "D1E5FE";
	public String lineColor = "A4BED4";
	public String headerTextColor = "000000";
	public String scaleOneColor = "FFFFFF";
	public String scaleTwoColor = "E3EFFF";
	public String gridTextColor = "000000";
	public String watermarkTextColor = "8b8b8b";

	
	public void setColorProfile(String profile) {
		if ((profile.equalsIgnoreCase("color"))||profile.equalsIgnoreCase("full_color")) {
			bgColor = "D1E5FE";
			lineColor = "A4BED4";
			headerTextColor = "000000";
			scaleOneColor = "FFFFFF";
			scaleTwoColor = "E3EFFF";
			gridTextColor = "000000";
			watermarkTextColor = "8b8b8b";
		} else {
			if (profile.equalsIgnoreCase("gray")) {
				bgColor = "E3E3E3";
				lineColor = "B8B8B8";
				headerTextColor = "000000";
				scaleOneColor = "FFFFFF";
				scaleTwoColor = "EDEDED";
				gridTextColor = "000000";
				watermarkTextColor = "8b8b8b";
			} else {
				bgColor = "FFFFFF";
				lineColor = "000000";
				headerTextColor = "000000";
				scaleOneColor = "FFFFFF";
				scaleTwoColor = "FFFFFF";
				gridTextColor = "000000";
				watermarkTextColor = "000000";
			}
		}
	}
}
