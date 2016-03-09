package com.troptimize.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.troptimize.beans.TaxDetails;

public interface TaxRepository extends MongoRepository<TaxDetails,String> {

}
