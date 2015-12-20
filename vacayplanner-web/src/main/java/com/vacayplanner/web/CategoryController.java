package com.vacayplanner.web;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.vacayplanner.domain.model.Category;

@RestController
@RequestMapping(value = "/categories")
public class CategoryController {
	private static final Logger logger = LoggerFactory
			.getLogger(CategoryController.class);

	@RequestMapping(value = "/all", method = RequestMethod.GET,produces={"application/json"})
	public List<Category> activeCategories() {
		
		List<Category> categories = new ArrayList<>();
		
		// Add Category Stub
		Category cat1 = new Category();
		cat1.setActive(Boolean.TRUE.booleanValue());
		cat1.setName("Cateogy1");
		cat1.setDescription("Cat1 Description");
		cat1.setImageUrl("/images/cat1.png");
		
		Category cat2 = new Category();
		cat2.setActive(Boolean.FALSE.booleanValue());
		cat2.setName("Cateogy2");
		cat2.setDescription("Cat2 Description");
		cat2.setImageUrl("/images/cat2.png");
		
		categories.add(cat1);
		categories.add(cat2);
		
		return categories;
		

	}
	
	@RequestMapping(value = "/{categoryID}", method = RequestMethod.GET)
	public Category categoryDetail(@PathVariable String categoryID) {
		
		
		Category category = new Category();
		category.setId(categoryID);
		category.setActive(Boolean.FALSE.booleanValue());
		category.setName("Cateogy2");
		category.setDescription("Cat2 Description");
		category.setImageUrl("/images/cat2.png");
		
		
		return category;

	}

}
