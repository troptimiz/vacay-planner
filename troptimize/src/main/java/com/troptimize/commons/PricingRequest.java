package com.troptimize.commons;

/**
 * DTO object to map a request for Price computation.
 * @author m4ver1k
 *
 */
public class PricingRequest {
	
	private int numChild;
	
	private int numAdult;
	
	private String packageId;
	
	private String productId;

	public PricingRequest() {
	
	}
	
	public PricingRequest(int numChild,int numAdult,String packageId,String productId) {
		this.numChild=numChild;
		this.numAdult=numAdult;
		this.packageId=packageId;
		this.productId=productId;
	}
	
	public int getNumChild() {
		return numChild;
	}

	public void setNumChild(int numChild) {
		this.numChild = numChild;
	}

	public int getNumAdult() {
		return numAdult;
	}

	public void setNumAdult(int numAdult) {
		this.numAdult = numAdult;
	}

	public String getPackageId() {
		return packageId;
	}

	public void setPackageId(String packageId) {
		this.packageId = packageId;
	}

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	@Override
	public String toString() {
		return "PricingRequest [numChild=" + numChild + ", numAdult=" + numAdult + ", packageId=" + packageId
				+ ", productId=" + productId + "]";
	}
	
}
