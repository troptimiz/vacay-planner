package com.troptimize.config;

import java.net.UnknownHostException;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;

/**
 * @author m4ver1k
 *
 */
@Configuration
@ComponentScan(basePackages={"com.troptimize.service","com.troptimize.beans"})
@EnableMongoRepositories(basePackages={"com.troptimize.repositories"})
public class AppConfig {
	
	@Bean
	public Mongo mongo() throws UnknownHostException{
		return new MongoClient();
	}
	
	@Bean 
	public MongoTemplate mongoTemplate() throws Exception {
	      return new MongoTemplate(mongo(), "vacayplanner");
	  }
}
