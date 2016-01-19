package com.troptimize.service;



import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.troptimize.beans.Facility;
import com.troptimize.beans.Product;
import com.troptimize.repositories.FacilityRepository;
import com.troptimize.repositories.ProductRepository;

/**
 * @author m4ver1k
 *
 */
@Service
public class ProductService {
	
	@Autowired
	ProductRepository productRepository;
	
	@Autowired
	FacilityRepository facilityRepository;
	
	public Page<Product> searchProduct (String keyword,Pageable pageable){
		Page<Product> products = productRepository.findByCityLikeIgnoreCaseAndActiveTrue(keyword, pageable);
		products.getContent().forEach(p -> {
			p.setFacilityDetails(this.getFacilitiesForProduct(p.getId()));
		});
		return products;
	}

	public Page<Product> findAll(Pageable pageable){
		return productRepository.findAll(pageable);
	}
	
	public Product findById(String id){
		Product p = productRepository.findOne(id);
		p.setFacilityDetails(this.getFacilitiesForProduct(p.getId()));
		return p;
	}
	public List<Facility> getFacilitiesForProduct(String productId){
		List<Facility> facilities = new ArrayList<>();
		Product product = productRepository.findOne(productId);
		for(Map<String, String> facility:product.getFacilities()){
			facilities.add(facilityRepository.findOne(facility.get("facilityId")));
		}
		return facilities;
	}

}
