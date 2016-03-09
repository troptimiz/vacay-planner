package com.troptimize.config;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.apache.velocity.runtime.RuntimeConstants;
import org.apache.velocity.runtime.resource.loader.ClasspathResourceLoader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.ui.velocity.VelocityEngineFactoryBean;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;

/**
 * @author m4ver1k
 *
 */
@Configuration
@ComponentScan(basePackages={"com.troptimize.service","com.troptimize.beans"})
@EnableMongoRepositories(basePackages={"com.troptimize.repositories"})
public class AppConfig {
	
	@Bean(name="mongo")
	@Profile("dev")
	public Mongo mongoDev() throws UnknownHostException{

		 List<MongoCredential> lst = new ArrayList<MongoCredential>();
		 return new MongoClient(new ServerAddress("localhost", 27017),lst);
		
	}
	
	@Bean(name="mongoTemplate")
	@Profile("dev")
	public MongoTemplate mongoTemplateDev() throws Exception {
		return new MongoTemplate(mongoDev(), "vacayplanner");
	  }
	
	@Bean(name="mongo")
	@Profile("prod")
	public Mongo mongoProd() throws UnknownHostException{
		 List<MongoCredential> lst = new ArrayList<MongoCredential>();
		 lst.add(MongoCredential.createCredential("admin", "admin", "pptCBrMQ4Bbq".toCharArray()));
	     return new MongoClient(new ServerAddress("127.10.79.2", 27017),lst);
		
	}
	
	@Bean(name="mongoTemplate")
	@Profile("prod")
	public MongoTemplate mongoTemplateProd() throws Exception {
	      return new MongoTemplate(mongoProd(), "pilot");
	  }
	
	@Bean
	public JavaMailSender mailSender() {
		Properties props = new Properties();
		props.put("mail.smtp.auth", true);
		props.put("mail.smtp.starttls.enable", true);

		JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
		mailSender.setHost("smtp.gmail.com");
		mailSender.setPort(587);
		mailSender.setUsername("troptimiz@gmail.com");
		mailSender.setPassword("hellohai#57");
		mailSender.setJavaMailProperties(props);
	
		return mailSender;

	}
	@Bean
	public VelocityEngineFactoryBean velocityEngine(){
		Properties prop = new Properties();
		prop.put(RuntimeConstants.RESOURCE_LOADER,"classpath" );
		prop.put("classpath.resource.loader.class",ClasspathResourceLoader.class.getName());
		VelocityEngineFactoryBean  factory = new VelocityEngineFactoryBean();
		factory.setVelocityProperties(prop);
		return factory;
		
	}
	
}
