package com.troptimize.beans;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection="categories")
public class Category {
	@Id
	private String id;
	
	private String name;
	
	private String description;
	
	@Field("short_desc")
	private String shortDescription;
	
	private String imageUrl;
	
	@Field("is_active")
	private Boolean active;
	
	private List<ClassificationGroup> classification ;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getShortDescription() {
		return shortDescription;
	}

	public void setShortDescription(String shortDescription) {
		this.shortDescription = shortDescription;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public List<ClassificationGroup> getClassification() {
		return classification;
	}

	public void setClassification(List<ClassificationGroup> classification) {
		this.classification = classification;
	} 
	
	
}
