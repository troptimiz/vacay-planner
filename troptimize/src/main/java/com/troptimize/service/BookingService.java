package com.troptimize.service;


import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

import org.apache.http.client.fluent.Form;
import org.apache.http.client.fluent.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.troptimize.beans.Booking;
import com.troptimize.beans.Payment;
import com.troptimize.commons.BookingStatus;
import com.troptimize.commons.PricingRequest;
import com.troptimize.commons.PricingResponse;
import com.troptimize.commons.TaxDetailsDto;
import com.troptimize.repositories.BookingRepository;

@Service
public class BookingService {

	@Autowired
	private BookingRepository bookingRepository;
	
	@Autowired
	private PricingService pricingService;
	
	@Autowired
	private ProductService productService;
	
	
	
	public Booking save(Booking booking) {
		return bookingRepository.save(booking);
	}

	public Booking initiateBooking(Booking booking) {
		booking.setBookingStatus(BookingStatus.INITIALIZE);
		Payment payment = new Payment();
		payment.setTransactionId(String.valueOf(System.currentTimeMillis()));
		booking.setPayment(payment);
		PricingResponse pricingResponse = pricingService.compute(new PricingRequest(booking.getNumOfChild(), booking.getNumOfAdult(), booking.getPackageId(), booking.getPropertyId()));
		booking.setTotalAmount(pricingResponse.getTotal());
		
		BigDecimal totalTax  =BigDecimal.ZERO;
		for(TaxDetailsDto tax:pricingResponse.getTaxes()){
			totalTax=totalTax.add(tax.getTotal());
		}
		booking.setTotalTax(totalTax);
		
		payment.setSecSignature(this.generateCitrusPaymentSignature(booking));
		
		return this.save(booking);
		
		//this.processPayment(booking);
		
	}

	private String generateCitrusPaymentSignature(Booking booking) {
		// 

		//String formPostUrl = "https://sandbox.citruspay.com/sslperf/tmztest";

		String secret_key = "dc581d75a0d0f03d5f64a3aaedaab4ad41cec43c";

		String vanityUrl = "tmztest";

		String merchantTxnId = booking.getPayment().getTransactionId();
		
		String orderAmount = booking.getTotalAmount().toPlainString();
		
		String currency = "INR";
		
		String data = vanityUrl + orderAmount + merchantTxnId + currency;

		javax.crypto.Mac mac;
		
		String securitySignature=null;
		
		
		
		try {
		
			mac = javax.crypto.Mac.getInstance("HmacSHA1");
			
			mac.init(new javax.crypto.spec.SecretKeySpec(secret_key.getBytes(), "HmacSHA1"));
			
			byte[] hexBytes = new org.apache.commons.codec.binary.Hex().encode(mac.doFinal(data.getBytes()));
			
			securitySignature = new String(hexBytes, "UTF-8");
		} catch (NoSuchAlgorithmException e) {
			
			e.printStackTrace();
		} catch (InvalidKeyException e) {
		
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			
			e.printStackTrace();
		}
		return securitySignature;
	}

	public void paymentSucessful(Booking booking) {
		booking.setBookingStatus(BookingStatus.PAYMENT_SUCESSFUL);
		this.save(booking);
	}
	
	private boolean processPayment(Booking booking){
		try {
			
			Request.Post("https://sandbox.citruspay.com/sslperf/tmztest")
			.bodyForm(Form.form()
					.add("merchantTxnId", booking.getPayment().getTransactionId())
					.add("orderAmount", booking.getTotalAmount().toString())
					.add("currency", "INR")
					.add("returnUrl","https://b5f6c560.ngrok.io/troptimize/booking/payment/success" )
					//.add("notifyUrl", )
					.add("secSignature", this.generateCitrusPaymentSignature(booking))
					.build())
			.execute().discardContent();
			
		} catch (IOException e) {
			e.printStackTrace();
		}

		return false;
	}
	
	
	public Booking findBooking(String bookingId,String transactionId){
		return bookingRepository.find(bookingId, transactionId);
	}
	
	public Booking findBooking(String bookingId){
		Booking booking =bookingRepository.findOne(bookingId);
		booking.setProduct(productService.findById(booking.getPropertyId()));
		booking.setSelectedPackage(booking.getProduct().getPackagesMap().get(booking.getPackageId()));
		booking.getProduct().setPackagesMap(null);
		booking.setPricingDetails(pricingService.compute(new PricingRequest(booking.getNumOfChild(), booking.getNumOfAdult(), booking.getPackageId(), booking.getPropertyId())));
		return booking;
		
	}
	 
}
