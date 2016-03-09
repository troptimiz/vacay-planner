package com.troptimize.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;

import org.apache.velocity.app.VelocityEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.ui.velocity.VelocityEngineUtils;

import com.troptimize.beans.Customer;
import com.troptimize.repositories.CustomerRepository;

@Service
public class CustomerAccountService {
	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private MailService mailService;
	
	@Autowired
	private VelocityEngine velocityEngine;
	
	private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	
	private List<GrantedAuthority> authorities = new ArrayList<>();
	
	public Customer register(Customer customer){
		customer.setPassword(encoder.encode(customer.getPassword()));
		customer.setAuthorities(authorities);
		customer.setEnabled(false);
		if(customerRepository.findByUsername(customer.getUsername()) !=null){
			throw new RuntimeException("Customer Exisits");
		}

		Customer savedCustomer = customerRepository.insert(customer);
	
		Map<String, String> model = new HashMap<>();
		model.put("name", savedCustomer.getFirstName());
		model.put("id", savedCustomer.getUserID());
		
		String message=VelocityEngineUtils.mergeTemplateIntoString(velocityEngine, "/email/welcome.vm", model);
		
		mailService.sendMail("no-reply@ttimz.com", savedCustomer.getUsername(), "Welcome to Ttimz", message);
		return savedCustomer;
	}
	
	public void enableUser(String id){
		Customer customer = customerRepository.findOne(id);
		customer.setEnabled(true);
		customerRepository.save(customer);
	}
	
	@PostConstruct
	private void setupAuthority(){
		GrantedAuthority user_role = new SimpleGrantedAuthority("ROLE_USER");
		authorities.add(user_role);
	}
	
}
