package com.troptimize.commons;

public enum PriceAdjustmentType {
	PERCENTAGE("percentage"),
	AMOUNT_OFF("INR");
	
	String value;
	private PriceAdjustmentType(String value) {
		this.value=value;
	}
	public String getValue() {
		return value;
	}
	
}
