package com.troptimize.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.troptimize.beans.Product;
import com.troptimize.repositories.ProductRepository;

/**
 * @author m4ver1k
 *
 */
@Service
public class ProductService {
	
	@Autowired
	ProductRepository productRepository;
	
	public Page<Product> searchProduct (String keyword,Pageable pageable){
		return productRepository.searchProduct(keyword, pageable);
	}

	public Page<Product> findAll(Pageable pageable){
		return productRepository.findAll(pageable);
	}
	
	public Product findById(String id){
		return productRepository.findOne(id);
	}

}
