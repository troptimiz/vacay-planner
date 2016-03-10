package com.troptimize.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.troptimize.beans.Customer;

public interface CustomerRepository extends MongoRepository<Customer, String>{
	public Customer findByUsername(String username);
}
