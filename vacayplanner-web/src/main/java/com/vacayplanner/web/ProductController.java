package com.vacayplanner.web;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.vacayplanner.domain.model.Product;

@RestController
@RequestMapping(value = "/products")
public class ProductController {
	private static final Logger logger = LoggerFactory
			.getLogger(ProductController.class);

	@RequestMapping(value = "/all", method = RequestMethod.GET, produces = { "application/json" })
	public List<Product> activeProducts() {

		List<Product> products = new ArrayList<>();

		Product prod1 = new Product();
		prod1.setDescription("Prod1 Description");
		prod1.setName("Prod1 Name");
		prod1.setEmailAddress("prod1@gmail.com");
		prod1.setId("PROD001");

		Product prod2 = new Product();
		prod2.setDescription("Prod2 Description");
		prod2.setName("Prod2 Name");
		prod2.setEmailAddress("prod2@gmail.com");
		prod2.setId("PROD002");

		products.add(prod1);
		products.add(prod2);

		return products;

	}

	@RequestMapping(value = "/{productID}", method = RequestMethod.GET)
	public Product categoryDetail(@PathVariable String productID) {

		Product product = new Product();
		product.setId(productID);
		product.setEmailAddress("prod1@gmail.com");
		product.setName("Prod1 Name");
		product.setDescription("prod1 Description");

		return product;

	}

}
