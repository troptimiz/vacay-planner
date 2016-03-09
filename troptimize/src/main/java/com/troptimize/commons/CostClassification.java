package com.troptimize.commons;

public enum CostClassification {
	
	LOW_COST("Low Cost"),
	MID_COST("Mid-Cost"),
	ELITE("Elite");
	
	private String value;
	private CostClassification(String value){
		this.value=value;
	}
	public String getValue() {
		return value;
	}
	
	
	
}
