package com.troptimize.beans;

import java.util.List;
import java.util.Map;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author m4ver1k
 *
 */
@Document(collection = "products")
public class Product {

	@Id
	private String id;

	private String type;

	private String category;
	
	private String actualName;
	
	private String name;
	
	private String city;
	
	private String state;
	
	private String country;
	
	private String routeTips;
	
	private int starRating;
	
	private String description;
	
	private String emailAddress;
	
	private List<Address> addresses;
	
	private List<ClassificationGroup> classifications;
	
	private List<Image> images;
	
	@JsonIgnore
	private List<Map<String, String>> facilities;
	
	private List<Package> packages;
	
	@Transient
	private Map<String, Package> packagesMap;
	
	private List<PhoneNumber> phoneNumbers;
	
	private List<Map<String, String>> termsAndConditions;
	
	private List<Map<String, String>> amenities;
	
	private List<Map<String, String>> taxes;
	
	@Transient
	private List<Facility> facilityDetails;
	
	@Field("is_active")
	private Boolean active;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getActualName() {
		return actualName;
	}

	public void setActualName(String actualName) {
		this.actualName = actualName;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getRouteTips() {
		return routeTips;
	}

	public void setRouteTips(String routeTips) {
		this.routeTips = routeTips;
	}

	public int getStarRating() {
		return starRating;
	}

	public void setStarRating(int starRating) {
		this.starRating = starRating;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getEmailAddress() {
		return emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public List<Address> getAddresses() {
		return addresses;
	}

	public void setAddresses(List<Address> addresses) {
		this.addresses = addresses;
	}

	public List<ClassificationGroup> getClassifications() {
		return classifications;
	}

	public void setClassifications(List<ClassificationGroup> classifications) {
		this.classifications = classifications;
	}

	public List<Image> getImages() {
		return images;
	}

	public void setImages(List<Image> images) {
		this.images = images;
	}

	public List<Map<String, String>> getFacilities() {
		return facilities;
	}

	public void setFacilities(List<Map<String, String>> facilities) {
		this.facilities = facilities;
	}

	public List<Package> getPackages() {
		return packages;
	}

	public void setPackages(List<Package> packages) {
		this.packages = packages;
	}

	public List<PhoneNumber> getPhoneNumbers() {
		return phoneNumbers;
	}

	public void setPhoneNumbers(List<PhoneNumber> phoneNumbers) {
		this.phoneNumbers = phoneNumbers;
	}

	public List<Map<String, String>> getTermsAndConditions() {
		return termsAndConditions;
	}

	public void setTermsAndConditions(List<Map<String, String>> termsAndConditions) {
		this.termsAndConditions = termsAndConditions;
	}

	public List<Map<String, String>> getAmenities() {
		return amenities;
	}

	public void setAmenities(List<Map<String, String>> amenities) {
		this.amenities = amenities;
	}

	public List<Map<String, String>> getTaxes() {
		return taxes;
	}

	public void setTaxes(List<Map<String, String>> taxes) {
		this.taxes = taxes;
	}

	public List<Facility> getFacilityDetails() {
		return facilityDetails;
	}

	public void setFacilityDetails(List<Facility> facilityDetails) {
		this.facilityDetails = facilityDetails;
	}

	public Map<String, Package> getPackagesMap() {
		return packagesMap;
	}

	public void setPackagesMap(Map<String, Package> packagesMap) {
		this.packagesMap = packagesMap;
	}
	
	
}
