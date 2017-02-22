package com.troptimize.beans;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="facilities")
public class Facility {

	@Id
	private String id;
	
	private String name;
	
	private String facilityGroupId;

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

	public String getFacilityGroupId() {
		return facilityGroupId;
	}

	public void setFacilityGroupId(String facilityGroupId) {
		this.facilityGroupId = facilityGroupId;
	}
	
}
