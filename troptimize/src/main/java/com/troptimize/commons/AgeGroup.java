package com.troptimize.commons;
 
/**
 * This enum can be used to identify AgeGroup for price rule calculation in admin this value is held in Gender Field.
 * @author m4ver1k
 *
 */
public enum AgeGroup {
	CHILD("child"),
	ADULT("adult"),
	SENIOR_CITIZEN("seniorcitizen");
	private String value;
	
	private AgeGroup(String value){
		this.value=value;
	}
	public String getValue() {
		return value;
	}
}
