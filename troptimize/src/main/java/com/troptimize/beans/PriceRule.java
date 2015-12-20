package com.troptimize.beans;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="pricerules")
public class PriceRule {
	
	@Id
	private String id;
	
	private String priceRuleType;
	
	private String genderType;
	
	private String priceType;	
    
	private Double price;
	
	private String eventType;
	
	private String cancellationType;
	
	private int duration;
	
	private String  durationType;
    
	private int grouplimit;
	
	private String startDate;
	
	private String endDate;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPriceRuleType() {
		return priceRuleType;
	}

	public void setPriceRuleType(String priceRuleType) {
		this.priceRuleType = priceRuleType;
	}

	public String getGenderType() {
		return genderType;
	}

	public void setGenderType(String genderType) {
		this.genderType = genderType;
	}

	public String getPriceType() {
		return priceType;
	}

	public void setPriceType(String priceType) {
		this.priceType = priceType;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getEventType() {
		return eventType;
	}

	public void setEventType(String eventType) {
		this.eventType = eventType;
	}

	public String getCancellationType() {
		return cancellationType;
	}

	public void setCancellationType(String cancellationType) {
		this.cancellationType = cancellationType;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}

	public String getDurationType() {
		return durationType;
	}

	public void setDurationType(String durationType) {
		this.durationType = durationType;
	}

	public int getGrouplimit() {
		return grouplimit;
	}

	public void setGrouplimit(int grouplimit) {
		this.grouplimit = grouplimit;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	
	
}

