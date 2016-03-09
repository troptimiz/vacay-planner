package com.troptimize.service;



import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.troptimize.beans.Facility;
import com.troptimize.beans.Package;
import com.troptimize.beans.PriceRule;
import com.troptimize.beans.Product;
import com.troptimize.repositories.FacilityRepository;
import com.troptimize.repositories.PriceRuleRepository;
import com.troptimize.repositories.ProductRepository;

/**
 * @author m4ver1k
 *
 */
@Service
public class ProductService {
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private FacilityRepository facilityRepository;
	
	@Autowired
	private PriceRuleRepository priceRuleRepository;
	
	public Page<Product> searchProduct (String keyword,String category,String costType,
			Pageable pageable){
		Page<Product> products = productRepository.findByCityLikeIgnoreCaseAndCategoryLikeIgnoreCaseAndClassifications_NameLikeIgnoreCaseAndActiveTrue(keyword,category,costType, pageable);
		products.getContent().forEach(p -> {
			p.setFacilityDetails(this.getFacilitiesForProduct(p));
			this.setUpPackageData(p);
		});
		return products;
	}

	/**
	 * This method return all product, but does not contain facility details or Price rule details. 
	 * Use the {@link #searchProduct(String, String, String, Pageable) searchProduct(String,String,String,Pageable} method instead.
	 * @param pageable For pagination and sorting.
	 * @return Page with all the products.
	 */
	public Page<Product> findAll(Pageable pageable){
		return productRepository.findAll(pageable);
	}
	
	public Product findById(String id){
		Product p = productRepository.findOne(id);
		p.setFacilityDetails(this.getFacilitiesForProduct(p));
		this.setUpPackageData(p);
		return p;
	}
	
	public List<Facility> getFacilitiesForProduct(String productId){
		Product product = productRepository.findOne(productId);
		return this.getFacilitiesForProduct(product);
	}
	
	public List<Facility> getFacilitiesForProduct(Product product){
		List<Facility> facilities = new ArrayList<>();
		for(Map<String, String> facility:product.getFacilities()){
			facilities.add(facilityRepository.findOne(facility.get("facilityId")));
		}
		return facilities;
	}
	
	public Product get(String id){
		return productRepository.findOne(id);
	}
		
	/**
	 * This method populates transient package map and pricerule details data from db.
	 * @param product
	 */
	private void setUpPackageData(Product product){
		List<PriceRule> priceRuleDetails  =null;
		Map<String, Package> packagMap = new HashMap<>();
		for(Package pkg: product.getPackages()){
			priceRuleDetails=new ArrayList<>();
			packagMap.put(pkg.getId(), pkg);
			if(pkg.getPricerules()!=null){
				for(Map<String, String> priceRule:pkg.getPricerules()){
					priceRuleDetails.add(priceRuleRepository.findOne(priceRule.get("priceRuleId")));
				}
				pkg.setPriceRuleDetails(priceRuleDetails);
			}
		}
		product.setPackagesMap(packagMap);
	}
	
}
