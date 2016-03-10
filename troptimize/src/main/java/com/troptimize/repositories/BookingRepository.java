package com.troptimize.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.troptimize.beans.Booking;

public interface BookingRepository extends MongoRepository<Booking, String>{
	@Query("{'id':?0,payment.transactionId:?1}")
	public Booking find(String id,String transactionId);
	
}
