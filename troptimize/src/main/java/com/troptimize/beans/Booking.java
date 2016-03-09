package com.troptimize.beans;

import java.math.BigDecimal;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.troptimize.commons.BookingStatus;
import com.troptimize.commons.CustomJsonDateDeserializer;
import com.troptimize.commons.CustomJsonDateSerializer;
import com.troptimize.commons.PricingResponse;

@Document(collection="booking")
public class Booking {
	
	@Id
	private String id;
	
	private String propertyId;
	
	private String packageId;
	
	private String customerId;
	
	private String firstName;
	
	private String lastName;
	
	private String email;
	
	private String contactNumber;
	
	private int numOfAdult;
	
	private int numOfChild;

	private int numOfGents;
	
	private int numOfLadies;
	
	private String propertyType;
	
	private Date checkInDate;
	
	private Date chckoutDate;
	
	private Date bookingDate;
	
	private BookingStatus bookingStatus;
	
	private Payment payment;
	
	
	private BigDecimal totalAmount;

	//private BigDecimal totalDiscount;
	
	private BigDecimal totalTax;
	

	@Transient
	private Product product;
	
	@Transient
	private Package selectedPackage;
	
	@Transient
	private PricingResponse pricingDetails; 
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPropertyId() {
		return propertyId;
	}

	public void setPropertyId(String propertyId) {
		this.propertyId = propertyId;
	}

	public String getPackageId() {
		return packageId;
	}

	public void setPackageId(String packageId) {
		this.packageId = packageId;
	}

	
	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public int getNumOfAdult() {
		return numOfAdult;
	}

	public void setNumOfAdult(int numOfAdult) {
		this.numOfAdult = numOfAdult;
	}

	public int getNumOfChild() {
		return numOfChild;
	}

	public void setNumOfChild(int numOfChild) {
		this.numOfChild = numOfChild;
	}

	public int getNumOfGents() {
		return numOfGents;
	}

	public void setNumOfGents(int numOfGents) {
		this.numOfGents = numOfGents;
	}

	public int getNumOfLadies() {
		return numOfLadies;
	}

	public void setNumOfLadies(int numOfLadies) {
		this.numOfLadies = numOfLadies;
	}

	public String getPropertyType() {
		return propertyType;
	}

	public void setPropertyType(String propertyType) {
		this.propertyType = propertyType;
	}
	
	@JsonSerialize(using=CustomJsonDateSerializer.class)
	public Date getCheckInDate() {
		return checkInDate;
	}

	@JsonDeserialize(using = CustomJsonDateDeserializer.class)
	public void setCheckInDate(Date checkInDate) {
		this.checkInDate = checkInDate;
	}

	@JsonSerialize(using=CustomJsonDateSerializer.class)
	public Date getChckoutDate() {
		return chckoutDate;
	}

	@JsonDeserialize(using = CustomJsonDateDeserializer.class)
	public void setChckoutDate(Date chckoutDate) {
		this.chckoutDate = chckoutDate;
	}

	@JsonSerialize(using=CustomJsonDateSerializer.class)
	public Date getBookingDate() {
		return bookingDate;
	}

	@JsonDeserialize(using = CustomJsonDateDeserializer.class)
	public void setBookingDate(Date bookingDate) {
		this.bookingDate = bookingDate;
	}

	public BigDecimal getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(BigDecimal totalAmount) {
		this.totalAmount = totalAmount;
	}

	public BigDecimal getTotalTax() {
		return totalTax;
	}

	public void setTotalTax(BigDecimal totalTax) {
		this.totalTax = totalTax;
	}

	public BookingStatus getBookingStatus() {
		return bookingStatus;
	}

	public void setBookingStatus(BookingStatus bookingStatus) {
		this.bookingStatus = bookingStatus;
	}

	public Payment getPayment() {
		return payment;
	}

	public void setPayment(Payment payment) {
		this.payment = payment;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Package getSelectedPackage() {
		return selectedPackage;
	}

	public void setSelectedPackage(Package selectedPackage) {
		this.selectedPackage = selectedPackage;
	}

	public PricingResponse getPricingDetails() {
		return pricingDetails;
	}

	public void setPricingDetails(PricingResponse pricingDetails) {
		this.pricingDetails = pricingDetails;
	}

	@Override
	public String toString() {
		return "Booking [id=" + id + ", propertyId=" + propertyId + ", packageId=" + packageId + ", userId=" + customerId
				+ ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email + ", contactNumnber="
				+ contactNumber + ", numOfAdult=" + numOfAdult + ", numOfChild=" + numOfChild + ", numOfGents="
				+ numOfGents + ", numOfLadies=" + numOfLadies + ", propertyType=" + propertyType + ", checkInDate="
				+ checkInDate + ", chckoutDate=" + chckoutDate + ", bookingDate=" + bookingDate + ", totalAmount="
				+ totalAmount +  ", totalTax=" + totalTax + "]";
	}
	
}
