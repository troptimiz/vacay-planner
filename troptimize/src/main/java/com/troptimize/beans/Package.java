package com.troptimize.beans;

import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Transient;

public class Package {
	
	private String id;
	
	private String title;
	
	private String description;
	
	private double cost;
	
	private List<Map<String, String>> pricerules;
	
	@Transient
	private List<PriceRule> priceRuleDetails;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public double getCost() {
		return cost;
	}
	public void setCost(double cost) {
		this.cost = cost;
	}
	public List<Map<String, String>> getPricerules() {
		return pricerules;
	}
	public void setPricerules(List<Map<String, String>> pricerules) {
		this.pricerules = pricerules;
	}
	public List<PriceRule> getPriceRuleDetails() {
		return priceRuleDetails;
	}
	public void setPriceRuleDetails(List<PriceRule> priceRuleDetails) {
		this.priceRuleDetails = priceRuleDetails;
	}
	
}
