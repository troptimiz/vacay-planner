package com.troptimize.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.troptimize.beans.Product;
/**
 * @author m4ver1k
 *
 */
@RepositoryRestResource(collectionResourceRel = "products", path = "products")
public interface ProductRepository extends MongoRepository<Product, String> {
	public Page<Product> findByNameLikeOrCityLikeAndActiveTrue(String keyword,String keyword2,Pageable pageable);
	
	default public Page<Product> searchProduct(String keyword,Pageable pageable){
		return this.findByNameLikeOrCityLikeAndActiveTrue(keyword, keyword, pageable);
	} 
}
