package com.troptimize.web;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.RememberMeServices;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.troptimize.beans.Customer;
import com.troptimize.service.CustomerAccountService;
import com.troptimize.service.TrUserDetailService;

@RestController
@RequestMapping("/account")
public class AccountController {

	@Autowired
	private CustomerAccountService accountService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private TrUserDetailService userDetailsService;
	
	@Autowired
	private RememberMeServices rememberMeService;
	

	@Autowired
	private SecurityContextRepository repository;
	
	@RequestMapping(method=RequestMethod.POST,value="/register")
	public ResponseEntity<UserDetails> register(@RequestBody Customer customer,HttpServletRequest request,HttpServletResponse response){
		String clearTextPassword=customer.getPassword();
		Customer user = accountService.register(customer);
		user.setPassword(clearTextPassword);
		if(this.doLogin(user, request, response,false)){
			return new ResponseEntity<UserDetails>( customer, HttpStatus.OK);
		}
		return new ResponseEntity<UserDetails>(HttpStatus.UNAUTHORIZED);
	}

	
	@RequestMapping(method=RequestMethod.POST,value="/register/social/fb")
	public ResponseEntity<UserDetails> registerFB(@RequestBody Customer customer,HttpServletRequest request,HttpServletResponse response){
		customer.setPassword(UUID.randomUUID().toString()); //the password is not used anywhere.
		try{
			Customer user = accountService.register(customer);
			doSocialLogin(user, request, response);
			return new ResponseEntity<UserDetails>(user,HttpStatus.OK);
		}
		catch(RuntimeException e){
			return new ResponseEntity<UserDetails>(userDetailsService.loadUserByUsername(customer.getUsername()),HttpStatus.OK);
		}
		
		
		
	}
	
	@RequestMapping(value="/login",method=RequestMethod.POST)
	public ResponseEntity<UserDetails> login(@RequestBody Map<String, String> loginReq,@RequestParam("remember-me") boolean remember, HttpServletRequest request,
			HttpServletResponse response) {
		ResponseEntity<UserDetails> responseEntity = null;
		try {
			Customer user = (Customer) userDetailsService.loadUserByUsername(loginReq.get("username"));
			if(!user.isEnabled()){
				return  new ResponseEntity<>(HttpStatus.FORBIDDEN);
			}
			user.setPassword(loginReq.get("password"));
			if (this.doLogin(user, request, response,remember)) {
				//user.setPassword("");
				responseEntity= new ResponseEntity<UserDetails>(user,HttpStatus.OK);
			} else {
				responseEntity= new ResponseEntity<UserDetails>(HttpStatus.UNAUTHORIZED);
			}
		} catch (UsernameNotFoundException e) {
			responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}

		return responseEntity;
	}
	
	@RequestMapping(value="/login/fb",method=RequestMethod.POST)
	public ResponseEntity<UserDetails> loginFB(@RequestBody Map<String, String> loginReq, HttpServletRequest request,
			HttpServletResponse response) {
		ResponseEntity<UserDetails> responseEntity = null;
	try{
		Customer user = (Customer) userDetailsService.loadUserByUsername(loginReq.get("username"));
		this.doSocialLogin(user, request, response);
		responseEntity= new ResponseEntity<UserDetails>(user,HttpStatus.OK);
	} catch (UsernameNotFoundException e) {
		responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
		return responseEntity;
	}
	
	@RequestMapping(value="/login/social",method=RequestMethod.POST)
	public ResponseEntity<UserDetails> loginSocial(@RequestBody Customer customer , HttpServletRequest request,
			HttpServletResponse response) {
		ResponseEntity<UserDetails> responseEntity = null;
		Customer user=null;
		try{
			user = (Customer) userDetailsService.loadUserByUsername(customer.getUsername());
		
		} catch (UsernameNotFoundException e) {
			customer.setPassword(UUID.randomUUID().toString()); 
			user = accountService.register(customer);
		}
		this.doSocialLogin(user, request, response);
		responseEntity= new ResponseEntity<UserDetails>(user,HttpStatus.OK);
		return responseEntity;
	}
	
	@RequestMapping("/verify")
	public void verifyUser(@RequestParam("id") String id,HttpServletResponse response) throws IOException{
		accountService.enableUser(id);
		response.sendRedirect("/troptimize/index.html");
	}
	
	private void doSocialLogin(UserDetails userDetails,HttpServletRequest request,HttpServletResponse response){
		UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(userDetails.getUsername(),userDetails.getPassword() , userDetails.getAuthorities());
		SecurityContextHolder.getContext().setAuthentication(auth);
		repository.saveContext(SecurityContextHolder.getContext(), request, response);
	}
	
	private boolean doLogin(UserDetails userDetails,HttpServletRequest request,HttpServletResponse response,boolean remember){
		UsernamePasswordAuthenticationToken token =  new UsernamePasswordAuthenticationToken(userDetails.getUsername(), userDetails.getPassword(), userDetails.getAuthorities());
		try{
		Authentication auth = authenticationManager.authenticate(token);
		if(remember){
			rememberMeService.loginSuccess(request, response, auth);
		}
		SecurityContextHolder.getContext().setAuthentication(token);
		repository.saveContext(SecurityContextHolder.getContext(), request, response);
		
		}catch (BadCredentialsException ex) {
			return false;
		}
		return true;
	}
	
	
}
