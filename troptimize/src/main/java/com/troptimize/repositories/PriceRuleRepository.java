package com.troptimize.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.troptimize.beans.PriceRule;

public interface PriceRuleRepository extends MongoRepository<PriceRule, String>{

}
