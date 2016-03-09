package com.troptimize.commons;

public enum PropertyClassification {
	DAY_OUT("Day-Out"),
	HOTEL("Hotel");
	
	private String value;
	private PropertyClassification(String value) {
		this.value = value;
	}
	public String getValue() {
		return value;
	}
}
