package com.troptimize.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.troptimize.repositories.CustomerRepository;

@Service
public class TrUserDetailService implements UserDetailsService{

	@Autowired
	CustomerRepository customerRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		UserDetails user = customerRepository.findByUsername(username);
		
		if(user==null || user.getAuthorities()== null || user.getAuthorities().size()==0){
			throw new UsernameNotFoundException("No user found with username "+username);
		}
		
		return user;
	}

}
