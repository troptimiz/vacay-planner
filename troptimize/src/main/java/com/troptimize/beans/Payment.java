package com.troptimize.beans;

import java.util.HashMap;
import java.util.Map;

public class Payment {

	private String transactionId;
	
	private String paymentGatwayName;
	
	private String type;
	
	private String status;
	
	private String secSignature;
	
	private Map<String, String> paymentResponseData = new HashMap<String, String>();

	public String getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}

	public String getPaymentGatwayName() {
		return paymentGatwayName;
	}

	public void setPaymentGatwayName(String paymentGatwayName) {
		this.paymentGatwayName = paymentGatwayName;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getSecSignature() {
		return secSignature;
	}

	public void setSecSignature(String secSignature) {
		this.secSignature = secSignature;
	}

	public Map<String, String> getPaymentResponseData() {
		return paymentResponseData;
	}

	public void setPaymentResponseData(Map<String, String> paymentResponseData) {
		this.paymentResponseData = paymentResponseData;
	}

	@Override
	public String toString() {
		return "Payment [transactionId=" + transactionId + ", paymentGatwayName=" + paymentGatwayName + ", type=" + type + ", status=" + status + "]";
	}

}
