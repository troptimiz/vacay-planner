package com.troptimize.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.troptimize.beans.Facility;

public interface FacilityRepository extends MongoRepository<Facility,String>{

}
