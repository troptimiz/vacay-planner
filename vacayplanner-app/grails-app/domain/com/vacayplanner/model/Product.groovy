package com.vacayplanner.model

class Product {
	
	String name
	String description
	String emailAddress
	boolean isActive
	
	// Aggregations  - Primitive Type
	
	String[] termsAndConditions
	String[] amenities
	
	// Aggregations - Custom Type
	
	Address[] addresses
	PhoneNumber[] phoneNumbers
	Tariff[] tariffs;
	
	

}
