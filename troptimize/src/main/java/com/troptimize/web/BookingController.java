package com.troptimize.web;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.troptimize.beans.Booking;
import com.troptimize.beans.Customer;
import com.troptimize.commons.BookingStatus;
import com.troptimize.commons.PricingRequest;
import com.troptimize.commons.PricingResponse;
import com.troptimize.commons.PropertyClassification;
import com.troptimize.service.BookingService;
import com.troptimize.service.PricingService;
import com.troptimize.service.ProductService;
import com.troptimize.service.TrUserDetailService;

@RestController
@RequestMapping("/booking")
public class BookingController {

	@Autowired
	private BookingService bookingService;
	
	@Autowired
	private PricingService pricingService;
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private TrUserDetailService userDetailsService;
	
	@RequestMapping(method=RequestMethod.POST)
	public Booking initiateBooking(@RequestBody Booking booking){
		Customer customer = (Customer) userDetailsService.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
		booking.setCustomerId(customer.getUserID());
		booking.setBookingDate(new Date());
		booking.setPropertyType(productService.get(booking.getPropertyId()).getType());
		return bookingService.initiateBooking(booking);
		//return bookingService.initiateBooking(booking);
		 
		
	}
	
	@RequestMapping(value="/confirm",method=RequestMethod.POST)
	public void confirm(HttpServletResponse response,HttpServletRequest request) throws IOException{
		
		
		 String txnId=request.getParameter("TxId");
         String txnStatus=request.getParameter("TxStatus"); 
         String amount=request.getParameter("amount"); 
         String pgTxnId=request.getParameter("pgTxnNo");
         String issuerRefNo=request.getParameter("issuerRefNo"); 
         String authIdCode=request.getParameter("authIdCode");
 //        String firstName=request.getParameter("firstName");
    //     String lastName=request.getParameter("lastName");
         String pgRespCode=request.getParameter("pgRespCode");
    //     String zipCode=request.getParameter("addressZip");
         String resSignature=request.getParameter("signature");
         
        Booking booking = bookingService.findBooking(request.getParameter("id"), txnId);
        Map<String, String> paymentResponse = new HashMap<>();
        paymentResponse.put("txnStatus", txnStatus);
        paymentResponse.put("amount", amount);
        paymentResponse.put("pgTxnId", pgTxnId);
        paymentResponse.put("issuerRefNo", issuerRefNo);
        paymentResponse.put("authIdCode", authIdCode);
        paymentResponse.put("pgRespCode", pgRespCode);
        paymentResponse.put("resSignature", resSignature);
        
        //TODO cross check with signature
        
        booking.getPayment().setPaymentResponseData(paymentResponse);
       if(txnStatus.equals("SUCCESS")){
    	   booking.setBookingStatus(BookingStatus.PAYMENT_SUCESSFUL);   
       }else /*if(txnStatus.equals("1"))*/{
    	   booking.setBookingStatus(BookingStatus.PAYMENT_FAILED);
       } 
        
        bookingService.save(booking);
        
		response.sendRedirect("/troptimize/confirmation.html?id="+request.getParameter("id"));
	}
	
	@RequestMapping("/payment/success")
	public void paymentResponse(HttpServletRequest  request,HttpServletResponse response ){
		
	}
	
	@RequestMapping(method=RequestMethod.POST,value="/price/compute")
	public PricingResponse computePrice(@RequestBody PricingRequest pricingRequest){
		return pricingService.compute(pricingRequest);
	}
	
	@RequestMapping("/{id}")
	public Booking findBooking(@PathVariable("id")String id){
		return bookingService.findBooking(id);
	}

	@SuppressWarnings("deprecation")
	public void test(){
		Booking book = new Booking();
		book.setBookingDate(new Date());
		book.setChckoutDate(new Date(2016, 05, 1));
		book.setCheckInDate(new Date(2016, 4, 25));
		book.setContactNumber("1234567891");
		book.setEmail("email@emil.com");
		book.setFirstName("Adarsh");
		book.setLastName("kumar");
		book.setNumOfAdult(1);
		book.setNumOfChild(0);
		book.setNumOfGents(1);
		book.setNumOfLadies(0);
		book.setPackageId("56aff4a22d134b99a4717650");
		book.setPropertyId("56afebf82d134b99a471763b");
		book.setPropertyType(PropertyClassification.HOTEL.getValue());
		book.setTotalAmount(new BigDecimal("1200"));
		//book.setTotalDiscount(BigDecimal.ZERO);
		book.setTotalTax(new BigDecimal("123"));
		book.setCustomerId("7s8d9sa798f1h14jh");
		
		bookingService.save(book);
	}

}
